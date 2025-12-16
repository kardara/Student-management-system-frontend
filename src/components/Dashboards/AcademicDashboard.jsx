import React, { useState, useEffect } from 'react';
import {
  Users,
  GraduationCap,
  BookOpen,
  Calendar,
  Building,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import StatsCard from '../UI/StatsCard';
import { globalSearchService } from '../../services/globalSearchService';
import { toast } from 'react-toastify';

export default function AcademicDashboard() {
  const [globalData, setGlobalData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    globalSearchService.getAdmin()
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

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-bg-light dark:bg-bg-dark">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-light dark:border-primary-dark"></div>
      </div>
    );
  }

  if (!globalData) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-bg-light dark:bg-bg-dark">
        <div className="text-text-primary-light dark:text-text-primary-dark text-lg">
          No data available
        </div>
      </div>
    );
  }

  // Calculate statistics
  const totalStudents = globalData.students?.length || 0;
  const totalTeachers = globalData.teachers?.length || 0;
  const totalCourses = globalData.courses?.length || 0;
  const offeredCourses = globalData.offeredCourses?.length || 0;
  const totalSemesters = globalData.semesters?.length || 0;
  const activeSemesters = globalData.semesters?.filter(s => s.status === 'ACTIVE').length || 0;
  const totalAcademicUnits = globalData.academicUnits?.length || 0;

  return (
    <div className="min-h-screen bg-bg-light dark:bg-bg-dark p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-text-primary-light dark:text-text-primary-dark mb-2">
              Academic Dashboard
            </h1>
            <p className="text-text-secondary-light dark:text-text-secondary-dark">
              Overview of academic affairs
            </p>
          </div>
        </div>
      </div>

      {/* Stats Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard
          title="Total Students"
          value={totalStudents}
          icon={<GraduationCap className="w-8 h-8 text-primary-light dark:text-primary-dark" />}
          trend="+12%"
          trendUp={true}
        />
        <StatsCard
          title="Active Teachers"
          value={totalTeachers}
          icon={<Users className="w-8 h-8 text-success-light dark:text-success-dark" />}
          trend="+5%"
          trendUp={true}
        />
        <StatsCard
          title="Total Courses"
          value={totalCourses}
          icon={<BookOpen className="w-8 h-8 text-accent-light dark:text-accent-dark" />}
          trend="+8%"
          trendUp={true}
        />
        <StatsCard
          title="Academic Units"
          value={totalAcademicUnits}
          icon={<Building className="w-8 h-8 text-info-light dark:text-info-dark" />}
          trend="+2%"
          trendUp={true}
        />
      </div>

      {/* Secondary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-bg-secondary-light dark:bg-bg-secondary-dark rounded-lg p-4 border border-border-light dark:border-border-dark">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-text-secondary-light dark:text-text-secondary-dark text-sm">Offered Courses</p>
              <p className="text-2xl font-bold text-accent-light dark:text-accent-dark">{offeredCourses}</p>
            </div>
            <Calendar className="w-6 h-6 text-accent-light dark:text-accent-dark" />
          </div>
        </div>

        <div className="bg-bg-secondary-light dark:bg-bg-secondary-dark rounded-lg p-4 border border-border-light dark:border-border-dark">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-text-secondary-light dark:text-text-secondary-dark text-sm">Active Semesters</p>
              <p className="text-2xl font-bold text-success-light dark:text-success-dark">{activeSemesters}</p>
            </div>
            <CheckCircle className="w-6 h-6 text-success-light dark:text-success-dark" />
          </div>
        </div>

        <div className="bg-bg-secondary-light dark:bg-bg-secondary-dark rounded-lg p-4 border border-border-light dark:border-border-dark">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-text-secondary-light dark:text-text-secondary-dark text-sm">Total Semesters</p>
              <p className="text-2xl font-bold text-primary-light dark:text-primary-dark">{totalSemesters}</p>
            </div>
            <AlertCircle className="w-6 h-6 text-primary-light dark:text-primary-dark" />
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Courses */}
        <div className="bg-bg-secondary-light dark:bg-bg-secondary-dark rounded-lg p-6 border border-border-light dark:border-border-dark">
          <div className="flex items-center mb-4">
            <BookOpen className="w-6 h-6 text-accent-light dark:text-accent-dark mr-2" />
            <h3 className="text-xl font-semibold text-text-primary-light dark:text-text-primary-dark">
              Recent Courses
            </h3>
          </div>
          <div className="space-y-3">
            {globalData.courses?.slice(0, 5).map((course) => (
              <div key={course.id} className="flex justify-between items-center py-2 border-b border-border-light dark:border-border-dark last:border-b-0">
                <div>
                  <p className="font-medium text-text-primary-light dark:text-text-primary-dark">
                    {course.name}
                  </p>
                  <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">
                    {course.code} • {course.credits} credits
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Offered Courses */}
        <div className="bg-bg-secondary-light dark:bg-bg-secondary-dark rounded-lg p-6 border border-border-light dark:border-border-dark">
          <div className="flex items-center mb-4">
            <Calendar className="w-6 h-6 text-primary-light dark:text-primary-dark mr-2" />
            <h3 className="text-xl font-semibold text-text-primary-light dark:text-text-primary-dark">
              Recent Offered Courses
            </h3>
          </div>
          <div className="space-y-3">
            {globalData.offeredCourses?.slice(0, 5).map((offered) => (
              <div key={offered.id} className="flex justify-between items-center py-2 border-b border-border-light dark:border-border-dark last:border-b-0">
                <div>
                  <p className="font-medium text-text-primary-light dark:text-text-primary-dark">
                    {offered.course.name}
                  </p>
                  <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">
                    {offered.semester.name} {offered.semester.year}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}