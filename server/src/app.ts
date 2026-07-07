// ——— Imports —————————————————————————————————————————————————————————————————————————————————————
import express from "express";
import cors from "cors";

import apiRouters from "@/routes/api.route.js";
import authRoutes from "@/routes/auth.route.js";

import { errorHandler } from "@/shared/middleware/errorHandler.js";
import { corsOptions } from "@/config/corsOptions.js";

const app = express();

// ——— Middleware ——————————————————————————————————————————————————————————————————————————————————
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ——— Routes ——————————————————————————————————————————————————————————————————————————————————————
app.use("/api", apiRouters);
app.use("/auth", authRoutes);

app.use(errorHandler);

export default app;
