import React, { useState, useEffect } from 'react';
import { CartProvider, useCart } from './context/CartContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { AuthModal } from './components/AuthModal';
import { HomePage } from './pages/HomePage';
import { ProductsPage } from './pages/ProductsPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { OrderSuccessPage } from './pages/OrderSuccessPage';
import { WishlistPage } from './pages/WishlistPage';
import { OrderHistoryPage } from './pages/OrderHistoryPage';
import { LoginPage } from './pages/LoginPage';
import { SignUpPage } from './pages/SignUpPage';
import { CheckCircle2, Info, X } from 'lucide-react';

const AppContent = () => {
  const { toasts, removeToast } = useCart();

  // Determine initial view from URL hash or query param
  const getInitialView = () => {
    try {
      const hash = window.location.hash.toLowerCase();
      if (hash === '#login' || hash === '#signin') return 'login';
      if (hash === '#signup' || hash === '#register') return 'signup';
      if (hash === '#orders') return 'orders';
      const params = new URLSearchParams(window.location.search);
      const viewParam = params.get('view');
      if (viewParam) return viewParam;
    } catch {}
    return 'home';
  };

  const [currentView, setCurrentView] = useState(getInitialView);
  const [previousView, setPreviousView] = useState('home');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [completedOrder, setCompletedOrder] = useState(null);
  const [checkoutDiscount, setCheckoutDiscount] = useState(0);

  // Sync with browser hash changes
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.toLowerCase();
      if (hash === '#login' || hash === '#signin') {
        setCurrentView('login');
      } else if (hash === '#signup' || hash === '#register') {
        setCurrentView('signup');
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateView = (newView) => {
    if (currentView !== 'login' && currentView !== 'signup') {
      setPreviousView(currentView);
    }
    setCurrentView(newView);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Update hash for deep linking
    if (newView === 'login') {
      window.location.hash = 'login';
    } else if (newView === 'signup') {
      window.location.hash = 'signup';
    } else if (window.location.hash === '#login' || window.location.hash === '#signup') {
      history.replaceState(null, '', window.location.pathname);
    }
  };

  // Navigate to product detail
  const handleSelectProduct = (product) => {
    setSelectedProduct(product);
    navigateView('detail');
  };

  // Navigate to products with optional category
  const handleSelectCategory = (category) => {
    setSelectedCategory(category);
    navigateView('products');
  };

  const handleNavigateToProducts = () => {
    setSelectedCategory('All');
    setSearchQuery('');
    navigateView('products');
  };

  const handleProceedToCheckout = (discount = 0) => {
    setCheckoutDiscount(discount);
    navigateView('checkout');
  };

  const handleOrderPlaced = (order) => {
    setCompletedOrder(order);
    navigateView('order-success');
  };

  const handleAuthSuccess = () => {
    const returnView =
      previousView && previousView !== 'login' && previousView !== 'signup'
        ? previousView
        : 'products';
    navigateView(returnView);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar
        currentView={currentView}
        setCurrentView={navigateView}
        onOpenAuth={() => setIsAuthOpen(true)}
        searchQuery={searchQuery}
        onSearchQuery={setSearchQuery}
      />

      <main style={{ flex: 1 }}>
        {currentView === 'home' && (
          <HomePage
            onSelectProduct={handleSelectProduct}
            onNavigateToProducts={handleNavigateToProducts}
            onSelectCategory={handleSelectCategory}
          />
        )}

        {currentView === 'products' && (
          <ProductsPage
            onSelectProduct={handleSelectProduct}
            initialCategory={selectedCategory}
            searchQuery={searchQuery}
            onClearSearch={() => setSearchQuery('')}
          />
        )}

        {currentView === 'detail' && selectedProduct && (
          <ProductDetailPage
            product={selectedProduct}
            onBack={() => navigateView('products')}
            onSelectProduct={handleSelectProduct}
          />
        )}

        {currentView === 'cart' && (
          <CartPage
            onNavigateToProducts={handleNavigateToProducts}
            onProceedToCheckout={handleProceedToCheckout}
          />
        )}

        {currentView === 'checkout' && (
          <CheckoutPage
            discountAmount={checkoutDiscount}
            onBackToCart={() => navigateView('cart')}
            onOrderPlaced={handleOrderPlaced}
          />
        )}

        {currentView === 'order-success' && (
          <OrderSuccessPage
            order={completedOrder}
            onContinueShopping={handleNavigateToProducts}
            onViewOrderHistory={() => navigateView('orders')}
          />
        )}

        {currentView === 'wishlist' && (
          <WishlistPage
            onSelectProduct={handleSelectProduct}
            onNavigateToProducts={handleNavigateToProducts}
          />
        )}

        {currentView === 'orders' && (
          <OrderHistoryPage
            onSelectProduct={handleSelectProduct}
            onNavigateToProducts={handleNavigateToProducts}
          />
        )}

        {currentView === 'login' && (
          <LoginPage
            onNavigateToSignUp={() => navigateView('signup')}
            onNavigateToHome={() => navigateView('home')}
            onNavigateToProducts={handleNavigateToProducts}
            onLoginSuccess={handleAuthSuccess}
          />
        )}

        {(currentView === 'signup' || currentView === 'register') && (
          <SignUpPage
            onNavigateToLogin={() => navigateView('login')}
            onNavigateToHome={() => navigateView('home')}
            onNavigateToProducts={handleNavigateToProducts}
            onSignUpSuccess={handleAuthSuccess}
          />
        )}
      </main>

      <Footer onSelectCategory={handleSelectCategory} />

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
      />

      {/* Global Toast Notifications */}
      {toasts.length > 0 && (
        <div className="toast-container">
          {toasts.map((toast) => (
            <div key={toast.id} className={`toast ${toast.type}`}>
              {toast.type === 'success' ? (
                <CheckCircle2 size={18} color="var(--success)" />
              ) : (
                <Info size={18} color="var(--primary)" />
              )}
              <span style={{ flex: 1 }}>{toast.message}</span>
              <button
                onClick={() => removeToast(toast.id)}
                style={{ color: '#94a3b8' }}
              >
                <X size={14} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default function App() {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  );
}
