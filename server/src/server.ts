import "dotenv/config";
import app from "./app.js";
import { config } from "./config/env.js";

const start = async () => {
  app.listen(config.port, () => {
    console.log(`Server is listening on port ${config.port}`);
  });
};

start();
