import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

// Database connection
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'library_management',
  waitForConnections: true,
  // connectionLimit: 10,
  // queueLimit: 0
};

const db = await mysql.createConnection(dbConfig);
console.log('Connected to the MySQL database');

export default db;