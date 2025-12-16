import React from 'react'
import Header from '../components/layouts/Header'
import Navbar from '../components/layouts/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from '../components/layouts/Footer'
import { useAuth } from '../contexts/AuthContext'

export default function TeacherHome() {
    // const ROUTES = ["home", "Courses", "Attendance", "Grades", "Profile"]
    const ROUTES = ["home", "Courses", "Profile"]

    const data = useAuth();
    const user = data?.user;
    console.log(user);

    return (
        <div className='xl:grid xl:grid-cols-20 xl:grid-rows-20 h-[100vh]'>
            <Header head="TEACHER" user={user} />
            <Navbar links={ROUTES} />
            <div className=' p-5 xl:col-span-17 xl:row-span-17 xl:overflow-y-auto ' >
                <Outlet />
            </div>
            <Footer />
        </div>
    )
}
