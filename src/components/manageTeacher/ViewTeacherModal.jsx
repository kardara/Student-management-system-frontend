import React, { useEffect, useState } from 'react'
import { FaArrowLeftLong } from 'react-icons/fa6';
import { useParams, useNavigate } from 'react-router-dom';
import { manageTeachersService } from '../../services/manageTeachersService';
import { toast } from 'react-toastify';
import LoadingComponents from '../UI/Loading';

export default function ViewTeacherModal() {
    const { id } = useParams();
    const navigate = useNavigate();
    
    const [teacher, setTeacher] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (id) {
            fetchTeacherDetails();
        }
    }, [id]);

    const fetchTeacherDetails = () => {
        setLoading(true);
        manageTeachersService.get(id)
            .then((response) => {
                setTeacher(response.data || response);
                setLoading(false);
            })
            .catch((error) => {
                toast.error("Failed to fetch teacher details", { 
                    theme: localStorage.getItem('theme'), 
                    position: "top-center" 
                });
                console.error(error);
                setLoading(false);
            });
    };

    const handleClose = () => {
        navigate(-1); // Go back to previous page
    };
    const goEdit = () => {
    const pathname = window.location.pathname.split("/");
    pathname.splice(pathname.length - 2, 1, "edit");
    console.log(pathname.join("/"));
    navigate(pathname.join("/"));
  }

    if (loading) {
        return (
           <LoadingComponents type="spinner" />
        );
    }

    if (!teacher) {
        return (
            <div className='min-h-screen p-6 bg-bg-light dark:bg-bg-dark'>
                <div className='max-w-6xl mx-auto'>
                    <div className='flex justify-between items-center mb-8'>
                        <div className='flex gap-4 items-center'>
                            <button
                                onClick={handleClose}
                                className='group p-3 rounded-full bg-bg-secondary-light dark:bg-bg-secondary-dark hover:bg-border-light dark:hover:bg-border-dark transition-all duration-200 shadow-sm'
                            >
                                <FaArrowLeftLong className='text-xl text-text-primary-light dark:text-text-primary-dark group-hover:text-accent-light dark:group-hover:text-accent-dark transition-colors duration-200' />
                            </button>
                            <div>
                                <h1 className='text-3xl font-bold text-text-primary-light dark:text-text-primary-dark'>Teacher Information</h1>
                                <p className='text-text-secondary-light dark:text-text-secondary-dark mt-1'>View teacher details and information</p>
                            </div>
                        </div>
                    </div>

                    {/* Error State Card */}
                    <div className='bg-bg-secondary-light dark:bg-bg-secondary-dark rounded-2xl shadow-lg border border-border-light dark:border-border-dark overflow-hidden'>
                        <div className='p-8 text-center'>
                            <div className='inline-flex items-center justify-center w-16 h-16 bg-error-light/10 dark:bg-error-dark/10 rounded-full mb-4'>
                                <svg className='w-8 h-8 text-error-light dark:text-error-dark' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z' />
                                </svg>
                            </div>
                            <h2 className='text-2xl font-bold text-error-light dark:text-error-dark mb-2'>Teacher Not Found</h2>
                            <p className='text-text-secondary-light dark:text-text-secondary-dark mb-6'>The requested teacher could not be found in the system.</p>
                            <button 
                                onClick={handleClose}
                                className='px-6 py-3 bg-accent-light dark:bg-accent-dark text-button-text-primary-light dark:text-button-text-primary-dark font-semibold rounded-xl hover:bg-button-hover-bg-light dark:hover:bg-button-hover-bg-dark transition-all duration-200 shadow-sm hover:shadow-md'
                            >
                                Go Back
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className='min-h-screen p-6 bg-bg-light dark:bg-bg-dark'>
            <div className='max-w-4xl mx-auto'>
                {/* Header Section */}
                <div className='flex justify-between items-center mb-8'>
                    <div className='flex gap-4 items-center'>
                        <button
                            onClick={handleClose}
                            className='group p-3 rounded-full bg-bg-secondary-light dark:bg-bg-secondary-dark hover:bg-border-light dark:hover:bg-border-dark transition-all duration-200 shadow-sm'
                        >
                            <FaArrowLeftLong className='text-xl text-text-primary-light dark:text-text-primary-dark group-hover:text-accent-light dark:group-hover:text-accent-dark transition-colors duration-200' />
                        </button>
                        <div>
                            <h1 className='text-3xl font-bold text-text-primary-light dark:text-text-primary-dark'>Teacher Information</h1>
                            <p className='text-text-secondary-light dark:text-text-secondary-dark mt-1'>View teacher details and information</p>
                        </div>
                    </div>

                    <div className='flex gap-3'>
                        <button
                            onClick={() => goEdit()}
                            className='inline-flex items-center gap-2 px-6 py-3 bg-accent-light dark:bg-accent-dark text-button-text-primary-light dark:text-button-text-primary-dark font-semibold rounded-xl hover:bg-button-hover-bg-light dark:hover:bg-button-hover-bg-dark transition-all duration-200 shadow-sm hover:shadow-md'
                        >
                            <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z' />
                            </svg>
                            Edit Teacher
                        </button>
                    </div>
                </div>

                {/* Main Content */}
                <div className='grid lg:grid-cols-2 gap-8'>
                    {/* Personal Information Card */}
                    <div className='bg-bg-secondary-light dark:bg-bg-secondary-dark rounded-2xl shadow-lg border border-border-light dark:border-border-dark overflow-hidden'>
                        <div className='p-6 border-b border-border-light dark:border-border-dark'>
                            <div className='flex items-center gap-3 mb-2'>
                                <div className='p-2 bg-accent-light/10 dark:bg-accent-dark/10 rounded-lg'>
                                    <svg className='w-5 h-5 text-accent-light dark:text-accent-dark' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' />
                                    </svg>
                                </div>
                                <h2 className='text-xl font-bold text-text-primary-light dark:text-text-primary-dark'>Personal Information</h2>
                            </div>
                        </div>

                        <div className='p-6 space-y-6'>
                            <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
                                <div className='space-y-1'>
                                    <label className='text-sm font-medium text-text-secondary-light dark:text-text-secondary-dark uppercase tracking-wide'>First Name</label>
                                    <p className='text-lg font-semibold text-text-primary-light dark:text-text-primary-dark'>{teacher.firstName || 'Not specified'}</p>
                                </div>

                                <div className='space-y-1'>
                                    <label className='text-sm font-medium text-text-secondary-light dark:text-text-secondary-dark uppercase tracking-wide'>Last Name</label>
                                    <p className='text-lg font-semibold text-text-primary-light dark:text-text-primary-dark'>{teacher.lastName || 'Not specified'}</p>
                                </div>

                                <div className='space-y-1'>
                                    <label className='text-sm font-medium text-text-secondary-light dark:text-text-secondary-dark uppercase tracking-wide'>Email</label>
                                    <p className='text-lg font-semibold text-link-light dark:text-link-dark break-all'>{teacher.email || 'Not specified'}</p>
                                </div>

                                <div className='space-y-1'>
                                    <label className='text-sm font-medium text-text-secondary-light dark:text-text-secondary-dark uppercase tracking-wide'>Phone</label>
                                    <p className='text-lg font-semibold text-text-primary-light dark:text-text-primary-dark'>{teacher.phone || 'Not specified'}</p>
                                </div>

                                <div className='space-y-1 sm:col-span-2'>
                                    <label className='text-sm font-medium text-text-secondary-light dark:text-text-secondary-dark uppercase tracking-wide'>Address</label>
                                    <p className='text-lg font-semibold text-text-primary-light dark:text-text-primary-dark'>{teacher.address || 'Not specified'}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Professional Information Card */}
                    <div className='bg-bg-secondary-light dark:bg-bg-secondary-dark rounded-2xl shadow-lg border border-border-light dark:border-border-dark overflow-hidden'>
                        <div className='p-6 border-b border-border-light dark:border-border-dark'>
                            <div className='flex items-center gap-3 mb-2'>
                                <div className='p-2 bg-success-light/10 dark:bg-success-dark/10 rounded-lg'>
                                    <svg className='w-5 h-5 text-success-light dark:text-success-dark' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4' />
                                    </svg>
                                </div>
                                <h2 className='text-xl font-bold text-text-primary-light dark:text-text-primary-dark'>Professional Information</h2>
                            </div>
                        </div>

                        <div className='p-6 space-y-6'>
                            <div className='space-y-6'>
                                <div className='space-y-1'>
                                    <label className='text-sm font-medium text-text-secondary-light dark:text-text-secondary-dark uppercase tracking-wide'>Qualification</label>
                                    <div className='flex items-center gap-2'>
                                        <p className='text-lg font-semibold text-text-primary-light dark:text-text-primary-dark'>{teacher.qualification || 'Not specified'}</p>
                                        {teacher.qualification && (
                                            <div className='px-2 py-1 bg-success-light/10 dark:bg-success-dark/10 text-success-light dark:text-success-dark text-xs font-semibold rounded-full'>
                                                Certified
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className='space-y-1'>
                                    <label className='text-sm font-medium text-text-secondary-light dark:text-text-secondary-dark uppercase tracking-wide'>Role</label>
                                    <div className='flex items-center gap-2'>
                                        <div className='w-2 h-2 rounded-full bg-primary-light dark:bg-primary-dark'></div>
                                        <p className='text-lg font-semibold text-text-primary-light dark:text-text-primary-dark'>{teacher.role || 'Not specified'}</p>
                                    </div>
                                </div>

                                {/* Additional professional info can be added here */}
                                <div className='bg-primary-light/5 dark:bg-primary-dark/5 border border-primary-light/20 dark:border-primary-dark/20 rounded-xl p-4'>
                                    <div className='flex items-start gap-3'>
                                        <svg className='w-5 h-5 text-primary-light dark:text-primary-dark mt-0.5 flex-shrink-0' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' />
                                        </svg>
                                        <div>
                                            <p className='text-sm font-medium text-primary-light dark:text-primary-dark'>Teacher Status</p>
                                            <p className='text-xs text-text-secondary-light dark:text-text-secondary-dark mt-1'>This teacher profile is active and verified in the system</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className='flex flex-col sm:flex-row gap-4 justify-center mt-8 p-6 bg-bg-secondary-light dark:bg-bg-secondary-dark rounded-2xl shadow-lg border border-border-light dark:border-border-dark'>
                    <button 
                        onClick={handleClose}
                        className='px-6 py-3 border-2 border-border-light dark:border-border-dark text-text-primary-light dark:text-text-primary-dark font-semibold rounded-xl hover:bg-border-light dark:hover:bg-border-dark transition-all duration-200 flex items-center gap-2 justify-center'
                    >
                        <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
                        </svg>
                        Close
                    </button>
                    <button 
                        onClick={() => goEdit()}
                        className='px-6 py-3 bg-accent-light dark:bg-accent-dark text-button-text-primary-light dark:text-button-text-primary-dark font-semibold rounded-xl hover:bg-button-hover-bg-light dark:hover:bg-button-hover-bg-dark transition-all duration-200 shadow-sm hover:shadow-md flex items-center gap-2 justify-center'
                    >
                        <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z' />
                        </svg>
                        Edit Teacher
                    </button>
                </div>
            </div>
        </div>
    );
}