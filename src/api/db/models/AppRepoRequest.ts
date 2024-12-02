import mongoose, { Document } from "mongoose";
import { unique } from "next/dist/build/utils";

export interface IAppRepoRequest {
  key?: string;
  requestByEmail?: string;
  requestByName?: string;
  name?: string;
  appRepo: mongoose.Schema.Types.ObjectId;
}

interface MongooseIAppRepoRequest extends IAppRepoRequest, Document {}

const AppRepoRequestSchema = new mongoose.Schema({
  key: { type: String, required: true, unique: true },
  requestByEmail: { type: String, required: true, unique: false },
  requestByName: { type: String, required: true },
  appRepo: { type: mongoose.Schema.Types.ObjectId, ref: "AppRepo", required: true }, // Reference to AppRepo
});

const AppRepoRequest =
  mongoose.models.AppRepoRequest ||
  mongoose.model<MongooseIAppRepoRequest>("AppRepoRequest", AppRepoRequestSchema);

export default AppRepoRequest;
