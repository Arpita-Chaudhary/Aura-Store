import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { formatCurrency } from '../data/products';
import { Trash2, ArrowRight, ArrowLeft, ShoppingBag, Tag, Check } from 'lucide-react';

export const CartPage = ({ onNavigateToProducts, onProceedToCheckout }) => {
  const {
    cart,
    updateQuantity,
    removeFromCart,
    clearCart,
    cartSubtotal,
    shipping,
    tax,
    cartTotal,
    showToast
  } = useCart();

  const [promoCode, setPromoCode] = useState('');
  const [discountAmount, setDiscountAmount] = useState(0);
  const [appliedPromo, setAppliedPromo] = useState('');

  const handleApplyPromo = () => {
    if (promoCode.trim().toUpperCase() === 'AURA10') {
      const discount = cartSubtotal * 0.1;
      setDiscountAmount(discount);
      setAppliedPromo('AURA10 (10% OFF)');
      showToast('Promo code applied: 10% discount!');
    } else if (promoCode.trim().toUpperCase() === 'FREESHIP') {
      setDiscountAmount(shipping);
      setAppliedPromo('FREESHIP (Free Shipping)');
      showToast('Promo code applied: Free shipping!');
    } else {
      showToast('Invalid promo code. Try AURA10 or FREESHIP', 'info');
    }
  };

  const finalTotal = Math.max(0, cartTotal - discountAmount);

  if (cart.length === 0) {
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
          <ShoppingBag size={56} color="var(--text-muted)" style={{ marginBottom: '1.25rem' }} />
          <h2 style={{ fontSize: '1.75rem', fontWeight: '800', marginBottom: '0.75rem' }}>
            Your Cart is Empty
          </h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
            Looks like you haven't added anything to your cart yet. Explore our top products and finds!
          </p>
          <button className="btn btn-primary" onClick={onNavigateToProducts}>
            Start Shopping <ArrowRight size={16} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container" style={{ padding: '2rem 1.25rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: '800' }}>
          Shopping Cart ({cart.reduce((s, i) => s + i.quantity, 0)})
        </h1>
        <button
          onClick={clearCart}
          style={{
            color: 'var(--danger)',
            fontSize: '0.85rem',
            fontWeight: '600',
            display: 'flex',
            alignItems: 'center',
            gap: '0.35rem'
          }}
        >
          <Trash2 size={14} /> Clear Cart
        </button>
      </div>

      <div className="cart-layout">
        {/* Cart items list */}
        <div className="cart-card">
          {cart.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.name} className="cart-item-img" />

              <div>
                <span className="product-category-tag" style={{ fontSize: '0.7rem' }}>
                  {item.category}
                </span>
                <h4 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '0.25rem' }}>
                  {item.name}
                </h4>
                <div style={{ color: 'var(--primary)', fontWeight: '700' }}>
                  {formatCurrency(item.price)}
                </div>
              </div>

              {/* Quantity */}
              <div className="quantity-control">
                <button
                  className="quantity-btn"
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                >
                  -
                </button>
                <span className="quantity-value">{item.quantity}</span>
                <button
                  className="quantity-btn"
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                >
                  +
                </button>
              </div>

              {/* Total & Remove */}
              <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.5rem' }}>
                <strong style={{ fontSize: '1.05rem' }}>
                  {formatCurrency(item.price * item.quantity)}
                </strong>
                <button
                  onClick={() => removeFromCart(item.id)}
                  style={{ color: 'var(--text-muted)' }}
                  title="Remove item"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}

          <div style={{ marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border)' }}>
            <button
              onClick={onNavigateToProducts}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                color: 'var(--primary)',
                fontWeight: '600',
                fontSize: '0.9rem'
              }}
            >
              <ArrowLeft size={16} /> Continue Shopping
            </button>
          </div>
        </div>

        {/* Order Summary sidebar */}
        <div className="cart-card">
          <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '1.25rem' }}>
            Order Summary
          </h3>

          <div className="order-summary-row">
            <span>Subtotal</span>
            <span>{formatCurrency(cartSubtotal)}</span>
          </div>

          <div className="order-summary-row">
            <span>Estimated Shipping</span>
            <span>{shipping === 0 ? <strong style={{ color: 'var(--success)' }}>FREE</strong> : formatCurrency(shipping)}</span>
          </div>

          <div className="order-summary-row">
            <span>Estimated Tax (8%)</span>
            <span>{formatCurrency(tax)}</span>
          </div>

          {discountAmount > 0 && (
            <div className="order-summary-row" style={{ color: 'var(--success)', fontWeight: '600' }}>
              <span>Discount ({appliedPromo})</span>
              <span>-{formatCurrency(discountAmount)}</span>
            </div>
          )}

          <div className="order-summary-row total">
            <span>Total</span>
            <span style={{ color: 'var(--primary)' }}>{formatCurrency(finalTotal)}</span>
          </div>

          {/* Promo code */}
          <div style={{ margin: '1.5rem 0' }}>
            <label style={{ fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.4rem', display: 'block' }}>
              Promo Code
            </label>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <input
                type="text"
                placeholder="Try AURA10"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                style={{
                  flex: 1,
                  padding: '0.55rem 0.75rem',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-md)',
                  outline: 'none',
                  fontSize: '0.85rem',
                  textTransform: 'uppercase'
                }}
              />
              <button className="btn btn-secondary btn-sm" onClick={handleApplyPromo}>
                Apply
              </button>
            </div>
          </div>

          <button
            className="btn btn-primary btn-block btn-lg"
            onClick={() => onProceedToCheckout(discountAmount, appliedPromo)}
          >
            Proceed to Checkout <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};
