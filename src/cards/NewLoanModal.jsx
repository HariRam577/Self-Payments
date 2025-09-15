import React, { useState } from 'react';
import { X, Calculator, User, Mail, DollarSign, Calendar, CreditCard } from 'lucide-react';

const NewLoanModal = ({ onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    borrowerName: '',
    borrowerEmail: '',
    amount: '',
    interestRate: '14.25',  // Set default to 14.25%
    duration: '1',
    purpose: '',
    dueDate: '',
    paymentGateway: 'googlepay'
  });

  const [errors, setErrors] = useState({});
  const [step, setStep] = useState(1);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateStep1 = () => {
    const newErrors = {};
    if (!formData.borrowerName.trim()) {
      newErrors.borrowerName = 'Borrower name is required';
    }
    if (!formData.borrowerEmail.trim()) {
      newErrors.borrowerEmail = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.borrowerEmail)) {
      newErrors.borrowerEmail = 'Email is invalid';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors = {};
    if (!formData.amount || parseFloat(formData.amount) <= 0) {
      newErrors.amount = 'Valid amount is required';
    }
    if (!formData.interestRate || parseFloat(formData.interestRate) < 0) {
      newErrors.interestRate = 'Valid interest rate is required';
    }
    if (!formData.duration || parseInt(formData.duration) <= 0) {
      newErrors.duration = 'Valid duration is required';
    }
    if (!formData.dueDate) {
      newErrors.dueDate = 'Due date is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (step === 1 && validateStep1()) {
      setStep(2);
    }
  };

  const handlePrevious = () => {
    setStep(1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateStep2()) {
      const loanData = {
        ...formData,
        amount: parseFloat(formData.amount),
        interestRate: parseFloat(formData.interestRate),
        duration: parseInt(formData.duration)
      };
      onSubmit(loanData);
      onClose();
    }
  };

  const getMinDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  // Calculation Logic
  const previewAmount = parseFloat(formData.amount) || 0;
  const previewRate = parseFloat(formData.interestRate) || 0;
  const previewDuration = parseInt(formData.duration) || 1;

  const calculateInterest = (principal, rate, duration) => {
    return (principal * rate) / 100;  // Flat interest based on principal
  };

  const calculateTotalAmount = (principal, rate, duration) => {
    return principal + calculateInterest(principal, rate, duration);
  };

  const calculateMonthlyInstallment = (principal, rate, duration) => {
    const total = calculateTotalAmount(principal, rate, duration);
    return total / duration;
  };

  const previewInterest = calculateInterest(previewAmount, previewRate, previewDuration);
  const previewTotal = calculateTotalAmount(previewAmount, previewRate, previewDuration);
  const previewMonthlyInstallment = calculateMonthlyInstallment(previewAmount, previewRate, previewDuration);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col">

        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 flex-shrink-0">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold">Create New Loan</h2>
              <p className="text-blue-100 mt-1">Step {step} of 2</p>
            </div>
            <button onClick={onClose} className="text-white hover:bg-blue-500 p-2 rounded-lg transition-colors">
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Progress Bar */}
          <div className="mt-4">
            <div className="w-full bg-blue-500 rounded-full h-2">
              <div 
                className="bg-white h-2 rounded-full transition-all duration-300"
                style={{ width: `${step * 50}%` }}
              />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {step === 1 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800">Borrower Information</h3>
                <p className="text-gray-500">Enter the borrower's details</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <User className="inline h-4 w-4 mr-1" />
                    Borrower Name *
                  </label>
                  <input
                    type="text"
                    name="borrowerName"
                    value={formData.borrowerName}
                    onChange={handleInputChange}
                    className={`w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                      errors.borrowerName ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="Enter full name"
                  />
                  {errors.borrowerName && <p className="text-red-600 text-sm mt-1">{errors.borrowerName}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Mail className="inline h-4 w-4 mr-1" />
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="borrowerEmail"
                    value={formData.borrowerEmail}
                    onChange={handleInputChange}
                    className={`w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                      errors.borrowerEmail ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="borrower@example.com"
                  />
                  {errors.borrowerEmail && <p className="text-red-600 text-sm mt-1">{errors.borrowerEmail}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Purpose (Optional)
                  </label>
                  <textarea
                    name="purpose"
                    value={formData.purpose}
                    onChange={handleInputChange}
                    rows="3"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    placeholder="Reason for the loan (optional)"
                  />
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calculator className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800">Loan Terms</h3>
                <p className="text-gray-500">Set the financial terms</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <DollarSign className="inline h-4 w-4 mr-1" />
                    Loan Amount (₹) *
                  </label>
                  <input
                    type="number"
                    name="amount"
                    value={formData.amount}
                    onChange={handleInputChange}
                    className={`w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                      errors.amount ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="10000"
                    min="1"
                  />
                  {errors.amount && <p className="text-red-600 text-sm mt-1">{errors.amount}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Interest Rate (%) *
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    name="interestRate"
                    value={formData.interestRate}
                    onChange={handleInputChange}
                    className={`w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                      errors.interestRate ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="14.25"
                    min="0"
                  />
                  {errors.interestRate && <p className="text-red-600 text-sm mt-1">{errors.interestRate}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Duration (months) *
                  </label>
                  <input
                    type="number"
                    name="duration"
                    value={formData.duration}
                    onChange={handleInputChange}
                    className={`w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                      errors.duration ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="1"
                    min="1"
                  />
                  {errors.duration && <p className="text-red-600 text-sm mt-1">{errors.duration}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Calendar className="inline h-4 w-4 mr-1" />
                    Due Date *
                  </label>
                  <input
                    type="date"
                    name="dueDate"
                    value={formData.dueDate}
                    onChange={handleInputChange}
                    min={getMinDate()}
                    className={`w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                      errors.dueDate ? 'border-red-300' : 'border-gray-300'
                    }`}
                  />
                  {errors.dueDate && <p className="text-red-600 text-sm mt-1">{errors.dueDate}</p>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <CreditCard className="inline h-4 w-4 mr-1" />
                  Payment Gateway
                </label>
                <select
                  name="paymentGateway"
                  value={formData.paymentGateway}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                >
                  <option value="googlepay">Google Pay</option>
                  <option value="phonepe">PhonePe</option>
                  <option value="paytm">Paytm</option>
                  <option value="upi">UPI</option>
                  <option value="bank">Bank Transfer</option>
                </select>
              </div>

              {/* Loan Preview */}
              {previewAmount > 0 && previewRate >= 0 && previewDuration > 0 && (
                <div className="bg-gradient-to-r from-blue-50 to-green-50 p-6 rounded-xl border border-blue-200">
                  <h4 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <Calculator className="h-5 w-5" />
                    Loan Calculation Preview
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                    <div className="text-center">
                      <p className="text-sm text-gray-600">Principal Amount</p>
                      <p className="text-xl font-bold text-blue-600">₹{previewAmount.toLocaleString()}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-600">Flat Interest (₹)</p>
                      <p className="text-xl font-bold text-green-600">₹{previewInterest.toLocaleString()}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-600">Total Payable (₹)</p>
                      <p className="text-xl font-bold text-purple-600">₹{previewTotal.toLocaleString()}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-600">Monthly Installment (₹)</p>
                      <p className="text-xl font-bold text-indigo-600">₹{previewMonthlyInstallment.toFixed(2)}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 flex justify-between items-center flex-shrink-0 border-t">
          <div className="flex items-center text-sm text-gray-600">
            {step === 1 ? <span>Enter borrower information to continue</span> : <span>Review loan terms before creating</span>}
          </div>

          <div className="flex gap-3">
            {step === 2 && (
              <button type="button" onClick={handlePrevious} className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500">
                Previous
              </button>
            )}

            {step === 1 && (
              <button type="button" onClick={handleNext} className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500">
                Next Step
              </button>
            )}

            {step === 2 && (
              <button type="button" onClick={handleSubmit} className="px-6 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500">
                Create Loan
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewLoanModal;
