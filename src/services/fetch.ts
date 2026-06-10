import axios from "axios";

import { API_KEY_MARVEL, BASE_PATH_MARVEL_API } from "../constants";
import { logSuccess } from "../helpers/log";

export const api = axios.create({
  baseURL: BASE_PATH_MARVEL_API,
});

api.interceptors.request.use((config) => {
  config.params = config.params || {};
  config.params.apiKey = API_KEY_MARVEL;

  const base = config.baseURL ?? "";
  const url = config.url ?? "";

  logSuccess(
    `API Url : ${base}${url} / API params : ${JSON.stringify({ ...config.params, apiKey: "XXXXXXX" })}`,
  );

  return config;
});

api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message = error?.response?.data?.message ?? error.message;
    console.error("API Error:", error);
    return Promise.reject(new Error(message));
  },
);
