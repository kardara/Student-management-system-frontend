import React, { useState, useEffect } from "react";
import { authApi } from "../services/apiClient";
import { toast } from "react-toastify";
import LoadingComponents from "./UI/Loading";
import StatsCard from "./UI/StatsCard";
import { DollarSign, CreditCard, TrendingUp, AlertCircle } from "lucide-react";

export default function ManageFinance() {
  const [fees, setFees] = useState([]);
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFinancialData();
  }, []);

  const fetchFinancialData = async () => {
    try {
      setLoading(true);

      // Fetch all payments (fees endpoint not available)
      const paymentsResponse = await authApi.get("payment/get");
      setPayments(
        Array.isArray(paymentsResponse.data) ? paymentsResponse.data : []
      );

      // Set empty fees since endpoint doesn't exist
      setFees([]);
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
            Financial Management
          </h1>
          <p className="text-text-secondary-light dark:text-text-secondary-dark">
            Overview of all financial transactions and outstanding balances
          </p>
        </div>

        {/* Financial Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="Total Fees Collected"
            value={`RWF ${totalFees.toLocaleString()}`}
            icon={
              <DollarSign className="w-8 h-8 text-success-light dark:text-success-dark" />
            }
            trend="+15%"
            trendUp={true}
          />
          <StatsCard
            title="Total Payments"
            value={`RWF ${totalPayments.toLocaleString()}`}
            icon={
              <CreditCard className="w-8 h-8 text-primary-light dark:text-primary-dark" />
            }
            trend="+10%"
            trendUp={true}
          />
          <StatsCard
            title="Outstanding Balance"
            value={`RWF ${Math.abs(outstandingBalance).toLocaleString()}`}
            icon={
              <AlertCircle className="w-8 h-8 text-error-light dark:text-error-dark" />
            }
            trend={outstandingBalance > 0 ? "-5%" : "0%"}
            trendUp={false}
          />
          <StatsCard
            title="Payment Rate"
            value={`${
              totalFees > 0 ? ((totalPayments / totalFees) * 100).toFixed(1) : 0
            }%`}
            icon={
              <TrendingUp className="w-8 h-8 text-accent-light dark:text-accent-dark" />
            }
            trend="+8%"
            trendUp={true}
          />
        </div>

        {/* Recent Payments */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-text-primary-light dark:text-text-primary-dark mb-4">
            Recent Payments
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
                        Student
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-text-primary-light dark:text-text-primary-dark uppercase tracking-wider">
                        Amount
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-text-primary-light dark:text-text-primary-dark uppercase tracking-wider">
                        Payment Mode
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-text-primary-light dark:text-text-primary-dark uppercase tracking-wider">
                        Transaction ID
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-text-primary-light dark:text-text-primary-dark uppercase tracking-wider">
                        Date
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border-light dark:divide-border-dark">
                    {payments.slice(0, 10).map((payment) => (
                      <tr key={payment.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-text-primary-light dark:text-text-primary-dark">
                          {payment.student?.firstName}{" "}
                          {payment.student?.lastName}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-text-primary-light dark:text-text-primary-dark">
                          RWF {payment.amount.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-text-primary-light dark:text-text-primary-dark">
                          {payment.paymentMode}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-text-secondary-light dark:text-text-secondary-dark">
                          {payment.transactionId || "N/A"}
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

        {/* Fee Summary */}
        <div>
          <h2 className="text-2xl font-semibold text-text-primary-light dark:text-text-primary-dark mb-4">
            Fee Summary
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
                        Student
                      </th>
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
                    {fees.slice(0, 10).map((fee) => (
                      <tr key={fee.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-text-primary-light dark:text-text-primary-dark">
                          {fee.student?.firstName} {fee.student?.lastName}
                        </td>
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
      </div>
    </div>
  );
}
