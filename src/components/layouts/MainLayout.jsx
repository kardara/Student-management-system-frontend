import React from 'react';
import ThemeSwitcher from '../UI/ThemeSwitcher';
import { Link } from 'react-router-dom';

export default function MainLayout() {
    const handleMenu = () => {
        const navBar = document.getElementById("navDiv");
        navBar.classList.toggle("hidden");

    }
    return (
        <>
            <header className="bg-bg-secondary-light dark:bg-bg-secondary-dark shadow-md  xl:grid xl:grid-cols-20 xl:items-center xl:col-span-20 xl:row-span-2 ">
                <div className="flex bg-light bg-bg-light dark:bg-bg-dark xl:bg-bg-secondary-light xl:dark:bg-bg-secondary-dark text-text-primary-light dark:text-text-primary-dark justify-between items-center px-4 py-3 xl:col-span-6">
                    <div className="flex items-center gap-3 text-text-primary-light dark:text-text-secondary-dark">
                        <div className="w-10 h-10 dark:bg-bg-light bg-bg-dark text-text-primary-dark dark:text-text-primary-light rounded-full flex items-center justify-center  font-bold">
                            SMS
                        </div>
                        <p className="font-semibold text-lg lg:text-2xl">STUDENT <span className="text-primary-light dark:text-primary-dark">PORTAL</span></p>
                    </div>
                    <div className="flex items-center gap-4 xl:hidden">
                        <ThemeSwitcher />
                        <p onClick={handleMenu} className="flex items-center gap-2 bg-accent-dark text-white dark:bg-accent-light  px-3 py-2 rounded font-medium ">
                            <span className="text-lg">☰</span> Menu
                        </p>
                    </div>
                </div>

                {/* Student Information */}
                <div className="py-4 px-5 border-b border-border-light dark:border-border-dark xl:col-span-13 xl:flex xl:gap-10 xl:items-start  xl:py-1 xl:border-none">
                    <div className="flex xl:flex-col justify-between items-start mb-2">
                        <h1 className="text-xl md:text-lg xl:text-2xl font-bold text-accent-light dark:text-accent-dark uppercase">
                            Buhendwa Asifiwe Ange
                        </h1>
                        <span className="bg-bg-light dark:bg-bg-dark px-3 py-1 rounded font-medium text-accent-light dark:text-accent-dark">
                            ID: 25864
                        </span>
                    </div>

                    <div className="space-y-1 xl:flex xl:justify-around xl:gap-5">
                        <div>
                            <p className="text-lg font-medium text-text-primary-light dark:text-text-primary-dark">Information Technology</p>
                            <p className="text-text-secondary-light dark:text-text-secondary-dark">Network Communications Systems</p>
                        </div>

                        <div className="flex xl:flex-col justify-between items-center xl:mt-0 mt-3 text-sm">
                            <div className="flex items-center gap-2 text-text-primary-light dark:text-text-primary-dark">
                                <span className="font-medium">Program:</span>
                                <span>Day</span>
                            </div>
                            <div className="font-medium text-accent-light dark:text-accent-dark bg-bg-light dark:bg-bg-dark px-3 py-1 rounded border-l-4 border-border-light dark:border-border-dark">
                                2024 - 2025
                            </div>
                        </div>
                    </div>
                </div>
                <div className='hidden xl:block xl:justify-self-end xl:pr-1'> <div className='block max-w-min'><ThemeSwitcher /> </div> </div>
            </header>

            <div className="relative xl:static xl:col-span-3 xl:row-span-17 xl:grid xl:grid-rows-1 xl:grid-cols-1">
                <div id="navDiv" className="hidden fixed p-5 top-20 right-0 bg-bg-light dark:bg-bg-dark shadow-lg rounded-bl-lg border border-border-light dark:border-border-dark w-64 z-10 xl:block  xl:static xl:w-auto xl:bg-bg-secondary-light xl:dark:bg-bg-secondary-dark">
                    <nav className="flex flex-col gap-2">
                        {[
                            "HOME",
                            "COURSES",
                            "REGISTRATION",
                            "FINANCES",
                            "CLAIMS",
                            "REPORTS",
                            "PROFILE"
                        ].map((item) => (
                            <Link
                                key={item}
                                href="#" className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors font-medium ">
                                {item}
                            </Link>
                        ))}
                    </nav>
                </div>
            </div>
        </>
    )
}
