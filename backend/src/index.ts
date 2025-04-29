import dotenv from "dotenv";
import { app } from "./app";
import { connectDatabase } from "./config/db"
// import { createDefaultEmailTemplate } from "./utils/helpers";
dotenv.config(); // Load env variables

// verifying db connection
connectDatabase();


function init() {
  const PORT = process.env.PORT;
  app.listen(PORT, () => {
    console.log(`server running at http://localhost:${PORT}`);
  });
}

init();