import React, { useEffect, useState } from 'react';
import { manageOfferedCoursesService } from '../../services/manageOfferedCoursesService';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import { manageStudentRegistrationService } from '../../services/manageStudentRegistrationService';
import { manageGradesService } from '../../services/manageGradesService';
import { FaArrowLeftLong } from 'react-icons/fa6';

export default function GradesManagement() {
  const [students, setStudents] = useState([]);
  const [courseInfo, setCourseInfo] = useState(null);
  const [gradesData, setGradesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const { courseId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (courseId) {
      loadCourseData();
    }
  }, [courseId]);

  const loadCourseData = async () => {
    try {
      // Mock data for demonstration

      await manageOfferedCoursesService.get(courseId).then(c => setCourseInfo(c)).
        catch(() => toast.error("An error occured", { theme: localStorage.getItem('theme'), position: "top-center" }));
      let studd;
      await manageStudentRegistrationService.getStudentByOfferedCourse(courseId).then(st => {
        setStudents(st);
        studd = st;
        console.log(st)

      })

      await manageGradesService.getByCourses(courseId).then(resp => {
        if (!resp || resp.length === 0) {
          const initialGrades = (students || []).map(stud => ({
            id: stud.id,
            student: stud,
            grade: 0
          }));
          setGradesData(initialGrades);

          console.log(resp)

        } else {
          const initialGrades = (resp || []).map(g => ({
            id: g.student.id,
            student: g.student,
            grade: g.grade
          }));
          console.log(initialGrades)
          console.log(studd)
          const studentWithNoGrades = studd.filter(stud => !initialGrades.find(g => g.id === stud.id));
          console.log(studentWithNoGrades)
          const newGrades = [...initialGrades, ...studentWithNoGrades.map(ss => ({ id: ss.id, student: ss, grade: 0 }))];
          setGradesData(newGrades)
        }
      })

      const mockCourseData = {
        course: {
          code: "COSC 8321",
          name: "Mobile Communications"
        },
        students: [
          { id: 1, firstName: "John", lastName: "Doe", studentId: "STU001" },
          { id: 2, firstName: "Jane", lastName: "Smith", studentId: "STU002" },
          { id: 3, firstName: "Mike", lastName: "Johnson", studentId: "STU003" },
          { id: 4, firstName: "Sarah", lastName: "Williams", studentId: "STU004" },
          { id: 5, firstName: "David", lastName: "Brown", studentId: "STU005" }
        ]
      };

      // setCourseInfo(mockCourseData.course);
      // setStudents(mockCourseData.students || []);

      // Initialize grades data with existing grades or 0

      // setGradesData(initialGrades);
    } catch (error) {
      console.error('Error loading course data:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateGrade = (studentId, grade) => {
    // Validate grade (0-20, support decimals)
    const numGrade = parseFloat(grade);
    if (isNaN(numGrade) || numGrade < 0 || numGrade > 20) {
      return;
    }

    setGradesData(prev =>
      prev.map(item =>
        item.id === studentId ? { ...item, grade: numGrade } : item
      )
    );
  };

  const handleSubmitGrades = async () => {
    setSaving(true);
    try {
      // Mock API call - replace with actual service
      // await gradeService.addCourse(gradesData, courseId);

      const gradesFormat = gradesData.map((el) => { return { id: el.student.id, grade: el.grade } })
      console.log(gradesFormat);

      manageGradesService.addCourse(gradesFormat, courseId)
        .then((resp) => {
          toast.success(resp, { theme: localStorage.getItem('theme'), position: "top-center" });

        },
          (err) => toast.error(err, { theme: localStorage.getItem('theme'), position: "top-center" }))
        .catch(() => toast.error("An error occured", { theme: localStorage.getItem('theme'), position: "top-center" }));


      setEditMode(false);
    } catch (error) {
      console.error('Error saving grades:', error);
      alert('Error saving grades. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const getGradeColor = (grade) => {
    if (grade >= 16) return 'text-success-light dark:text-success-dark';
    if (grade >= 12) return 'text-yellow-600 dark:text-yellow-400';
    if (grade >= 10) return 'text-orange-600 dark:text-orange-400';
    return 'text-error-light dark:text-error-dark';
  };

  const getGradeStats = () => {
    const grades = gradesData.map(item => item.grade);
    const average = grades.length > 0 ? (grades.reduce((a, b) => a + b, 0) / grades.length).toFixed(2) : 0;
    const highest = grades.length > 0 ? Math.max(...grades) : 0;
    const lowest = grades.length > 0 ? Math.min(...grades) : 0;
    const passed = grades.filter(grade => grade >= 10).length;
    return { average, highest, lowest, passed, total: grades.length };
  };

  const stats = getGradeStats();

  if (loading) {
    return (
      <div className="p-4 overflow-y-auto">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-border-light dark:bg-border-dark rounded w-1/3"></div>
          <div className="h-32 bg-bg-secondary-light dark:bg-bg-secondary-dark rounded"></div>
          <div className="space-y-2">
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} className="h-16 bg-bg-secondary-light dark:bg-bg-secondary-dark rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 overflow-y-auto">
      <div className="max-w-full">
        {/* Header */}
        <div className='flex justify-between items-center'>

          <div className='flex gap-3'>
            <div>

              <button
                onClick={() => navigate(-1)}
                className='group p-3 rounded-full bg-bg-secondary-light dark:bg-bg-secondary-dark hover:bg-border-light dark:hover:bg-border-dark transition-all duration-200 shadow-sm'
              >
                <FaArrowLeftLong className='text-xl text-text-primary-light dark:text-text-primary-dark group-hover:text-accent-light dark:group-hover:text-accent-dark transition-colors duration-200' />
              </button>
            </div>
            <div className="mb-6">

              <h1 className="text-2xl font-bold text-text-primary-light dark:text-text-primary-dark mb-1">
                Attendance Management
              </h1>
              {courseInfo && (
                <p className="text-text-secondary-light dark:text-text-secondary-dark text-sm">
                  {courseInfo.course.code} - {courseInfo.course.name} (Group  {(courseInfo.group)})
                </p>
              )}
            </div>
          </div>
          <div>

            <button
              onClick={() => setEditMode(!editMode)}
              className="px-4 py-2 bg-accent-light dark:bg-accent-dark text-button-text-primary-light dark:text-button-text-primary-dark rounded font-medium hover:opacity-80 transition-opacity text-sm"
            >
              {editMode ? 'View Mode' : 'Edit Grades'}
            </button>
          </div>
        </div>

        {/* Statistics */}
        <div className="bg-bg-secondary-light dark:bg-bg-secondary-dark rounded-lg border border-border-light dark:border-border-dark p-4 mb-6">
          <h3 className="text-text-primary-light dark:text-text-primary-dark font-semibold mb-3 text-sm">Grade Statistics</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
            <div>
              <div className="text-text-secondary-light dark:text-text-secondary-dark">Average</div>
              <div className="text-text-primary-light dark:text-text-primary-dark font-bold text-lg">{stats.average}/20</div>
            </div>
            <div>
              <div className="text-text-secondary-light dark:text-text-secondary-dark">Highest</div>
              <div className="text-success-light dark:text-success-dark font-bold text-lg">{stats.highest}/20</div>
            </div>
            <div>
              <div className="text-text-secondary-light dark:text-text-secondary-dark">Lowest</div>
              <div className="text-error-light dark:text-error-dark font-bold text-lg">{stats.lowest}/20</div>
            </div>
            <div>
              <div className="text-text-secondary-light dark:text-text-secondary-dark">Passed</div>
              <div className="text-text-primary-light dark:text-text-primary-dark font-bold text-lg">{stats.passed}/{stats.total}</div>
            </div>
            <div>
              <div className="text-text-secondary-light dark:text-text-secondary-dark">Pass Rate</div>
              <div className="text-text-primary-light dark:text-text-primary-dark font-bold text-lg">
                {stats.total > 0 ? Math.round((stats.passed / stats.total) * 100) : 0}%
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        {editMode && (
          <div className="flex gap-2 mb-4">
            <button
              onClick={() => setGradesData(prev => prev.map(item => ({ ...item, grade: 20 })))}
              className="px-3 py-1 bg-success-light dark:bg-success-dark text-white rounded text-sm font-medium hover:opacity-80 transition-opacity"
            >
              Set All to 20
            </button>
            <button
              onClick={() => setGradesData(prev => prev.map(item => ({ ...item, grade: 0 })))}
              className="px-3 py-1 bg-error-light dark:bg-error-dark text-white rounded text-sm font-medium hover:opacity-80 transition-opacity"
            >
              Reset All
            </button>
          </div>
        )}

        {/* Students Grades List */}
        <div className="space-y-2 mb-6">
          {gradesData.map((grade, index) => {
            const student = undefined;
            const gradeItem = gradesData.find(item => item.id === student?.id);
            return (
              <div
                key={grade.student.id}
                className="bg-bg-secondary-light dark:bg-bg-secondary-dark rounded-lg border border-border-light dark:border-border-dark p-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 flex-1">
                    <span className="text-text-secondary-light dark:text-text-secondary-dark text-sm font-medium w-8">
                      {index + 1}.
                    </span>
                    <div className="flex-1">
                      <div className="text-text-primary-light dark:text-text-primary-dark font-medium text-sm">
                        {grade.student.firstName} {grade.student.lastName}
                      </div>
                      <div className="text-text-secondary-light dark:text-text-secondary-dark text-xs">
                        ID: {grade.student.id}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    {editMode ? (
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          min="0"
                          max="20"
                          step="0.1"
                          value={grade?.grade || 0}
                          onChange={(e) => updateGrade(grade.id, e.target.value)}
                          className="w-20 px-2 py-1 rounded border border-border-light dark:border-border-dark bg-bg-light dark:bg-bg-dark text-text-primary-light dark:text-text-primary-dark text-sm text-center"
                        />
                        <span className="text-text-secondary-light dark:text-text-secondary-dark text-sm">/20</span>
                      </div>
                    ) : (
                      <div className="text-right">
                        <div className={`font-bold text-lg ${getGradeColor(grade?.grade || 0)}`}>
                          {grade?.grade || 0}/20
                        </div>
                        <div className="text-text-secondary-light dark:text-text-secondary-dark text-xs">
                          {grade?.grade >= 10 ? 'PASS' : 'FAIL'}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3">
          <button
            onClick={() => window.history.back()}
            className="px-4 py-2 border border-border-light dark:border-border-dark text-text-primary-light dark:text-text-primary-dark rounded font-medium hover:bg-bg-secondary-light hover:dark:bg-bg-secondary-dark transition-colors text-sm"
          >
            Back
          </button>
          {editMode && (
            <button
              onClick={handleSubmitGrades}
              disabled={saving}
              className="px-4 py-2 bg-primary-light dark:bg-primary-dark hover:bg-button-hover-bg-light dark:hover:bg-button-hover-bg-dark text-button-text-primary-light dark:text-button-text-primary-dark rounded font-medium transition-colors disabled:opacity-50 text-sm"
            >
              {saving ? 'Saving...' : 'Save Grades'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}