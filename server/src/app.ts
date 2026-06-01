//—————————————————————————————————————————————————————————————————
// Imports
//—————————————————————————————————————————————————————————————————

import express from "express";
import cors from "cors";
import { errorHandler } from "./middleware/errorHandler.js";
import { config } from "./config/env.js";
import todoRouters from "./routes/todo.route.js";

// Initialize Express app
const app = express();

//—————————————————————————————————————————————————————————————————
// Middleware
//—————————————————————————————————————————————————————————————————

app.use(
  cors({
    origin: config.clientUrl,
    credentials: true,
  }),
);
app.use(express.json());

//—————————————————————————————————————————————————————————————————
// Routes
//—————————————————————————————————————————————————————————————————

app.use("/api/todos", todoRouters);

// Handle errors here
// Always last so it catches all errors
app.use(errorHandler);

export default app;
