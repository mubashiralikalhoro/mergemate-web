import AppLayout from "@/components/layout/AppLayout";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React from "react";
import { FaGithub, FaGithubSquare, FaPen } from "react-icons/fa";
import { signOut } from "next-auth/react";
import { NextPageContext } from "next";
import { useUserContext } from "@/context/UserContext";
import getSession from "@/utils/getServerSession";
import { toAuthPage } from "@/utils";
import api from "@/utils/api";
import Link from "next/link";

const ProfilePage = ({ repos }: { repos: Repository[] }) => {
  const { user } = useUserContext();
  console.log(repos);

  return (
    <div className="p-2">
      <div className="my-container mt-5 p-4 flex items-center gap-4">
        <Image
          alt="user"
          src={user?.image || "/images/user-placeholder.png"}
          className="w-[100px] md:w-[200px] aspect-square rounded-full"
          width={200}
          height={200}
        />
        <div className="w-full flex items-center justify-between">
          <div className="">
            <h1 className="text-2xl font-bold">{user?.name}</h1>
            <p className="text-gray-400">{user?.email}</p>
            <div className="flex items-center space-x-2 mt-1">
              <div className="text-xs ">{user?.githubProfile.followers} Followers</div>
              <div className="text-xs">{user?.githubProfile.following} Following</div>
              <div className="text-xs ">{user?.githubProfile.public_repos} Repositories</div>
            </div>
            <p className="text-gray-400 mt-3">{user?.githubProfile.bio}</p>
          </div>
          <div className="p-4 rounded-full border  border-gray-1 hover:bg-background-focused cursor-pointer">
            <FaPen className="text-lg cursor-pointer hover:scale-110" />
          </div>
        </div>
      </div>
      <div className="my-container mt-5 p-4">
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">Public Repositories</h2>
          <ul className="space-y-4">
            {repos.map((repo, index) => (
              <li key={index} className="my-container p-2 px-4 rounded-lg ">
                <div className="flex justify-between items-center gap-4">
                  <div>
                    <h3 className="text-lg font-semibold">{repo.name}</h3>
                    <p className="text-gray-500">{repo.description}</p>
                    <div className="flex items-center space-x-2">
                      <div className="text-xs text-gray-500">{repo.forks} Forks</div>
                      <div className="text-xs text-gray-500">{repo.stargazers_count} Stars</div>
                      <div className="text-xs text-gray-500">{repo.watchers} Watchers</div>
                    </div>
                    <p className="text-gray-500 text-xs mt-2">
                      {new Date(repo.created_at).toDateString().substring(4)}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Link href={repo.html_url} target="_blank" className="hover:scale-110 duration-300">
                      <FaGithub className="text-4xl " />
                    </Link>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

ProfilePage.Layout = AppLayout;
export default ProfilePage;

export const getServerSideProps = async (context: NextPageContext) => {
  const { authenticated, user } = await getSession(context);

  if (!authenticated) {
    return toAuthPage;
  }

  const [repos, error] = await api.app.get<Repository[]>(user?.githubProfile.repos_url!);

  return {
    props: {
      repos: repos?.data || [],
    },
  };
};
