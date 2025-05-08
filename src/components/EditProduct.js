import { useState, useEffect } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { FaEdit } from 'react-icons/fa';

export default function EditProduct({ product, fetchData }) {

  const [productId] = useState(product._id);
  const [name, setName] = useState(product.name);
  const [description, setDescription] = useState(product.description);
  const [price, setPrice] = useState(product.price);
  const [image, setImage] = useState(product.image_urls || ''); // Adjusted to image_urls
  const [categoryId, setCategoryId] = useState(product.category_id || '');  // Set initial category_id from the product
  const [showEdit, setShowEdit] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Fetch categories when the component mounts
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/category/all`);
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const editOpen = () => setShowEdit(true);
  const editClose = () => setShowEdit(false);

  const editProduct = async (e, productId) => {
    e.preventDefault();
  
    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/products/${productId}/update`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ name, description, price, image, category_id: categoryId }) // Corrected to use 'image' state
      });
  
      const data = await response.json();
  
      console.log('Response:', response);
      console.log('Data:', data);
  
      if (response.ok) {
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: data.message || 'Product updated successfully!',
          confirmButtonColor: '#3085d6'
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Failure!',
          text: data.message || 'Something went wrong.',
          confirmButtonColor: '#d33'
        });
      }
      editClose();
      fetchData();
  
    } catch (error) {
      console.error('Error editing product:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: error.message || 'Network error or server problem. Please try again.',
        confirmButtonColor: '#d33'
      });
      editClose();
    }
  };
  

  return (
    <>
      <Button variant="warning" size="sm" className="mx-1 d-flex align-items-center gap-1" onClick={editOpen}>
        <FaEdit /> Edit
      </Button>

      <Modal show={showEdit} onHide={editClose}>
        <Form onSubmit={(e) => editProduct(e, productId)}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Product</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" required value={name} onChange={(e) => setName(e.target.value)} />
            </Form.Group>

            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control type="text" required value={description} onChange={(e) => setDescription(e.target.value)} />
            </Form.Group>

            <Form.Group>
              <Form.Label>Price</Form.Label>
              <Form.Control type="number" required value={price} onChange={(e) => setPrice(e.target.value)} />
            </Form.Group>

            <Form.Group>
              <Form.Label>Image URL</Form.Label>
              <Form.Control
                type="url"
                placeholder="Enter image URL"
                value={image}
                onChange={(e) => setImage(e.target.value)} // Update the image URL state
              />
            </Form.Group>

            {/* Display Image Preview */}
            {image && (
              <div className="text-center mt-3">
                <img 
                  src={image} 
                  alt="Product Preview" 
                  style={{ width: '100px', height: '100px', objectFit: 'cover' }} 
                />
              </div>
            )}

            {/* Display Current Image URL */}
            {product.image_urls && (
              <div className="mt-3">
                <Form.Label>Current Image URL:</Form.Label>
                <Form.Control type="text" value={product.image_urls} readOnly />
              </div>
            )}

            {/* Category Dropdown */}
            <Form.Group>
              <Form.Label>Category</Form.Label>
              <Form.Select
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)} // Set categoryId
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
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={editClose}>Close</Button>
            <Button variant="success" type="submit">Save Changes</Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}
