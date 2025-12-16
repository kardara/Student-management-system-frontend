import api from "./apiClient";

export const login = async (username, password, loginAs) => {
  try {
    console.log
    const response = await api.post("auth/login", { username, password, loginAs });
    console.log(response);

    localStorage.setItem("OTPid", response.data.token);
    setTimeout(() => localStorage.removeItem("OTPid"), 1000 * 120)
    // localStorage.setItem("user", JSON.stringify(response.data.user));
    // localStorage.setItem("semester", JSON.stringify(response.data.semester))
    return response.data;
  } catch (error) {
    console.error("Login error:", error.response ? error.response.data : error.message);
    return error.response ? error.response.data : error.message;
  }
};

export const confirmOTP = async (otp, otpID) => {
  try {
    // console.log(`auth/otpvalidation?otp=${otp}&otpID=${otpID}`)
    const response = await api.post(`auth/otpvalidation?otp=${otp}&otpID=${otpID}`);
    console.log(response);

    localStorage.setItem("jwtToken", response.data.token);
    localStorage.setItem("user", JSON.stringify(response.data.user));
    localStorage.setItem("semester", JSON.stringify(response.data.semester))

    return response;
  } catch (error) {
    console.error("Login error:", error.response ? error.response.data : error.message);
    return error.response ? error.response.data : error.message;
  }
};

export const forgetPassword = async (username, loginAs) => {
  try {
    console.log(username, loginAs)
    const response = await api.post("auth/resetpassword", { username, password:null, loginAs });
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Login error:", error.response ? error.response.data : error.message);
    return error.response ? error.response.data : error.message;
  }
};

export const resetPassword = async (otp, otpID, password) => {
  try {
    const response = await api.post(`auth/resetpassword/otpvalidation?otp=${otp}&otpID=${otpID}`, password);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Login error:", error.response ? error.response.data : error.message);
    return error.response ? error.response.data : error.message;
  }
};



export const loginOauth = async (provider) => {
  try {
    window.location.href = `${api.getUri()}/oauth2/authorization/${provider}`
  } catch (error) {

  }
}

export const register = async (userData) => {
  const response = await api.post("/auth/register", userData);
  return response.data;
};

// export const logout = async () => {
//   localStorage.removeItem("jwtToken");
//   localStorage.removeItem("user")
//   localStorage.removeItem("semester")

//   window.location.reload()

// };

const getUserData = async (role) => {

  const token = localStorage.getItem("jwtToken")

  const resp = api.get("auth/data", { headers: { Authorization: `Bearer ${token}` }, data: { role: role } })
  console.log(resp);

}
