import AppRepo from "@/api/db/models/AppRepo";
import AppRepoRequest from "@/api/db/models/AppRepoRequest";
import connectToDatabase from "@/api/middlewares/connectToDatabase";
import validateUser from "@/api/middlewares/validateUser";
import { sendError, sendResponse } from "@/utils";
import ExpressLikeNextApiHandler from "express-like-next-api-handler";

const { app, handler } = ExpressLikeNextApiHandler();

app.use(connectToDatabase);
app.use(validateUser);

app.post(async (req, res) => {
  try {
    const { appRepoId, requestByEmail, action, requestId } = req.body;

    // Validate request body
    if (!appRepoId || !requestByEmail || !action || !requestId) {
      throw new Error("appRepoId, requestByEmail, requestId, and action are required");
    }

    // Find the AppRepo to validate the creator
    const appRepo = await AppRepo.findById(appRepoId);
    if (!appRepo) {
      return res.status(404).json(sendError("AppRepo not found"));
    }

    // Ensure the current user is the creator of the AppRepo
    // @ts-ignore
    if (appRepo.creatorEmail !== req.user.email) {
      return res.status(403).json(sendError("You are not authorized to perform this action"));
    }

    // Find the AppRepoRequest
    const appRepoRequest = await AppRepoRequest.findOne({ _id: requestId });
    if (!appRepoRequest) {
      return res.status(404).json(sendError("AppRepoRequest not found"));
    }

    if (action === "accept") {
      // Add the email if not already a contributor
      if (!appRepo.contributorEmails.includes(requestByEmail)) {
        appRepo.contributorEmails.push(requestByEmail);
        await appRepo.save();
      } else {
        return res.status(400).json(sendError("User is already a collaborator"));
      }

      // Delete the AppRepoRequest
      await AppRepoRequest.deleteOne({ _id: appRepoRequest._id });

      // Respond with success for acceptance
      return res
        .status(200)
        .json(sendResponse({ message: "Request accepted and user added as collaborator" }));
    } else if (action === "reject") {
      // Delete the AppRepoRequest for rejection
      await AppRepoRequest.deleteOne({ _id: appRepoRequest._id });

      // Respond with success for rejection
      return res.status(200).json(sendResponse({ message: "Request rejected and deleted" }));
    } else {
      return res.status(400).json(sendError("Invalid action"));
    }
  } catch (e: any) {
    console.error(e);
    res.status(400).json(sendError(e?.message || "Failed to process the request"));
  }
});

export default handler;
