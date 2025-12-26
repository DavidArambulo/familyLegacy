import express, { Application } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRoutes from "./routes/user.routes"
import knowledgeRoutes from "./routes/knowledge.routes"
import { errorHandler } from "./middlewares/error.middleware";

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || "";


mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

app.use(express.json())

app.use('/api/users', userRoutes)
app.use('/api/knowledge', knowledgeRoutes)

app.get("/", (req, res) => {
  res.send("Family Legacy Server is running");
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
