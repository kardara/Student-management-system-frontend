import React, { useState, useEffect } from 'react';
import { 
  Users, 
  GraduationCap, 
  BookOpen, 
  CreditCard, 
  Calendar,
  Building,
  UserCheck,
  UserX,
  DollarSign,
  TrendingUp,
  PieChart,
  BarChart3,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import GlobalSearchField from '../globalSearch/GlobalSearchField';
import StatsCard from '../UI/StatsCard';
import SimpleBarChart from '../charts/SimpleBarChart';
import SimplePieChart from '../charts/SimplePieChart';
import { globalSearchService } from '../../services/globalSearchService';
import { toast } from 'react-toastify';

export default function AdminDashboard() {
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
  const activeStudents = globalData.students?.filter(s => s.status === 'ACTIVE').length || 0;
  const suspendedStudents = globalData.students?.filter(s => s.status === 'SUSPENDED').length || 0;
  const totalTeachers = globalData.teachers?.length || 0;
  const totalStaff = globalData.staffs?.length || 0;
  const totalCourses = globalData.courses?.length || 0;
  const offeredCourses = globalData.offeredCourses?.length || 0;
  const totalSemesters = globalData.semesters?.length || 0;
  const activeSemesters = globalData.semesters?.filter(s => s.status === 'ACTIVE').length || 0;

  // Calculate financial data
  const totalFees = globalData.fees?.reduce((sum, fee) => sum + fee.amount, 0) || 0;
  const totalPayments = globalData.payments?.reduce((sum, payment) => sum + payment.amount, 0) || 0;
  const outstandingBalance = totalFees - totalPayments;

  // Department distribution
  const departmentData = {};
  globalData.students?.forEach(student => {
    const deptName = student.department?.name || 'Unknown';
    departmentData[deptName] = (departmentData[deptName] || 0) + 1;
  });

  const departmentChartData = Object.entries(departmentData).map(([name, value]) => ({
    name: name.length > 20 ? name.substring(0, 20) + '...' : name,
    value,
    fill: name === 'Finance' ? '#3182CE' : 
          name === 'Network & Communication Systems' ? '#48BB78' :
          name === 'Software Engineering' ? '#E53E3E' : '#4299E1'
  }));

  // Faculty distribution
  const facultyData = {};
  globalData.students?.forEach(student => {
    const facultyName = student.department?.parent?.name || 'Unknown';
    facultyData[facultyName] = (facultyData[facultyName] || 0) + 1;
  });

  const facultyChartData = Object.entries(facultyData).map(([name, value]) => ({
    name,
    value
  }));

  // Status distribution
  const statusData = [
    { name: 'Active', value: activeStudents, color: '#48BB78' },
    { name: 'Suspended', value: suspendedStudents, color: '#E53E3E' }
  ];

  // Monthly payments (using available payment data)
  const monthlyPayments = globalData.payments?.reduce((acc, payment) => {
    const month = new Date(payment.date).toLocaleDateString('en-US', { month: 'short' });
    acc[month] = (acc[month] || 0) + payment.amount;
    return acc;
  }, {}) || {};

  const paymentChartData = Object.entries(monthlyPayments).map(([month, amount]) => ({
    month,
    amount
  }));

  return (
    <div className="min-h-screen bg-bg-light dark:bg-bg-dark p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-text-primary-light dark:text-text-primary-dark mb-2">
              Admin Dashboard
            </h1>
            <p className="text-text-secondary-light dark:text-text-secondary-dark">
              Welcome to your university management overview
            </p>
          </div>
          <div className="w-64">
            <GlobalSearchField />
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
          title="Revenue"
          value={`RWF ${totalPayments.toLocaleString()}`}
          icon={<DollarSign className="w-8 h-8 text-success-light dark:text-success-dark" />}
          trend="+15%"
          trendUp={true}
        />
      </div>

      {/* Secondary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        <div className="bg-bg-secondary-light dark:bg-bg-secondary-dark rounded-lg p-4 border border-border-light dark:border-border-dark">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-text-secondary-light dark:text-text-secondary-dark text-sm">Active Students</p>
              <p className="text-2xl font-bold text-success-light dark:text-success-dark">{activeStudents}</p>
            </div>
            <UserCheck className="w-6 h-6 text-success-light dark:text-success-dark" />
          </div>
        </div>

        <div className="bg-bg-secondary-light dark:bg-bg-secondary-dark rounded-lg p-4 border border-border-light dark:border-border-dark">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-text-secondary-light dark:text-text-secondary-dark text-sm">Suspended</p>
              <p className="text-2xl font-bold text-error-light dark:text-error-dark">{suspendedStudents}</p>
            </div>
            <UserX className="w-6 h-6 text-error-light dark:text-error-dark" />
          </div>
        </div>

        <div className="bg-bg-secondary-light dark:bg-bg-secondary-dark rounded-lg p-4 border border-border-light dark:border-border-dark">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-text-secondary-light dark:text-text-secondary-dark text-sm">Staff Members</p>
              <p className="text-2xl font-bold text-primary-light dark:text-primary-dark">{totalStaff}</p>
            </div>
            <Building className="w-6 h-6 text-primary-light dark:text-primary-dark" />
          </div>
        </div>

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
              <p className="text-text-secondary-light dark:text-text-secondary-dark text-sm">Outstanding</p>
              <p className="text-2xl font-bold text-error-light dark:text-error-dark">
                RWF {Math.abs(outstandingBalance).toLocaleString()}
              </p>
            </div>
            <AlertCircle className="w-6 h-6 text-error-light dark:text-error-dark" />
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Department Distribution */}
        <div className="bg-bg-secondary-light dark:bg-bg-secondary-dark rounded-lg p-6 border border-border-light dark:border-border-dark">
          <div className="flex items-center mb-4">
            <PieChart className="w-6 h-6 text-primary-light dark:text-primary-dark mr-2" />
            <h3 className="text-xl font-semibold text-text-primary-light dark:text-text-primary-dark">
              Students by Department
            </h3>
          </div>
          <SimplePieChart data={departmentChartData} />
        </div>

        {/* Student Status Distribution */}
        <div className="bg-bg-secondary-light dark:bg-bg-secondary-dark rounded-lg p-6 border border-border-light dark:border-border-dark">
          <div className="flex items-center mb-4">
            <BarChart3 className="w-6 h-6 text-success-light dark:text-success-dark mr-2" />
            <h3 className="text-xl font-semibold text-text-primary-light dark:text-text-primary-dark">
              Student Status
            </h3>
          </div>
          <SimplePieChart data={statusData} />
        </div>
      </div>

      {/* Faculty Distribution Bar Chart */}
      {facultyChartData.length > 0 && (
        <div className="bg-bg-secondary-light dark:bg-bg-secondary-dark rounded-lg p-6 border border-border-light dark:border-border-dark mb-8">
          <div className="flex items-center mb-4">
            <TrendingUp className="w-6 h-6 text-accent-light dark:text-accent-dark mr-2" />
            <h3 className="text-xl font-semibold text-text-primary-light dark:text-text-primary-dark">
              Students by Faculty
            </h3>
          </div>
          <SimpleBarChart 
            data={facultyChartData} 
            dataKey="value"
            barColor="#3182CE"
          />
        </div>
      )}

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
            {globalData.payments?.slice(0, 5).map((payment) => (
              <div key={payment.id} className="flex justify-between items-center py-2 border-b border-border-light dark:border-border-dark last:border-b-0">
                <div>
                  <p className="font-medium text-text-primary-light dark:text-text-primary-dark">
                    {payment.student.firstName} {payment.student.lastName}
                  </p>
                  <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">
                    {payment.paymentMode} • {new Date(payment.date).toLocaleDateString()}
                  </p>
                </div>
                <div className="text-success-light dark:text-success-dark font-semibold">
                  ${payment.amount.toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Registrations */}
        <div className="bg-bg-secondary-light dark:bg-bg-secondary-dark rounded-lg p-6 border border-border-light dark:border-border-dark">
          <div className="flex items-center mb-4">
            <Users className="w-6 h-6 text-primary-light dark:text-primary-dark mr-2" />
            <h3 className="text-xl font-semibold text-text-primary-light dark:text-text-primary-dark">
              Recent Registrations
            </h3>
          </div>
          <div className="space-y-3">
            {globalData.registrations?.sort((a,b) => a.date - b.date).slice(0, 5).map((registration) => (
              <div key={registration.id} className="flex justify-between items-center py-2 border-b border-border-light dark:border-border-dark last:border-b-0">
                <div>
                  <p className="font-medium text-text-primary-light dark:text-text-primary-dark">
                    {registration.student.firstName} {registration.student.lastName}
                  </p>
                  <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">
                    {registration.semester.name} {registration.semester.year} • {registration.courses?.length || 0} courses
                  </p>
                </div>
                <div className="text-primary-light dark:text-primary-dark text-sm">
                  {new Date(registration.date).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}