import React, { useEffect } from "react";
import api from "../../services/apiClient";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

export default function OauthRedirect() {
  const navigate = useNavigate();
  const context = useAuth();

  useEffect(() => {
    const getCookie = (name) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop().split(";").shift();
    };

    const token = getCookie("token");
    if (token) {
      localStorage.setItem("jwtToken", token);
      // Call /auth/me to get user data
      api
        .get("/auth/me")
        .then((resp) => {
          const data = resp.data;
          if (data.success) {
            localStorage.setItem("semester", JSON.stringify(data.semester));
            context.updateUser(data.user);
            // Navigate based on role
            const role = data.role;
            if (role === "ADMIN") {
              navigate("/admin");
            } else if (role === "ACCOUNTANT") {
              navigate("/accountant");
            } else if (role === "REGISTRAR") {
              navigate("/registrar");
            } else if (role === "DEAN" || role === "HOD") {
              navigate("/academic");
            } else if (role === "STUDENT") {
              navigate("/student");
            } else if (role === "ASSISTANT" || role === "LECTURER") {
              navigate("/LECTURER");
            } else {
              navigate("/");
            }
          } else {
            navigate("/auth/oauth2/failed");
          }
        })
        .catch((err) => {
          console.error(err);
          navigate("/auth/oauth2/failed");
        });
    } else {
      navigate("/auth/oauth2/failed");
    }
  }, [navigate, context]);

  return <div>Loading user info...</div>;
}
