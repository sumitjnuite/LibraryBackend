import Booking from '../models/booking.model.js';
import User from '../models/user.model.js';

export const getAllBookings = async (req, res) => {
    // #swagger.tags = ['Bookings']
    try {
        const bookings = await Booking.find();

        if (!bookings) {
            return res.status(401).json({ message: 'Zero Bookings.' });
        }

        res.status(201).json({
            bookings,
            message: 'Bookings fetched SUCCESSFULLY'
        });

    }
    catch (error) {
        console.error('Error getting bookings info:', error);
        return res.status(500).send('Internal Server Error During Getting Bookings Info');
    }
}

export const allotSeat = async (req, res) => {
    // #swagger.tags = ['Bookings']
    try {
        const data = req.body;
        console.log("booking data-->", req.body);

        const newBooking = new Booking(data);
        await newBooking.save();

        res.status(201).json({
            newBooking,
            message: 'Seat Allotted Successfully'
        });
    }
    catch (error) {
        console.error('Error during seat allotment:', error);
        return res.status(500).send('Internal Server Error During Seat Allotment');
    }
}

// export const allotSeat = async (req, res) => {
//     try {
//         const data = req.body;

//         const newBooking = new Booking(data);
//         await newBooking.save();

//         // Update user's booking history
//         const user = await User.findById(data.userId);
//         // if (user) {
//         //     user.bookingHistory.push(newBooking._id);
//         //     await user.save();
//         // }


//         res.status(201).json({
//             newBooking,
//             message: 'Seat Allotted Successfully'
//         });
//     }
//     catch (error) {
//         console.error('Error during seat allotment:', error);
//         return res.status(500).send('Internal Server Error During Seat Allotment');
//     }
// }