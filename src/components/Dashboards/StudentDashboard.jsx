import React, { useEffect, useState } from "react";
import Table from "../UI/Table";
import Announcements from "../UI/Announcements";
import GlobalSearchField from "../globalSearch/GlobalSearchField";
import { manageStudentRegistrationService } from "../../services/manageStudentRegistrationService";
import { useAuth } from "../../contexts/AuthContext";

export default function StudentDashboard() {
  const context = useAuth();
  const currentSemester = JSON.parse(localStorage.getItem("semester"));
  const [registrations, setRegistrations] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    manageStudentRegistrationService
      .getStudent(context.user.id)
      .then((resp) => {
        console.log(resp);
        setRegistrations(resp);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching registration data:", error);
        setLoading(false);
      });
  }, [context.user.id]);

  // Transform registration data for table display
  const transformCourseData = (registrations) => {
    if (!registrations || !registrations.courses) return [];

    return registrations.courses.map((courseReg) => ({
      code: courseReg.course.code,
      name: courseReg.course.name,
      day:
        courseReg.day.charAt(0).toUpperCase() +
        courseReg.day.slice(1).toLowerCase(),
      hour: courseReg.time.slice(0, 5),
      teacher: `${courseReg.teacher.firstName} ${courseReg.teacher.lastName}`,
      credit: courseReg.course.credit,
      group: courseReg.group,
      room: courseReg.room,
    }));
  };

  const headers = [
    "Course Code",
    "Course Name",
    "Day",
    "Time",
    "Teacher",
    "Credits",
  ];
  const courseData = transformCourseData(registrations);

  // Calculate total credits
  const totalCredits =
    registrations?.courses?.reduce(
      (total, course) => total + course.course.credit,
      0
    ) || 0;

  const announcements = [
    {
      title: "Welcome to the New Semester!",
      date: "2025-05-24",
      msg: "We are excited to welcome you to the new academic semester. Please make sure to complete your course registration and review your class schedules. If you have any questions, don't hesitate to contact the academic office.",
    },
    {
      title: "Midterm Examination Schedule",
      date: "2025-05-20",
      msg: "The midterm examination schedule has been published. Please check your student portal for specific dates and times. Make sure to prepare adequately and arrive at the examination venue at least 30 minutes before the scheduled time.",
    },
    {
      title: "Library Extended Hours",
      date: "2025-05-18",
      msg: "Due to the upcoming examination period, the library will extend its operating hours. The library will be open from 6:00 AM to 11:00 PM on weekdays and 8:00 AM to 8:00 PM on weekends. Take advantage of these extended hours for your studies.",
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-accent-light dark:border-accent-dark"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg-light dark:bg-bg-dark p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="bg-bg-secondary-light dark:bg-bg-secondary-dark rounded-2xl shadow-lg p-6 border border-border-light dark:border-border-dark">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <div>
              <h1 className="text-4xl uppercase font-bold bg-gradient-to-r from-accent-light to-accent-dark bg-clip-text text-transparent">
                Dashboard
              </h1>
              <div className="h-1 w-32 bg-accent-light dark:bg-accent-dark rounded-full mt-2"></div>
            </div>

            <div className="flex-shrink-0">
              <GlobalSearchField />
            </div>
          </div>
        </div>

        {/* Student Info Card */}
        {registrations && (
          <div className="bg-bg-secondary-light dark:bg-bg-secondary-dark rounded-2xl shadow-lg p-6 border border-border-light dark:border-border-dark">
            <h2 className="text-2xl font-semibold mb-4 text-accent-light dark:text-accent-dark flex items-center gap-2">
              <span className="w-3 h-3 bg-accent-light dark:bg-accent-dark rounded-full"></span>
              Student Information
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="space-y-2">
                <p className="text-sm text-gray-500">Name</p>
                <p className="font-bold text-lg">{`${registrations.student.firstName} ${registrations.student.lastName}`}</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-gray-500">Student ID</p>
                <p className="font-bold text-lg">{registrations.student.id}</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-gray-500">Department</p>
                <p className="font-bold text-lg">
                  {registrations.student.department.name}
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-gray-500">GPA</p>
                <p className="font-bold text-lg text-accent-light dark:text-accent-dark">
                  {registrations.student.gpa?.toFixed(2) || "N/A"}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Semester & Credits Overview */}
        {registrations && (
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-bg-secondary-light dark:bg-bg-secondary-dark rounded-2xl shadow-lg p-6 border border-border-light dark:border-border-dark">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                <div>
                  <p className="text-sm text-gray-500">Current Semester</p>
                  <p className="font-bold text-lg">
                    {registrations.semester.name} {registrations.semester.year}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-bg-secondary-light dark:bg-bg-secondary-dark rounded-2xl shadow-lg p-6 border border-border-light dark:border-border-dark">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                <div>
                  <p className="text-sm text-gray-500">Total Credits</p>
                  <p className="font-bold text-lg text-accent-light dark:text-accent-dark">
                    {totalCredits}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-bg-secondary-light dark:bg-bg-secondary-dark rounded-2xl shadow-lg p-6 border border-border-light dark:border-border-dark">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 bg-purple-500 rounded-full"></div>
                <div>
                  <p className="text-sm text-gray-500">Enrolled Courses</p>
                  <p className="font-bold text-lg text-accent-light dark:text-accent-dark">
                    {courseData.length}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Registered Courses Section */}
        <div className="bg-bg-secondary-light dark:bg-bg-secondary-dark rounded-2xl shadow-lg p-6 border border-border-light dark:border-border-dark">
          <h2 className="text-2xl font-semibold mb-6 text-accent-light dark:text-accent-dark flex items-center gap-2">
            <span className="w-3 h-3 bg-accent-light dark:bg-accent-dark rounded-full"></span>
            Registered Courses
          </h2>

          {courseData.length > 0 ? (
            <div className="overflow-x-auto rounded-xl border border-border-light dark:border-border-dark">
              <table className="w-full">
                <thead className="bg-bg-light dark:bg-bg-dark">
                  <tr>
                    {headers.map((header, index) => (
                      <th
                        key={index}
                        className="px-6 py-4 text-left font-semibold text-sm uppercase tracking-wider"
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {courseData.map((course, index) => (
                    <tr
                      key={index}
                      className="border-t border-border-light dark:border-border-dark hover:bg-bg-light dark:hover:bg-bg-dark transition-colors duration-200"
                    >
                      <td className="px-6 py-4">
                        <span className="font-mono text-sm font-semibold text-accent-light dark:text-accent-dark">
                          {course.code}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-medium">{course.name}</p>
                          <p className="text-sm text-gray-500">
                            Group {course.group} • Room {course.room}
                          </p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium">
                          {course.day}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-mono text-sm font-semibold">
                          {course.hour}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <p className="font-medium">{course.teacher}</p>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-1 bg-accent-light dark:bg-accent-dark text-white rounded-full text-sm font-bold">
                          {course.credit}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-24 h-24 mx-auto mb-4 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
                <svg
                  className="w-12 h-12 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-500">
                No courses registered
              </h3>
              <p className="text-gray-400 mt-2">
                You haven't registered for any courses yet.
              </p>
            </div>
          )}
        </div>

        {/* Announcements Section */}
        <div className="bg-bg-secondary-light dark:bg-bg-secondary-dark rounded-2xl shadow-lg p-6 border border-border-light dark:border-border-dark">
          <h2 className="text-2xl font-semibold mb-6 text-accent-light dark:text-accent-dark flex items-center gap-2">
            <span className="w-3 h-3 bg-accent-light dark:bg-accent-dark rounded-full"></span>
            Announcements
          </h2>

          <div className="space-y-4">
            {announcements.map((announcement, index) => (
              <div
                key={index}
                className="bg-bg-light dark:bg-bg-dark rounded-xl p-6 border border-border-light dark:border-border-dark hover:shadow-md transition-all duration-200"
              >
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-semibold text-lg">
                    {announcement.title}
                  </h3>
                  <span className="text-sm text-gray-500 bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full">
                    {new Date(announcement.date).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {announcement.msg}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-bg-secondary-light dark:bg-bg-secondary-dark rounded-2xl shadow-lg p-6 border border-border-light dark:border-border-dark">
          <h2 className="text-2xl font-semibold mb-6 text-accent-light dark:text-accent-dark flex items-center gap-2">
            <span className="w-3 h-3 bg-accent-light dark:bg-accent-dark rounded-full"></span>
            Quick Actions
          </h2>

          <div className="grid md:grid-cols-3 gap-4">
            <button className="p-4 bg-button-bg-primary-light dark:bg-primary-dark text-button-text-primary-light dark:text-button-text-primary-dark rounded-xl font-semibold hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl">
              View Grades
            </button>
            <button className="p-4 bg-button-bg-primary-light dark:bg-primary-dark text-button-text-primary-light dark:text-button-text-primary-dark rounded-xl font-semibold hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl">
              Download Schedule
            </button>
            <button className="p-4 bg-button-bg-primary-light dark:bg-primary-dark text-button-text-primary-light dark:text-button-text-primary-dark rounded-xl font-semibold hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl">
              Academic Calendar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
