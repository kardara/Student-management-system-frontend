import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { manageOfferedCoursesService } from '../../services/manageOfferedCoursesService';
import { manageStudentRegistrationService } from '../../services/manageStudentRegistrationService';
import { manageAttendenceService } from '../../services/manageAttendenceService';
import { FaArrowLeftLong } from 'react-icons/fa6';
import { toast } from 'react-toastify';
// import { attendanceService } from '../../services/attendanceService';
// import { manageTeachersService } from '../../services/manageTeachersService';

export default function AttendanceManagement() {
  const [students, setStudents] = useState([]);
  const [courseInfo, setCourseInfo] = useState(null);
  const [attendanceData, setAttendanceData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const { courseId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (courseId) {
      loadCourseData();
    }
  }, [courseId]);

  const loadCourseData = async () => {
    try {
      manageOfferedCoursesService.get(courseId).then((resp) => {
        console.log(resp)
        setCourseInfo(resp);
      })

      manageStudentRegistrationService.getStudentByOfferedCourse(courseId).then((resp) => {
        setStudents(resp);
        const initialAttendance = (resp || []).map(student => ({
          id: student.id,
          status: 'PRESENT'
        }));
        setAttendanceData(initialAttendance);
      })


    } catch (error) {
      console.error('Error loading course data:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateAttendanceStatus = (studentId, status) => {
    setAttendanceData(prev =>
      prev.map(item =>
        item.id === studentId ? { ...item, status } : item
      )
    );
  };

  const handleSubmitAttendance = async () => {
    setSaving(true);
    try {
      // Mock API call - replace with actual service
      // await attendanceService.saveAttendanceList(attendanceData, courseId);
      console.log('Submitting attendance:', { attendanceData, courseId });

      manageAttendenceService.saveList(attendanceData, courseId)
        .then((resp) => {
          toast.success(resp, { theme: localStorage.getItem('theme'), position: "top-center" });
        },
          (err) => {
            toast.error(err, { theme: localStorage.getItem('theme'), position: "top-center" }); console.log(err);
          })
        .catch(() => toast.error("An error occured", { theme: localStorage.getItem('theme'), position: "top-center" }));

    } catch (error) {
      console.error('Error saving attendance:', error);
      alert('Error saving attendance. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'PRESENT':
        return 'bg-success-light dark:bg-success-dark text-white';
      case 'LATE':
        return 'bg-yellow-500 text-white';
      case 'ABSENT':
        return 'bg-error-light dark:bg-error-dark text-white';
      default:
        return 'bg-border-light dark:bg-border-dark';
    }
  };

  const getAttendanceStats = () => {
    const present = attendanceData.filter(item => item.status === 'PRESENT').length;
    const late = attendanceData.filter(item => item.status === 'LATE').length;
    const absent = attendanceData.filter(item => item.status === 'ABSENT').length;
    return { present, late, absent };
  };

  const stats = getAttendanceStats();

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

        {/* Date Selection and Stats */}
        <div className="bg-bg-secondary-light dark:bg-bg-secondary-dark rounded-lg border border-border-light dark:border-border-dark p-4 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-3">
              <label className="text-text-primary-light dark:text-text-primary-dark font-medium text-sm">
                Date:
              </label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="px-3 py-1 rounded border border-border-light dark:border-border-dark bg-bg-light dark:bg-bg-dark text-text-primary-light dark:text-text-primary-dark text-sm"
              />
            </div>

            <div className="flex gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-success-light dark:bg-success-dark"></div>
                <span className="text-text-primary-light dark:text-text-primary-dark">Present: {stats.present}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <span className="text-text-primary-light dark:text-text-primary-dark">Late: {stats.late}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-error-light dark:bg-error-dark"></div>
                <span className="text-text-primary-light dark:text-text-primary-dark">Absent: {stats.absent}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => setAttendanceData(prev => prev.map(item => ({ ...item, status: 'PRESENT' })))}
            className="px-3 py-1 bg-success-light dark:bg-success-dark text-white rounded text-sm font-medium hover:opacity-80 transition-opacity"
          >
            Mark All Present
          </button>
          <button
            onClick={() => setAttendanceData(prev => prev.map(item => ({ ...item, status: 'ABSENT' })))}
            className="px-3 py-1 bg-error-light dark:bg-error-dark text-white rounded text-sm font-medium hover:opacity-80 transition-opacity"
          >
            Mark All Absent
          </button>
        </div>

        {/* Students List */}
        <div className="space-y-2 mb-6">
          {students.map((student, index) => {
            const attendanceItem = attendanceData.find(item => item.id === student.id);
            return (
              <div
                key={student.id}
                className="bg-bg-secondary-light dark:bg-bg-secondary-dark rounded-lg border border-border-light dark:border-border-dark p-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-text-secondary-light dark:text-text-secondary-dark text-sm font-medium w-8">
                      {index + 1}.
                    </span>
                    <div>
                      <div className="text-text-primary-light dark:text-text-primary-dark font-medium text-sm">
                        {student.firstName} {student.lastName}
                      </div>
                      <div className="text-text-secondary-light dark:text-text-secondary-dark text-xs">
                        ID: {student.id}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    {['PRESENT', 'LATE', 'ABSENT'].map(status => (
                      <button
                        key={status}
                        onClick={() => updateAttendanceStatus(student.id, status)}
                        className={`px-3 py-1 rounded text-xs font-medium transition-all ${attendanceItem?.status === status
                          ? getStatusColor(status)
                          : 'bg-bg-light dark:bg-bg-dark text-text-secondary-light dark:text-text-secondary-dark border border-border-light dark:border-border-dark hover:bg-border-light hover:dark:bg-border-dark'
                          }`}
                      >
                        {status}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Submit Button */}
        <div className="flex justify-end gap-3">
          <button
            onClick={() => window.history.back()}
            className="px-4 py-2 border border-border-light dark:border-border-dark text-text-primary-light dark:text-text-primary-dark rounded font-medium hover:bg-bg-secondary-light hover:dark:bg-bg-secondary-dark transition-colors text-sm"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmitAttendance}
            disabled={saving}
            className="px-4 py-2 bg-primary-light dark:bg-primary-dark hover:bg-button-hover-bg-light dark:hover:bg-button-hover-bg-dark text-button-text-primary-light dark:text-button-text-primary-dark rounded font-medium transition-colors disabled:opacity-50 text-sm"
          >
            {saving ? 'Saving...' : 'Save Attendance'}
          </button>
        </div>
      </div>
    </div>
  );
}