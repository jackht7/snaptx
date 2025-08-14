import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Building, 
  Calendar, 
  DollarSign, 
  Shield,
  TrendingUp,
  Clock,
  Eye,
  ArrowLeft
} from 'lucide-react';

type View = 'home' | 'how-it-works' | 'business-dashboard' | 'upload-invoice' | 'investor-dashboard' | 'marketplace';

interface MarketplaceProps {
  onNavigate: (view: View) => void;
}

interface InvoiceOpportunity {
  id: string;
  company: string;
  industry: string;
  amount: number;
  suggestedRate: number;
  dueDate: string;
  daysToPayment: number;
  riskGrade: 'A' | 'B' | 'C';
  description: string;
  fundingNeeded: number;
  fundingProgress: number;
}

export default function Marketplace({ onNavigate }: MarketplaceProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRisk, setSelectedRisk] = useState('all');
  const [selectedIndustry, setSelectedIndustry] = useState('all');
  const [sortBy, setSortBy] = useState('rate');
  
  const [invoices] = useState<InvoiceOpportunity[]>([
    {
      id: 'INV-2024-005',
      company: 'TechFlow Solutions',
      industry: 'Technology',
      amount: 45000,
      suggestedRate: 8.2,
      dueDate: '2024-03-15',
      daysToPayment: 45,
      riskGrade: 'A',
      description: 'Software development services for enterprise client',
      fundingNeeded: 40500,
      fundingProgress: 25
    },
    {
      id: 'INV-2024-006',
      company: 'Green Energy Corp',
      industry: 'Energy',
      amount: 75000,
      suggestedRate: 7.5,
      dueDate: '2024-03-20',
      daysToPayment: 50,
      riskGrade: 'A',
      description: 'Solar panel installation project',
      fundingNeeded: 67500,
      fundingProgress: 60
    },
    {
      id: 'INV-2024-007',
      company: 'Creative Agency Plus',
      industry: 'Marketing',
      amount: 28000,
      suggestedRate: 9.1,
      dueDate: '2024-02-28',
      daysToPayment: 30,
      riskGrade: 'B',
      description: 'Brand development and marketing campaign',
      fundingNeeded: 25200,
      fundingProgress: 15
    },
    {
      id: 'INV-2024-008',
      company: 'Manufacturing Pro',
      industry: 'Manufacturing',
      amount: 120000,
      suggestedRate: 6.8,
      dueDate: '2024-04-10',
      daysToPayment: 75,
      riskGrade: 'A',
      description: 'Industrial equipment supply contract',
      fundingNeeded: 108000,
      fundingProgress: 40
    },
    {
      id: 'INV-2024-009',
      company: 'Health Solutions Ltd',
      industry: 'Healthcare',
      amount: 52000,
      suggestedRate: 8.8,
      dueDate: '2024-03-05',
      daysToPayment: 35,
      riskGrade: 'B',
      description: 'Medical equipment and supplies',
      fundingNeeded: 46800,
      fundingProgress: 80
    },
    {
      id: 'INV-2024-010',
      company: 'Retail Chain Co',
      industry: 'Retail',
      amount: 35000,
      suggestedRate: 10.2,
      dueDate: '2024-02-25',
      daysToPayment: 25,
      riskGrade: 'C',
      description: 'Inventory restocking for Q1',
      fundingNeeded: 31500,
      fundingProgress: 5
    }
  ]);

  const getRiskColor = (grade: string) => {
    switch (grade) {
      case 'A': return 'bg-green-100 text-green-800 border-green-200';
      case 'B': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'C': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const filteredInvoices = invoices
    .filter(invoice => 
      invoice.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(invoice => selectedRisk === 'all' || invoice.riskGrade === selectedRisk)
    .filter(invoice => selectedIndustry === 'all' || invoice.industry === selectedIndustry)
    .sort((a, b) => {
      switch (sortBy) {
        case 'rate': return b.suggestedRate - a.suggestedRate;
        case 'amount': return b.amount - a.amount;
        case 'daysToPayment': return a.daysToPayment - b.daysToPayment;
        case 'risk': return a.riskGrade.localeCompare(b.riskGrade);
        default: return 0;
      }
    });

  const handleInvest = (invoiceId: string) => {
    alert(`Investment simulation for ${invoiceId}. In a real app, this would open the investment flow.`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => onNavigate('investor-dashboard')}
            className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Invoice Marketplace</h1>
          <p className="text-gray-600 mt-1">Discover verified investment opportunities</p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="lg:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Search by company or description..."
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Risk Grade</label>
              <select
                value={selectedRisk}
                onChange={(e) => setSelectedRisk(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Risks</option>
                <option value="A">Grade A</option>
                <option value="B">Grade B</option>
                <option value="C">Grade C</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Industry</label>
              <select
                value={selectedIndustry}
                onChange={(e) => setSelectedIndustry(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Industries</option>
                <option value="Technology">Technology</option>
                <option value="Healthcare">Healthcare</option>
                <option value="Manufacturing">Manufacturing</option>
                <option value="Energy">Energy</option>
                <option value="Marketing">Marketing</option>
                <option value="Retail">Retail</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="rate">Highest Rate</option>
                <option value="amount">Highest Amount</option>
                <option value="daysToPayment">Shortest Term</option>
                <option value="risk">Lowest Risk</option>
              </select>
            </div>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{filteredInvoices.length}</div>
            <div className="text-sm text-gray-600">Available Opportunities</div>
          </div>
          <div className="bg-white rounded-lg shadow p-4 text-center">
            <div className="text-2xl font-bold text-green-600">
              ${filteredInvoices.reduce((sum, inv) => sum + inv.fundingNeeded, 0).toLocaleString()}
            </div>
            <div className="text-sm text-gray-600">Total Funding Needed</div>
          </div>
          <div className="bg-white rounded-lg shadow p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">
              {(filteredInvoices.reduce((sum, inv) => sum + inv.suggestedRate, 0) / filteredInvoices.length).toFixed(1)}%
            </div>
            <div className="text-sm text-gray-600">Average Rate</div>
          </div>
          <div className="bg-white rounded-lg shadow p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">
              {Math.round(filteredInvoices.reduce((sum, inv) => sum + inv.daysToPayment, 0) / filteredInvoices.length)}
            </div>
            <div className="text-sm text-gray-600">Avg Days to Payment</div>
          </div>
        </div>

        {/* Invoice Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredInvoices.map((invoice) => (
            <div key={invoice.id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center">
                    <Building className="h-8 w-8 text-blue-600 mr-3" />
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{invoice.company}</h3>
                      <p className="text-sm text-gray-600">{invoice.industry}</p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getRiskColor(invoice.riskGrade)}`}>
                    Risk {invoice.riskGrade}
                  </span>
                </div>

                {/* Amount and Rate */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-gray-600">Invoice Amount</p>
                    <p className="text-xl font-bold text-gray-900">${invoice.amount.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Suggested Rate</p>
                    <p className="text-xl font-bold text-green-600">{invoice.suggestedRate}%</p>
                  </div>
                </div>

                {/* Funding Progress */}
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600">Funding Progress</span>
                    <span className="text-sm font-medium text-gray-900">{invoice.fundingProgress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                      style={{ width: `${invoice.fundingProgress}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    ${invoice.fundingNeeded.toLocaleString()} needed
                  </p>
                </div>

                {/* Details */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="h-4 w-4 mr-2" />
                    Due: {new Date(invoice.dueDate).toLocaleDateString()}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="h-4 w-4 mr-2" />
                    {invoice.daysToPayment} days to payment
                  </div>
                </div>

                <p className="text-sm text-gray-700 mb-4 line-clamp-2">{invoice.description}</p>

                {/* Action Buttons */}
                <div className="flex space-x-2">
                  <button className="flex-1 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors inline-flex items-center justify-center">
                    <Eye className="h-4 w-4 mr-2" />
                    View Details
                  </button>
                  <button
                    onClick={() => handleInvest(invoice.id)}
                    className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors font-medium"
                  >
                    Invest Now
                  </button>
                </div>

                {/* Expected Return */}
                <div className="mt-3 p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-green-700">Est. Return (Full Investment)</span>
                    <span className="font-semibold text-green-800">
                      ${(invoice.fundingNeeded * (invoice.suggestedRate / 100) * (invoice.daysToPayment / 365)).toFixed(0)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredInvoices.length === 0 && (
          <div className="text-center py-12">
            <Filter className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No invoices match your filters</h3>
            <p className="text-gray-600">Try adjusting your search criteria or filters</p>
          </div>
        )}
      </div>
    </div>
  );
}