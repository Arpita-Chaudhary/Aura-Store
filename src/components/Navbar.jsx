import React, { useState, useRef, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import {
  ShoppingBag,
  Heart,
  Search,
  User,
  Sparkles,
  LogOut,
  ChevronDown,
  UserCheck,
  Package
} from 'lucide-react';

export const Navbar = ({ currentView, setCurrentView, onOpenAuth, onSearchQuery, searchQuery }) => {
  const { cartCount, wishlist, user, logout, orders = [] } = useCart();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="navbar-header">
      <div className="container">
        <div className="navbar-inner">
          {/* Brand Logo */}
          <div
            className="navbar-logo"
            onClick={() => setCurrentView('home')}
            style={{ cursor: 'pointer' }}
          >
            <Sparkles size={24} color="#2563eb" />
            <span>Aura</span>Store
          </div>

          {/* Navigation Links */}
          <ul className="navbar-links">
            <li>
              <button
                className={`nav-link ${currentView === 'home' ? 'active' : ''}`}
                onClick={() => setCurrentView('home')}
              >
                Home
              </button>
            </li>
            <li>
              <button
                className={`nav-link ${currentView === 'products' ? 'active' : ''}`}
                onClick={() => setCurrentView('products')}
              >
                Shop All
              </button>
            </li>
            <li>
              <button
                className={`nav-link ${currentView === 'deals' ? 'active' : ''}`}
                onClick={() => setCurrentView('products')}
              >
                Deals
              </button>
            </li>
            <li>
              <button
                className={`nav-link ${currentView === 'orders' ? 'active' : ''}`}
                onClick={() => setCurrentView('orders')}
                style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}
              >
                <Package size={15} /> Order History
              </button>
            </li>
          </ul>

          {/* Global Search Bar */}
          <div className="navbar-search">
            <Search className="search-icon" size={18} />
            <input
              type="text"
              placeholder="Search products, brands, categories..."
              value={searchQuery}
              onChange={(e) => {
                onSearchQuery(e.target.value);
                if (currentView !== 'products') {
                  setCurrentView('products');
                }
              }}
            />
          </div>

          {/* Action Icons */}
          <div className="navbar-actions">
            {/* Wishlist Button */}
            <button
              className="icon-btn"
              onClick={() => setCurrentView('wishlist')}
              title="Saved items"
            >
              <Heart size={20} />
              {wishlist.length > 0 && (
                <span className="badge-count">{wishlist.length}</span>
              )}
            </button>

            {/* Shopping Cart Button */}
            <button
              className="icon-btn"
              onClick={() => setCurrentView('cart')}
              title="Shopping Cart"
            >
              <ShoppingBag size={20} />
              {cartCount > 0 && <span className="badge-count">{cartCount}</span>}
            </button>

            {/* User Auth Profile */}
            {user ? (
              <div style={{ position: 'relative' }} ref={userMenuRef}>
                <button
                  className="btn btn-secondary btn-sm"
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    padding: '0.45rem 0.85rem'
                  }}
                  title="My Account"
                >
                  <div
                    style={{
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      background: 'var(--primary)',
                      color: '#fff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.75rem',
                      fontWeight: '700'
                    }}
                  >
                    {user.name ? user.name.slice(0, 1).toUpperCase() : 'U'}
                  </div>
                  <span style={{ fontWeight: '600', maxWidth: '100px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {user.name.split(' ')[0]}
                  </span>
                  <ChevronDown size={14} style={{ color: 'var(--text-muted)' }} />
                </button>

                {/* Dropdown Menu */}
                {isUserMenuOpen && (
                  <div
                    style={{
                      position: 'absolute',
                      right: 0,
                      top: 'calc(100% + 8px)',
                      background: 'var(--surface)',
                      borderRadius: 'var(--radius-md)',
                      boxShadow: 'var(--shadow-lg)',
                      border: '1px solid var(--border)',
                      minWidth: '220px',
                      zIndex: 100,
                      padding: '0.5rem 0',
                      animation: 'fadeIn 0.15s ease'
                    }}
                  >
                    <div style={{ padding: '0.75rem 1rem', borderBottom: '1px solid var(--border)' }}>
                      <div style={{ fontWeight: '700', fontSize: '0.9rem', color: 'var(--text)' }}>
                        {user.name}
                      </div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {user.email}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', marginTop: '0.35rem', fontSize: '0.75rem', color: 'var(--success)' }}>
                        <UserCheck size={12} />
                        <span>Member</span>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        setCurrentView('wishlist');
                        setIsUserMenuOpen(false);
                      }}
                      style={{
                        width: '100%',
                        textAlign: 'left',
                        padding: '0.65rem 1rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        fontSize: '0.88rem',
                        color: 'var(--text)'
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--surface-hover)')}
                      onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                    >
                      <Heart size={16} /> Saved Wishlist ({wishlist.length})
                    </button>

                    <button
                      onClick={() => {
                        setCurrentView('cart');
                        setIsUserMenuOpen(false);
                      }}
                      style={{
                        width: '100%',
                        textAlign: 'left',
                        padding: '0.65rem 1rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        fontSize: '0.88rem',
                        color: 'var(--text)'
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--surface-hover)')}
                      onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                    >
                      <ShoppingBag size={16} /> Shopping Cart ({cartCount})
                    </button>

                    <button
                      onClick={() => {
                        setCurrentView('orders');
                        setIsUserMenuOpen(false);
                      }}
                      style={{
                        width: '100%',
                        textAlign: 'left',
                        padding: '0.65rem 1rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        fontSize: '0.88rem',
                        color: 'var(--text)'
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--surface-hover)')}
                      onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                    >
                      <Package size={16} /> Order History ({orders.length})
                    </button>

                    <div style={{ borderTop: '1px solid var(--border)', margin: '0.35rem 0' }} />

                    <button
                      onClick={() => {
                        logout();
                        setIsUserMenuOpen(false);
                      }}
                      style={{
                        width: '100%',
                        textAlign: 'left',
                        padding: '0.65rem 1rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        fontSize: '0.88rem',
                        color: 'var(--danger)'
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = '#fef2f2')}
                      onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                    >
                      <LogOut size={16} /> Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <button
                  className="btn btn-secondary btn-sm"
                  onClick={() => setCurrentView('login')}
                  style={{ fontWeight: '600' }}
                >
                  Sign In
                </button>
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => setCurrentView('signup')}
                  style={{ fontWeight: '600' }}
                >
                  Create Account
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
