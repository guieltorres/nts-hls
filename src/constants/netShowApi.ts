import axios from "axios";

import { REQUEST_TIMEOUT } from "./config";

export const netShowApi = () => {
  const apiUrl = process.env.EXPO_PUBLIC_API_URL;
  const config = {
    baseURL: apiUrl,
    timeout: REQUEST_TIMEOUT,
  };

  const instance = axios.create(config);
  return instance;
};
