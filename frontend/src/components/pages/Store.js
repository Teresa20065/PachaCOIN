import React, { useState, useEffect } from 'react';
import './Pages.css';
import alpacaLogo from '../../img/alpaca.jpg';

const Store = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [cartItems, setCartItems] = useState([]);
  const [currentBalance, setCurrentBalance] = useState(1250);
  const [purchaseAnimation, setPurchaseAnimation] = useState(false);

  const categories = [
    { id: 'all', name: '🛍️ Todo', icon: '🛍️' },
    { id: 'food', name: '🥕 Alimentación', icon: '🥕' },
    { id: 'toys', name: '🎮 Juguetes', icon: '🎮' },
    { id: 'accessories', name: '👑 Accesorios', icon: '👑' },
    { id: 'special', name: '⭐ Especiales', icon: '⭐' }
  ];

  const products = [
    {
      id: 1,
      name: 'Comida Premium',
      category: 'food',
      price: 25,
      originalPrice: 35,
      image: '🥕',
      description: 'Comida nutritiva de alta calidad para tu mascota',
      rating: 4.8,
      stock: 15,
      popular: true,
      discount: 28
    },
    {
      id: 2,
      name: 'Pelota Mágica',
      category: 'toys',
      price: 15,
      originalPrice: 20,
      image: '⚽',
      description: 'Pelota que brilla y hace sonidos divertidos',
      rating: 4.6,
      stock: 8,
      popular: false,
      discount: 25
    },
    {
      id: 3,
      name: 'Corona Dorada',
      category: 'accessories',
      price: 50,
      originalPrice: 75,
      image: '👑',
      description: 'Corona elegante para hacer a tu mascota reina',
      rating: 4.9,
      stock: 3,
      popular: true,
      discount: 33
    },
    {
      id: 4,
      name: 'Snack Saludable',
      category: 'food',
      price: 12,
      originalPrice: 18,
      image: '🍎',
      description: 'Snacks naturales sin conservantes',
      rating: 4.7,
      stock: 22,
      popular: false,
      discount: 33
    },
    {
      id: 5,
      name: 'Juguete Interactivo',
      category: 'toys',
      price: 30,
      originalPrice: 45,
      image: '🧩',
      description: 'Puzzle que estimula la inteligencia',
      rating: 4.5,
      stock: 5,
      popular: true,
      discount: 33
    },
    {
      id: 6,
      name: 'Collar Brillante',
      category: 'accessories',
      price: 35,
      originalPrice: 50,
      image: '💎',
      description: 'Collar con piedras que brillan en la oscuridad',
      rating: 4.8,
      stock: 10,
      popular: false,
      discount: 30
    },
    {
      id: 7,
      name: 'Pack Especial',
      category: 'special',
      price: 100,
      originalPrice: 150,
      image: '🎁',
      description: 'Pack completo con todo lo necesario',
      rating: 5.0,
      stock: 2,
      popular: true,
      discount: 33
    },
    {
      id: 8,
      name: 'Vitamina Plus',
      category: 'food',
      price: 18,
      originalPrice: 25,
      image: '💊',
      description: 'Vitaminas para mantener saludable a tu mascota',
      rating: 4.9,
      stock: 12,
      popular: false,
      discount: 28
    }
  ];

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  const addToCart = (product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setPurchaseAnimation(true);
    setTimeout(() => setPurchaseAnimation(false), 1000);
  };

  const removeFromCart = (productId) => {
    setCartItems(prev => prev.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCartItems(prev => 
      prev.map(item => 
        item.id === productId 
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const handlePurchase = () => {
    if (getTotalPrice() <= currentBalance) {
      setCurrentBalance(prev => prev - getTotalPrice());
      setCartItems([]);
      alert('¡Compra realizada con éxito! 🎉');
    } else {
      alert('Saldo insuficiente. Necesitas más PachaCoins 💰');
    }
  };

  return (
    <div className="page-content">
      <div className="page-header">
        <div className="logo-container">
          <img src={alpacaLogo} alt="PachaCoin Logo" className="alpaca-logo" />
          <h1 className="page-title">🛍️ Tienda PachaCoin</h1>
        </div>
        <div className="store-balance">
          <span className="balance-label">Saldo Disponible:</span>
          <span className="balance-amount">${currentBalance.toLocaleString()}</span>
        </div>
      </div>

      <div className="store-container">
        {/* Categories Filter */}
        <div className="categories-section">
          <h3>📂 Categorías</h3>
          <div className="categories-grid">
            {categories.map(category => (
              <button
                key={category.id}
                className={`category-btn ${selectedCategory === category.id ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category.id)}
              >
                <span className="category-icon">{category.icon}</span>
                <span className="category-name">{category.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="products-section">
          <div className="section-header">
            <h3>🛒 Productos</h3>
            <span className="products-count">{filteredProducts.length} productos</span>
          </div>
          
          <div className="products-grid">
            {filteredProducts.map(product => (
              <div key={product.id} className={`product-card ${product.popular ? 'popular' : ''}`}>
                {product.popular && (
                  <div className="popular-badge">🔥 Popular</div>
                )}
                {product.discount > 0 && (
                  <div className="discount-badge">-{product.discount}%</div>
                )}
                
                <div className="product-image">
                  <span className="product-emoji">{product.image}</span>
                </div>
                
                <div className="product-info">
                  <h4 className="product-name">{product.name}</h4>
                  <p className="product-description">{product.description}</p>
                  
                  <div className="product-rating">
                    <span className="stars">
                      {'⭐'.repeat(Math.floor(product.rating))}
                      {product.rating % 1 > 0 && '⭐'}
                    </span>
                    <span className="rating-text">{product.rating}</span>
                  </div>
                  
                  <div className="product-stock">
                    <span className="stock-label">Stock:</span>
                    <span className={`stock-amount ${product.stock < 5 ? 'low' : ''}`}>
                      {product.stock} unidades
                    </span>
                  </div>
                </div>
                
                <div className="product-pricing">
                  <div className="price-container">
                    <span className="current-price">${product.price}</span>
                    {product.originalPrice > product.price && (
                      <span className="original-price">${product.originalPrice}</span>
                    )}
                  </div>
                  
                  <button 
                    className="add-to-cart-btn"
                    onClick={() => addToCart(product)}
                    disabled={product.stock === 0}
                  >
                    {product.stock === 0 ? 'Agotado' : '🛒 Agregar'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Shopping Cart */}
        <div className="cart-section">
          <div className="cart-header">
            <h3>🛒 Carrito de Compras</h3>
            <span className="cart-count">{cartItems.length} items</span>
          </div>
          
          {cartItems.length === 0 ? (
            <div className="empty-cart">
              <span className="empty-cart-icon">🛒</span>
              <p>Tu carrito está vacío</p>
              <span>¡Agrega algunos productos!</span>
            </div>
          ) : (
            <div className="cart-content">
              <div className="cart-items">
                {cartItems.map(item => (
                  <div key={item.id} className="cart-item">
                    <div className="cart-item-image">
                      <span className="item-emoji">{item.image}</span>
                    </div>
                    
                    <div className="cart-item-info">
                      <h5 className="item-name">{item.name}</h5>
                      <span className="item-price">${item.price} c/u</span>
                    </div>
                    
                    <div className="cart-item-controls">
                      <button 
                        className="quantity-btn"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        -
                      </button>
                      <span className="quantity">{item.quantity}</span>
                      <button 
                        className="quantity-btn"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        +
                      </button>
                    </div>
                    
                    <div className="cart-item-total">
                      <span className="item-total">${item.price * item.quantity}</span>
                      <button 
                        className="remove-btn"
                        onClick={() => removeFromCart(item.id)}
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="cart-summary">
                <div className="summary-row">
                  <span>Subtotal:</span>
                  <span>${getTotalPrice()}</span>
                </div>
                <div className="summary-row">
                  <span>Descuento:</span>
                  <span>-$0</span>
                </div>
                <div className="summary-row total">
                  <span>Total:</span>
                  <span>${getTotalPrice()}</span>
                </div>
                
                <button 
                  className={`purchase-btn ${getTotalPrice() > currentBalance ? 'insufficient' : ''}`}
                  onClick={handlePurchase}
                  disabled={cartItems.length === 0}
                >
                  {getTotalPrice() > currentBalance ? '💰 Saldo Insuficiente' : '💳 Comprar Ahora'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Purchase Animation */}
      {purchaseAnimation && (
        <div className="purchase-animation">
          <span>🛒</span>
        </div>
      )}
    </div>
  );
};

export default Store; 