import express from "express";

import { authorizeRoles, isAuthenticated } from "./../middleware/auth";
import {
  createOrder,
  getAllOrdersByAdmin,
} from "../controllers/order.controller";

const orderRouter = express.Router();

orderRouter.post("/create-order", isAuthenticated, createOrder);
orderRouter.get(
  "/get-orders",
  isAuthenticated,
  authorizeRoles("admin"),
  getAllOrdersByAdmin
);

export default orderRouter;
