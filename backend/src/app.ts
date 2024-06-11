import express from "express";
import { config } from "dotenv";
import CookieParser from "cookie-parser";
import cors from "cors";

// configuring env for app
config({
  path: "./.env",
});

//accessing environment variables for app
const PORT = process.env.PORT || 4000;
const MONGO_URI = process.env.MONGO_URI || "";

//Mongodb connection function
connectToMongoDB(MONGO_URI);

//Initializing express app
const app = express();

//configuriing CORS for api
const corsOptions = {
  origin: "http://localhost:4200",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allwedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

app.use(cors(corsOptions));

/**
 * middlewares
 */
app.use(express.json());
app.use(CookieParser());

/**
 * Routes
 */
import userRoutes from "./routes/userRoutes.js";
import { RouteStrings } from "./utils/constants/routeStrings.js";

app.use(RouteStrings.USER_BASE, userRoutes);

//Error handling Middleware
import { errorMiddleware } from "./middlewares/errorMiddlewares.js";
import { connectToMongoDB } from "./utils/connectDatabase.js";
import { METHODS } from "http";
app.use(errorMiddleware);

// listen function for server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
