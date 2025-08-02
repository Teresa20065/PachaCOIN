import React, { useState } from 'react';
import './Dashboard.css';
import Sidebar from './Sidebar';
import Home from './pages/Home';
import FinancialSummary from './pages/FinancialSummary';
import Store from './pages/Store';
import Games from './pages/Games';
import Settings from './pages/Settings';
import Recommendations from './pages/Recommendations';
import PublicAddress from './pages/PublicAddress';

const Dashboard = ({ onDisconnect }) => {
  const [currentPage, setCurrentPage] = useState('home');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home onDisconnect={onDisconnect} />;
      case 'financial':
        return <FinancialSummary />;
      case 'store':
        return <Store />;
      case 'games':
        return <Games />;
      case 'settings':
        return <Settings />;
      case 'recommendations':
        return <Recommendations />;
      case 'public-address':
        return <PublicAddress />;
      default:
        return <Home onDisconnect={onDisconnect} />;
    }
  };

  return (
    <div className="dashboard-container">
      <Sidebar 
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
        onDisconnect={onDisconnect}
      />
      <div className="main-content">
        {renderPage()}
      </div>
    </div>
  );
};

export default Dashboard; 