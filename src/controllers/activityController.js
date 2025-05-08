import Activity from "../models/Activity.js";
import Booking from "../models/Booking.js";

export const listActivities = async (req, res) => {
  try {
    const activities = await Activity.find();
    res.json(activities);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const bookActivity = async (req, res) => {
  const { activityId } = req.body;

  try {
    const activity = await Activity.findById(activityId);
    if (!activity)
      return res.status(404).json({ message: "Activity not found" });

    const booking = new Booking({ user: req.user.id, activity: activityId });
    await booking.save();

    res.status(201).json({ message: "Activity booked successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id }).populate(
      "activity"
    );
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
