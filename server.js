// entry point for the Library Management System API
import express from 'express';
import userAuthRouter from './routes/userauth.router.js';
import adminAuthRouter from './routes/adminauth.router.js';
import seatsRouter from './routes/seats.router.js';
import usersRouter from './routes/users.router.js';
import bookingsRouter from './routes/bookings.router.js';
import librarysettingsRouter from './routes/librarysettings.router.js';
import { authMiddleware } from './middlewares/auth.middleware.js';
// import mongoconnect from './db/dbconnection.js'; // mongodb connection
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import AdminUser from './models/adminUser.model.js';
import connectToDatabase from './db/dbconnection.js';
dotenv.config();

import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./swagger-output.json" with { type: "json" };
import { initializeSlots } from './models/slot.model.js';



const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());

// Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// test route
// app.get('/test', (req, res) => {
//   res.send('Welcome to the Library Management System API');
// });


// INITIALISATION 
initializeSlots(); // create slots if not present



// admin route
// await AdminUser.insertOne({email:"admin@gmail.com",password:"admin1234"});
app.use('/api/v1/adminauth', adminAuthRouter);


// Routes
app.use('/api/v1/userauth', userAuthRouter);

// protected routes
app.use('/api/v1/seats', seatsRouter);
app.use('/api/v1/users', usersRouter);
// app.use('/api/book-seats', authMiddleware, (req, res) => {
//   console.log(req.user)
//   res.send('This is a protected route for booking seats');
// });
app.use('/api/v1/bookings', bookingsRouter);


app.use('/api/v1/librarysettings', librarysettingsRouter);


// Start server
app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);

  await connectToDatabase(); // database connection
  console.log(`Swagger Docs 👉 http://localhost:${PORT}/api-docs`);
});

export default app;