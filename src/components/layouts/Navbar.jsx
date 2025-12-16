import React from 'react'
import { useTranslation } from 'react-i18next';
import { Link, NavLink } from 'react-router-dom'

export default function Navbar({links}) {
  const {t} = useTranslation()

  
  return (
    <>
      <div className="relative xl:static xl:col-span-3 xl:row-span-17 xl:grid xl:grid-rows-1 xl:grid-cols-1">
        <div id="navDiv" className="hidden fixed p-5 top-20 right-0 bg-bg-light dark:bg-bg-dark shadow-lg rounded-bl-lg border border-border-light dark:border-border-dark w-64 z-10 xl:flex xl:flex-col xl:justify-between  xl:static xl:w-auto overflow-x-auto xl:bg-bg-secondary-light xl:dark:bg-bg-secondary-dark">
          <nav className="flex flex-col gap-2">
            {links.map((item, i) => (
              <NavLink
                key={i}
                to={item.toLowerCase()}
                className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors font-medium ">
                {/* {item.toUpperCase()} */}
                {t(`navbar.${item.toLowerCase()}`).toUpperCase()}
              </NavLink>
            ))}
          </nav>
          <div className='pt-10'>
            <Link id='logout' className='px-4 py-3' to="/" onClick={()=> {
                localStorage.removeItem("jwtToken");
                localStorage.removeItem("user")
                localStorage.removeItem("semester")
              
                window.location.replace("/")
            }}>
              {t("navbar.logout")}
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
