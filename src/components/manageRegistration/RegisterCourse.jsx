// components/student/AddStudentModal.js
import React, { useEffect, useState } from 'react';
import LoadingComponents from '../UI/Loading';
import { toast } from 'react-toastify';
import { manageStudentRegistrationService } from '../../services/manageStudentRegistrationService';
import { manageOfferedCoursesService } from '../../services/manageOfferedCoursesService';
import { FaArrowLeftLong } from 'react-icons/fa6';
import { manageCoursesService } from '../../services/manageCoursesService';
import SelectCourse from '../forms/SelectCourse'; 
import Button from '../forms/Button';

export default function RegisterCourse({ isOpen, onClose, studentId, registration, isAdmin }) {

    const [courses, setCourses] = useState([]);
    const [courseId, setCourseId] = useState("");
    const [course, setCourse] = useState("");

    const [offeredCourses, setOfferedCourses] = useState();
    const [allCourses, setAllCourses] = useState();

    const [selectedCourse, setSelectedCourse] = useState();

    const [loading, setLoading] = useState(true);
    const currentSemester = JSON.parse(localStorage.getItem("semester"))

    const addCoursesToSet = (c) => {
        setCourses(prevItems => [...prevItems].filter(e => e.course.id != c.course.id).concat(c)); // same as push, but return the new array
        setCourseId(undefined);
        setCourse(undefined);
    }

    const addCourses = () => {
        manageStudentRegistrationService.addCourse(studentId, courses)
            .then((resp) => {
                toast.success(resp, { theme: localStorage.getItem('theme'), position: "top-center" });
                onClose()
            },
                (err) => toast.error(err, { theme: localStorage.getItem('theme'), position: "top-center" }))
            .catch(() => toast.error("An error occured", { theme: localStorage.getItem('theme'), position: "top-center" }));
    }

    useEffect(() => {
        const fetchCoursesData = () => {
            manageCoursesService.get().then((resp) => {
                console.log(resp);
                setAllCourses(resp.sort((a, b) => a.name - b.name));
                setLoading(false);
            })
        }

        const fetchOfferedCoursesData = () => {
            manageOfferedCoursesService.get().then((resp) => {
                setOfferedCourses(resp.sort((a, b) => {
                    if (a.course.name > b.course.name)
                        return 1;
                    if (a.course.name < b.course.name)
                        return -1;
                    return 0;
                }).filter(e => e.semester.id === currentSemester.id));
                fetchCoursesData();
            })
        }

        fetchOfferedCoursesData()
    }, []);

    useEffect(() => { offeredCourses ? setCourse(offeredCourses.find(c => c.id === courseId)) : undefined }, [courseId])

    if (!isOpen) return null;

    if (loading) return (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-lg">
            <LoadingComponents type="dots" />
        </div>
    )

    return (
        <div className="min-h-screen bg-bg-light dark:bg-bg-dark">
            <div className="max-w-7xl mx-auto p-6 space-y-8">
                {/* Header Section */}
                <div className="bg-bg-secondary-light dark:bg-bg-secondary-dark rounded-2xl shadow-lg p-6 border border-border-light dark:border-border-dark">
                    <div className="flex justify-between items-center">
                        <div className='flex gap-4 items-center'>
                            <button 
                                onClick={onClose} 
                                className='hover:cursor-pointer text-xl p-3 rounded-full hover:bg-bg-light dark:hover:bg-bg-dark transition-all duration-200 hover:scale-110'
                            >
                                <FaArrowLeftLong />
                            </button>
                            <div>
                                <h1 className='text-3xl font-bold uppercase tracking-wide'>Register Courses</h1>
                                <div className="h-1 w-20 bg-accent-light dark:bg-accent-dark rounded-full mt-2"></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Student Info Section - Admin Only */}
                {isAdmin && (
                    <div className='bg-bg-secondary-light dark:bg-bg-secondary-dark rounded-2xl shadow-lg p-6 border border-border-light dark:border-border-dark'>
                        <h3 className="text-xl font-semibold mb-4 text-accent-light dark:text-accent-dark">Student Information</h3>
                        <div className='grid md:grid-cols-2 gap-6'>
                            <div className='space-y-3'>
                                <div className="flex items-center gap-3">
                                    <span className="w-2 h-2 bg-accent-light dark:bg-accent-dark rounded-full"></span>
                                    <p className="text-lg"><span className="font-semibold">ID:</span> {registration.student.id}</p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="w-2 h-2 bg-accent-light dark:bg-accent-dark rounded-full"></span>
                                    <p className="text-lg"><span className="font-semibold">Name:</span> {`${registration.student.firstName} ${registration.student.lastName}`}</p>
                                </div>
                            </div>
                            <div className='space-y-3'>
                                <div className="flex items-center gap-3">
                                    <span className="w-2 h-2 bg-accent-light dark:bg-accent-dark rounded-full"></span>
                                    <p className="text-lg"><span className="font-semibold">Department:</span> {registration.student.department.name}</p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="w-2 h-2 bg-accent-light dark:bg-accent-dark rounded-full"></span>
                                    <p className="text-lg"><span className="font-semibold">Total Credit:</span> 
                                        <span className='ml-2 px-3 py-1 bg-accent-light dark:bg-accent-dark text-white rounded-full font-bold text-sm'>
                                            {registration.courses.reduce((p, c) => p + c.course.credit, 0)}
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Course Selection Section */}
                <div className='bg-bg-secondary-light dark:bg-bg-secondary-dark rounded-2xl shadow-lg p-6 border border-border-light dark:border-border-dark'>
                    <h3 className="text-xl font-semibold mb-6 text-accent-light dark:text-accent-dark">Select Course</h3>
                    
                    <div className='grid lg:grid-cols-2 gap-8'>
                        {/* Selection Controls */}
                        <div className='space-y-6'>
                            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                                <div className="space-y-2">
                                    <SelectCourse 
                                        value={selectedCourse} 
                                        onChange={(e) => setSelectedCourse(e.target.value)} 
                                        label="Courses" 
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium mb-1">Group</label>
                                    <select 
                                        className="w-full px-4 py-3 border border-border-light dark:border-border-dark dark:bg-bg-dark rounded-xl focus:ring-2 focus:ring-accent-light dark:focus:ring-accent-dark focus:border-transparent transition-all duration-200" 
                                        value={courseId} 
                                        onChange={(e) => setCourseId(e.target.value)}
                                    >
                                        <option value="" className='bg-bg-secondary-light dark:bg-bg-secondary-dark'>Select Group</option>
                                        {offeredCourses?.filter(e => e.course.code === selectedCourse).map((el, key) => (
                                            <option 
                                                value={el.id} 
                                                onClick={() => setCourseId(el.id)} 
                                                key={key} 
                                                className='bg-bg-secondary-light dark:bg-bg-secondary-dark'
                                            >
                                                Group {el.group}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Course Details */}
                        {course && (
                            <div className="bg-bg-light dark:bg-bg-dark rounded-xl p-6 border border-border-light dark:border-border-dark">
                                <h4 className='text-lg font-semibold mb-4 text-accent-light dark:text-accent-dark flex items-center gap-2'>
                                    <span className="w-3 h-3 bg-accent-light dark:bg-accent-dark rounded-full"></span>
                                    Course Details
                                </h4>
                                
                                <div className='space-y-4'>
                                    <div className='grid grid-cols-2 gap-4'>
                                        <div className='space-y-2'>
                                            <p className="text-sm text-gray-500">Day</p>
                                            <p className='font-bold text-accent-light dark:text-accent-dark text-lg'>
                                                {course.day[0] + course.day.slice(1).toLowerCase()}
                                            </p>
                                        </div>
                                        <div className='space-y-2'>
                                            <p className="text-sm text-gray-500">Time</p>
                                            <p className='font-bold text-accent-light dark:text-accent-dark text-lg'>
                                                {course.time.slice(0, 5)}
                                            </p>
                                        </div>
                                    </div>
                                    
                                    <div className='grid grid-cols-2 gap-4'>
                                        <div className='space-y-2'>
                                            <p className="text-sm text-gray-500">Credits</p>
                                            <p className='font-bold text-accent-light dark:text-accent-dark text-lg'>
                                                {course.course.credit}
                                            </p>
                                        </div>
                                        <div className='space-y-2'>
                                            <p className="text-sm text-gray-500">Lecturer</p>
                                            <p className='font-bold text-accent-light dark:text-accent-dark text-lg'>
                                                {`${course.teacher.firstName} ${course.teacher.lastName}`}
                                            </p>
                                        </div>
                                    </div>
                                    
                                    <button
                                        className='w-full mt-4 p-3 bg-button-bg-primary-light text-button-text-primary-dark font-bold dark:bg-primary-dark rounded-xl hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl'
                                        onClick={() => addCoursesToSet(course)}
                                    >
                                        Add Course
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Selected Courses Table */}
                {courses.length > 0 && (
                    <div className='bg-bg-secondary-light dark:bg-bg-secondary-dark rounded-2xl shadow-lg p-6 border border-border-light dark:border-border-dark'>
                        {console.log(courses)}
                        <h4 className='text-xl font-semibold mb-6 text-accent-light dark:text-accent-dark flex items-center gap-2'>
                            <span className="w-3 h-3 bg-accent-light dark:bg-accent-dark rounded-full"></span>
                            Selected Courses
                        </h4>
                        
                        <div className="overflow-x-auto rounded-xl border border-border-light dark:border-border-dark">
                            <table className="w-full">
                                <thead className="bg-bg-light dark:bg-bg-dark">
                                    <tr>
                                        <th className="px-6 py-4 text-left font-semibold">Course</th>
                                        <th className="px-6 py-4 text-left font-semibold">Group</th>
                                        <th className="px-6 py-4 text-left font-semibold">Day</th>
                                        <th className="px-6 py-4 text-left font-semibold">Time</th>
                                        <th className="px-6 py-4 text-left font-semibold">Credit</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {courses.map((el, ind) => (
                                        <tr key={ind} className="border-t border-border-light dark:border-border-dark hover:bg-bg-light dark:hover:bg-bg-dark transition-colors duration-200">
                                            <td className="px-6 py-4 font-medium">{el.course.name}</td>
                                            <td className="px-6 py-4">{el.group}</td>
                                            <td className="px-6 py-4">{el.day}</td>
                                            <td className="px-6 py-4">{el.time.slice(0, 5)}</td>
                                            <td className="px-6 py-4">
                                                <span className="px-2 py-1 bg-accent-light dark:bg-accent-dark text-white rounded-full text-sm font-bold">
                                                    {el.course.credit}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* Currently Registered Courses */}
                {registration.courses && (
                    <div className='bg-bg-secondary-light dark:bg-bg-secondary-dark rounded-2xl shadow-lg p-6 border border-border-light dark:border-border-dark'>
                        <h4 className='text-xl font-semibold mb-6 text-accent-light dark:text-accent-dark flex items-center gap-2'>
                            <span className="w-3 h-3 bg-accent-light dark:bg-accent-dark rounded-full"></span>
                            Currently Registered Courses
                        </h4>
                        
                        <div className="space-y-3">
                            {registration.courses.map((cou, index) => (
                                <div key={index} className='grid grid-cols-12 gap-4 p-4 bg-bg-light dark:bg-bg-dark rounded-xl border border-border-light dark:border-border-dark hover:shadow-md transition-all duration-200'>
                                    <div className='col-span-5 font-medium'>{cou.course.name}</div>
                                    <div className='col-span-2 text-center'>
                                        <span className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded-full text-xs font-semibold">
                                            Group {cou.group}
                                        </span>
                                    </div>
                                    <div className='col-span-3 text-sm space-y-1'>
                                        <div className="font-semibold">{cou.day}</div>
                                        <div className="text-gray-500">{cou.time.slice(0, 5)}</div>
                                    </div>
                                    <div className='col-span-2 text-center'>
                                        <span className="px-2 py-1 bg-accent-light dark:bg-accent-dark text-white rounded-full text-sm font-bold">
                                            {cou.course.credit}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                        
                        <div className="mt-6 p-4 bg-accent-light dark:bg-accent-dark rounded-xl">
                            <p className="text-white text-lg font-bold text-center">
                                Total Credits: {registration.courses.reduce((prev, e) => e.course.credit + prev, 0)}
                            </p>
                        </div>
                    </div>
                )}

                {/* Action Buttons */}
                <div className="flex justify-center gap-4 pt-6">
                    <Button 
                        name="Cancel"
                        type="button" 
                        onClick={onClose} 
                        className="px-8 py-3 bg-gray-500 hover:bg-gray-600 transition-colors duration-200" 
                    >
                        Cancel
                    </Button>
                    <Button 
                        name="Add courses" 
                        type="submit" 
                        className="px-8 py-3 hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl" 
                        onClick={() => addCourses()} 
                    >
                        Add Courses
                    </Button>
                </div>
            </div>
        </div>
    );
};