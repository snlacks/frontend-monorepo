import axios from "axios";

axios.defaults.baseURL = process.env.NEXT_PUBLIC_AUTH_SERVER;
axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
axios.defaults.withCredentials = true;

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_AUTH_SERVER,
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
  withCredentials: true,
});

axiosInstance.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
axiosInstance.defaults.withCredentials = true;
