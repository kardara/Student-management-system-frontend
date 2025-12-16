import React, { useEffect, useState } from "react";
import { manageStudentService } from "../services/manageStudentService";
import LoadingComponents from "./UI/Loading";
import AddStudentModal from "./manageStudent/AddStudentModal";
import ManagementComponentHeader from "./UI/ManagementComponentHeader";
import ViewStudentModal from "./manageStudent/ViewStudentModal";
import EditStudentModal from "./manageStudent/EditStudentModal";
import { useNavigate } from "react-router-dom";

export default function ManageStudent() {
  const navigate = useNavigate();
  const [students, setStudent] = useState();
  const [filterdStudents, setFilterdStudent] = useState();
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("id");
  const [sortOrder, setSortOrder] = useState("asc"); // "asc" or "desc"

  const [departmentFilter, setDepartmentFilter] = useState(null);
  const [statusFilter, setStatusFilter] = useState(null);
  const [searchedString, setSearchedString] = useState(null);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [studentModalID, setStudentModalID] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const rows = 10;

  const indexOfLastItem = currentPage * rows;
  const indexOfFirstItem = indexOfLastItem - rows;
  const currentItems = filterdStudents?.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Sorting function
  const sortStudents = (students, sortBy, order) => {
    if (!students) return students;

    return [...students].sort((a, b) => {
      let aValue, bValue;

      switch (sortBy) {
        case "id":
          aValue = parseInt(a.id);
          bValue = parseInt(b.id);
          break;
        case "firstName":
          aValue = a.firstName?.toLowerCase() || "";
          bValue = b.firstName?.toLowerCase() || "";
          break;
        case "lastName":
          aValue = a.lastName?.toLowerCase() || "";
          bValue = b.lastName?.toLowerCase() || "";
          break;
        case "email":
          aValue = a.email?.toLowerCase() || "";
          bValue = b.email?.toLowerCase() || "";
          break;
        case "program":
          aValue = a.program?.toLowerCase() || "";
          bValue = b.program?.toLowerCase() || "";
          break;
        case "gpa":
          aValue = a.gpa === "N/A" ? -1 : parseFloat(a.gpa) || 0;
          bValue = b.gpa === "N/A" ? -1 : parseFloat(b.gpa) || 0;
          break;
        case "departmentName":
          aValue = a.departmentName?.toLowerCase() || "";
          bValue = b.departmentName?.toLowerCase() || "";
          break;
        case "status":
          aValue = a.status?.toLowerCase() || "";
          bValue = b.status?.toLowerCase() || "";
          break;
        default:
          return 0;
      }

      if (typeof aValue === "string") {
        if (order === "asc") {
          return aValue.localeCompare(bValue);
        } else {
          return bValue.localeCompare(aValue);
        }
      } else {
        if (order === "asc") {
          return aValue - bValue;
        } else {
          return bValue - aValue;
        }
      }
    });
  };

  // Handle header click for sorting
  const handleSort = (column) => {
    const columnMapping = {
      ID: "id",
      "first name": "firstName",
      "Last name": "lastName",
      Email: "email",
      Program: "program",
      GPA: "gpa",
      Department: "departmentName",
      Status: "status",
    };

    const sortColumn = columnMapping[column];
    if (sortBy === sortColumn) {
      // Toggle sort order if same column
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      // Set new column and default to ascending
      setSortBy(sortColumn);
      setSortOrder("asc");
    }
  };

  const filterStudent = (st) => {
    const searchByString = (searchedValue, item) => {
      const b = item.firstName
        .concat(item.lastName, item.email, item.id)
        .toLowerCase();
      if (b.includes(searchedValue.toLowerCase())) {
        return true;
      }
      return false;
    };

    let filtered = st;

    if (searchedString && departmentFilter && statusFilter) {
      filtered = st?.filter(
        (e) =>
          searchByString(searchedString, e) &&
          e.departmentName.toLowerCase() == departmentFilter.toLowerCase() &&
          e.status.toLowerCase() == statusFilter.toLowerCase()
      );
    } else if (searchedString && statusFilter) {
      filtered = st?.filter(
        (e) =>
          searchByString(searchedString, e) &&
          e.status.toLowerCase() == statusFilter.toLowerCase()
      );
    } else if (searchedString && departmentFilter) {
      filtered = st?.filter(
        (e) =>
          searchByString(searchedString, e) &&
          e.departmentName.toLowerCase() == departmentFilter.toLowerCase()
      );
    } else if (departmentFilter && statusFilter) {
      filtered = st?.filter(
        (e) =>
          e.departmentName.toLowerCase() == departmentFilter.toLowerCase() &&
          e.status.toLowerCase() == statusFilter.toLowerCase()
      );
    } else if (departmentFilter) {
      filtered = st?.filter(
        (e) => e.departmentName.toLowerCase() == departmentFilter.toLowerCase()
      );
    } else if (statusFilter) {
      filtered = st?.filter(
        (e) => e.status.toLowerCase() == statusFilter.toLowerCase()
      );
    } else if (searchedString) {
      filtered = st?.filter((e) => searchByString(searchedString, e));
    } else {
      filtered = st;
    }

    return sortStudents(filtered, sortBy, sortOrder);
  };

  const totalPages = Math.ceil(students?.length / rows);

  const headers = [
    "ID",
    "first name",
    "Last name",
    "Email",
    "Program",
    "GPA",
    "Department",
    "Status",
  ];

  // Function to render sort indicator
  const getSortIndicator = (header) => {
    const columnMapping = {
      ID: "id",
      "first name": "firstName",
      "Last name": "lastName",
      Email: "email",
      Program: "program",
      GPA: "gpa",
      Department: "departmentName",
      Status: "status",
    };

    if (sortBy === columnMapping[header]) {
      return sortOrder === "asc" ? " ↑" : " ↓";
    }
    return "";
  };

  useEffect(() => {
    const fetchStudentData = async () => {
      const students = await manageStudentService.get().then((resp) => {
        for (const i in resp) {
          if (resp[i].department != null) {
            resp[i].departmentName = resp[i].department.name;
          }
          if (resp[i].gpa) {
            resp[i].gpa = resp[i].gpa.toFixed(2);
          } else {
            resp[i].gpa = "N/A";
          }
        }
        const sortedData = sortStudents(resp, sortBy, sortOrder);
        setFilterdStudent(sortedData);
        setStudent(resp);
        setLoading(false);
      });
    };
    fetchStudentData();
  }, []);

  useEffect(() => {
    if (students) {
      setFilterdStudent(filterStudent(students));
    }
  }, [statusFilter, departmentFilter, searchedString, sortBy, sortOrder]);

  const statusComponent = (st) => {
    switch (st?.toLowerCase()) {
      case "active":
        return (
          <span className="px-3 py-1.5 text-xs font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 border border-green-200 dark:border-green-700">
            ACTIVE
          </span>
        );
      case "suspended":
        return (
          <span className="px-3 py-1.5 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200 border border-yellow-200 dark:border-yellow-700">
            SUSPENDED
          </span>
        );
      case "excluded":
        return (
          <span className="px-3 py-1.5 text-xs font-semibold rounded-full bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 border border-red-200 dark:border-red-700">
            EXCLUDED
          </span>
        );
      case "graduated":
        return (
          <span className="px-3 py-1.5 text-xs font-semibold rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 border border-blue-200 dark:border-blue-700">
            GRADUATED
          </span>
        );
      default:
        return (
          <span className="px-3 py-1.5 text-xs font-semibold rounded-full bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-600">
            UNKNOWN
          </span>
        );
    }
  };

  if (loading) {
    return (
      <div className="flex h-full justify-center items-center min-h-[60vh]">
        <LoadingComponents type="spinner" />
      </div>
    );
  }

  return (
    <>
      <div
        className="flex flex-col space-y-6"
        style={{
          display:
            showAddModal || showViewModal || showEditModal ? "none" : "flex",
        }}
      >
        <ManagementComponentHeader
          title="Student"
          name={"+ Add Student"}
          setShowAddModal={setShowAddModal}
        />

        {/* Enhanced Filters Section */}
        <div className="bg-bg-secondary-light dark:bg-bg-secondary-dark rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex flex-col gap-4 justify-between lg:flex-row lg:gap-6">
            <div className="flex flex-col gap-3 lg:flex-row lg:gap-4 lg:items-center lg:flex-1">
              {/* Search Input */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg
                    className="h-4 w-4 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
                <input
                  type="search"
                  placeholder="Search students..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  value={searchedString || ""}
                  onChange={(e) => setSearchedString(e.target.value)}
                />
              </div>

              {/* Department Filter */}
              <div className="min-w-[200px]">
                <select
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  value={departmentFilter || ""}
                  onChange={(e) => setDepartmentFilter(e.target.value)}
                >
                  <option value="">All Departments</option>
                  <optgroup
                    label="Information Technology"
                    className="font-semibold"
                  >
                    <option value="Software Engineering">
                      Software Engineering
                    </option>
                    <option value="Network & Communicaion Systems">
                      Network & Comm System
                    </option>
                    <option value="-">Information Management</option>
                  </optgroup>
                  <optgroup label="Business" className="font-semibold">
                    <option value="">Accounting</option>
                    <option value="">Finance</option>
                  </optgroup>
                </select>
              </div>

              {/* Status Filter */}
              <div className="min-w-[150px]">
                <select
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  value={statusFilter || ""}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="">All Status</option>
                  <option value="Active">Active</option>
                  <option value="Suspended">Suspended</option>
                  <option value="Excluded">Excluded</option>
                  <option value="Graduated">Graduated</option>
                </select>
              </div>

              {/* Clear Filters Button */}
              {(departmentFilter || statusFilter || searchedString) && (
                <button
                  className="px-4 py-2.5 bg-gray-500 hover:bg-gray-600 text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-105 focus:ring-2 focus:ring-gray-400 focus:outline-none"
                  onClick={() => {
                    setDepartmentFilter("");
                    setStatusFilter("");
                    setSearchedString("");
                  }}
                >
                  Clear Filters
                </button>
              )}
            </div>

            {/* Export Button */}
            <div className="flex items-center">
              <button
                onClick={undefined}
                className="px-6 py-2.5 bg-button-bg-primary-light dark:bg-button-bg-primary-dark text-button-text-primary-light font-semibold rounded-lg transition-all duration-200 transform hover:scale-105 focus:ring-2 focus:ring-blue-400 focus:outline-none shadow-md hover:shadow-lg"
              >
                <svg
                  className="inline-block w-4 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                Export
              </button>
            </div>
          </div>

          {/* Results Summary */}
          {filterdStudents && (
            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Showing{" "}
                <span className="font-semibold text-gray-900 dark:text-gray-100">
                  {currentItems?.length || 0}
                </span>{" "}
                of{" "}
                <span className="font-semibold text-gray-900 dark:text-gray-100">
                  {filterdStudents.length}
                </span>{" "}
                students
                {(departmentFilter || statusFilter || searchedString) && (
                  <span className="ml-2 text-blue-600 dark:text-blue-400">
                    (filtered)
                  </span>
                )}
              </p>
            </div>
          )}
        </div>

        {/* Enhanced Table Section */}
        {currentItems?.length ? (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
                  <tr>
                    {headers.map((h, id) => (
                      <th
                        key={id}
                        onClick={() => handleSort(h)}
                        className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 select-none transition-colors duration-200 group"
                        title={`Click to sort by ${h}`}
                      >
                        <div className="flex items-center space-x-1">
                          <span>{h}</span>
                          <span className="text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 text-sm">
                            {getSortIndicator(h) || "↕"}
                          </span>
                        </div>
                      </th>
                    ))}
                    <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {currentItems.map((item, id) => (
                    <tr
                      key={id}
                      onClickCapture={() => {
                        navigate(`view/${item.id}`);
                      }}
                      className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200 cursor-pointer group"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                        <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-xs font-mono">
                          {item.id}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100 font-medium">
                        {item.firstName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100 font-medium">
                        {item.lastName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                        {item.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                        <span className="px-2 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-md text-xs font-medium">
                          {item.program}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900 dark:text-gray-100">
                        <span
                          className={`px-2 py-1 rounded-md text-xs font-bold ${
                            item.gpa === "N/A"
                              ? "bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
                              : parseFloat(item.gpa) >= 16
                              ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300"
                              : parseFloat(item.gpa) >= 12
                              ? "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300"
                              : "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300"
                          }`}
                        >
                          {item.gpa}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                        <span className="px-2 py-1 bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-md text-xs font-medium">
                          {item.departmentName}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        {statusComponent(item.status)}
                      </td>
                      <td
                        className="px-6 py-4 whitespace-nowrap text-center"
                        onClick={(e) => {
                          e.stopPropagation();
                          setStudentModalID(item.id);
                          setShowViewModal(false);
                          setShowEditModal(true);
                        }}
                      >
                        <button className="inline-flex items-center px-3 py-1.5 text-xs font-semibold text-accent-light dark:text-accent-dark hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-md transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400">
                          <svg
                            className="w-3 h-3 mr-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                            />
                          </svg>
                          EDIT
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Enhanced Pagination */}
            {totalPages > 1 && (
              <div className="bg-gray-50 dark:bg-gray-900 px-6 py-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Page{" "}
                    <span className="font-semibold text-gray-900 dark:text-gray-100">
                      {currentPage}
                    </span>{" "}
                    of{" "}
                    <span className="font-semibold text-gray-900 dark:text-gray-100">
                      {totalPages}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() =>
                        handlePageChange(Math.max(1, currentPage - 1))
                      }
                      disabled={currentPage === 1}
                      className="px-3 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                    >
                      Previous
                    </button>
                    {Array.from({ length: totalPages }, (_, index) => (
                      <button
                        key={index}
                        onClick={() => handlePageChange(index + 1)}
                        className={`px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 transform hover:scale-105 ${
                          currentPage === index + 1
                            ? "bg-blue-600 text-white shadow-md"
                            : "text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-100"
                        }`}
                      >
                        {index + 1}
                      </button>
                    ))}
                    <button
                      onClick={() =>
                        handlePageChange(Math.min(totalPages, currentPage + 1))
                      }
                      disabled={currentPage === totalPages}
                      className="px-3 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-12">
            <div className="text-center">
              <svg
                className="mx-auto h-16 w-16 text-gray-400 mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1"
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                />
              </svg>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                No Students Found
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                {departmentFilter || statusFilter || searchedString
                  ? "Try adjusting your filters to see more results."
                  : "Get started by adding your first student."}
              </p>
              {(departmentFilter || statusFilter || searchedString) && (
                <button
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-105"
                  onClick={() => {
                    setDepartmentFilter("");
                    setStatusFilter("");
                    setSearchedString("");
                  }}
                >
                  Clear All Filters
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      <AddStudentModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
      />
    </>
  );
}
