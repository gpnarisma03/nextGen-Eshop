import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaStar, FaShoppingCart } from 'react-icons/fa';

// Helper function to format the price
const formatPrice = (price) => {
  return price.toLocaleString('en-US', { style: 'currency', currency: 'PHP' });
};

export default function ProductCard({ productProp }) {
  const { _id, name, price, image_urls, category_id, rating } = productProp;
  const [categoryName, setCategoryName] = useState('');
  const [loading, setLoading] = useState(true);
  const image = image_urls?.[0]; 


  useEffect(() => {
    if (!category_id) {
      setCategoryName('Unknown Category');
      setLoading(false);
      return;
    }
  
    const fetchCategory = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/category/${category_id}/details`);
        const data = await response.json();
        if (data.name) {
          setCategoryName(data.name);
        } else {
          setCategoryName('Unknown Category');
        }
      } catch (error) {
        console.error('Error fetching category:', error);
        setCategoryName('Unknown Category');
      } finally {
        setLoading(false);
      }
    };
  
    fetchCategory();
  }, [category_id]);
  

  return (
<section id="products" className="d-flex justify-content-center">
  <div className="pro-container d-flex flex-wrap gap-3">
    {/* Product Image */}
    <div className="pro">
      {image && (
        <img
          src={image}
          alt={name}
          className="product-image"
          style={{
            height: '250px',
            objectFit: 'cover',
            width: '100%',
            borderRadius: '8px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            transition: 'transform 0.3s ease',
          }}
        />
      )}
      
      <div className="product_description">
        {/* Product Title */}
        <h5 className="product_title">{name}</h5>
        
        {/* Category Name */}
        {loading ? (
          <span className="product_category">Loading category...</span>
        ) : (
          <span className="product_category">{categoryName}</span>
        )}

        {/* Product Rating */}
        <div className="star mb-2">
          {[...Array(rating)].map((_, index) => (
            <FaStar key={index} className="text-warning" />
          ))}
        </div>

        {/* Product Price */}
        <h4>{formatPrice(price)}</h4>

        {/* Add to Cart Icon */}
        <div className="cart-icon-container">
        <Link
            to={`/products/${_id}`}
          >
                     <FaShoppingCart className="cart-icon text-dark" />
          </Link>
        </div>
      </div>
    </div>
  </div>
</section>

  );
}
