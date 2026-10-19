import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { X, Lock, Mail, User, AlertCircle, Eye, EyeOff, UserPlus, LogIn } from 'lucide-react';

export const AuthModal = ({ isOpen, onClose, initialTab = 'login' }) => {
  const { loginUser, signUpUser } = useCart();
  const [tab, setTab] = useState(initialTab);
  const [name, setName] = useState('harshit');
  const [email, setEmail] = useState('harshit');
  const [password, setPassword] = useState('harshit@26');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');
    setIsLoading(true);

    setTimeout(() => {
      let res;
      if (tab === 'login') {
        res = loginUser({ email, password });
      } else {
        res = signUpUser({ name, email, password });
      }

      setIsLoading(false);

      if (!res.success) {
        setErrorMessage(res.error);
      } else {
        onClose();
        setName('');
        setEmail('');
        setPassword('');
        setErrorMessage('');
      }
    }, 350);
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(15, 23, 42, 0.65)',
        backdropFilter: 'blur(4px)',
        zIndex: 200,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem'
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '440px',
          background: 'var(--surface)',
          borderRadius: 'var(--radius-lg)',
          boxShadow: 'var(--shadow-xl)',
          padding: '2rem',
          position: 'relative',
          maxHeight: '90vh',
          overflowY: 'auto'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            color: 'var(--text-muted)'
          }}
        >
          <X size={20} />
        </button>

        {/* Tab Toggle */}
        <div
          style={{
            display: 'flex',
            borderRadius: 'var(--radius-md)',
            background: 'var(--surface-hover)',
            padding: '4px',
            marginBottom: '1.25rem'
          }}
        >
          <button
            type="button"
            onClick={() => {
              setTab('login');
              setErrorMessage('');
            }}
            style={{
              flex: 1,
              padding: '0.55rem',
              borderRadius: 'var(--radius-sm)',
              fontWeight: '600',
              fontSize: '0.9rem',
              background: tab === 'login' ? 'var(--surface)' : 'transparent',
              boxShadow: tab === 'login' ? 'var(--shadow-sm)' : 'none',
              color: tab === 'login' ? 'var(--primary)' : 'var(--text-muted)'
            }}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => {
              setTab('register');
              setErrorMessage('');
            }}
            style={{
              flex: 1,
              padding: '0.55rem',
              borderRadius: 'var(--radius-sm)',
              fontWeight: '600',
              fontSize: '0.9rem',
              background: tab === 'register' ? 'var(--surface)' : 'transparent',
              boxShadow: tab === 'register' ? 'var(--shadow-sm)' : 'none',
              color: tab === 'register' ? 'var(--primary)' : 'var(--text-muted)'
            }}
          >
            Create Account
          </button>
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '0.5rem',
              background: '#fef2f2',
              border: '1px solid #fecaca',
              borderRadius: 'var(--radius-md)',
              padding: '0.75rem 0.85rem',
              marginBottom: '1rem',
              color: '#b91c1c',
              fontSize: '0.85rem'
            }}
          >
            <AlertCircle size={16} style={{ flexShrink: 0, marginTop: '2px' }} />
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {tab === 'register' && (
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.35rem', display: 'block' }}>
                Full Name
              </label>
              <div style={{ position: 'relative' }}>
                <User size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input
                  id="modal-name"
                  type="text"
                  required
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.65rem 0.85rem 0.65rem 2.25rem',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border)',
                    outline: 'none',
                    fontSize: '0.9rem'
                  }}
                />
              </div>
            </div>
          )}

          <div style={{ marginBottom: '1rem' }}>
            <label style={{ fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.35rem', display: 'block' }}>
              Username, Name or Email
            </label>
            <div style={{ position: 'relative' }}>
              <Mail size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input
                type="text"
                required
                placeholder="Enter your email or username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.65rem 0.85rem 0.65rem 2.25rem',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border)',
                  outline: 'none',
                  fontSize: '0.9rem'
                }}
              />
            </div>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.35rem', display: 'block' }}>
              Password
            </label>
            <div style={{ position: 'relative' }}>
              <Lock size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.65rem 2.25rem 0.65rem 2.25rem',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border)',
                  outline: 'none',
                  fontSize: '0.9rem'
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '10px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'var(--text-muted)'
                }}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="btn btn-primary btn-block"
            style={{
              padding: '0.75rem',
              fontSize: '0.95rem',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem'
            }}
          >
            {isLoading ? (
              <span>Please wait...</span>
            ) : tab === 'login' ? (
              <>
                <LogIn size={16} />
                <span>Sign In to Aura</span>
              </>
            ) : (
              <>
                <UserPlus size={16} />
                <span>Create My Account</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
