import React from 'react';
import { useCart } from '../context/CartContext';
import { formatCurrency } from '../data/products';
import { Heart, Star, ShoppingBag } from 'lucide-react';

export const ProductCard = ({ product, onSelectProduct }) => {
  const { addToCart, toggleWishlist, isWishlisted } = useCart();
  const wishlisted = isWishlisted(product.id);

  return (
    <div className="product-card">
      <div
        className="product-card-image-wrapper"
        onClick={() => onSelectProduct(product)}
      >
        <img
          src={product.image}
          alt={product.name}
          className="product-card-image"
          loading="lazy"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
          }}
        />
        {product.discount > 0 && (
          <span className="product-discount-badge">-{product.discount}% OFF</span>
        )}
        <button
          className={`product-wishlist-btn ${wishlisted ? 'active' : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product);
          }}
          title={wishlisted ? 'Remove from wishlist' : 'Save to wishlist'}
        >
          <Heart size={18} fill={wishlisted ? '#ef4444' : 'none'} />
        </button>
      </div>

      <div className="product-card-content">
        <span className="product-category-tag">{product.category}</span>
        <h3
          className="product-title"
          onClick={() => onSelectProduct(product)}
        >
          {product.name}
        </h3>

        <div className="product-rating">
          <Star size={15} fill="#f59e0b" color="#f59e0b" />
          <span>{product.rating}</span>
          <span className="product-reviews-count">({product.reviews})</span>
        </div>

        <div className="product-price-row">
          <span className="product-price">{formatCurrency(product.price)}</span>
          {product.oldPrice && (
            <span className="product-old-price">
              {formatCurrency(product.oldPrice)}
            </span>
          )}
        </div>

        <div className="product-card-action">
          <button
            className="btn btn-primary btn-block btn-sm"
            onClick={() => addToCart(product, 1)}
          >
            <ShoppingBag size={16} />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};
