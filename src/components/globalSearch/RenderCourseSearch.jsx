import React from 'react';
import { BookOpen, Users, Clock, MapPin, Calendar, Tag, Info, Award } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function RenderCourseSearch({ data }) {

   const navigate = useNavigate();

  const pathname = window.location.pathname.split("/");
  pathname.splice(2);
  pathname.push("courses/view/");

  if (!data?.length || !data) {
    return (
      <div className="rounded-lg shadow-md p-6 bg-white dark:bg-gray-800" key="courses">
        <div className="flex items-center gap-2 mb-4 border-b pb-2 text-gray-700 dark:text-gray-200">
          <BookOpen size={20} />
          <h5 className="text-lg font-semibold">Courses</h5>
        </div>
        <div className="flex flex-col items-center justify-center py-8 text-center opacity-40">
          <BookOpen size={32} className="mb-3 opacity-30" />
          <p className="text-base">No courses found</p>
        </div>
      </div>
    );
  }

  // Sort courses by code for better organization
  const sortedCourses = [...data].sort((a, b) => 
    a.code.localeCompare(b.code)
  );

  return (
    <div className="rounded-lg shadow-md p-6 mb-5 bg-white dark:bg-gray-800" key="courses" >
      <div className="flex items-center gap-2 mb-4 border-b-2 border-gray-100 dark:border-gray-700 pb-2">
        <BookOpen size={20} className="text-green-600 dark:text-green-400" />
        <h5 className="text-lg font-semibold text-gray-800 dark:text-white">Courses</h5>
        <span className="ml-auto bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-xs font-medium px-2.5 py-0.5 rounded-full">
          {data.length} found
        </span>
      </div>

      <div className="ml-5 divide-y divide-gray-100 dark:divide-gray-700">
        {sortedCourses.map((course) => (
          <div 
            key={course.id} 
            className="group hover:bg-gray-50 dark:hover:bg-gray-700 py-3 px-2 rounded-lg transition-colors"
            onClick={() => navigate(pathname.join("/")+course.id)}
          >
            <div className="flex items-center">
              <div className="flex-shrink-0 h-10 w-10 bg-green-50 dark:bg-green-900 rounded-full flex items-center justify-center text-green-500 dark:text-green-300">
                <BookOpen size={20} />
              </div>
              <div className="ml-4 flex-grow">
                <p className="text-sm font-medium text-gray-900 dark:text-white flex items-center justify-between">
                  <span>{course.name}</span>
                  <span className="text-xs font-normal text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-600 px-2 py-0.5 rounded">
                    {course.code}
                  </span>
                </p>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1 flex items-center">
                  <Award size={12} className="mr-1" />
                  <span className="mr-2">{course.credit} Credits</span>
                  {course.academicUnit && (
                    <>
                      <span className="mx-1">•</span>
                      <span>{course.academicUnit.name}</span>
                    </>
                  )}
                </div>
              </div>
            </div>
            
            <div className="mt-2 ml-14 grid grid-cols-1 gap-2 text-xs text-gray-500 dark:text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity">
              {course.description && (
                <div className="flex items-start">
                  <Info size={12} className="mr-1 mt-0.5 flex-shrink-0" />
                  <span className="line-clamp-2">{course.description}</span>
                </div>
              )}
              
              {course.prerequisites && course.prerequisites.length > 0 && (
                <div className="flex items-center">
                  <Tag size={12} className="mr-1" />
                  <span>
                    Prerequisites: {course.prerequisites.map(prereq => prereq.code).join(', ')}
                  </span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}