import connect from "../db/connect";

const connectToDatabase = async () => {
  await connect();
};

export default connectToDatabase;
