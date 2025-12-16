import React, { useEffect, useState } from 'react'
import LoadingComponents from './UI/Loading';
import { manageCoursesService } from '../services/manageCoursesService';
import ManagementComponentHeader from './UI/ManagementComponentHeader';
import ViewCourseModal from './manageCourse/ViewCourseModal';
import EditCourseModal from './manageCourse/EditCourseModal';
import AddCourseModal from './manageCourse/AddCourseModal';
import SelectAcademicUnit from './forms/SelectAcademicUnit';
import { useNavigate } from 'react-router-dom';

export default function ManageCourses() {
  const navigate = useNavigate();

  const [courses, setCourses] = useState();
  const [filterdCourses, setFilterCourses] = useState();
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("id"); // come back to it later

  const [departmentFilter, setDepartmentFilter] = useState(null);
  const [statusFilter, setStatusFilter] = useState(null);
  const [searchedString, setSearchedString] = useState(null);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [courseModalId, setCourseModalId] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const rows = 10

  const indexOfLastItem = currentPage * rows;
  const indexOfFirstItem = indexOfLastItem - rows;
  const currentItems = filterdCourses?.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil(courses?.length / rows);

  const filterCourses = (crs) => {
    const searchByString = (searchedValue, item) => {
      const b = item.code.concat(item.name, item.academicUnit.code, item.academicUnit.name).toLowerCase();
      if (b.includes(searchedValue.toLowerCase())) {
        return true;
      }
      return false;
    }

    if (searchedString && departmentFilter) {
      return crs?.filter((e) => searchByString(searchedString, e) && e.departmentName == departmentFilter);
    }

    if (departmentFilter) {
      return crs?.filter((e) => e.academicUnit.code == departmentFilter);
    }

    if (searchedString) {
      return crs?.filter((e) => searchByString(searchedString, e));
    }
    return courses;
  }

  useEffect(() => {
    console.log("Fetching courses...");

    const fetchCoursesData = () => {
      manageCoursesService.get().then((resp) => {
        setCourses(resp.sort((a, b) => {
          if (a.name > b.name)
            return 1;
          if (a.name < b.name)
            return -1;
          return 0;
        }));
        setFilterCourses(resp.sort((a, b) => {
          if (a.name > b.name)
            return 1;
          if (a.name < b.name)
            return -1;
          return 0;
        }));
        setLoading(false)
      })
    }

    fetchCoursesData();
  }, [])

  useEffect(() => {
    if (courses) {
      setFilterCourses(filterCourses(courses));
    }
  }, [searchedString, departmentFilter])

  if (loading) {
    return (
      <div className='flex h-full justify-center items-center min-h-96'> 
        <LoadingComponents type="spinner" /> 
      </div>
    )
  }

  const headers = ["S/N", "Code", "Name", "Credits", "Prerequisites", "Department"]

  return (
    <>
      <div 
        className='flex flex-col space-y-6 p-4 lg:p-6' 
        style={{ display: showAddModal || showViewModal || showEditModal ? "none" : "flex" }}
      >
        {/* Header Section */}
        <div className='bg-bg-secondary-light dark:bg-bg-secondary-dark rounded-lg p-4 shadow-sm'>
          <ManagementComponentHeader title="Courses" name="+Add course" setShowAddModal={setShowAddModal} />
        </div>

        {/* Filters and Controls Section */}
        <div className='bg-bg-secondary-light dark:bg-bg-secondary-dark rounded-lg p-4 shadow-sm'>
          <div className='flex flex-col gap-4 justify-between lg:flex-row lg:items-center'>
            {/* Filter Controls */}
            <div className='flex flex-col gap-3 lg:flex-row lg:items-center'>
              {/* Search Input */}
              <div className='relative'>
                <input 
                  type="search" 
                  placeholder='Search courses, codes, departments...' 
                  className='w-full lg:w-64 px-4 py-2 rounded-lg border-2 border-transparent bg-bg-primary-light dark:bg-bg-primary-dark text-text-primary-light dark:text-text-primary-dark placeholder-text-secondary-light dark:placeholder-text-secondary-dark focus:border-accent-light dark:focus:border-accent-dark focus:outline-none transition-colors duration-200' 
                  value={searchedString || ''} 
                  onChange={(e) => setSearchedString(e.target.value)} 
                />
                {searchedString && (
                  <div className='absolute inset-y-0 right-0 flex items-center pr-3'>
                    <button 
                      onClick={() => setSearchedString('')}
                      className='text-text-secondary-light dark:text-text-secondary-dark hover:text-text-primary-light dark:hover:text-text-primary-dark'
                    >
                      ✕
                    </button>
                  </div>
                )}
              </div>

              {/* Department Filter */}
              <div className='min-w-48'>
                <SelectAcademicUnit 
                  label=" " 
                  value={departmentFilter || ''} 
                  onChange={(e) => setDepartmentFilter(e.target.value)} 
                />
              </div>

              {/* Clear Filters Button */}
              {(departmentFilter || statusFilter || searchedString) && (
                <button
                  className='px-4 py-2 bg-button-bg-secondary-light dark:bg-button-bg-secondary-dark text-button-text-secondary-light dark:text-button-text-secondary-dark font-medium rounded-lg hover:opacity-80 transition-opacity duration-200 whitespace-nowrap'
                  onClick={() => { 
                    setDepartmentFilter(""); 
                    setSearchedString(""); 
                    setStatusFilter(null);
                  }}
                >
                  Clear Filters
                </button>
              )}
            </div>

            {/* Export Button */}
            <div className='flex items-center'>
              <button 
                onClick={undefined} 
                className='px-6 py-2 bg-button-bg-primary-light dark:bg-button-bg-primary-dark text-button-text-primary-light dark:text-button-text-primary-dark font-semibold rounded-lg hover:opacity-90 transition-opacity duration-200 shadow-sm'
              >
                Export Data
              </button>
            </div>
          </div>

          {/* Results Summary */}
          {filterdCourses && (
            <div className='mt-4 pt-4 border-t border-text-secondary-light/20 dark:border-text-secondary-dark/20'>
              <p className='text-sm text-text-secondary-light dark:text-text-secondary-dark'>
                Showing {currentItems?.length || 0} of {filterdCourses.length} courses
                {(searchedString || departmentFilter) && (
                  <span className='ml-2 px-2 py-1 bg-accent-light/10 dark:bg-accent-dark/10 text-accent-light dark:text-accent-dark rounded text-xs'>
                    Filtered
                  </span>
                )}
              </p>
            </div>
          )}
        </div>

        {/* Table Section */}
        {currentItems?.length ? (
          <div className='bg-bg-secondary-light dark:bg-bg-secondary-dark rounded-lg shadow-sm overflow-hidden'>
            <div className='overflow-x-auto'>
              <table className='w-full'>
                <thead className='bg-bg-primary-light dark:bg-bg-primary-dark border-b border-text-secondary-light/20 dark:border-text-secondary-dark/20'>
                  <tr>
                    {headers.map((h, id) => (
                      <th 
                        key={id}
                        className='px-6 py-4 text-left text-sm font-semibold text-text-primary-light dark:text-text-primary-dark uppercase tracking-wider'
                      >
                        {h}
                      </th>
                    ))}
                    <th className='px-6 py-4 text-left text-sm font-semibold text-text-primary-light dark:text-text-primary-dark uppercase tracking-wider'>
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className='divide-y divide-text-secondary-light/10 dark:divide-text-secondary-dark/10'>
                  {currentItems.map((item, id) => (
                    <tr 
                      key={id}
                      onClick={() => { navigate(`view/${item.id}`) }}
                      className='hover:bg-bg-primary-light dark:hover:bg-bg-primary-dark cursor-pointer transition-colors duration-150'
                    >
                      <td className='px-6 py-4 text-sm text-text-primary-light dark:text-text-primary-dark'>
                        {indexOfFirstItem + id + 1}
                      </td>
                      <td className='px-6 py-4'>
                        <span className='inline-flex px-2 py-1 text-xs font-medium bg-accent-light/10 dark:bg-accent-dark/10 text-accent-light dark:text-accent-dark rounded-full'>
                          {item.code}
                        </span>
                      </td>
                      <td className='px-6 py-4 text-sm font-medium text-text-primary-light dark:text-text-primary-dark'>
                        {item.name}
                      </td>
                      <td className='px-6 py-4 text-sm text-text-primary-light dark:text-text-primary-dark'>
                        <span className='inline-flex items-center px-2 py-1 bg-bg-primary-light dark:bg-bg-primary-dark rounded-md'>
                          {item.credit}
                        </span>
                      </td>
                      <td className='px-6 py-4 text-sm text-text-secondary-light dark:text-text-secondary-dark max-w-xs'>
                        {item.prerequisites.length > 0 ? (
                          <div className='flex flex-wrap gap-1'>
                            {item.prerequisites.slice(0, 2).map((prereq, idx) => (
                              <span key={idx} className='inline-flex px-2 py-1 text-xs bg-bg-primary-light dark:bg-bg-primary-dark rounded border'>
                                {prereq}
                              </span>
                            ))}
                            {item.prerequisites.length > 2 && (
                              <span className='text-xs text-text-secondary-light dark:text-text-secondary-dark'>
                                +{item.prerequisites.length - 2} more
                              </span>
                            )}
                          </div>
                        ) : (
                          <span className='text-xs text-text-secondary-light dark:text-text-secondary-dark italic'>
                            None
                          </span>
                        )}
                      </td>
                      <td className='px-6 py-4 text-sm text-text-primary-light dark:text-text-primary-dark'>
                        {item.academicUnit?.name}
                      </td>
                      <td className='px-6 py-4'>
                        <button
                          onClick={(e) => {
                            e.stopPropagation(); 
                            navigate("edit/" + item.id)
                          }}
                          className='inline-flex items-center px-3 py-1 text-sm font-medium text-accent-light dark:text-accent-dark hover:bg-accent-light/10 dark:hover:bg-accent-dark/10 rounded-md transition-colors duration-150'
                        >
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className='px-6 py-4 bg-bg-primary-light dark:bg-bg-primary-dark border-t border-text-secondary-light/20 dark:border-text-secondary-dark/20'>
                <div className='flex items-center justify-between'>
                  <div className='text-sm text-text-secondary-light dark:text-text-secondary-dark'>
                    Page {currentPage} of {totalPages}
                  </div>
                  <div className='flex space-x-1'>
                    {Array.from({ length: totalPages }, (_, index) => (
                      <button
                        key={index}
                        onClick={() => handlePageChange(index + 1)}
                        className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-150 ${
                          currentPage === index + 1
                            ? 'bg-button-bg-primary-light dark:bg-button-bg-primary-dark text-button-text-primary-light dark:text-button-text-primary-dark'
                            : 'bg-bg-secondary-light dark:bg-bg-secondary-dark text-text-secondary-light dark:text-text-secondary-dark hover:bg-bg-primary-light dark:hover:bg-bg-primary-dark'
                        }`}
                      >
                        {index + 1}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className='bg-bg-secondary-light dark:bg-bg-secondary-dark rounded-lg p-12 text-center shadow-sm'>
            <div className='max-w-md mx-auto'>
              <div className='w-16 h-16 mx-auto mb-4 rounded-full bg-bg-primary-light dark:bg-bg-primary-dark flex items-center justify-center'>
                <span className='text-2xl text-text-secondary-light dark:text-text-secondary-dark'>📚</span>
              </div>
              <h3 className='text-lg font-medium text-text-primary-light dark:text-text-primary-dark mb-2'>
                No courses found
              </h3>
              <p className='text-text-secondary-light dark:text-text-secondary-dark mb-4'>
                {(searchedString || departmentFilter) 
                  ? "Try adjusting your filters to see more results." 
                  : "Get started by adding your first course."}
              </p>
              {!(searchedString || departmentFilter) && (
                <button
                  onClick={() => setShowAddModal(true)}
                  className='px-6 py-2 bg-button-bg-primary-light dark:bg-button-bg-primary-dark text-button-text-primary-light dark:text-button-text-primary-dark font-medium rounded-lg hover:opacity-90 transition-opacity duration-200'
                >
                  Add Course
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Modals */}
      <AddCourseModal isOpen={showAddModal} onClose={() => setShowAddModal(false)} />
    </>
  )
}