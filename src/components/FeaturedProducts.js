import { useState, useEffect } from 'react';
import {  Spinner, Alert } from 'react-bootstrap';
import PreviewProducts from './PreviewProducts';

export default function FeaturedProducts({ title = "Featured Products", subtitle = "New Modern Design" }) {

  const [previews, setPreviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_BASE_URL}/products/active`)
      .then(res => res.json())
      .then(data => {
        if (data.length === 0) {
          setError("No featured products available.");
          setLoading(false);
          return;
        }

        const featured = [];
        const numbers = new Set();

        // Helper function to generate a unique random number
        const generateRandomNumber = () => {
          let randomNum;
          do {
            randomNum = Math.floor(Math.random() * data.length);
          } while (numbers.has(randomNum));
          numbers.add(randomNum);
          return randomNum;
        };

        // Select 3 random featured products
        while (featured.length < 3) {
          const randomIndex = generateRandomNumber();
          featured.push(
            <PreviewProducts 
              data={data[randomIndex]} 
              key={data[randomIndex]._id} 
              breakPoint={4} 
            />
          );
        }

        setPreviews(featured);
        setLoading(false);
      })
      .catch(err => {
        setError("An error occurred while fetching products.");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="text-center">
        <Spinner animation="border" variant="primary" />
        <p>Loading featured products...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center">
        <Alert variant="danger">
          {error}
        </Alert>
      </div>
    );
  }

  return (
    <>
    <section id="products" className='products'>
      <h2 className="text-center mt-5">{title}</h2>
      <p className="text-center">{subtitle}</p>
      <div className="pro-container d-flex justify-content-center gap-1 gap-lg-5 pt-5 flex-wrap">
      {previews}
      </div>

        </section>
    </>
  );
}
