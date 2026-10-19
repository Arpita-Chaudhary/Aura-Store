import React from 'react';
import { formatCurrency } from '../data/products';
import {
  CheckCircle2,
  ArrowRight,
  PackageCheck,
  ShoppingBag,
  ShieldCheck,
  Receipt,
  Smartphone,
  Mail,
  Sparkles
} from 'lucide-react';

export const OrderSuccessPage = ({ order, onContinueShopping, onViewOrderHistory }) => {
  const displayOrder = order || (() => {
    try {
      const saved = localStorage.getItem('aura_last_order');
      if (saved) return JSON.parse(saved);
      const orders = JSON.parse(localStorage.getItem('aura_orders') || '[]');
      return orders[0] || null;
    } catch {
      return null;
    }
  })();

  return (
    <div className="container" style={{ padding: '3.5rem 1.25rem 5rem', textAlign: 'center' }}>
      <div
        style={{
          maxWidth: '680px',
          margin: '0 auto',
          background: 'var(--surface)',
          padding: '3rem 2.25rem',
          borderRadius: 'var(--radius-xl)',
          border: '1px solid var(--border)',
          boxShadow: '0 20px 40px -15px rgba(0, 0, 0, 0.1)',
          position: 'relative'
        }}
      >
        {/* Success Icon Badge */}
        <div
          style={{
            width: '84px',
            height: '84px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #dcfce7, #bbf7d0)',
            color: '#15803d',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.25rem',
            boxShadow: '0 10px 25px rgba(22, 163, 74, 0.25)',
            border: '4px solid #ffffff'
          }}
        >
          <CheckCircle2 size={52} strokeWidth={2.4} />
        </div>

        {/* Payment Successful Badge */}
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: '#dcfce7', color: '#15803d', padding: '5px 14px', borderRadius: '999px', fontSize: '0.85rem', fontWeight: '800', letterSpacing: '0.5px', marginBottom: '0.85rem' }}>
          <ShieldCheck size={16} /> PAYMENT COMPLETED SUCCESSFULLY
        </div>

        <h1 style={{ fontSize: '2.4rem', fontWeight: '900', color: '#0f172a', marginBottom: '0.5rem', letterSpacing: '-0.5px' }}>
          Payment Successful!
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', marginBottom: '2rem', maxWidth: '520px', margin: '0 auto 2rem' }}>
          Thank you! Your transaction of <strong>{displayOrder ? formatCurrency(displayOrder.total) : ''}</strong> has been authorized and verified. Your order is now confirmed.
        </p>

        {/* Detailed Receipt Box */}
        {displayOrder && (
          <div
            style={{
              background: '#f8fafc',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--border)',
              padding: '1.75rem',
              textAlign: 'left',
              marginBottom: '2rem',
              fontSize: '0.92rem'
            }}
          >
            {/* Payment Summary Top Highlights */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '1rem',
                paddingBottom: '1.25rem',
                borderBottom: '1px solid var(--border)',
                marginBottom: '1.25rem'
              }}
            >
              <div>
                <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: '700', letterSpacing: '0.5px' }}>
                  Amount Paid
                </span>
                <div style={{ fontSize: '1.6rem', fontWeight: '900', color: '#16a34a', marginTop: '2px' }}>
                  {formatCurrency(displayOrder.total)}
                </div>
              </div>

              <div>
                <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: '700', letterSpacing: '0.5px' }}>
                  Order Reference
                </span>
                <div style={{ fontSize: '1.15rem', fontWeight: '800', color: '#0f172a', marginTop: '4px' }}>
                  {displayOrder.orderId}
                </div>
              </div>
            </div>

            {/* Line Items */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: 'var(--text-muted)' }}>Payment Status:</span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', color: '#15803d', fontWeight: '800', background: '#dcfce7', padding: '3px 10px', borderRadius: '999px', fontSize: '0.8rem' }}>
                  <CheckCircle2 size={13} /> PAID & VERIFIED
                </span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>Payment Gateway:</span>
                <span style={{ fontWeight: '700', color: '#0f172a' }}>{displayOrder.paymentMethod || 'Razorpay Gateway'}</span>
              </div>

              {displayOrder.paymentId && (
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Razorpay Payment ID:</span>
                  <code
                    style={{
                      background: '#ffffff',
                      color: '#0369a1',
                      padding: '3px 8px',
                      borderRadius: '6px',
                      border: '1px solid #bae6fd',
                      fontSize: '0.85rem',
                      fontFamily: 'monospace',
                      fontWeight: '800'
                    }}
                  >
                    {displayOrder.paymentId}
                  </code>
                </div>
              )}

              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>Transaction Date:</span>
                <span style={{ fontWeight: '600' }}>{displayOrder.date}</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>Paid By:</span>
                <span style={{ fontWeight: '700', color: '#0f172a' }}>{displayOrder.customer?.name}</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>Shipping Destination:</span>
                <span style={{ maxWidth: '320px', textAlign: 'right', fontWeight: '500' }}>
                  {displayOrder.customer?.address}
                </span>
              </div>
            </div>

            {/* Notification alert */}
            <div
              style={{
                marginTop: '1.25rem',
                paddingTop: '1rem',
                borderTop: '1px dashed var(--border)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                fontSize: '0.82rem',
                color: 'var(--text-muted)'
              }}
            >
              <Smartphone size={16} color="var(--primary)" />
              <span>
                Order updates and live tracking details sent to <strong>{displayOrder.customer?.phone || '7876750012'}</strong>.
              </span>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button className="btn btn-primary" onClick={onContinueShopping} style={{ padding: '0.85rem 1.75rem', fontWeight: '700' }}>
            <ShoppingBag size={18} /> Continue Shopping
          </button>
          {onViewOrderHistory && (
            <button className="btn btn-secondary" onClick={onViewOrderHistory} style={{ padding: '0.85rem 1.75rem', fontWeight: '700' }}>
              <PackageCheck size={18} /> View Order History
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
