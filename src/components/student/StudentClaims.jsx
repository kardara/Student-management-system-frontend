import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { toast } from "react-toastify";
import { authApi } from "../../services/apiClient";

export default function StudentClaims() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    fetchApplications();
  }, [user]);

  const fetchApplications = async () => {
    try {
      setLoading(true);

      // Fetch all applications and filter for this student
      const studentId = parseInt(user.id);
      const response = await authApi.get("application/get");
      const studentApplications = Array.isArray(response.data)
        ? response.data.filter((app) => app.student?.id === studentId)
        : [];
      setApplications(studentApplications);
    } catch (error) {
      console.error("Error fetching applications:", error);
      toast.error("Failed to load applications", {
        theme: localStorage.getItem("theme"),
        position: "top-center",
      });
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "APPROVED":
        return "bg-success-light dark:bg-success-dark text-success-dark dark:text-success-light";
      case "REJECTED":
        return "bg-error-light dark:bg-error-dark text-error-dark dark:text-error-light";
      case "PENDING":
      default:
        return "bg-warning-light dark:bg-warning-dark text-warning-dark dark:text-warning-light";
    }
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
            My Applications
          </h1>
          <p className="text-text-secondary-light dark:text-text-secondary-dark">
            View the status of your submitted applications and claims
          </p>
        </div>

        {applications.length === 0 ? (
          <div className="bg-bg-secondary-light dark:bg-bg-secondary-dark rounded-lg p-8 text-center border border-border-light dark:border-border-dark">
            <p className="text-text-secondary-light dark:text-text-secondary-dark text-lg">
              No applications found.
            </p>
            <p className="text-text-secondary-light dark:text-text-secondary-dark text-sm mt-2">
              You haven't submitted any applications yet.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {applications.map((application) => (
              <div
                key={application.id}
                className="bg-bg-secondary-light dark:bg-bg-secondary-dark rounded-lg p-6 border border-border-light dark:border-border-dark"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-text-primary-light dark:text-text-primary-dark mb-2">
                      Application #{application.id}
                    </h3>
                    <p className="text-text-secondary-light dark:text-text-secondary-dark text-sm">
                      Submitted on{" "}
                      {new Date(
                        application.applicationDate
                      ).toLocaleDateString()}
                    </p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                      application.status
                    )}`}
                  >
                    {application.status}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-text-secondary-light dark:text-text-secondary-dark text-sm">
                      Application Type
                    </p>
                    <p className="text-text-primary-light dark:text-text-primary-dark font-medium">
                      {application.type || "General Application"}
                    </p>
                  </div>
                  <div>
                    <p className="text-text-secondary-light dark:text-text-secondary-dark text-sm">
                      Priority
                    </p>
                    <p className="text-text-primary-light dark:text-text-primary-dark font-medium">
                      {application.priority || "Normal"}
                    </p>
                  </div>
                </div>

                {application.description && (
                  <div className="mt-4">
                    <p className="text-text-secondary-light dark:text-text-secondary-dark text-sm">
                      Description
                    </p>
                    <p className="text-text-primary-light dark:text-text-primary-dark mt-1">
                      {application.description}
                    </p>
                  </div>
                )}

                {application.status === "REJECTED" &&
                  application.rejectionReason && (
                    <div className="mt-4 p-3 bg-error-light dark:bg-error-dark bg-opacity-10 rounded-lg border border-error-light dark:border-error-dark">
                      <p className="text-error-light dark:text-error-dark text-sm font-medium">
                        Rejection Reason:
                      </p>
                      <p className="text-error-light dark:text-error-dark text-sm mt-1">
                        {application.rejectionReason}
                      </p>
                    </div>
                  )}

                {application.status === "APPROVED" &&
                  application.approvalDate && (
                    <div className="mt-4 p-3 bg-success-light dark:bg-success-dark bg-opacity-10 rounded-lg border border-success-light dark:border-success-dark">
                      <p className="text-success-light dark:text-success-dark text-sm">
                        Approved on{" "}
                        {new Date(
                          application.approvalDate
                        ).toLocaleDateString()}
                      </p>
                    </div>
                  )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
