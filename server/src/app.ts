// ——— Imports —————————————————————————————————————————————————————————————————————————————————————
import express from "express";
import cors from "cors";
import { errorHandler } from "./middleware/errorHandler.js";
import { corsOptions } from "./config/corsOptions.js";
import todoRouters from "./routes/todo.route.js";

const app = express();

// ——— Middleware ——————————————————————————————————————————————————————————————————————————————————
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ——— Routes ——————————————————————————————————————————————————————————————————————————————————————
app.use("/api/todos", todoRouters);

app.use(errorHandler);

export default app;
