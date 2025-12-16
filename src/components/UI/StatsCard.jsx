import React from 'react';

const StatsCard = ({ title, value, icon, change, className = '' }) => {
  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 transition-all duration-300 hover:shadow-md ${className}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</p>
          <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">{value}</p>
          
          {change && (
            <div className="mt-2 flex items-center">
              <span 
                className={`text-sm font-medium ${
                  change.type === 'increase' 
                    ? 'text-green-600 dark:text-green-400' 
                    : 'text-red-600 dark:text-red-400'
                }`}
              >
                {change.type === 'increase' ? '+' : '-'}{change.value}
              </span>
              <span className="ml-1 text-xs text-gray-500 dark:text-gray-400">from previous period</span>
            </div>
          )}
        </div>
        
        <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-full">
          {React.cloneElement(icon, { 
            className: 'w-6 h-6 text-blue-600 dark:text-blue-400' 
          })}
        </div>
      </div>
    </div>
  );
};

export default StatsCard;