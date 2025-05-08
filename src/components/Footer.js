import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-light text-dark pt-5 pb-3">
      <div className="container">
        <div className="row">
          {/* About Section */}
          <div className="col-md-4 mb-4">
            <h5 className="text-uppercase mb-3">About Us</h5>
            <p>
              We are your one-stop shop for premium sports equipment and gear.
              Dedicated to helping athletes perform their best.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-md-4 mb-4">
            <h5 className="text-uppercase mb-3">Quick Links</h5>
            <ul className="list-unstyled">
              <li><Link to="/" className="text-dark text-decoration-none">Home</Link></li>
              <li><Link to="/product" className="text-dark text-decoration-none">Products</Link></li>
              <li><Link to="/about" className="text-dark text-decoration-none">About</Link></li>
              <li><Link to="/contact" className="text-dark text-decoration-none">Contact</Link></li>
            </ul>
          </div>

          {/* Newsletter Signup */}
          <div className="col-md-4 mb-4">
            <h5 className="text-uppercase mb-3">Newsletter</h5>
            <p>Sign up to receive updates and special offers.</p>
            <Link to="/register" className="btn btn-outline-light">Sign Up</Link>
          </div>
        </div>

        <hr className="bg-dark" />

        <div className="text-center">
          <p className="mb-0">&copy; {new Date().getFullYear()} NextGen Sports. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
