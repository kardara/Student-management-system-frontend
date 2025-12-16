import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { toast } from "react-toastify";
import { authApi } from "../../services/apiClient";

export default function StudentFinances() {
  const [fees, setFees] = useState([]);
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    fetchFinancialData();
  }, [user]);

  const fetchFinancialData = async () => {
    try {
      setLoading(true);

      // Fetch all fees and filter for this student
      const studentId = parseInt(user.id);
      const feesResponse = await authApi.get("fees/get");
      const studentFees = Array.isArray(feesResponse.data)
        ? feesResponse.data.filter((fee) => fee.student?.id === studentId)
        : [];
      setFees(studentFees);

      // Fetch all payments and filter for this student
      const paymentsResponse = await authApi.get("payment/get");
      const studentPayments = Array.isArray(paymentsResponse.data)
        ? paymentsResponse.data.filter(
            (payment) => payment.student?.id === studentId
          )
        : [];
      setPayments(studentPayments);
    } catch (error) {
      console.error("Error fetching financial data:", error);
      toast.error("Failed to load financial data", {
        theme: localStorage.getItem("theme"),
        position: "top-center",
      });
    } finally {
      setLoading(false);
    }
  };

  const totalFees = fees.reduce((sum, fee) => sum + fee.amount, 0);
  const totalPayments = payments.reduce(
    (sum, payment) => sum + payment.amount,
    0
  );
  const outstandingBalance = totalFees - totalPayments;

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
            My Finances
          </h1>
          <p className="text-text-secondary-light dark:text-text-secondary-dark">
            View your fees, payments, and outstanding balance
          </p>
        </div>

        {/* Financial Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-bg-secondary-light dark:bg-bg-secondary-dark rounded-lg p-6 border border-border-light dark:border-border-dark">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-text-secondary-light dark:text-text-secondary-dark text-sm">
                  Total Fees
                </p>
                <p className="text-2xl font-bold text-primary-light dark:text-primary-dark">
                  RWF {totalFees.toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-bg-secondary-light dark:bg-bg-secondary-dark rounded-lg p-6 border border-border-light dark:border-border-dark">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-text-secondary-light dark:text-text-secondary-dark text-sm">
                  Total Payments
                </p>
                <p className="text-2xl font-bold text-success-light dark:text-success-dark">
                  RWF {totalPayments.toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-bg-secondary-light dark:bg-bg-secondary-dark rounded-lg p-6 border border-border-light dark:border-border-dark">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-text-secondary-light dark:text-text-secondary-dark text-sm">
                  Outstanding Balance
                </p>
                <p
                  className={`text-2xl font-bold ${
                    outstandingBalance > 0
                      ? "text-error-light dark:text-error-dark"
                      : "text-success-light dark:text-success-dark"
                  }`}
                >
                  RWF {Math.abs(outstandingBalance).toLocaleString()}
                </p>
                {outstandingBalance > 0 && (
                  <p className="text-xs text-error-light dark:text-error-dark mt-1">
                    Amount due
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Fees Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-text-primary-light dark:text-text-primary-dark mb-4">
            Fee Details
          </h2>
          {fees.length === 0 ? (
            <div className="bg-bg-secondary-light dark:bg-bg-secondary-dark rounded-lg p-8 text-center border border-border-light dark:border-border-dark">
              <p className="text-text-secondary-light dark:text-text-secondary-dark text-lg">
                No fees found.
              </p>
            </div>
          ) : (
            <div className="bg-bg-secondary-light dark:bg-bg-secondary-dark rounded-lg border border-border-light dark:border-border-dark overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-bg-tertiary-light dark:bg-bg-tertiary-dark">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-text-primary-light dark:text-text-primary-dark uppercase tracking-wider">
                        Semester
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-text-primary-light dark:text-text-primary-dark uppercase tracking-wider">
                        Amount
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-text-primary-light dark:text-text-primary-dark uppercase tracking-wider">
                        Date
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border-light dark:divide-border-dark">
                    {fees.map((fee) => (
                      <tr key={fee.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-text-primary-light dark:text-text-primary-dark">
                          {fee.semester?.name} {fee.semester?.year}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-text-primary-light dark:text-text-primary-dark">
                          RWF {fee.amount.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-text-secondary-light dark:text-text-secondary-dark">
                          {new Date(fee.date).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* Payments Section */}
        <div>
          <h2 className="text-2xl font-semibold text-text-primary-light dark:text-text-primary-dark mb-4">
            Payment History
          </h2>
          {payments.length === 0 ? (
            <div className="bg-bg-secondary-light dark:bg-bg-secondary-dark rounded-lg p-8 text-center border border-border-light dark:border-border-dark">
              <p className="text-text-secondary-light dark:text-text-secondary-dark text-lg">
                No payments found.
              </p>
            </div>
          ) : (
            <div className="bg-bg-secondary-light dark:bg-bg-secondary-dark rounded-lg border border-border-light dark:border-border-dark overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-bg-tertiary-light dark:bg-bg-tertiary-dark">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-text-primary-light dark:text-text-primary-dark uppercase tracking-wider">
                        Transaction ID
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-text-primary-light dark:text-text-primary-dark uppercase tracking-wider">
                        Amount
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-text-primary-light dark:text-text-primary-dark uppercase tracking-wider">
                        Payment Mode
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-text-primary-light dark:text-text-primary-dark uppercase tracking-wider">
                        Date
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border-light dark:divide-border-dark">
                    {payments.map((payment) => (
                      <tr key={payment.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-text-primary-light dark:text-text-primary-dark">
                          {payment.transactionId || "N/A"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-text-primary-light dark:text-text-primary-dark">
                          RWF {payment.amount.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-text-primary-light dark:text-text-primary-dark">
                          {payment.paymentMode}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-text-secondary-light dark:text-text-secondary-dark">
                          {new Date(payment.date).toLocaleDateString()}
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
    </div>
  );
}
