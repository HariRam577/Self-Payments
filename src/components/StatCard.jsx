// components/StatCard.jsx - Statistics Card Component
import React from 'react';

const StatCard = ({ 
  title, 
  value, 
  icon: Icon, 
  color, 
  bgColor,
  subtitle, 
  isCurrency = false,
  trend = null,
  onClick = null
}) => {
  const formatValue = (val) => {
    if (isCurrency) {
      return `₹${val.toLocaleString()}`;
    }
    return typeof val === 'number' ? val.toLocaleString() : val;
  };

  return (
    <div 
      className={`bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all duration-200 ${
        onClick ? 'cursor-pointer hover:scale-105' : ''
      }`}
      onClick={onClick}
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-lg ${bgColor || 'bg-gray-50'}`}>
          <Icon className={`h-6 w-6 ${color}`} />
        </div>
        {trend && (
          <div className={`flex items-center gap-1 text-xs font-medium ${
            trend.isPositive ? 'text-green-600' : 'text-red-600'
          }`}>
            <span>{trend.isPositive ? '↗' : '↘'}</span>
            <span>{trend.percentage}%</span>
          </div>
        )}
      </div>
      
      <div>
        <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
        <p className={`text-2xl font-bold ${color} mb-1`}>
          {formatValue(value)}
        </p>
        {subtitle && (
          <p className="text-xs text-gray-500">{subtitle}</p>
        )}
      </div>

      {/* Progress indicator for certain cards */}
      {title === 'Collection Rate' && typeof value === 'number' && (
        <div className="mt-4">
          <div className="w-full bg-gray-200 rounded-full h-1">
            <div 
              className={`h-1 rounded-full transition-all duration-1000 ${
                color === 'text-green-600' ? 'bg-green-500' : 'bg-blue-500'
              }`}
              style={{ width: `${Math.min(value, 100)}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default StatCard;