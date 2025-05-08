import express from "express";
import {
  listActivities,
  bookActivity,
  getMyBookings,
} from "../controllers/activityController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/activities", listActivities);
router.post("/book", authMiddleware, bookActivity);
router.get("/my-bookings", authMiddleware, getMyBookings);

export default router;
