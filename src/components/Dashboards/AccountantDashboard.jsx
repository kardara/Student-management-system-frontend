import React, { useState, useEffect } from "react";
import {
  DollarSign,
  CreditCard,
  TrendingUp,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import StatsCard from "../UI/StatsCard";
import { globalSearchService } from "../../services/globalSearchService";
import { toast } from "react-toastify";

export default function AccountantDashboard() {
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

  // Calculate financial data
  const totalFees =
    globalData.fees?.reduce((sum, fee) => sum + fee.amount, 0) || 0;
  const totalPayments =
    globalData.payments?.reduce((sum, payment) => sum + payment.amount, 0) || 0;
  const outstandingBalance = totalFees - totalPayments;
  const totalStudents = globalData.students?.length || 0;

  // Monthly payments
  const monthlyPayments =
    globalData.payments?.reduce((acc, payment) => {
      const month = new Date(payment.date).toLocaleDateString("en-US", {
        month: "short",
      });
      acc[month] = (acc[month] || 0) + payment.amount;
      return acc;
    }, {}) || {};

  const paymentChartData = Object.entries(monthlyPayments).map(
    ([month, amount]) => ({
      month,
      amount,
    })
  );

  return (
    <div className="min-h-screen bg-bg-light dark:bg-bg-dark p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-text-primary-light dark:text-text-primary-dark mb-2">
              Accountant Dashboard
            </h1>
            <p className="text-text-secondary-light dark:text-text-secondary-dark">
              Financial overview and payment management
            </p>
          </div>
        </div>
      </div>

      {/* Stats Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard
          title="Total Revenue"
          value={`RWF ${totalPayments.toLocaleString()}`}
          icon={
            <DollarSign className="w-8 h-8 text-success-light dark:text-success-dark" />
          }
          trend="+15%"
          trendUp={true}
        />
        <StatsCard
          title="Outstanding Balance"
          value={`RWF ${Math.abs(outstandingBalance).toLocaleString()}`}
          icon={
            <AlertCircle className="w-8 h-8 text-error-light dark:text-error-dark" />
          }
          trend="-5%"
          trendUp={false}
        />
        <StatsCard
          title="Total Fees"
          value={`RWF ${totalFees.toLocaleString()}`}
          icon={
            <CreditCard className="w-8 h-8 text-primary-light dark:text-primary-dark" />
          }
          trend="+10%"
          trendUp={true}
        />
        <StatsCard
          title="Students"
          value={totalStudents}
          icon={
            <TrendingUp className="w-8 h-8 text-accent-light dark:text-accent-dark" />
          }
          trend="+8%"
          trendUp={true}
        />
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Payments */}
        <div className="bg-bg-secondary-light dark:bg-bg-secondary-dark rounded-lg p-6 border border-border-light dark:border-border-dark">
          <div className="flex items-center mb-4">
            <CreditCard className="w-6 h-6 text-success-light dark:text-success-dark mr-2" />
            <h3 className="text-xl font-semibold text-text-primary-light dark:text-text-primary-dark">
              Recent Payments
            </h3>
          </div>
          <div className="space-y-3">
            {globalData.payments?.slice(0, 10).map((payment) => (
              <div
                key={payment.id}
                className="flex justify-between items-center py-2 border-b border-border-light dark:border-border-dark last:border-b-0"
              >
                <div>
                  <p className="font-medium text-text-primary-light dark:text-text-primary-dark">
                    {payment.student.firstName} {payment.student.lastName}
                  </p>
                  <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">
                    {payment.paymentMode} •{" "}
                    {new Date(payment.date).toLocaleDateString()}
                  </p>
                </div>
                <div className="text-success-light dark:text-success-dark font-semibold">
                  RWF {payment.amount.toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Fee Summary */}
        <div className="bg-bg-secondary-light dark:bg-bg-secondary-dark rounded-lg p-6 border border-border-light dark:border-border-dark">
          <div className="flex items-center mb-4">
            <DollarSign className="w-6 h-6 text-primary-light dark:text-primary-dark mr-2" />
            <h3 className="text-xl font-semibold text-text-primary-light dark:text-text-primary-dark">
              Fee Summary
            </h3>
          </div>
          <div className="space-y-3">
            {globalData.fees?.slice(0, 10).map((fee) => (
              <div
                key={fee.id}
                className="flex justify-between items-center py-2 border-b border-border-light dark:border-border-dark last:border-b-0"
              >
                <div>
                  <p className="font-medium text-text-primary-light dark:text-text-primary-dark">
                    {fee.student.firstName} {fee.student.lastName}
                  </p>
                  <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">
                    Semester: {fee.semester.name} {fee.semester.year}
                  </p>
                </div>
                <div className="text-primary-light dark:text-primary-dark font-semibold">
                  RWF {fee.amount.toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
