import React from 'react'
import ThemeSwitcher from '../UI/ThemeSwitcher'
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function Header({ head, user }) {
    const navigate = useNavigate();
    const handleMenu = () => {
        const navBar = document.getElementById("navDiv");
        navBar.classList.toggle("hidden");
    }
    // if(user ===null) window.location.reload();

    const {t} = useTranslation()
    const currentSemester = JSON.parse(localStorage.getItem("semester"))
    return (
        <>
            <header className="bg-bg-secondary-light dark:bg-bg-secondary-dark shadow-md  xl:grid xl:grid-cols-20 xl:items-center xl:col-span-20 xl:row-span-2 ">
                <div className="flex bg-light bg-bg-light dark:bg-bg-dark xl:bg-bg-secondary-light xl:dark:bg-bg-secondary-dark text-text-primary-light dark:text-text-primary-dark justify-between items-center px-4 py-3 xl:col-span-6">
                    <div className="flex items-center gap-3 text-text-primary-light dark:text-text-secondary-dark">
                        <div className="w-10 h-10 dark:bg-bg-light bg-bg-dark text-text-primary-dark dark:text-text-primary-light rounded-full flex items-center justify-center font-bold cursor-pointer"
                            onClick={() => navigate("/")}
                        >
                            <img src="https://yt3.ggpht.com/ytc/AIdro_kxYtR3zxZ06I5vQ41JCt4phG2gudke6oY9WCxoxo5jz_0=s68-c-k-c0x00ffffff-no-rj" className='w-10 rounded-full' alt="AUCA Logo" />
                        </div>
                        <p className="font-semibold text-lg lg:text-2xl">{head.toUpperCase()} <span className="text-primary-light dark:text-primary-dark">{t("header.portal")}</span></p>
                    </div>
                    <div className="flex items-center gap-4 xl:hidden">
                        <ThemeSwitcher />
                        <p onClick={handleMenu} className="flex items-center gap-2 bg-accent-dark text-white dark:bg-accent-light  px-3 py-2 rounded font-medium ">
                            <span className="text-lg">☰</span> Menu
                        </p>
                    </div>
                </div>

                {/* Student Information */}
                <div className="py-4 px-5 border-b border-border-light dark:border-border-dark xl:col-span-13 xl:flex xl:gap-12 xl:items-center xl:justify-around  xl:py-1 xl:border-none">
                    <div className="flex xl:flex-col justify-between items-start mb-2">
                        <h1 className="text-xl md:text-lg xl:text-2xl font-bold text-accent-light dark:text-accent-dark uppercase">
                            {`${user?.firstName} ${user?.lastName}`}
                        </h1>
                        <span className="bg-bg-light dark:bg-bg-dark px-3 py-1 rounded font-medium text-accent-light dark:text-accent-dark">
                            {`ID: ${user?.id}`}
                        </span>
                    </div>

                    <div className="space-y-1 xl:flex xl:justify-around xl:gap-10">
                        <div>
                            <p className="text-lg font-medium text-text-primary-light dark:text-text-primary-dark">{user?.faculty}</p>
                            <p className="text-text-secondary-light dark:text-text-secondary-dark">{user?.department}</p>
                        </div>

                        <div className="flex xl:flex-col justify-between items-center xl:mt-0 mt-3 text-sm">
                            {user.program != null ? <div className="flex items-center gap-2 text-text-primary-light dark:text-text-primary-dark">
                                <span className="font-medium">{t("header.program")}:</span>
                                <span>{`${user.program[0]}${user.program.slice(1).toLowerCase()}`}</span>
                            </div> : null}

                            <div className="font-medium text-accent-light dark:text-accent-dark bg-bg-light dark:bg-bg-dark px-3 py-1 rounded border-l-4 border-border-light dark:border-border-dark">
                                {currentSemester ? `${currentSemester.name[0]}${currentSemester.name.slice(1).toLowerCase()} ${currentSemester.year} - ${(+currentSemester.year + 1 + "").slice(2)}` : 'No Active Semester'}
                            </div>
                        </div>
                    </div>
                </div>
                <div className='hidden xl:block xl:justify-self-end xl:pr-1'> <div className='block max-w-min'><ThemeSwitcher /> </div> </div>
            </header>
        </>
    )
}
