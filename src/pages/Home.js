import React from 'react';
import BannerSection from '../components/BannerSection';
import FeatureSection from '../components/FeatureSection';
import FeaturedProducts from '../components/FeaturedProducts';
import Footer from '../components/Footer';
import {Link} from 'react-router-dom';

const Home = () => {
  return (
    <>
      {/* Hero Banner */}
      <BannerSection
  id="hero-section"
  backgroundImage="/images/banners/hero-banner.png"
  heading="Leading Sports Equipment Shopping Center"
  subheading="Shop the best sports equipment and gear!"
  buttonText="Shop Now"
  buttonLink="/products"
/>

      {/* Features Section */}
      <FeatureSection />

      {/* Featured Products */}
      <FeaturedProducts
      title='Featured Products'
      subtitle='Best-Selling Gear This Season'
      />

      {/* Custom Shoe Banner */}
      <BannerSection
  id="banner"
  backgroundImage="/images/banners/shoe-banner.png"
  customContent={
    <div className="text-center text-light p-5">
      <h2 className="display-4 fw-bold">Up to <span>70%</span> Off All Sports Accessories</h2>
      <p>Discover the latest sports trends</p>
      <Link to="/products" className="shop-btn">Explore More</Link>
    </div>
  }
/>

      {/* as new arrivals */}
        <FeaturedProducts 
        title='New Arrival Products'
        subtitle='Checkout the latest addition'
        />
      <BannerSection
        id="news_letter"
        backgroundImage="/images/banners/b14.png"
        customContent={
          <div className="newsText text-center text-light p-5">
          <h4>
            <Link to="/register" className="text-danger">
              Sign Up
            </Link>{' '}
            For News Letter
          </h4>
          <p>
            Get E-mail updates about our latest shop and <span>special offers.</span>
          </p>
        </div>
        }
      />
      <Footer />
    </>
  );
};

export default Home;
