import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { formatCurrency, products } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import {
  ArrowLeft,
  Heart,
  ShoppingBag,
  Star,
  CheckCircle2,
  ShieldCheck,
  Truck,
  RotateCcw
} from 'lucide-react';

export const ProductDetailPage = ({ product, onBack, onSelectProduct }) => {
  const { addToCart, toggleWishlist, isWishlisted } = useCart();
  const [quantity, setQuantity] = useState(1);
  const wishlisted = isWishlisted(product.id);

  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="container" style={{ padding: '2rem 1.25rem' }}>
      {/* Back button */}
      <button
        onClick={onBack}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          fontWeight: '600',
          color: 'var(--text-muted)',
          marginBottom: '1.5rem',
          fontSize: '0.95rem'
        }}
      >
        <ArrowLeft size={18} /> Back to Products
      </button>

      {/* Detail Layout */}
      <div className="detail-layout">
        {/* Product Image Gallery */}
        <div className="detail-gallery">
          <img
            src={product.image}
            alt={product.name}
            className="detail-main-img"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
            }}
          />
          {product.discount > 0 && (
            <span
              className="product-discount-badge"
              style={{ padding: '0.35rem 0.75rem', fontSize: '0.85rem' }}
            >
              Save {product.discount}%
            </span>
          )}
        </div>

        {/* Product Information */}
        <div className="detail-info">
          <span className="product-category-tag">{product.category}</span>
          <h1 className="detail-title">{product.name}</h1>

          {/* Rating */}
          <div className="product-rating" style={{ fontSize: '0.95rem', marginBottom: '1rem' }}>
            <Star size={18} fill="#f59e0b" color="#f59e0b" />
            <strong>{product.rating}</strong>
            <span className="product-reviews-count">
              ({product.reviews} customer reviews)
            </span>
          </div>

          {/* Pricing */}
          <div className="detail-price-box">
            <span className="detail-price">{formatCurrency(product.price)}</span>
            {product.oldPrice && (
              <span className="product-old-price" style={{ fontSize: '1.25rem' }}>
                {formatCurrency(product.oldPrice)}
              </span>
            )}
          </div>

          {/* Description */}
          <p className="detail-desc">{product.description}</p>

          {/* Key Features */}
          {product.features && (
            <div style={{ marginBottom: '1.5rem' }}>
              <h4 style={{ fontSize: '0.95rem', fontWeight: '700', marginBottom: '0.75rem' }}>
                Product Highlights:
              </h4>
              <ul className="detail-features">
                {product.features.map((feat, index) => (
                  <li key={index}>
                    <CheckCircle2 size={16} color="var(--success)" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Stock status */}
          <div style={{ marginBottom: '1.5rem', fontSize: '0.9rem' }}>
            Status:{' '}
            <strong style={{ color: product.stock > 0 ? 'var(--success)' : 'var(--danger)' }}>
              {product.stock > 0 ? `In Stock (${product.stock} units left)` : 'Out of Stock'}
            </strong>
          </div>

          {/* Quantity and Actions */}
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '2rem' }}>
            <div className="quantity-control">
              <button
                className="quantity-btn"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              >
                -
              </button>
              <span className="quantity-value">{quantity}</span>
              <button
                className="quantity-btn"
                onClick={() => setQuantity((q) => Math.min(product.stock || 99, q + 1))}
              >
                +
              </button>
            </div>

            <button
              className="btn btn-primary"
              style={{ flex: 1 }}
              onClick={() => addToCart(product, quantity)}
            >
              <ShoppingBag size={18} />
              Add to Cart • {formatCurrency(product.price * quantity)}
            </button>

            <button
              className={`icon-btn ${wishlisted ? 'active' : ''}`}
              onClick={() => toggleWishlist(product)}
              style={{ width: '48px', height: '48px' }}
              title={wishlisted ? 'In Wishlist' : 'Add to Wishlist'}
            >
              <Heart size={20} fill={wishlisted ? '#ef4444' : 'none'} color={wishlisted ? '#ef4444' : 'currentColor'} />
            </button>
          </div>

          {/* Trust badges */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '0.75rem',
              paddingTop: '1.5rem',
              borderTop: '1px solid var(--border)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem' }}>
              <Truck size={16} color="var(--primary)" /> Free shipping over ₹100
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem' }}>
              <RotateCcw size={16} color="var(--primary)" /> 30-day money-back guarantee
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem' }}>
              <ShieldCheck size={16} color="var(--primary)" /> 2-year warranty included
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {related.length > 0 && (
        <div style={{ marginTop: '4rem' }}>
          <h2 className="section-title" style={{ marginBottom: '1.5rem' }}>
            Similar Products You Might Like
          </h2>
          <div className="products-grid">
            {related.map((item) => (
              <ProductCard
                key={item.id}
                product={item}
                onSelectProduct={onSelectProduct}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
