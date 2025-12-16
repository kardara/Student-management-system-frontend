import React, { useEffect, useState } from 'react'
import InputField from '../forms/InputField';
import { FaArrowLeftLong } from 'react-icons/fa6';
import SelectAcademicUnit from '../forms/SelectAcademicUnit';
import SelectCourse from '../forms/SelectCourse';
import { manageCoursesService } from '../../services/manageCoursesService';
import { toast } from 'react-toastify';
import Button from '../forms/Button';
import { useNavigate, useParams } from 'react-router-dom';
import LoadingComponents from '../UI/Loading';

export default function EditCourseModal({ isOpen, onClose, courses, id }) {

    const navigate = useNavigate();
    const [currentCourse, setCurrentCourse] = useState();
    const [loading, setLoading] = useState(true);
    const { courseId } = useParams();

    useEffect(() => {
        manageCoursesService.get(courseId)
            .then((resp) => { setCurrentCourse(resp); })
            .finally(() => setLoading(false))
    }, [])

    const goBack = () => {
        navigate(-1);
    }

    const [code, setCode] = useState();
    const [name, setName] = useState();
    const [credit, setCredit] = useState();
    const [academicUnit, setAcademicUnit] = useState();
    const [prerequisites, setPrerequisites] = useState([]);
    const [description, setDescription] = useState("");

    useEffect(() => {
        if (currentCourse) {
            setCode(currentCourse.code);
            setName(currentCourse.name);
            setCredit(currentCourse.credit);
            setAcademicUnit(currentCourse.academicUnit.code);
            setPrerequisites(currentCourse.prerequisites);
            setDescription(currentCourse.description);
        }
    }, [currentCourse])

    const updateCourse = () => {
        const course = { id, code, name, credit, description }

        console.log(course, academicUnit);

        manageCoursesService.update(course, academicUnit)
            .then((resp) => {
                toast.success(resp, { theme: localStorage.getItem('theme'), position: "top-center" });
                goBack()
            },
                (err) => toast.error(err, { theme: localStorage.getItem('theme'), position: "top-center" }))
            .catch(() => toast.error("An error occured", { theme: localStorage.getItem('theme'), position: "top-center" }));
    }

    if (loading) {
        return (
            <div className='flex justify-center items-center min-h-96'>
                <LoadingComponents type={"dots"} />
            </div>
        )
    }

    return (
        <div className='max-w-4xl mx-auto p-4 lg:p-6 space-y-6'>
            {/* Header Section */}
            <div className='bg-bg-secondary-light dark:bg-bg-secondary-dark rounded-xl p-6 shadow-sm'>
                <div className='flex flex-col gap-4 lg:flex-row lg:justify-between lg:items-center'>
                    <div className='flex gap-4 items-center'>
                        <button
                            onClick={goBack}
                            className='p-2 hover:bg-bg-primary-light dark:hover:bg-bg-primary-dark rounded-lg transition-colors duration-200 group'
                        >
                            <FaArrowLeftLong className='text-xl text-text-primary-light dark:text-text-primary-dark group-hover:text-accent-light dark:group-hover:text-accent-dark transition-colors duration-200' />
                        </button>
                        <div>
                            <h1 className='text-2xl lg:text-3xl font-bold text-text-primary-light dark:text-text-primary-dark'>
                                Edit Course
                            </h1>
                            <p className='text-text-secondary-light dark:text-text-secondary-dark text-sm mt-1'>
                                Update course information and settings
                            </p>
                        </div>
                    </div>
                    
                    {/* Course Code Badge */}
                    {currentCourse && (
                        <div className='flex items-center gap-2'>
                            <span className='text-text-secondary-light dark:text-text-secondary-dark text-sm'>Editing:</span>
                            <span className='inline-flex px-3 py-1 bg-accent-light/10 dark:bg-accent-dark/10 text-accent-light dark:text-accent-dark font-mono font-semibold rounded-lg'>
                                {currentCourse.code}
                            </span>
                        </div>
                    )}
                </div>
            </div>

            {/* Form Section */}
            <div className='bg-bg-secondary-light dark:bg-bg-secondary-dark rounded-xl p-6 lg:p-8 shadow-sm'>
                <div className='grid gap-8 lg:grid-cols-2'>
                    {/* Left Column - Basic Information */}
                    <div className='space-y-6'>
                        <div>
                            <h2 className='text-xl font-bold text-accent-light dark:text-accent-dark mb-6 flex items-center gap-3'>
                                <div className='w-8 h-8 bg-accent-light/10 dark:bg-accent-dark/10 rounded-lg flex items-center justify-center'>
                                    <span className='text-accent-light dark:text-accent-dark font-bold text-sm'>📋</span>
                                </div>
                                Basic Information
                            </h2>
                        </div>

                        {/* Course Code */}
                        <div className='space-y-2'>
                            <label className='block text-sm font-medium text-text-secondary-light dark:text-text-secondary-dark'>
                                Course Code <span className='text-red-500'>*</span>
                            </label>
                            <InputField 
                                value={code || ''} 
                                onChange={(e) => setCode(e.target.value)} 
                                name="Code"
                                placeholder="e.g., CS101"
                                className="font-mono"
                            />
                            <p className='text-xs text-text-secondary-light dark:text-text-secondary-dark'>
                                Unique identifier for the course
                            </p>
                        </div>

                        {/* Course Name */}
                        <div className='space-y-2'>
                            <label className='block text-sm font-medium text-text-secondary-light dark:text-text-secondary-dark'>
                                Course Name <span className='text-red-500'>*</span>
                            </label>
                            <InputField 
                                value={name || ''} 
                                onChange={(e) => setName(e.target.value)} 
                                name="Name"
                                placeholder="Enter course name"
                            />
                        </div>

                        {/* Credits */}
                        <div className='space-y-2'>
                            <label className='block text-sm font-medium text-text-secondary-light dark:text-text-secondary-dark'>
                                Credits <span className='text-red-500'>*</span>
                            </label>
                            <div className='relative'>
                                <InputField 
                                    value={credit || ''} 
                                    type="number" 
                                    onChange={(e) => setCredit(e.target.value)} 
                                    name="Credit"
                                    placeholder="0"
                                    min="0"
                                    max="10"
                                />
                                <div className='absolute right-3 top-1/2 transform -translate-y-1/2 text-text-secondary-light dark:text-text-secondary-dark text-sm pointer-events-none'>
                                    credits
                                </div>
                            </div>
                            <p className='text-xs text-text-secondary-light dark:text-text-secondary-dark'>
                                Number of credit hours for this course
                            </p>
                        </div>
                    </div>

                    {/* Right Column - Additional Details */}
                    <div className='space-y-6'>
                        <div>
                            <h2 className='text-xl font-bold text-accent-light dark:text-accent-dark mb-6 flex items-center gap-3'>
                                <div className='w-8 h-8 bg-accent-light/10 dark:bg-accent-dark/10 rounded-lg flex items-center justify-center'>
                                    <span className='text-accent-light dark:text-accent-dark font-bold text-sm'>🏛️</span>
                                </div>
                                Academic Details
                            </h2>
                        </div>

                        {/* Academic Unit */}
                        <div className='space-y-2'>
                            <label className='block text-sm font-medium text-text-secondary-light dark:text-text-secondary-dark'>
                                Academic Unit <span className='text-red-500'>*</span>
                            </label>
                            <div className='bg-bg-primary-light dark:bg-bg-primary-dark rounded-lg p-1'>
                                <SelectAcademicUnit 
                                    label="Select academic unit" 
                                    onChange={(e) => setAcademicUnit(e.target.value)} 
                                    value={academicUnit || ''} 
                                />
                            </div>
                            <p className='text-xs text-text-secondary-light dark:text-text-secondary-dark'>
                                Department or school offering this course
                            </p>
                        </div>

                        {/* Course Description */}
                        <div className='space-y-2'>
                            <label className='block text-sm font-medium text-text-secondary-light dark:text-text-secondary-dark'>
                                Course Description
                            </label>
                            <div className='relative'>
                                <textarea
                                    value={description || ''}
                                    onChange={(e) => setDescription(e.target.value)}
                                    placeholder="Enter a detailed description of the course content, objectives, and learning outcomes..."
                                    rows="6"
                                    className='w-full px-4 py-3 bg-bg-primary-light dark:bg-bg-primary-dark text-text-primary-light dark:text-text-primary-dark placeholder-text-secondary-light dark:placeholder-text-secondary-dark border-2 border-transparent focus:border-accent-light dark:focus:border-accent-dark rounded-lg resize-none focus:outline-none transition-colors duration-200'
                                />
                                <div className='absolute bottom-3 right-3 text-xs text-text-secondary-light dark:text-text-secondary-dark'>
                                    {description?.length || 0} characters
                                </div>
                            </div>
                            <p className='text-xs text-text-secondary-light dark:text-text-secondary-dark'>
                                Provide a comprehensive description of the course
                            </p>
                        </div>

                        {/* Prerequisites Preview */}
                        {prerequisites && prerequisites.length > 0 && (
                            <div className='space-y-2'>
                                <label className='block text-sm font-medium text-text-secondary-light dark:text-text-secondary-dark'>
                                    Current Prerequisites
                                </label>
                                <div className='p-4 bg-bg-primary-light dark:bg-bg-primary-dark rounded-lg border border-text-secondary-light/20 dark:border-text-secondary-dark/20'>
                                    <div className='flex flex-wrap gap-2'>
                                        {prerequisites.map((prereq, index) => (
                                            <span 
                                                key={index}
                                                className='inline-flex px-3 py-1 bg-accent-light/10 dark:bg-accent-dark/10 text-accent-light dark:text-accent-dark font-mono text-sm rounded-md border border-accent-light/20 dark:border-accent-dark/20'
                                            >
                                                {prereq}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <p className='text-xs text-text-secondary-light dark:text-text-secondary-dark'>
                                    Prerequisites are currently view-only in edit mode
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Form Validation Summary */}
            <div className='bg-bg-primary-light dark:bg-bg-primary-dark rounded-xl p-4 border border-text-secondary-light/20 dark:border-text-secondary-dark/20'>
                <div className='flex items-start gap-3'>
                    <div className='w-5 h-5 bg-accent-light/10 dark:bg-accent-dark/10 rounded-full flex items-center justify-center mt-0.5'>
                        <span className='text-accent-light dark:text-accent-dark text-xs'>ℹ️</span>
                    </div>
                    <div>
                        <h3 className='text-sm font-medium text-text-primary-light dark:text-text-primary-dark mb-1'>
                            Before Updating
                        </h3>
                        <ul className='text-xs text-text-secondary-light dark:text-text-secondary-dark space-y-1'>
                            <li>• Ensure all required fields are filled</li>
                            <li>• Course code should be unique</li>
                            <li>• Credit hours should be appropriate for the course level</li>
                            <li>• Double-check academic unit assignment</li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Action Buttons */}
            <div className='bg-bg-secondary-light dark:bg-bg-secondary-dark rounded-xl p-6 shadow-sm'>
                <div className='flex flex-col gap-4 lg:flex-row lg:justify-between lg:items-center'>
                    <div>
                        <h3 className='font-semibold text-text-primary-light dark:text-text-primary-dark'>
                            Ready to update?
                        </h3>
                        <p className='text-text-secondary-light dark:text-text-secondary-dark text-sm'>
                            Make sure all information is correct before saving changes.
                        </p>
                    </div>
                    <div className='flex gap-3'>
                        <button
                            onClick={goBack}
                            className='px-6 py-2 bg-bg-primary-light dark:bg-bg-primary-dark text-text-primary-light dark:text-text-primary-dark border border-text-secondary-light/20 dark:border-text-secondary-dark/20 rounded-lg hover:bg-text-secondary-light/5 dark:hover:bg-text-secondary-dark/5 transition-colors duration-200'
                        >
                            Cancel
                        </button>
                        <Button 
                            name="Update Course" 
                            onClick={updateCourse}
                            className="px-6 py-2 min-w-32"
                        >
                            Update Course
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}