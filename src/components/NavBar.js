import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { FiShoppingBag } from 'react-icons/fi';
import UserContext from '../context/UserContext';
import CartContext from '../context/CartContext';

const NavBar = () => {
  const { user } = useContext(UserContext);
  const { cart } = useContext(CartContext);

  const isLoggedIn = user?.id !== null;

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary custom-navbar">
      <div className="container-fluid px-5">
        {/* Logo */}
        <NavLink className="navbar-brand" to="/">
          <img
            src="/images/nextGen-logo.png"
            alt="Logo"
            className="logo-img"
          />
        </NavLink>

        {/* Cart for mobile view */}
        <NavLink className="nav-link cart-icon d-lg-none me-2" to="/login">
          <FiShoppingBag size={24} />
        </NavLink>

        {/* Burger button */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Nav links */}
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav">
            {isLoggedIn ? (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/">Home</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/products">Products</NavLink>
                </li>

                {/* Cart - only for non-admin users */}
                {!user.isAdmin && (
                  <li className="nav-item d-none d-lg-block">
                    <NavLink className="nav-link" to="/cart">
                      <FiShoppingBag size={24} />
                      {" "}
                      {cart && cart.cartItems.length > 0 ? (
                        <strong className='text-success'>({cart.cartItems.length})</strong>
                      ) : (
                        <span className='text-danger'>(0)</span>
                      )}
                    </NavLink>
                  </li>
                )}

                {/* Order History - only for non-admin users */}
                {!user.isAdmin && (
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/order-history">
                      Order History
                    </NavLink>
                  </li>
                )}

                <li className="nav-item">
                  <NavLink className="nav-link" to="/myProfile">My Profile</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/logout">Logout</NavLink>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/">Home</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/products">Products</NavLink>
                </li>
                <li className="nav-item d-none d-lg-block">
                  <NavLink className="nav-link" to="/login">
                    <FiShoppingBag size={24} />
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/login">Login</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/register">Register</NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
