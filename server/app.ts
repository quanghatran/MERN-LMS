require("dotenv").config();
import cookieParser from "cookie-parser";
import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import { ErrorMiddleware } from "./middleware/error";
import {
  analyticsRouter,
  courseRouter,
  notificationRouter,
  orderRouter,
  userRouter,
} from "./routes";
export const app = express();

// body parser
app.use(express.json({ limit: "500mb" }));

// cookie parser
app.use(cookieParser());

// cors => cors origin resource sharing
app.use(
  cors({
    origin: process.env.ORIGIN,
  })
);

// routes
app.use(
  "/api/v1",
  userRouter,
  courseRouter,
  orderRouter,
  notificationRouter,
  analyticsRouter
);

// testing api
app.get("/test", (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({
    success: true,
    message: "API is working!",
  });
});

// unknown route
app.all("*", (req: Request, res: Response, next: NextFunction) => {
  const err = new Error(`Route ${req.originalUrl} not found}`) as any;
  err.status = 404;
  next(err);
});

app.use(ErrorMiddleware);
