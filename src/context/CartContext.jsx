import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const DEMO_CREDENTIALS = {
  name: 'harshit',
  username: 'harshit',
  email: 'harshit@example.com',
  password: 'harshit@26'
};

const DEFAULT_USERS = [
  {
    id: 'user_harshit',
    name: 'Harshit Pooner',
    username: 'harshit',
    email: 'harshit@example.com',
    password: 'harshit@26',
    phone: '7876750012',
    city: 'Una',
    state: 'Himachal Pradesh',
    zip: '177208',
    address: 'Main Bazar, Ward No. 4',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
    joinedDate: '2024-01-01'
  },
  {
    id: 'user_1',
    name: 'Alex Morgan',
    username: 'alex',
    email: 'alex@example.com',
    password: 'password123',
    phone: '9980997890',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    joinedDate: '2024-01-15'
  },
  {
    id: 'user_2',
    name: 'Sarah Connor',
    username: 'sarah',
    email: 'sarah@example.com',
    password: 'password123',
    phone: '8890237574',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
    joinedDate: '2024-03-20'
  }
];

export const DEFAULT_ORDERS = [
  {
    orderId: 'AUR-924158',
    date: 'Oct 19, 2026',
    items: [
      {
        id: 1,
        name: 'Sony WH-1000XM5 Wireless Headphones',
        category: 'Electronics',
        price: 348.0,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      },
      {
        id: 2,
        name: 'Apple Watch Series 9',
        category: 'Electronics',
        price: 399.0,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      }
    ],
    total: 747.0,
    paymentMethod: 'RAZORPAY (Verified)',
    paymentId: 'pay_P1k8Tz7L9o0Q',
    paymentStatus: 'PAID',
    deliveryStatus: 'In Transit',
    estimatedDelivery: 'Oct 23, 2026',
    customer: {
      name: 'Harshit Pooner',
      email: 'harshit@example.com',
      phone: '7876750012',
      address: 'Main Bazar, Ward No. 4, Una, Himachal Pradesh 177208'
    }
  },
  {
    orderId: 'AUR-742918',
    date: 'Oct 16, 2026',
    items: [
      {
        id: 3,
        name: 'Minimalist Leather Backpack',
        category: 'Fashion',
        price: 129.0,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      }
    ],
    total: 129.0,
    paymentMethod: 'RAZORPAY (Verified)',
    paymentId: 'pay_Or9kL2xX5a91',
    paymentStatus: 'PAID',
    deliveryStatus: 'Delivered',
    estimatedDelivery: 'Oct 18, 2026',
    customer: {
      name: 'Harshit Pooner',
      email: 'harshit@example.com',
      phone: '7876750012',
      address: 'Main Bazar, Ward No. 4, Una, Himachal Pradesh 177208'
    }
  }
];

export const CartProvider = ({ children }) => {
  // Cart state persisted to localStorage
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('aura_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Wishlist state persisted to localStorage
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('aura_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Registered users list in localStorage
  const [registeredUsers, setRegisteredUsers] = useState(() => {
    try {
      const saved = localStorage.getItem('aura_registered_users');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Always ensure Harshit's demo account is present
          const hasHarshit = parsed.some(
            (u) =>
              (u.name && u.name.toLowerCase() === 'harshit') ||
              (u.username && u.username.toLowerCase() === 'harshit') ||
              (u.email && u.email.toLowerCase() === 'harshit@example.com')
          );
          if (!hasHarshit) {
            return [DEFAULT_USERS[0], ...parsed];
          }
          return parsed;
        }
      }
    } catch (e) {
      console.error(e);
    }
    return DEFAULT_USERS;
  });

  // Current logged in User session
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('aura_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Toast notifications
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    try {
      localStorage.setItem('aura_cart', JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('aura_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.error(e);
    }
  }, [wishlist]);

  useEffect(() => {
    try {
      localStorage.setItem('aura_registered_users', JSON.stringify(registeredUsers));
    } catch (e) {
      console.error(e);
    }
  }, [registeredUsers]);

  // Order history state persisted in localStorage
  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem('aura_orders');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
      const lastOrder = localStorage.getItem('aura_last_order');
      if (lastOrder) {
        const parsedLast = JSON.parse(lastOrder);
        if (parsedLast && parsedLast.orderId) {
          return [parsedLast, ...DEFAULT_ORDERS];
        }
      }
    } catch (e) {
      console.error(e);
    }
    return DEFAULT_ORDERS;
  });

  useEffect(() => {
    try {
      localStorage.setItem('aura_orders', JSON.stringify(orders));
    } catch (e) {
      console.error(e);
    }
  }, [orders]);

  const addOrder = (newOrder) => {
    const formatted = {
      ...newOrder,
      deliveryStatus: newOrder.deliveryStatus || 'Processing',
      estimatedDelivery:
        newOrder.estimatedDelivery ||
        new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toLocaleDateString(
          'en-US',
          { month: 'short', day: 'numeric', year: 'numeric' }
        )
    };
    setOrders((prev) => [formatted, ...prev]);
  };

  const resetDefaultOrders = () => {
    setOrders(DEFAULT_ORDERS);
    try {
      localStorage.setItem('aura_orders', JSON.stringify(DEFAULT_ORDERS));
    } catch (e) {}
  };

  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem('aura_user', JSON.stringify(user));
      } else {
        localStorage.removeItem('aura_user');
      }
    } catch (e) {
      console.error(e);
    }
  }, [user]);

  const showToast = (message, type = 'success') => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const addToCart = (product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { ...product, quantity }];
    });
    showToast(`Added "${product.name.slice(0, 24)}..." to cart!`);
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeFromCart = (productId) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
    showToast('Item removed from cart', 'info');
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleWishlist = (product) => {
    setWishlist((prev) => {
      const exists = prev.some((item) => item.id === product.id);
      if (exists) {
        showToast('Removed from wishlist', 'info');
        return prev.filter((item) => item.id !== product.id);
      } else {
        showToast('Saved to wishlist!');
        return [...prev, product];
      }
    });
  };

  const isWishlisted = (productId) => {
    return wishlist.some((item) => item.id === productId);
  };

  // Sign in verification with registered user check (supports email or username/name)
  const loginUser = ({ email, password, rememberMe = true }) => {
    const cleanIdentifier = (email || '').trim().toLowerCase();
    const cleanPassword = (password || '').trim();

    if (!cleanIdentifier) {
      return { success: false, error: 'Please enter your name, username or email address.' };
    }
    if (!cleanPassword) {
      return { success: false, error: 'Please enter your password.' };
    }

    const matchedUser = registeredUsers.find(
      (u) =>
        (u.email && u.email.toLowerCase() === cleanIdentifier) ||
        (u.username && u.username.toLowerCase() === cleanIdentifier) ||
        (u.name && u.name.toLowerCase() === cleanIdentifier)
    );

    if (!matchedUser) {
      return {
        success: false,
        error: `No account found for "${cleanIdentifier}". Please check your spelling or sign up.`
      };
    }

    if (matchedUser.password !== cleanPassword) {
      return {
        success: false,
        error: 'Incorrect password. Please verify and try again.'
      };
    }

    const sessionData = {
      id: matchedUser.id,
      name: matchedUser.name,
      email: matchedUser.email,
      phone: matchedUser.phone || '',
      avatar: matchedUser.avatar || '',
      joinedDate: matchedUser.joinedDate || new Date().toISOString().split('T')[0]
    };

    setUser(sessionData);
    showToast(`Welcome back, ${sessionData.name}!`);
    return { success: true, user: sessionData };
  };

  // Sign up new user with duplicate prevention
  const signUpUser = ({ name, email, password, phone = '' }) => {
    const cleanName = (name || '').trim();
    const cleanEmail = (email || '').trim().toLowerCase();
    const cleanPassword = (password || '').trim();

    if (!cleanName) {
      return { success: false, error: 'Please enter your full name.' };
    }
    if (!cleanEmail || !cleanEmail.includes('@') || !cleanEmail.includes('.')) {
      return { success: false, error: 'Please enter a valid email address.' };
    }
    if (!cleanPassword || cleanPassword.length < 6) {
      return { success: false, error: 'Password must be at least 6 characters long.' };
    }

    const alreadyExists = registeredUsers.some(
      (u) => u.email.toLowerCase() === cleanEmail
    );

    if (alreadyExists) {
      return {
        success: false,
        error: 'An account with this email already exists. Please sign in instead.'
      };
    }

    const newUser = {
      id: `user_${Date.now()}`,
      name: cleanName,
      email: cleanEmail,
      password: cleanPassword,
      phone: phone.trim(),
      joinedDate: new Date().toISOString().split('T')[0]
    };

    const updatedList = [...registeredUsers, newUser];
    setRegisteredUsers(updatedList);

    const sessionData = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      phone: newUser.phone,
      joinedDate: newUser.joinedDate
    };

    setUser(sessionData);
    showToast(`Account created! Welcome to Aura, ${sessionData.name}!`);
    return { success: true, user: sessionData };
  };

  // Reset password helper
  const resetPassword = ({ email, newPassword }) => {
    const cleanEmail = (email || '').trim().toLowerCase();
    const cleanPassword = (newPassword || '').trim();

    if (!cleanEmail) {
      return { success: false, error: 'Please provide your registered email.' };
    }
    if (!cleanPassword || cleanPassword.length < 6) {
      return { success: false, error: 'New password must be at least 6 characters.' };
    }

    const userIndex = registeredUsers.findIndex(
      (u) => u.email.toLowerCase() === cleanEmail
    );

    if (userIndex === -1) {
      return {
        success: false,
        error: 'No account registered with this email address.'
      };
    }

    const updated = [...registeredUsers];
    updated[userIndex] = {
      ...updated[userIndex],
      password: cleanPassword
    };
    setRegisteredUsers(updated);
    showToast('Password updated successfully! You can now sign in.');
    return { success: true };
  };

  // Backward compatibility alias for any quick login
  const login = (userData) => {
    setUser(userData);
    showToast(`Welcome, ${userData.name || 'Shopper'}!`);
  };

  const logout = () => {
    setUser(null);
    showToast('You have been signed out.', 'info');
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = cartSubtotal > 100 || cartSubtotal === 0 ? 0 : 9.99;
  const tax = cartSubtotal * 0.08;
  const cartTotal = cartSubtotal + shipping + tax;

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        cartCount,
        cartSubtotal,
        shipping,
        tax,
        cartTotal,
        wishlist,
        toggleWishlist,
        isWishlisted,
        user,
        registeredUsers,
        login,
        loginUser,
        signUpUser,
        resetPassword,
        logout,
        toasts,
        removeToast,
        showToast,
        orders,
        addOrder,
        resetDefaultOrders,
        setOrders
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
