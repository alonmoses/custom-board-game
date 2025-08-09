import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import generateRouter from "./routes/generate.js";

// Load environment variables from .env file
dotenv.config();

// Create an Express application
const app = express();

// Middleware setup
app.use(cors());
app.use(bodyParser.json());

// Register the API route that will handle game generation
app.use("/api/generate", generateRouter);

// Define the port to run the server on
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
