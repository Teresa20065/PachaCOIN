import React, { useState } from 'react';
import './App.css';
import CriptoPou from './components/CriptoPou';
import Dashboard from './components/Dashboard';
//este es el nuevo repositorio
function App() {
  const [currentView, setCurrentView] = useState('criptoPou');

  const handleWalletConnect = () => {
    setCurrentView('dashboard');
  };

  const handleDisconnect = () => {
    setCurrentView('criptoPou');
  };

  return (
    <div className="App">
      {currentView === 'criptoPou' ? (
        <CriptoPou onWalletConnect={handleWalletConnect} />
      ) : (
        <Dashboard onDisconnect={handleDisconnect} />
      )}
    </div>
  );
}

export default App;
