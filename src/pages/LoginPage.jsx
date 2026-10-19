import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  Sparkles,
  ArrowLeft,
  AlertCircle,
  CheckCircle2,
  ShieldCheck,
  LogIn,
  KeyRound,
  X
} from 'lucide-react';

export const LoginPage = ({
  onNavigateToSignUp,
  onNavigateToHome,
  onNavigateToProducts,
  onLoginSuccess
}) => {
  const { user, loginUser, resetPassword, logout } = useCart();

  const [email, setEmail] = useState('harshit');
  const [password, setPassword] = useState('harshit@26');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Forgot password modal state
  const [isForgotModalOpen, setIsForgotModalOpen] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotNewPassword, setForgotNewPassword] = useState('');
  const [forgotMessage, setForgotMessage] = useState({ text: '', type: '' });

  // If already logged in, show user profile card with actions
  if (user) {
    return (
      <div className="auth-page-wrapper">
        <div className="container" style={{ maxWidth: '520px', padding: '3rem 1rem' }}>
          <div className="auth-card-modern">
            <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
              <div
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  background: 'var(--primary-light)',
                  color: 'var(--primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1rem',
                  fontSize: '1.5rem',
                  fontWeight: '700'
                }}
              >
                {user.name ? user.name.slice(0, 2).toUpperCase() : 'AU'}
              </div>
              <h2 style={{ fontSize: '1.6rem', fontWeight: '800', marginBottom: '0.25rem' }}>
                You're Signed In!
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
                Logged in as <strong style={{ color: 'var(--text)' }}>{user.name}</strong> ({user.email})
              </p>
            </div>

            <div
              style={{
                background: 'var(--surface-hover)',
                borderRadius: 'var(--radius-md)',
                padding: '1rem',
                marginBottom: '1.5rem',
                border: '1px solid var(--border)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                <CheckCircle2 size={18} color="var(--success)" />
                <span style={{ fontSize: '0.9rem', fontWeight: '600' }}>Active Member Account</span>
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: 0 }}>
                Enjoy free express shipping on orders over $100 and exclusive discounts.
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <button
                type="button"
                className="btn btn-primary btn-block"
                onClick={() => onNavigateToProducts ? onNavigateToProducts() : onNavigateToHome()}
              >
                Continue Shopping
              </button>
              <button
                type="button"
                className="btn btn-secondary btn-block"
                onClick={logout}
              >
                Sign Out / Switch Account
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');
    setIsLoading(true);

    setTimeout(() => {
      const res = loginUser({ email, password });
      setIsLoading(false);

      if (!res.success) {
        setErrorMessage(res.error);
      } else {
        if (onLoginSuccess) {
          onLoginSuccess(res.user);
        } else if (onNavigateToProducts) {
          onNavigateToProducts();
        }
      }
    }, 400);
  };

  const handleResetPasswordSubmit = (e) => {
    e.preventDefault();
    const res = resetPassword({ email: forgotEmail, newPassword: forgotNewPassword });
    if (!res.success) {
      setForgotMessage({ text: res.error, type: 'error' });
    } else {
      setForgotMessage({
        text: 'Password successfully reset! You can now log in with your new password.',
        type: 'success'
      });
      setTimeout(() => {
        setIsForgotModalOpen(false);
        setPassword(forgotNewPassword);
        setEmail(forgotEmail);
        setForgotMessage({ text: '', type: '' });
      }, 1500);
    }
  };

  return (
    <div className="auth-page-wrapper">
      <div className="container" style={{ maxWidth: '480px', padding: '2.5rem 1rem' }}>
        {/* Navigation Breadcrumb */}
        <button
          onClick={onNavigateToHome}
          className="auth-back-link"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            color: 'var(--text-muted)',
            fontSize: '0.9rem',
            marginBottom: '1.25rem',
            fontWeight: '500'
          }}
        >
          <ArrowLeft size={16} /> Back to Store
        </button>

        <div className="auth-card-modern">
          {/* Logo Brand */}
          <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: '1.75rem',
                fontWeight: '800',
                color: 'var(--text)',
                letterSpacing: '-0.5px',
                marginBottom: '0.5rem'
              }}
            >
              <Sparkles size={24} color="var(--primary)" />
              <span>Aura</span>Store
            </div>
            <h1 style={{ fontSize: '1.45rem', fontWeight: '700', color: 'var(--text)', margin: '0 0 0.35rem 0' }}>
              Welcome Back
            </h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', margin: 0 }}>
              Sign in to access your orders, cart, and wishlist
            </p>
          </div>

          {/* Error Banner */}
          {errorMessage && (
            <div
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '0.6rem',
                background: '#fef2f2',
                border: '1px solid #fecaca',
                borderRadius: 'var(--radius-md)',
                padding: '0.85rem 1rem',
                marginBottom: '1.25rem',
                color: '#b91c1c',
                fontSize: '0.88rem'
              }}
            >
              <AlertCircle size={18} style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>
                <span>{errorMessage}</span>
                {errorMessage.includes('No account found') && (
                  <div style={{ marginTop: '0.35rem' }}>
                    <button
                      type="button"
                      onClick={onNavigateToSignUp}
                      style={{
                        color: 'var(--primary)',
                        fontWeight: '600',
                        textDecoration: 'underline',
                        fontSize: '0.85rem'
                      }}
                    >
                      Click here to create a free account &rarr;
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '1.1rem' }}>
              <label
                htmlFor="login-email"
                style={{
                  display: 'block',
                  fontSize: '0.88rem',
                  fontWeight: '600',
                  marginBottom: '0.35rem',
                  color: 'var(--text)'
                }}
              >
                Username, Name or Email
              </label>
              <div style={{ position: 'relative' }}>
                <Mail
                  size={18}
                  style={{
                    position: 'absolute',
                    left: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: 'var(--text-muted)'
                  }}
                />
                <input
                  id="login-email"
                  type="text"
                  required
                  placeholder="Enter your name or email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem 0.75rem 2.4rem',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border)',
                    outline: 'none',
                    fontSize: '0.95rem',
                    background: 'var(--surface)'
                  }}
                />
              </div>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '0.35rem'
                }}
              >
                <label
                  htmlFor="login-password"
                  style={{ fontSize: '0.88rem', fontWeight: '600', color: 'var(--text)' }}
                >
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => setIsForgotModalOpen(true)}
                  style={{
                    fontSize: '0.82rem',
                    color: 'var(--primary)',
                    fontWeight: '600'
                  }}
                >
                  Forgot password?
                </button>
              </div>
              <div style={{ position: 'relative' }}>
                <Lock
                  size={18}
                  style={{
                    position: 'absolute',
                    left: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: 'var(--text-muted)'
                  }}
                />
                <input
                  id="login-password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.75rem 2.5rem 0.75rem 2.4rem',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border)',
                    outline: 'none',
                    fontSize: '0.95rem',
                    background: 'var(--surface)'
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute',
                    right: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: 'var(--text-muted)'
                  }}
                  title={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="btn btn-primary btn-block"
              style={{
                padding: '0.85rem',
                fontSize: '1rem',
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                borderRadius: 'var(--radius-md)'
              }}
            >
              {isLoading ? (
                <span>Signing in...</span>
              ) : (
                <>
                  <LogIn size={18} />
                  <span>Sign In to Aura</span>
                </>
              )}
            </button>
          </form>

          {/* Switch to Sign Up */}
          <div
            style={{
              textAlign: 'center',
              marginTop: '1.75rem',
              paddingTop: '1.25rem',
              borderTop: '1px solid var(--border)',
              fontSize: '0.92rem',
              color: 'var(--text-muted)'
            }}
          >
            Don't have an account yet?{' '}
            <button
              type="button"
              onClick={onNavigateToSignUp}
              style={{
                color: 'var(--primary)',
                fontWeight: '700',
                textDecoration: 'none'
              }}
            >
              Create Account
            </button>
          </div>

          {/* Security Guarantee */}
          <div
            style={{
              marginTop: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.4rem',
              fontSize: '0.78rem',
              color: 'var(--text-muted)'
            }}
          >
            <ShieldCheck size={16} color="var(--success)" />
            <span>256-bit Bank Grade Encrypted Connection</span>
          </div>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {isForgotModalOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(15, 23, 42, 0.65)',
            backdropFilter: 'blur(4px)',
            zIndex: 220,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem'
          }}
          onClick={() => setIsForgotModalOpen(false)}
        >
          <div
            style={{
              background: 'var(--surface)',
              borderRadius: 'var(--radius-lg)',
              maxWidth: '420px',
              width: '100%',
              padding: '2rem',
              position: 'relative',
              boxShadow: 'var(--shadow-xl)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsForgotModalOpen(false)}
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                color: 'var(--text-muted)'
              }}
            >
              <X size={20} />
            </button>

            <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  background: 'var(--primary-light)',
                  color: 'var(--primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 0.75rem'
                }}
              >
                <KeyRound size={22} />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '0.25rem' }}>
                Reset Your Password
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>
                Enter your registered email and choose a new password
              </p>
            </div>

            {forgotMessage.text && (
              <div
                style={{
                  padding: '0.75rem',
                  borderRadius: 'var(--radius-md)',
                  marginBottom: '1rem',
                  fontSize: '0.85rem',
                  background: forgotMessage.type === 'error' ? '#fef2f2' : '#f0fdf4',
                  color: forgotMessage.type === 'error' ? '#b91c1c' : '#15803d',
                  border: `1px solid ${forgotMessage.type === 'error' ? '#fecaca' : '#bbf7d0'}`
                }}
              >
                {forgotMessage.text}
              </div>
            )}

            <form onSubmit={handleResetPasswordSubmit}>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.35rem' }}>
                  Registered Email
                </label>
                <input
                  type="email"
                  required
                  placeholder="Enter your registered email"
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.65rem 0.85rem',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border)',
                    outline: 'none'
                  }}
                />
              </div>

              <div style={{ marginBottom: '1.25rem' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.35rem' }}>
                  New Password (min 6 chars)
                </label>
                <input
                  type="password"
                  required
                  placeholder="Enter your new password"
                  value={forgotNewPassword}
                  onChange={(e) => setForgotNewPassword(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.65rem 0.85rem',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border)',
                    outline: 'none'
                  }}
                />
              </div>

              <button type="submit" className="btn btn-primary btn-block">
                Update Password
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
