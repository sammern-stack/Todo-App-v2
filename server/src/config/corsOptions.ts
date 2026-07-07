import type { CorsOptions } from "cors";
import { CLIENT_URL } from "@/config/env.js";

export const corsOptions: CorsOptions = {
  origin: CLIENT_URL,
  credentials: true,
};
