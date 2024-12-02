import AppLayout from "@/components/layout/AppLayout";
import React from "react";
import { NextPageContext } from "next";
import { useUserContext } from "@/context/UserContext";
import getSession from "@/utils/getServerSession";
import { toAuthPage } from "@/utils";
import api from "@/utils/api";
import MainProfilePage from "@/components/Profile/MainProfilePage";

interface Props {
  repos: Repository[];
}

const ProfilePage = ({ repos }: Props) => {
  const { user } = useUserContext();
  return <MainProfilePage isMine={true} repos={repos} user={user!} />;
};

ProfilePage.Layout = AppLayout;
export default ProfilePage;

export const getServerSideProps = async (context: NextPageContext) => {
  const { authenticated, user } = await getSession(context);

  if (!authenticated) {
    return toAuthPage;
  }

  const [repos] = await api.app.get<Repository[]>(user?.githubProfile.repos_url!);

  return {
    props: {
      repos: repos?.data || [],
    },
  };
};
