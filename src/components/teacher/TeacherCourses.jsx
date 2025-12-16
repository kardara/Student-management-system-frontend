import React, { useEffect, useState } from 'react'
import { manageTeachersService } from '../../services/manageTeachersService';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function TeacherCourses() {
  const data = useAuth();
  const user = data?.user;
  const navigate = useNavigate();

  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.uuid) {
      manageTeachersService.getTeacherCourse(user.uuid).then((a) => {
        console.log(a);
        setCourses(a || []);
        setLoading(false);
      }).catch((error) => {
        console.error('Error fetching courses:', error);
        setLoading(false);
      });
    }
  }, [user?.uuid]);

  const formatTime = (timeString) => {
    if (!timeString) return '';
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-bg-light dark:bg-bg-dark p-6">
        <div className="max-w-6xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-border-light dark:bg-border-dark rounded w-1/4 mb-8"></div>
            <div className="space-y-4">
              {[1, 2, 3].map((item) => (
                <div key={item} className="h-32 bg-bg-secondary-light dark:bg-bg-secondary-dark rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg-light dark:bg-bg-dark p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-text-primary-light dark:text-text-primary-dark mb-2">
            My Courses
          </h1>
          <p className="text-text-secondary-light dark:text-text-secondary-dark">
            Manage and view your assigned courses
          </p>
        </div>

        {/* Courses Grid */}
        {courses && courses.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {courses.map((courseItem) => (
              <div
                key={courseItem.id}
                className="bg-bg-secondary-light dark:bg-bg-secondary-dark rounded-lg border border-border-light dark:border-border-dark p-6 hover:shadow-lg transition-shadow duration-200"
              >
                {/* Course Header */}
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-text-primary-light dark:text-text-primary-dark">
                      {courseItem.course.code}
                    </h3>
                    <h4 className="text-lg text-text-secondary-light dark:text-text-secondary-dark font-medium">
                      {courseItem.course.name}
                    </h4>
                  </div>
                  <span className="bg-primary-light dark:bg-primary-dark text-button-text-primary-light dark:text-button-text-primary-dark px-3 py-1 rounded-full text-sm font-semibold">
                    Group {courseItem.group}
                  </span>
                </div>

                {/* Course Details */}
                <div className="space-y-3 mb-4">
                  <div className="flex items-center justify-between">
                    <span className="text-text-secondary-light dark:text-text-secondary-dark font-medium">Schedule:</span>
                    <span className="text-text-primary-light dark:text-text-primary-dark">
                      {courseItem.day} at {formatTime(courseItem.time)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-text-secondary-light dark:text-text-secondary-dark font-medium">Room:</span>
                    <span className="text-text-primary-light dark:text-text-primary-dark font-semibold">
                      {courseItem.room}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-text-secondary-light dark:text-text-secondary-dark font-medium">Capacity:</span>
                    <span className="text-text-primary-light dark:text-text-primary-dark">
                      <span className="text-accent-light dark:text-accent-dark font-semibold">
                        {courseItem.registrations?.length || 0}
                      </span>
                      /{courseItem.size}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-text-secondary-light dark:text-text-secondary-dark font-medium">Credits:</span>
                    <span className="text-text-primary-light dark:text-text-primary-dark font-semibold">
                      {courseItem.course.credit}
                    </span>
                  </div>
                </div>

                {/* Department Info */}
                <div className="bg-bg-light dark:bg-bg-dark p-3 rounded border border-border-light dark:border-border-dark mb-4">
                  <div className="text-sm">
                    <div className="text-text-secondary-light dark:text-text-secondary-dark">Department:</div>
                    <div className="text-text-primary-light dark:text-text-primary-dark font-medium">
                      {courseItem.course.academicUnit.name} ({courseItem.course.academicUnit.code})
                    </div>
                    <div className="text-text-secondary-light dark:text-text-secondary-dark mt-1">
                      Faculty: {courseItem.course.academicUnit.parent?.name}
                    </div>
                  </div>
                </div>

                {/* Semester Info */}
                <div className="flex items-center justify-between text-sm text-text-secondary-light dark:text-text-secondary-dark mb-4">
                  <span>
                    {courseItem.semester.name} {courseItem.semester.year}
                  </span>
                  <span>
                    {formatDate(courseItem.semester.startDate)} - {formatDate(courseItem.semester.endDate)}
                  </span>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 pt-4 border-t border-border-light dark:border-border-dark">
                  {/* <button className="bg-primary-light dark:bg-primary-dark hover:bg-button-hover-bg-light dark:hover:bg-button-hover-bg-dark text-button-text-primary-light dark:text-button-text-primary-dark px-4 py-2 rounded font-medium transition-colors duration-200 text-sm">
                    View Details
                  </button> */}
                  {/* <button className="border border-primary-light dark:border-primary-dark text-primary-light dark:text-primary-dark hover:bg-primary-light hover:dark:bg-primary-dark hover:text-button-text-primary-light hover:dark:text-button-text-primary-dark px-4 py-2 rounded font-medium transition-colors duration-200 text-sm">
                    Manage Students
                  </button> */}
                  <button className="bg-primary-light dark:bg-primary-dark hover:bg-button-hover-bg-light dark:hover:bg-button-hover-bg-dark text-button-text-primary-light dark:text-button-text-primary-dark px-4 py-2 rounded font-medium transition-colors duration-200 text-sm"
                    onClick={() => navigate(`/lecturer/attendance/${courseItem.id}`)}
                  >
                    Attendance
                  </button>
                  <button className="bg-primary-light dark:bg-primary-dark hover:bg-button-hover-bg-light dark:hover:bg-button-hover-bg-dark text-button-text-primary-light dark:text-button-text-primary-dark px-4 py-2 rounded font-medium transition-colors duration-200 text-sm"

                    onClick={() => navigate(`/lecturer/grades/${courseItem.id}`)}
                  >

                    Grades
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="bg-bg-secondary-light dark:bg-bg-secondary-dark rounded-lg p-8 border border-border-light dark:border-border-dark">
              <div className="text-text-secondary-light dark:text-text-secondary-dark text-lg mb-4">
                No courses assigned
              </div>
              <p className="text-text-secondary-light dark:text-text-secondary-dark">
                You don't have any courses assigned yet. Contact your administrator for course assignments.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}