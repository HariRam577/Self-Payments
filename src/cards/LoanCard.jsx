// components/LoanCard.jsx - Individual Loan Card Component
import React, { useState } from 'react';
import { Mail, CreditCard, Calendar, DollarSign, User, AlertCircle, CheckCircle, Clock } from 'lucide-react';

const LoanCard = ({ loan, getLoanStatus, recordPayment, sendReminder }) => {
  const [showPaymentInput, setShowPaymentInput] = useState(false);
  const [paymentAmount, setPaymentAmount] = useState('');

  const flatInterest = (loan.amount * loan.interestRate) / 100;
  const totalAmount = loan.amount + flatInterest;
  const remainingAmount = totalAmount - loan.paidAmount;
  const monthlyInstallment = totalAmount / loan.duration;

  const status = getLoanStatus(loan);
  const progress = (loan.paidAmount / totalAmount) * 100;

  const getStatusConfig = (status) => {
    switch (status) {
      case 'completed':
        return {
          color: 'bg-green-100 text-green-800',
          icon: CheckCircle,
          iconColor: 'text-green-600'
        };
      case 'overdue':
        return {
          color: 'bg-red-100 text-red-800',
          icon: AlertCircle,
          iconColor: 'text-red-600'
        };
      default:
        return {
          color: 'bg-blue-100 text-blue-800',
          icon: Clock,
          iconColor: 'text-blue-600'
        };
    }
  };

  const statusConfig = getStatusConfig(status);
  const StatusIcon = statusConfig.icon;

  const handlePaymentSubmit = () => {
    if (paymentAmount && !isNaN(paymentAmount) && parseFloat(paymentAmount) > 0) {
      recordPayment(loan.id, paymentAmount);
      setPaymentAmount('');
      setShowPaymentInput(false);
    }
  };

  const getDaysUntilDue = () => {
    const today = new Date();
    const dueDate = new Date(loan.dueDate);
    const diffTime = dueDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const daysUntilDue = getDaysUntilDue();

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-300 overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
              <User className="h-6 w-6 text-gray-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{loan.borrowerName}</h3>
              <p className="text-sm text-gray-500">{loan.borrowerEmail}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusConfig.color} flex items-center gap-1`}>
              <StatusIcon className="h-3 w-3" />
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </span>
          </div>
        </div>

        {/* Due Date Warning */}
        {status === 'active' && daysUntilDue <= 7 && daysUntilDue > 0 && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-yellow-600" />
              <span className="text-sm font-medium text-yellow-800">
                Due in {daysUntilDue} day{daysUntilDue !== 1 ? 's' : ''}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Loan Details */}
      <div className="p-6">
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Loan Amount</p>
            <p className="text-lg font-bold text-gray-900">₹{loan.amount.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Flat Interest</p>
            <p className="text-lg font-bold text-gray-900">₹{flatInterest.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Total Amount</p>
            <p className="text-lg font-bold text-gray-900">₹{totalAmount.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Monthly Installment</p>
            <p className="text-lg font-bold text-gray-900">₹{monthlyInstallment.toFixed(2)}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Paid Amount</p>
            <p className="text-lg font-bold text-green-600">₹{loan.paidAmount.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Remaining</p>
            <p className="text-lg font-bold text-red-600">₹{Math.max(0, remainingAmount).toLocaleString()}</p>
          </div>
        </div>

        {/* Payment Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between items-center text-sm text-gray-600 mb-2">
            <span className="font-medium">Payment Progress</span>
            <span className="font-semibold">{progress.toFixed(1)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <div 
              className={`h-3 rounded-full transition-all duration-500 ${
                progress === 100 ? 'bg-green-500' : 
                progress > 75 ? 'bg-blue-500' : 
                progress > 50 ? 'bg-yellow-500' : 'bg-red-500'
              }`}
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>
        </div>

        {/* Loan Info */}
        <div className="grid grid-cols-2 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
          <div className="text-sm">
            <span className="text-gray-500">Interest Rate:</span>
            <span className="ml-2 font-semibold text-gray-800">{loan.interestRate}%</span>
          </div>
          <div className="text-sm">
            <span className="text-gray-500">Duration:</span>
            <span className="ml-2 font-semibold text-gray-800">{loan.duration} months</span>
          </div>
          <div className="text-sm">
            <span className="text-gray-500">Due Date:</span>
            <span className="ml-2 font-semibold text-gray-800">{new Date(loan.dueDate).toLocaleDateString()}</span>
          </div>
          <div className="text-sm">
            <span className="text-gray-500">Gateway:</span>
            <span className="ml-2 font-semibold text-gray-800 capitalize">{loan.paymentGateway}</span>
          </div>
        </div>

        {/* 3-Month Payment Schedule */}
        {loan.startDate && (
          <div className="mt-6 pt-4 border-t border-gray-200">
            <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Monthly Payment Schedule
            </h4>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {Array.from({ length: loan.duration }).map((_, index) => {
                const dueDate = new Date(loan.startDate);
                dueDate.setMonth(dueDate.getMonth() + index + 1);

                const paymentInThisMonth = loan.payments.some(payment => {
                  const paymentDate = new Date(payment.date);
                  return (
                    paymentDate.getFullYear() === dueDate.getFullYear() &&
                    paymentDate.getMonth() === dueDate.getMonth()
                  );
                });

                return (
                  <div key={index} className="flex justify-between items-center text-sm py-2 px-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-700">
                      {dueDate.toLocaleDateString(undefined, { year: 'numeric', month: 'long' })}
                    </span>
                    <span className={`font-semibold ${paymentInThisMonth ? 'text-green-600' : 'text-red-600'}`}>
                      {paymentInThisMonth ? 'Complete' : 'Pending'}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Payment Input */}
        {showPaymentInput && (
          <div className="mb-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Record Payment Amount (₹)
            </label>
            <div className="flex gap-2">
              <input
                type="number"
                value={paymentAmount}
                onChange={(e) => setPaymentAmount(e.target.value)}
                placeholder="Enter amount"
                className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                max={remainingAmount}
              />
              <button
                onClick={handlePaymentSubmit}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Save
              </button>
              <button
                onClick={() => {
                  setShowPaymentInput(false);
                  setPaymentAmount('');
                }}
                className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={() => sendReminder(loan)}
            className="flex-1 bg-blue-600 text-white px-4 py-3 rounded-lg font-medium hover:bg-blue-700 transition-all duration-200 flex items-center justify-center gap-2 shadow-sm hover:shadow-md"
          >
            <Mail className="h-4 w-4" />
            Send Reminder
          </button>
          
          {status !== 'completed' && (
            <button
              onClick={() => setShowPaymentInput(true)}
              className="flex-1 bg-green-600 text-white px-4 py-3 rounded-lg font-medium hover:bg-green-700 transition-all duration-200 flex items-center justify-center gap-2 shadow-sm hover:shadow-md"
            >
              <CreditCard className="h-4 w-4" />
              Record Payment
            </button>
          )}
        </div>

        {/* Recent Payments */}
        {loan.payments && loan.payments.length > 0 && (
          <div className="mt-6 pt-4 border-t border-gray-200">
            <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              Recent Payments
            </h4>
            <div className="space-y-2 max-h-32 overflow-y-auto">
              {loan.payments.slice(-3).reverse().map((payment, index) => (
                <div key={index} className="flex justify-between items-center text-sm py-2 px-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-600">
                    {new Date(payment.date).toLocaleDateString()}
                  </span>
                  <span className="font-semibold text-green-600">
                    +₹{payment.amount.toLocaleString()}
                  </span>
                </div>
              ))}
              {loan.payments.length > 3 && (
                <p className="text-xs text-gray-500 text-center py-1">
                  +{loan.payments.length - 3} more payments
                </p>
              )}
            </div>
          </div>
        )}

        {/* Purpose */}
        {loan.purpose && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Purpose</p>
            <p className="text-sm text-gray-700">{loan.purpose}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoanCard;
