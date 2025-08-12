/**
 * This file sets up a simple Express web server for our board game API.
 * It loads environment variables, creates an Express app, attaches
 * middleware for CORS and JSON parsing, mounts our game generator route
 * on /api/generate, chooses a port, and starts listening for requests.
 */
// Import dependencies: Express to create the server, CORS to allow cross-origin requests,
// bodyParser to parse JSON bodies, dotenv to load env variables, and generateRouter for our API route.
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
// Load environment variables from the .env file into process.env

  
dotenv.config();

// Create an Express application instance (our HTTP server)
const app = express();

// Middleware setup: enable CORS for cross-origin requests and JSON parsing for request bodies
app.use(cors());
app.use(bodyParser.json());

// Register the API route that will handle game generation.
// All endpoints defined in generateRouter will be prefixed with /api/generate

app.use("/api/generate", generateRouter);

// Define the port to run the server on: use PORT from environment or default to 5000
const PORT = process.env.PORT || 5000;

// Start the server: begin listening on the specified port and log a message
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
