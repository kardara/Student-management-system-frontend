import React from 'react';
import { User, Users, Mail, Phone, MapPin, Calendar, BookOpen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function RenderStudentSearch({ data }) {

  const navigate = useNavigate();

  const pathname = window.location.pathname.split("/");
  pathname.splice(2);
  pathname.push("students/view/");
  
  if (!data?.length || !data) {
    return (
      <div className="rounded-lg shadow-md p-6 bg-white dark:bg-gray-800"  key={"students"}>
        <div className="flex items-center gap-2 mb-4 border-b pb-2 text-gray-700 dark:text-gray-200">
          <Users size={20} />
          <h5 className="text-lg font-semibold">Students</h5>
        </div>
        <div className="flex flex-col items-center justify-center py-8 text-center opacity-40">
          <User size={32} className="mb-3 opacity-30" />
          <p className="text-base">No students found</p>
        </div>
      </div>
    );
  }

  // Sort students by firstName for better organization
  const sortedStudents = [...data].sort((a, b) => 
    a.firstName.localeCompare(b.firstName) || a.lastName.localeCompare(b.lastName)
  );

  return (
    <div className="rounded-lg shadow-md p-6 mb-5 bg-white dark:bg-gray-800" key={"students"} >
      <div className="flex items-center gap-2 mb-4 border-b-2 border-gray-100 dark:border-gray-700 pb-2">
        <Users size={20} className="text-blue-600 dark:text-blue-400" />
        <h5 className="text-lg font-semibold text-gray-800 dark:text-white">Students</h5>
        <span className="ml-auto bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs font-medium px-2.5 py-0.5 rounded-full">
          {data.length} found
        </span>
      </div>

      <div className="ml-5 divide-y divide-gray-100 dark:divide-gray-700">
        {sortedStudents.map((student) => (
          <div 
            key={student.id} 
            className="group hover:bg-gray-50 dark:hover:bg-gray-700 py-3 px-2 rounded-lg transition-colors"
            onClick={() => navigate(pathname.join("/")+student.id, { state: { student } })}
          >
            <div className="flex items-center">
              <div className="flex-shrink-0 h-10 w-10 bg-blue-50 dark:bg-blue-900 rounded-full flex items-center justify-center text-blue-500 dark:text-blue-300">
                <User size={20} />
              </div>
              <div className="ml-4 flex-grow">
                <p className="text-sm font-medium text-gray-900 dark:text-white flex items-center justify-between">
                  <span>{student.firstName} {student.lastName}</span>
                  <span className="text-xs font-normal text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-600 px-2 py-0.5 rounded">
                    ID: {student.id}
                  </span>
                </p>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1 flex items-center">
                  <BookOpen size={12} className="mr-1" />
                  <span className="mr-2">{student.department?.name || 'No Department'}</span>
                  {student.program && (
                    <>
                      <span className="mx-1">•</span>
                      <span>{student.program} Program</span>
                    </>
                  )}
                </div>
              </div>
            </div>
            
            <div className="mt-2 ml-14 grid grid-cols-2 gap-2 text-xs text-gray-500 dark:text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity">
              {student.email && (
                <div className="flex items-center">
                  <Mail size={12} className="mr-1" />
                  <span className="truncate">{student.email}</span>
                </div>
              )}
              {student.phone && (
                <div className="flex items-center">
                  <Phone size={12} className="mr-1" />
                  <span>{student.phone}</span>
                </div>
              )}
              {student.address && (
                <div className="flex items-center">
                  <MapPin size={12} className="mr-1" />
                  <span className="truncate">{student.address}</span>
                </div>
              )}
              {student.status && (
                <div className="flex items-center">
                  <div className={`h-2 w-2 rounded-full mr-1 ${
                    student.status === 'ACTIVE' ? 'bg-green-500' : 'bg-gray-500'
                  }`}></div>
                  <span>{student.status}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}