import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Button from '../../components/forms/Button';
import SelectLoginRole from '../../components/forms/SelectLoginRole';
import InputField from '../../components/forms/InputField';
import ThemeSwitcher from '../../components/UI/ThemeSwitcher';
import { forgetPassword } from '../../services/authService';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';


export default function ForgetPassword() {
  const navigate = useNavigate();
  const [username, setUserName] = useState("");
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(false);

  const {t} = useTranslation();

  const handleUsernameChange = (e) => {
    setUserName(e.target.value);
  }

  const handleRoleChange = (e) => setRole(e.target.value);

  const submit = async (e) => {
    e.preventDefault();

    forgetPassword(username, role).then((resp) => {
      console.log(resp);

      if (resp.success) {
        toast.success(resp.message, { theme: localStorage.getItem('theme'), position: "top-center" })
        navigate(`/auth/login`);
      }
      if (!resp.success) {
        toast.error(resp.message, { theme: localStorage.getItem('theme'), position: "top-center" });
      }
    })

  }

  return (
    <>

      <ThemeSwitcher forAuth={true} />

      <div className='flex min-h-[100vh] place-content-center place-items-center p-5 md:text-lg bg-bg-secondary-light dark:bg-bg-secondary-dark'>
        <div className='w-96 md:w-[32rem] p-8 md:p-10 lg:p-12 flex flex-col  gap-1 max-h-min rounded-2xl bg-bg-light dark:bg-bg-dark'>
          <div className='flex flex-col items-center'>
            <img src="https://yt3.ggpht.com/ytc/AIdro_kxYtR3zxZ06I5vQ41JCt4phG2gudke6oY9WCxoxo5jz_0=s68-c-k-c0x00ffffff-no-rj" className='w-12 rounded-full' alt="AUCA Logo" />
            <br /><br />

            <h1 className="text-3xl font-bold text-center mb-4">{t("auth.resetPassword")} </h1>
          </div>
          <>
            <InputField
              name={t("auth.username")}
              type="text"
              value={username}
              onChange={handleUsernameChange}
            />
            <SelectLoginRole
              label={t("auth.role")}
              value={role}
              onChange={handleRoleChange}
            />
            <Button
              type="submit"
              className="w-full mt-6"
              disabled={loading}
              name={loading ? "Loading..." : t("auth.resetPassword")}
              onClick={submit}
            >
              {loading ? "Loading..." : "Reset password"}
            </Button>
          </>
        </div>
      </div>
    </>
  );
}




