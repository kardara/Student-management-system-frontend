import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../components/layouts/Footer';
import Header from '../components/layouts/Header';
import Navbar from '../components/layouts/Navbar';
import { useAuth } from '../contexts/AuthContext';

export default function AdminHome() {
    const ROUTES = [
        "home",
        "Academic unit",
        "Applications",
        "Students",
        "Attendance",
        "Grades",
        "Teachers",
        "Staff",
        "Courses",
        "Semesters",
        "Registration",
        "Finances",
        "Claims",
        "Reports",
        "Profile"
    ]

    const data = useAuth();

    const user = data?.user

    return (
        <div className='xl:grid xl:grid-cols-20 xl:grid-rows-20 h-[100vh]'>
            <Header head="admin" user={user} />
            <Navbar links={ROUTES} />
            <div className=' p-5 xl:col-span-17 xl:row-span-17 xl:overflow-y-auto ' >
                <Outlet />
            </div>
            <Footer />
        </div>
    )
}
