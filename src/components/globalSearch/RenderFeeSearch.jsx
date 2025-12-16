import React from 'react';
import { CreditCard, DollarSign, User, Calendar, CreditCard as PaymentIcon, Tag, FileText } from 'lucide-react';

export default function RenderFeeSearch({ data }) {
  if (!data?.length || !data) {
    return (
      <div className="rounded-lg shadow-md p-6 bg-white dark:bg-gray-800" key="fees" >
        <div className="flex items-center gap-2 mb-4 border-b pb-2 text-gray-700 dark:text-gray-200">
          <DollarSign size={20} />
          <h5 className="text-lg font-semibold">Fees</h5>
        </div>
        <div className="flex flex-col items-center justify-center py-8 text-center opacity-40">
          <CreditCard size={32} className="mb-3 opacity-30" />
          <p className="text-base">No fee records found</p>
        </div>
      </div>
    );
  }

  // Sort fees by date, most recent first
  const sortedFees = [...data].sort((a, b) => 
    new Date(b.date) - new Date(a.date)
  );

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'RWF',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="rounded-lg shadow-md p-6 mb-5 bg-white dark:bg-gray-800" key="fees">
      <div className="flex items-center gap-2 mb-4 border-b-2 border-gray-100 dark:border-gray-700 pb-2">
        <DollarSign size={20} className="text-purple-600 dark:text-purple-400" />
        <h5 className="text-lg font-semibold text-gray-800 dark:text-white">Fees</h5>
        <span className="ml-auto bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 text-xs font-medium px-2.5 py-0.5 rounded-full">
          {data.length} found
        </span>
      </div>

      <div className="ml-5 divide-y divide-gray-100 dark:divide-gray-700">
        {sortedFees.map((fee) => (
          <div 
            key={fee.id} 
            className="group hover:bg-gray-50 dark:hover:bg-gray-700 py-3 px-2 rounded-lg transition-colors"
          >
            <div className="flex items-center">
              <div className="flex-shrink-0 h-10 w-10 bg-purple-50 dark:bg-purple-900 rounded-full flex items-center justify-center text-purple-500 dark:text-purple-300">
                <PaymentIcon size={20} />
              </div>
              <div className="ml-4 flex-grow">
                <p className="text-sm font-medium text-gray-900 dark:text-white flex items-center justify-between">
                  <span>{formatCurrency(fee.amount)}</span>
                  <span className="text-xs font-normal text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-600 px-2 py-0.5 rounded">
                    {formatDate(fee.date)}
                  </span>
                </p>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1 flex items-center">
                  <User size={12} className="mr-1" />
                  <span>
                    {fee.student?.firstName} {fee.student?.lastName} 
                    {fee.student?.id && ` (ID: ${fee.student.id})`}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="mt-2 ml-14 grid grid-cols-1 gap-2 text-xs text-gray-500 dark:text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity">
              {fee.student?.department && (
                <div className="flex items-center">
                  <FileText size={12} className="mr-1" />
                  <span>{fee.student.department.name}</span>
                </div>
              )}
              {fee.student?.program && (
                <div className="flex items-center">
                  <Tag size={12} className="mr-1" />
                  <span>{fee.student.program} Program</span>
                </div>
              )}
              {fee.student?.status && (
                <div className="flex items-center">
                  <div className={`h-2 w-2 rounded-full mr-1 ${
                    fee.student.status === 'ACTIVE' ? 'bg-green-500' : 'bg-gray-500'
                  }`}></div>
                  <span>Student Status: {fee.student.status}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}