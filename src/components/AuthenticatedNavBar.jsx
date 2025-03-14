import { useNavigate } from "react-router-dom";
import { supabase } from "../../supabaseClient";

function AuthenticatedNavBar({ userEmail }) {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <a className="navbar-brand" href="/dashboard">BillMaster Pro</a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <a className="nav-link" href="/dashboard">Dashboard</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/invoices">Billing</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/clients">Customers</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/stock">Stock</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/reports">more</a>
            </li>
          </ul>
          <div className="navbar-nav">
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <span className="me-2">{userEmail}</span>
              </a>
              <ul className="dropdown-menu dropdown-menu-end">
                <li>
                  <a className="dropdown-item" href="/profile">Profile</a>
                </li>
                <li>
                  <a className="dropdown-item" href="/settings">Settings</a>
                </li>
                <li><hr className="dropdown-divider" /></li>
                <li>
                  <button
                    className="dropdown-item text-danger"
                    onClick={handleSignOut}
                  >
                    Sign Out
                  </button>
                </li>
              </ul>
            </li>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default AuthenticatedNavBar;