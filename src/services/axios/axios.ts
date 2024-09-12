import axios from "axios";


export const getApiClient = () => {
  const api = axios.create({
    baseURL: "http://localhost:3030/",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return api;
};