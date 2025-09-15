// components/LoansList.jsx - All Loans View Component
import React, { useState } from 'react';
import LoanCard from './LoanCard';
import { Search, Filter, SortAsc, SortDesc, Grid, List } from 'lucide-react';

const LoansList = ({ loans, calculateTotalAmount, getLoanStatus, recordPayment, sendReminder }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');
  const [viewMode, setViewMode] = useState('grid');

  // Filter and sort loans
  const getFilteredAndSortedLoans = () => {
    let filteredLoans = loans.filter(loan => {
      const matchesSearch = loan.borrowerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           loan.borrowerEmail.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || getLoanStatus(loan) === statusFilter;
      
      return matchesSearch && matchesStatus;
    });

    // Sort loans
    filteredLoans.sort((a, b) => {
      let comparison = 0;
      
      switch (sortBy) {
        case 'date':
          comparison = new Date(a.startDate) - new Date(b.startDate);
          break;
        case 'amount':
          comparison = a.amount - b.amount;
          break;
        case 'name':
          comparison = a.borrowerName.localeCompare(b.borrowerName);
          break;
        case 'status':
          comparison = getLoanStatus(a).localeCompare(getLoanStatus(b));
          break;
        case 'dueDate':
          comparison = new Date(a.dueDate) - new Date(b.dueDate);
          break;
        default:
          comparison = 0;
      }
      
      return sortOrder === 'asc' ? comparison : -comparison;
    });

    return filteredLoans;
  };

  const filteredLoans = getFilteredAndSortedLoans();

  const getStatusCounts = () => {
    return {
      all: loans.length,
      active: loans.filter(loan => getLoanStatus(loan) === 'active').length,
      completed: loans.filter(loan => getLoanStatus(loan) === 'completed').length,
      overdue: loans.filter(loan => getLoanStatus(loan) === 'overdue').length
    };
  };

  const statusCounts = getStatusCounts();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">All Loans</h2>
          <p className="text-gray-500 mt-1">
            {filteredLoans.length} of {loans.length} loans
          </p>
        </div>
        
        {/* View Toggle */}
        <div className="flex items-center gap-2 bg-gray-100 p-1 rounded-lg">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-md transition-colors ${
              viewMode === 'grid' 
                ? 'bg-white text-blue-600 shadow-sm' 
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            <Grid className="h-4 w-4" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-md transition-colors ${
              viewMode === 'list' 
                ? 'bg-white text-blue-600 shadow-sm' 
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            <List className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Status Filter Tabs */}
      <div className="flex flex-wrap gap-2">
        {[
          { key: 'all', label: 'All Loans', color: 'text-gray-600' },
          { key: 'active', label: 'Active', color: 'text-blue-600' },
          { key: 'completed', label: 'Completed', color: 'text-green-600' },
          { key: 'overdue', label: 'Overdue', color: 'text-red-600' }
        ].map(status => (
          <button
            key={status.key}
            onClick={() => setStatusFilter(status.key)}
            className={`px-4 py-2 rounded-full font-medium transition-all duration-200 ${
              statusFilter === status.key
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
            }`}
          >
            {status.label} ({statusCounts[status.key]})
          </button>
        ))}
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by borrower name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Sort Options */}
          <div className="flex gap-2">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="date">Sort by Date</option>
              <option value="amount">Sort by Amount</option>
              <option value="name">Sort by Name</option>
              <option value="status">Sort by Status</option>
              <option value="dueDate">Sort by Due Date</option>
            </select>

            <button
              onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
              className="border border-gray-300 rounded-lg px-3 py-2 hover:bg-gray-50 transition-colors"
            >
              {sortOrder === 'asc' ? <SortAsc className="h-4 w-4" /> : <SortDesc className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* Loans Grid/List */}
      {filteredLoans.length > 0 ? (
        <div className={
          viewMode === 'grid' 
            ? "grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6" 
            : "space-y-4"
        }>
          {filteredLoans.map(loan => (
            <LoanCard
              key={loan.id}
              loan={loan}
              calculateTotalAmount={calculateTotalAmount}
              getLoanStatus={getLoanStatus}
              recordPayment={recordPayment}
              sendReminder={sendReminder}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-800 mb-2">No loans found</h3>
          <p className="text-gray-500 mb-6">
            {searchTerm || statusFilter !== 'all' 
              ? 'Try adjusting your search criteria or filters' 
              : 'Start by creating your first loan'}
          </p>
          {(searchTerm || statusFilter !== 'all') && (
            <button
              onClick={() => {
                setSearchTerm('');
                setStatusFilter('all');
              }}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Clear Filters
            </button>
          )}
        </div>
      )}

      {/* Summary Stats */}
      {filteredLoans.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Summary</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">
                {filteredLoans.length}
              </p>
              <p className="text-sm text-gray-600">Total Loans</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">
                ₹{filteredLoans.reduce((sum, loan) => sum + loan.amount, 0).toLocaleString()}
              </p>
              <p className="text-sm text-gray-600">Total Amount</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-600">
                ₹{filteredLoans.reduce((sum, loan) => sum + loan.paidAmount, 0).toLocaleString()}
              </p>
              <p className="text-sm text-gray-600">Total Paid</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-orange-600">
                ₹{filteredLoans.reduce((sum, loan) => {
                  const total = calculateTotalAmount(loan.amount, loan.interestRate, loan.duration);
                  return sum + Math.max(0, total - loan.paidAmount);
                }, 0).toLocaleString()}
              </p>
              <p className="text-sm text-gray-600">Outstanding</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoansList;