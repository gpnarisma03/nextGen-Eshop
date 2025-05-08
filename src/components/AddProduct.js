import React, { useState, useEffect } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import Swal from 'sweetalert2';

const AddProduct = ({ fetchData }) => {
  const [showModal, setShowModal] = useState(false);
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productImageUrl, setProductImageUrl] = useState('');
  const [categoryId, setCategoryId] = useState(''); // categoryId will hold the _id
  const [categories, setCategories] = useState([]);
  const [stockQuantity, setStockQuantity] = useState('');
  const [sizeOptions, setSizeOptions] = useState('');

  useEffect(() => {
    // Fetch categories from backend
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/category/all`);
        const data = await response.json();
        setCategories(data); // Data now has _id, name, etc.
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleShowModal = () => setShowModal(true);

  const handleCloseModal = () => {
    setShowModal(false);
    setProductName('');
    setProductDescription('');
    setProductPrice('');
    setProductImageUrl('');
    setCategoryId('');
    setStockQuantity('');
    setSizeOptions('');
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    if (!token) {
      alert('You need to be logged in as an admin');
      return;
    }

    const newProduct = {
      name: productName,
      description: productDescription,
      price: parseFloat(productPrice),
      category_id: categoryId, // Sending _id as category_id
      stock_quantity: parseInt(stockQuantity, 10),
      size_options: sizeOptions ? sizeOptions.split(',').map(s => s.trim()) : [],
      image_urls: [productImageUrl]
    };

    console.log("New Product Data: ", newProduct); // Log the data to check category_id (_id)

    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/products/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(newProduct),
      });

      if (!response.ok) {
        throw new Error('Failed to add product');
      }

      const result = await response.json();
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: result.message || 'Product Added Successfully',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'OK',
      });

      fetchData();
      handleCloseModal();
    } catch (error) {
      console.error('Error adding product:', error);
      alert('Failed to add product. Please try again.');
    }
  };

  const isFormValid = productName && productDescription && productPrice && productImageUrl && categoryId && stockQuantity;

  return (
    <>
      <Button variant="primary" onClick={handleShowModal}>
        Add Product
      </Button>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleFormSubmit}>
            <Form.Group controlId="productName" className="mb-3">
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                type="text"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="productDescription" className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                value={productDescription}
                onChange={(e) => setProductDescription(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="productPrice" className="mb-3">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                value={productPrice}
                onChange={(e) => setProductPrice(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="productImageUrl" className="mb-3">
              <Form.Label>Image URL</Form.Label>
              <Form.Control
                type="text"
                value={productImageUrl}
                onChange={(e) => setProductImageUrl(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="categoryId" className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Select
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)} // Use the _id as value
                required
              >
                <option value="">-- Select Category --</option>
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>  {/* Use _id as the value */}
                    {category.name}  {/* Display the category name */}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group controlId="stockQuantity" className="mb-3">
              <Form.Label>Stock Quantity</Form.Label>
              <Form.Control
                type="number"
                value={stockQuantity}
                onChange={(e) => setStockQuantity(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="sizeOptions" className="mb-3">
              <Form.Label>Size Options (comma-separated)</Form.Label>
              <Form.Control
                type="text"
                placeholder="e.g., 5, 6, 7"
                value={sizeOptions}
                onChange={(e) => setSizeOptions(e.target.value)}
              />
            </Form.Group>
            <div className="d-flex justify-content-between">
              <Button variant="secondary" onClick={handleCloseModal}>
                Close
              </Button>
              <Button variant="primary" type="submit" disabled={!isFormValid}>
                Save Product
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AddProduct;
