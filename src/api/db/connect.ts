import mongoose from "mongoose";

const connection: any = {};

const connect = async () => {
  if (connection.isConnected) {
    return;
  }

  console.log("Connecting to db...");
  const db = await mongoose.connect(process.env.MONGODB_URI!, {});
  connection.isConnected = db.connections[0].readyState;
};

export default connect;
