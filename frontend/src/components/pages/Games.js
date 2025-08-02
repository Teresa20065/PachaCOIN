import React, { useState, useEffect } from 'react';
import './Pages.css';
import alpacaLogo from '../../img/alpaca.jpg';

const Games = () => {
  const [selectedGame, setSelectedGame] = useState(null);
  const [gameScore, setGameScore] = useState(0);
  const [gameTime, setGameTime] = useState(30);
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameHistory, setGameHistory] = useState([]);
  const [currentLevel, setCurrentLevel] = useState(1);
  const [coinsEarned, setCoinsEarned] = useState(0);

  const games = [
    {
      id: 'memory',
      name: '🧠 Memoria Mágica',
      description: 'Encuentra las parejas de cartas para ganar puntos',
      difficulty: 'Fácil',
      reward: 10,
      icon: '🧠',
      color: '#FFD700',
      highScore: 0
    },
    {
      id: 'puzzle',
      name: '🧩 Puzzle Crypto',
      description: 'Ordena las piezas para formar la imagen completa',
      difficulty: 'Medio',
      reward: 25,
      icon: '🧩',
      color: '#FFA500',
      highScore: 0
    },
    {
      id: 'speed',
      name: '⚡ Velocidad Extrema',
      description: 'Toca los objetivos antes de que desaparezcan',
      difficulty: 'Difícil',
      reward: 50,
      icon: '⚡',
      color: '#FF6347',
      highScore: 0
    },
    {
      id: 'math',
      name: '🔢 Matemáticas Divertidas',
      description: 'Resuelve operaciones matemáticas rápidamente',
      difficulty: 'Medio',
      reward: 20,
      icon: '🔢',
      color: '#20B2AA',
      highScore: 0
    },
    {
      id: 'color',
      name: '🎨 Colores Mágicos',
      description: 'Combina los colores correctos para avanzar',
      difficulty: 'Fácil',
      reward: 15,
      icon: '🎨',
      color: '#9370DB',
      highScore: 0
    },
    {
      id: 'word',
      name: '📝 Palabras Secretas',
      description: 'Forma palabras con las letras disponibles',
      difficulty: 'Medio',
      reward: 30,
      icon: '📝',
      color: '#32CD32',
      highScore: 0
    }
  ];

  const startGame = (game) => {
    setSelectedGame(game);
    setGameScore(0);
    setGameTime(30);
    setIsPlaying(true);
    setCurrentLevel(1);
  };

  const endGame = () => {
    if (selectedGame && gameScore > 0) {
      const earnedCoins = Math.floor(gameScore / 10) * selectedGame.reward;
      setCoinsEarned(earnedCoins);
      
      const gameResult = {
        game: selectedGame.name,
        score: gameScore,
        coins: earnedCoins,
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString()
      };
      
      setGameHistory(prev => [gameResult, ...prev.slice(0, 4)]);
      
      // Update high score
      const updatedGames = games.map(g => 
        g.id === selectedGame.id && gameScore > g.highScore 
          ? { ...g, highScore: gameScore }
          : g
      );
    }
    
    setIsPlaying(false);
    setSelectedGame(null);
  };

  const increaseScore = () => {
    setGameScore(prev => prev + 10);
  };

  useEffect(() => {
    let timer;
    if (isPlaying && gameTime > 0) {
      timer = setTimeout(() => {
        setGameTime(prev => prev - 1);
      }, 1000);
    } else if (gameTime === 0) {
      endGame();
    }
    return () => clearTimeout(timer);
  }, [isPlaying, gameTime]);

  return (
    <div className="page-content">
      <div className="page-header">
        <div className="logo-container">
          <img src={alpacaLogo} alt="PachaCoin Logo" className="alpaca-logo" />
          <h1 className="page-title">🎮 Juegos PachaCoin</h1>
        </div>
        <div className="games-stats">
          <div className="stat-item">
            <span className="stat-icon">🏆</span>
            <span className="stat-value">{gameHistory.length}</span>
            <span className="stat-label">Jugados</span>
          </div>
          <div className="stat-item">
            <span className="stat-icon">💰</span>
            <span className="stat-value">{coinsEarned}</span>
            <span className="stat-label">Coins</span>
          </div>
        </div>
      </div>

      {!isPlaying ? (
        <div className="games-container">
          {/* Games Grid */}
          <div className="games-section">
            <div className="section-header">
              <h3>🎯 Juegos Disponibles</h3>
              <span className="games-count">{games.length} juegos</span>
            </div>
            
            <div className="games-grid">
              {games.map(game => (
                <div key={game.id} className="game-card" style={{ borderColor: game.color }}>
                  <div className="game-header">
                    <div className="game-icon" style={{ backgroundColor: game.color }}>
                      <span className="game-emoji">{game.icon}</span>
                    </div>
                    <div className="game-info">
                      <h4 className="game-name">{game.name}</h4>
                      <p className="game-description">{game.description}</p>
                      <div className="game-meta">
                        <span className="difficulty" style={{ color: game.color }}>
                          {game.difficulty}
                        </span>
                        <span className="reward">💰 {game.reward} coins</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="game-stats">
                    <div className="high-score">
                      <span className="score-label">Mejor Puntaje:</span>
                      <span className="score-value">{game.highScore}</span>
                    </div>
                    <button 
                      className="play-btn"
                      onClick={() => startGame(game)}
                      style={{ backgroundColor: game.color }}
                    >
                      🎮 Jugar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Game History */}
          <div className="history-section">
            <h3>📊 Historial de Juegos</h3>
            {gameHistory.length === 0 ? (
              <div className="empty-history">
                <span className="empty-icon">📊</span>
                <p>No hay juegos jugados aún</p>
                <span>¡Comienza a jugar para ver tu historial!</span>
              </div>
            ) : (
              <div className="history-list">
                {gameHistory.map((result, index) => (
                  <div key={index} className="history-item">
                    <div className="history-game">
                      <span className="game-result-icon">🎮</span>
                      <div className="result-info">
                        <h5 className="result-game">{result.game}</h5>
                        <span className="result-date">{result.date} - {result.time}</span>
                      </div>
                    </div>
                    <div className="result-stats">
                      <div className="result-score">
                        <span className="score-icon">🏆</span>
                        <span className="score-value">{result.score}</span>
                      </div>
                      <div className="result-coins">
                        <span className="coins-icon">💰</span>
                        <span className="coins-value">+{result.coins}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="game-play-container">
          <div className="game-header-bar">
            <div className="game-info-bar">
              <h3 className="current-game">{selectedGame?.name}</h3>
              <span className="game-difficulty">{selectedGame?.difficulty}</span>
            </div>
            <div className="game-controls">
              <button className="pause-btn" onClick={endGame}>
                ⏸️ Pausar
              </button>
            </div>
          </div>
          
          <div className="game-stats-bar">
            <div className="stat-card">
              <span className="stat-icon">⏱️</span>
              <div className="stat-content">
                <span className="stat-value">{gameTime}s</span>
                <span className="stat-label">Tiempo</span>
              </div>
            </div>
            
            <div className="stat-card">
              <span className="stat-icon">🏆</span>
              <div className="stat-content">
                <span className="stat-value">{gameScore}</span>
                <span className="stat-label">Puntaje</span>
              </div>
            </div>
            
            <div className="stat-card">
              <span className="stat-icon">📈</span>
              <div className="stat-content">
                <span className="stat-value">{currentLevel}</span>
                <span className="stat-label">Nivel</span>
              </div>
            </div>
            
            <div className="stat-card">
              <span className="stat-icon">💰</span>
              <div className="stat-content">
                <span className="stat-value">{Math.floor(gameScore / 10) * (selectedGame?.reward || 0)}</span>
                <span className="stat-label">Coins</span>
              </div>
            </div>
          </div>
          
          <div className="game-area">
            <div className="game-placeholder">
              <div className="game-animation">
                <span className="game-animation-icon">{selectedGame?.icon}</span>
                <div className="animation-particles">
                  <div className="particle"></div>
                  <div className="particle"></div>
                  <div className="particle"></div>
                  <div className="particle"></div>
                  <div className="particle"></div>
                </div>
              </div>
              <h4 className="game-instruction">¡Toca para ganar puntos!</h4>
              <button className="score-btn" onClick={increaseScore}>
                🎯 Toca Aquí
              </button>
            </div>
          </div>
          
          <div className="game-progress">
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ width: `${((30 - gameTime) / 30) * 100}%` }}
              ></div>
            </div>
            <span className="progress-text">Progreso: {Math.floor(((30 - gameTime) / 30) * 100)}%</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Games; 