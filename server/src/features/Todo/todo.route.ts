import { Router } from "express";

import * as todoController from "./todo.controller.js";

const router = Router();

router.route("/").get(todoController.getTodos).post(todoController.createTodo);
router.patch("/clear", todoController.clearTodos);
router
  .route("/:id")
  .get(todoController.getTodo)
  .put(todoController.updateTodo)
  .delete(todoController.deleteTodo);

export default router;
