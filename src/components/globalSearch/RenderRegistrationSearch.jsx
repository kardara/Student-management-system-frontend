import React from 'react';
import { ClipboardList, User, BookOpen, Calendar, Clock, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function RenderRegistrationSearch({ data }) {

  const navigate = useNavigate();

  const pathname = window.location.pathname.split("/");
  pathname.splice(2);
  pathname.push("registration/view/");

  if (!data?.length || !data) {
    return (
      <div className="rounded-lg shadow-md p-6 bg-white dark:bg-gray-800" key={"registrations"}>
        <div className="flex items-center gap-2 mb-4 border-b pb-2 text-gray-700 dark:text-gray-200">
          <ClipboardList size={20} />
          <h5 className="text-lg font-semibold">Registrations</h5>
        </div>
        <div className="flex flex-col items-center justify-center py-8 text-center opacity-40">
          <ClipboardList size={32} className="mb-3 opacity-30" />
          <p className="text-base">No registrations found</p>
        </div>
      </div>
    );
  }

  // Sort registrations by date, most recent first
  const sortedRegistrations = [...data].sort((a, b) =>
    new Date(b.date) - new Date(a.date)
  );

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="rounded-lg shadow-md p-6 mb-5 bg-white dark:bg-gray-800" key={"registrations"}>
      <div className="flex items-center gap-2 mb-4 border-b-2 border-gray-100 dark:border-gray-700 pb-2">
        <ClipboardList size={20} className="text-orange-600 dark:text-orange-400" />
        <h5 className="text-lg font-semibold text-gray-800 dark:text-white">Registrations</h5>
        <span className="ml-auto bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200 text-xs font-medium px-2.5 py-0.5 rounded-full">
          {data.length} found
        </span>
      </div>

      <div className="ml-5 divide-y divide-gray-100 dark:divide-gray-700">
        {sortedRegistrations.map((registration) => (
          <div
            key={registration.id}
            className="group hover:bg-gray-50 dark:hover:bg-gray-700 py-3 px-2 rounded-lg transition-colors"
            onClick={() => navigate(pathname.join("/") + registration.student.id)}

          >
            <div className="flex items-center">
              <div className="flex-shrink-0 h-10 w-10 bg-orange-50 dark:bg-orange-900 rounded-full flex items-center justify-center text-orange-500 dark:text-orange-300">
                <ClipboardList size={20} />
              </div>
              <div className="ml-4 flex-grow">
                <p className="text-sm font-medium text-gray-900 dark:text-white flex items-center justify-between">
                  <span>
                    {registration.student?.firstName} {registration.student?.lastName}
                  </span>
                  <span className="text-xs font-normal text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-600 px-2 py-0.5 rounded">
                    {formatDate(registration.date)}
                  </span>
                </p>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1 flex items-center">
                  <Calendar size={12} className="mr-1" />
                  <span className="mr-2">
                    {registration.semester?.name} {registration.semester?.year}
                  </span>
                  {registration.student?.department && (
                    <>
                      <span className="mx-1">•</span>
                      <span>{registration.student.department.name}</span>
                    </>
                  )}
                </div>
              </div>
            </div>

            {registration.courses && registration.courses.length > 0 && (
              <div className="mt-2 ml-14 grid grid-cols-1 gap-2 text-xs text-gray-500 dark:text-gray-400">
                <div className="font-medium mb-1">Enrolled Courses:</div>
                {registration.courses.map((course, idx) => (
                  <div key={idx} className="pl-2 border-l-2 border-orange-100 dark:border-orange-800">
                    <div className="flex justify-between mb-1">
                      <span className="font-medium">{course.course?.code}: {course.course?.name}</span>
                      <span className="text-xs bg-orange-50 dark:bg-orange-900 text-orange-700 dark:text-orange-300 px-1.5 py-0.5 rounded">
                        Group {course.group}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-1">
                      <div className="flex items-center">
                        <MapPin size={10} className="mr-1" />
                        <span>Room {course.room}</span>
                      </div>
                      <div className="flex items-center">
                        <Calendar size={10} className="mr-1" />
                        <span>{course.day}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock size={10} className="mr-1" />
                        <span>{course.time}</span>
                      </div>
                      {course.teacher && (
                        <div className="flex items-center">
                          <User size={10} className="mr-1" />
                          <span>{course.teacher.firstName} {course.teacher.lastName}</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}