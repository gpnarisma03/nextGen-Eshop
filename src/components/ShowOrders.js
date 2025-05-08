import React, { useEffect, useState } from 'react';

const ShowOrders = () => {
  const [orders, setOrders] = useState([]);
  const [productMap, setProductMap] = useState({});
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem('token');

  // First useEffect: fetch orders
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_BASE_URL}/orders/all-orders`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    })
      .then(res => res.json())
      .then(data => {
        setOrders(data.orders || []);
      })
      .catch(err => console.error('Error fetching orders:', err));
  }, [token]);

  // Second useEffect: fetch product names once orders are loaded
  useEffect(() => {
    if (orders.length > 0) {
      // Extract unique product IDs
      const productIds = Array.from(
        new Set(
          orders.flatMap(order =>
            order.productOrdered?.map(p => p.productId)
          )
        )
      );

      // Create a map of productId to product name
      const fetchProducts = async () => {
        const newProductMap = {};
        for (let productId of productIds) {
          if (!newProductMap[productId]) {
            try {
              const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/products/${productId}/details`, {
                headers: {
                  'Authorization': `Bearer ${token}`,
                  'Content-Type': 'application/json',
                }
              });
              const product = await res.json();
              newProductMap[productId] = product.product?.name || 'Unknown Product';

            } catch (err) {
              console.error(`Failed to fetch product ${productId}:`, err);
              newProductMap[productId] = 'Unknown Product';
            }
          }
        }

        setProductMap(newProductMap);
        setLoading(false);
      };

      fetchProducts();
    }
  }, [orders, token]);

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    const yyyy = date.getFullYear();
    return `${mm}-${dd}-${yyyy}`;
  };

  return (
    <div className="container mt-4">
      <h4 className="mb-4">Orders</h4>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div>
          {orders.map((order, index) => (
            <div
              key={order._id || index}
              style={{
                marginBottom: '2rem',
                border: '1px solid #ccc',
                padding: '1rem',
                borderRadius: '8px',
                backgroundColor: '#f8f9fa',
              }}
            >
              <div
                style={{
                  backgroundColor: '#343a40',
                  color: 'white',
                  padding: '0.5rem 1rem',
                  borderRadius: '4px',
                  marginBottom: '1rem',
                }}
              >
                <strong>Orders for user:</strong>{' '}
                <span className="text-warning">{order.userId?._id || 'Unknown ID'}</span>
              </div>

              <p><strong>Items:</strong></p>
              <p>Purchased on {formatDate(order.orderedOn)}:</p>
              <ul>
                {order.productOrdered?.map((product, i) => (
                  <li key={i}>
                    {loading ? 'Loading...' : productMap[product.productId] || 'Unknown Product'} – Quantity: {product.quantity}
                  </li>
                ))}
              </ul>
              <p><strong>Total:</strong> {new Intl.NumberFormat('en-PH', {
                style: 'currency',
                currency: 'PHP',
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
              }).format(order.totalPrice)}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ShowOrders;
