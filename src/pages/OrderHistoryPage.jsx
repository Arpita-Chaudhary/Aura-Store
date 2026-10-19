import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { formatCurrency } from '../data/products';
import {
  Package,
  Calendar,
  CheckCircle2,
  Clock,
  Truck,
  ArrowRight,
  ShieldCheck,
  ShoppingBag,
  ExternalLink,
  Receipt,
  RotateCcw
} from 'lucide-react';

export const OrderHistoryPage = ({ onSelectProduct, onNavigateToProducts }) => {
  const { orders = [], addToCart, showToast, resetDefaultOrders } = useCart();

  // If orders is empty, auto-seed default verified orders for Harshit
  React.useEffect(() => {
    if ((!orders || orders.length === 0) && resetDefaultOrders) {
      resetDefaultOrders();
    }
  }, [orders, resetDefaultOrders]);

  const handleReorder = (item) => {
    addToCart(item);
    showToast(`Added ${item.name} back to your cart!`);
  };

  const getStatusBadge = (status = 'Processing') => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return {
          bg: '#dcfce7',
          color: '#15803d',
          border: '#bbf7d0',
          icon: <CheckCircle2 size={14} />
        };
      case 'in transit':
      case 'shipped':
        return {
          bg: '#eff6ff',
          color: '#1d4ed8',
          border: '#bfdbfe',
          icon: <Truck size={14} />
        };
      default:
        return {
          bg: '#fef3c7',
          color: '#b45309',
          border: '#fde68a',
          icon: <Clock size={14} />
        };
    }
  };

  return (
    <div className="container" style={{ padding: '2.5rem 1.25rem 4rem 1.25rem' }}>
      {/* Header Banner */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem',
          marginBottom: '2rem'
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <h1 style={{ fontSize: '2rem', fontWeight: '800', margin: 0, letterSpacing: '-0.5px' }}>
              Order History
            </h1>
            <span
              style={{
                background: 'var(--primary-light)',
                color: 'var(--primary)',
                fontWeight: '700',
                fontSize: '0.85rem',
                padding: '4px 10px',
                borderRadius: '999px'
              }}
            >
              {orders.length} {orders.length === 1 ? 'Order' : 'Orders'}
            </span>
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', margin: '0.35rem 0 0 0' }}>
            Track, review, and manage all your past purchases and Razorpay payment receipts.
          </p>
        </div>

        <button
          onClick={onNavigateToProducts}
          className="btn btn-primary"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.65rem 1.25rem' }}
        >
          <ShoppingBag size={18} /> Continue Shopping
        </button>
      </div>

      {/* Orders List or Empty State */}
      {orders.length === 0 ? (
        <div
          style={{
            background: 'var(--surface)',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--border)',
            padding: '4rem 2rem',
            textAlign: 'center',
            maxWidth: '560px',
            margin: '2rem auto'
          }}
        >
          <div
            style={{
              width: '72px',
              height: '72px',
              borderRadius: '50%',
              background: 'var(--primary-light)',
              color: 'var(--primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.25rem auto'
            }}
          >
            <Package size={36} />
          </div>
          <h3 style={{ fontSize: '1.3rem', fontWeight: '700', marginBottom: '0.5rem' }}>
            No orders found
          </h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem', lineHeight: 1.5 }}>
            You haven't placed any orders yet. Discover our latest trending products and special deals today!
          </p>
          <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              onClick={onNavigateToProducts}
              className="btn btn-primary"
              style={{ padding: '0.75rem 1.75rem', fontWeight: '700' }}
            >
              Start Shopping Now
            </button>
            {resetDefaultOrders && (
              <button
                onClick={resetDefaultOrders}
                className="btn btn-secondary"
                style={{ padding: '0.75rem 1.5rem', fontWeight: '700' }}
              >
                Load Sample Orders
              </button>
            )}
          </div>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {orders.map((order) => {
            const badge = getStatusBadge(order.deliveryStatus);
            return (
              <div
                key={order.orderId}
                style={{
                  background: 'var(--surface)',
                  borderRadius: 'var(--radius-lg)',
                  border: '1px solid var(--border)',
                  overflow: 'hidden',
                  boxShadow: 'var(--shadow-sm)',
                  transition: 'box-shadow 0.2s ease'
                }}
              >
                {/* Order Top Bar */}
                <div
                  style={{
                    padding: '1rem 1.25rem',
                    background: 'var(--surface-hover)',
                    borderBottom: '1px solid var(--border)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: '0.85rem'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', flexWrap: 'wrap' }}>
                    <div>
                      <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: '600', letterSpacing: '0.5px' }}>
                        Order Placed
                      </div>
                      <div style={{ fontSize: '0.9rem', fontWeight: '700', color: 'var(--text)' }}>
                        {order.date}
                      </div>
                    </div>

                    <div>
                      <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: '600', letterSpacing: '0.5px' }}>
                        Total Amount
                      </div>
                      <div style={{ fontSize: '0.95rem', fontWeight: '800', color: 'var(--primary)' }}>
                        {formatCurrency(order.total || 0)}
                      </div>
                    </div>

                    <div>
                      <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: '600', letterSpacing: '0.5px' }}>
                        Payment Method
                      </div>
                      <div style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--text)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                        <ShieldCheck size={14} color="#16a34a" />
                        <span>{order.paymentMethod || 'RAZORPAY'}</span>
                      </div>
                    </div>

                    <div>
                      <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: '600', letterSpacing: '0.5px' }}>
                        Payment ID
                      </div>
                      <code style={{ fontSize: '0.8rem', background: 'var(--surface)', padding: '2px 6px', borderRadius: '4px', border: '1px solid var(--border)', color: '#0369a1' }}>
                        {order.paymentId || 'pay_verified'}
                      </code>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    {/* Status Pill */}
                    <div
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.35rem',
                        padding: '0.35rem 0.75rem',
                        borderRadius: '999px',
                        fontSize: '0.8rem',
                        fontWeight: '700',
                        background: badge.bg,
                        color: badge.color,
                        border: `1px solid ${badge.border}`
                      }}
                    >
                      {badge.icon}
                      <span>{order.deliveryStatus || 'Processing'}</span>
                    </div>

                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: '600' }}>
                      ID: <strong>{order.orderId}</strong>
                    </div>
                  </div>
                </div>

                {/* Order Body / Items List */}
                <div style={{ padding: '1.25rem' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {order.items?.map((item, idx) => (
                      <div
                        key={idx}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          gap: '1rem',
                          paddingBottom: idx === order.items.length - 1 ? 0 : '1rem',
                          borderBottom: idx === order.items.length - 1 ? 'none' : '1px solid var(--border)'
                        }}
                      >
                        {/* Thumbnail & Title */}
                        <div
                          style={{ display: 'flex', alignItems: 'center', gap: '1rem', cursor: onSelectProduct ? 'pointer' : 'default', flex: 1 }}
                          onClick={() => onSelectProduct && onSelectProduct(item)}
                        >
                          <img
                            src={item.image}
                            alt={item.name}
                            style={{
                              width: '64px',
                              height: '64px',
                              borderRadius: 'var(--radius-md)',
                              objectFit: 'cover',
                              background: 'var(--surface-hover)',
                              border: '1px solid var(--border)'
                            }}
                          />
                          <div>
                            <div style={{ fontWeight: '700', fontSize: '0.95rem', color: 'var(--text)' }}>
                              {item.name}
                            </div>
                            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                              Qty: <strong>{item.quantity}</strong> &bull; Category: {item.category || 'General'}
                            </div>
                            <div style={{ fontSize: '0.9rem', fontWeight: '700', color: 'var(--primary)', marginTop: '3px' }}>
                              {formatCurrency(item.price)} each
                            </div>
                          </div>
                        </div>

                        {/* Actions */}
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                          <button
                            onClick={() => handleReorder(item)}
                            className="btn btn-secondary btn-sm"
                            style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.82rem' }}
                            title="Add item back to cart"
                          >
                            <RotateCcw size={14} /> Buy Again
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Delivery destination footer */}
                  {order.customer?.address && (
                    <div
                      style={{
                        marginTop: '1.25rem',
                        paddingTop: '1rem',
                        borderTop: '1px dashed var(--border)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        fontSize: '0.82rem',
                        color: 'var(--text-muted)'
                      }}
                    >
                      <div>
                        Shipping To: <strong style={{ color: 'var(--text)' }}>{order.customer.name}</strong> &bull; {order.customer.address}
                      </div>
                      {order.estimatedDelivery && (
                        <div>
                          Est. Delivery: <strong style={{ color: 'var(--text)' }}>{order.estimatedDelivery}</strong>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
