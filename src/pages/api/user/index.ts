import connectToDatabase from "@/api/middlewares/connectToDatabase";
import validateUser from "@/api/middlewares/validateUser";
import ExpressLikeNextApiHandler from "express-like-next-api-handler";

const { app, handler } = ExpressLikeNextApiHandler();

app.use(connectToDatabase);
app.use(validateUser);

app.get((req, res) => {
  // @ts-ignore
  res.send(req.user);
});
app.post((req, res) => {});

export default handler;
