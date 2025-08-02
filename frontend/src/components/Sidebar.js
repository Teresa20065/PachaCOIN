import React, { useState } from 'react';
import './Sidebar.css';
import alpacaLogo from '../img/alpaca.jpg';

const Sidebar = ({ currentPage, setCurrentPage, collapsed, setCollapsed, onDisconnect }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isHovering, setIsHovering] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    // Implementar búsqueda
    console.log('Buscando:', searchQuery);
  };

  const handleDisconnect = () => {
    if (onDisconnect) {
      onDisconnect();
    }
  };

  const menuItems = [
    { id: 'home', label: 'Home', icon: '🏠', hasSubmenu: true },
    { id: 'financial', label: 'Resumen Financiero', icon: '★', hasSubmenu: true },
    { id: 'store', label: 'Tienda', icon: '$', hasSubmenu: true },
    { id: 'games', label: 'Juegos', icon: '🎮', hasSubmenu: true },
  ];

  const settingsItems = [
    { id: 'settings', label: 'Ajustes', icon: '⚙️', hasSubmenu: true },
    { id: 'recommendations', label: 'Recomendaciones', icon: 'W', hasSubmenu: true },
  ];

  const addressItems = [
    { id: 'public-address', label: 'Adress Publica', icon: '📍', hasSubmenu: true },
  ];

  return (
    <div className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
      {/* Header with logo and collapse button */}
      <div className="sidebar-header">
        <div className="logo-container">
          <img src={alpacaLogo} alt="PachaCoin Logo" className="sidebar-logo" />
          <span className="logo-text">PachaCoin</span>
        </div>
        <div className="collapse-buttons">
          <button 
            className="collapse-btn"
            onClick={() => setCollapsed(!collapsed)}
          >
            {collapsed ? '→' : '←'}
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="search-container">
        <form onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Buscar..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </form>
      </div>

      {/* Main Navigation Menu */}
      <nav className="sidebar-nav">
        <ul className="nav-list">
          {menuItems.map((item) => (
            <li key={item.id}>
              <button
                className={`nav-item ${currentPage === item.id ? 'active' : ''}`}
                onClick={() => setCurrentPage(item.id)}
              >
                <span className="nav-icon">{item.icon}</span>
                <span className="nav-label">{item.label}</span>
                {item.hasSubmenu && <span className="chevron">→</span>}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Settings Section */}
      <div className="settings-section">
        <div className="section-divider"></div>
        <ul className="nav-list">
          {settingsItems.map((item) => (
            <li key={item.id}>
              <button
                className={`nav-item ${currentPage === item.id ? 'active' : ''}`}
                onClick={() => setCurrentPage(item.id)}
              >
                <span className="nav-icon">{item.icon}</span>
                <span className="nav-label">{item.label}</span>
                {item.hasSubmenu && <span className="chevron">→</span>}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Address Section */}
      <div className="address-section">
        <ul className="nav-list">
          {addressItems.map((item) => (
            <li key={item.id}>
              <button
                className={`nav-item ${currentPage === item.id ? 'active' : ''}`}
                onClick={() => setCurrentPage(item.id)}
              >
                <span className="nav-icon">{item.icon}</span>
                <span className="nav-label">{item.label}</span>
                {item.hasSubmenu && <span className="chevron">→</span>}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Connected Button */}
      <div className="connected-button-container">
        <button 
          className={`connected-btn ${isHovering ? 'disconnect-hover' : ''}`}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          onClick={handleDisconnect}
        >
          {isHovering ? 'Desconectar Wallet' : 'Conectado'}
        </button>
      </div>
    </div>
  );
};

export default Sidebar; 