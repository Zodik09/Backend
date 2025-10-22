import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3000/", // After production switch to the backend production URL
  withCredentials: true,
});

export default instance;
