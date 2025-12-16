import React from 'react'
import Navbar from '../components/homePage/Navbar'
import Hero from '../components/homePage/Hero'
import Footer from '../components/homePage/Footer'
import Features from '../components/homePage/Features'
import Programs from '../components/homePage/Programs'
import CampusLife from '../components/homePage/CampusLife'
import CallToAction from '../components/homePage/CallToAction'
import api from '../services/apiClient'

export default function Home() {
  console.log("Test backend running")
  api.get('test/test)').then(res => console.log(res)).catch(err => console.log(err))
  return (
    <>
      <div className="min-h-screen bg-light-bg dark:bg-[#1A202C]">
        <Navbar />
        <main>
          <Hero />
          <Features />
          <Programs />
          <CampusLife />
          <CallToAction />
        </main>
        <Footer />
      </div>
    </>
  )
}
