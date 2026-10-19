import React, { useState, useMemo } from 'react';
import { ProductCard } from '../components/ProductCard';
import { products, categories, formatCurrency } from '../data/products';
import { Filter, RotateCcw, Search, SlidersHorizontal } from 'lucide-react';

export const ProductsPage = ({
  onSelectProduct,
  initialCategory = 'All',
  searchQuery = '',
  onClearSearch
}) => {
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [sortBy, setSortBy] = useState('featured');

  // Filtered & Sorted Products computation
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Filter by search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }

    // Filter by category
    if (selectedCategory && selectedCategory !== 'All') {
      result = result.filter((p) => p.category === selectedCategory);
    }

    // Filter by min price
    if (minPrice !== '' && !isNaN(minPrice)) {
      result = result.filter((p) => p.price >= parseFloat(minPrice));
    }

    // Filter by max price
    if (maxPrice !== '' && !isNaN(maxPrice)) {
      result = result.filter((p) => p.price <= parseFloat(maxPrice));
    }

    // Sort
    if (sortBy === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'discount') {
      result.sort((a, b) => b.discount - a.discount);
    }

    return result;
  }, [searchQuery, selectedCategory, minPrice, maxPrice, sortBy]);

  const handleResetFilters = () => {
    setSelectedCategory('All');
    setMinPrice('');
    setMaxPrice('');
    setSortBy('featured');
    if (onClearSearch) onClearSearch();
  };

  return (
    <div className="container" style={{ padding: '2rem 1.25rem' }}>
      {/* Page Title & Sort Row */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '2rem',
          flexWrap: 'wrap',
          gap: '1rem'
        }}
      >
        <div>
          <h1 style={{ fontSize: '2rem', fontWeight: '800' }}>
            {selectedCategory === 'All' ? 'All Products' : `${selectedCategory} Collection`}
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
            Showing <strong>{filteredProducts.length}</strong> available items
            {searchQuery && (
              <span> for query "{searchQuery}"</span>
            )}
          </p>
        </div>

        {/* Sort dropdown */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <SlidersHorizontal size={18} color="var(--text-muted)" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            style={{
              padding: '0.55rem 1rem',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-md)',
              background: 'var(--surface)',
              fontWeight: '500',
              outline: 'none',
              cursor: 'pointer'
            }}
          >
            <option value="featured">Featured First</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
            <option value="discount">Biggest Discounts</option>
          </select>
        </div>
      </div>

      {/* Catalog Layout */}
      <div className="catalog-layout">
        {/* Sidebar Filters */}
        <aside className="filter-sidebar">
          <div className="filter-group">
            <div className="filter-title">
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Filter size={16} /> Filters
              </span>
              <button
                onClick={handleResetFilters}
                style={{
                  fontSize: '0.8rem',
                  color: 'var(--primary)',
                  fontWeight: '600',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.25rem'
                }}
              >
                <RotateCcw size={12} /> Reset
              </button>
            </div>
          </div>

          {/* Category Filter */}
          <div className="filter-group">
            <h4 className="filter-title">Categories</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  style={{
                    textAlign: 'left',
                    padding: '0.45rem 0.65rem',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '0.9rem',
                    fontWeight: selectedCategory === cat ? '700' : '500',
                    color: selectedCategory === cat ? 'var(--primary)' : 'var(--text-muted)',
                    background: selectedCategory === cat ? 'var(--primary-light)' : 'transparent',
                    display: 'flex',
                    justifyContent: 'space-between'
                  }}
                >
                  <span>{cat}</span>
                  {cat !== 'All' && (
                    <span style={{ fontSize: '0.8rem', opacity: 0.6 }}>
                      ({products.filter((p) => p.category === cat).length})
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div className="filter-group">
            <h4 className="filter-title">Price Range</h4>
            <div className="price-inputs">
              <div className="price-input-box">
                <input
                  type="number"
                  placeholder="Min (₹)"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                />
              </div>
              <div className="price-input-box">
                <input
                  type="number"
                  placeholder="Max (₹)"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                />
              </div>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button
                className="btn btn-secondary btn-sm"
                onClick={() => { setMinPrice('0'); setMaxPrice('50'); }}
              >
                Under ₹50
              </button>
              <button
                className="btn btn-secondary btn-sm"
                onClick={() => { setMinPrice('50'); setMaxPrice('150'); }}
              >
                ₹50 - ₹150
              </button>
            </div>
          </div>
        </aside>

        {/* Products Grid Content */}
        <div>
          {filteredProducts.length > 0 ? (
            <div className="products-grid">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onSelectProduct={onSelectProduct}
                />
              ))}
            </div>
          ) : (
            <div
              style={{
                textAlign: 'center',
                padding: '4rem 2rem',
                background: 'var(--surface)',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--border)'
              }}
            >
              <Search size={48} color="var(--text-muted)" style={{ marginBottom: '1rem' }} />
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>
                No products match your criteria
              </h3>
              <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', fontSize: '0.95rem' }}>
                Try adjusting your search terms or clearing some applied filters.
              </p>
              <button className="btn btn-primary btn-sm" onClick={handleResetFilters}>
                Clear All Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
