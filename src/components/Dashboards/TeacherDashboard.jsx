import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { globalSearchService } from '../../services/globalSearchService';
import { FaChalkboardTeacher, FaUsers, FaCalendarAlt, FaClock, FaGraduationCap, FaChartLine, FaBook, FaUserGraduate } from 'react-icons/fa';
import GlobalSearchField from '../globalSearch/GlobalSearchField';

export default function TeacherDashboard() {
  const [globalData, setGlobalData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    globalSearchService.getTeacher()
      .then((data) => {
        setGlobalData(data);
        console.log(data);
      })
      .catch(() => {
        toast.error("An error occurred", {
          theme: localStorage.getItem('theme'),
          position: "top-center"
        });
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const formatTime = (timeString) => {
    if (!timeString) return '';
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  const getTodayCourses = () => {
    if (!globalData?.courses) return [];
    const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });
    return globalData.courses.filter(course =>
      course.day && course.day.toLowerCase() === today.toLowerCase()
    );
  };

  const getUpcomingCourse = () => {
    const todayCourses = getTodayCourses();
    if (todayCourses.length === 0) return null;

    const now = new Date();
    const currentTime = now.getHours() * 60 + now.getMinutes();

    return todayCourses.find(course => {
      if (!course.time) return false;
      const [hours, minutes] = course.time.split(':');
      const courseTime = parseInt(hours) * 60 + parseInt(minutes);
      return courseTime > currentTime;
    }) || todayCourses[0];
  };

  const getTotalStudents = () => {
    if (!globalData?.courses) return 0;
    return globalData.courses.reduce((total, course) => {
      return total + (course.registrations?.length || 0);
    }, 0);
  };

  const getAverageAttendance = () => {
    if (!globalData?.courses) return 0;
    const coursesWithAttendance = globalData.courses.filter(course =>
      course.attendanceRate !== undefined
    );
    if (coursesWithAttendance.length === 0) return 0;

    const totalRate = coursesWithAttendance.reduce((sum, course) =>
      sum + course.attendanceRate, 0
    );
    return Math.round(totalRate / coursesWithAttendance.length);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-bg-light dark:bg-bg-dark p-6">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse space-y-6">
            <div className="h-32 bg-bg-secondary-light dark:bg-bg-secondary-dark rounded-2xl"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="h-32 bg-bg-secondary-light dark:bg-bg-secondary-dark rounded-xl"></div>
              ))}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {[1, 2].map((item) => (
                <div key={item} className="h-64 bg-bg-secondary-light dark:bg-bg-secondary-dark rounded-xl"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  const upcomingCourse = getUpcomingCourse();
  const todayCourses = getTodayCourses();
  const totalStudents = getTotalStudents();
  const averageAttendance = getAverageAttendance();

  return (
    <div className="min-h-screen bg-bg-light dark:bg-bg-dark p-6">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* Header Section */}
        <div className="bg-bg-secondary-light dark:bg-bg-secondary-dark rounded-2xl shadow-lg p-6 border border-border-light dark:border-border-dark">
          <div className='flex flex-col justify-between gap-4 md:flex-row md:items-center'>
            <div>
              <h1 className='text-4xl uppercase font-bold bg-gradient-to-r from-accent-light to-accent-dark bg-clip-text text-transparent'>
                Dashboard
              </h1>
              <div className="h-1 w-32 bg-accent-light dark:bg-accent-dark rounded-full mt-2"></div>

            </div>
            <div className='flex-shrink-0'>
              <GlobalSearchField />
            </div>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-bg-secondary-light dark:bg-bg-secondary-dark rounded-xl p-6 border border-border-light dark:border-border-dark hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-text-secondary-light dark:text-text-secondary-dark text-sm font-medium">Total Courses</p>
                <p className="text-3xl font-bold text-text-primary-light dark:text-text-primary-dark">
                  {globalData?.courses?.length || 0}
                </p>
              </div>
              <div className="p-3 bg-primary-light dark:bg-primary-dark rounded-full">
                <FaChalkboardTeacher className="text-xl text-button-text-primary-light dark:text-button-text-primary-dark" />
              </div>
            </div>
          </div>

          <div className="bg-bg-secondary-light dark:bg-bg-secondary-dark rounded-xl p-6 border border-border-light dark:border-border-dark hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-text-secondary-light dark:text-text-secondary-dark text-sm font-medium">Total Students</p>
                <p className="text-3xl font-bold text-text-primary-light dark:text-text-primary-dark">
                  {totalStudents}
                </p>
              </div>
              <div className="p-3 bg-success-light dark:bg-success-dark rounded-full">
                <FaUserGraduate className="text-xl text-white" />
              </div>
            </div>
          </div>

          <div className="bg-bg-secondary-light dark:bg-bg-secondary-dark rounded-xl p-6 border border-border-light dark:border-border-dark hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-text-secondary-light dark:text-text-secondary-dark text-sm font-medium">Today's Classes</p>
                <p className="text-3xl font-bold text-text-primary-light dark:text-text-primary-dark">
                  {todayCourses.length}
                </p>
              </div>
              <div className="p-3 bg-accent-light dark:bg-accent-dark rounded-full">
                <FaCalendarAlt className="text-xl text-button-text-primary-light dark:text-button-text-primary-dark" />
              </div>
            </div>
          </div>

          <div className="bg-bg-secondary-light dark:bg-bg-secondary-dark rounded-xl p-6 border border-border-light dark:border-border-dark hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-text-secondary-light dark:text-text-secondary-dark text-sm font-medium">Avg. Attendance</p>
                <p className="text-3xl font-bold text-text-primary-light dark:text-text-primary-dark">
                  {averageAttendance}%
                </p>
              </div>
              <div className="p-3 bg-yellow-500 rounded-full">
                <FaChartLine className="text-xl text-white" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Upcoming Class */}
          <div className="bg-bg-secondary-light dark:bg-bg-secondary-dark rounded-xl p-6 border border-border-light dark:border-border-dark">
            <h2 className="text-xl font-bold text-text-primary-light dark:text-text-primary-dark mb-4 flex items-center gap-2">
              <FaClock className="text-accent-light dark:text-accent-dark" />
              Next Class
            </h2>

            {upcomingCourse ? (
              <div className="space-y-4">
                <div className="bg-bg-light dark:bg-bg-dark p-4 rounded-lg border border-border-light dark:border-border-dark">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="text-lg font-semibold text-text-primary-light dark:text-text-primary-dark">
                        {upcomingCourse.course.code}
                      </h3>
                      <p className="text-text-secondary-light dark:text-text-secondary-dark">
                        {upcomingCourse.course.name}
                      </p>
                    </div>
                    <span className="bg-primary-light dark:bg-primary-dark text-button-text-primary-light dark:text-button-text-primary-dark px-2 py-1 rounded text-sm">
                      Group {upcomingCourse.group}
                    </span>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-text-secondary-light dark:text-text-secondary-dark">Time:</span>
                      <span className="text-text-primary-light dark:text-text-primary-dark font-medium">
                        {formatTime(upcomingCourse.time)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-secondary-light dark:text-text-secondary-dark">Room:</span>
                      <span className="text-text-primary-light dark:text-text-primary-dark font-medium">
                        {upcomingCourse.room}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-secondary-light dark:text-text-secondary-dark">Students:</span>
                      <span className="text-text-primary-light dark:text-text-primary-dark font-medium">
                        {upcomingCourse.registrations?.length || 0}/{upcomingCourse.size}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => navigate(`/lecturer/attendance/${upcomingCourse.id}`)}
                    className="flex-1 bg-primary-light dark:bg-primary-dark hover:bg-button-hover-bg-light dark:hover:bg-button-hover-bg-dark text-button-text-primary-light dark:text-button-text-primary-dark px-4 py-2 rounded font-medium transition-colors text-sm"
                  >
                    Take Attendance
                  </button>
                  <button
                    onClick={() => navigate(`/lecturer/grades/${upcomingCourse.id}`)}
                    className="flex-1 border border-primary-light dark:border-primary-dark text-primary-light dark:text-primary-dark hover:bg-primary-light hover:dark:bg-primary-dark hover:text-button-text-primary-light hover:dark:text-button-text-primary-dark px-4 py-2 rounded font-medium transition-colors text-sm"
                  >
                    Manage Grades
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <FaClock className="text-4xl text-text-secondary-light dark:text-text-secondary-dark mx-auto mb-3" />
                <p className="text-text-secondary-light dark:text-text-secondary-dark">
                  No upcoming classes today
                </p>
              </div>
            )}
          </div>

          {/* Today's Schedule */}
          <div className="bg-bg-secondary-light dark:bg-bg-secondary-dark rounded-xl p-6 border border-border-light dark:border-border-dark">
            <h2 className="text-xl font-bold text-text-primary-light dark:text-text-primary-dark mb-4 flex items-center gap-2">
              <FaCalendarAlt className="text-accent-light dark:text-accent-dark" />
              Today's Schedule
            </h2>

            <div className="space-y-3 max-h-80 overflow-y-auto">
              {todayCourses.length > 0 ? (
                todayCourses.map((course) => (
                  <div key={course.id} className="bg-bg-light dark:bg-bg-dark p-3 rounded-lg border border-border-light dark:border-border-dark">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-medium text-text-primary-light dark:text-text-primary-dark text-sm">
                          {course.course.code} - {course.course.name}
                        </h4>
                        <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark">
                          Room {course.room} • Group {course.group}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium text-text-primary-light dark:text-text-primary-dark">
                          {formatTime(course.time)}
                        </div>
                        <div className="text-xs text-text-secondary-light dark:text-text-secondary-dark">
                          {course.registrations?.length || 0} students
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <FaBook className="text-4xl text-text-secondary-light dark:text-text-secondary-dark mx-auto mb-3" />
                  <p className="text-text-secondary-light dark:text-text-secondary-dark">
                    No classes scheduled for today
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* All Courses */}
        <div className="bg-bg-secondary-light dark:bg-bg-secondary-dark rounded-xl p-6 border border-border-light dark:border-border-dark">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-text-primary-light dark:text-text-primary-dark flex items-center gap-2">
              <FaChalkboardTeacher className="text-accent-light dark:text-accent-dark" />
              My Courses
            </h2>
            <button
              onClick={() => navigate('/lecturer/courses')}
              className="text-primary-light dark:text-primary-dark hover:text-accent-light dark:hover:text-accent-dark transition-colors text-sm font-medium"
            >
              View All →
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {globalData?.courses?.slice(0, 6).map((course) => (
              <div key={course.id} className="bg-bg-light dark:bg-bg-dark p-4 rounded-lg border border-border-light dark:border-border-dark hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    {console.log(course)}
                    <h3 className="font-semibold text-text-primary-light dark:text-text-primary-dark text-sm">
                      {course.code}
                    </h3>
                    <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark">
                      {course.name}
                    </p>
                  </div>
                  <span className="bg-primary-light dark:bg-primary-dark text-button-text-primary-light dark:text-button-text-primary-dark px-2 py-1 rounded text-xs">
                    Group {course.group}
                  </span>
                </div>

                <div className="space-y-1 text-xs">
                  <div className="flex justify-between">
                    <span className="text-text-secondary-light dark:text-text-secondary-dark">Schedule:</span>
                    <span className="text-text-primary-light dark:text-text-primary-dark">
                      {course.day} {formatTime(course.time)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary-light dark:text-text-secondary-dark">Students:</span>
                    <span className="text-text-primary-light dark:text-text-primary-dark">
                      {course.registrations?.length || 0}/{course.size}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary-light dark:text-text-secondary-dark">Room:</span>
                    <span className="text-text-primary-light dark:text-text-primary-dark font-medium">
                      {course.room}
                    </span>
                  </div>
                </div>

                <div className="flex gap-2 mt-3">
                  <button
                    // onClick={() => navigate(`/lecturer/attendance/${course.id}`)}
                    className="flex-1 bg-primary-light dark:bg-primary-dark hover:bg-button-hover-bg-light dark:hover:bg-button-hover-bg-dark text-button-text-primary-light dark:text-button-text-primary-dark px-2 py-1 rounded text-xs font-medium transition-colors"
                  >
                    Attendance
                  </button>
                  <button
                    // onClick={() => navigate(`/lecturer/grades/${course.id}`)}
                    className="flex-1 border border-primary-light dark:border-primary-dark text-primary-light dark:text-primary-dark hover:bg-primary-light hover:dark:bg-primary-dark hover:text-button-text-primary-light hover:dark:text-button-text-primary-dark px-2 py-1 rounded text-xs font-medium transition-colors"
                  >
                    Grades
                  </button>
                </div>
              </div>
            ))}
          </div>

          {(!globalData?.courses || globalData.courses.length === 0) && (
            <div className="text-center py-12">
              <FaGraduationCap className="text-4xl text-text-secondary-light dark:text-text-secondary-dark mx-auto mb-4" />
              <p className="text-text-secondary-light dark:text-text-secondary-dark">
                No courses assigned yet
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}