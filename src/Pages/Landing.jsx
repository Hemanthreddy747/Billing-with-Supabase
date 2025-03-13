import { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";
import { useNavigate } from "react-router-dom";

function Landing() {
  const [session, setSession] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
  };

  const handleSignInClick = () => {
    navigate('/login');
  };

  const handleGetStartedClick = () => {
    navigate('/signup');
  };

  return (
    <div className="min-vh-100">
      {/* Navigation */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
        <div className="container">
          <a className="navbar-brand" href="#">BillMaster Pro</a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link" href="#features">Features</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#pricing">Pricing</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#testimonials">Testimonials</a>
              </li>
            </ul>
            <div className="navbar-nav">
              {!session ? (
                <button
                  className="btn btn-primary"
                  onClick={handleSignInClick}
                >
                  Sign in
                </button>
              ) : (
                <div className="d-flex align-items-center gap-3">
                  <span className="text-light">{session.user.email}</span>
                  <button onClick={signOut} className="btn btn-danger">
                    Sign out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-primary text-white text-center py-5" style={{ marginTop: "56px" }}>
        <div className="container py-5">
          <h1 className="display-4 fw-bold mb-3">Simplify Your Billing Process</h1>
          <p className="lead mb-4">Powerful, easy-to-use billing software for businesses of all sizes</p>
          <button className="btn btn-light btn-lg px-4" onClick={handleGetStartedClick}>
            Get Started Free
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-5">
        <div className="container">
          <h2 className="text-center mb-5">Key Features</h2>
          <div className="row g-4">
            <div className="col-md-4">
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">Invoice Generation</h5>
                  <p className="card-text">Create professional invoices with our customizable templates in seconds.</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">Payment Tracking</h5>
                  <p className="card-text">Track payments, overdue invoices, and payment history in real-time.</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">Financial Reports</h5>
                  <p className="card-text">Generate detailed financial reports and analytics with one click.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-5 bg-light">
        <div className="container">
          <h2 className="text-center mb-5">Pricing Plans</h2>
          <div className="row g-4">
            <div className="col-md-4">
              <div className="card h-100">
                <div className="card-body text-center">
                  <h5 className="card-title">Starter</h5>
                  <h6 className="card-subtitle mb-2 text-muted">$9.99/month</h6>
                  <ul className="list-unstyled mt-3 mb-4">
                    <li>Up to 100 invoices/month</li>
                    <li>Basic reporting</li>
                    <li>Email support</li>
                  </ul>
                  <button className="btn btn-outline-primary" onClick={handleGetStartedClick}>
                    Choose Plan
                  </button>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100 border-primary">
                <div className="card-body text-center">
                  <h5 className="card-title">Professional</h5>
                  <h6 className="card-subtitle mb-2 text-muted">$24.99/month</h6>
                  <ul className="list-unstyled mt-3 mb-4">
                    <li>Unlimited invoices</li>
                    <li>Advanced reporting</li>
                    <li>Priority support</li>
                  </ul>
                  <button className="btn btn-primary" onClick={handleGetStartedClick}>
                    Choose Plan
                  </button>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100">
                <div className="card-body text-center">
                  <h5 className="card-title">Enterprise</h5>
                  <h6 className="card-subtitle mb-2 text-muted">Custom pricing</h6>
                  <ul className="list-unstyled mt-3 mb-4">
                    <li>Custom features</li>
                    <li>API access</li>
                    <li>24/7 support</li>
                  </ul>
                  <button className="btn btn-outline-primary" onClick={handleGetStartedClick}>
                    Contact Sales
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-5">
        <div className="container">
          <h2 className="text-center mb-5">What Our Customers Say</h2>
          <div className="row g-4">
            <div className="col-md-4">
              <div className="card h-100">
                <div className="card-body">
                  <p className="card-text">"This software has transformed how we handle our billing. It's intuitive and saves us hours every week."</p>
                  <footer className="blockquote-footer mt-2">John Smith, CEO at TechCorp</footer>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100">
                <div className="card-body">
                  <p className="card-text">"The automated payment tracking feature is a game-changer. Our cash flow has never been better."</p>
                  <footer className="blockquote-footer mt-2">Sarah Johnson, CFO at StartUp Inc</footer>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100">
                <div className="card-body">
                  <p className="card-text">"Customer support is exceptional. They helped us customize the system to our specific needs."</p>
                  <footer className="blockquote-footer mt-2">Mike Brown, Owner at Brown's Shop</footer>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-5 bg-primary text-white text-center">
        <div className="container">
          <h2 className="mb-4">Ready to streamline your billing process?</h2>
          <button className="btn btn-light btn-lg" onClick={handleGetStartedClick}>
            Start Your Free Trial
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-4 bg-dark text-white">
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <h5>BillMaster Pro</h5>
              <p className="small">Making billing simple and efficient for businesses worldwide.</p>
            </div>
            <div className="col-md-4">
              <h5>Quick Links</h5>
              <ul className="list-unstyled">
                <li><a href="#features" className="text-white">Features</a></li>
                <li><a href="#pricing" className="text-white">Pricing</a></li>
                <li><a href="#testimonials" className="text-white">Testimonials</a></li>
              </ul>
            </div>
            <div className="col-md-4">
              <h5>Contact</h5>
              <p className="small">Email: support@billmaster.pro<br />Phone: (555) 123-4567</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Landing;






