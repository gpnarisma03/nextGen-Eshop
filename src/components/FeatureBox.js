import React from 'react';

const FeatureBox = ({ image, title }) => {
  return (
    <div className="fe-box text-center m-2">
      <img src={image} alt={title} />
      <h6>{title}</h6>
    </div>
  );
};

export default FeatureBox;
