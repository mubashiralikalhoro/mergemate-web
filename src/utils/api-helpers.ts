import apiEndPoints from "@/constants/apiEndPoints";
import api from "./api";
import notify from "./notify";
import { IAppRepoRequest } from "@/api/db/models/AppRepoRequest";

export const getAppRepoFromApi = async (props: {
  page?: number;
  limit?: number;
  creatorEmail?: string;
}): Promise<GetAppRepoFromApiReturn> => {
  const { page, limit, creatorEmail } = props;

  let url = `${apiEndPoints.APP_REPO}?call=true`;

  if (page) {
    url += `&page=${page}`;
  }

  if (creatorEmail) {
    url += `&creatorEmail=${creatorEmail}`;
  }

  if (limit) {
    url += `&limit=${limit}`;
  }

  console.log("url -> ", url);

  const [repos, error] = await api.app.get<any>(`${url}`);

  if (error) {
    console.log("error -> ", error);
    return {
      repos: [],
      total: 0,
      page: page || 1,
      limit: limit || 10,
    };
  }

  return repos?.data?.data;
};

interface RequestForAppRepoProps {
  appRepoId: string;
  requestByEmail: string;
  requestByName: string;
}

export const requestForAppRepo = async (
  props: RequestForAppRepoProps
): Promise<{
  error: any;
  request: IAppRepoRequest | null;
}> => {
  console.log("props -> ", props);
  const [res, error] = await api.app.post<any>(apiEndPoints.APP_REPO_REQUEST, props);

  console.log("res -> ", res);

  if (error) {
    return {
      error,
      request: null,
    };
  }

  return {
    error: null,
    request: res?.data,
  };
};

export const getRequestsForUserRepos = async (): Promise<AppRepoRequest[]> => {
  const [requests, error] = await api.app.get<any>(apiEndPoints.APP_REPO_REQUEST);

  if (error) {
    notify.error(error);
    return [];
  }

  return requests?.data.data || [];
};

export const updateRequestStatus = async (
  requestId: string,
  appRepoId: string,
  status: "accept" | "reject",
  requestByEmail: string
): Promise<boolean> => {
  const [response, error] = await api.app.post<any>(`${apiEndPoints.APP_REPO_REQUEST_STATUS}`, {
    requestId: requestId,
    appRepoId: appRepoId,
    requestByEmail,
    action: status,
  });

  if (error) {
    notify.error(error);
    return false;
  }

  notify.success(`Request has been ${status}.`);
  return true;
};
