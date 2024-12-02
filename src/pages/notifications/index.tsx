import AppLayout from "@/components/layout/AppLayout";
import { toAuthPage } from "@/utils";
import getSession from "@/utils/getServerSession";
import { NextPageContext } from "next";
import React from "react";

const NotificationPage = () => {
  return (
    <>
      <div className="p-2 w-full max-w-6xl">
        <div className="my-container mt-5 p-4 flex flex-col  gap-4">
          <h1 className="text-2xl font-bold mb-4">Notifications</h1>
          Work in progress
        </div>
      </div>
    </>
  );
};

NotificationPage.Layout = AppLayout;
export default NotificationPage;

export const getServerSideProps = async (context: NextPageContext) => {
  const { authenticated } = await getSession(context);
  if (!authenticated) {
    return toAuthPage;
  }

  return {
    props: {},
  };
};
