import mongoose from "mongoose";

const seatSchema = new mongoose.Schema({
  number: {
    type: String,
    required: [true, 'Seat number is required'],
    unique: true,
    trim: true,
    maxlength: [10, 'Seat number cannot exceed 10 characters'],
    // validate: {
    //   validator: function(v) {
    //     // Custom validation for seat number format (e.g., A1, B12, etc.)
    //     return /^[A-Z]\d{1,2}$|^\d{1,3}[A-Z]?$/.test(v);
    //   },
    //   message: 'Seat number must be in valid format (e.g., A1, B12, 101A)'
    // }
  },
  type: {
    type: String,
    enum: {
      values: ['regular', 'premium', 'window', 'corner'],
      message: 'Seat type must be regular, premium, window, or corner'
    },
    default: 'regular'
  },
  description: {
    type: String,
    trim: true,
    maxlength: [1000, 'Description cannot exceed 1000 characters']
  },
  isAvailable: {
    type: Boolean,
    default: true
  },
}, {
  timestamps: true, // Creates createdAt and updatedAt automatically
});

const Seat = new mongoose.model('Seat', seatSchema);
export default Seat;
