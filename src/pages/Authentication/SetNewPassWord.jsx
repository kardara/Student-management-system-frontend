import React, { useState } from 'react'

import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import ThemeSwitcher from '../../components/UI/ThemeSwitcher';
import InputField from '../../components/forms/InputField';
import Button from '../../components/forms/Button';
import { FaArrowLeftLong } from 'react-icons/fa6';
import { resetPassword } from '../../services/authService';

export default function SetNewPassWord() {
  const [newPassword, setNewPassword] = useState('');
  const [cnewPassword, setCNewPassword] = useState('');
  const navigate = useNavigate();
  // const { otpID } = useParams();
 const { search } = useLocation();
  const query = new URLSearchParams(search);
  const otp = query.get('token');
  const otpID = query.get('otpID');

  const handleSubmit = async (e) => {
    // e.preventDefault();

    if (newPassword !== cnewPassword) {
      toast.warning("Passwords do not match", { theme: localStorage.getItem('theme'), position: "top-center" })
      return;
    }

    resetPassword(otp, otpID, newPassword).then((resp) => {
      console.log(resp);

      if (resp.success) {
        toast.success(resp.message, { theme: localStorage.getItem('theme'), position: "top-center" })
        
        navigate(`/auth/login`);
      }

      if (!resp.success) {
        toast.error(resp.message, { theme: localStorage.getItem('theme'), position: "top-center" });
      }
    });
  };

  return (
    <>

      <ThemeSwitcher forAuth={true} />

      <div className='flex min-h-[100vh] place-content-center place-items-center p-5 md:text-lg bg-bg-secondary-light dark:bg-bg-secondary-dark'>
        <div className='w-96 md:w-[32rem] p-8 md:p-10 lg:p-12 flex flex-col  gap-1 max-h-min rounded-2xl bg-bg-light dark:bg-bg-dark'>
          <div className='flex flex-col items-center'>
            <img src="https://yt3.ggpht.com/ytc/AIdro_kxYtR3zxZ06I5vQ41JCt4phG2gudke6oY9WCxoxo5jz_0=s68-c-k-c0x00ffffff-no-rj" className='w-12 rounded-full' alt="AUCA Logo" />
            <br /><br />
            <h1 className="text-3xl font-bold text-center mb-4">Enter OTP and new password</h1>
          </div>
          <>
          <InputField
              name="New Password"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <InputField
              name="Confirm Password"
              type="password"
              value={cnewPassword}
              onChange={(e) => setCNewPassword(e.target.value)}
            />
            <Button type="submit" className="w-full mt-6" name={"Reset password"}
            onClick={handleSubmit}
            >
              Reset password
            </Button>
            <div className="flex items-center justify-center mt-4">
              {/* <FaArrowLeftLong className="mr-2" /> */}
              <Link to="/auth/login">Back to login</Link>
            </div>
          </>
        </div>
      </div>
    </>
  );
};


