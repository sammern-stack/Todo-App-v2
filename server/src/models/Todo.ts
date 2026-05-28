import { Schema, model } from "mongoose";
import type { ITodo } from "../types/index.js";

const todoSchema = new Schema<ITodo>(
  {
    title: {
      type: String,
      required: [true, "Title must be provided"],
      minLength: [3, "Your todo must be at least 3 characters"],
    },
    stage: {
      type: String,
      default: "incomplete",
    },
  },
  {
    timestamps: true,
  },
);

const Todo = model<ITodo>("todo", todoSchema);
export default Todo;
