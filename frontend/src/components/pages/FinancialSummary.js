import React, { useState, useEffect } from 'react';
import './Pages.css';
import alpacaLogo from '../../img/alpaca.jpg';

const FinancialSummary = () => {
  const [currentBalance, setCurrentBalance] = useState(1250);
  const [balanceAnimation, setBalanceAnimation] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setBalanceAnimation(prev => (prev + 1) % 360);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  const weeklyData = [
    { week: 'Semana 1', amount: 150, color: '#FFD700' },
    { week: 'Semana 2', amount: 200, color: '#FFA500' },
    { week: 'Semana 3', amount: 180, color: '#FFD700' },
    { week: 'Semana 4', amount: 250, color: '#FFA500' },
    { week: 'Semana 5', amount: 220, color: '#FFD700' },
    { week: 'Semana 6', amount: 300, color: '#FFA500' },
    { week: 'Semana 7', amount: 280, color: '#FFD700' },
    { week: 'Semana 8', amount: 350, color: '#FFA500' }
  ];

  const maxAmount = Math.max(...weeklyData.map(item => item.amount));

  return (
    <div className="page-content">
      <div className="page-header">
        <div className="logo-container">
          <img src={alpacaLogo} alt="PachaCoin Logo" className="alpaca-logo" />
          <h1 className="page-title">★ Resumen Financiero</h1>
        </div>
      </div>
      
      <div className="content-grid">
        {/* Balance Overview Card */}
        <div className="content-card balance-card">
          <div className="balance-header">
            <h3>💰 Balance General</h3>
            <div className="balance-animation">
              <div className="rotating-circle" style={{ transform: `rotate(${balanceAnimation}deg)` }}>
                <div className="circle-segment"></div>
                <div className="circle-segment"></div>
                <div className="circle-segment"></div>
              </div>
            </div>
          </div>
          
          <div className="balance-stats">
            <div className="balance-stat-item">
              <div className="stat-icon">💎</div>
              <div className="stat-content">
                <span className="stat-label">Ahorros Totales</span>
                <span className="stat-value">${currentBalance.toLocaleString()}</span>
                <div className="stat-progress">
                  <div className="progress-fill" style={{width: '85%'}}></div>
                </div>
              </div>
            </div>
            
            <div className="balance-stat-item">
              <div className="stat-icon">₿</div>
              <div className="stat-content">
                <span className="stat-label">Criptomonedas</span>
                <span className="stat-value">0.05 BTC</span>
                <div className="stat-progress">
                  <div className="progress-fill" style={{width: '60%'}}></div>
                </div>
              </div>
            </div>
            
            <div className="balance-stat-item">
              <div className="stat-icon">🏆</div>
              <div className="stat-content">
                <span className="stat-label">Recompensas</span>
                <span className="stat-value">$85.50</span>
                <div className="stat-progress">
                  <div className="progress-fill" style={{width: '75%'}}></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Circular Chart Card */}
        <div className="content-card chart-card">
          <div className="card-header">
            <h4>📊 Gastos por Categoría</h4>
          </div>
          <div className="circular-chart-container">
            <div className="circular-chart">
              <div className="chart-circle">
                <div className="circle-segment games" style={{ transform: 'rotate(0deg)' }}>
                  <div className="segment-fill" style={{ transform: 'rotate(216deg)' }}></div>
                </div>
                <div className="circle-segment food" style={{ transform: 'rotate(216deg)' }}>
                  <div className="segment-fill" style={{ transform: 'rotate(108deg)' }}></div>
                </div>
                <div className="circle-segment others" style={{ transform: 'rotate(324deg)' }}>
                  <div className="segment-fill" style={{ transform: 'rotate(36deg)' }}></div>
                </div>
                <div className="chart-center">
                  <span className="center-text">Total</span>
                  <span className="center-amount">$1,250</span>
                </div>
              </div>
            </div>
            <div className="chart-legend">
              <div className="legend-item">
                <div className="legend-color games"></div>
                <span>Juegos (60%)</span>
                <span className="legend-amount">$750</span>
              </div>
              <div className="legend-item">
                <div className="legend-color food"></div>
                <span>Alimentación (30%)</span>
                <span className="legend-amount">$375</span>
              </div>
              <div className="legend-item">
                <div className="legend-color others"></div>
                <span>Otros (10%)</span>
                <span className="legend-amount">$125</span>
              </div>
            </div>
          </div>
        </div>

        {/* Histogram Card */}
        <div className="content-card histogram-card">
          <div className="card-header">
            <h4>📈 Ingresos por Semana</h4>
          </div>
          <div className="histogram-container">
            <div className="histogram-bars">
              {weeklyData.map((item, index) => (
                <div key={index} className="histogram-bar-group">
                  <div 
                    className="histogram-bar" 
                    style={{ 
                      height: `${(item.amount / maxAmount) * 100}%`,
                      backgroundColor: item.color
                    }}
                  >
                    <div className="bar-tooltip">
                      ${item.amount}
                    </div>
                  </div>
                  <span className="bar-label">{item.week}</span>
                </div>
              ))}
            </div>
            <div className="histogram-stats">
              <div className="histogram-stat">
                <span className="stat-label">Promedio Semanal</span>
                <span className="stat-value">$228</span>
              </div>
              <div className="histogram-stat">
                <span className="stat-label">Total 8 Semanas</span>
                <span className="stat-value">$1,830</span>
              </div>
            </div>
          </div>
        </div>

        {/* Transactions Card */}
        <div className="content-card transactions-card">
          <div className="card-header">
            <h3>💳 Historial de Transacciones</h3>
            <div className="transaction-filters">
              <button className="filter-btn active">Todas</button>
              <button className="filter-btn">Depósitos</button>
              <button className="filter-btn">Gastos</button>
              <button className="filter-btn">Recompensas</button>
            </div>
          </div>
          
          <div className="transactions-container">
            <div className="transaction-item featured">
              <div className="transaction-icon">💰</div>
              <div className="transaction-content">
                <div className="transaction-header">
                  <h5>Depósito Mensual</h5>
                  <span className="transaction-date">Hoy, 15/03/2024</span>
                </div>
                <p>Depósito automático de tu cuenta principal</p>
                <div className="transaction-tags">
                  <span className="tag deposit">Depósito</span>
                  <span className="tag automatic">Automático</span>
                </div>
              </div>
              <div className="transaction-amount positive">
                <span className="amount-value">+$100</span>
                <span className="amount-time">10:30 AM</span>
              </div>
            </div>

            <div className="transaction-item">
              <div className="transaction-icon">🎮</div>
              <div className="transaction-content">
                <div className="transaction-header">
                  <h5>Compra de Juego</h5>
                  <span className="transaction-date">Ayer, 14/03/2024</span>
                </div>
                <p>Compra del nuevo minijuego "Crypto Puzzle"</p>
                <div className="transaction-tags">
                  <span className="tag expense">Gasto</span>
                  <span className="tag entertainment">Entretenimiento</span>
                </div>
              </div>
              <div className="transaction-amount negative">
                <span className="amount-value">-$25</span>
                <span className="amount-time">3:45 PM</span>
              </div>
            </div>

            <div className="transaction-item">
              <div className="transaction-icon">🏆</div>
              <div className="transaction-content">
                <div className="transaction-header">
                  <h5>Recompensa por Desafío</h5>
                  <span className="transaction-date">13/03/2024</span>
                </div>
                <p>Completaste el desafío semanal de ahorro</p>
                <div className="transaction-tags">
                  <span className="tag reward">Recompensa</span>
                  <span className="tag challenge">Desafío</span>
                </div>
              </div>
              <div className="transaction-amount positive">
                <span className="amount-value">+$15</span>
                <span className="amount-time">9:15 AM</span>
              </div>
            </div>

            <div className="transaction-item">
              <div className="transaction-icon">🦙</div>
              <div className="transaction-content">
                <div className="transaction-header">
                  <h5>Alimentación Mascota</h5>
                  <span className="transaction-date">12/03/2024</span>
                </div>
                <p>Compra de comida premium para tu mascota</p>
                <div className="transaction-tags">
                  <span className="tag expense">Gasto</span>
                  <span className="tag pet">Mascota</span>
                </div>
              </div>
              <div className="transaction-amount negative">
                <span className="amount-value">-$10</span>
                <span className="amount-time">2:20 PM</span>
              </div>
            </div>

            <div className="transaction-item">
              <div className="transaction-icon">🎯</div>
              <div className="transaction-content">
                <div className="transaction-header">
                  <h5>Logro de Objetivo</h5>
                  <span className="transaction-date">11/03/2024</span>
                </div>
                <p>Alcanzaste tu meta de ahorro mensual</p>
                <div className="transaction-tags">
                  <span className="tag reward">Recompensa</span>
                  <span className="tag goal">Objetivo</span>
                </div>
              </div>
              <div className="transaction-amount positive">
                <span className="amount-value">+$50</span>
                <span className="amount-time">11:00 AM</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinancialSummary; 