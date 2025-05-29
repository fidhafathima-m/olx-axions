import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './EditProduct.css';
import Header from '../Header/Header';
import axios from 'axios';

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    category: '',
    price: '',
    image: '',
    description: '',
    location: '',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const categories = [
    'Electronics',
    'Cars',
    'Properties',
    'Mobiles',
    'Jobs',
    'Bikes',
    'Fashion',
    'Books',
    'Furniture',
    'Sports',
    'Pets',
    'Services',
    'Other'
  ];

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/products/${id}`);
        if (response.data.success) {
          const { name, category, price, image, description, location } = response.data.data;
          setForm({ 
            name: name || '', 
            category: category || '', 
            price: price || '', 
            image: image || '',
            description: description || '',
            location: location || ''
          });
        }
        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch product', err);
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    
    try {
      const res = await axios.put(`${import.meta.env.VITE_API_URL}/api/products/${id}`, 
        form, {
        headers: { 'Content-Type': 'application/json' },
      });
      if (res.data.success) {
        const successDiv = document.createElement('div');
        successDiv.className = 'success-toast';
        successDiv.textContent = 'Product updated successfully!';
        document.body.appendChild(successDiv);
        setTimeout(() => {
          document.body.removeChild(successDiv);
          navigate('/my-ads');
        }, 2000);
      }
    } catch (err) {
      console.error('Error updating product:', err);
      alert('Error updating product. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <>
        <Header />
        <div className="edit-product-container">
          <div className="loading-spinner">
            <div className="spinner"></div>
            <p>Loading product details...</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="edit-product-container">
        <div className="edit-product-wrapper">
          <div className="edit-product-header">
            <button 
              className="back-btn" 
              onClick={() => navigate('/my-ads')}
            >
              ← Back to My Ads
            </button>
            <h1 className="edit-product-title">Edit your ad</h1>
            <p className="edit-product-subtitle">Update your product details</p>
          </div>

          <div className="edit-product-card">
            <form onSubmit={handleSubmit} className="edit-product-form">
              <div className="form-section">
                <h3 className="section-title">INCLUDE SOME DETAILS</h3>
                
                <div className="form-group">
                  <label htmlFor="name">Ad Title *</label>
                  <input
                    id="name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Title"
                    maxLength="70"
                    required
                  />
                  <small className="char-count">{form.name.length}/70</small>
                </div>

                <div className="form-group">
                  <label htmlFor="category">Category *</label>
                  <select
                    id="category"
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select a category</option>
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                
              </div>

              <div className="form-section">
                <h3 className="section-title">SET A PRICE</h3>
                
                <div className="form-group">
                  <label htmlFor="price">Price *</label>
                  <div className="price-input-wrapper">
                    <span className="currency">₹</span>
                    <input
                      id="price"
                      name="price"
                      value={form.price}
                      onChange={handleChange}
                      placeholder="0"
                      type="number"
                      min="0"
                      step="1"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="form-section">
                <h3 className="section-title">UPLOAD PHOTOS</h3>
                
                <div className="form-group">
                  <label htmlFor="image">Image URL *</label>
                  <input
                    id="image"
                    name="image"
                    value={form.image}
                    onChange={handleChange}
                    placeholder="Enter image URL"
                    type="url"
                    required
                  />
                  {form.image && (
                    <div className="image-preview">
                      <img
                        alt="Product preview"
                        src={form.image}
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/200x200?text=Image+Not+Found';
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>


              <div className="form-actions">
                <button 
                  type="button" 
                  className="cancel-btn" 
                  onClick={() => navigate('/my-ads')}
                  disabled={saving}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="save-btn" 
                  disabled={saving}
                >
                  {saving ? (
                    <>
                      <span className="btn-spinner"></span>
                      Updating...
                    </>
                  ) : (
                    'Update Ad'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditProduct;