import React, { useEffect } from 'react';
import Heart from '../../assets/Heart';
import './Post.css';
import { useProductStore } from '../../store/product';
import { usePost } from '../../context/postContext';

function Posts() {
  const fetchProducts = useProductStore((state) => state.fetchProducts);
  const products = useProductStore((state) => state.products);
  const { addPost } = usePost();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const productsByCategory = products.reduce((acc, product) => {
    if (!acc[product.category]) {
      acc[product.category] = [];
    }
    acc[product.category].push(product);
    return acc;
  }, {});

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN').format(price);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString || Date.now());
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'TODAY';
    if (diffDays <= 7) return `${diffDays} DAYS AGO`;
    return date.toLocaleDateString('en-GB', { 
      day: 'numeric', 
      month: 'short' 
    }).toUpperCase();
  };

  return (
    <div className="postParentDiv">
      {Object.entries(productsByCategory).map(([category, categoryProducts]) => (
        <div key={category} className="category-section">
          <div className="heading-cat">
            <h2>{category}</h2>
            <span className="view-more">View more</span>
          </div>
          <div className="cards">
            {categoryProducts.slice(0, 8).map((product) => (
              <div
                className="card"
                onClick={() => addPost(product)}
                key={product._id}
              >
                <div className="favorite">
                  <Heart />
                </div>
                <div className="image">
                  <img src={product.image} alt={product.name} />
                </div>
                <div className="content">
                  <p className="rate">₹ {formatPrice(product.price)}</p>
                  <p className="name">{product.name}</p>
                  <span className="category-tag">{product.category}</span>
                </div>
                <div className="date">
                  <span>{formatDate(product.createdAt)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Posts;