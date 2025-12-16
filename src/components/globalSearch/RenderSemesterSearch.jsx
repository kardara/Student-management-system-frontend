import React from 'react';
import { Calendar, CalendarClock, CheckCircle, XCircle, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function RenderSemesterSearch({ data }) {

  const navigate = useNavigate();

  if (!data?.length || !data) {
    return (
      <div className="rounded-lg shadow-md p-6 bg-white dark:bg-gray-800" key={"semesters"}>
        <div className="flex items-center gap-2 mb-4 border-b pb-2 text-gray-700 dark:text-gray-200">
          <Calendar size={20} />
          <h5 className="text-lg font-semibold">Semesters</h5>
        </div>
        <div className="flex flex-col items-center justify-center py-8 text-center opacity-40">
          <CalendarClock size={32} className="mb-3 opacity-30" />
          <p className="text-base">No semesters found</p>
        </div>
      </div>
    );
  }

  // Sort semesters by year and then by name
  const sortedSemesters = [...data].sort((a, b) => {
    if (a.year !== b.year) {
      return b.year - a.year; // Most recent years first
    }
    // Custom sort for semester names: FALL, SUMMER, WINTER
    const semesterOrder = { 'FALL': 0, 'SUMMER': 1, 'WINTER': 2 };
    return semesterOrder[a.name] - semesterOrder[b.name];
  });

  const formatDate = (dateStr) => {
    if (!dateStr) return 'N/A';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <div className="rounded-lg shadow-md p-6 mb-5 bg-white dark:bg-gray-800" key={"semesters"}>
      <div className="flex items-center gap-2 mb-4 border-b-2 border-gray-100 dark:border-gray-700 pb-2">
        <Calendar size={20} className="text-amber-600 dark:text-amber-400" />
        <h5 className="text-lg font-semibold text-gray-800 dark:text-white">Semesters</h5>
        <span className="ml-auto bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-200 text-xs font-medium px-2.5 py-0.5 rounded-full">
          {data.length} found
        </span>
      </div>

      <div className="ml-5 divide-y divide-gray-100 dark:divide-gray-700">
        {sortedSemesters.map((semester) => (
          <div 
            key={semester.id} 
            className="group hover:bg-gray-50 dark:hover:bg-gray-700 py-3 px-2 rounded-lg transition-colors"
          >
            <div className="flex items-center">
              <div className="flex-shrink-0 h-10 w-10 bg-amber-50 dark:bg-amber-900 rounded-full flex items-center justify-center text-amber-500 dark:text-amber-300">
                <CalendarClock size={20} />
              </div>
              <div className="ml-4 flex-grow">
                <p className="text-sm font-medium text-gray-900 dark:text-white flex items-center justify-between">
                  <span>{semester.name} {semester.year}</span>
                  <span className={`text-xs font-medium px-2 py-0.5 rounded ${
                    semester.status === 'ACTIVE' 
                      ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200' 
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                  }`}>
                    {semester.status}
                  </span>
                </p>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1 flex items-center">
                  <Clock size={12} className="mr-1" />
                  <span>
                    {formatDate(semester.startDate)} - {formatDate(semester.endDate)}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="mt-2 ml-14 grid grid-cols-1 gap-2 text-xs text-gray-500 dark:text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="flex items-center">
                {semester.status === 'ACTIVE' ? (
                  <>
                    <CheckCircle size={12} className="mr-1 text-green-500" />
                    <span>Currently active semester</span>
                  </>
                ) : (
                  <>
                    <XCircle size={12} className="mr-1 text-gray-500" />
                    <span>Inactive semester</span>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}