//—————————————————————————————————————————————————————————————————
// Imports
//—————————————————————————————————————————————————————————————————

import { Router } from "express";

import {
  getTodos,
  getTodo,
  createTodo,
  updateTodo,
  deleteTodo,
  clearTodos,
} from "../controllers/todo.controller.js";

//—————————————————————————————————————————————————————————————————
// Routes
//—————————————————————————————————————————————————————————————————

const router = Router();

router.route("/").get(getTodos).post(createTodo);
router.patch("/clear", clearTodos);
router.route("/:id").get(getTodo).put(updateTodo).delete(deleteTodo);

export default router;
