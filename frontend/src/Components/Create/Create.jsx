import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Create.css'; 
import Header from '../Header/Header';
import { useAuth } from '../../context/auth';
import { useProductStore } from '../../store/product';

const categories = [
  'Electronics', 'Cars', 'Properties', 'Mobiles', 'Jobs',
  'Bikes', 'Fashion', 'Books', 'Furniture', 'Sports', 'Pets', 'Services', 'Other'
];

const Create = () => {
  const { user } = useAuth();
  const createProduct = useProductStore(state => state.createProduct);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '', category: '', price: '', image: '', 
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = 'Title is required';
    if (!form.category) newErrors.category = 'Category is required';
    if (!form.price || form.price <= 0) newErrors.price = 'Valid price required';
    if (!form.image.trim()) newErrors.image = 'Image URL is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async e => {
    console.log('clicked')
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    const productData = {
      ...form,
      sellerName: user.name,
      sellerPhone: user.phone
    };
    const res = await createProduct(productData);
    setSubmitting(false);
    if (res.success) navigate('/');
    else alert(res.message || 'Failed to create ad.');
  };

  return (
    <>
      <Header />
      <div className="edit-product-container">
        <div className="edit-product-wrapper">
          <div className="edit-product-header">
            <h1 className="edit-product-title">Create a New Ad</h1>
            <p className="edit-product-subtitle">Fill in the details below</p>
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
                  />
                  <small className="char-count">{form.name.length}/70</small>
                  {errors.name && <p className="error">{errors.name}</p>}
                </div>

                <div className="form-group">
                  <label htmlFor="category">Category *</label>
                  <select
                    id="category"
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                  >
                    <option value="">Select a category</option>
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                  {errors.category && <p className="error">{errors.category}</p>}
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
                    />
                  </div>
                  {errors.price && <p className="error">{errors.price}</p>}
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
                  />
                  {errors.image && <p className="error">{errors.image}</p>}
                  {form.image && (
                    <div className="image-preview">
                      <img
                        src={form.image}
                        alt="Preview"
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
                  onClick={() => navigate('/')}
                  disabled={submitting}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="save-btn"
                  disabled={submitting}
                >
                  {submitting ? (
                    <>
                      <span className="btn-spinner"></span> Posting...
                    </>
                  ) : 'Post Ad'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Create;
