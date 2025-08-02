import React, { useState } from 'react';
import './CriptoPou.css';
import alpacalotLogo from '../img/alpaca.jpg';
import FourImageAnimation from './animation.js';

const CriptoPou = ({ onWalletConnect }) => {
  const [pouType, setPouType] = useState('Individual');

  const handleWalletClick = () => {
    if (onWalletConnect) {
      onWalletConnect();
    }
  };

  return (
    <div className="cripto-pou-container">
      <div className="background-animation">
        <div className="floating-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
          <div className="shape shape-4"></div>
          <div className="shape shape-5"></div>
        </div>
      </div>
      
      <div className="cripto-pou-content">
        {/* Left Section */}
        <div className="left-section">
             <FourImageAnimation />
          <h1 className="title">Soy PachaCoin</h1>
          <div className="title-underlinepachaco"></div>
          <p className="description">
                Estoy aquí para ayudarte a ahorrar de forma sencilla y divertida. 
                Ven y haz tus depósitos conmigo, cuídame y  juntos haremos crecer tus ahorros. 
                ¿Te animas a empezar ahora?
          </p>
          <div className="features-list">
            <div className="feature-item">
              <span className="feature-icon">💰</span>
              <span>Ahorra de forma divertida</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">🎮</span>
              <span>Juega y gana recompensas</span>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="right-section">
          <div className="profile-section">
            <div className="profile-circle">
              <img src={alpacalotLogo} alt="Mascota" className="pet-avatar" />
            </div>
            <div className="profile-glow"></div>
          </div>
          <h2 className="cripto-pou-title">PachaCoin</h2>
          <div className="title-underline"></div>
          <p className="subtitle"> Cria y haz crecer tu mascota NFT para ahorrar en Cripto. </p>
          <button className="connect-wallet-btn" onClick={handleWalletClick}>
            <span className="btn-text">Conectar Wallet</span>
            <span className="btn-icon">🔗</span>
            <div className="btn-glow"></div>
          </button>

          <div className="learn-more">
            <span>¿Eres nuevo? </span>
            <a href="#" className="learn-more-link">Aprende mas</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CriptoPou; 