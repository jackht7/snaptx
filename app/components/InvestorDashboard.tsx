import React, { useState } from 'react';
import { TrendingUp, DollarSign, PieChart, Target, Calendar, Award, ArrowUp, ArrowDown } from 'lucide-react';

type View = 'home' | 'how-it-works' | 'business-dashboard' | 'upload-invoice' | 'investor-dashboard' | 'marketplace';

interface InvestorDashboardProps {
  onNavigate: (view: View) => void;
}

interface Investment {
  id: string;
  invoiceId: string;
  company: string;
  amount: number;
  rate: number;
  dueDate: string;
  status: 'active' | 'paid' | 'overdue';
  investmentDate: string;
  expectedReturn: number;
}

export default function InvestorDashboard({ onNavigate }: InvestorDashboardProps) {
  const [investments] = useState<Investment[]>([
    {
      id: 'INV-001',
      invoiceId: 'INV-2024-001',
      company: 'TechStart Inc.',
      amount: 15000,
      rate: 8.5,
      dueDate: '2024-02-15',
      status: 'active',
      investmentDate: '2024-01-10',
      expectedReturn: 1275,
    },
    {
      id: 'INV-002',
      invoiceId: 'INV-2024-002',
      company: 'Global Services',
      amount: 22000,
      rate: 7.2,
      dueDate: '2024-01-28',
      status: 'paid',
      investmentDate: '2023-12-15',
      expectedReturn: 1584,
    },
    {
      id: 'INV-003',
      invoiceId: 'INV-2024-003',
      company: 'Design Agency',
      amount: 8500,
      rate: 9.1,
      dueDate: '2024-02-20',
      status: 'active',
      investmentDate: '2024-01-12',
      expectedReturn: 774,
    },
    {
      id: 'INV-004',
      invoiceId: 'INV-2024-004',
      company: 'Manufacturing Co',
      amount: 35000,
      rate: 6.8,
      dueDate: '2024-02-25',
      status: 'active',
      investmentDate: '2024-01-08',
      expectedReturn: 2380,
    },
  ]);

  const totalInvested = investments.reduce((sum, inv) => sum + inv.amount, 0);
  const activeInvestments = investments.filter((inv) => inv.status === 'active');
  const totalExpectedReturns = investments.reduce((sum, inv) => sum + inv.expectedReturn, 0);
  const averageRate = investments.reduce((sum, inv) => sum + inv.rate, 0) / investments.length;
  const totalReturnsEarned = investments.filter((inv) => inv.status === 'paid').reduce((sum, inv) => sum + inv.expectedReturn, 0);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-blue-100 text-blue-800';
      case 'paid':
        return 'bg-green-100 text-green-800';
      case 'overdue':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className='min-h-screen bg-gray-50'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        {/* Header */}
        <div className='mb-8'>
          <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between'>
            <div>
              <h1 className='text-3xl font-bold text-gray-900'>Investor Dashboard</h1>
              <p className='text-gray-600 mt-1'>Track your investments and explore new opportunities</p>
            </div>
            <button
              onClick={() => onNavigate('marketplace')}
              className='mt-4 sm:mt-0 bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors inline-flex items-center'
            >
              <Target className='h-5 w-5 mr-2' />
              Browse Marketplace
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8'>
          <div className='bg-white rounded-xl shadow-lg p-6'>
            <div className='flex items-center justify-between'>
              <div className='flex items-center'>
                <div className='bg-blue-100 p-3 rounded-full'>
                  <DollarSign className='h-8 w-8 text-blue-600' />
                </div>
                <div className='ml-4'>
                  <p className='text-sm font-medium text-gray-600'>Total Invested</p>
                  <p className='text-2xl font-bold text-gray-900'>${totalInvested.toLocaleString()}</p>
                </div>
              </div>
              <ArrowUp className='h-5 w-5 text-green-500' />
            </div>
          </div>

          <div className='bg-white rounded-xl shadow-lg p-6'>
            <div className='flex items-center justify-between'>
              <div className='flex items-center'>
                <div className='bg-green-100 p-3 rounded-full'>
                  <TrendingUp className='h-8 w-8 text-green-600' />
                </div>
                <div className='ml-4'>
                  <p className='text-sm font-medium text-gray-600'>Returns Earned</p>
                  <p className='text-2xl font-bold text-gray-900'>${totalReturnsEarned.toLocaleString()}</p>
                </div>
              </div>
              <ArrowUp className='h-5 w-5 text-green-500' />
            </div>
          </div>

          <div className='bg-white rounded-xl shadow-lg p-6'>
            <div className='flex items-center justify-between'>
              <div className='flex items-center'>
                <div className='bg-purple-100 p-3 rounded-full'>
                  <PieChart className='h-8 w-8 text-purple-600' />
                </div>
                <div className='ml-4'>
                  <p className='text-sm font-medium text-gray-600'>Active Investments</p>
                  <p className='text-2xl font-bold text-gray-900'>{activeInvestments.length}</p>
                </div>
              </div>
            </div>
          </div>

          <div className='bg-white rounded-xl shadow-lg p-6'>
            <div className='flex items-center justify-between'>
              <div className='flex items-center'>
                <div className='bg-orange-100 p-3 rounded-full'>
                  <Award className='h-8 w-8 text-orange-600' />
                </div>
                <div className='ml-4'>
                  <p className='text-sm font-medium text-gray-600'>Average Rate</p>
                  <p className='text-2xl font-bold text-gray-900'>{averageRate.toFixed(1)}%</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Portfolio Performance */}
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8'>
          <div className='lg:col-span-2 bg-white rounded-xl shadow-lg p-6'>
            <h2 className='text-xl font-semibold text-gray-900 mb-6'>Portfolio Performance</h2>
            <div className='h-64 bg-gray-50 rounded-lg flex items-center justify-center'>
              <div className='text-center'>
                <TrendingUp className='h-12 w-12 text-green-600 mx-auto mb-4' />
                <p className='text-gray-600'>Portfolio chart would be displayed here</p>
                <p className='text-sm text-gray-500'>Showing performance over time</p>
              </div>
            </div>
          </div>

          <div className='bg-white rounded-xl shadow-lg p-6'>
            <h2 className='text-xl font-semibold text-gray-900 mb-6'>Investment Summary</h2>
            <div className='space-y-4'>
              <div className='flex justify-between items-center py-3 border-b border-gray-100'>
                <span className='text-gray-600'>Expected Returns</span>
                <span className='font-semibold text-green-600'>${totalExpectedReturns.toLocaleString()}</span>
              </div>
              <div className='flex justify-between items-center py-3 border-b border-gray-100'>
                <span className='text-gray-600'>Total ROI</span>
                <span className='font-semibold text-blue-600'>{((totalExpectedReturns / totalInvested) * 100).toFixed(1)}%</span>
              </div>
              <div className='flex justify-between items-center py-3 border-b border-gray-100'>
                <span className='text-gray-600'>Success Rate</span>
                <span className='font-semibold text-purple-600'>98.5%</span>
              </div>
              <div className='flex justify-between items-center py-3'>
                <span className='text-gray-600'>Avg. Duration</span>
                <span className='font-semibold text-orange-600'>45 days</span>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className='bg-white rounded-xl shadow-lg mb-8'>
          <div className='p-6 border-b border-gray-200'>
            <h2 className='text-xl font-semibold text-gray-900'>Recent Activity</h2>
          </div>
          <div className='p-6'>
            <div className='space-y-4'>
              <div className='flex items-center p-4 bg-green-50 rounded-lg'>
                <DollarSign className='h-5 w-5 text-green-600 mr-3' />
                <div className='flex-1'>
                  <p className='text-sm font-medium text-gray-900'>Investment return received</p>
                  <p className='text-sm text-gray-600'>$23,584 from Global Services (INV-2024-002)</p>
                </div>
                <span className='text-xs text-gray-500'>2 hours ago</span>
              </div>

              <div className='flex items-center p-4 bg-blue-50 rounded-lg'>
                <Target className='h-5 w-5 text-blue-600 mr-3' />
                <div className='flex-1'>
                  <p className='text-sm font-medium text-gray-900'>New investment made</p>
                  <p className='text-sm text-gray-600'>$35,000 invested in Manufacturing Co (INV-2024-004)</p>
                </div>
                <span className='text-xs text-gray-500'>1 day ago</span>
              </div>

              <div className='flex items-center p-4 bg-purple-50 rounded-lg'>
                <Calendar className='h-5 w-5 text-purple-600 mr-3' />
                <div className='flex-1'>
                  <p className='text-sm font-medium text-gray-900'>Payment due soon</p>
                  <p className='text-sm text-gray-600'>TechStart Inc. invoice due in 5 days</p>
                </div>
                <span className='text-xs text-gray-500'>Today</span>
              </div>
            </div>
          </div>
        </div>

        {/* Active Investments Table */}
        <div className='bg-white rounded-xl shadow-lg'>
          <div className='p-6 border-b border-gray-200'>
            <h2 className='text-xl font-semibold text-gray-900'>Your Investments</h2>
          </div>
          <div className='overflow-x-auto'>
            <table className='w-full'>
              <thead className='bg-gray-50'>
                <tr>
                  <th className='px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Invoice</th>
                  <th className='px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Company</th>
                  <th className='px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Investment</th>
                  <th className='px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Rate</th>
                  <th className='px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Due Date</th>
                  <th className='px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Status</th>
                  <th className='px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Expected Return</th>
                </tr>
              </thead>
              <tbody className='divide-y divide-gray-200'>
                {investments.map((investment) => (
                  <tr key={investment.id} className='hover:bg-gray-50'>
                    <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>{investment.invoiceId}</td>
                    <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>{investment.company}</td>
                    <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>${investment.amount.toLocaleString()}</td>
                    <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>{investment.rate}%</td>
                    <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>{new Date(investment.dueDate).toLocaleDateString()}</td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(investment.status)}`}>
                        {investment.status}
                      </span>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-sm text-green-600 font-medium'>${investment.expectedReturn.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
