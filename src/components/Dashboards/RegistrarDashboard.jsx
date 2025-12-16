import React, { useState, useEffect } from "react";
import {
  Users,
  GraduationCap,
  BookOpen,
  Calendar,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import StatsCard from "../UI/StatsCard";
import { globalSearchService } from "../../services/globalSearchService";
import { toast } from "react-toastify";

export default function RegistrarDashboard() {
  const [globalData, setGlobalData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    globalSearchService
      .getAdmin()
      .then((data) => {
        setGlobalData(data);
        console.log(data);
      })
      .catch(() => {
        toast.error("An error occurred", {
          theme: localStorage.getItem("theme"),
          position: "top-center",
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
  const activeStudents =
    globalData.students?.filter((s) => s.status === "ACTIVE").length || 0;
  const suspendedStudents =
    globalData.students?.filter((s) => s.status === "SUSPENDED").length || 0;
  const totalRegistrations = globalData.registrations?.length || 0;
  const totalApplications = globalData.applications?.length || 0;
  const approvedApplications =
    globalData.applications?.filter((a) => a.status === "APPROVED").length || 0;

  return (
    <div className="min-h-screen bg-bg-light dark:bg-bg-dark p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-text-primary-light dark:text-text-primary-dark mb-2">
              Registrar Dashboard
            </h1>
            <p className="text-text-secondary-light dark:text-text-secondary-dark">
              Student registration and enrollment management
            </p>
          </div>
        </div>
      </div>

      {/* Stats Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard
          title="Total Students"
          value={totalStudents}
          icon={
            <GraduationCap className="w-8 h-8 text-primary-light dark:text-primary-dark" />
          }
          trend="+12%"
          trendUp={true}
        />
        <StatsCard
          title="Active Students"
          value={activeStudents}
          icon={
            <Users className="w-8 h-8 text-success-light dark:text-success-dark" />
          }
          trend="+8%"
          trendUp={true}
        />
        <StatsCard
          title="Total Registrations"
          value={totalRegistrations}
          icon={
            <BookOpen className="w-8 h-8 text-accent-light dark:text-accent-dark" />
          }
          trend="+15%"
          trendUp={true}
        />
        <StatsCard
          title="Applications"
          value={totalApplications}
          icon={
            <Calendar className="w-8 h-8 text-info-light dark:text-info-dark" />
          }
          trend="+5%"
          trendUp={true}
        />
      </div>

      {/* Secondary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-bg-secondary-light dark:bg-bg-secondary-dark rounded-lg p-4 border border-border-light dark:border-border-dark">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-text-secondary-light dark:text-text-secondary-dark text-sm">
                Suspended Students
              </p>
              <p className="text-2xl font-bold text-error-light dark:text-error-dark">
                {suspendedStudents}
              </p>
            </div>
            <AlertCircle className="w-6 h-6 text-error-light dark:text-error-dark" />
          </div>
        </div>

        <div className="bg-bg-secondary-light dark:bg-bg-secondary-dark rounded-lg p-4 border border-border-light dark:border-border-dark">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-text-secondary-light dark:text-text-secondary-dark text-sm">
                Approved Applications
              </p>
              <p className="text-2xl font-bold text-success-light dark:text-success-dark">
                {approvedApplications}
              </p>
            </div>
            <CheckCircle className="w-6 h-6 text-success-light dark:text-success-dark" />
          </div>
        </div>

        <div className="bg-bg-secondary-light dark:bg-bg-secondary-dark rounded-lg p-4 border border-border-light dark:border-border-dark">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-text-secondary-light dark:text-text-secondary-dark text-sm">
                Pending Applications
              </p>
              <p className="text-2xl font-bold text-warning-light dark:text-warning-dark">
                {totalApplications - approvedApplications}
              </p>
            </div>
            <Calendar className="w-6 h-6 text-warning-light dark:text-warning-dark" />
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Registrations */}
        <div className="bg-bg-secondary-light dark:bg-bg-secondary-dark rounded-lg p-6 border border-border-light dark:border-border-dark">
          <div className="flex items-center mb-4">
            <BookOpen className="w-6 h-6 text-accent-light dark:text-accent-dark mr-2" />
            <h3 className="text-xl font-semibold text-text-primary-light dark:text-text-primary-dark">
              Recent Registrations
            </h3>
          </div>
          <div className="space-y-3">
            {globalData.registrations
              ?.sort((a, b) => new Date(b.date) - new Date(a.date))
              .slice(0, 5)
              .map((registration) => (
                <div
                  key={registration.id}
                  className="flex justify-between items-center py-2 border-b border-border-light dark:border-border-dark last:border-b-0"
                >
                  <div>
                    <p className="font-medium text-text-primary-light dark:text-text-primary-dark">
                      {registration.student.firstName}{" "}
                      {registration.student.lastName}
                    </p>
                    <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">
                      {registration.semester.name} {registration.semester.year}{" "}
                      • {registration.courses?.length || 0} courses
                    </p>
                  </div>
                  <div className="text-primary-light dark:text-primary-dark text-sm">
                    {new Date(registration.date).toLocaleDateString()}
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* Recent Applications */}
        <div className="bg-bg-secondary-light dark:bg-bg-secondary-dark rounded-lg p-6 border border-border-light dark:border-border-dark">
          <div className="flex items-center mb-4">
            <Users className="w-6 h-6 text-primary-light dark:text-primary-dark mr-2" />
            <h3 className="text-xl font-semibold text-text-primary-light dark:text-text-primary-dark">
              Recent Applications
            </h3>
          </div>
          <div className="space-y-3">
            {globalData.applications
              ?.sort(
                (a, b) =>
                  new Date(b.applicationDate) - new Date(a.applicationDate)
              )
              .slice(0, 5)
              .map((application) => (
                <div
                  key={application.id}
                  className="flex justify-between items-center py-2 border-b border-border-light dark:border-border-dark last:border-b-0"
                >
                  <div>
                    <p className="font-medium text-text-primary-light dark:text-text-primary-dark">
                      {application.student.firstName}{" "}
                      {application.student.lastName}
                    </p>
                    <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">
                      Status: {application.status} •{" "}
                      {new Date(
                        application.applicationDate
                      ).toLocaleDateString()}
                    </p>
                  </div>
                  <div
                    className={`text-sm font-semibold ${
                      application.status === "APPROVED"
                        ? "text-success-light dark:text-success-dark"
                        : application.status === "REJECTED"
                        ? "text-error-light dark:text-error-dark"
                        : "text-warning-light dark:text-warning-dark"
                    }`}
                  >
                    {application.status}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
