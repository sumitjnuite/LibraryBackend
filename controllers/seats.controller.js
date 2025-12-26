import jwt from 'jsonwebtoken';
import Seat from '../models/seat.model.js';


// loginUser function to handle user login
export const getAllSeats = async (req, res) => {
    // #swagger.tags = ['Seats']
    try {
        const seats = await Seat.find({});

        if (!seats) {
            return res.status(401).json({ message: 'Zero Seats.' });
        }

        res.status(201).json({
            seats,
            message: 'Admin user Logged in SUCCESSFULLY'
        });

    }
    catch (error) {
        console.error('Error getting seats info:', error);
        return res.status(500).send('Internal Server Error During Getting Seats Info');
    }
}

export const addSeats = async (req, res) => {
    // #swagger.tags = ['Seats']
    try {
        const data = req.body;

        const newSeat = new Seat(data);
        await newSeat.save();

        res.status(201).json({
            newSeat,
            message: 'Seat Added Successfully'
        });
    }
    catch (error) {
        console.error('Error during seat addition:', error);
        return res.status(500).send('Internal Server Error During Seat Addition');
    }
}

export const deleteSeat = async (req, res) => {
    // #swagger.tags = ['Seats']
    try {
        const {id} = req.params;
        await Seat.findByIdAndDelete(id);
        res.status(201).json({
            message: 'Seat Deleted SUCCESSFULLY'
        });
    }
    catch (error) {
        console.error('Error during seat deletion:', error);
        return res.status(500).send('Internal Server Error During Seat Deletion');
    }
}

export const getAvailableSeats = async (req, res) => {
    // #swagger.tags = ['Seats']
    try {
        const seats = await Seat.find({ isAvailable: true });

        if (!seats) {
            return res.status(401).json({ message: 'Zero Available Seats.' });
        }

        res.status(201).json({
            seats,
            message: 'Available Seats fetched SUCCESSFULLY'
        });

    }
    catch (error) {
        console.error('Error getting available seats info:', error);
        return res.status(500).send('Internal Server Error During Getting Available Seats Info');
    }
}



// query and join to get available seats
export const seatAvailability = async (req, res) => {
    // #swagger.tags = ['Seats']
    try{
        // Join Seat and Slot (seatId + slotId is unique)
        


    }
    catch (error) {
        console.error('Error getting seat availability info:', error);
        return res.status(500).send('Internal Server Error During Getting Seat Availability Info');
    }
}