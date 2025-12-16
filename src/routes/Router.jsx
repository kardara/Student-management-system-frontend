import { createBrowserRouter } from "react-router-dom";

import NotFound from "../pages/NotFound";
import OauthRedirect from "../pages/Authentication/OauthRedirect";
import Login from "../pages/Authentication/Login";
import Signup from "../pages/Authentication/Signup";
import OauthFailed from "../pages/Authentication/OauthFailed";
import PublicOnlyRoutes from "./PublicOnlyRoutes";
import ProtectedRoutes from "./ProtectedRoutes";
import StudentHome from "../pages/StudentHome";
import StudentCourse from "../components/student/StudentCourse";
import StudentRegistration from "../components/student/StudentRegistration";
import StudentFinances from "../components/student/StudentFinances";
import StudentClaims from "../components/student/StudentClaims";
import StudentReport from "../components/student/StudentReport";
import StudentProfile from "../components/student/StudentProfile";
import TeacherHome from "../pages/TeacherHome";
import HomeTeacher from "../components/teacher/HomeTeacher";
import TeacherProfile from "../components/teacher/TeacherProfile";
import TeacherGrades from "../components/teacher/TeacherGrades";
import TeacherAttendance from "../components/teacher/TeacherAttendance";
import TeacherCourses from "../components/teacher/TeacherCourses";
import AdminHome from "../pages/AdminHome";
import AcademicHome from "../pages/AcademicHome";
import AccountantHome from "../pages/AccountantHome";
import RegisterHome from "../pages/RegisterHome";
import Unauthorized from "../pages/Unauthorized";
import ManageStudent from "../components/ManageStudent";
import ManageAcademicUnit from "../components/ManageAcademicUnit";
import ManageTeacher from "../components/ManageTeacher";
import ManageCourses from "../components/ManageCourses";
import ManageSemester from "../components/ManageSemester";
import ManageRegistration from "../components/ManageRegistration";
import ManageOfferedCourse from "../components/ManageOfferedCourse";
import Home from "../pages/Home";
import OTPVerification from "../pages/Authentication/OTPVerification";
import ManageApplications from "../components/ManageApplications";
import ManageStaff from "../components/ManageStaff";
import ManageAttendance from "../components/ManageAttendance";
import Apply from "../pages/Apply";
import ManageGrade from "../components/ManageGrade";
import CourseGrades from "../components/manageGrade/CourseGrades";
import SetNewPassWord from "../pages/Authentication/SetNewPassWord";
import ForgetPassword from "../pages/Authentication/ForgetPassword";
import AdminDashboard from "../components/Dashboards/AdminDashboard";
import StudentDashboard from "../components/Dashboards/StudentDashboard";
import AcademicDashboard from "../components/Dashboards/AcademicDashboard";
import AccountantDashboard from "../components/Dashboards/AccountantDashboard";
import RegistrarDashboard from "../components/Dashboards/RegistrarDashboard";
import ViewStudentModal from "../components/manageStudent/ViewStudentModal";
import EditStudentModal from "../components/manageStudent/EditStudentModal";
import ViewCourseModal from "../components/manageCourse/ViewCourseModal";
import EditCourseModal from "../components/manageCourse/EditCourseModal";
import ViewTeacherModal from "../components/manageTeacher/ViewTeacherModal";
import EditTeacherModal from "../components/manageTeacher/EditTeacherModal";
import ManageFinance from "../components/ManageFinance";
import AttendanceManagement from "../components/teacher/AttendanceManagement";
import TeacherDashboard from "../components/Dashboards/TeacherDashboard";

export const router = createBrowserRouter([
  /// TESTTT

  /// Free routes
  {
    path: "*",
    element: <NotFound />,
  },
  {
    path: "unauthorized",
    element: <Unauthorized />,
  },
  {
    path: "/",
    element: <Home />,
  },

  // only non authenticated users
  {
    path: "auth/login",
    element: (
      <PublicOnlyRoutes>
        <Login />
      </PublicOnlyRoutes>
    ),
  },
  {
    path: "apply",
    element: (
      <PublicOnlyRoutes>
        <Apply />
      </PublicOnlyRoutes>
    ),
  },
  {
    path: "/auth/login/otp",
    element: (
      <PublicOnlyRoutes>
        <OTPVerification />
      </PublicOnlyRoutes>
    ),
  },
  {
    path: "auth/signup",
    element: (
      <PublicOnlyRoutes>
        <Signup />
      </PublicOnlyRoutes>
    ),
  },
  {
    path: "auth/oauth2/failed",
    element: (
      <PublicOnlyRoutes>
        <OauthFailed />
      </PublicOnlyRoutes>
    ),
  },
  {
    path: "auth/oauth2/success",
    element: (
      <PublicOnlyRoutes>
        <OauthRedirect />
      </PublicOnlyRoutes>
    ),
  },

  {
    path: "auth/forget-password",
    element: (
      <PublicOnlyRoutes>
        {" "}
        <ForgetPassword />{" "}
      </PublicOnlyRoutes>
    ),
  },

  {
    path: "auth/reset-password/",
    element: (
      <PublicOnlyRoutes>
        {" "}
        <SetNewPassWord />{" "}
      </PublicOnlyRoutes>
    ),
  },

  /// ROle based Routes

  {
    path: "academic",
    element: <AcademicHome />,
    children: [
      {
        index: true,
        element: <AcademicDashboard />,
      },
      {
        path: "home",
        element: <AcademicDashboard />,
      },
    ],
  },
  {
    path: "accountant",
    element: <AccountantHome />,
    children: [
      {
        index: true,
        element: <AccountantDashboard />,
      },
      {
        path: "home",
        element: <AccountantDashboard />,
      },
    ],
  },
  {
    path: "admin",
    element: (
      <ProtectedRoutes requiredRoles="admin">
        {" "}
        <AdminHome />{" "}
      </ProtectedRoutes>
    ),
    children: [
      {
        index: true,
        element: <AdminDashboard />,
      },
      {
        path: "home",
        element: <AdminDashboard />,
      },
      {
        path: "students",
        element: <ManageStudent />,
      },
      {
        path: "students/view/:studentId",
        element: <ViewStudentModal />,
      },
      {
        path: "students/edit/:studentId",
        element: <EditStudentModal />,
      },
      {
        path: "grades",
        element: <ManageGrade />,
      },
      {
        path: "grades/course/:courseId",
        element: <CourseGrades />,
      },
      {
        path: "applications",
        element: <ManageApplications />,
      },
      {
        path: "staff",
        element: <ManageStaff />,
      },
      {
        path: "attendance",
        element: <ManageAttendance />,
      },
      {
        path: "academic unit",
        element: <ManageAcademicUnit />,
      },

      {
        path: "teachers",
        element: <ManageTeacher />,
      },
      {
        path: "teachers/view/:id",
        element: <ViewTeacherModal />,
      },
      {
        path: "teachers/edit/:id",
        element: <EditTeacherModal />,
      },
      {
        path: "courses",
        element: <ManageCourses />,
      },
      {
        path: "courses/view/:courseId",
        element: <ViewCourseModal />,
      },
      {
        path: "courses/edit/:courseId",
        element: <EditCourseModal />,
      },
      {
        path: "offeredcourse",
        element: <ManageOfferedCourse />,
      },
      {
        path: "semesters",
        element: <ManageSemester />,
      },

      {
        path: "finances",
        element: <ManageFinance />,
      },

      {
        path: "registration",
        element: <ManageRegistration />,
      },
      {
        path: "registration/view/:id",
        element: <StudentRegistration />,
      },
    ],
  },
  {
    path: "registrar",
    element: <RegisterHome />,
    children: [
      {
        index: true,
        element: <RegistrarDashboard />,
      },
      {
        path: "home",
        element: <RegistrarDashboard />,
      },
    ],
  },

  {
    path: "/LECTURER",
    element: <TeacherHome />,
    children: [
      {
        index: true,
        element: <TeacherDashboard />,
      },
      {
        index: true,
        path: "home",
        element: <TeacherDashboard />,
      },
      {
        path: "courses",
        element: <TeacherCourses />,
      },
      {
        path: "attendance/:courseId",
        element: <AttendanceManagement />,
      },
      {
        path: "grades/:courseId",
        element: <CourseGrades />,
      },
      {
        path: "profile",
        element: <TeacherProfile />,
      },
    ],
  },

  /////////////////////////////

  {
    path: "student",
    element: (
      <ProtectedRoutes requiredRoles="student">
        {" "}
        <StudentHome />{" "}
      </ProtectedRoutes>
    ),
    children: [
      {
        index: true,
        element: <StudentDashboard />,
      },
      {
        path: "home",
        element: <StudentDashboard />,
      },
      {
        path: "courses",
        element: <StudentCourse />,
      },
      {
        path: "registration",
        element: <StudentRegistration />,
      },
      {
        path: "finances",
        element: <StudentFinances />,
      },
      {
        path: "claims",
        element: <StudentClaims />,
      },
      {
        path: "reports",
        element: <StudentReport />,
      },
      {
        path: "profile",
        element: <StudentProfile />,
      },
    ],
  },
]);
