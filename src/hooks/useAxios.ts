import axios, { AxiosRequestConfig, Method } from "axios";
import { useEffect, useState } from "react";

import { http } from "../plugins/axios";

export interface UseAxiosConfigObj {
  method?: Method;
  url: string;
  requestConfig?: AxiosRequestConfig;
}

export const useAxios = <T = any>(configObj: UseAxiosConfigObj) => {
  const { method = "get", url, requestConfig = null } = configObj;

  const [response, setResponse] = useState<T | null>(null);
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

        setResponse(res.data);
      } catch (err) {
        let message;
        if (axios.isAxiosError(error) && error.response) {
          message = error.response.data.message;
        } else message = String(error);

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
