import React from 'react';
import { Menu, X } from 'lucide-react';
import logo from '@/public/snapture-black.svg';
import Link from 'next/link';
import Image from 'next/image';

type View = 'home' | 'how-it-works' | 'business-dashboard' | 'upload-invoice' | 'investor-dashboard' | 'marketplace';

interface HeaderProps {
  currentView: string;
  onNavigate: (view: View) => void;
  userType: 'business' | 'investor' | null;
  onUserTypeChange: (type: 'business' | 'investor' | null) => void;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}

export default function Header({ currentView, onNavigate, userType, onUserTypeChange, mobileMenuOpen, setMobileMenuOpen }: HeaderProps) {
  const handleSignOut = () => {
    onUserTypeChange(null);
    onNavigate('home');
    setMobileMenuOpen(false);
  };

  return (
    <header className='bg-white shadow-lg border-b border-gray-200'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between items-center py-4'>
          <Link href='/'>
            <Image src={logo} width='120' alt='' className='object-cover h-12' />
          </Link>

          {/* Desktop Navigation */}
          <nav className='hidden md:flex space-x-8'>
            {!userType ? (
              <>
                <button
                  onClick={() => onNavigate('home')}
                  className={`text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors ${
                    currentView === 'home' ? 'text-blue-600 border-b-2 border-blue-600' : ''
                  }`}
                >
                  SnapTx
                </button>
                <button
                  onClick={() => onNavigate('how-it-works')}
                  className={`text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors ${
                    currentView === 'how-it-works' ? 'text-blue-600 border-b-2 border-blue-600' : ''
                  }`}
                >
                  How It Works
                </button>
              </>
            ) : userType === 'business' ? (
              <>
                <button
                  onClick={() => onNavigate('business-dashboard')}
                  className={`text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors ${
                    currentView === 'business-dashboard' ? 'text-blue-600 border-b-2 border-blue-600' : ''
                  }`}
                >
                  Dashboard
                </button>
                <button
                  onClick={() => onNavigate('upload-invoice')}
                  className={`text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors ${
                    currentView === 'upload-invoice' ? 'text-blue-600 border-b-2 border-blue-600' : ''
                  }`}
                >
                  Upload Invoice
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => onNavigate('investor-dashboard')}
                  className={`text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors ${
                    currentView === 'investor-dashboard' ? 'text-blue-600 border-b-2 border-blue-600' : ''
                  }`}
                >
                  Dashboard
                </button>
                <button
                  onClick={() => onNavigate('marketplace')}
                  className={`text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors ${
                    currentView === 'marketplace' ? 'text-blue-600 border-b-2 border-blue-600' : ''
                  }`}
                >
                  Marketplace
                </button>
              </>
            )}
          </nav>
          {/* Desktop Auth Buttons */}
          <div className='hidden md:flex items-center space-x-4'>
            {!userType ? (
              <>
                <button
                  onClick={() => {
                    onUserTypeChange('business');
                    onNavigate('business-dashboard');
                  }}
                  className='text-blue-600 hover:text-blue-700 font-medium transition-colors'
                >
                  Business Login
                </button>
                <button
                  onClick={() => {
                    onUserTypeChange('investor');
                    onNavigate('investor-dashboard');
                  }}
                  className='bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 font-medium transition-colors'
                >
                  Investor Login
                </button>
              </>
            ) : (
              <>
                <span className='text-sm text-gray-600 capitalize'>{userType} Account</span>
                <button onClick={handleSignOut} className='text-red-600 hover:text-red-700 font-medium transition-colors'>
                  Sign Out
                </button>
              </>
            )}
          </div>
          {/* Mobile menu button */}
          <div className='md:hidden'>
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className='text-gray-700 hover:text-blue-600 p-2'>
              {mobileMenuOpen ? <X className='h-6 w-6' /> : <Menu className='h-6 w-6' />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className='md:hidden py-4 border-t border-gray-200'>
            <div className='flex flex-col space-y-4'>
              {!userType ? (
                <>
                  <button
                    onClick={() => {
                      onNavigate('home');
                      setMobileMenuOpen(false);
                    }}
                    className='text-gray-700 hover:text-blue-600 px-3 py-2 text-left font-medium transition-colors'
                  >
                    Home
                  </button>
                  <button
                    onClick={() => {
                      onNavigate('how-it-works');
                      setMobileMenuOpen(false);
                    }}
                    className='text-gray-700 hover:text-blue-600 px-3 py-2 text-left font-medium transition-colors'
                  >
                    How It Works
                  </button>
                  <button
                    onClick={() => {
                      onUserTypeChange('business');
                      onNavigate('business-dashboard');
                      setMobileMenuOpen(false);
                    }}
                    className='text-blue-600 hover:text-blue-700 px-3 py-2 text-left font-medium transition-colors'
                  >
                    Business Login
                  </button>
                  <button
                    onClick={() => {
                      onUserTypeChange('investor');
                      onNavigate('investor-dashboard');
                      setMobileMenuOpen(false);
                    }}
                    className='bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 font-medium transition-colors w-full text-center'
                  >
                    Investor Login
                  </button>
                </>
              ) : userType === 'business' ? (
                <>
                  <button
                    onClick={() => {
                      onNavigate('business-dashboard');
                      setMobileMenuOpen(false);
                    }}
                    className='text-gray-700 hover:text-blue-600 px-3 py-2 text-left font-medium transition-colors'
                  >
                    Dashboard
                  </button>
                  <button
                    onClick={() => {
                      onNavigate('upload-invoice');
                      setMobileMenuOpen(false);
                    }}
                    className='text-gray-700 hover:text-blue-600 px-3 py-2 text-left font-medium transition-colors'
                  >
                    Upload Invoice
                  </button>
                  <button onClick={handleSignOut} className='text-red-600 hover:text-red-700 px-3 py-2 text-left font-medium transition-colors'>
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => {
                      onNavigate('investor-dashboard');
                      setMobileMenuOpen(false);
                    }}
                    className='text-gray-700 hover:text-blue-600 px-3 py-2 text-left font-medium transition-colors'
                  >
                    Dashboard
                  </button>
                  <button
                    onClick={() => {
                      onNavigate('marketplace');
                      setMobileMenuOpen(false);
                    }}
                    className='text-gray-700 hover:text-blue-600 px-3 py-2 text-left font-medium transition-colors'
                  >
                    Marketplace
                  </button>
                  <button onClick={handleSignOut} className='text-red-600 hover:text-red-700 px-3 py-2 text-left font-medium transition-colors'>
                    Sign Out
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
