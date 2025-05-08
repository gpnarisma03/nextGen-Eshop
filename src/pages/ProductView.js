import { useState, useEffect, useContext } from 'react';
import { Container, Card, Button, Row, Col, InputGroup, FormControl } from 'react-bootstrap';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'; 
import UserContext from '../context/UserContext';
import { FaMinus, FaPlus, FaShoppingCart } from 'react-icons/fa';

export default function ProductView() {
    const { user } = useContext(UserContext);
    const { productId } = useParams();
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState("");
    const [quantity, setQuantity] = useState(1);

    function addToCart(productId) {
        fetch(`${process.env.REACT_APP_API_BASE_URL}/cart/add-to-cart`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({ productId, quantity })
        })
        .then(async res => {
            if (res.status === 403) {
                Swal.fire('Forbidden', 'Admin access is not allowed.', 'error');
            } else if (res.status === 400) {
                Swal.fire('Missing Information', 'Product ID and Quantity are required.', 'warning');
            } else if (res.status === 404) {
                Swal.fire('Not Found', 'Product not found or inactive.', 'warning');
            } else if (res.status === 200) {
                Swal.fire('Success', 'Successfully added to cart!', 'success')
                    .then(() => navigate('/cart'));
            } else {
                Swal.fire('Server Error', 'Internal Server Error. Please contact support.', 'error');
            }
        })
        .catch(() => {
            Swal.fire('Network Error', 'Failed to connect to the server.', 'error');
        });
    }

    useEffect(() => {
    
        fetch(`${process.env.REACT_APP_API_BASE_URL}/products/${productId}/details`)
            .then(res => {
                if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
                return res.json();
            })
            .then(data => {
                const product = data.product;
                if (product) {
                    setName(product.name);
                    setDescription(product.description);
                    setPrice(product.price);
                    setImage(product.image_urls[0]);
                } else {
                    console.error("Product data is not in expected format:", data);
                }
            })
            .catch(error => {
                console.error('Error fetching product:', error);
            });
    }, [productId]);
    

    const decreaseQuantity = () => {
        if (quantity > 1) setQuantity(quantity - 1);
    };

    const increaseQuantity = () => {
        setQuantity(quantity + 1);
    };

    return (
        <Container className="py-5">
            <Row>
                <Col lg={{ span: 6, offset: 3 }}>
                    <Card className="shadow-lg">
                        {image && (
                            <Card.Img
                                variant="top"
                                src={image}
                                alt={name}
                                style={{
                                    width: '100%',         
                                    height: '300px',       
                                    objectFit: 'contain',  
                                    objectPosition: 'center'
                                }}
                            />
                        )}

                        <Card.Body className="text-center">
                            <Card.Title className="mb-3">{name}</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">Description:</Card.Subtitle>
                            <Card.Text className="mb-3">{description}</Card.Text>

                            <Card.Subtitle className="mb-2 text-muted">Price:</Card.Subtitle>
                            <Card.Text className="mb-4" style={{ color: '#28a745', fontSize: '1.5rem' }}>
                                ₱{price}
                            </Card.Text>

                            {/* Quantity Input */}
                            <InputGroup className="mb-3 justify-content-center">
                                <Button variant="outline-secondary" onClick={decreaseQuantity} disabled={quantity <= 1}>
                                    <FaMinus />
                                </Button>
                                <FormControl
                                    value={quantity}
                                    readOnly
                                    className="text-center"
                                    style={{ width: "60px" }}
                                />
                                <Button variant="outline-secondary" onClick={increaseQuantity}>
                                    <FaPlus />
                                </Button>
                            </InputGroup>

                            {/* Add to Cart or Login */}
                            {user.id !== null ? (
                                <Button variant="primary" className="w-100 mt-3" onClick={() => addToCart(productId)}>
                                    <FaShoppingCart className="me-2" />
                                    Add to Cart
                                </Button>
                            ) : (
                                <Link className="btn btn-danger w-100 mt-3" to="/login">
                                    Login to Add to Cart
                                </Link>
                            )}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}
