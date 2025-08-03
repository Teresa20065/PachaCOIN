import React, { useState } from 'react';
import './publicAddress.css';
import alpacaLogo from '../../img/alpaca.jpg';

const PublicAddress = () => {
  const [copiedAddress, setCopiedAddress] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  const walletInfo = {
    address: '0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b7',
    balance: {
      ETH: 2.45,
      BTC: 0.023,
      USDT: 1250.50,
      PCH: 5000.00
    },
    network: 'Ethereum Mainnet',
    connected: true,
    lastTransaction: '2024-01-15 14:30:25',
    totalValue: 8750.75
  };

  const transactionHistory = [
    {
      id: 1,
      type: 'deposit',
      amount: 100,
      currency: 'USDT',
      date: '2024-01-15 14:30:25',
      status: 'completed',
      hash: '0x1234...5678'
    },
    {
      id: 2,
      type: 'withdrawal',
      amount: 50,
      currency: 'ETH',
      date: '2024-01-14 09:15:10',
      status: 'completed',
      hash: '0x8765...4321'
    },
    {
      id: 3,
      type: 'swap',
      amount: 25,
      currency: 'BTC',
      date: '2024-01-13 16:45:30',
      status: 'pending',
      hash: '0xabcd...efgh'
    },
    {
      id: 4,
      type: 'deposit',
      amount: 200,
      currency: 'PCH',
      date: '2024-01-12 11:20:15',
      status: 'completed',
      hash: '0x9876...5432'
    }
  ];

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedAddress(true);
      setTimeout(() => setCopiedAddress(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return '#28a745';
      case 'pending': return '#ffc107';
      case 'failed': return '#dc3545';
      default: return '#6c757d';
    }
  };

  const getTransactionIcon = (type) => {
    switch (type) {
      case 'deposit': return '📥';
      case 'withdrawal': return '📤';
      case 'swap': return '🔄';
      default: return '💱';
    }
  };

  const renderOverview = () => (
    <div className="address-overview">
      <div className="wallet-card">
        <div className="wallet-header">
          <div className="wallet-info">
            <h4>👛 Wallet Pública</h4>
            <p className="network-info">{walletInfo.network}</p>
          </div>
          <div className="connection-status">
            <span className={`status-dot ${walletInfo.connected ? 'connected' : 'disconnected'}`}></span>
            <span className="status-text">{walletInfo.connected ? 'Conectado' : 'Desconectado'}</span>
          </div>
        </div>
        
        <div className="address-section">
          <div className="address-display">
            <span className="address-label">Dirección:</span>
            <div className="address-container">
              <span className="address-text">{walletInfo.address}</span>
              <button 
                className="copy-btn"
                onClick={() => copyToClipboard(walletInfo.address)}
              >
                {copiedAddress ? '✅' : '📋'}
              </button>
            </div>
          </div>
        </div>
        
        <div className="balance-summary">
          <h5>💰 Balance Total: ${walletInfo.totalValue.toLocaleString()}</h5>
          <div className="balance-grid">
            {Object.entries(walletInfo.balance).map(([currency, amount]) => (
              <div key={currency} className="balance-item">
                <span className="currency-icon">
                  {currency === 'ETH' ? '⚡' : currency === 'BTC' ? '₿' : currency === 'USDT' ? '💵' : '🪙'}
                </span>
                <div className="balance-info">
                  <span className="currency-name">{currency}</span>
                  <span className="balance-amount">{amount.toLocaleString()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderTransactions = () => (
    <div className="transactions-section">
      <div className="transactions-header">
        <h4>📊 Historial de Transacciones</h4>
        <div className="transaction-filters">
          <button className="filter-btn active">Todas</button>
          <button className="filter-btn">Depósitos</button>
          <button className="filter-btn">Retiros</button>
          <button className="filter-btn">Swaps</button>
        </div>
      </div>
      
      <div className="transactions-list">
        {transactionHistory.map(transaction => (
          <div key={transaction.id} className="transaction-item">
            <div className="transaction-icon">
              <span className="icon">{getTransactionIcon(transaction.type)}</span>
            </div>
            
            <div className="transaction-details">
              <div className="transaction-info">
                <h6 className="transaction-type">
                  {transaction.type === 'deposit' ? 'Depósito' : 
                   transaction.type === 'withdrawal' ? 'Retiro' : 'Swap'}
                </h6>
                <span className="transaction-date">{transaction.date}</span>
              </div>
              
              <div className="transaction-amount">
                <span className="amount">
                  {transaction.type === 'withdrawal' ? '-' : '+'}
                  {transaction.amount} {transaction.currency}
                </span>
                <span 
                  className="status-badge"
                  style={{ backgroundColor: getStatusColor(transaction.status) }}
                >
                  {transaction.status === 'completed' ? 'Completado' : 
                   transaction.status === 'pending' ? 'Pendiente' : 'Fallido'}
                </span>
              </div>
            </div>
            
            <div className="transaction-hash">
              <span className="hash-text">{transaction.hash}</span>
              <button 
                className="copy-hash-btn"
                onClick={() => copyToClipboard(transaction.hash)}
              >
                📋
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderSecurity = () => (
    <div className="security-section">
      <div className="security-card">
        <h4>🔒 Seguridad de la Wallet</h4>
        
        <div className="security-items">
          <div className="security-item">
            <div className="security-icon">🔐</div>
            <div className="security-info">
              <h6>Autenticación de Dos Factores</h6>
              <p>Protege tu wallet con 2FA</p>
              <span className="security-status active">Activado</span>
            </div>
          </div>
          
          <div className="security-item">
            <div className="security-icon">📱</div>
            <div className="security-info">
              <h6>Verificación Biométrica</h6>
              <p>Usa huella dactilar o Face ID</p>
              <span className="security-status active">Activado</span>
            </div>
          </div>
          
          <div className="security-item">
            <div className="security-icon">🔔</div>
            <div className="security-info">
              <h6>Notificaciones de Transacciones</h6>
              <p>Recibe alertas en tiempo real</p>
              <span className="security-status active">Activado</span>
            </div>
          </div>
          
          <div className="security-item">
            <div className="security-icon">🛡️</div>
            <div className="security-info">
              <h6>Lista Blanca de Direcciones</h6>
              <p>Restringe transacciones a direcciones conocidas</p>
              <span className="security-status inactive">Desactivado</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSettings = () => (
    <div className="settings-section">
      <div className="settings-card">
        <h4>⚙️ Configuración de la Wallet</h4>
        
        <div className="settings-items">
          <div className="setting-item">
            <div className="setting-info">
              <h6>Red Principal</h6>
              <p>Ethereum Mainnet</p>
            </div>
            <button className="change-network-btn">Cambiar</button>
          </div>
          
          <div className="setting-item">
            <div className="setting-info">
              <h6>Gas Price</h6>
              <p>Automático (Recomendado)</p>
            </div>
            <button className="change-gas-btn">Configurar</button>
          </div>
          
          <div className="setting-item">
            <div className="setting-info">
              <h6>Límite de Transacción</h6>
              <p>$1,000 por día</p>
            </div>
            <button className="change-limit-btn">Modificar</button>
          </div>
          
          <div className="setting-item">
            <div className="setting-info">
              <h6>Exportar Clave Privada</h6>
              <p>Guarda tu clave de forma segura</p>
            </div>
            <button className="export-key-btn danger">Exportar</button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return renderOverview();
      case 'transactions':
        return renderTransactions();
      case 'security':
        return renderSecurity();
      case 'settings':
        return renderSettings();
      default:
        return renderOverview();
    }
  };

  return (
    <div className="page-content">
      <div className="page-header">
        <div className="logo-container">
          <img src={alpacaLogo} alt="PachaCoin Logo" className="alpaca-logo" />
          <h1 className="page-title">📍 Dirección Pública</h1>
        </div>
        <div className="address-stats">
          <div className="stat-item">
            <span className="stat-icon">💰</span>
            <span className="stat-value">${walletInfo.totalValue.toLocaleString()}</span>
            <span className="stat-label">Balance</span>
          </div>
          <div className="stat-item">
            <span className="stat-icon">📊</span>
            <span className="stat-value">{transactionHistory.length}</span>
            <span className="stat-label">Transacciones</span>
          </div>
        </div>
      </div>

      <div className="address-container">
        {/* Address Tabs */}
        <div className="address-tabs">
          <button 
            className={`address-tab ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            📋 Resumen
          </button>
          <button 
            className={`address-tab ${activeTab === 'transactions' ? 'active' : ''}`}
            onClick={() => setActiveTab('transactions')}
          >
            📊 Transacciones
          </button>
          <button 
            className={`address-tab ${activeTab === 'security' ? 'active' : ''}`}
            onClick={() => setActiveTab('security')}
          >
            🔒 Seguridad
          </button>
          <button 
            className={`address-tab ${activeTab === 'settings' ? 'active' : ''}`}
            onClick={() => setActiveTab('settings')}
          >
            ⚙️ Configuración
          </button>
        </div>

        {/* Address Content */}
        <div className="address-content">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default PublicAddress; 