import React, { useState, useEffect } from 'react';

// Loading Components with Tailwind dark mode syntax
export default function LoadingComponents({ type }) {



    // Demo state for loading components
    const [isLoading, setIsLoading] = useState(true);

    // Automatically toggle loading state for demo purposes
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(!isLoading);
        }, 3000);
        return () => clearTimeout(timer);
    }, [isLoading]);

    if (type == "spinner") {
        return (
            < div className="flex flex-col justify-center items-center" >
                {/* Spinner Loading */}
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-t-primary-light dark:border-t-primary-dark border-b-primary-light dark:border-b-primary-dark"></div>
                <br />
                <p className=''>Loading . . .</p>
            </ div>
        )
    }
    if (type == "dots") {
        return (

            <div className="flex justify-center items-center h-32">
                {/* Dots Loading */}
                <div className="flex space-x-2">
                    <div className="w-3 h-3 rounded-full bg-primary-light dark:bg-primary-dark animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-3 h-3 rounded-full bg-primary-light dark:bg-primary-dark animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-3 h-3 rounded-full bg-primary-light dark:bg-primary-dark animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
            </div>

        )
    }
    if (type == "progress" ) {

        return(

            <div className="flex justify-center items-center h-32">
                {/* Progress bar */}
            <div className="w-full">
                <div className="w-full h-2 rounded-full overflow-hidden bg-border-light dark:bg-border-dark">
                    <div
                        className="h-full bg-primary-light dark:bg-primary-dark transition-all duration-500 ease-in-out"
                        style={{ width: isLoading ? '35%' : '90%' }}
                    ></div>
                </div>
                <p className="text-center mt-4 text-text-secondary-light dark:text-text-secondary-dark">
                    {isLoading ? 'Loading...' : 'Almost complete'}
                </p>
            </div>
        </div>

        )
        
    }

    return (
        <div className="">
            <div className="min-h-screen bg-bg-light dark:bg-bg-dark text-text-primary-light dark:text-text-primary-dark transition-colors duration-300">
                <div className="container mx-auto px-4 py-8">

                    <h1 className="text-3xl font-bold mb-8">
                        Loading Components
                    </h1>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* Spinner Loading */}
                        <div className="p-6 rounded-lg shadow-md bg-bg-secondary-light dark:bg-bg-secondary-dark border border-border-light dark:border-border-dark">
                            <h3 className="text-lg font-medium mb-4">
                                Spinner
                            </h3>
                            <div className="flex justify-center items-center h-32">
                                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-t-primary-light dark:border-t-primary-dark border-b-primary-light dark:border-b-primary-dark"></div>
                            </div>
                        </div>

                        {/* Dots Loading */}
                        <div className="p-6 rounded-lg shadow-md bg-bg-secondary-light dark:bg-bg-secondary-dark border border-border-light dark:border-border-dark">
                            <h3 className="text-lg font-medium mb-4">
                                Bouncing Dots
                            </h3>
                            <div className="flex justify-center items-center h-32">
                                <div className="flex space-x-2">
                                    <div className="w-3 h-3 rounded-full bg-primary-light dark:bg-primary-dark animate-bounce" style={{ animationDelay: '0ms' }}></div>
                                    <div className="w-3 h-3 rounded-full bg-primary-light dark:bg-primary-dark animate-bounce" style={{ animationDelay: '150ms' }}></div>
                                    <div className="w-3 h-3 rounded-full bg-primary-light dark:bg-primary-dark animate-bounce" style={{ animationDelay: '300ms' }}></div>
                                </div>
                            </div>
                        </div>

                        {/* Progress Bar */}
                        <div className="p-6 rounded-lg shadow-md bg-bg-secondary-light dark:bg-bg-secondary-dark border border-border-light dark:border-border-dark">
                            <h3 className="text-lg font-medium mb-4">
                                Progress Bar
                            </h3>
                            <div className="flex justify-center items-center h-32">
                                <div className="w-full">
                                    <div className="w-full h-2 rounded-full overflow-hidden bg-border-light dark:bg-border-dark">
                                        <div
                                            className="h-full bg-primary-light dark:bg-primary-dark transition-all duration-500 ease-in-out"
                                            style={{ width: isLoading ? '35%' : '90%' }}
                                        ></div>
                                    </div>
                                    <p className="text-center mt-4 text-text-secondary-light dark:text-text-secondary-dark">
                                        {isLoading ? 'Loading...' : 'Almost complete'}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Skeleton Loading */}
                        <div className="p-6 rounded-lg shadow-md bg-bg-secondary-light dark:bg-bg-secondary-dark border border-border-light dark:border-border-dark">
                            <h3 className="text-lg font-medium mb-4">
                                Skeleton Loading
                            </h3>
                            <div className="flex flex-col items-center h-32 pt-2">
                                <div className="w-full h-4 mb-2 rounded bg-border-light dark:bg-border-dark animate-pulse"></div>
                                <div className="w-3/4 h-4 mb-2 rounded bg-border-light dark:bg-border-dark animate-pulse"></div>
                                <div className="w-5/6 h-4 mb-2 rounded bg-border-light dark:bg-border-dark animate-pulse"></div>
                                <div className="w-4/5 h-4 rounded bg-border-light dark:bg-border-dark animate-pulse"></div>
                            </div>
                        </div>

                        {/* Card Loading */}
                        <div className="p-6 rounded-lg shadow-md bg-bg-secondary-light dark:bg-bg-secondary-dark border border-border-light dark:border-border-dark">
                            <h3 className="text-lg font-medium mb-4">
                                Card Loading
                            </h3>
                            <div className="h-32">
                                <div className="w-20 h-20 mb-2 rounded-full mx-auto bg-border-light dark:bg-border-dark animate-pulse"></div>
                                <div className="w-3/4 h-3 mb-2 rounded mx-auto bg-border-light dark:bg-border-dark animate-pulse"></div>
                                <div className="w-1/2 h-3 rounded mx-auto bg-border-light dark:bg-border-dark animate-pulse"></div>
                            </div>
                        </div>

                        {/* Button with Loading State */}
                        <div className="p-6 rounded-lg shadow-md bg-bg-secondary-light dark:bg-bg-secondary-dark border border-border-light dark:border-border-dark">
                            <h3 className="text-lg font-medium mb-4">
                                Button with Loading State
                            </h3>
                            <div className="flex justify-center items-center h-32">
                                <button
                                    className="px-4 py-2 rounded-md flex items-center justify-center w-40 h-10 bg-button-bg-primary-light dark:bg-button-bg-primary-dark text-button-text-primary-light dark:text-button-text-primary-dark"
                                >
                                    {isLoading ? (
                                        <>
                                            <div className="animate-spin mr-2 h-4 w-4 border-2 border-white rounded-full border-t-transparent"></div>
                                            <span>Loading...</span>
                                        </>
                                    ) : (
                                        <span>Submit</span>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}