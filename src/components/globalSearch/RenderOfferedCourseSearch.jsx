import React from 'react';
import { BookOpen, User, CalendarDays, Clock, MapPin, Users } from 'lucide-react';

export default function RenderOfferedCourseSearch({ data }) {
  if (!data?.length || !data) {
    return (
      <div className="rounded-lg shadow-md p-6 bg-white dark:bg-gray-800" key="offeredCourses">
        <div className="flex items-center gap-2 mb-4 border-b pb-2 text-gray-700 dark:text-gray-200">
          <BookOpen size={20} />
          <h5 className="text-lg font-semibold">Offered Courses</h5>
        </div>
        <div className="flex flex-col items-center justify-center py-8 text-center opacity-40">
          <BookOpen size={32} className="mb-3 opacity-30" />
          <p className="text-base">No offered courses found</p>
        </div>
      </div>
    );
  }

  // Sort offered courses by day and time
  const dayOrder = { 'MONDAY': 0, 'TUESDAY': 1, 'WEDNESDAY': 2, 'THURSDAY': 3, 'FRIDAY': 4, 'SATURDAY': 5, 'SUNDAY': 6 };
  const sortedOfferedCourses = [...data].sort((a, b) => {
    if (a.day !== b.day) {
      return dayOrder[a.day] - dayOrder[b.day];
    }
    return a.time.localeCompare(b.time);
  });

  // Format time from 24-hour format (e.g., "18:00:00") to 12-hour format (e.g., "6:00 PM")
  const formatTime = (timeStr) => {
    if (!timeStr) return 'N/A';
    const [hours, minutes] = timeStr.split(':');
    const hour = parseInt(hours, 10);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minutes} ${ampm}`;
  };

  return (
    <div className="rounded-lg shadow-md p-6 mb-5 bg-white dark:bg-gray-800" key="offeredCourses" >
      <div className="flex items-center gap-2 mb-4 border-b-2 border-gray-100 dark:border-gray-700 pb-2">
        <BookOpen size={20} className="text-indigo-600 dark:text-indigo-400" />
        <h5 className="text-lg font-semibold text-gray-800 dark:text-white">Offered Courses</h5>
        <span className="ml-auto bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 text-xs font-medium px-2.5 py-0.5 rounded-full">
          {data.length} found
        </span>
      </div>

      <div className="ml-5 divide-y divide-gray-100 dark:divide-gray-700">
        {sortedOfferedCourses.map((offeredCourse) => (
          <div 
            key={offeredCourse.id} 
            className="group hover:bg-gray-50 dark:hover:bg-gray-700 py-3 px-2 rounded-lg transition-colors"
          >
            <div className="flex items-center">
              <div className="flex-shrink-0 h-10 w-10 bg-indigo-50 dark:bg-indigo-900 rounded-full flex items-center justify-center text-indigo-500 dark:text-indigo-300">
                <BookOpen size={20} />
              </div>
              <div className="ml-4 flex-grow">
                <p className="text-sm font-medium text-gray-900 dark:text-white flex items-center justify-between">
                  <span>{offeredCourse.course?.name || 'Unknown Course'}</span>
                  <span className="text-xs font-normal text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-600 px-2 py-0.5 rounded">
                    {offeredCourse.course?.code || 'N/A'} - Group {offeredCourse.group}
                  </span>
                </p>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1 flex items-center">
                  <CalendarDays size={12} className="mr-1" />
                  <span className="mr-2">{offeredCourse.day}, {formatTime(offeredCourse.time)}</span>
                  {offeredCourse.semester && (
                    <>
                      <span className="mx-1">•</span>
                      <span>{offeredCourse.semester.name} {offeredCourse.semester.year}</span>
                    </>
                  )}
                </div>
              </div>
            </div>
            
            <div className="mt-2 ml-14 grid grid-cols-2 gap-2 text-xs text-gray-500 dark:text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity">
              {offeredCourse.teacher && (
                <div className="flex items-center">
                  <User size={12} className="mr-1" />
                  <span className="truncate">
                    {offeredCourse.teacher.firstName} {offeredCourse.teacher.lastName}
                  </span>
                </div>
              )}
              {offeredCourse.room && (
                <div className="flex items-center">
                  <MapPin size={12} className="mr-1" />
                  <span>Room {offeredCourse.room}</span>
                </div>
              )}
              {offeredCourse.size && (
                <div className="flex items-center">
                  <Users size={12} className="mr-1" />
                  <span>Class Size: {offeredCourse.size}</span>
                </div>
              )}
              {offeredCourse.course?.credit && (
                <div className="flex items-center">
                  <BookOpen size={12} className="mr-1" />
                  <span>{offeredCourse.course.credit} Credits</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}