import React, { useState, useEffect } from 'react';
import './Pages.css';
import alpacaLogo from '../../img/alpaca.jpg';
import messageImage from '../../img/message.jpg';
import FourImageAnimation from './animationHome.js';

const Home = ({ onDisconnect }) => {
  const [isHovering, setIsHovering] = useState(false);
  const [currentMessage, setCurrentMessage] = useState(0);
  const [showDepositModal, setShowDepositModal] = useState(false);
  const [depositAmount, setDepositAmount] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [successAmount, setSuccessAmount] = useState(0);
  
  // Estado del saldo del usuario
  const [userBalance, setUserBalance] = useState({
    total: 50,
    currency: 'USD',
    change: '+125.50',
    changePercent: '+1.45%'
  });

  const messages = [
    "¡Hola! ¿Cómo estás hoy? 😊",
    "¡Es hora de ahorrar! 💰",
    "¡Tu mascota te extraña! 🦙",
    "¡Completa tus objetivos! 🎯",
    "¡Juega y gana recompensas! 🎮",
    "¡Mantén tu streak! 🔥",
    "¡Hoy es un gran día! ✨",
    "¡No olvides alimentar a tu mascota! 🥕"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessage((prev) => (prev + 1) % messages.length);
    }, 3000); // Cambia mensaje cada 3 segundos

    return () => clearInterval(interval);
  }, [messages.length]);

  const handleDisconnect = () => {
    if (onDisconnect) {
      onDisconnect();
    }
  };

  const handleDeposit = () => {
    setShowDepositModal(true);
    setDepositAmount('');
    setShowSuccess(false);
  };

  const handleQuickDeposit = (amount) => {
    setDepositAmount(amount.toString());
  };

  const processDeposit = () => {
    const amount = parseFloat(depositAmount);
    
    if (!isNaN(amount) && amount > 0) {
      // Calcular el nuevo total
      const newTotal = userBalance.total + amount;
      
      // Calcular el cambio (simulado)
      const changeAmount = amount * 0.025; // 2.5% de ganancia simulada
      const newChange = `+${changeAmount.toFixed(2)}`;
      const newChangePercent = `+${((changeAmount / userBalance.total) * 100).toFixed(2)}%`;
      
      // Actualizar el estado del saldo
      setUserBalance(prevBalance => ({
        ...prevBalance,
        total: newTotal,
        change: newChange,
        changePercent: newChangePercent
      }));
      
      setSuccessAmount(amount);
      setShowSuccess(true);
      
      // Cerrar el modal después de 3 segundos
      setTimeout(() => {
        setShowDepositModal(false);
        setShowSuccess(false);
        setDepositAmount('');
      }, 3000);
    }
  };

  const closeModal = () => {
    setShowDepositModal(false);
    setShowSuccess(false);
    setDepositAmount('');
  };
  

  return (
    <div className="page-content">
      <div className="page-header">
        <div className="logo-container">
          <img src={alpacaLogo} alt="PachaCoin Logo" className="alpaca-logo" />
          <h1 className="page-title"> Home </h1>
        </div>
        <button 
          className="disconnect-btn" 
          onClick={handleDeposit}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          {isHovering ? 'Depositar' : 'Depositar'}
        </button>
      </div>
      
      <div className="content-grid">
        {/* Oval Image Card - Top Left */}
        <div className="content-card oval-image-card">
          <div className="oval-container">
            {/* Saldo del usuario */}
            <div className="balance-display">
              <div className="balance-header">
                <span className="balance-icon">💰</span>
                <span className="balance-label"> Tus ahorros </span>
              </div>
              <div className="balance-amount">
                <span className="balance-currency">{userBalance.currency}</span>
                <span className="balance-value">${userBalance.total.toLocaleString()}</span>
              </div>
              <div className="balance-change">
                <span className="change-amount">{userBalance.change}</span>
                <span className="change-percent">({userBalance.changePercent})</span>
              </div>
            </div>
            
            <FourImageAnimation/>
            <div className="text-balloon">
              <div className="balloon-content">
                <span className="message-text">{messages[currentMessage]}</span>
                <div className="balloon-arrow"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Objectives Card - Top Right */}
        <div className="content-card objectives-card">
          <div className="card-header">
            <h3>Mis Objetivos</h3>
          </div>
          <div className="objectives-list">
            <div className="objective-item">
              <div className="objective-header">
                <span className="objective-icon">📅</span>
                <span className="objective-title">Semanal</span>
              </div>
              <div className="objective-progress">
                <div className="progress-bar">
                  <div className="progress-fill" style={{width: '75%'}}></div>
                </div>
                <span className="progress-text">$375 / $500</span>
              </div>
            </div>
            
            <div className="objective-item">
              <div className="objective-header">
                <span className="objective-icon">🎯</span>
                <span className="objective-title">Mensual</span>
              </div>
              <div className="objective-progress">
                <div className="progress-bar">
                  <div className="progress-fill" style={{width: '60%'}}></div>
                </div>
                <span className="progress-text">$1,200 / $2,000</span>
              </div>
            </div>
            
            <div className="objective-item">
              <div className="objective-header">
                <span className="objective-icon">🏆</span>
                <span className="objective-title">Anual</span>
              </div>
              <div className="objective-progress">
                <div className="progress-bar">
                  <div className="progress-fill" style={{width: '45%'}}></div>
                </div>
                <span className="progress-text">$5,400 / $12,000</span>
              </div>
            </div>
          </div>
        </div>

        {/* Activity Summary Card - Bottom Wide */}
        <div className="content-card activity-summary-card">
          <div className="card-header">
            <h3>Resumen de Actividad</h3>
            <span className="activity-date">Hoy, {new Date().toLocaleDateString('es-ES', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}</span>
          </div>
          
          <div className="activity-stats">
            <div className="stat-card">
              <div className="stat-icon">💰</div>
              <div className="stat-info">
                <span className="stat-value">$125</span>
                <span className="stat-label">Ahorrado Hoy</span>
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-icon">🎮</div>
              <div className="stat-info">
                <span className="stat-value">3</span>
                <span className="stat-label">Juegos Jugados</span>
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-icon">🦙</div>
              <div className="stat-info">
                <span className="stat-value">95%</span>
                <span className="stat-label">Felicidad Mascota</span>
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-icon">🔥</div>
              <div className="stat-info">
                <span className="stat-value">12</span>
                <span className="stat-label">Días Consecutivos</span>
              </div>
            </div>
          </div>
          
          <div className="recent-activities">
            <h4>Actividades Recientes</h4>
            <div className="activity-list">
              <div className="activity-item">
                <div className="activity-icon">🦙</div>
                <div className="activity-content">
                  <h5>Alimentaste tu mascota</h5>
                  <p>Hace 2 horas - +10 puntos de felicidad</p>
                </div>
                <span className="activity-time">2h</span>
              </div>
              
              <div className="activity-item">
                <div className="activity-icon">💰</div>
                <div className="activity-content">
                  <h5>Depósito realizado</h5>
                  <p>Hace 4 horas - +$50 ahorrados</p>
                </div>
                <span className="activity-time">4h</span>
              </div>
              
              <div className="activity-item">
                <div className="activity-icon">🎮</div>
                <div className="activity-content">
                  <h5>Completaste un minijuego</h5>
                  <p>Hace 6 horas - +5 puntos de experiencia</p>
                </div>
                <span className="activity-time">6h</span>
              </div>
              
              <div className="activity-item">
                <div className="activity-icon">🏆</div>
                <div className="activity-content">
                  <h5>Lograste un objetivo semanal</h5>
                  <p>Hace 1 día - +$25 en recompensas</p>
                </div>
                <span className="activity-time">1d</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de Depósito */}
      {showDepositModal && (
        <div className="deposit-modal-overlay" onClick={closeModal}>
          <div className="deposit-modal" onClick={(e) => e.stopPropagation()}>
            {!showSuccess ? (
              <>
                <div className="deposit-modal-header">
                  <div className="deposit-modal-icon">💰</div>
                  <h3 className="deposit-modal-title">Realizar Depósito</h3>
                  <p className="deposit-modal-subtitle">Ingresa el monto que deseas depositar en tus ahorros</p>
                </div>
                
                <div className="deposit-form">
                  <div className="deposit-options">
                    <div 
                      className="deposit-option" 
                      onClick={() => handleQuickDeposit(10)}
                    >
                      $10
                    </div>
                    <div 
                      className="deposit-option" 
                      onClick={() => handleQuickDeposit(25)}
                    >
                      $25
                    </div>
                    <div 
                      className="deposit-option" 
                      onClick={() => handleQuickDeposit(50)}
                    >
                      $50
                    </div>
                    <div 
                      className="deposit-option" 
                      onClick={() => handleQuickDeposit(100)}
                    >
                      $100
                    </div>
                    <div 
                      className="deposit-option" 
                      onClick={() => handleQuickDeposit(250)}
                    >
                      $250
                    </div>
                    <div 
                      className="deposit-option" 
                      onClick={() => handleQuickDeposit(500)}
                    >
                      $500
                    </div>
                  </div>
                  
                  <div className="deposit-input-group">
                    <label className="deposit-label">Monto Personalizado (USD)</label>
                    <div className="deposit-input-container">
                      <input
                        type="number"
                        className="deposit-input"
                        placeholder="0.00"
                        value={depositAmount}
                        onChange={(e) => setDepositAmount(e.target.value)}
                        min="0"
                        step="0.01"
                      />
                      <span className="deposit-currency">USD</span>
                    </div>
                  </div>
                </div>
                
                <div className="deposit-modal-actions">
                  <button className="deposit-btn secondary" onClick={closeModal}>
                    Cancelar
                  </button>
                  <button 
                    className="deposit-btn primary" 
                    onClick={processDeposit}
                    disabled={!depositAmount || parseFloat(depositAmount) <= 0}
                  >
                    Depositar
                  </button>
                </div>
              </>
            ) : (
              <div className="deposit-success">
                <div className="deposit-success-icon">✅</div>
                <h3 className="deposit-success-title">¡Depósito Exitoso!</h3>
                <p className="deposit-success-message">
                  Tu depósito ha sido procesado correctamente
                </p>
                <div className="deposit-success-amount">
                  +${successAmount.toFixed(2)} USD
                </div>
                <p className="deposit-success-message">
                  Tu nuevo saldo se ha actualizado automáticamente
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home; 