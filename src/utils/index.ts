import { redirect } from "next/dist/server/api-utils";

export const toAuthPage = {
  redirect: {
    destination: "/auth/login",
    permanent: false,
  },
};

export const toProfilePage = {
  redirect: {
    destination: "/user/profile",
    permanent: false,
  },
};

export const toHomePage = {
  redirect: {
    destination: "/discover",
    permanent: false,
  },
};

export const sendError = (message: string) => {
  return {
    error: message,
    data: null,
  };
};

export const sendResponse = (data: any) => {
  return {
    error: null,
    data,
  };
};
