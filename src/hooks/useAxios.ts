import axios, { AxiosRequestConfig, Method } from "axios";
import { useEffect, useState } from "react";

import { http } from "../plugins/axios";

export interface UseAxiosConfigObj {
  method?: Method;
  url: string;
  requestConfig?: AxiosRequestConfig;
}

export const useAxios = (configObj: UseAxiosConfigObj) => {
  const { method = "get", url, requestConfig = {} } = configObj;

  const [response, setResponse] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [reload, setReload] = useState(0);

  const refetch = () => setReload((prev) => prev + 1);

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      try {
        const res = await http(url, {
          method,
          ...requestConfig,
          signal: controller.signal,
        });
        console.log(res);
        setResponse(res.data);
      } catch (err) {
        let message;
        if (axios.isAxiosError(error) && error.response) {
          message = error.response.data.message;
        } else message = String(error);
        console.log(message);
        setError(message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
    return () => controller.abort();
  }, [error, method, reload, requestConfig, url]);

  return { response, error, loading, refetch };
};
