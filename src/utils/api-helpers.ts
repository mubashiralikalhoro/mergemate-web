import apiEndPoints from "@/constants/apiEndPoints";
import api from "./api";
import notify from "./notify";

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
