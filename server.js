// entry point for the Library Management System API
import express from 'express';
// import mysql from 'mysql2/promise';
// import bcrypt from 'bcrypt';
// import jwt from 'jsonwebtoken';
import cors from 'cors';
import authRouter from './routes/auth.router.js';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());


// test route
app.get('/test', (req, res) => {
  res.send('Welcome to the Library Management System API');
});

// Routes
app.use('/api/auth', authRouter);





// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;


// await connection.execute(`CREATE DATABASE IF NOT EXISTS library_management`);
// await connection.query('USE library_management');

// JWT middleware
// const authenticateToken = (req, res, next) => {
//   const authHeader = req.headers['authorization'];
//   const token = authHeader && authHeader.split(' ')[1];

//   if (!token) {
//     return res.status(401).json({ message: 'Access token required' });
//   }

//   jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key', (err, user) => {
//     if (err) {
//       return res.status(403).json({ message: 'Invalid token' });
//     }
//     req.user = user;
//     next();
//   });
// };

// // Admin middleware
// const requireAdmin = (req, res, next) => {
//   if (req.user.role !== 'admin') {
//     return res.status(403).json({ message: 'Admin access required' });
//   }
//   next();
// };

// // ============= AUTH ROUTES =============

// // Login
// app.post('/api/auth/login', async (req, res) => {
//   try {
//     const { email, password } = req.body;
    
//     const [users] = await pool.execute(
//       'SELECT * FROM users WHERE email = ?',
//       [email]
//     );

//     if (users.length === 0) {
//       return res.status(401).json({ message: 'Invalid credentials' });
//     }

//     const user = users[0];
//     const isValidPassword = await bcrypt.compare(password, user.password);

//     if (!isValidPassword) {
//       return res.status(401).json({ message: 'Invalid credentials' });
//     }

//     const token = jwt.sign(
//       { userId: user.id, email: user.email, role: user.role },
//       process.env.JWT_SECRET || 'your-secret-key',
//       { expiresIn: '24h' }
//     );

//     res.json({
//       token,
//       user: {
//         id: user.id,
//         name: user.name,
//         email: user.email,
//         role: user.role
//       }
//     });
//   } catch (error) {
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// });

// Register
// app.post('/api/auth/register', async (req, res) => {
//   try {
//     const { name, email, password, phone, role = 'user' } = req.body;
    
//     // Check if user already exists
//     const [existingUsers] = await connection.execute(
//       'SELECT * FROM users WHERE email = ?',
//       [email]
//     );

//     if (existingUsers.length > 0) {
//       return res.status(400).json({ message: 'User already exists' });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);
    
//     const [result] = await connection.execute(
//       'INSERT INTO users (name, email, password, phone, role, status, created_at) VALUES (?, ?, ?, ?, ?, ?, NOW())',
//       [name, email, hashedPassword, phone, role, 'active']
//     );

//     res.status(201).json({
//       message: 'User created successfully',
//       userId: result.insertId
//     });
//   } catch (error) {
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// });

// // ============= USER ROUTES =============


/**
 * @route   POST /api/admin/adduser
 * @desc    Admin route to add a new user to the system.
 * @fields  name (string), email (string), phone (string), status (string), joinDate (date), totalBookings (int), totalSpent (float), plan (string)
 * @returns 201 with userId if successful, 400 if user exists, 500 on server error.
 */
// app.post('/api/admin/adduser', async (req, res) => {
//   try {
//     const { name, email, phone, status, joinDate, totalBookings, totalSpent, plan } = req.body;
    
//     // Check if user already exists
//     const [existingUsers] = await connection.execute(
//       'SELECT * FROM users WHERE email = ?',
//       [email]
//     );

//     if (existingUsers.length > 0) {
//       return res.status(400).json({ message: 'User already exists' });
//     }

//     // If you want to set a password, you need to get it from req.body
//     // const hashedPassword = await bcrypt.hash(password, 10);

//     const [result] = await connection.execute(
//       'INSERT INTO users (name, email, phone, status, join_date, total_bookings, total_spent, plan, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW())',
//       [name, email, phone, status, joinDate, totalBookings, totalSpent, plan]
//     );

//     res.status(201).json({
//       message: 'User created successfully',
//       userId: result.insertId
//     });
//   } catch (error) {
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// });

// // Get all users (Admin only)
// // app.get('/api/users', authenticateToken, requireAdmin, async (req, res) => {
// app.get('/api/users', async (req, res) => {
//   try {
//     const { search, status } = req.query;
    
//     let query = `
//       SELECT u.*, 
//              COUNT(DISTINCT b.id) as total_bookings,
//              COALESCE(SUM(b.price), 0) as total_spent
//       FROM users u
//       LEFT JOIN bookings b ON u.id = b.user_id
//     `;
    
//     let params = [];
//     let conditions = [];

//     if (search) {
//       conditions.push('(u.name LIKE ? OR u.email LIKE ?)');
//       params.push(`%${search}%`, `%${search}%`);
//     }

//     if (status && status !== 'all') {
//       conditions.push('u.status = ?');
//       params.push(status);
//     }

//     if (conditions.length > 0) {
//       query += ' WHERE ' + conditions.join(' AND ');
//     }

//     query += ' GROUP BY u.id ORDER BY u.created_at DESC';

//     const [users] = await pool.execute(query, params);
    
//     res.json(users);
//   } catch (error) {
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// });

// // Get user by ID
// app.get('/api/users/:id', authenticateToken, async (req, res) => {
//   try {
//     const { id } = req.params;
    
//     const [users] = await pool.execute(
//       'SELECT * FROM users WHERE id = ?',
//       [id]
//     );

//     if (users.length === 0) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     res.json(users[0]);
//   } catch (error) {
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// });

// // Update user
// app.put('/api/users/:id', authenticateToken, requireAdmin, async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { name, email, phone, status } = req.body;
    
//     const [result] = await pool.execute(
//       'UPDATE users SET name = ?, email = ?, phone = ?, status = ? WHERE id = ?',
//       [name, email, phone, status, id]
//     );

//     if (result.affectedRows === 0) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     res.json({ message: 'User updated successfully' });
//   } catch (error) {
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// });

// // Delete user
// app.delete('/api/users/:id', authenticateToken, requireAdmin, async (req, res) => {
//   try {
//     const { id } = req.params;
    
//     const [result] = await pool.execute(
//       'DELETE FROM users WHERE id = ?',
//       [id]
//     );

//     if (result.affectedRows === 0) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     res.json({ message: 'User deleted successfully' });
//   } catch (error) {
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// });

// // ============= SEAT ROUTES =============

// // Get all seats
// app.get('/api/seats', authenticateToken, async (req, res) => {
//   try {
//     const [seats] = await pool.execute(`
//       SELECT s.*, 
//              CASE 
//                WHEN b.id IS NOT NULL AND b.status = 'active' THEN false 
//                ELSE true 
//              END as is_available,
//              b.user_id as current_user_id,
//              u.name as current_user_name
//       FROM seats s
//       LEFT JOIN bookings b ON s.id = b.seat_id AND b.status = 'active'
//       LEFT JOIN users u ON b.user_id = u.id
//       ORDER BY s.number
//     `);
    
//     res.json(seats);
//   } catch (error) {
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// });

// // Create seat
// app.post('/api/seats', authenticateToken, requireAdmin, async (req, res) => {
//   try {
//     const { number, type, description } = req.body;
    
//     const [result] = await pool.execute(
//       'INSERT INTO seats (number, type, description, created_at) VALUES (?, ?, ?, NOW())',
//       [number, type, description]
//     );

//     res.status(201).json({
//       message: 'Seat created successfully',
//       seatId: result.insertId
//     });
//   } catch (error) {
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// });

// // Update seat
// app.put('/api/seats/:id', authenticateToken, requireAdmin, async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { number, type, description } = req.body;
    
//     const [result] = await pool.execute(
//       'UPDATE seats SET number = ?, type = ?, description = ? WHERE id = ?',
//       [number, type, description, id]
//     );

//     if (result.affectedRows === 0) {
//       return res.status(404).json({ message: 'Seat not found' });
//     }

//     res.json({ message: 'Seat updated successfully' });
//   } catch (error) {
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// });

// // Delete seat
// app.delete('/api/seats/:id', authenticateToken, requireAdmin, async (req, res) => {
//   try {
//     const { id } = req.params;
    
//     const [result] = await pool.execute(
//       'DELETE FROM seats WHERE id = ?',
//       [id]
//     );

//     if (result.affectedRows === 0) {
//       return res.status(404).json({ message: 'Seat not found' });
//     }

//     res.json({ message: 'Seat deleted successfully' });
//   } catch (error) {
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// });

// // ============= BOOKING ROUTES =============

// // Get all bookings
// app.get('/api/bookings', authenticateToken, async (req, res) => {
//   try {
//     const { status, userId } = req.query;
    
//     let query = `
//       SELECT b.*, u.name as user_name, u.email as user_email, s.number as seat_number
//       FROM bookings b
//       JOIN users u ON b.user_id = u.id
//       JOIN seats s ON b.seat_id = s.id
//     `;
    
//     let params = [];
//     let conditions = [];

//     if (status && status !== 'all') {
//       conditions.push('b.status = ?');
//       params.push(status);
//     }

//     if (userId) {
//       conditions.push('b.user_id = ?');
//       params.push(userId);
//     }

//     if (conditions.length > 0) {
//       query += ' WHERE ' + conditions.join(' AND ');
//     }

//     query += ' ORDER BY b.created_at DESC';

//     const [bookings] = await pool.execute(query, params);
    
//     res.json(bookings);
//   } catch (error) {
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// });

// // Create booking
// app.post('/api/bookings', authenticateToken, async (req, res) => {
//   try {
//     const { seat_id, date, start_time, end_time, plan, price } = req.body;
//     const user_id = req.user.userId;
    
//     // Check if seat is available
//     const [existingBookings] = await pool.execute(
//       'SELECT * FROM bookings WHERE seat_id = ? AND date = ? AND status = "active"',
//       [seat_id, date]
//     );

//     if (existingBookings.length > 0) {
//       return res.status(400).json({ message: 'Seat is already booked for this date' });
//     }

//     const [result] = await pool.execute(
//       'INSERT INTO bookings (user_id, seat_id, date, start_time, end_time, plan, price, status, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW())',
//       [user_id, seat_id, date, start_time, end_time, plan, price, 'active']
//     );

//     res.status(201).json({
//       message: 'Booking created successfully',
//       bookingId: result.insertId
//     });
//   } catch (error) {
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// });

// // Update booking
// app.put('/api/bookings/:id', authenticateToken, async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { status } = req.body;
    
//     const [result] = await pool.execute(
//       'UPDATE bookings SET status = ? WHERE id = ?',
//       [status, id]
//     );

//     if (result.affectedRows === 0) {
//       return res.status(404).json({ message: 'Booking not found' });
//     }

//     res.json({ message: 'Booking updated successfully' });
//   } catch (error) {
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// });

// // Cancel booking
// app.delete('/api/bookings/:id', authenticateToken, async (req, res) => {
//   try {
//     const { id } = req.params;
    
//     const [result] = await pool.execute(
//       'UPDATE bookings SET status = "cancelled" WHERE id = ?',
//       [id]
//     );

//     if (result.affectedRows === 0) {
//       return res.status(404).json({ message: 'Booking not found' });
//     }

//     res.json({ message: 'Booking cancelled successfully' });
//   } catch (error) {
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// });

// // ============= ANALYTICS ROUTES =============

// // Get dashboard stats
// app.get('/api/analytics/dashboard', authenticateToken, requireAdmin, async (req, res) => {
//   try {
//     // Total users
//     const [userCount] = await pool.execute('SELECT COUNT(*) as count FROM users');
    
//     // Active bookings
//     const [activeBookings] = await pool.execute('SELECT COUNT(*) as count FROM bookings WHERE status = "active"');
    
//     // Total revenue
//     const [revenue] = await pool.execute('SELECT SUM(price) as total FROM bookings WHERE status IN ("active", "completed")');
    
//     // Occupancy rate
//     const [totalSeats] = await pool.execute('SELECT COUNT(*) as count FROM seats');
//     const occupancyRate = Math.round((activeBookings[0].count / totalSeats[0].count) * 100);
    
//     // Recent bookings
//     const [recentBookings] = await pool.execute(`
//       SELECT b.*, u.name as user_name, s.number as seat_number
//       FROM bookings b
//       JOIN users u ON b.user_id = u.id
//       JOIN seats s ON b.seat_id = s.id
//       ORDER BY b.created_at DESC
//       LIMIT 5
//     `);

//     res.json({
//       totalUsers: userCount[0].count,
//       activeBookings: activeBookings[0].count,
//       totalRevenue: revenue[0].total || 0,
//       occupancyRate,
//       recentBookings
//     });
//   } catch (error) {
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// });

// Get revenue analytics
// app.get('/api/analytics/revenue', authenticateToken, requireAdmin, async (req, res) => {
//   try {
//     const [dailyRevenue] = await pool.execute(`
//       SELECT DATE(created_at) as date, SUM(price) as revenue
//       FROM bookings
//       WHERE status IN ('active', 'completed')
//       AND created_at >= DATE_SUB(NOW(), INTERVAL 30 DAY)
//       GROUP BY DATE(created_at)
//       ORDER BY date
//     `);

//     const [monthlyRevenue] = await pool.execute(`
//       SELECT YEAR(created_at) as year, MONTH(created_at) as month, SUM(price) as revenue
//       FROM bookings
//       WHERE status IN ('active', 'completed')
//       AND created_at >= DATE_SUB(NOW(), INTERVAL 12 MONTH)
//       GROUP BY YEAR(created_at), MONTH(created_at)
//       ORDER BY year, month
//     `);

//     res.json({
//       dailyRevenue,
//       monthlyRevenue
//     });
//   } catch (error) {
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// });

// ============= SETTINGS ROUTES =============

// Get system settings
// app.get('/api/settings', authenticateToken, requireAdmin, async (req, res) => {
//   try {
//     const [settings] = await pool.execute('SELECT * FROM settings');
    
//     // Convert settings array to object
//     const settingsObj = {};
//     settings.forEach(setting => {
//       settingsObj[setting.key] = setting.value;
//     });

//     res.json(settingsObj);
//   } catch (error) {
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// });

// Update system settings
// app.put('/api/settings', authenticateToken, requireAdmin, async (req, res) => {
//   try {
//     const settings = req.body;
    
//     for (const [key, value] of Object.entries(settings)) {
//       await pool.execute(
//         'INSERT INTO settings (key, value) VALUES (?, ?) ON DUPLICATE KEY UPDATE value = ?',
//         [key, JSON.stringify(value), JSON.stringify(value)]
//       );
//     }

//     res.json({ message: 'Settings updated successfully' });
//   } catch (error) {
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// });

// ============= ERROR HANDLING =============

// 404 handler
// app.use('*', (req, res) => {
//   res.status(404).json({ message: 'Route not found' });
// });

// // Global error handler
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).json({ message: 'Something went wrong!' });
// });

