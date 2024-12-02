import axios from "axios";
import User from "../db/models/User";
import Notification from "../db/models/Notification";

export const getUserFromDB = async (
  email: string
): Promise<{
  success: boolean;
  user: User | null;
}> => {
  try {
    const user = await User.findOne({
      email,
    });

    if (!!user) {
      return {
        success: true,
        user: await user.toJSON(),
      };
    }
  } catch (e) {}
  return {
    success: true,
    user: null,
  };
};

export const sendNotification = async (heading: string, content: string, email: string) => {
  console.log("Sending Notification...", heading, content, email);
  const data = {
    heading,
    content,
  };

  try {
    await new Notification({
      email,
      heading,
      content,
      additionalData: data,
    }).save();
  } catch (e: any) {
    console.log("Error saving notification to db", e.message);
  }

  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/notifications`;

  const body = {
    app_id: process.env.NEXT_PUBLIC_ONESIGNAL_APP_ID,
    include_external_user_ids: [email],
    contents: {
      en: content,
    },
    headings: {
      en: heading,
    },
    url,
    data,
  };

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Basic ${process.env.ONESIGNAL_API_KEY}`,
  };

  const res = await axios
    .post(process.env.ONESIGNAL_NOTIFICATION_URL!, body, {
      headers,
    })
    .catch((e: any) => {
      console.log("Error sending notification", e.message);
    });

  console.log("Notification Sent", res?.data);
};
