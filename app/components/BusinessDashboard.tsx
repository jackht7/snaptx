import React, { useState } from 'react';
import { DollarSign, FileText, Clock, TrendingUp, Plus, AlertCircle, CheckCircle, Eye } from 'lucide-react';

type View = 'home' | 'how-it-works' | 'business-dashboard' | 'upload-invoice' | 'investor-dashboard' | 'marketplace';

interface BusinessDashboardProps {
  onNavigate: (view: View) => void;
}

interface Invoice {
  id: string;
  debtor: string;
  amount: number;
  dueDate: string;
  status: 'pending' | 'funded' | 'paid';
  fundedAmount?: number;
  rate?: number;
  uploadDate: string;
}

export default function BusinessDashboard({ onNavigate }: BusinessDashboardProps) {
  const [invoices] = useState<Invoice[]>([
    {
      id: 'INV-001',
      debtor: 'Acme Corporation',
      amount: 25000,
      dueDate: '2024-02-15',
      status: 'funded',
      fundedAmount: 22500,
      rate: 8.5,
      uploadDate: '2024-01-10',
    },
    {
      id: 'INV-002',
      debtor: 'TechFlow Systems',
      amount: 18500,
      dueDate: '2024-02-20',
      status: 'pending',
      uploadDate: '2024-01-12',
    },
    {
      id: 'INV-003',
      debtor: 'Global Industries',
      amount: 32000,
      dueDate: '2024-01-30',
      status: 'paid',
      fundedAmount: 28800,
      rate: 7.2,
      uploadDate: '2023-12-15',
    },
    {
      id: 'INV-004',
      debtor: 'Startup Ventures',
      amount: 12000,
      dueDate: '2024-02-25',
      status: 'pending',
      uploadDate: '2024-01-14',
    },
  ]);

  const totalInvoices = invoices.length;
  const totalValue = invoices.reduce((sum, inv) => sum + inv.amount, 0);
  const fundedValue = invoices.reduce((sum, inv) => sum + (inv.fundedAmount || 0), 0);
  const pendingValue = invoices.filter((inv) => inv.status === 'pending').reduce((sum, inv) => sum + inv.amount, 0);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'funded':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'paid':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'funded':
        return <CheckCircle className='h-4 w-4' />;
      case 'pending':
        return <Clock className='h-4 w-4' />;
      case 'paid':
        return <DollarSign className='h-4 w-4' />;
      default:
        return <AlertCircle className='h-4 w-4' />;
    }
  };

  return (
    <div className='min-h-screen bg-gray-50'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        {/* Header */}
        <div className='mb-8'>
          <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between'>
            <div>
              <h1 className='text-3xl font-bold text-gray-900'>Business Dashboard</h1>
              <p className='text-gray-600 mt-1'>Manage your invoices and track your cash flow</p>
            </div>
            <button
              onClick={() => onNavigate('upload-invoice')}
              className='mt-4 sm:mt-0 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors inline-flex items-center'
            >
              <Plus className='h-5 w-5 mr-2' />
              Upload Invoice
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8'>
          <div className='bg-white rounded-xl shadow-lg p-6'>
            <div className='flex items-center'>
              <div className='bg-blue-100 p-3 rounded-full'>
                <FileText className='h-8 w-8 text-blue-600' />
              </div>
              <div className='ml-4'>
                <p className='text-sm font-medium text-gray-600'>Total Invoices</p>
                <p className='text-2xl font-bold text-gray-900'>{totalInvoices}</p>
              </div>
            </div>
          </div>

          <div className='bg-white rounded-xl shadow-lg p-6'>
            <div className='flex items-center'>
              <div className='bg-green-100 p-3 rounded-full'>
                <DollarSign className='h-8 w-8 text-green-600' />
              </div>
              <div className='ml-4'>
                <p className='text-sm font-medium text-gray-600'>Total Value</p>
                <p className='text-2xl font-bold text-gray-900'>${totalValue.toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div className='bg-white rounded-xl shadow-lg p-6'>
            <div className='flex items-center'>
              <div className='bg-purple-100 p-3 rounded-full'>
                <TrendingUp className='h-8 w-8 text-purple-600' />
              </div>
              <div className='ml-4'>
                <p className='text-sm font-medium text-gray-600'>Funded Amount</p>
                <p className='text-2xl font-bold text-gray-900'>${fundedValue.toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div className='bg-white rounded-xl shadow-lg p-6'>
            <div className='flex items-center'>
              <div className='bg-orange-100 p-3 rounded-full'>
                <Clock className='h-8 w-8 text-orange-600' />
              </div>
              <div className='ml-4'>
                <p className='text-sm font-medium text-gray-600'>Pending Value</p>
                <p className='text-2xl font-bold text-gray-900'>${pendingValue.toLocaleString()}</p>
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
                <CheckCircle className='h-5 w-5 text-green-600 mr-3' />
                <div className='flex-1'>
                  <p className='text-sm font-medium text-gray-900'>Invoice INV-001 has been funded</p>
                  <p className='text-sm text-gray-600'>Received $22,500 at 8.5% rate</p>
                </div>
                <span className='text-xs text-gray-500'>2 hours ago</span>
              </div>

              <div className='flex items-center p-4 bg-blue-50 rounded-lg'>
                <FileText className='h-5 w-5 text-blue-600 mr-3' />
                <div className='flex-1'>
                  <p className='text-sm font-medium text-gray-900'>New invoice uploaded</p>
                  <p className='text-sm text-gray-600'>INV-004 for $12,000 is now under review</p>
                </div>
                <span className='text-xs text-gray-500'>1 day ago</span>
              </div>

              <div className='flex items-center p-4 bg-purple-50 rounded-lg'>
                <DollarSign className='h-5 w-5 text-purple-600 mr-3' />
                <div className='flex-1'>
                  <p className='text-sm font-medium text-gray-900'>Payment received</p>
                  <p className='text-sm text-gray-600'>INV-003 payment completed</p>
                </div>
                <span className='text-xs text-gray-500'>3 days ago</span>
              </div>
            </div>
          </div>
        </div>

        {/* Invoices Table */}
        <div className='bg-white rounded-xl shadow-lg'>
          <div className='p-6 border-b border-gray-200'>
            <h2 className='text-xl font-semibold text-gray-900'>Your Invoices</h2>
          </div>
          <div className='overflow-x-auto'>
            <table className='w-full'>
              <thead className='bg-gray-50'>
                <tr>
                  <th className='px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Invoice ID</th>
                  <th className='px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Debtor</th>
                  <th className='px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Amount</th>
                  <th className='px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Due Date</th>
                  <th className='px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Status</th>
                  <th className='px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Funded Amount</th>
                  <th className='px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Actions</th>
                </tr>
              </thead>
              <tbody className='divide-y divide-gray-200'>
                {invoices.map((invoice) => (
                  <tr key={invoice.id} className='hover:bg-gray-50'>
                    <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>{invoice.id}</td>
                    <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>{invoice.debtor}</td>
                    <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>${invoice.amount.toLocaleString()}</td>
                    <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>{new Date(invoice.dueDate).toLocaleDateString()}</td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(invoice.status)}`}>
                        {getStatusIcon(invoice.status)}
                        <span className='ml-1 capitalize'>{invoice.status}</span>
                      </span>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                      {invoice.fundedAmount ? `$${invoice.fundedAmount.toLocaleString()}` : '-'}
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-sm font-medium'>
                      <button className='text-blue-600 hover:text-blue-900 mr-3'>
                        <Eye className='h-4 w-4' />
                      </button>
                    </td>
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
