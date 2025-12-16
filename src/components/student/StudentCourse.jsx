import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { toast } from "react-toastify";
import { authApi } from "../../services/apiClient";

export default function StudentCourse() {
  const [registrations, setRegistrations] = useState([]);
  const [grades, setGrades] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    fetchStudentData();
  }, [user]);

  const fetchStudentData = async () => {
    try {
      setLoading(true);

      // Fetch student registrations
      const studentId = parseInt(user.id);
      const regResponse = await authApi.get(
        `studentregistration/student/get?studentId=${studentId}`
      );
      setRegistrations(Array.isArray(regResponse.data) ? regResponse.data : []);

      // Fetch student grades
      const gradeResponse = await authApi.get(
        `grade/get/student?id=${studentId}`
      );
      setGrades(Array.isArray(gradeResponse.data) ? gradeResponse.data : []);
    } catch (error) {
      console.error("Error fetching student data:", error);
      toast.error("Failed to load course data", {
        theme: localStorage.getItem("theme"),
        position: "top-center",
      });
    } finally {
      setLoading(false);
    }
  };

  const getGradeForCourse = (courseId) => {
    const grade = grades.find((g) => g.course?.id === courseId);
    return grade ? grade.score : "Not graded";
  };

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
            My Courses
          </h1>
          <p className="text-text-secondary-light dark:text-text-secondary-dark">
            View your registered courses and grades
          </p>
        </div>

        {registrations.length === 0 ? (
          <div className="bg-bg-secondary-light dark:bg-bg-secondary-dark rounded-lg p-8 text-center border border-border-light dark:border-border-dark">
            <p className="text-text-secondary-light dark:text-text-secondary-dark text-lg">
              No courses registered yet.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {registrations.map((registration) => (
              <div
                key={registration.id}
                className="bg-bg-secondary-light dark:bg-bg-secondary-dark rounded-lg p-6 border border-border-light dark:border-border-dark"
              >
                <div className="mb-4">
                  <h3 className="text-xl font-semibold text-text-primary-light dark:text-text-primary-dark mb-2">
                    {registration.course?.name || "Unknown Course"}
                  </h3>
                  <p className="text-text-secondary-light dark:text-text-secondary-dark text-sm mb-1">
                    Code: {registration.course?.code || "N/A"}
                  </p>
                  <p className="text-text-secondary-light dark:text-text-secondary-dark text-sm mb-1">
                    Credits: {registration.course?.credit || 0}
                  </p>
                  <p className="text-text-secondary-light dark:text-text-secondary-dark text-sm">
                    Semester: {registration.semester?.name}{" "}
                    {registration.semester?.year}
                  </p>
                </div>

                <div className="border-t border-border-light dark:border-border-dark pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-text-secondary-light dark:text-text-secondary-dark">
                      Grade:
                    </span>
                    <span
                      className={`font-semibold ${
                        getGradeForCourse(registration.course?.id) ===
                        "Not graded"
                          ? "text-warning-light dark:text-warning-dark"
                          : "text-success-light dark:text-success-dark"
                      }`}
                    >
                      {getGradeForCourse(registration.course?.id)}
                    </span>
                  </div>
                </div>

                <div className="mt-4 text-xs text-text-secondary-light dark:text-text-secondary-dark">
                  Registered: {new Date(registration.date).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Grades Summary */}
        {grades.length > 0 && (
          <div className="mt-8 bg-bg-secondary-light dark:bg-bg-secondary-dark rounded-lg p-6 border border-border-light dark:border-border-dark">
            <h2 className="text-xl font-semibold text-text-primary-light dark:text-text-primary-dark mb-4">
              Grades Summary
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border-light dark:border-border-dark">
                    <th className="text-left py-2 text-text-primary-light dark:text-text-primary-dark">
                      Course
                    </th>
                    <th className="text-left py-2 text-text-primary-light dark:text-text-primary-dark">
                      Score
                    </th>
                    <th className="text-left py-2 text-text-primary-light dark:text-text-primary-dark">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {grades.map((grade) => (
                    <tr
                      key={grade.id}
                      className="border-b border-border-light dark:border-border-dark"
                    >
                      <td className="py-2 text-text-primary-light dark:text-text-primary-dark">
                        {grade.course?.name} ({grade.course?.code})
                      </td>
                      <td className="py-2 text-text-primary-light dark:text-text-primary-dark">
                        {grade.score}
                      </td>
                      <td className="py-2">
                        <span
                          className={`px-2 py-1 rounded text-xs ${
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
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
