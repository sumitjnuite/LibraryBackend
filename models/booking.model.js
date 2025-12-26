import mongoose from "mongoose";
import Seat from "./seat.model.js";
import User from "./user.model.js";

// Booking Schema
const bookingSchema = new mongoose.Schema({
    //   bookingId: {
    //     type: String,
    //     unique: true,
    //     required: true
    //   },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User is required'],
        index: true
    },
    // userEmail: {
    //     type: String,
    //     required: true
    // },
    userName: {
        type: String,
        required: true
    },
    seatId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Seat',
        required: [true, 'Seat is required']
    },
    seatNumber: {
        type: String,
        required: true
    },
    bookingDate: {
        type: Date,
        required: [true, 'Booking date is required'],
    },
    // slotId: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Slot',
    //     required: [true, 'Slot is required']
    // },
    slot: {
        type: String,
        enum: ['SLOT1', 'SLOT2', 'SLOT3'],
        required: [true, 'Slot is required']
    },
    // startTime: {
    //     type: String,
    //     required: [true, 'Start time is required'],
    //     match: [/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Invalid time format']
    // },
    // endTime: {
    //     type: String,
    //     required: [true, 'End time is required'],
    //     match: [/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Invalid time format']
    // },
    // expiresAt: {
    //     type: Date,
    //     required: [true, 'Expiry date is required'],
    //     index: true
    // },
    // isExpired: {
    //     type: Boolean,
    //     default: false
    // },
    plan: {
        type: String,
        enum: ['daily', 'weekly', 'monthly', 'yearly'],
        required: [true, 'Plan is required']
    },
    // duration: {
    //     value: {
    //         type: Number,
    //         required: true
    //     },
    //     unit: {
    //         type: String,
    //         enum: ['hours', 'days', 'weeks', 'months'],
    //         required: true
    //     }
    // },
    // price: {
    //     basePrice: {
    //         type: Number,
    //         required: true,
    //         min: 0
    //     },
    //     discount: {
    //         type: Number,
    //         default: 0,
    //         min: 0
    //     },
    //     // tax: {
    //     //   type: Number,
    //     //   default: 0,
    //     //   min: 0
    //     // },
    //     finalPrice: {
    //         type: Number,
    //         required: true,
    //         min: 0
    //     }
    // },
    planPrice: {
        type: Number,
        required: [true, 'Plan price is required'],
        min: 0
    },
    status: {
        type: String,
        enum: ['pending', 'active', 'completed', 'cancelled', 'expired'],
        default: 'pending'
    },
    // paymentStatus: {
    //     type: String,
    //     enum: ['pending', 'paid', 'failed', 'refunded'],
    //     default: 'pending'
    // },
    // paymentMethod: {
    //     type: String,
    //     enum: ['cash', 'card', 'upi', 'netbanking', 'wallet'],
    //     default: null
    // },
    // paymentId: {
    //     type: String,
    //     default: null
    // },
    // checkIn: {
    //     time: {
    //         type: Date,
    //         default: null
    //     },
    //     verified: {
    //         type: Boolean,
    //         default: false
    //     }
    // },
    // checkOut: {
    //     time: {
    //         type: Date,
    //         default: null
    //     },
    //     verified: {
    //         type: Boolean,
    //         default: false
    //     }
    // },
    //   notes: {
    //     type: String,
    //     maxlength: [500, 'Notes cannot exceed 500 characters']
    //   },
    //   cancelledBy: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'User',
    //     default: null
    //   },
    //   cancellationReason: {
    //     type: String,
    //     maxlength: [500, 'Cancellation reason cannot exceed 500 characters']
    //   },
    //   cancellationDate: {
    //     type: Date,
    //     default: null
    //   },
    // createdBy: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'AdminUser',
    //     required: true
    // },
    // modifiedBy: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'AdminUser',
    //     default: null
    // }
}, {
    timestamps: true
});

const Booking = mongoose.model('Booking', bookingSchema);
export default Booking;