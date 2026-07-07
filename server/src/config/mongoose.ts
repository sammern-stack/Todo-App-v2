import { connect, type QueryOptions } from "mongoose";
import { MONGODB_URI } from "@/config/env.js";

export const connectDB = async () => {
  try {
    const conn = await connect(MONGODB_URI);
    console.log(`MongoDB connected successfully: ${conn.connection.host}`);
  } catch (error) {
    console.log(`Couldn't connect to db: ${error}`);
    process.exit(1);
  }
};

export const queryOptions: QueryOptions = {
  lean: true,
  returnDocument: "after",
  runValidators: true,
};
