// components/Dashboard.jsx - Dashboard Overview Component
import React from "react";
import StatCard from "./StatCard";
import LoanCard from "../cards/LoanCard";
import { Clock, TrendingUp, CheckCircle, AlertCircle } from "lucide-react";

const Dashboard = ({
  loans,
  stats,
  calculateTotalAmount,
  getLoanStatus,
  recordPayment,
  sendReminder,
}) => {
  const recentLoans = loans.slice(0, 4);

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-white">
        <h2 className="text-3xl font-bold mb-2">Welcome back!</h2>
        <p className="text-blue-100 text-lg">
          Here's your loan portfolio overview
        </p>
      </div>

      {/* Stats Grid */}
      <div>
        <h3 className="text-xl font-semibold text-gray-800 mb-6">
          Portfolio Overview
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Active Loans"
            value={stats.activeLoans}
            icon={Clock}
            color="text-blue-600"
            bgColor="bg-blue-50"
            subtitle="Currently ongoing"
          />
          <StatCard
            title="Total Lent"
            value={stats.totalLent}
            icon={TrendingUp}
            color="text-green-600"
            bgColor="bg-green-50"
            subtitle="Principal amount"
            isCurrency={true}
          />
          <StatCard
            title="Total Received"
            value={stats.totalReceived}
            icon={CheckCircle}
            color="text-emerald-600"
            bgColor="bg-emerald-50"
            subtitle="Payments received"
            isCurrency={true}
          />
          <StatCard
            title="Pending Amount"
            value={stats.pendingAmount}
            icon={AlertCircle}
            color="text-red-600"
            bgColor="bg-red-50"
            subtitle="Outstanding balance"
            isCurrency={true}
          />
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Quick Actions
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all duration-200 group">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-blue-200 transition-colors">
                {/* <Plus className="h-6 w-6 text-blue-600" /> */}
              </div>
              <h4 className="font-medium text-gray-800">Add New Loan</h4>
              <p className="text-sm text-gray-500">Create a new loan record</p>
            </div>
          </button>

          <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-500 hover:bg-green-50 transition-all duration-200 group">
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-green-200 transition-colors">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <h4 className="font-medium text-gray-800">Record Payment</h4>
              <p className="text-sm text-gray-500">Update payment status</p>
            </div>
          </button>

          <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-all duration-200 group">
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-purple-200 transition-colors">
                <TrendingUp className="h-6 w-6 text-purple-600" />
              </div>
              <h4 className="font-medium text-gray-800">View Reports</h4>
              <p className="text-sm text-gray-500">Financial analytics</p>
            </div>
          </button>
        </div>
      </div>

      {/* Recent Loans */}
      <div>
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold text-gray-800">Recent Loans</h3>
          <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
            View All →
          </button>
        </div>

        {recentLoans.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {recentLoans.map((loan) => (
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
              {/* <DollarSign className="h-8 w-8 text-gray-400" /> */}
            </div>
            <h4 className="text-lg font-medium text-gray-800 mb-2">
              No loans yet
            </h4>
            <p className="text-gray-500 mb-6">
              Start by creating your first loan to track payments and interest
            </p>
            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors">
              Create First Loan
            </button>
          </div>
        )}
      </div>

      {/* Portfolio Performance */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-6">
          Portfolio Performance
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h4 className="font-medium text-gray-700 mb-4">Collection Rate</h4>
            <div className="space-y-3">
              {stats.totalLent > 0 && (
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Payment Progress</span>
                    <span>
                      {((stats.totalReceived / stats.totalLent) * 100).toFixed(
                        1
                      )}
                      %
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-green-500 h-3 rounded-full transition-all duration-1000"
                      style={{
                        width: `${Math.min(
                          (stats.totalReceived / stats.totalLent) * 100,
                          100
                        )}%`,
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          <div>
            <h4 className="font-medium text-gray-700 mb-4">
              Loan Distribution
            </h4>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Active Loans</span>
                <span className="font-medium">{stats.activeLoans}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Average Loan Amount</span>
                <span className="font-medium">
                  ₹
                  {loans.length > 0
                    ? (stats.totalLent / loans.length).toLocaleString()
                    : "0"}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Total Interest Expected</span>
                <span className="font-medium text-green-600">
                  ₹{(stats.totalLent * 0.05).toLocaleString()}{" "}
                  {/* Assuming 5% average */}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
