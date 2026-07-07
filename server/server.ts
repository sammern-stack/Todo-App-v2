import "dotenv/config";
import app from "@/app.js";
import { connectDB } from "@/config/db.js";
import { config } from "@/config/env.js";

const PORT = config.port || 3000;

const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
};

startServer();
