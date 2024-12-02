import Image from "next/image";
import React, { useEffect } from "react";
import { FaGithub, FaPen } from "react-icons/fa";
import { useUserContext } from "@/context/UserContext";
import api from "@/utils/api";
import Link from "next/link";
import classNames from "classnames";
import AddRepoModal from "@/components/Modals/AddRepoModal";
import useLoader from "@/hooks/useLoader";
import apiEndPoints from "@/constants/apiEndPoints";
import notify from "@/utils/notify";
import { getAppRepoFromApi } from "@/utils/api-helpers";
import Head from "next/head";

const options = ["Contributing To", "Seeking Contributors", "My Repositories"];

interface Props {
  repos: Repository[];
  isMine: boolean;
  user: User;
}

const MainProfilePage = ({ repos, isMine, user }: Props) => {
  const [appRepoData, setAppRepoData] = React.useState<GetAppRepoFromApiReturn>({
    repos: [],
    total: 0,
    page: 1,
    limit: 10,
  });

  const [activeSection, setActiveSection] = React.useState(options[2]);
  const [addRepoModal, setAddRepoModal] = React.useState(false);

  const { setLoading, loading } = useLoader();

  useEffect(() => {
    getAppRepoFromApi({
      creatorEmail: user?.email,
      limit: 1000000,
    }).then((res) => {
      console.log("res -> ", res);
      setAppRepoData(res);
    });
  }, []);

  useEffect(() => {
    console.log(appRepoData);
  }, [appRepoData]);

  const addRepo = async (values: any) => {
    if (!isMine) return;
    console.log(loading, values);
    if (loading) return;

    setLoading("Adding Repo...");
    const [res, error] = await api.app.post<any>(apiEndPoints.APP_REPO, values);
    setLoading(false);
    console.log("res -> ", res, error);

    if (error) {
      notify.error("Failed to add repo");
      return false;
    }

    if (res?.data?.data) {
      setAppRepoData((prev) => {
        return {
          ...prev,
          repos: [res?.data?.data, ...prev.repos],
        };
      });
    }

    notify.success("Repo added successfully");

    return true;
  };

  return (
    <>
      <Head>
        <title>{user?.name}</title>
      </Head>

      <div className="p-2 w-full max-w-6xl">
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
              <h1 className="text-xl md:text-2xl font-bold">{user?.name}</h1>
              <p className="text-gray-400">{user?.email}</p>
              <div className="flex items-center space-x-2 mt-1">
                <div className="text-xs ">{user?.githubProfile.followers} Followers</div>
                <div className="text-xs">{user?.githubProfile.following} Following</div>
                <div className="text-xs ">{user?.githubProfile.public_repos} Repositories</div>
              </div>
              <p className="text-gray-400 mt-3">{user?.githubProfile.bio}</p>
            </div>
            {isMine && (
              <div className="p-4 rounded-full border  border-gray-1 hover:bg-background-focused cursor-pointer">
                <FaPen className="text-lg cursor-pointer hover:scale-110" />
              </div>
            )}
          </div>
        </div>

        <div className="flex my-container my-4 justify-between">
          {options.map((section) => (
            <h2
              onClick={() => setActiveSection(section)}
              className={classNames(
                "text-xl w-full text-center cursor-pointer overflow-hidden font-bold py-2 border-b-[2px] ",
                {
                  " border-git-orange": activeSection === section,
                  "border-transparent": activeSection !== section,
                }
              )}
            >
              {section}
            </h2>
          ))}
        </div>
        <div className="my-container p-2">
          <div className="">
            {activeSection === options[2] && (
              <>
                <ul className="space-y-4 p-2">
                  <div className="flex items-center justify-between mb-2">
                    <h1 className="text-2xl font-bold">Repository</h1>
                  </div>
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
              </>
            )}

            {activeSection === options[1] && (
              <div className="p-2">
                <div className="flex items-center justify-between mb-2">
                  <h1 className="text-2xl font-bold">Repository</h1>
                  {isMine && (
                    <div
                      onClick={() => {
                        setAddRepoModal(true);
                      }}
                      className="my-button bg-primary"
                    >
                      Add Repository
                    </div>
                  )}
                </div>
                <ul className="space-y-4">
                  {appRepoData?.repos?.map((repo, index) => (
                    <li key={index} className="my-container p-2 px-4 rounded-lg ">
                      <div className="flex justify-between items-center gap-4">
                        <div>
                          <h3 className="text-lg font-semibold">{repo.repo.name}</h3>
                          <p className="text-gray-500">{repo.description}</p>

                          <div className="flex items-center space-x-2">
                            <div className="text-xs text-gray-500">{repo.repo.forks_count} Forks</div>
                            <div className="text-xs text-gray-500">{repo.repo.stargazers_count} Stars</div>
                            <div className="text-xs text-gray-500">{repo.repo.watchers} Watchers</div>
                          </div>
                          <div className="flex items-center mt-4 gap-2">
                            <p className="font-bold ">Contributors : </p>
                            <div className={`font-bold`}>{repo.contributorEmails?.length}</div>
                          </div>

                          <div className="flex items-center mt-4 gap-2">
                            <p className="font-bold ">Difficulty: </p>
                            <div
                              className={`text-sm font-medium border-[1px] w-fit ${
                                repo.difficulty === "easy"
                                  ? "text-green-500 border-green-500"
                                  : repo.difficulty === "medium"
                                  ? "text-yellow-500 border-yellow-500"
                                  : "text-red-500 border-red-500"
                              } p-1 rounded`}
                            >
                              {repo.difficulty}
                            </div>
                          </div>

                          <div className="flex items-center mt-4 gap-2 flex-wrap">
                            <p className="font-bold ">Tech Stack: </p>
                            {repo.technologies.map((item) => (
                              <div
                                key={item}
                                className={`text-sm font-medium border-[1px] w-fit text-grayed-out border-grayed-out p-1 rounded`}
                              >
                                {item}
                              </div>
                            ))}
                          </div>
                          <div className="mt-5">
                            <p className="font-bold ">Contribution Guidelines</p>
                            <p className="text-grayed-out">{repo?.contributionGuidelines}</p>
                          </div>

                          <div className="mt-5">
                            <p className="font-bold ">Description</p>
                            <p className="text-grayed-out">{repo?.description}</p>
                          </div>
                          <p className="text-gray-500 text-xs mt-2">
                            {new Date(repo.repo.created_at).toDateString().substring(4)}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Link
                            href={repo.repo.html_url}
                            target="_blank"
                            className="hover:scale-110 duration-300"
                          >
                            <FaGithub className="text-4xl " />
                          </Link>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        <AddRepoModal addRepo={addRepo} repos={repos} isOpen={addRepoModal} setOpen={setAddRepoModal} />
      </div>
    </>
  );
};

export default MainProfilePage;
