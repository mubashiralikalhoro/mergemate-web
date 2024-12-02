import AppLayout from "@/components/layout/AppLayout";
import PageLoader from "@/components/Loaders/PageLoader";
import { toAuthPage } from "@/utils";
import getSession from "@/utils/getServerSession";
import { NextPageContext } from "next";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { getRequestsForUserRepos, updateRequestStatus } from "@/utils/api-helpers";
import Link from "next/link";
import useScreenLoader from "@/hooks/useScreenLoader";

const RequestsPage = () => {
  const [pageLoading, setPageLoading] = useState(true);
  const [requests, setRequests] = useState<AppRepoRequest[]>([]);
  const [error, setError] = useState(null);

  const { ScreenLoader, screenLoading, setScreenLoading } = useScreenLoader();

  useEffect(() => {
    getRequestsForUserRepos().then((requests) => {
      setRequests(requests);
      console.log("requests -> ", requests);
      setPageLoading(false);
    });
  }, []);

  const handleUpdateStatus = async (request: AppRepoRequest, status: "accept" | "reject") => {
    if (screenLoading) return;
    setScreenLoading(true);
    updateRequestStatus(request._id, request.appRepo._id, status, request.requestByEmail!)
      .then((is) => {
        if (is) {
          setRequests(requests.filter((req) => req._id !== request._id));
        }
      })
      .finally(() => {
        setScreenLoading(false);
      });
  };

  if (pageLoading) {
    return <PageLoader />;
  }

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  return (
    <>
      <ScreenLoader />
      <div className="p-2 w-full max-w-6xl">
        <div className="my-container mt-5 p-4 flex flex-col  gap-4">
          <h1 className="text-2xl font-bold mb-4">Requests</h1>
          {requests.length > 0 ? (
            <div className="space-y-4">
              {requests.map((request) => (
                <div
                  key={request.key}
                  className="my-container p-2 flex justify-between items-center flex-wrap gap-4"
                >
                  <div>
                    <Link href={`/user/${request.requestByEmail}`} className="font-semibold hover:underline">
                      Requester: {request.requestByEmail}
                    </Link>

                    <div className=" w-full flex items-center gap-4">
                      <div className="">
                        <p className="">{request.requestByEmail}</p>
                      </div>
                    </div>
                    <div className="mt-2 ">
                      <h1 className="font-bold text-sm">{request?.appRepo.repo.name} </h1>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="text-xs text-gray-500">{request.appRepo.repo.forks} Forks</div>
                      <div className="text-xs text-gray-500">
                        {request.appRepo.repo.stargazers_count} Stars
                      </div>
                      <div className="text-xs text-gray-500">{request.appRepo.repo.watchers} Watchers</div>
                    </div>
                    <p className="text-gray-500 text-xs mt-2">
                      {new Date(request.appRepo.repo.created_at).toDateString().substring(4)}
                    </p>

                    <div className="flex items-center mt-4 gap-2 flex-wrap text-xs sm:text-base">
                      <p className="font-bold ">Tech Stack: </p>
                      {request.appRepo.technologies.map((item) => (
                        <div
                          key={item}
                          className={` text-xs md:text-sm font-medium border-[1px] w-fit text-grayed-out border-grayed-out p-1 rounded`}
                        >
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="space-x-2">
                    <button
                      className="px-4 py-2 bg-green-900  text-white rounded-md hover:bg-green-600"
                      onClick={() => handleUpdateStatus(request, "accept")}
                    >
                      Accept
                    </button>
                    <button
                      className="px-4 py-2 bg-red-900 text-white rounded-md hover:bg-red-600"
                      onClick={() => handleUpdateStatus(request, "reject")}
                    >
                      Reject
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-gray-500 text-center">No requests found.</div>
          )}
        </div>
      </div>
    </>
  );
};

RequestsPage.Layout = AppLayout;
export default RequestsPage;

export const getServerSideProps = async (context: NextPageContext) => {
  const { authenticated } = await getSession(context);
  if (!authenticated) {
    return toAuthPage;
  }

  return {
    props: {},
  };
};
