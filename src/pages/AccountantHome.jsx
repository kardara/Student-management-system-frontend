import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../components/layouts/Footer';
import Header from '../components/layouts/Header';
import Navbar from '../components/layouts/Navbar';

export default function AccountantHome() {
  const ROUTES = [
     "HOME",
     "Payment",
     "Fees",
     "FINANCES",
     "Student",
     "REPORTS",
     "PROFILE"
   ]
 
 
 
   return (
     <div className='xl:grid xl:grid-cols-20 xl:grid-rows-20 h-[100vh]'>
       <Header head="accountant" />
       <Navbar links={ROUTES} />
       <Outlet />
       <Footer />
     </div>
   )
}
