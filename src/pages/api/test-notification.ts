import connectToDatabase from "@/api/middlewares/connectToDatabase";
import { sendNotification } from "@/api/util";
import ExpressLikeNextApiHandler from "express-like-next-api-handler";

const { app, handler } = ExpressLikeNextApiHandler();
app.use(connectToDatabase);

app.get((req, res) => {
  sendNotification("Testig Notification", "This is a test notification", "mubashiralikalhoro@gmail.com");
  res.json({ message: "Hello World" });
});

export default handler;
