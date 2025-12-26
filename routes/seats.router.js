import express from "express";
const router = express.Router();
import { getAllSeats, addSeats, deleteSeat, getAvailableSeats, seatAvailability } from "../controllers/seats.controller.js";



router.get("/getAllSeats", getAllSeats);
router.post("/addSeats", addSeats);
router.delete("/deleteSeat/:id", deleteSeat);

router.get("/getAvailableSeats", getAvailableSeats);  // delete this later (logic is not correct)


// Using db query
router.get("/seatAvailibility", seatAvailability);



export default router;