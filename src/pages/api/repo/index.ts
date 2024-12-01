import connectToDatabase from "@/api/middlewares/connectToDatabase";
import validateUser from "@/api/middlewares/validateUser";
import ExpressLikeNextApiHandler from "express-like-next-api-handler";
import * as Yup from "yup";
import AppRepo from "@/api/db/models/AppRepo";
import { sendError, sendResponse } from "@/utils";
import { AppRepoSchema } from "@/constants/schema";

const { app, handler } = ExpressLikeNextApiHandler();

app.use(connectToDatabase);
app.use(validateUser);

app.get(async (req, res) => {
  try {
    const { page = 1, limit = 10, creatorEmail } = req.query;

    const query: any = {};
    if (creatorEmail) {
      query.creatorEmail = creatorEmail;
    }

    const repos = await AppRepo.find(query)
      .skip((+page - 1) * +limit)
      .limit(+limit);

    const total = await AppRepo.countDocuments(query);

    res.status(200).json(sendResponse({ repos, total, page: +page, limit: +limit }));
  } catch (error: any) {
    res.status(400).json(sendError(error?.message || "Failed to fetch repos"));
  }
});

app.post(async (req, res) => {
  try {
    const user: User = (req as any).user;
    // Validate the request body
    const valid = await AppRepoSchema.validate(req.body, { abortEarly: false });

    if (!valid) {
      throw new Error("Invalid request body");
    }

    // Create a new AppRepo object
    const newRepo = new AppRepo({
      ...req.body,
      creatorEmail: user.email,
    });

    // Save the object to the database
    await newRepo.save();

    const json = await newRepo.toJSON();

    // Return success response
    res.status(200).json(sendResponse(json));
  } catch (error: any) {
    res.status(400).json(sendError(error?.message || "Invalid request body"));
  }
});

export default handler;
