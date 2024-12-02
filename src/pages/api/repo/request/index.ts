import connectToDatabase from "@/api/middlewares/connectToDatabase";
import validateUser from "@/api/middlewares/validateUser";
import { sendError, sendResponse } from "@/utils";
import ExpressLikeNextApiHandler from "express-like-next-api-handler";
import AppRepoRequest from "@/api/db/models/AppRepoRequest";
import AppRepo from "@/api/db/models/AppRepo";
import { sendNotification } from "@/api/util";

const { app, handler } = ExpressLikeNextApiHandler();
app.use(connectToDatabase);
app.use(validateUser);

app.post(async (req, res) => {
  try {
    const { appRepoId, requestByEmail, requestByName } = req.body;

    // Validate request body
    if (!appRepoId || !requestByEmail || !requestByName) {
      throw new Error("Invalid request body");
    }

    // Create new AppRepoRequest
    const newRequest = new AppRepoRequest({
      appRepo: appRepoId,
      requestByEmail,
      requestByName,
      key: `${appRepoId}-${requestByEmail}`,
    });

    // Save to database
    const savedRequest = await newRequest.save();

    console.log("savedRequest -> ", savedRequest);

    // sending notification in bg
    {
      AppRepo.findById(appRepoId).then((appRepo) => {
        console.log("appRepo -> ", appRepo);
        if (appRepo) {
          const creatorEmail = appRepo.creatorEmail;
          sendNotification(
            "New Request",
            `New request for ${appRepo.repo.name} by ${requestByName}`,
            creatorEmail
          );
        }
      });
    }

    // sendNotification("New Request", `New request for ${appRepoId} by ${requestByName}`, requestByEmail);

    // Respond with success
    res.status(200).json(sendResponse(savedRequest));
  } catch (e: any) {
    console.error(e);
    res.status(400).json(sendError(e?.message || "Failed to create request"));
  }
});

app.get(async (req, res) => {
  try {
    // Ensure user is authenticated
    // @ts-ignore
    const userEmail = req.user.email;

    // Fetch all repos where the user is the creator
    const userRepos = await AppRepo.find({ creatorEmail: userEmail });

    // If no repos found, return an empty response
    if (!userRepos || userRepos.length === 0) {
      return res.status(404).json(sendError("No repositories found for the current user"));
    }

    // Extract the IDs of the user's repositories
    const userRepoIds = userRepos.map((repo) => repo._id);

    // Fetch all requests for the user's repositories
    const requests = await AppRepoRequest.find({ appRepo: { $in: userRepoIds } })
      .populate("appRepo")
      .sort({ _id: -1 });

    // If no requests are found, return an appropriate message
    if (!requests || requests.length === 0) {
      return res.status(404).json(sendError("No requests found for your repositories"));
    }

    // Respond with data
    return res.status(200).json(sendResponse(requests));
  } catch (e: any) {
    console.error(e);
    return res.status(400).json(sendError(e?.message || "Failed to fetch repository requests"));
  }
});

export default handler;
