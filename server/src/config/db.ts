import mongoose from "mongoose";
import { config } from "./env.js";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(config.mongodbUri);
    console.log(`MongoDB connected successfully: ${conn.connection.host}`);
  } catch (error) {
    console.log(`Couldn't connect to db: ${error}`);
    process.exit(1);
  }
};
