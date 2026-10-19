import React from 'react';
import { Sparkles, ShieldCheck, Truck, RefreshCw, Headphones } from 'lucide-react';

export const Footer = ({ onSelectCategory }) => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Sparkles size={22} color="#60a5fa" />
              Aura Store
            </h3>
            <p style={{ maxWidth: '340px', lineHeight: '1.6' }}>
              Your premium destination for curated electronics, timeless fashion, home essentials, and lifestyle goods.
            </p>
          </div>

          <div className="footer-col">
            <h4>Shop</h4>
            <ul className="footer-links">
              <li><a href="#electronics" onClick={() => onSelectCategory('Electronics')}>Electronics</a></li>
              <li><a href="#fashion" onClick={() => onSelectCategory('Fashion')}>Fashion</a></li>
              <li><a href="#home" onClick={() => onSelectCategory('Home')}>Home & Living</a></li>
              <li><a href="#beauty" onClick={() => onSelectCategory('Beauty')}>Beauty</a></li>
              <li><a href="#sports" onClick={() => onSelectCategory('Sports')}>Fitness & Sports</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Customer Support</h4>
            <ul className="footer-links">
              <li><a href="#">Order Tracking</a></li>
              <li><a href="#">Shipping Policies</a></li>
              <li><a href="#">30-Day Returns</a></li>
              <li><a href="#">Warranty & Protection</a></li>
              <li><a href="#">Help Center / FAQ</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Why Aura?</h4>
            <ul className="footer-links">
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Truck size={14} color="#60a5fa" /> Express Delivery
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <ShieldCheck size={14} color="#60a5fa" /> 100% Genuine Guarantee
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <RefreshCw size={14} color="#60a5fa" /> Hassle-Free Returns
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Headphones size={14} color="#60a5fa" /> 24/7 Dedicated Care
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Aura Store Inc. All rights reserved. Crafted with React & Vite.</p>
        </div>
      </div>
    </footer>
  );
};
