import React, { useState } from 'react';
import { Upload, FileText, Calendar, DollarSign, Building, ArrowLeft } from 'lucide-react';

type View = 'home' | 'how-it-works' | 'business-dashboard' | 'upload-invoice' | 'investor-dashboard' | 'marketplace';

interface UploadInvoiceProps {
  onNavigate: (view: View) => void;
}

export default function UploadInvoice({ onNavigate }: UploadInvoiceProps) {
  const [formData, setFormData] = useState({
    invoiceNumber: '',
    debtorName: '',
    debtorEmail: '',
    invoiceAmount: '',
    dueDate: '',
    description: '',
    file: null as File | null
  });

  const [dragActive, setDragActive] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFormData(prev => ({
        ...prev,
        file: e.dataTransfer.files[0]
      }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({
        ...prev,
        file: e.target.files![0]
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      alert('Invoice uploaded successfully! It will be reviewed and listed in the marketplace within 24 hours.');
      onNavigate('business-dashboard');
    }, 2000);
  };

  const isFormValid = formData.invoiceNumber && formData.debtorName && formData.invoiceAmount && formData.dueDate && formData.file;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => onNavigate('business-dashboard')}
            className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Upload Invoice</h1>
          <p className="text-gray-600 mt-1">Submit your invoice for financing consideration</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* File Upload */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Invoice Document</h2>
            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                dragActive 
                  ? 'border-blue-500 bg-blue-50' 
                  : formData.file 
                    ? 'border-green-500 bg-green-50' 
                    : 'border-gray-300 hover:border-blue-400'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <input
                type="file"
                id="file"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={handleFileChange}
                className="hidden"
              />
              <label htmlFor="file" className="cursor-pointer">
                <Upload className={`mx-auto h-12 w-12 ${formData.file ? 'text-green-600' : 'text-gray-400'}`} />
                <div className="mt-4">
                  {formData.file ? (
                    <>
                      <p className="text-green-600 font-medium">{formData.file.name}</p>
                      <p className="text-sm text-gray-500">Click to change file</p>
                    </>
                  ) : (
                    <>
                      <p className="text-gray-600 font-medium">Drop your invoice here or click to browse</p>
                      <p className="text-sm text-gray-500">Supports PDF, JPG, PNG up to 10MB</p>
                    </>
                  )}
                </div>
              </label>
            </div>
          </div>

          {/* Invoice Details */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Invoice Details</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="invoiceNumber" className="block text-sm font-medium text-gray-700 mb-2">
                  Invoice Number *
                </label>
                <div className="relative">
                  <FileText className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    id="invoiceNumber"
                    name="invoiceNumber"
                    value={formData.invoiceNumber}
                    onChange={handleInputChange}
                    className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="INV-2024-001"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="invoiceAmount" className="block text-sm font-medium text-gray-700 mb-2">
                  Invoice Amount *
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="number"
                    id="invoiceAmount"
                    name="invoiceAmount"
                    value={formData.invoiceAmount}
                    onChange={handleInputChange}
                    className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="25000"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700 mb-2">
                  Due Date *
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="date"
                    id="dueDate"
                    name="dueDate"
                    value={formData.dueDate}
                    onChange={handleInputChange}
                    className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="debtorName" className="block text-sm font-medium text-gray-700 mb-2">
                  Debtor Company *
                </label>
                <div className="relative">
                  <Building className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    id="debtorName"
                    name="debtorName"
                    value={formData.debtorName}
                    onChange={handleInputChange}
                    className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Acme Corporation"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="mt-6">
              <label htmlFor="debtorEmail" className="block text-sm font-medium text-gray-700 mb-2">
                Debtor Email (Optional)
              </label>
              <input
                type="email"
                id="debtorEmail"
                name="debtorEmail"
                value={formData.debtorEmail}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="contact@acmecorp.com"
              />
            </div>

            <div className="mt-6">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                Description (Optional)
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Brief description of services/products..."
              />
            </div>
          </div>

          {/* Terms and Submit */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <h3 className="font-semibold text-blue-900 mb-2">Financing Terms</h3>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• You can receive up to 90% of your invoice value</li>
                <li>• Funding rates typically range from 5-15% depending on risk assessment</li>
                <li>• Funding is usually available within 24-48 hours of approval</li>
                <li>• No hidden fees or additional charges</li>
              </ul>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="terms"
                  required
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="terms" className="ml-2 text-sm text-gray-700">
                  I agree to the <a href="#" className="text-blue-600 hover:underline">Terms of Service</a> and <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>
                </label>
              </div>
              
              <button
                type="submit"
                disabled={!isFormValid || isSubmitting}
                className={`px-8 py-3 rounded-lg font-medium transition-all ${
                  isFormValid && !isSubmitting
                    ? 'bg-blue-600 text-white hover:bg-blue-700 transform hover:scale-105'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                {isSubmitting ? (
                  <>
                    <div className="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Submitting...
                  </>
                ) : (
                  'Submit Invoice'
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}