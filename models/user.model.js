import mongoose from 'mongoose';
// import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    minlength: [2, 'Name must be at least 2 characters'],
    maxlength: [50, 'Name cannot exceed 50 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    trim: true,
    lowercase: true,
    maxlength: [255, 'Email cannot exceed 255 characters'],
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters'],
    maxlength: [255, 'Password cannot exceed 255 characters'],
    select: false // Don't include password in queries by default
  },
  phone: {
    type: String,
    trim: true,
    maxlength: [10, 'Phone number cannot exceed 10 characters'],
    match: [/^\+?[1-9]\d{1,14}$/, 'Please enter a valid phone number']
  },

  status: {
    type: String,
    enum: {
      values: ['active', 'inactive', 'suspended'],
      message: 'Status must be active, inactive, or suspended'
    },
    default: 'active'
  },
  totalSpent: {
    type: Number,
    min: [0, 'Total spent cannot be negative'],
    default: 0
  },
  
  //   role: {
//     type: String,
//     enum: {
//       values: ['admin', 'user'],
//       message: 'Role must be either admin or user'
//     },
//     default: 'user'
//   },

}, {
  timestamps: true, // This creates createdAt and updatedAt automatically
});

const User =  mongoose.model("User", userSchema);

export default User;
