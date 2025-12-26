import express from "express";
const bookingsRouter = express.Router();
import { getAllBookings, allotSeat } from "../controllers/booking.controller.js";



bookingsRouter.get("/", getAllBookings); // get all the bookings
bookingsRouter.get("/:id", (req, res) => { res.send({ title: "Get booking with ID" }) });

bookingsRouter.post("/allotSeat", allotSeat); //Create booking
bookingsRouter.put("/:id", (req, res) => { res.send({ title: "Update booking with ID" }) });
bookingsRouter.delete("/:id", (req, res) => { res.send({ title: "Delete booking with ID" }) });


bookingsRouter.get("/user/:id", (req, res) => { res.send({ title: "Get all booking of a user" }) });
// bookingsRouter.put("/:id/cancel", (req, res) => { res.send({ title: "cancel a booking" }) });

bookingsRouter.get("/upcoming-renewals", (req, res) => { res.send({ title: "Get upcoming renewels" }) });




export default bookingsRouter;