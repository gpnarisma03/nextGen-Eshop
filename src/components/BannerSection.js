import React from 'react';
import { Link } from 'react-router-dom';

const BannerSection = ({
  id,
  backgroundImage = '/images/banners/default-banner.png',
  heading = 'Default Heading',
  subheading = 'Default Subheading',
  buttonText = 'Shop Now',
  buttonLink = '/products',
  overlayClass = '',
  sectionClass = '',
  headingClass = 'display-4 fw-bold mb-4',
  subheadingClass = 'lead mb-4',
  promoHeading = '',
  promoText = '',
  promoButtonText = '',
  promoButtonLink = '#',
  promoHeadingClass = 'display-4 fw-bold',
  promoButtonClass = 'promo-btn',
  promoNumber = '',
  promoHeading2 = '',
  promoText1 = '',
  customContent = null 
}) => {
  const sectionStyle = {
    backgroundImage: `url(${backgroundImage})`,
    ...(id !== 'news_letter' && {
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
    }),
  };
  

  return (
    <section
      id={id}
      className={`hero-section text-center text-light d-flex align-items-center justify-content-center ${sectionClass}`}
      style={sectionStyle}
    >
      <div className={`overlay ${overlayClass}`}>
        {/* Custom content takes full control if provided */}
        {customContent ? (
          customContent
        ) : (
          <>
            <h1 className={headingClass}>{heading}</h1>
            <p className={subheadingClass}>{subheading}</p>

            {/* Optional Promo */}
            {promoHeading && (
              <h2 className={promoHeadingClass}>
                {promoHeading} <span>{promoNumber}</span> {promoText}
              </h2>
            )}

            {promoButtonText && (
              <Link to={promoButtonLink} className={promoButtonClass}>
                {promoButtonText}
              </Link>
            )}

            {/* Main Button */}
            <Link to={buttonLink} className="shop-btn">
              {buttonText}
            </Link>
          </>
        )}
      </div>
    </section>
  );
};

export default BannerSection;
