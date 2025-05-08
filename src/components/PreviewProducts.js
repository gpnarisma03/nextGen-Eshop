import { Link } from 'react-router-dom';
import { FaStar, FaShoppingCart } from 'react-icons/fa';

export default function PreviewProducts(props) {
    const { data } = props;
    const { _id, name, price, image_urls, category_id, rating } = data;

    return (
            <div className='pro'>
                {image_urls && (
                   <img
                         variant="top"
                        src={image_urls}
                        alt={name}
                        style={{ height: '300px', objectFit: 'contain' }}
                    />
                )} 

                <div className='pro-container d-flex justify-content-between gap-1 gap-lg-5 pt-5 flex-wrap'>
                <div className="product_description">
                            <span className='product_category'>{category_id}</span>
                            <h5 className='product_title'>{name}</h5>
                            <div className="star mb-2">
                            {[...Array(rating)].map((_, index) => (
                                <FaStar key={index} className="text-warning" />
                            ))}
                            </div>

                            <h4>
                  ₱{price.toLocaleString('en-PH', {
                      minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                       })}
                            </h4>
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
        
    );
}
