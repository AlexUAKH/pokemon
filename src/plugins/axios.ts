import axios, { AxiosInstance } from "axios";

const config = {
  API_URL: "https://pokeapi.co/api/v2/",
  TIMEOUT: 10000,
};

const http: AxiosInstance = axios.create({
  baseURL: config.API_URL,
  timeout: config.TIMEOUT,
  headers: {
    Accept: "application/json",
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
  },
});

export { http };
