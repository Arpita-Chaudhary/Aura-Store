import React from 'react';
import { ProductCard } from '../components/ProductCard';
import { products, categories } from '../data/products';
import { ArrowRight, Sparkles, Truck, ShieldCheck, RefreshCw, Zap } from 'lucide-react';

export const HomePage = ({ onSelectProduct, onNavigateToProducts, onSelectCategory }) => {
  const featuredProducts = products.slice(0, 8);

  return (
    <div>
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-grid">
            <div>
              <div className="hero-badge">
                <Sparkles size={16} /> New Season Arrivals 2026
              </div>
              <h1 className="hero-title">
                Everything You Need. <span>One Place.</span>
              </h1>
              <p className="hero-subtitle">
                Discover our hand-picked collection of premium technology, designer fashion,
                and lifestyle goods crafted for modern living.
              </p>
              <div className="hero-actions">
                <button
                  className="btn btn-primary btn-lg"
                  onClick={() => onNavigateToProducts()}
                >
                  Shop Now <ArrowRight size={18} />
                </button>
                <button
                  className="btn btn-secondary btn-lg"
                  onClick={() => onSelectCategory('Electronics')}
                  style={{ background: 'rgba(255, 255, 255, 0.1)', color: '#ffffff', borderColor: 'rgba(255, 255, 255, 0.2)' }}
                >
                  Explore Electronics
                </button>
              </div>
            </div>

            <div className="hero-image-wrapper">
              <img
                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                alt="Aura Collection"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Main Container */}
      <div className="container">
        {/* Categories Bar */}
        <div className="category-pills">
          {categories.map((cat) => (
            <button
              key={cat}
              className="category-pill"
              onClick={() => onSelectCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Featured Products Header */}
        <div className="section-header">
          <div>
            <h2 className="section-title">Trending & Featured</h2>
            <p className="section-subtitle">
              Hand-picked bestsellers selected for exceptional quality and value
            </p>
          </div>
          <button
            className="btn btn-secondary btn-sm"
            onClick={() => onNavigateToProducts()}
          >
            View All ({products.length}) <ArrowRight size={14} />
          </button>
        </div>

        {/* Products Grid */}
        <div className="products-grid">
          {featuredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onSelectProduct={onSelectProduct}
            />
          ))}
        </div>

        {/* Features / Benefits Banner */}
        <div className="features-banner">
          <div className="feature-item">
            <div className="feature-icon-box">
              <Truck size={24} />
            </div>
            <div>
              <h4>Free Nationwide Shipping</h4>
              <p>On all qualifying orders over ₹100 with zero hidden fees.</p>
            </div>
          </div>

          <div className="feature-item">
            <div className="feature-icon-box">
              <ShieldCheck size={24} />
            </div>
            <div>
              <h4>100% Genuine Products</h4>
              <p>Direct from verified global manufacturers & brand partners.</p>
            </div>
          </div>

          <div className="feature-item">
            <div className="feature-icon-box">
              <RefreshCw size={24} />
            </div>
            <div>
              <h4>30-Day Easy Returns</h4>
              <p>Not completely in love? Return it for an instant full refund.</p>
            </div>
          </div>

          <div className="feature-item">
            <div className="feature-icon-box">
              <Zap size={24} />
            </div>
            <div>
              <h4>Instant Secure Checkout</h4>
              <p>Protected by 256-bit bank-grade SSL encryption standards.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
