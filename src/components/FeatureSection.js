import React from 'react';
import FeatureBox from './FeatureBox';

const features = [
    { image: '/images/feature/f1.png', title: 'Free Shipping' },
    { image: '/images/feature/f2.png', title: 'Online Order' },
    { image: '/images/feature/f4.png', title: 'Save Money' },
    { image: '/images/feature/f5.png', title: 'Promotions' },
    { image: '/images/feature/f6.png', title: '24/7 Support' },
  ];
  
const FeatureSection = () => {
  return (
    <section id="feature" className="feature d-flex justify-content-center align-items-center flex-wrap p-5 text-center">
      {features.map((item, index) => (
        <FeatureBox key={index} image={item.image} title={item.title} />
      ))}
    </section>
  );
};

export default FeatureSection;
