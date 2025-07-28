import React, { useState, useEffect } from 'react';
import { ViewType } from './types';
import { storage } from './utils/storage';
import { LandingPage } from './components/LandingPage';
import { ConfirmationPage } from './components/ConfirmationPage';
import { CheckinPage } from './components/CheckinPage';
import { CheckinSuccess } from './components/CheckinSuccess';
import { CheckinError } from './components/CheckinError';
import { AdminLogin } from './components/AdminLogin';
import { AdminDashboard } from './components/AdminDashboard';

function App() {
  const [currentView, setCurrentView] = useState<ViewType>('landing');
  const [viewData, setViewData] = useState<any>(null);

  useEffect(() => {
    // Check for admin session
    if (storage.getAdminSession()) {
      setCurrentView('admin-dashboard');
      return;
    }

    // Check for URL parameters (QR code check-in)
    const urlParams = new URLSearchParams(window.location.search);
    const checkinId = urlParams.get('checkin');
    const adminParam = urlParams.get('admin');
    
    if (checkinId) {
      setCurrentView('checkin');
      setViewData({ initialEntryId: checkinId });
    } else if (adminParam === 'login') {
      setCurrentView('admin-login');
    }
  }, []);

  const handleViewChange = (view: ViewType, data?: any) => {
    setCurrentView(view);
    setViewData(data);
    
    // Update URL for certain views
    if (view === 'admin-login') {
      window.history.pushState({}, '', '?admin=login');
    } else if (view === 'landing') {
      window.history.pushState({}, '', '/');
    }
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'landing':
        return <LandingPage onViewChange={handleViewChange} />;
      
      case 'confirmation':
        return <ConfirmationPage guest={viewData} onViewChange={handleViewChange} />;
      
      case 'checkin':
        return (
          <CheckinPage 
            onViewChange={handleViewChange} 
            initialEntryId={viewData?.initialEntryId}
          />
        );
      
      case 'checkin-success':
        return <CheckinSuccess guest={viewData} onViewChange={handleViewChange} />;
      
      case 'checkin-error':
        return <CheckinError entryId={viewData.entryId} onViewChange={handleViewChange} />;
      
      case 'admin-login':
        return <AdminLogin onViewChange={handleViewChange} />;
      
      case 'admin-dashboard':
        return <AdminDashboard onViewChange={handleViewChange} />;
      
      default:
        return <LandingPage onViewChange={handleViewChange} />;
    }
  };

  return (
    <div className="App">
      {renderCurrentView()}
      
      {/* Admin Access Link */}
      {currentView === 'landing' && (
        <div className="fixed bottom-4 right-4">
          <button
            onClick={() => handleViewChange('admin-login')}
            className="bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded-lg text-sm transition-colors"
          >
            Admin Access
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
