import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://project-dayul-motors-backend.vercel.app/api", // Set your base URL here
});

export default axiosInstance;
