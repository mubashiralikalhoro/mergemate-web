import connectToDatabase from "@/api/middlewares/connectToDatabase";
import validateUser from "@/api/middlewares/validateUser";
import ExpressLikeNextApiHandler from "express-like-next-api-handler";
import AppRepo from "@/api/db/models/AppRepo";
import { sendError, sendResponse } from "@/utils";
import { AppRepoSchema } from "@/constants/schema";
import AppRepoRequest from "@/api/db/models/AppRepoRequest";

const { app, handler } = ExpressLikeNextApiHandler();

app.use(connectToDatabase);
app.use(validateUser);

app.get(async (req, res) => {
  try {
    const { page = 1, limit = 10, userEmail } = req.query;
    if (!userEmail) {
      throw new Error("userEmail is required");
    }

    console.log("userEmail -> ", userEmail);

    const query = {
      contributorEmails: userEmail,
    };

    // Fetch the repositories
    const repos = await AppRepo.find(query)
      .skip((+page - 1) * +limit)
      .limit(+limit);

    // Count total repositories for pagination
    const total = await AppRepo.countDocuments(query);

    res.status(200).json(
      sendResponse({
        repos,
        total,
        page: +page,
        limit: +limit,
      })
    );
  } catch (error: any) {
    res.status(400).json(sendError(error?.message || "Failed to fetch contributed repos"));
  }
});

export default handler;
