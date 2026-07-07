import { Router } from "express";
import todoRoutes from "@/features/Todo/todo.route.js";

const router = Router();

router.use("/todos", todoRoutes);

export default router;
