import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import { CartProvider } from './context/CartContext'; 
import NavBar from './components/NavBar';
import Home from './pages/Home';
import Login from './pages/Login';
import Logout from './pages/Logout';
import Products from './pages/Products'
import MyProfile from './pages/MyProfile';
import RegistrationPage from './pages/RegistrationPage';
import ProductView from './pages/ProductView';
import OrderHistory from './pages/OrderHistory';
import Cart from './pages/Cart';

function App() {
  const [user, setUser] = useState({
    id: null,
    isAdmin: null
  });

  function unsetUser() {
    localStorage.clear();
  }

  useEffect(() => {
  }, [user]);

  useEffect(() => {
    if(localStorage.getItem('token') !== null) {
      fetch(`${process.env.REACT_APP_API_BASE_URL}/users/userDetails`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      .then(res => res.json())
      .then(data => {
        setUser({
          id: data._id,
          isAdmin: data.isAdmin
        });
      });
    } else {
      setUser({
        id: null,
        isAdmin: null
      });
    }
  }, []);


  return (
    <UserProvider value={{ user, setUser, unsetUser }}>
      <CartProvider> 
        <Router>
          <NavBar />
          <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} /> {/* Anyone can view products */}
              <Route path="/myProfile" element={user.id ? <MyProfile /> : <Navigate to="/login" />} />
              <Route path="/cart" element={user.id ? <Cart /> : <Navigate to="/login" />} />
              <Route path="/products/:productId" element={<ProductView />} />
              
              {/* Prevent logged-in users from accessing login and registration pages */}
              <Route path="/login" element={user.id ? <Navigate to="/products" /> : <Login />} />
              <Route path="/register" element={user.id ? <Navigate to="/myProfile" /> : <RegistrationPage />} />

              <Route path="/order-history" element={user.id ? <OrderHistory /> : <Navigate to="/login" />} />
              <Route path="/logout" element={<Logout />} />
            </Routes>
        </Router>
      </CartProvider>
    </UserProvider>
  );
}

export default App;
