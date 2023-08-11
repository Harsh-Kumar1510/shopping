import React from 'react';
import { Link } from 'react-router-dom';
import Rating from './Rating';
import './styles/producthelp.css';
function Product({ product }) {
  return (
    <div className='product-card'>
      <Link to={`/product/${product._id}`}>
        <div className='product-image'>
          <img src={product.image} alt={product.name} />
        </div>
      </Link>
      <div className='product-details'>
        <Link to={`/product/${product._id}`}>
          <div className='product-name'>{product.name}</div>
        </Link>
        <div className='product-rating'>
          {product.rating} star from {product.numReviews} reviews
        </div>
        <div className='product-price'>₹{product.price}</div>
        <div className="rating">
            <Rating value={product.rating} text={`${product.numReviews} reviews`} color="#f8e825" />
          </div>
      </div>
    </div>
  );
}

export default Product;
