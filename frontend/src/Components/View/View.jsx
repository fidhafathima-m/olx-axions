import React from 'react';
import './View.css';
import { usePost } from '../../context/postContext';

function View() {
  const { post } = usePost();
  
  return (
    <div className="viewContainer">
      <div className="viewContent">
        {/* Left Section - Image */}
        <div className="imageSection">
          <div className="imageContainer">
            <img src={post.image} alt={post.name} />
          </div>
        </div>

        {/* Right Section - Details */}
        <div className="detailsSection">
          {/* Price and Title */}
          <div className="priceSection">
            <h1 className="price">₹ {post.price}</h1>
            <div className="priceSubtext">
              <span className="negotiable">Negotiable</span>
            </div>
          </div>

          {/* Product Title */}
          <div className="titleSection">
            <h2 className="productTitle">{post.name}</h2>
          </div>

          {/* Location and Date */}
          <div className="locationDateSection">
            <div className="locationInfo">
              <span className="category">{post.category}</span>
              <span className="separator">•</span>
              <span className="date">{new Date(post.createdAt).toDateString()}</span>
            </div>
          </div>

          {/* Description Placeholder */}
          <div className="descriptionSection">
            <h3>Description</h3>
            <p>Posted by {post.sellerName}</p>
          </div>

          {/* Seller Details */}
          <div className="sellerSection">
            <div className="sellerHeader">
              <div className="sellerAvatar">
                <span>{post.sellerName?.charAt(0)?.toUpperCase()}</span>
              </div>
              <div className="sellerInfo">
                <h4>{post.sellerName}</h4>
                <span className="memberSince">Member since 2020</span>
              </div>
            </div>
            
            <div className="contactActions">
              <button className="chatButton">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h4l4 4 4-4h4c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/>
                </svg>
                Chat
              </button>
              <button className="callButton">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                </svg>
                Call {post.sellerPhone}
              </button>
            </div>
          </div>

          {/* Safety Tips */}
          <div className="safetySection">
            <div className="safetyTip">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="#ff6b35">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
              <span>Stay alert: Never send money or share financial info</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default View;