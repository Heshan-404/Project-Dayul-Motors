import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://project-dayul-motors-backend-heshan-404s-projects.vercel.app/api", // Set your base URL here
});

export default axiosInstance;
