import React, { useEffect, useState } from 'react'
import { FaArrowLeftLong } from 'react-icons/fa6';
import Button from '../forms/Button';
import { useNavigate, useParams } from 'react-router-dom';
import { manageCoursesService } from '../../services/manageCoursesService';
import LoadingComponents from '../UI/Loading';

export default function ViewCourseModal({ isOpen, onClose, openEdit, courses, id }) {
    
    const navigate = useNavigate();
    const [course, setCourse] = useState();
    const [loading, setLoading] = useState(true);
    const { courseId } = useParams();

    useEffect(() => {
        manageCoursesService.get(courseId)
            .then((resp) => { setCourse(resp); })
            .finally(() => setLoading(false))
    }, [])

    const goBack = () => {
        navigate(-1);
    }
    
    const goEdit = () => {
        const pathname = window.location.pathname.split("/");
        pathname.splice(pathname.length - 2, 1, "edit");
        console.log(pathname.join("/"));
        navigate(pathname.join("/"));
    }

    if (loading) {
        return (
            <div className='flex justify-center items-center min-h-96'>
                <LoadingComponents type={"dots"} />
            </div>
        )
    }

    return (
        <div className='max-w-7xl mx-auto p-4 lg:p-6 space-y-6'>
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
                                Course Information
                            </h1>
                            <p className='text-text-secondary-light dark:text-text-secondary-dark text-sm mt-1'>
                                Detailed view of course data
                            </p>
                        </div>
                    </div>

                    <div className='flex gap-3'>
                        <Button name="Edit Course" onClick={goEdit} className="px-6 py-2">
                            Edit Course
                        </Button>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className='grid gap-6 lg:grid-cols-2 xl:grid-cols-3'>
                {/* General Information Card */}
                <div className='lg:col-span-1 xl:col-span-2'>
                    <div className='bg-bg-secondary-light dark:bg-bg-secondary-dark rounded-xl p-6 shadow-sm h-full'>
                        <div className='flex items-center gap-3 mb-6'>
                            <div className='w-8 h-8 bg-accent-light/10 dark:bg-accent-dark/10 rounded-lg flex items-center justify-center'>
                                <span className='text-accent-light dark:text-accent-dark font-bold text-sm'>📋</span>
                            </div>
                            <h2 className='text-xl font-bold text-accent-light dark:text-accent-dark'>
                                General Information
                            </h2>
                        </div>

                        <div className='grid gap-6 md:grid-cols-2'>
                            <div className='space-y-6'>
                                {/* Course Code */}
                                <div className='group'>
                                    <label className='block text-sm font-medium text-text-secondary-light dark:text-text-secondary-dark mb-2'>
                                        Course Code
                                    </label>
                                    <div className='flex items-center gap-2'>
                                        <span className='inline-flex px-3 py-2 bg-accent-light/10 dark:bg-accent-dark/10 text-accent-light dark:text-accent-dark font-mono font-semibold rounded-lg text-lg'>
                                            {course.code}
                                        </span>
                                    </div>
                                </div>

                                {/* Course Name */}
                                <div className='group'>
                                    <label className='block text-sm font-medium text-text-secondary-light dark:text-text-secondary-dark mb-2'>
                                        Course Name
                                    </label>
                                    <p className='text-text-primary-light dark:text-text-primary-dark font-semibold text-lg leading-relaxed'>
                                        {course.name}
                                    </p>
                                </div>

                                {/* Credits */}
                                <div className='group'>
                                    <label className='block text-sm font-medium text-text-secondary-light dark:text-text-secondary-dark mb-2'>
                                        Credits
                                    </label>
                                    <div className='flex items-center gap-2'>
                                        <span className='inline-flex items-center px-3 py-2 bg-bg-primary-light dark:bg-bg-primary-dark border-2 border-accent-light/20 dark:border-accent-dark/20 rounded-lg'>
                                            <span className='text-text-primary-light dark:text-text-primary-dark font-bold text-lg'>
                                                {course.credit}
                                            </span>
                                            <span className='text-text-secondary-light dark:text-text-secondary-dark text-sm ml-1'>
                                                {course.credit === 1 ? 'credit' : 'credits'}
                                            </span>
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className='space-y-6'>
                                {/* Academic Unit */}
                                <div className='group'>
                                    <label className='block text-sm font-medium text-text-secondary-light dark:text-text-secondary-dark mb-2 capitalize'>
                                        {course.academicUnit.type.toLowerCase()}
                                    </label>
                                    <div className='p-4 bg-bg-primary-light dark:bg-bg-primary-dark rounded-lg border border-text-secondary-light/20 dark:border-text-secondary-dark/20'>
                                        <p className='text-text-primary-light dark:text-text-primary-dark font-semibold'>
                                            {course.academicUnit.name}
                                        </p>
                                        <p className='text-text-secondary-light dark:text-text-secondary-dark text-sm mt-1'>
                                            {course.academicUnit.code}
                                        </p>
                                    </div>
                                </div>

                                {/* Prerequisites */}
                                <div className='group'>
                                    <label className='block text-sm font-medium text-text-secondary-light dark:text-text-secondary-dark mb-2'>
                                        Prerequisites
                                    </label>
                                    <div className='min-h-20 p-4 bg-bg-primary-light dark:bg-bg-primary-dark rounded-lg border border-text-secondary-light/20 dark:border-text-secondary-dark/20'>
                                        {course.prerequisites.length > 0 ? (
                                            <div className='flex flex-wrap gap-2'>
                                                {course.prerequisites.map((prereq, index) => (
                                                    <span 
                                                        key={index}
                                                        className='inline-flex px-3 py-1 bg-accent-light/10 dark:bg-accent-dark/10 text-accent-light dark:text-accent-dark font-mono text-sm rounded-md border border-accent-light/20 dark:border-accent-dark/20'
                                                    >
                                                        {prereq}
                                                    </span>
                                                ))}
                                            </div>
                                        ) : (
                                            <div className='flex items-center justify-center h-12'>
                                                <p className='text-text-secondary-light dark:text-text-secondary-dark italic text-sm'>
                                                    No prerequisites required
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Description Card */}
                <div className='lg:col-span-1 xl:col-span-1'>
                    <div className='bg-bg-secondary-light dark:bg-bg-secondary-dark rounded-xl p-6 shadow-sm h-full'>
                        <div className='flex items-center gap-3 mb-6'>
                            <div className='w-8 h-8 bg-accent-light/10 dark:bg-accent-dark/10 rounded-lg flex items-center justify-center'>
                                <span className='text-accent-light dark:text-accent-dark font-bold text-sm'>📝</span>
                            </div>
                            <h2 className='text-xl font-bold text-accent-light dark:text-accent-dark'>
                                Description
                            </h2>
                        </div>

                        <div className='prose prose-sm max-w-none'>
                            <div className='p-4 bg-bg-primary-light dark:bg-bg-primary-dark rounded-lg border border-text-secondary-light/20 dark:border-text-secondary-dark/20 min-h-32'>
                                {course.description ? (
                                    <p className='text-text-primary-light dark:text-text-primary-dark leading-relaxed whitespace-pre-wrap'>
                                        {course.description}
                                    </p>
                                ) : (
                                    <div className='flex items-center justify-center h-24'>
                                        <p className='text-text-secondary-light dark:text-text-secondary-dark italic text-sm'>
                                            No description available
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Additional Info Section */}
                        <div className='mt-6 pt-6 border-t border-text-secondary-light/20 dark:border-text-secondary-dark/20'>
                            <div className='grid grid-cols-2 gap-4 text-sm'>
                                <div className='text-center p-3 bg-bg-primary-light dark:bg-bg-primary-dark rounded-lg'>
                                    <p className='text-text-secondary-light dark:text-text-secondary-dark'>Course Code</p>
                                    <p className='font-mono font-semibold text-accent-light dark:text-accent-dark'>
                                        {course.code}
                                    </p>
                                </div>
                                <div className='text-center p-3 bg-bg-primary-light dark:bg-bg-primary-dark rounded-lg'>
                                    <p className='text-text-secondary-light dark:text-text-secondary-dark'>Credits</p>
                                    <p className='font-bold text-accent-light dark:text-accent-dark'>
                                        {course.credit}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Action Footer */}
            <div className='bg-bg-secondary-light dark:bg-bg-secondary-dark rounded-xl p-6 shadow-sm'>
                <div className='flex flex-col gap-4 lg:flex-row lg:justify-between lg:items-center'>
                    <div>
                        <h3 className='font-semibold text-text-primary-light dark:text-text-primary-dark'>
                            Need to make changes?
                        </h3>
                        <p className='text-text-secondary-light dark:text-text-secondary-dark text-sm'>
                            You can edit this course information or go back to the courses list.
                        </p>
                    </div>
                    <div className='flex gap-3'>
                        <button
                            onClick={goBack}
                            className='px-6 py-2 bg-bg-primary-light dark:bg-bg-primary-dark text-text-primary-light dark:text-text-primary-dark border border-text-secondary-light/20 dark:border-text-secondary-dark/20 rounded-lg hover:bg-text-secondary-light/5 dark:hover:bg-text-secondary-dark/5 transition-colors duration-200'
                        >
                            Back to List
                        </button>
                        <Button name="Edit Course" onClick={goEdit} className="px-6 py-2">
                            Edit Course
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}