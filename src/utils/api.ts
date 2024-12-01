import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import apiEndPoints from "@/constants/apiEndPoints";

// setup base thing

const axiosInter = {
  app: axios.create({
    responseType: "json",
    headers: { "Content-Type": "application/json" },
  }),
  github: axios.create({
    baseURL: apiEndPoints.GITHUB_BASE_URL,
    responseType: "json",
    headers: { "Content-Type": "application/json" },
  }),
};

// caller function
const caller = async <T>(
  area: "app" | "github",
  type: "post" | "get" | "put" | "delete",
  url: string,
  data?: any,
  config?: AxiosRequestConfig<any>
) => {
  let response;
  let error;
  try {
    if (type === "get" || type === "delete") {
      response = await axiosInter[area][type](url, config);
    } else {
      response = await axiosInter[area][type](url, data, config);
    }
  } catch (err: any) {
    response = null;
    error = err?.response?.data?.error?.message || err?.message || "Something went wrong";
  }

  return [
    {
      data: response?.data,
      error: null,
    },
    error,
  ] as [
    {
      data: T;
      error: null;
    },
    err: string
  ];
};

const api = {
  app: {
    get: async <T>(url: string, config?: AxiosRequestConfig<any>) =>
      caller<T>("app", "get", url, undefined, config),
    delete: async <T>(url: string, config?: AxiosRequestConfig<any>) =>
      caller<T>("app", "delete", url, undefined, config),
    post: async <T>(url: string, data: any, config?: AxiosRequestConfig<any>) =>
      caller<T>("app", "post", url, data, config),
    put: async <T>(url: string, data: any, config?: AxiosRequestConfig<any>) =>
      caller<T>("app", "put", url, data, config),
  },
  github: {
    get: async <T>(url: string, config?: AxiosRequestConfig<any>) =>
      caller<T>("github", "get", url, undefined, config),
    delete: async <T>(url: string, config?: AxiosRequestConfig<any>) =>
      caller<T>("github", "delete", url, undefined, config),
    post: async <T>(url: string, data: any, config?: AxiosRequestConfig<any>) =>
      caller<T>("github", "post", url, data, config),
    put: async <T>(url: string, data: any, config?: AxiosRequestConfig<any>) =>
      caller<T>("github", "put", url, data, config),
  },
};

export default api;
