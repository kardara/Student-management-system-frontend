import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import ThemeSwitcher from '../components/UI/ThemeSwitcher';
import Button from '../components/forms/Button';


export default function NotFound() {
  const navigation = useNavigate();
  const goBack = () => navigation(-1);
  return (
    <>
      <div className='flex justify-end pt-5 pr-5'>
        <ThemeSwitcher />

      </div>
      <div className="flex items-center justify-center min-h-screen ">
        <div className="text-center">
          <h1 className="text-9xl font-extrabold">404</h1>
          <p className="text-2xl font-medium  mb-4">Oops! Page not found.</p>
          <p className="text-lg">
            The page you are looking for might have been removed or is temporarily unavailable.
          </p>
          <Button name="Go back" className="mt-5" onClick={goBack} />

        </div>
      </div>
    </>
  );
}
