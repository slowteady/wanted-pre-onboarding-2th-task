import axios from "axios";

export const apiClient = axios.create({
  baseURL: process.env.REACT_APP_ISSUES_API_URL,
  timeout: 5000,
});

apiClient.defaults.headers.common["Authorization"] = process.env.REACT_APP_ISSUES_API_ACCESS_TOKEN;
