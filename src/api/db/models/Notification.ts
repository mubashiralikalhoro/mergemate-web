import mongoose, { Document } from "mongoose";

interface INotification {
  email?: string;
  heading?: string;
  content?: string;
  additionalData: any;
  createdAt?: string;
}

interface MongooseINotification extends INotification, Document {}

const NotificationSchema = new mongoose.Schema({
  email: { type: String, required: true },
  heading: { type: String, required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  additionalData: { type: mongoose.Schema.Types.Mixed, required: true },
});

const Notification =
  mongoose.models.Notification || mongoose.model<MongooseINotification>("Notification", NotificationSchema);

export default Notification;
