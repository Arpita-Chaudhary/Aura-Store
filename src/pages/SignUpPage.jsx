import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import {
  User,
  Mail,
  Lock,
  Phone,
  Eye,
  EyeOff,
  Sparkles,
  ArrowLeft,
  AlertCircle,
  CheckCircle2,
  ShieldCheck,
  UserPlus,
  Check
} from 'lucide-react';

export const SignUpPage = ({
  onNavigateToLogin,
  onNavigateToHome,
  onNavigateToProducts,
  onSignUpSuccess
}) => {
  const { user, signUpUser, logout } = useCart();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // If already logged in, show profile
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
                You Already Have An Active Account
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
                Logged in as <strong style={{ color: 'var(--text)' }}>{user.name}</strong> ({user.email})
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
                Sign Out / Create Different Account
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Calculate password strength
  const getPasswordStrength = () => {
    if (!password) return { score: 0, text: 'None', color: 'transparent' };
    let score = 0;
    if (password.length >= 6) score += 1;
    if (password.length >= 8) score += 1;
    if (/[A-Z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[^A-Za-z0-9]/.test(password)) score += 1;

    if (score <= 2) return { score: 33, text: 'Weak', color: '#ef4444' };
    if (score <= 4) return { score: 66, text: 'Medium', color: '#f59e0b' };
    return { score: 100, text: 'Strong', color: '#10b981' };
  };

  const strength = getPasswordStrength();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (password.length < 6) {
      setErrorMessage('Password must be at least 6 characters.');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match. Please verify.');
      return;
    }

    if (!agreeTerms) {
      setErrorMessage('Please accept the Terms of Service to create an account.');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      const res = signUpUser({ name, email, password, phone });
      setIsLoading(false);

      if (!res.success) {
        setErrorMessage(res.error);
      } else {
        if (onSignUpSuccess) {
          onSignUpSuccess(res.user);
        } else if (onNavigateToProducts) {
          onNavigateToProducts();
        }
      }
    }, 450);
  };

  return (
    <div className="auth-page-wrapper">
      <div className="container" style={{ maxWidth: '500px', padding: '2.5rem 1rem' }}>
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
          {/* Brand Header */}
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
              Create an Account
            </h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', margin: 0 }}>
              Join Aura for free express delivery, member discounts & order tracking
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
                {errorMessage.includes('already exists') && (
                  <div style={{ marginTop: '0.35rem' }}>
                    <button
                      type="button"
                      onClick={onNavigateToLogin}
                      style={{
                        color: 'var(--primary)',
                        fontWeight: '600',
                        textDecoration: 'underline',
                        fontSize: '0.85rem'
                      }}
                    >
                      Click here to sign in with your password &rarr;
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit}>
            {/* Full Name */}
            <div style={{ marginBottom: '1.1rem' }}>
              <label
                htmlFor="signup-name"
                style={{
                  display: 'block',
                  fontSize: '0.88rem',
                  fontWeight: '600',
                  marginBottom: '0.35rem',
                  color: 'var(--text)'
                }}
              >
                Full Name
              </label>
              <div style={{ position: 'relative' }}>
                <User
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
                  id="signup-name"
                  type="text"
                  required
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
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

            {/* Email Address */}
            <div style={{ marginBottom: '1.1rem' }}>
              <label
                htmlFor="signup-email"
                style={{
                  display: 'block',
                  fontSize: '0.88rem',
                  fontWeight: '600',
                  marginBottom: '0.35rem',
                  color: 'var(--text)'
                }}
              >
                Email Address
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
                  id="signup-email"
                  type="email"
                  required
                  placeholder="Enter your email"
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

            {/* Phone Number (Optional) */}
            <div style={{ marginBottom: '1.1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
                <label
                  htmlFor="signup-phone"
                  style={{ fontSize: '0.88rem', fontWeight: '600', color: 'var(--text)' }}
                >
                  Phone Number
                </label>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Optional</span>
              </div>
              <div style={{ position: 'relative' }}>
                <Phone
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
                  id="signup-phone"
                  type="tel"
                  placeholder="Enter your phone number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
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

            {/* Password */}
            <div style={{ marginBottom: '1.1rem' }}>
              <label
                htmlFor="signup-password"
                style={{
                  display: 'block',
                  fontSize: '0.88rem',
                  fontWeight: '600',
                  marginBottom: '0.35rem',
                  color: 'var(--text)'
                }}
              >
                Password
              </label>
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
                  id="signup-password"
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

              {/* Password strength meter */}
              {password && (
                <div style={{ marginTop: '0.5rem' }}>
                  <div
                    style={{
                      height: '4px',
                      background: 'var(--border)',
                      borderRadius: 'var(--radius-full)',
                      overflow: 'hidden'
                    }}
                  >
                    <div
                      style={{
                        height: '100%',
                        width: `${strength.score}%`,
                        backgroundColor: strength.color,
                        transition: 'width 0.3s ease, background-color 0.3s ease'
                      }}
                    />
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      marginTop: '0.25rem',
                      fontSize: '0.75rem',
                      color: strength.color,
                      fontWeight: '600'
                    }}
                  >
                    <span>Strength: {strength.text}</span>
                    <span style={{ color: 'var(--text-muted)', fontWeight: '400' }}>
                      {password.length}/6+ chars
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div style={{ marginBottom: '1.25rem' }}>
              <label
                htmlFor="signup-confirm-password"
                style={{
                  display: 'block',
                  fontSize: '0.88rem',
                  fontWeight: '600',
                  marginBottom: '0.35rem',
                  color: 'var(--text)'
                }}
              >
                Confirm Password
              </label>
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
                  id="signup-confirm-password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.75rem 2.5rem 0.75rem 2.4rem',
                    borderRadius: 'var(--radius-md)',
                    border: `1px solid ${
                      confirmPassword && confirmPassword !== password
                        ? '#ef4444'
                        : confirmPassword && confirmPassword === password
                        ? '#10b981'
                        : 'var(--border)'
                    }`,
                    outline: 'none',
                    fontSize: '0.95rem',
                    background: 'var(--surface)'
                  }}
                />
                {confirmPassword && confirmPassword === password && (
                  <Check
                    size={18}
                    style={{
                      position: 'absolute',
                      right: '12px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      color: '#10b981'
                    }}
                  />
                )}
              </div>
              {confirmPassword && confirmPassword !== password && (
                <span style={{ color: '#ef4444', fontSize: '0.78rem', marginTop: '0.25rem', display: 'block' }}>
                  Passwords do not match
                </span>
              )}
            </div>

            {/* Terms checkbox */}
            <div style={{ marginBottom: '1.5rem' }}>
              <label
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '0.5rem',
                  fontSize: '0.85rem',
                  color: 'var(--text-muted)',
                  cursor: 'pointer',
                  lineHeight: '1.4'
                }}
              >
                <input
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  style={{ width: '16px', height: '16px', marginTop: '2px', accentColor: 'var(--primary)' }}
                />
                <span>
                  I agree to Aura's Terms of Service and Privacy Policy, and agree to receive updates.
                </span>
              </label>
            </div>

            {/* Submit Button */}
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
                <span>Creating your account...</span>
              ) : (
                <>
                  <UserPlus size={18} />
                  <span>Create Account</span>
                </>
              )}
            </button>
          </form>

          {/* Switch to Sign In */}
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
            Already have an account?{' '}
            <button
              type="button"
              onClick={onNavigateToLogin}
              style={{
                color: 'var(--primary)',
                fontWeight: '700',
                textDecoration: 'none'
              }}
            >
              Sign In
            </button>
          </div>

          {/* Member perks mini strip */}
          <div
            style={{
              marginTop: '1.5rem',
              padding: '0.85rem 1rem',
              background: 'var(--surface-hover)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border)',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.4rem',
              fontSize: '0.8rem',
              color: 'var(--text-muted)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text)', fontWeight: '600' }}>
              <ShieldCheck size={16} color="var(--primary)" />
              <span>Free Aura Membership Perks</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>✓ Free shipping on $100+</span>
              <span>✓ 30-Day returns</span>
              <span>✓ Order status alerts</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
