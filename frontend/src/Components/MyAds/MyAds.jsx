import React, { useEffect } from 'react';
import { useAuth } from '../../context/auth';
import { useNavigate } from 'react-router-dom';
import './MyAds.css';
import Header from '../Header/Header';
import { BsPencilSquare, BsFillTrash3Fill } from "react-icons/bs";
import axios from 'axios';

function MyAds() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [products, setProducts] = React.useState([]);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    
    const fetchMyProducts = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/products/my-ads`, {params: {sellerPhone: user.phone}});
        if (response.data.success) {
          setProducts(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching my products:', error);
      }
    };

    fetchMyProducts();
  }, [user, navigate]);

  const handleDeleteAd = async (productId) => {
    if (window.confirm('Are you sure you want to delete this ad?')) {
      try {
        const response = await axios.delete(`${import.meta.env.VITE_API_URL}/api/products/${productId}`);
        if (response.status === 200) {
          setProducts(products.filter(product => product._id !== productId));
        }
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN').format(price);
  };

  return (
    <>
      <Header />
      <div className="my-ads-container">
        <div className="my-ads-header">
          <h1 className="my-ads-title">My Ads</h1>
          <div className="ads-count">{products.length} ads</div>
        </div>

        {products.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📦</div>
            <h3>You haven't posted any ads yet</h3>
            <p>Start selling by posting your first ad</p>
            <button 
              className="post-ad-btn"
              onClick={() => navigate('/create_post')}
            >
              Post your Ad
            </button>
          </div>
        ) : (
          <div className="ads-grid">
            {products.map(product => (
              <div key={product._id} className="ad-card">
                <div className="ad-image-container">
                  <img 
                    src={product.image || '/placeholder-image.jpg'} 
                    alt={product.name}
                    className="ad-image"
                  />
                  <div className="ad-actions">
                    <button 
                      className="action-btn edit-btn"
                      onClick={() => navigate(`/edit-product/${product._id}`)}
                      title="Edit Ad"
                    >
                      <BsPencilSquare />
                    </button>
                    <button 
                      className="action-btn delete-btn"
                      onClick={() => handleDeleteAd(product._id)}
                      title="Delete Ad"
                    >
                      <BsFillTrash3Fill />
                    </button>
                  </div>
                  <div className="ad-status">
                    <span className="status-badge active">Active</span>
                  </div>
                </div>
                
                <div className="ad-content">
                  <div className="ad-price">₹ {formatPrice(product.price)}</div>
                  <div className="ad-title">{product.name}</div>
                  <div className="ad-category">{product.category}</div>
                  <div className="ad-date">
                    {new Date(product.createdAt || Date.now()).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric'
                    })}
                  </div>
                </div>
                
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default MyAds;