import React from 'react';
import { useCart } from '../context/CartContext';
import { ProductCard } from '../components/ProductCard';
import { Heart, ArrowRight } from 'lucide-react';

export const WishlistPage = ({ onSelectProduct, onNavigateToProducts }) => {
  const { wishlist } = useCart();

  if (wishlist.length === 0) {
    return (
      <div className="container" style={{ padding: '4rem 1.25rem', textAlign: 'center' }}>
        <div
          style={{
            maxWidth: '500px',
            margin: '0 auto',
            background: 'var(--surface)',
            padding: '3.5rem 2rem',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--border)'
          }}
        >
          <Heart size={56} color="#ef4444" style={{ marginBottom: '1.25rem' }} />
          <h2 style={{ fontSize: '1.75rem', fontWeight: '800', marginBottom: '0.75rem' }}>
            Your Wishlist is Empty
          </h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
            Tap the heart icon on any product to save it here for later.
          </p>
          <button className="btn btn-primary" onClick={onNavigateToProducts}>
            Explore Products <ArrowRight size={16} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container" style={{ padding: '2rem 1.25rem' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '0.5rem' }}>
        My Wishlist ({wishlist.length})
      </h1>
      <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
        Products you have saved for later.
      </p>

      <div className="products-grid">
        {wishlist.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onSelectProduct={onSelectProduct}
          />
        ))}
      </div>
    </div>
  );
};
