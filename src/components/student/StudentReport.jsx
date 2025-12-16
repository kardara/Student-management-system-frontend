import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { toast } from "react-toastify";
import { authApi } from "../../services/apiClient";

export default function StudentReport() {
  const [grades, setGrades] = useState([]);
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    fetchReportData();
  }, [user]);

  const fetchReportData = async () => {
    try {
      setLoading(true);

      // Fetch student grades
      const studentId = parseInt(user.id);
      const gradeResponse = await authApi.get(
        `grade/get/student?id=${studentId}`
      );
      setGrades(Array.isArray(gradeResponse.data) ? gradeResponse.data : []);

      // Fetch student registrations for course details
      const regResponse = await authApi.get(
        `studentregistration/student/get?studentId=${studentId}`
      );
      setRegistrations(Array.isArray(regResponse.data) ? regResponse.data : []);
    } catch (error) {
      console.error("Error fetching report data:", error);
      toast.error("Failed to load report data", {
        theme: localStorage.getItem("theme"),
        position: "top-center",
      });
    } finally {
      setLoading(false);
    }
  };

  const calculateGPA = () => {
    if (grades.length === 0) return 0;

    const totalPoints = grades.reduce((sum, grade) => {
      let points = 0;
      switch (grade.status) {
        case "PASSED":
          if (grade.score >= 90) points = 4.0;
          else if (grade.score >= 80) points = 3.0;
          else if (grade.score >= 70) points = 2.0;
          else if (grade.score >= 60) points = 1.0;
          break;
        case "FAILED":
          points = 0;
          break;
        default:
          points = 0;
      }
      return sum + points;
    }, 0);

    return (totalPoints / grades.length).toFixed(2);
  };

  const getGradeStats = () => {
    const passed = grades.filter((g) => g.status === "PASSED").length;
    const failed = grades.filter((g) => g.status === "FAILED").length;
    const total = grades.length;
    const passRate = total > 0 ? ((passed / total) * 100).toFixed(1) : 0;

    return { passed, failed, total, passRate };
  };

  const stats = getGradeStats();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-bg-light dark:bg-bg-dark">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-light dark:border-primary-dark"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg-light dark:bg-bg-dark p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-text-primary-light dark:text-text-primary-dark mb-2">
            Academic Report
          </h1>
          <p className="text-text-secondary-light dark:text-text-secondary-dark">
            Comprehensive overview of your academic performance
          </p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-bg-secondary-light dark:bg-bg-secondary-dark rounded-lg p-6 border border-border-light dark:border-border-dark">
            <div className="text-center">
              <p className="text-text-secondary-light dark:text-text-secondary-dark text-sm">
                Overall GPA
              </p>
              <p className="text-3xl font-bold text-primary-light dark:text-primary-dark">
                {calculateGPA()}
              </p>
            </div>
          </div>

          <div className="bg-bg-secondary-light dark:bg-bg-secondary-dark rounded-lg p-6 border border-border-light dark:border-border-dark">
            <div className="text-center">
              <p className="text-text-secondary-light dark:text-text-secondary-dark text-sm">
                Courses Passed
              </p>
              <p className="text-3xl font-bold text-success-light dark:text-success-dark">
                {stats.passed}
              </p>
            </div>
          </div>

          <div className="bg-bg-secondary-light dark:bg-bg-secondary-dark rounded-lg p-6 border border-border-light dark:border-border-dark">
            <div className="text-center">
              <p className="text-text-secondary-light dark:text-text-secondary-dark text-sm">
                Courses Failed
              </p>
              <p className="text-3xl font-bold text-error-light dark:text-error-dark">
                {stats.failed}
              </p>
            </div>
          </div>

          <div className="bg-bg-secondary-light dark:bg-bg-secondary-dark rounded-lg p-6 border border-border-light dark:border-border-dark">
            <div className="text-center">
              <p className="text-text-secondary-light dark:text-text-secondary-dark text-sm">
                Pass Rate
              </p>
              <p className="text-3xl font-bold text-accent-light dark:text-accent-dark">
                {stats.passRate}%
              </p>
            </div>
          </div>
        </div>

        {/* Detailed Grades Table */}
        <div className="bg-bg-secondary-light dark:bg-bg-secondary-dark rounded-lg border border-border-light dark:border-border-dark overflow-hidden">
          <div className="px-6 py-4 border-b border-border-light dark:border-border-dark">
            <h2 className="text-xl font-semibold text-text-primary-light dark:text-text-primary-dark">
              Grade Details
            </h2>
          </div>

          {grades.length === 0 ? (
            <div className="p-8 text-center">
              <p className="text-text-secondary-light dark:text-text-secondary-dark text-lg">
                No grades available yet.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-bg-tertiary-light dark:bg-bg-tertiary-dark">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-text-primary-light dark:text-text-primary-dark uppercase tracking-wider">
                      Course
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-text-primary-light dark:text-text-primary-dark uppercase tracking-wider">
                      Code
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-text-primary-light dark:text-text-primary-dark uppercase tracking-wider">
                      Credits
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-text-primary-light dark:text-text-primary-dark uppercase tracking-wider">
                      Score
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-text-primary-light dark:text-text-primary-dark uppercase tracking-wider">
                      Grade
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-text-primary-light dark:text-text-primary-dark uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-light dark:divide-border-dark">
                  {grades.map((grade) => {
                    const course = grade.course;
                    const registration = registrations.find(
                      (r) => r.course?.id === course?.id
                    );

                    return (
                      <tr key={grade.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-text-primary-light dark:text-text-primary-dark">
                          {course?.name || "Unknown Course"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-text-primary-light dark:text-text-primary-dark">
                          {course?.code || "N/A"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-text-primary-light dark:text-text-primary-dark">
                          {course?.credit || 0}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-text-primary-light dark:text-text-primary-dark">
                          {grade.score}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-text-primary-light dark:text-text-primary-dark">
                          {grade.score >= 90
                            ? "A"
                            : grade.score >= 80
                            ? "B"
                            : grade.score >= 70
                            ? "C"
                            : grade.score >= 60
                            ? "D"
                            : "F"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 py-1 rounded text-xs font-medium ${
                              grade.status === "PASSED"
                                ? "bg-success-light dark:bg-success-dark text-success-dark dark:text-success-light"
                                : grade.status === "FAILED"
                                ? "bg-error-light dark:bg-error-dark text-error-dark dark:text-error-light"
                                : "bg-warning-light dark:bg-warning-dark text-warning-dark dark:text-warning-light"
                            }`}
                          >
                            {grade.status}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Performance Summary */}
        {grades.length > 0 && (
          <div className="mt-8 bg-bg-secondary-light dark:bg-bg-secondary-dark rounded-lg p-6 border border-border-light dark:border-border-dark">
            <h3 className="text-lg font-semibold text-text-primary-light dark:text-text-primary-dark mb-4">
              Performance Summary
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <p className="text-text-secondary-light dark:text-text-secondary-dark text-sm">
                  Total Courses
                </p>
                <p className="text-2xl font-bold text-primary-light dark:text-primary-dark">
                  {stats.total}
                </p>
              </div>
              <div className="text-center">
                <p className="text-text-secondary-light dark:text-text-secondary-dark text-sm">
                  Average Score
                </p>
                <p className="text-2xl font-bold text-accent-light dark:text-accent-dark">
                  {(
                    grades.reduce((sum, g) => sum + g.score, 0) / grades.length
                  ).toFixed(1)}
                </p>
              </div>
              <div className="text-center">
                <p className="text-text-secondary-light dark:text-text-secondary-dark text-sm">
                  Completion Rate
                </p>
                <p className="text-2xl font-bold text-success-light dark:text-success-dark">
                  {(
                    (grades.filter((g) => g.status !== "IN_PROGRESS").length /
                      stats.total) *
                    100
                  ).toFixed(1)}
                  %
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
