import React, { useState, useEffect } from 'react';
import './Pages.css';
import alpacaLogo from '../../img/alpaca.jpg';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    sms: false,
    marketing: true
  });
  const [privacy, setPrivacy] = useState({
    profile: 'public',
    activity: 'friends',
    location: false
  });
  const [theme, setTheme] = useState('dark');
  const [language, setLanguage] = useState('es');
  const [autoSave, setAutoSave] = useState(true);
  const [soundEffects, setSoundEffects] = useState(true);
  const [animations, setAnimations] = useState(true);
  const [showResetModal, setShowResetModal] = useState(false);
  const [showSaveSuccess, setShowSaveSuccess] = useState(false);
  const [usageStats, setUsageStats] = useState({
    lastLogin: new Date().toLocaleDateString('es-ES'),
    totalSessions: 42,
    favoriteGames: 3,
    totalCoins: 1250,
    achievements: 8
  });

  // Cargar configuración guardada al iniciar
  useEffect(() => {
    const savedSettings = localStorage.getItem('pachaCoinSettings');
    if (savedSettings) {
      try {
        const settings = JSON.parse(savedSettings);
        setNotifications(settings.notifications || notifications);
        setPrivacy(settings.privacy || privacy);
        setTheme(settings.theme || theme);
        setLanguage(settings.language || language);
        setAutoSave(settings.autoSave !== undefined ? settings.autoSave : autoSave);
        setSoundEffects(settings.soundEffects !== undefined ? settings.soundEffects : soundEffects);
        setAnimations(settings.animations !== undefined ? settings.animations : animations);
      } catch (error) {
        console.error('Error loading settings:', error);
      }
    }
  }, []);

  // Guardar configuración automáticamente cuando cambie
  useEffect(() => {
    const settings = {
      notifications,
      privacy,
      theme,
      language,
      autoSave,
      soundEffects,
      animations
    };
    localStorage.setItem('pachaCoinSettings', JSON.stringify(settings));
  }, [notifications, privacy, theme, language, autoSave, soundEffects, animations]);

  const tabs = [
    { id: 'general', name: '⚙️ General', icon: '⚙️' },
    { id: 'notifications', name: '🔔 Notificaciones', icon: '🔔' },
    { id: 'privacy', name: '🔒 Privacidad', icon: '🔒' },
    { id: 'appearance', name: '🎨 Apariencia', icon: '🎨' },
    { id: 'security', name: '🛡️ Seguridad', icon: '🛡️' },
    { id: 'advanced', name: '🔧 Avanzado', icon: '🔧' }
  ];

  const languages = [
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' }
  ];

  const themes = [
    { id: 'dark', name: 'Oscuro', icon: '🌙' },
    { id: 'light', name: 'Claro', icon: '☀️' },
    { id: 'auto', name: 'Automático', icon: '🔄' }
  ];

  const handleNotificationChange = (type) => {
    setNotifications(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  const handlePrivacyChange = (setting, value) => {
    setPrivacy(prev => ({
      ...prev,
      [setting]: value
    }));
  };

  const handleSaveSettings = () => {
    // Simular guardado de configuración
    setShowSaveSuccess(true);
    setTimeout(() => setShowSaveSuccess(false), 3000);
  };

  const handleResetSettings = () => {
    setShowResetModal(true);
  };

  const confirmResetSettings = () => {
    setNotifications({
      email: true,
      push: false,
      sms: false,
      marketing: true
    });
    setPrivacy({
      profile: 'public',
      activity: 'friends',
      location: false
    });
    setTheme('dark');
    setLanguage('es');
    setAutoSave(true);
    setSoundEffects(true);
    setAnimations(true);
    setShowResetModal(false);
    
    // Mostrar confirmación
    setShowSaveSuccess(true);
    setTimeout(() => setShowSaveSuccess(false), 3000);
  };

  const cancelResetSettings = () => {
    setShowResetModal(false);
  };

  const handleExportSettings = () => {
    const settings = {
      notifications,
      privacy,
      theme,
      language,
      autoSave,
      soundEffects,
      animations,
      exportDate: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(settings, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `pachacoin-settings-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    setShowSaveSuccess(true);
    setTimeout(() => setShowSaveSuccess(false), 3000);
  };

  const handleDeleteAccount = () => {
    if (window.confirm('⚠️ ¿Estás completamente seguro de que quieres eliminar tu cuenta? Esta acción es irreversible y perderás todos tus datos.')) {
      // Simular eliminación de cuenta
      alert('🔄 Tu cuenta será eliminada en 30 días. Puedes cancelar esta acción desde el soporte.');
    }
  };

  const handleImportSettings = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          try {
            const importedSettings = JSON.parse(event.target.result);
            
            // Validar que el archivo contiene la estructura correcta
            if (importedSettings.notifications && importedSettings.privacy) {
              setNotifications(importedSettings.notifications);
              setPrivacy(importedSettings.privacy);
              setTheme(importedSettings.theme || theme);
              setLanguage(importedSettings.language || language);
              setAutoSave(importedSettings.autoSave !== undefined ? importedSettings.autoSave : autoSave);
              setSoundEffects(importedSettings.soundEffects !== undefined ? importedSettings.soundEffects : soundEffects);
              setAnimations(importedSettings.animations !== undefined ? importedSettings.animations : animations);
              
              setShowSaveSuccess(true);
              setTimeout(() => setShowSaveSuccess(false), 3000);
            } else {
              alert('❌ El archivo no contiene una configuración válida de PachaCoin.');
            }
          } catch (error) {
            alert('❌ Error al leer el archivo. Asegúrate de que sea un archivo JSON válido.');
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  const handleTwoFactorAuth = () => {
    alert('🔐 Configuración de autenticación de dos factores próximamente disponible.');
  };

  const handleBiometricAuth = () => {
    alert('👆 Configuración de biometría próximamente disponible.');
  };

  const handleChangePassword = () => {
    alert('🔑 Función de cambio de contraseña próximamente disponible.');
  };

  const renderGeneralSettings = () => (
    <div className="settings-content">
      <div className="setting-group">
        <h4>🌐 Idioma</h4>
        <div className="language-options">
          {languages.map(lang => (
            <button
              key={lang.code}
              className={`language-btn ${language === lang.code ? 'active' : ''}`}
              onClick={() => setLanguage(lang.code)}
            >
              <span className="language-flag">{lang.flag}</span>
              <span className="language-name">{lang.name}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="setting-group">
        <h4>💾 Auto-guardado</h4>
        <div className="setting-item">
          <div className="setting-info">
            <span className="setting-label">Guardar automáticamente</span>
            <span className="setting-description">Guarda tus cambios automáticamente</span>
          </div>
          <label className="toggle-switch">
            <input
              type="checkbox"
              checked={autoSave}
              onChange={() => setAutoSave(!autoSave)}
            />
            <span className="toggle-slider"></span>
          </label>
        </div>
      </div>

      <div className="setting-group">
        <h4>🔊 Sonidos</h4>
        <div className="setting-item">
          <div className="setting-info">
            <span className="setting-label">Efectos de sonido</span>
            <span className="setting-description">Reproducir sonidos en la aplicación</span>
          </div>
          <label className="toggle-switch">
            <input
              type="checkbox"
              checked={soundEffects}
              onChange={() => setSoundEffects(!soundEffects)}
            />
            <span className="toggle-slider"></span>
          </label>
        </div>
      </div>

      <div className="setting-group">
        <h4>✨ Animaciones</h4>
        <div className="setting-item">
          <div className="setting-info">
            <span className="setting-label">Efectos visuales</span>
            <span className="setting-description">Mostrar animaciones y transiciones</span>
          </div>
          <label className="toggle-switch">
            <input
              type="checkbox"
              checked={animations}
              onChange={() => setAnimations(!animations)}
            />
            <span className="toggle-slider"></span>
          </label>
        </div>
      </div>
    </div>
  );

  const renderNotificationSettings = () => (
    <div className="settings-content">
      <div className="setting-group">
        <h4>📧 Notificaciones por Email</h4>
        <div className="setting-item">
          <div className="setting-info">
            <span className="setting-label">Notificaciones importantes</span>
            <span className="setting-description">Recibir emails sobre transacciones y seguridad</span>
          </div>
          <label className="toggle-switch">
            <input
              type="checkbox"
              checked={notifications.email}
              onChange={() => handleNotificationChange('email')}
            />
            <span className="toggle-slider"></span>
          </label>
        </div>
      </div>

      <div className="setting-group">
        <h4>📱 Notificaciones Push</h4>
        <div className="setting-item">
          <div className="setting-info">
            <span className="setting-label">Notificaciones en tiempo real</span>
            <span className="setting-description">Recibir notificaciones push en tu dispositivo</span>
          </div>
          <label className="toggle-switch">
            <input
              type="checkbox"
              checked={notifications.push}
              onChange={() => handleNotificationChange('push')}
            />
            <span className="toggle-slider"></span>
          </label>
        </div>
      </div>

      <div className="setting-group">
        <h4>📞 Notificaciones SMS</h4>
        <div className="setting-item">
          <div className="setting-info">
            <span className="setting-label">Alertas por SMS</span>
            <span className="setting-description">Recibir alertas importantes por mensaje de texto</span>
          </div>
          <label className="toggle-switch">
            <input
              type="checkbox"
              checked={notifications.sms}
              onChange={() => handleNotificationChange('sms')}
            />
            <span className="toggle-slider"></span>
          </label>
        </div>
      </div>

      <div className="setting-group">
        <h4>📢 Marketing</h4>
        <div className="setting-item">
          <div className="setting-info">
            <span className="setting-label">Ofertas y promociones</span>
            <span className="setting-description">Recibir información sobre nuevos productos y ofertas</span>
          </div>
          <label className="toggle-switch">
            <input
              type="checkbox"
              checked={notifications.marketing}
              onChange={() => handleNotificationChange('marketing')}
            />
            <span className="toggle-slider"></span>
          </label>
        </div>
      </div>
    </div>
  );

  const renderPrivacySettings = () => (
    <div className="settings-content">
      <div className="setting-group">
        <h4>👤 Perfil Público</h4>
        <div className="setting-item">
          <div className="setting-info">
            <span className="setting-label">Visibilidad del perfil</span>
            <span className="setting-description">Quién puede ver tu perfil</span>
          </div>
          <select 
            className="privacy-select"
            value={privacy.profile}
            onChange={(e) => handlePrivacyChange('profile', e.target.value)}
          >
            <option value="public">Público</option>
            <option value="friends">Solo amigos</option>
            <option value="private">Privado</option>
          </select>
        </div>
      </div>

      <div className="setting-group">
        <h4>📊 Actividad</h4>
        <div className="setting-item">
          <div className="setting-info">
            <span className="setting-label">Mostrar actividad</span>
            <span className="setting-description">Quién puede ver tu actividad reciente</span>
          </div>
          <select 
            className="privacy-select"
            value={privacy.activity}
            onChange={(e) => handlePrivacyChange('activity', e.target.value)}
          >
            <option value="public">Público</option>
            <option value="friends">Solo amigos</option>
            <option value="private">Privado</option>
          </select>
        </div>
      </div>

      <div className="setting-group">
        <h4>📍 Ubicación</h4>
        <div className="setting-item">
          <div className="setting-info">
            <span className="setting-label">Compartir ubicación</span>
            <span className="setting-description">Permitir que la app acceda a tu ubicación</span>
          </div>
          <label className="toggle-switch">
            <input
              type="checkbox"
              checked={privacy.location}
              onChange={() => handlePrivacyChange('location', !privacy.location)}
            />
            <span className="toggle-slider"></span>
          </label>
        </div>
      </div>
    </div>
  );

  const renderAppearanceSettings = () => (
    <div className="settings-content">
      <div className="setting-group">
        <h4>🎨 Tema</h4>
        <div className="theme-options">
          {themes.map(themeOption => (
            <button
              key={themeOption.id}
              className={`theme-btn ${theme === themeOption.id ? 'active' : ''}`}
              onClick={() => setTheme(themeOption.id)}
            >
              <span className="theme-icon">{themeOption.icon}</span>
              <span className="theme-name">{themeOption.name}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="setting-group">
        <h4>🎯 Personalización</h4>
        <div className="customization-options">
          <div className="color-picker">
            <span className="color-label">Color principal:</span>
            <div className="color-options">
              <div className="color-option active" style={{ backgroundColor: '#FFD700' }}></div>
              <div className="color-option" style={{ backgroundColor: '#FF6347' }}></div>
              <div className="color-option" style={{ backgroundColor: '#20B2AA' }}></div>
              <div className="color-option" style={{ backgroundColor: '#9370DB' }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSecuritySettings = () => (
    <div className="settings-content">
      <div className="setting-group">
        <h4>🔐 Autenticación</h4>
        <div className="security-options">
          <div className="security-item">
            <div className="security-info">
              <span className="security-label">Autenticación de dos factores</span>
              <span className="security-description">Añade una capa extra de seguridad</span>
            </div>
            <button className="security-btn" onClick={handleTwoFactorAuth}>Configurar</button>
          </div>
          
          <div className="security-item">
            <div className="security-info">
              <span className="security-label">Biometría</span>
              <span className="security-description">Usar huella dactilar o Face ID</span>
            </div>
            <button className="security-btn" onClick={handleBiometricAuth}>Activar</button>
          </div>
        </div>
      </div>

      <div className="setting-group">
        <h4>🔑 Contraseña</h4>
        <div className="setting-item">
          <div className="setting-info">
            <span className="setting-label">Cambiar contraseña</span>
            <span className="setting-description">Actualiza tu contraseña regularmente</span>
          </div>
          <button className="action-btn" onClick={handleChangePassword}>Cambiar</button>
        </div>
      </div>
    </div>
  );

  const renderAdvancedSettings = () => (
    <div className="settings-content">
      <div className="setting-group">
        <h4>📊 Estadísticas de Uso</h4>
        <div className="stats-grid">
          <div className="stat-item">
            <span className="stat-icon">📅</span>
            <div className="stat-info">
              <span className="stat-label">Último acceso</span>
              <span className="stat-value">{usageStats.lastLogin}</span>
            </div>
          </div>
          <div className="stat-item">
            <span className="stat-icon">🎮</span>
            <div className="stat-info">
              <span className="stat-label">Sesiones totales</span>
              <span className="stat-value">{usageStats.totalSessions}</span>
            </div>
          </div>
          <div className="stat-item">
            <span className="stat-icon">⭐</span>
            <div className="stat-info">
              <span className="stat-label">Juegos favoritos</span>
              <span className="stat-value">{usageStats.favoriteGames}</span>
            </div>
          </div>
          <div className="stat-item">
            <span className="stat-icon">🪙</span>
            <div className="stat-info">
              <span className="stat-label">Monedas totales</span>
              <span className="stat-value">{usageStats.totalCoins}</span>
            </div>
          </div>
          <div className="stat-item">
            <span className="stat-icon">🏆</span>
            <div className="stat-info">
              <span className="stat-label">Logros</span>
              <span className="stat-value">{usageStats.achievements}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="setting-group">
        <h4>🗑️ Datos</h4>
        <div className="advanced-options">
          <div className="advanced-item">
            <div className="advanced-info">
              <span className="advanced-label">Exportar datos</span>
              <span className="advanced-description">Descarga una copia de tus datos</span>
            </div>
            <button className="advanced-btn" onClick={handleExportSettings}>Exportar</button>
          </div>
          
          <div className="advanced-item">
            <div className="advanced-info">
              <span className="advanced-label">Importar datos</span>
              <span className="advanced-description">Importa una configuración existente</span>
            </div>
            <button className="advanced-btn" onClick={handleImportSettings}>Importar</button>
          </div>

          <div className="advanced-item">
            <div className="advanced-info">
              <span className="advanced-label">Eliminar cuenta</span>
              <span className="advanced-description">Elimina permanentemente tu cuenta</span>
            </div>
            <button className="advanced-btn danger" onClick={handleDeleteAccount}>Eliminar</button>
          </div>
        </div>
      </div>

      <div className="setting-group">
        <h4>🔄 Restablecer</h4>
        <div className="setting-item">
          <div className="setting-info">
            <span className="setting-label">Restablecer configuración</span>
            <span className="setting-description">Volver a la configuración por defecto</span>
          </div>
          <button className="action-btn" onClick={handleResetSettings}>Restablecer</button>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'general':
        return renderGeneralSettings();
      case 'notifications':
        return renderNotificationSettings();
      case 'privacy':
        return renderPrivacySettings();
      case 'appearance':
        return renderAppearanceSettings();
      case 'security':
        return renderSecuritySettings();
      case 'advanced':
        return renderAdvancedSettings();
      default:
        return renderGeneralSettings();
    }
  };

  return (
    <div className="page-content">
      <div className="page-header">
        <div className="logo-container">
          <img src={alpacaLogo} alt="PachaCoin Logo" className="alpaca-logo" />
          <h1 className="page-title">⚙️ Configuración</h1>
        </div>
        <div className="settings-actions">
          <button className="save-btn" onClick={handleSaveSettings}>
            💾 Guardar
          </button>
        </div>
      </div>

      <div className="settings-container">
        {/* Settings Tabs */}
        <div className="settings-tabs">
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`settings-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <span className="tab-icon">{tab.icon}</span>
              <span className="tab-name">{tab.name}</span>
            </button>
          ))}
        </div>

        {/* Settings Content */}
        <div className="settings-main">
          {renderContent()}
        </div>
      </div>

      {showSaveSuccess && (
        <div className="toast-success">
          ✅ Configuración guardada exitosamente
        </div>
      )}

      {showResetModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>¿Estás seguro de que quieres restablecer todas las configuraciones?</h3>
            <p>Esta acción no se puede deshacer.</p>
            <div className="modal-actions">
              <button className="action-btn" onClick={confirmResetSettings}>Sí, restablecer</button>
              <button className="action-btn" onClick={cancelResetSettings}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings; 