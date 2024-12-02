import Notification from "@/api/db/models/Notification";
import connectToDatabase from "@/api/middlewares/connectToDatabase";
import AppLayout from "@/components/layout/AppLayout";
import { toAuthPage } from "@/utils";
import getSession from "@/utils/getServerSession";
import { NextPageContext } from "next";
import React from "react";
import { format } from "timeago.js";

interface Props {
  notifications: {
    heading: string;
    content: string;
    createdAt: string;
    additionalData: any;
  }[];
}
const NotificationPage = ({ notifications }: Props) => {
  return (
    <>
      <div className="p-2 w-full max-w-6xl">
        <div className="my-container mt-5 p-4 flex flex-col  gap-4">
          <h1 className="text-2xl font-bold mb-4">Notifications</h1>
          {notifications.map((item, index) => (
            <div key={index} className="my-container p-2">
              <h1 className="font-bold">{item.heading}</h1>
              <p className="text-grayed-out">{item.content}</p>
              <p className="text-grayed-out text-sm">{format(item.createdAt)}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

NotificationPage.Layout = AppLayout;
export default NotificationPage;

export const getServerSideProps = async (context: NextPageContext) => {
  const { authenticated, user } = await getSession(context);
  if (!authenticated) {
    return toAuthPage;
  }

  await connectToDatabase();
  const notifications = await Notification.find({ email: user?.email }).sort({ createdAt: -1 });

  // Map over the notifications and ensure all are converted to JSON
  const notificationsJSON = notifications.map((notification) => {
    return {
      heading: notification.heading,
      content: notification.content,
      createdAt: notification.createdAt?.toISOString(),
      additionalData: notification.additionalData,
    };
  });

  return {
    props: {
      notifications: notificationsJSON || [],
    },
  };
};
