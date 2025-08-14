'use client';

import React, { useState } from 'react';
import Header from './components/Header';
import HomePage from './components/HomePage';
import BusinessDashboard from './components/BusinessDashboard';
import UploadInvoice from './components/UploadInvoice';
import InvestorDashboard from './components/InvestorDashboard';
import Marketplace from './components/Marketplace';

type View = 'home' | 'how-it-works' | 'business-dashboard' | 'upload-invoice' | 'investor-dashboard' | 'marketplace';
type UserType = 'business' | 'investor' | null;

export default function Home() {
  const [currentView, setCurrentView] = useState<View>('home');
  const [userType, setUserType] = useState<UserType>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavigate = (view: View) => {
    setCurrentView(view);
    setMobileMenuOpen(false);
  };

  const handleUserTypeChange = (type: UserType) => {
    setUserType(type);
  };

  const renderContent = () => {
    switch (currentView) {
      case 'home':
        return <HomePage onNavigate={handleNavigate} onUserTypeChange={handleUserTypeChange} />;
      case 'how-it-works':
        return <HomePage onNavigate={handleNavigate} onUserTypeChange={handleUserTypeChange} />;
      case 'business-dashboard':
        return <BusinessDashboard onNavigate={handleNavigate} />;
      case 'upload-invoice':
        return <UploadInvoice onNavigate={handleNavigate} />;
      case 'investor-dashboard':
        return <InvestorDashboard onNavigate={handleNavigate} />;
      case 'marketplace':
        return <Marketplace onNavigate={handleNavigate} />;
      default:
        return <HomePage onNavigate={handleNavigate} onUserTypeChange={handleUserTypeChange} />;
    }
  };

  return (
    <div className='min-h-screen bg-gray-50'>
      <Header
        currentView={currentView}
        onNavigate={handleNavigate}
        userType={userType}
        onUserTypeChange={handleUserTypeChange}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />
      {renderContent()}
    </div>
  );
}
