import { Schema, model } from "mongoose";

import type { TodoSchema } from "./todo.types.js";

const todoSchema = new Schema<TodoSchema>(
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
  { timestamps: true },
);

const Todo = model<TodoSchema>("todo", todoSchema);
export default Todo;
