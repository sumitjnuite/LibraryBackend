import express from "express";
const librarysettingsRouter = express.Router();
// import { getAllBookings, allotSeat } from "../controllers/booking.controller.js";



// librarysettingsRouter.get("/", getAllBookings); // get all the bookings
librarysettingsRouter.get("/:id", (req, res) => { res.send({ title: "Get booking with ID" }) });

// librarysettingsRouter.post("/", allotSeat); //Create booking
librarysettingsRouter.put("/:id", (req, res) => { res.send({ title: "Update booking with ID" }) });
librarysettingsRouter.delete("/:id", (req, res) => { res.send({ title: "Delete booking with ID" }) });


// librarysettingsRouter.get("/user/:id", (req, res) => { res.send({ title: "Get all booking of a user" }) });
// librarysettingsRouter.put("/:id/cancel", (req, res) => { res.send({ title: "cancel a booking" }) });

// librarysettingsRouter.get("/upcoming-renewals", (req, res) => { res.send({ title: "Get upcoming renewels" }) });




export default librarysettingsRouter;