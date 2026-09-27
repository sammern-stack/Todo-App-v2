import { connect } from "mongoose";
import { MONGODB_URI } from "@/config/env.js";
import Todo from "@/features/Todo/Todo.model.js";

export const connectDB = async () => {
  try {
    const conn = await connect(MONGODB_URI);
    await Todo.collection.updateMany({ stage: { $exists: true } }, [
      { $set: { isComplete: { $eq: ["$stage", "completed"] } } },
      { $unset: "stage" },
    ]);
    console.log(`MongoDB connected successfully: ${conn.connection.host}`);
  } catch (error) {
    console.log(`Couldn't connect to db: ${error}`);
    process.exit(1);
  }
};
