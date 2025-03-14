import { useState, useEffect } from "react";
import { supabase } from "../../../supabaseClient"; // Fixed path to supabaseClient
import { Link, useNavigate } from "react-router-dom";
import AuthenticatedNavBar from "../../components/AuthenticatedNavBar";
import "./Stock.css";

function Stock() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [stockItems, setStockItems] = useState([]);
  const [newItem, setNewItem] = useState({ name: "", quantity: 0, price: 0 });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Add console logs for debugging
    console.log("Stock component mounted");

    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log("Auth session:", session);
      setSession(session);
      if (session) fetchStockItems();
      else navigate('/login');
    }).catch(err => {
      console.error("Error getting session:", err);
      setError("Failed to authenticate. Please try again.");
      setLoading(false);
    });

    const { subscription } = supabase.auth.onAuthStateChange((_event, session) => {
      console.log("Auth state changed:", session);
      setSession(session);
      if (!session) navigate('/login');
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const fetchStockItems = async () => {
    try {
      setLoading(true);
      console.log("Fetching stock items...");
      const { data, error } = await supabase.from('stock_items')
        .select('*').order('name');

      console.log("Stock data:", data, "Error:", error);

      if (error) throw error;
      setStockItems(data || []);
    } catch (error) {
      console.error("Error fetching stock items:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  const handleAddItem = async (e) => {
    e.preventDefault();
    try {
      const { data, error } = await supabase
        .from('stock_items').insert([
          {
            name: newItem.name,
            quantity: newItem.quantity,
            price: newItem.price,
            user_id: session.user.id
          }
        ]).select();
      if (error) throw error;
      setStockItems([...stockItems, ...data]);
      setNewItem({ name: "", quantity: 0, price: 0 });
    } catch (error) {
      setError(error.message);
    }
  };
  const handleUpdateItem = async (id, field, value) => {
    try {
      const { error } = await supabase.from('stock_items')
        .update({ [field]: value }).eq('id', id);
      if (error) throw error;
      setStockItems(stockItems.map(item =>
        item.id === id ? { ...item, [field]: value } : item));
    } catch (error) {
      setError(error.message);
    }
  };
  const handleDeleteItem = async (id) => {
    try {
      const { error } = await supabase
        .from('stock_items').delete()
        .eq('id', id);
      if (error) throw error;
      setStockItems(stockItems.filter(item => item.id !== id));
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <div className="stock-page min-vh-100 bg-light">
      {session && <AuthenticatedNavBar userEmail={session.user.email} />}

      <div className="container py-5">
        <div className="row mb-4">
          <div className="col">
            <h2>Stock Management</h2>
            <p className="text-muted">Manage your inventory items</p>
          </div>
        </div>
        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
            <button type="button" className="btn-close float-end" onClick={() => setError(null)}></button>
          </div>
        )}
        <div className="row mb-5">
          <div className="col-md-6">
            <div className="card">
              <div className="card-header bg-primary text-white">
                <h5 className="mb-0">Add New Item</h5>
              </div>
              <div className="card-body">
                <form onSubmit={handleAddItem}>
                  <div className="mb-3">
                    <label htmlFor="itemName" className="form-label">Item Name</label>
                    <input
                      type="text" className="form-control"
                      id="itemName" value={newItem.name}
                      onChange={(e) => setNewItem({ ...newItem, name: e.target.value })} required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="itemQuantity" className="form-label">Quantity</label>
                    <input type="number"
                      className="form-control" id="itemQuantity"
                      value={newItem.quantity} onChange={(e) => setNewItem({ ...newItem, quantity: parseInt(e.target.value) })}
                      required />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="itemPrice" className="form-label">Price ($)</label>
                    <input
                      type="number" step="0.01"
                      className="form-control" id="itemPrice"
                      value={newItem.price} onChange={(e) => setNewItem({ ...newItem, price: parseFloat(e.target.value) })}
                      required />
                  </div>
                  <button type="submit" className="btn btn-primary">Add Item</button>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div className="card">
              <div className="card-header bg-dark text-white">
                <h5 className="mb-0">Inventory Items</h5>
              </div>
              <div className="card-body">
                {loading ? (
                  <div className="text-center py-4">
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </div>
                ) : stockItems.length === 0 ? (
                  <div className="text-center py-4">
                    <p className="mb-0">No stock items found. Add your first item above.</p>
                  </div>
                ) : (
                  <div className="table-responsive">
                    <table className="table table-hover">
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Quantity</th>
                          <th>Price</th>
                          <th>Value</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {stockItems.map((item) => (
                          <tr key={item.id}>
                            <td>{item.name}</td>
                            <td>
                              <input type="number"
                                className="form-control form-control-sm quantity-input" value={item.quantity}
                                onChange={(e) => handleUpdateItem(item.id, 'quantity', parseInt(e.target.value))} />
                            </td>
                            <td>
                              <input type="number"
                                step="0.01" className="form-control form-control-sm price-input"
                                value={item.price} onChange={(e) => handleUpdateItem(item.id, 'price', parseFloat(e.target.value))}
                              />
                            </td>
                            <td>${(item.quantity * item.price).toFixed(2)}</td>
                            <td>
                              <button className="btn btn-danger btn-sm"
                                onClick={() => handleDeleteItem(item.id)}>
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                      <tfoot>
                        <tr className="table-dark">
                          <th colSpan="3">Total Inventory Value</th>
                          <th>
                            ${stockItems.reduce((total, item) => total + (item.quantity * item.price), 0).toFixed(2)}
                          </th>
                          <th></th>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Stock;

