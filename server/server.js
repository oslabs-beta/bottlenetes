import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import process from "node:process";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "node:url";

import { connectDB } from "./db/db.js";
import sequelize from "./db/db.js";
import userController from "./controllers/userController.js";

// Config path for usability in ES Module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Import Routers
import signupRouter from "./routes/signupRouter.js";
import signinRouter from "./routes/signinRouter.js";
import apiRouter from "./routes/apiRouter.js";

// Allow the use of process.env
dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// CORS stuffs
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:3000"], //Front-end PORT
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, // Important for cookies/session
  }),
);

// app.use((req, res, next) => {
//   console.log('allowing cors');
//   res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
//   res.setHeader(
//     'Access-Control-Allow-Methods',
//     'GET, POST, PUT, DELETE, OPTIONS'
//   );
//   res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//   res.setHeader('Access-Control-Allow-Credentials', 'true');
//   return next();
// });

app.use((req, res, next) => {
  const allowedOrigins = ['http://localhost:3000', 'http://localhost:5173'];
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }
  return next();
});

// Connect to PORT 3000
const PORT = 3000;
const server = app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`),
);

// Connect to DB
connectDB();

app.get("/oauth/github", (_req, res) => {
  const githubUrl = `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&redirect_uri=${process.env.GITHUB_CALLBACK_URL}`;
  return res.redirect(302, githubUrl);
});


// Routers
app.use("/signin", signinRouter);
app.use("/signup", signupRouter);
app.use("/api", apiRouter);

// Serves static files
app.use(express.static(path.resolve(__dirname, "../index.html")));
app.use(express.static(path.resolve(__dirname, "../signup.html")));
app.use(express.static(path.resolve(__dirname, "./")));
app.use(express.static(path.resolve(__dirname, "../src/")));

app.get("/", (_req, res) => {
  return res.status(200).sendFile(path.resolve(__dirname, "../index.html"));
});

app.get("/dashboard", userController.verifySignedIn, (req, res) => {
  return res.status(200).json(`Welcome to your dashboard, ${req.user.userId}`);
});

// Catch All Route
app.use("*", (_req, res) => {
  return res.sendStatus(404);
});

// Global Error Handler
app.use((err, _req, res, _next) => {
  const defaultErr = {
    log: "Express error handler caught unknown middleware error",
    status: 500,
    message: { err: "An error occurred" },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);

  return res.status(errorObj.status).json(errorObj.message);
});

// Gracefullt shut down when exiting the app
const gracefulShutDown = async () => {
  try {
    console.log("👂 Received Shut Down Signal. Gracefully Shutting Down...");
    await sequelize.close();
    console.log("📉 Database connection is closed!");
    server.close(() => {
      console.log(`💃🏻 Server has been shutted down gracefully!`);
      process.exitCode = 0;
    });
  } catch (error) {
    console.error(
      `😭 Unable to gracefully shut down the server. Force exiting... - ${error}`,
    );
    process.exitCode = 1;
  }
};

// Shutdown signals
process.on("SIGINT", gracefulShutDown);
process.on("SIGTERM", gracefulShutDown);
