// components/Reports.jsx - Reports and Analytics Component
import React, { useState } from 'react';
import { BarChart3, PieChart, TrendingUp, Download, Calendar, Filter, DollarSign } from 'lucide-react';

const Reports = ({ loans, stats, calculateTotalAmount, getLoanStatus }) => {
  const [reportPeriod, setReportPeriod] = useState('all');
  const [reportType, setReportType] = useState('overview');

  // Filter loans by period
  const getFilteredLoans = () => {
    if (reportPeriod === 'all') return loans;
    
    const now = new Date();
    const cutoffDate = new Date();
    
    switch (reportPeriod) {
      case 'month':
        cutoffDate.setMonth(now.getMonth() - 1);
        break;
      case 'quarter':
        cutoffDate.setMonth(now.getMonth() - 3);
        break;
      case 'year':
        cutoffDate.setFullYear(now.getFullYear() - 1);
        break;
      default:
        return loans;
    }
    
    return loans.filter(loan => new Date(loan.startDate) >= cutoffDate);
  };

  const filteredLoans = getFilteredLoans();

  // Calculate detailed statistics
  const getDetailedStats = () => {
    const totalLent = filteredLoans.reduce((sum, loan) => sum + loan.amount, 0);
    const totalReceived = filteredLoans.reduce((sum, loan) => sum + loan.paidAmount, 0);
    const totalInterestExpected = filteredLoans.reduce((sum, loan) => {
      return sum + (calculateTotalAmount(loan.amount, loan.interestRate, loan.duration) - loan.amount);
    }, 0);
    const totalInterestReceived = Math.max(0, totalReceived - totalLent);

    const statusBreakdown = {
      active: filteredLoans.filter(loan => getLoanStatus(loan) === 'active').length,
      completed: filteredLoans.filter(loan => getLoanStatus(loan) === 'completed').length,
      overdue: filteredLoans.filter(loan => getLoanStatus(loan) === 'overdue').length
    };

    const paymentGatewayBreakdown = filteredLoans.reduce((acc, loan) => {
      acc[loan.paymentGateway] = (acc[loan.paymentGateway] || 0) + 1;
      return acc;
    }, {});

    return {
      totalLent,
      totalReceived,
      totalInterestExpected,
      totalInterestReceived,
      collectionRate: totalLent > 0 ? (totalReceived / totalLent) * 100 : 0,
      averageLoanAmount: filteredLoans.length > 0 ? totalLent / filteredLoans.length : 0,
      statusBreakdown,
      paymentGatewayBreakdown
    };
  };

  const detailedStats = getDetailedStats();

  // Generate monthly trend data
  const getMonthlyTrends = () => {
    const monthlyData = {};
    
    filteredLoans.forEach(loan => {
      const month = new Date(loan.startDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
      if (!monthlyData[month]) {
        monthlyData[month] = { loans: 0, amount: 0, payments: 0 };
      }
      monthlyData[month].loans += 1;
      monthlyData[month].amount += loan.amount;
      monthlyData[month].payments += loan.paidAmount;
    });

    return Object.entries(monthlyData)
      .sort(([a], [b]) => new Date(a) - new Date(b))
      .slice(-6); // Last 6 months
  };

  const monthlyTrends = getMonthlyTrends();

  const exportReport = () => {
    const reportData = {
      period: reportPeriod,
      generatedAt: new Date().toISOString(),
      summary: detailedStats,
      loans: filteredLoans.map(loan => ({
        id: loan.id,
        borrowerName: loan.borrowerName,
        amount: loan.amount,
        paidAmount: loan.paidAmount,
        status: getLoanStatus(loan),
        startDate: loan.startDate,
        dueDate: loan.dueDate
      }))
    };
    
    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `loan-report-${reportPeriod}-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Financial Reports</h2>
          <p className="text-gray-500 mt-1">Comprehensive loan portfolio analytics</p>
        </div>
        
        <div className="flex items-center gap-3">
          <select
            value={reportPeriod}
            onChange={(e) => setReportPeriod(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Time</option>
            <option value="year">Last Year</option>
            <option value="quarter">Last Quarter</option>
            <option value="month">Last Month</option>
          </select>
          
          <button
            onClick={exportReport}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <Download className="h-4 w-4" />
            Export
          </button>
        </div>
      </div>

      {/* Report Type Tabs */}
      <div className="flex gap-2 border-b border-gray-200">
        {[
          { key: 'overview', label: 'Overview', icon: BarChart3 },
          { key: 'performance', label: 'Performance', icon: TrendingUp },
          { key: 'breakdown', label: 'Breakdown', icon: PieChart }
        ].map(tab => (
          <button
            key={tab.key}
            onClick={() => setReportType(tab.key)}
            className={`flex items-center gap-2 px-4 py-3 font-medium transition-colors border-b-2 ${
              reportType === tab.key
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            <tab.icon className="h-4 w-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Overview Report */}
      {reportType === 'overview' && (
        <div className="space-y-8">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <DollarSign className="h-6 w-6 text-blue-600" />
                </div>
              </div>
              <h3 className="text-sm font-medium text-gray-600">Total Portfolio</h3>
              <p className="text-2xl font-bold text-gray-900">₹{detailedStats.totalLent.toLocaleString()}</p>
              <p className="text-sm text-gray-500 mt-1">{filteredLoans.length} loans</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-green-50 rounded-lg">
                  <TrendingUp className="h-6 w-6 text-green-600" />
                </div>
              </div>
              <h3 className="text-sm font-medium text-gray-600">Collection Rate</h3>
              <p className="text-2xl font-bold text-gray-900">{detailedStats.collectionRate.toFixed(1)}%</p>
              <p className="text-sm text-gray-500 mt-1">₹{detailedStats.totalReceived.toLocaleString()} collected</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-purple-50 rounded-lg">
                  <BarChart3 className="h-6 w-6 text-purple-600" />
                </div>
              </div>
              <h3 className="text-sm font-medium text-gray-600">Average Loan</h3>
              <p className="text-2xl font-bold text-gray-900">₹{detailedStats.averageLoanAmount.toLocaleString()}</p>
              <p className="text-sm text-gray-500 mt-1">Per borrower</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-orange-50 rounded-lg">
                  <Calendar className="h-6 w-6 text-orange-600" />
                </div>
              </div>
              <h3 className="text-sm font-medium text-gray-600">Interest Earned</h3>
              <p className="text-2xl font-bold text-gray-900">₹{detailedStats.totalInterestReceived.toLocaleString()}</p>
              <p className="text-sm text-gray-500 mt-1">
                {detailedStats.totalInterestExpected > 0 ? 
                  `${((detailedStats.totalInterestReceived / detailedStats.totalInterestExpected) * 100).toFixed(1)}% of expected` : 
                  'No interest yet'
                }
              </p>
            </div>
          </div>

          {/* Monthly Trends */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-6">Monthly Trends</h3>
            
            {monthlyTrends.length > 0 ? (
              <div className="space-y-4">
                {monthlyTrends.map(([month, data]) => (
                  <div key={month} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="font-medium text-gray-800">{month}</h4>
                      <p className="text-sm text-gray-500">{data.loans} loans created</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">₹{data.amount.toLocaleString()}</p>
                      <p className="text-sm text-green-600">₹{data.payments.toLocaleString()} collected</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500">No trend data available</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Performance Report */}
      {reportType === 'performance' && (
        <div className="space-y-8">
          {/* Performance Metrics */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-6">Portfolio Performance</h3>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Collection Efficiency */}
              <div>
                <h4 className="font-medium text-gray-700 mb-4">Collection Efficiency</h4>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Overall Collection Rate</span>
                      <span className="font-semibold">{detailedStats.collectionRate.toFixed(1)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div 
                        className="bg-green-500 h-3 rounded-full transition-all duration-1000"
                        style={{ width: `${Math.min(detailedStats.collectionRate, 100)}%` }}
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 pt-4">
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <p className="text-sm text-gray-600">Collected</p>
                      <p className="text-xl font-bold text-green-600">₹{detailedStats.totalReceived.toLocaleString()}</p>
                    </div>
                    <div className="text-center p-4 bg-red-50 rounded-lg">
                      <p className="text-sm text-gray-600">Outstanding</p>
                      <p className="text-xl font-bold text-red-600">₹{(detailedStats.totalLent - detailedStats.totalReceived).toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Interest Performance */}
              <div>
                <h4 className="font-medium text-gray-700 mb-4">Interest Performance</h4>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <p className="text-sm text-gray-600">Expected Interest</p>
                      <p className="text-xl font-bold text-blue-600">₹{detailedStats.totalInterestExpected.toLocaleString()}</p>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                      <p className="text-sm text-gray-600">Earned Interest</p>
                      <p className="text-xl font-bold text-purple-600">₹{detailedStats.totalInterestReceived.toLocaleString()}</p>
                    </div>
                  </div>
                  
                  <div className="pt-2">
                    <div className="flex justify-between text-sm mb-2">
                      <span>Interest Collection Rate</span>
                      <span className="font-semibold">
                        {detailedStats.totalInterestExpected > 0 ? 
                          `${((detailedStats.totalInterestReceived / detailedStats.totalInterestExpected) * 100).toFixed(1)}%` : 
                          '0%'
                        }
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div 
                        className="bg-purple-500 h-3 rounded-full transition-all duration-1000"
                        style={{ 
                          width: `${detailedStats.totalInterestExpected > 0 ? 
                            Math.min((detailedStats.totalInterestReceived / detailedStats.totalInterestExpected) * 100, 100) : 0}%` 
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Loan Status Performance */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-6">Loan Status Distribution</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-blue-50 rounded-lg">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-blue-600">{detailedStats.statusBreakdown.active}</span>
                </div>
                <h4 className="font-semibold text-gray-800">Active Loans</h4>
                <p className="text-sm text-gray-600">Currently ongoing</p>
              </div>
              
              <div className="text-center p-6 bg-green-50 rounded-lg">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-green-600">{detailedStats.statusBreakdown.completed}</span>
                </div>
                <h4 className="font-semibold text-gray-800">Completed</h4>
                <p className="text-sm text-gray-600">Fully paid</p>
              </div>
              
              <div className="text-center p-6 bg-red-50 rounded-lg">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-red-600">{detailedStats.statusBreakdown.overdue}</span>
                </div>
                <h4 className="font-semibold text-gray-800">Overdue</h4>
                <p className="text-sm text-gray-600">Past due date</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Breakdown Report */}
      {reportType === 'breakdown' && (
        <div className="space-y-8">
          {/* Payment Gateway Analysis */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-6">Payment Gateway Usage</h3>
            
            <div className="space-y-4">
              {Object.entries(detailedStats.paymentGatewayBreakdown).map(([gateway, count]) => {
                const percentage = filteredLoans.length > 0 ? (count / filteredLoans.length) * 100 : 0;
                return (
                  <div key={gateway} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-4 bg-blue-500 rounded"></div>
                      <span className="font-medium text-gray-800 capitalize">{gateway}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-500 h-2 rounded-full transition-all duration-1000"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium text-gray-600 w-20 text-right">
                        {count} ({percentage.toFixed(0)}%)
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Top Borrowers */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-6">Top Borrowers</h3>
            
            <div className="space-y-4">
              {filteredLoans
                .reduce((acc, loan) => {
                  const existing = acc.find(item => item.email === loan.borrowerEmail);
                  if (existing) {
                    existing.totalAmount += loan.amount;
                    existing.totalPaid += loan.paidAmount;
                    existing.loanCount += 1;
                  } else {
                    acc.push({
                      name: loan.borrowerName,
                      email: loan.borrowerEmail,
                      totalAmount: loan.amount,
                      totalPaid: loan.paidAmount,
                      loanCount: 1
                    });
                  }
                  return acc;
                }, [])
                .sort((a, b) => b.totalAmount - a.totalAmount)
                .slice(0, 5)
                .map((borrower, index) => (
                  <div key={borrower.email} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-sm font-semibold text-blue-600">#{index + 1}</span>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-800">{borrower.name}</h4>
                        <p className="text-sm text-gray-500">{borrower.loanCount} loan{borrower.loanCount !== 1 ? 's' : ''}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">₹{borrower.totalAmount.toLocaleString()}</p>
                      <p className="text-sm text-green-600">₹{borrower.totalPaid.toLocaleString()} paid</p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reports;