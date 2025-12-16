import React, { useState, useEffect, useRef } from 'react';
import ThemeSwitcher from '../../components/UI/ThemeSwitcher';
import Button from '../../components/forms/Button';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../../contexts/AuthContext';
import { confirmOTP } from '../../services/authService';

export default function OTPVerification() {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timeLeft, setTimeLeft] = useState(120); // 2 minutes in seconds
  const [isExpired, setIsExpired] = useState(false);
  const inputRefs = useRef([]);
  const navigate = useNavigate();
  const [buttonLoading, setButtonLoading] = useState(false);

  const context = useAuth();
  // const { otpID } = useParams();
  const otpID = localStorage.getItem("OTPid");


  // Timer effect
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setIsExpired(true);
    }
  }, [timeLeft]);

  // Format time as MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Handle input change
  const handleChange = (e, index) => {
    const value = e.target.value;

    // Only allow numbers
    if (!/^\d*$/.test(value)) return;

    // Update OTP array
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1); // Only take the last digit
    setOtp(newOtp);

    // Auto focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  // Handle backspace key
  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      // Focus previous input when backspace is pressed on empty input
      inputRefs.current[index - 1].focus();
    }
  };

  // Handle paste
  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text/plain').trim();

    // Check if pasted content is 6 digits
    if (/^\d{6}$/.test(pastedData)) {
      const digits = pastedData.split('');
      setOtp(digits);

      // Focus last input
      inputRefs.current[5].focus();
    }
  };

  // Verify OTP
  const verifyOtp = () => {
    const otpCode = otp.join('');

    if (otpCode.length !== 6) {
      toast.warning("Please enter a valid 6-digit OTP", {
        theme: localStorage.getItem('theme'),
        position: "top-center"
      });
      return;
    }

    if (isExpired) {
      toast.error("OTP has expired. Please request a new one.", {
        theme: localStorage.getItem('theme'),
        position: "top-center"
      });
      return;
    }
    setButtonLoading(true);
    confirmOTP(otpCode, otpID).then((resp) => {
      console.log(resp);
      setButtonLoading(false);
      if (resp.status === 200) {
        toast.success(resp.message, { theme: localStorage.getItem('theme'), position: "top-center" })
        // context.updateUser(JSON.parse(localStorage.getItem("user")))
        // console.log(localStorage.getItem("jwtToken"))
        // context.updateUser(resp.data.user);
        setTimeout(() => window.location.reload(), 0)
        // navigate(`/${resp.data.user.role}`);
      }

      if (!resp.success) {
        toast.error(resp.message, { theme: localStorage.getItem('theme'), position: "top-center" });

      }
    });


    // setTimeout(() => {
    //   context.updateUser(JSON.parse(localStorage.getItem("user")));
    //   navigate('/dashboard');
    // }, 1000);
  };

  // Resend OTP
  const resendOtp = () => {
    // TODO: Implement OTP resend functionality
    setTimeLeft(120); // Reset timer
    setIsExpired(false);
    setOtp(['', '', '', '', '', '']);

    toast.info("New OTP has been sent to your email/phone", {
      theme: localStorage.getItem('theme'),
      position: "top-center"
    });
  };

  return (
    <>
      <ThemeSwitcher forAuth={true} />

      <div className="flex flex-col min-h-screen place-content-center place-items-center p-5 md:text-2xl bg-bg-secondary-light dark:bg-bg-secondary-dark">
        <p className='flex gap-3 justify-around text-xl md:text-3xl font-black items-center mb-10'>
          <img src="https://yt3.ggpht.com/ytc/AIdro_kxYtR3zxZ06I5vQ41JCt4phG2gudke6oY9WCxoxo5jz_0=s68-c-k-c0x00ffffff-no-rj" className='w-12 md:w-20 rounded-full' alt="AUCA Logo" />
          Student Management System
        </p>
        <div className="w-96 md:w-[32rem] p-8 md:p-10 lg:p-12 flex flex-col gap-6 max-h-min rounded-2xl bg-bg-light dark:bg-bg-dark">
          <div className="text-center">
            <h1 className="text-2xl md:text-4xl font-bold mb-2">Verify Your Account</h1>
            <p className="text-sm md:text-base text-gray-500 dark:text-gray-400">
              Enter the 6-digit code sent to your email/phone
            </p>
          </div>

          {/* OTP Input Fields */}
          <div className="flex justify-center gap-2 md:gap-4">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={el => inputRefs.current[index] = el}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                onPaste={index === 0 ? handlePaste : null}
                className="w-10 h-12 md:w-12 md:h-16 text-center text-lg md:text-2xl font-bold border-2 rounded-lg 
                          border-gray-300 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400
                          bg-white dark:bg-gray-800 outline-none transition-all"
              />
            ))}
          </div>

          {/* Timer */}
          <div className="text-center">
            <p className={`text-sm md:text-base ${isExpired ? 'text-red-500' : 'text-gray-500 dark:text-gray-400'}`}>
              {isExpired
                ? "OTP has expired"
                : `OTP expires in ${formatTime(timeLeft)}`
              }
            </p>
          </div>

          {/* Verify Button */}
          <Button name="Verify OTP" onClick={verifyOtp} loading={buttonLoading} />

          {/* Resend Option */}
          <p className="text-center text-sm md:text-base">
            Didn't receive the code?{' '}
            <button
              onClick={resendOtp}
              className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
            >
              Resend OTP
            </button>
          </p>
        </div>
      </div>
    </>
  );
}