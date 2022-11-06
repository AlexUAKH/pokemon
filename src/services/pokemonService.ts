import { http } from "../plugins/axios";

export const getAll = (limit: number = 1200) => {
  return http.get(`pokemon?limit=${limit}`);
};
