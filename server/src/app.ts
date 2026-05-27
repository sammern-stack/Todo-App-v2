//—————————————————————————————————————————————————————————————————
// Imports
//—————————————————————————————————————————————————————————————————

import express from "express";
import { errorHandler } from "./middleware/errorHandler.js";

// Initialize Express app
const app = express();

//—————————————————————————————————————————————————————————————————
// Middleware
//—————————————————————————————————————————————————————————————————

app.use(express.json());

//—————————————————————————————————————————————————————————————————
// Routes
//—————————————————————————————————————————————————————————————————

// routes will go here

// Handle errors here
// Always last so it catches all errors
app.use(errorHandler);

export default app;
