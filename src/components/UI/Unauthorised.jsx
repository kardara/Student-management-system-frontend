import React, { useState } from 'react';
import ThemeSwitcher from './ThemeSwitcher';
import { Link, useNavigate } from 'react-router-dom';

// Unauthorized Page component with dark mode support
export default function UnauthorizedPage() {

    const navigate = useNavigate();


    return (
        <div className=" h-[100vh] flex flex-col justify-between ">
            <div className='flex justify-end p-5'>
                <ThemeSwitcher />
            </div>

            <div className=' h-full flex flex-col justify-center items-center'>
                <div className="  m-5 border rounded-lg overflow-hidden border-border-light dark:border-border-dark">
                    <div className="p-8 bg-bg-secondary-light dark:bg-bg-secondary-dark">
                        <div className="max-w-lg mx-auto text-center">
                            {/* Error Icon */}
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-6 bg-red-100 bg-opacity-10 text-error-light dark:text-error-dark">
                                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"></path>
                                </svg>
                            </div>

                            <h2 className="text-3xl font-bold mb-4 text-error-light dark:text-error-dark">
                                Access Denied
                            </h2>

                            <p className="text-lg mb-6 text-text-secondary-light dark:text-text-secondary-dark">
                                You don't have permission to access this page. Please check your credentials or contact an administrator for assistance.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <button className="px-6 py-2 rounded-md bg-bg-light dark:bg-bg-secondary-dark border border-border-light dark:border-border-dark text-text-primary-light dark:text-text-primary-dark hover:bg-button-hover-bg-light dark:hover:bg-button-hover-bg-dark transition"
                                    onClick={() => navigate(-1)}
                                >
                                    Go Back
                                </button>
                                <button className="px-6 py-2 rounded-md bg-button-bg-primary-light dark:bg-button-bg-primary-dark text-button-text-primary-light dark:text-button-text-primary-dark hover:bg-button-hover-bg-light dark:hover:bg-button-hover-bg-dark transition"
                                    onClick={() => navigate("/auth/login")}
                                >
                                    Sign In
                                </button>
                            </div>

                            <p className="mt-6 text-text-secondary-light dark:text-text-secondary-dark">
                                If you believe this is an error, please contact <span className="text-link-light dark:text-link-dark">support@sms.com</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}