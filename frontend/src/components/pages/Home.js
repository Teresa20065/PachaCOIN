import React, { useState, useEffect } from 'react';
import './Pages.css';
import alpacaLogo from '../../img/alpaca.jpg';
import messageImage from '../../img/message.jpg';
import FourImageAnimation from './animationHome.js';

const Home = ({ onDisconnect }) => {
  const [isHovering, setIsHovering] = useState(false);
  const [currentMessage, setCurrentMessage] = useState(0);

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
  

  return (
    <div className="page-content">
      <div className="page-header">
        <div className="logo-container">
          <img src={alpacaLogo} alt="PachaCoin Logo" className="alpaca-logo" />
          <h1 className="page-title"> Home </h1>
        </div>
        <button 
          className="disconnect-btn" 
          onClick="haz recibido 5eth"
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
    </div>
  );
};

export default Home; 