import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;
console.log("url: ", apiUrl)


const api = axios.create({
  baseURL: apiUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

export const authApi = axios.create({
  baseURL: apiUrl,
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${localStorage.getItem("jwtToken")}`
  },
})

authApi.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 401 && localStorage.getItem("jwtToken")) {
      handleUnauthorized();
    }
    return Promise.reject(error);
  }
);

authApi.interceptors.request.use(
  config => {
    if (!localStorage.getItem("jwtToken")) {
      setTimeout(() => { window.location.reload(); }, 2000);
      return Promise.reject(new Error("No authorization token found"));
    }
    return config;
  }
);

function handleUnauthorized() {
  console.log("Unauthorized – token may have expired");

  localStorage.removeItem("jwtToken");
  localStorage.removeItem("user")
  localStorage.removeItem("semester")
  // window.location.reload()

  // localStorage.removeItem("jwtToken");
  // window.location.href = "/auth/login";
}

export default api;

