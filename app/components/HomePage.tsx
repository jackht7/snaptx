import React from 'react';
import Link from 'next/link';
import { TrendingUp, Shield, Clock, Users, ArrowRight } from 'lucide-react';

type View = 'home' | 'how-it-works' | 'business-dashboard' | 'upload-invoice' | 'investor-dashboard' | 'marketplace';

interface HomePageProps {
  onNavigate: (view: View) => void;
  onUserTypeChange: (type: 'business' | 'investor') => void;
}

export default function HomePage({ onNavigate, onUserTypeChange }: HomePageProps) {
  const handleBusinessStart = () => {
    onUserTypeChange('business');
    onNavigate('business-dashboard');
  };

  const handleInvestorStart = () => {
    onUserTypeChange('investor');
    onNavigate('investor-dashboard');
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50'>
      {/* Hero Section */}
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20'>
        <div className='text-center'>
          <h1 className='text-5xl md:text-6xl font-bold text-gray-900 mb-6'>Unlock Cash Flow</h1>
          <p className='text-xl text-gray-600 mb-8 max-w-3xl mx-auto'>
            SnapTx Invoice Financing connects businesses with investors. Get paid faster or invest in short-term opportunities.
          </p>
          <div className='flex flex-col sm:flex-row gap-4 justify-center'>
            <button
              onClick={handleBusinessStart}
              className='bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-all transform hover:scale-105 shadow-lg'
            >
              Get Funded
              <ArrowRight className='inline-block ml-2 h-5 w-5' />
            </button>
            <button
              onClick={handleInvestorStart}
              className='bg-green-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-green-700 transition-all transform hover:scale-105 shadow-lg'
            >
              Start Investing
              <TrendingUp className='inline-block ml-2 h-5 w-5' />
            </button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className='py-20 bg-gray-50'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-16'>
            <h2 className='text-4xl font-bold text-gray-900 mb-4'>Why Choose SnapTx?</h2>
            <p className='text-xl text-gray-600'>The most trusted platform for invoice financing</p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
            <div className='bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow'>
              <div className='bg-blue-100 p-3 rounded-full w-fit mb-4'>
                <Clock className='h-8 w-8 text-blue-600' />
              </div>
              <h3 className='text-xl font-semibold text-gray-900 mb-2'>Auto Compliance</h3>
              <p className='text-gray-600'>
                Auditable KYB process via{' '}
                <Link href='https://www.gleif.org/en/organizational-identity/introducing-the-verifiable-lei-vlei'>
                  <span className='underline'>vLEI</span>
                </Link>
                . Verify once, use everywhere.
              </p>
            </div>

            <div className='bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow'>
              <div className='bg-green-100 p-3 rounded-full w-fit mb-4'>
                <Shield className='h-8 w-8 text-green-600' />
              </div>
              <h3 className='text-xl font-semibold text-gray-900 mb-2'>Secure Financing</h3>
              <p className='text-gray-600'>
                Tokenizing invoices as NFTs enables faster transactions and quicker access to capital, while ensuring a tamper-proof record.
              </p>
            </div>

            <div className='bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow'>
              <div className='bg-purple-100 p-3 rounded-full w-fit mb-4'>
                <TrendingUp className='h-8 w-8 text-purple-600' />
              </div>
              <h3 className='text-xl font-semibold text-gray-900 mb-2'>Competitive Rates</h3>
              <p className='text-gray-600'>
                Our marketplace ensures competitive rates for both businesses and investors, with full transparency at every step.
              </p>
            </div>

            <div className='bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow'>
              <div className='bg-orange-100 p-3 rounded-full w-fit mb-4'>
                <Users className='h-8 w-8 text-orange-600' />
              </div>
              <h3 className='text-xl font-semibold text-gray-900 mb-2'>Role-Based Access</h3>
              <p className='text-gray-600'>
                Role-based access controls ensure that only authorized staff can sign transactions, approve invoices, or execute actions.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className='py-20 bg-white'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-16'>
            <h2 className='text-4xl font-bold text-gray-900 mb-4'>How It Works</h2>
            <p className='text-xl text-gray-600'>Simple steps to get started</p>
          </div>

          <div className='grid grid-cols-1 lg:grid-cols-2 gap-12'>
            {/* For Businesses */}
            <div>
              <h3 className='text-2xl font-bold text-blue-600 mb-8 text-center'>For Businesses</h3>
              <div className='space-y-6'>
                <div className='flex items-start'>
                  <div className='bg-blue-100 text-blue-600 rounded-full p-2 mr-4 mt-1'>
                    <span className='font-bold text-sm'>1</span>
                  </div>
                  <div>
                    <h4 className='font-semibold text-gray-900 mb-1'>Upload Your Invoice</h4>
                    <p className='text-gray-600'>Submit your unpaid B2B invoices for financing consideration.</p>
                  </div>
                </div>
                <div className='flex items-start'>
                  <div className='bg-blue-100 text-blue-600 rounded-full p-2 mr-4 mt-1'>
                    <span className='font-bold text-sm'>2</span>
                  </div>
                  <div>
                    <h4 className='font-semibold text-gray-900 mb-1'>Get Approved</h4>
                    <p className='text-gray-600'>Our system evaluates your invoice and creditworthiness.</p>
                  </div>
                </div>
                <div className='flex items-start'>
                  <div className='bg-blue-100 text-blue-600 rounded-full p-2 mr-4 mt-1'>
                    <span className='font-bold text-sm'>3</span>
                  </div>
                  <div>
                    <h4 className='font-semibold text-gray-900 mb-1'>Receive Funding</h4>
                    <p className='text-gray-600'>Get up to 90% of your invoice value within 24 hours.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* For Investors */}
            <div>
              <h3 className='text-2xl font-bold text-green-600 mb-8 text-center'>For Investors</h3>
              <div className='space-y-6'>
                <div className='flex items-start'>
                  <div className='bg-green-100 text-green-600 rounded-full p-2 mr-4 mt-1'>
                    <span className='font-bold text-sm'>1</span>
                  </div>
                  <div>
                    <h4 className='font-semibold text-gray-900 mb-1'>Browse Opportunities</h4>
                    <p className='text-gray-600'>Explore verified invoices with detailed risk assessments.</p>
                  </div>
                </div>
                <div className='flex items-start'>
                  <div className='bg-green-100 text-green-600 rounded-full p-2 mr-4 mt-1'>
                    <span className='font-bold text-sm'>2</span>
                  </div>
                  <div>
                    <h4 className='font-semibold text-gray-900 mb-1'>Make Your Investment</h4>
                    <p className='text-gray-600'>Choose invoices that match your risk tolerance and return goals.</p>
                  </div>
                </div>
                <div className='flex items-start'>
                  <div className='bg-green-100 text-green-600 rounded-full p-2 mr-4 mt-1'>
                    <span className='font-bold text-sm'>3</span>
                  </div>
                  <div>
                    <h4 className='font-semibold text-gray-900 mb-1'>Earn Returns</h4>
                    <p className='text-gray-600'>Collect your returns when the invoice is paid by the debtor.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className='py-20 bg-gradient-to-br from-blue-50 via-white to-green-50'>
        <div className='max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8'>
          <h2 className='text-4xl font-bold text-gray-900 mb-4'>Ready to Transform Your Business?</h2>
          <p className='text-xl text-gray-600 mb-8'>Join businesses and investors already using SnapTx</p>
          <div className='flex flex-col sm:flex-row gap-4 justify-center'>
            <button
              onClick={handleBusinessStart}
              className='bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-all transform hover:scale-105 shadow-lg'
            >
              Start as Business
            </button>
            <button
              onClick={handleInvestorStart}
              className='bg-green-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-green-700 transition-all transform hover:scale-105 shadow-lg'
            >
              Start as Investor
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
