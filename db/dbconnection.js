import mongoose from 'mongoose';

// Connect to MongoDB
export default async function connectToDatabase() {
    await mongoose.connect(process.env.MONGO_URI)
        .then(() => console.log('MongoDB connected successfully'))
        .catch(err => console.error('MongoDB connection error:', err));
}

