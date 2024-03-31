import dotenv from "dotenv";
import connectDB from "./config/db.js";
import app from "./app.js";
import allRoutes from "./routes/allRoutes/allRoutes.js";

dotenv.config({
  path: "./.env",
});
const PORT = process.env.PORT || 5000;

connectDB()
  .then(() => {
    allRoutes();
    app.listen(PORT, async () => {
      console.log(`The server is running on port ${PORT}`);
    });
  })
  .catch(() => {
    console.log("Database Connection Failed!");
  });
