import mongoose, { Document } from "mongoose";

interface IUser {
  email?: string;
  image?: string;
  name?: string;
  githubProfile: any;
}

interface MongooseIUser extends IUser, Document {}

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  image: { type: String, required: true },
  name: { type: String, required: true },
  githubProfile: { type: mongoose.Schema.Types.Mixed, required: true },
});

const User = mongoose.models.User || mongoose.model<MongooseIUser>("User", UserSchema);

export default User;
