import React, { useState } from "react";
import InputField from "../../components/forms/InputField";
import Button from "../../components/forms/Button";
import ThemeSwitcher from "../../components/UI/ThemeSwitcher";
import { login, loginOauth } from "../../services/authService";
import AuthIcon from "../../components/AuthIcon";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../contexts/AuthContext";
import SelectLoginRole from "../../components/forms/SelectLoginRole";
import { useTranslation } from "react-i18next";

export default function Login() {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const navigate = useNavigate();
  const context = useAuth();
  const [buttonLoading, setButtonLoading] = useState(false);

  const { t } = useTranslation();

  const handleUsernameChange = (e) => {
    setUserName(e.target.value);
  };

  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleRoleChange = (e) => setRole(e.target.value);

  function submit(e) {
    // e.preventDefault();
    if (username.length < 1) {
      toast.warning("Please enter a valid username", {
        theme: localStorage.getItem("theme"),
        position: "top-center",
      });
      return;
    }
    console.log(username, password, role);
    setButtonLoading(true);

    login(username, password, role).then((resp) => {
      console.log(resp);
      setButtonLoading(false);
      if (resp.success) {
        toast.success(resp.message, {
          theme: localStorage.getItem("theme"),
          position: "top-center",
        });
        // context.updateUser(JSON.parse(localStorage.getItem("user")))
        // setTimeout(() => window.location.reload(), 50)
        navigate(`/auth/login/otp/`);
      }

      if (!resp.success) {
        toast.error(resp.message, {
          theme: localStorage.getItem("theme"),
          position: "top-center",
        });
      }
    });
  }

  const oauthHandler = (provider) => {
    loginOauth(provider);
  };
  return (
    <>
      <ThemeSwitcher forAuth={true} />

      <div className="flex min-h-[100vh] place-content-center place-items-center p-5 md:text-lg bg-bg-secondary-light dark:bg-bg-secondary-dark">
        <div className="w-96 md:w-[32rem] p-8 md:p-10 lg:p-12 flex flex-col  gap-1 max-h-min rounded-2xl bg-bg-light dark:bg-bg-dark">
          <div className="flex flex-col items-center">
            <p
              className="flex items-center cursor-pointer gap-12"
              onClick={() => navigate("/")}
            >
              <img
                src="https://yt3.ggpht.com/ytc/AIdro_kxYtR3zxZ06I5vQ41JCt4phG2gudke6oY9WCxoxo5jz_0=s68-c-k-c0x00ffffff-no-rj"
                className=" rounded-full"
                alt="AUCA Logo"
              />
              {/* <span className="text-xl font-bold text-light-primary dark:text-dark-primary">AUCA</span> */}
            </p>

            <h1 className="text-center text-xl md:text-2xl font-bold text-primary-light dark:text-primary-dark">
              {t("auth.loginTitle")}
            </h1>
            <p className="text-text-secondary-light dark:text-text-secondary-dark">
              {t("auth.loginSubtitle")}
            </p>
          </div>
          <br />
          <>
            <InputField
              value={username}
              onChange={handleUsernameChange}
              name={t("auth.username")}
            />
            <br />
            <InputField
              value={password}
              onChange={handlePasswordChange}
              name={t("auth.password")}
              secured={true}
            />
            <p className="text-right text-sm">
              {" "}
              <Link to="/auth/forget-password">
                {t("auth.forgetPassword")}
              </Link>{" "}
            </p>
            {/* <SelectLoginRole label={t("auth.loginAs")} value={role} onChange={handleRoleChange} />
                        <br /> */}
            <Button
              name={t("auth.login")}
              onClick={submit}
              loading={buttonLoading}
            />
            <br />

            <div className="flex justify-around items-center gap-2 my-2">
              <hr className="w-[100%]" />
              <p className="text-center min-w-max">{t("auth.orLoginWith")} </p>
              <hr className="w-[100%]" />
            </div>
            <div className="grid grid-cols-2 gap-4 px-5">
              <AuthIcon
                image={FaGoogle}
                label="Google"
                onClick={() => oauthHandler("google")}
              />
              <AuthIcon
                image={FaGithub}
                label="GitHub"
                onClick={() => oauthHandler("github")}
              />
            </div>

            {/* <p className='mt-2'>Don't have an account? <Link to="/signup">register</Link></p> */}
          </>
        </div>
      </div>
    </>
  );
}
