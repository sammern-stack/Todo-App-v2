//—————————————————————————————————————————————————————————————————
// Imports
//—————————————————————————————————————————————————————————————————

import express from "express";
import { errorHandler } from "./middleware/errorHandler.js";
import todoRouters from "./routes/todo.route.js";

// Initialize Express app
const app = express();

//—————————————————————————————————————————————————————————————————
// Middleware
//—————————————————————————————————————————————————————————————————

app.use(express.json());

//—————————————————————————————————————————————————————————————————
// Routes
//—————————————————————————————————————————————————————————————————

app.use("/api/todos", todoRouters);

// Handle errors here
// Always last so it catches all errors
app.use(errorHandler);

export default app;
