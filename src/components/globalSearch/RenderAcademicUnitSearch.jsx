import React from 'react';
import { BookOpen } from 'lucide-react';

export default function RenderAcademicUnits({ data }) {
  if (!data?.length || !data) {
    return (
      <div className="rounded-lg shadow-md p-6 bg-white dark:bg-gray-800" key="academicUnits">
        <div className="flex items-center gap-2 mb-4 border-b pb-2 text-gray-700 dark:text-gray-200">
          <BookOpen size={20} />
          <h5 className="text-lg font-semibold">Academic Units</h5>
        </div>
        <div className="flex flex-col items-center justify-center py-8 text-center opacity-40">
          <BookOpen size={32} className="mb-3 opacity-30" />
          <p className="text-base">No academic units found</p>
        </div>
      </div>
    );
  }

  // Sort units by name for display
  const sortedUnits = [...data].sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className="rounded-lg shadow-md p-6 mb-5 bg-white dark:bg-gray-800" key="academicUnits">
      <div className="flex items-center gap-2 mb-4 border-b-2 border-gray-100 dark:border-gray-700 pb-2">
        <BookOpen size={20} className="text-blue-600 dark:text-blue-400" />
        <h5 className="text-lg font-semibold text-gray-800 dark:text-white">Academic Units</h5>
        <span className="ml-auto bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs font-medium px-2.5 py-0.5 rounded-full">
          {data.length} found
        </span>
      </div>

      <div className="ml-5 divide-y divide-gray-100 dark:divide-gray-700">
        {sortedUnits.map((unit) => (
          <div
            key={unit.id}
            className="group hover:bg-gray-50 dark:hover:bg-gray-700 py-3 px-2 rounded-lg transition-colors"
          >
            <div className="flex items-center">
              <div className="flex-shrink-0 h-10 w-10 bg-blue-50 dark:bg-blue-900 rounded-full flex items-center justify-center text-blue-500 dark:text-blue-300">
                <BookOpen size={20} />
              </div>
              <div className="ml-4 flex-grow">
                <p className="text-sm font-medium text-gray-900 dark:text-white flex items-center justify-between">
                  <span>{unit.name}</span>
                  <span className="text-xs font-normal text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-600 px-2 py-0.5 rounded">
                    {unit.type}
                  </span>
                </p>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Code: <span className="font-medium">{unit.code}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
