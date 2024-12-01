import mongoose, { Document } from "mongoose";

export interface IAppRepo {
  creatorEmail: string;
  description: string;
  contributionGuidelines: string;
  difficulty: "easy" | "medium" | "hard";
  technologies: string[];
  repo: Record<string, any>;
  contributorEmails: string[];
}

interface MongooseIAppRepo extends IAppRepo, Document {}

const AppRepoSchema = new mongoose.Schema({
  creatorEmail: { type: String, required: true },
  description: { type: String, required: true },
  contributionGuidelines: { type: String, required: true },
  difficulty: { type: String, enum: ["easy", "medium", "hard"], required: true },
  technologies: { type: [String], required: true },
  repo: { type: mongoose.Schema.Types.Mixed, required: true },
  contributorEmails: { type: [String], default: [] },
});

const AppRepo = mongoose.models.AppRepo || mongoose.model<MongooseIAppRepo>("AppRepo", AppRepoSchema);

export default AppRepo;
