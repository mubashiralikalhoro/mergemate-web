import AppLayout from "@/components/layout/AppLayout";
import React from "react";
import { NextPageContext } from "next";
import { toHomePage } from "@/utils";
import api from "@/utils/api";
import MainProfilePage from "@/components/Profile/MainProfilePage";
import { getUserFromDB } from "@/api/util";

interface Props {
  repos: Repository[];
  user: User;
}

const UsersProfilePage = ({ repos, user }: Props) => {
  return <MainProfilePage isMine={false} repos={repos} user={user} />;
};

UsersProfilePage.Layout = AppLayout;
export default UsersProfilePage;

export const getServerSideProps = async (context: NextPageContext) => {
  const { email = "null" }: any = context.query;

  const { success, user } = await getUserFromDB(email);

  if (!success || !user) {
    return toHomePage;
  }

  console.log("user --->", user);

  const [repos] = await api.app.get<Repository[]>(user?.githubProfile.repos_url!);

  // @ts-ignore
  delete user._id;

  return {
    props: {
      repos: repos?.data || [],
      user,
    },
  };
};
