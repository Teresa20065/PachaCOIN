import React, { useState } from 'react';
import './Pages.css';
import alpacaLogo from '../../img/alpaca.jpg';

const Recommendations = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [favorites, setFavorites] = useState([]);

  const categories = [
    { id: 'all', name: '📚 Todo', icon: '📚' },
    { id: 'beginner', name: '🌱 Principiante', icon: '🌱' },
    { id: 'intermediate', name: '📈 Intermedio', icon: '📈' },
    { id: 'advanced', name: '🚀 Avanzado', icon: '🚀' },
    { id: 'tips', name: '💡 Consejos', icon: '💡' },
    { id: 'tutorials', name: '🎓 Tutoriales', icon: '🎓' }
  ];

  const recommendations = [
    {
      id: 1,
      title: '🚀 Guía para Principiantes',
      category: 'beginner',
      description: 'Aprende los conceptos básicos de criptomonedas y cómo empezar a ahorrar de forma segura.',
      content: 'Esta guía te enseñará todo lo que necesitas saber para comenzar tu viaje en el mundo de las criptomonedas. Desde crear tu primera wallet hasta hacer tu primer depósito.',
      difficulty: 'Fácil',
      duration: '15 min',
      rating: 4.9,
      views: 1250,
      featured: true,
      tags: ['Básico', 'Wallet', 'Seguridad']
    },
    {
      id: 2,
      title: '💰 Estrategias de Ahorro',
      category: 'intermediate',
      description: 'Descubre técnicas avanzadas para maximizar tus ahorros y crear un plan financiero sólido.',
      content: 'Aprende a diversificar tus inversiones, establecer metas realistas y crear un plan de ahorro que se adapte a tu estilo de vida.',
      difficulty: 'Medio',
      duration: '25 min',
      rating: 4.7,
      views: 890,
      featured: false,
      tags: ['Estrategia', 'Diversificación', 'Metas']
    },
    {
      id: 3,
      title: '🔒 Seguridad en Criptomonedas',
      category: 'advanced',
      description: 'Protege tus activos digitales con las mejores prácticas de seguridad y herramientas disponibles.',
      content: 'Conoce las amenazas más comunes, cómo proteger tu wallet, y las mejores prácticas para mantener tus criptomonedas seguras.',
      difficulty: 'Avanzado',
      duration: '30 min',
      rating: 4.8,
      views: 650,
      featured: true,
      tags: ['Seguridad', 'Protección', 'Wallet']
    },
    {
      id: 4,
      title: '📊 Análisis de Mercado',
      category: 'advanced',
      description: 'Aprende a leer gráficos, entender indicadores técnicos y tomar decisiones informadas.',
      content: 'Desarrolla habilidades para analizar el mercado, identificar tendencias y tomar decisiones de inversión más informadas.',
      difficulty: 'Avanzado',
      duration: '45 min',
      rating: 4.6,
      views: 420,
      featured: false,
      tags: ['Análisis', 'Técnico', 'Mercado']
    },
    {
      id: 5,
      title: '🎯 Consejos Diarios',
      category: 'tips',
      description: 'Pequeños consejos y trucos para mejorar tu experiencia de ahorro día a día.',
      content: 'Recopilación de consejos prácticos que puedes aplicar inmediatamente para mejorar tus hábitos de ahorro.',
      difficulty: 'Fácil',
      duration: '5 min',
      rating: 4.5,
      views: 2100,
      featured: false,
      tags: ['Consejos', 'Diario', 'Práctico']
    },
    {
      id: 6,
      title: '🎮 Tutorial: Primeros Pasos',
      category: 'tutorials',
      description: 'Tutorial paso a paso para configurar tu cuenta y hacer tu primer depósito.',
      content: 'Sigue este tutorial interactivo para configurar tu cuenta, conectar tu wallet y realizar tu primera transacción.',
      difficulty: 'Fácil',
      duration: '20 min',
      rating: 4.9,
      views: 1800,
      featured: true,
      tags: ['Tutorial', 'Configuración', 'Primeros Pasos']
    },
    {
      id: 7,
      title: '📱 Uso de la App Móvil',
      category: 'tutorials',
      description: 'Aprende a usar todas las funciones de la aplicación móvil de PachaCoin.',
      content: 'Descubre todas las características de la app móvil, desde notificaciones hasta funciones avanzadas.',
      difficulty: 'Medio',
      duration: '15 min',
      rating: 4.4,
      views: 750,
      featured: false,
      tags: ['Móvil', 'App', 'Funciones']
    },
    {
      id: 8,
      title: '🎯 Establecer Metas Financieras',
      category: 'intermediate',
      description: 'Aprende a establecer y alcanzar metas financieras realistas y medibles.',
      content: 'Guía completa para establecer metas SMART, crear un plan de acción y mantener la motivación.',
      difficulty: 'Medio',
      duration: '35 min',
      rating: 4.7,
      views: 580,
      featured: false,
      tags: ['Metas', 'Planificación', 'Motivación']
    }
  ];

  const filteredRecommendations = activeCategory === 'all' 
    ? recommendations 
    : recommendations.filter(rec => rec.category === activeCategory);

  const toggleFavorite = (id) => {
    setFavorites(prev => 
      prev.includes(id) 
        ? prev.filter(favId => favId !== id)
        : [...prev, id]
    );
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Fácil': return '#28a745';
      case 'Medio': return '#ffc107';
      case 'Avanzado': return '#dc3545';
      default: return '#6c757d';
    }
  };

  return (
    <div className="page-content">
      <div className="page-header">
        <div className="logo-container">
          <img src={alpacaLogo} alt="PachaCoin Logo" className="alpaca-logo" />
          <h1 className="page-title">📚 Recomendaciones</h1>
        </div>
        <div className="recommendations-stats">
          <div className="stat-item">
            <span className="stat-icon">📖</span>
            <span className="stat-value">{recommendations.length}</span>
            <span className="stat-label">Artículos</span>
          </div>
          <div className="stat-item">
            <span className="stat-icon">⭐</span>
            <span className="stat-value">{favorites.length}</span>
            <span className="stat-label">Favoritos</span>
          </div>
        </div>
      </div>

      <div className="recommendations-container">
        {/* Categories Filter */}
        <div className="categories-filter">
          <h3>📂 Categorías</h3>
          <div className="categories-grid">
            {categories.map(category => (
              <button
                key={category.id}
                className={`category-filter-btn ${activeCategory === category.id ? 'active' : ''}`}
                onClick={() => setActiveCategory(category.id)}
              >
                <span className="category-icon">{category.icon}</span>
                <span className="category-name">{category.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Recommendations Grid */}
        <div className="recommendations-grid">
          {filteredRecommendations.map(recommendation => (
            <div key={recommendation.id} className={`recommendation-card ${recommendation.featured ? 'featured' : ''}`}>
              {recommendation.featured && (
                <div className="featured-badge">🔥 Destacado</div>
              )}
              
              <div className="recommendation-header">
                <div className="recommendation-info">
                  <h4 className="recommendation-title">{recommendation.title}</h4>
                  <p className="recommendation-description">{recommendation.description}</p>
                  
                  <div className="recommendation-meta">
                    <div className="meta-item">
                      <span className="meta-icon">⏱️</span>
                      <span className="meta-text">{recommendation.duration}</span>
                    </div>
                    <div className="meta-item">
                      <span className="meta-icon">👁️</span>
                      <span className="meta-text">{recommendation.views} vistas</span>
                    </div>
                    <div className="meta-item">
                      <span className="meta-icon">⭐</span>
                      <span className="meta-text">{recommendation.rating}</span>
                    </div>
                  </div>
                </div>
                
                <div className="recommendation-actions">
                  <button 
                    className={`favorite-btn ${favorites.includes(recommendation.id) ? 'active' : ''}`}
                    onClick={() => toggleFavorite(recommendation.id)}
                  >
                    {favorites.includes(recommendation.id) ? '❤️' : '🤍'}
                  </button>
                </div>
              </div>
              
              <div className="recommendation-content">
                <p className="content-preview">{recommendation.content}</p>
              </div>
              
              <div className="recommendation-footer">
                <div className="difficulty-badge" style={{ backgroundColor: getDifficultyColor(recommendation.difficulty) }}>
                  {recommendation.difficulty}
                </div>
                
                <div className="tags-container">
                  {recommendation.tags.map((tag, index) => (
                    <span key={index} className="tag">{tag}</span>
                  ))}
                </div>
                
                <button className="read-more-btn">
                  📖 Leer Más
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Tips Section */}
        <div className="quick-tips-section">
          <h3>💡 Consejos Rápidos</h3>
          <div className="tips-grid">
            <div className="tip-card">
              <div className="tip-icon">💰</div>
              <h5>Establece Metas Pequeñas</h5>
              <p>Comienza con objetivos alcanzables y ve aumentando gradualmente.</p>
            </div>
            
            <div className="tip-card">
              <div className="tip-icon">📅</div>
              <h5>Mantén Consistencia</h5>
              <p>Haz depósitos regulares, incluso si son pequeñas cantidades.</p>
            </div>
            
            <div className="tip-card">
              <div className="tip-icon">🎯</div>
              <h5>Diversifica</h5>
              <p>No pongas todos tus huevos en una sola canasta.</p>
            </div>
            
            <div className="tip-card">
              <div className="tip-icon">🔒</div>
              <h5>Prioriza la Seguridad</h5>
              <p>Usa contraseñas fuertes y activa la autenticación de dos factores.</p>
            </div>
          </div>
        </div>

        {/* Progress Tracking */}
        <div className="progress-section">
          <h3>📊 Tu Progreso de Aprendizaje</h3>
          <div className="progress-cards">
            <div className="progress-card">
              <div className="progress-icon">📚</div>
              <div className="progress-info">
                <h5>Artículos Leídos</h5>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: '65%' }}></div>
                </div>
                <span className="progress-text">13 de 20</span>
              </div>
            </div>
            
            <div className="progress-card">
              <div className="progress-icon">🎯</div>
              <div className="progress-info">
                <h5>Metas Completadas</h5>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: '80%' }}></div>
                </div>
                <span className="progress-text">8 de 10</span>
              </div>
            </div>
            
            <div className="progress-card">
              <div className="progress-icon">🏆</div>
              <div className="progress-info">
                <h5>Nivel de Experiencia</h5>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: '45%' }}></div>
                </div>
                <span className="progress-text">Intermedio</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recommendations; 