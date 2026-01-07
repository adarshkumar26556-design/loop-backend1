import mongoose from "mongoose";

const ConnectDB = async () => {
  try {
    console.log("MONGO_URI:", process.env.MONGO_URI); // DEBUG

    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connected:", mongoose.connection.name);
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

export default ConnectDB;
