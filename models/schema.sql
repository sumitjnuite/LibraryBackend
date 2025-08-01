-- database.sql
-- Create database
CREATE DATABASE IF NOT EXISTS library_management;
USE library_management;

-- Users table
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    role ENUM('admin', 'user') DEFAULT 'user',
    status ENUM('active', 'inactive', 'suspended') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Seats table
CREATE TABLE seats (
    id INT AUTO_INCREMENT PRIMARY KEY,
    number VARCHAR(10) UNIQUE NOT NULL,
    type ENUM('regular', 'premium', 'window', 'corner') DEFAULT 'regular',
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Bookings table
CREATE TABLE bookings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    seat_id INT NOT NULL,
    date DATE NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    plan ENUM('hourly', 'daily', 'monthly') NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    status ENUM('active', 'completed', 'cancelled') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (seat_id) REFERENCES seats(id) ON DELETE CASCADE,
    INDEX idx_user_id (user_id),
    INDEX idx_seat_id (seat_id),
    INDEX idx_date (date),
    INDEX idx_status (status)
);

-- Settings table
CREATE TABLE settings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    `key` VARCHAR(255) UNIQUE NOT NULL,
    value TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert default admin user (password: admin123)
INSERT INTO users (name, email, password, role, status) VALUES
('Admin', 'admin@library.com', '$2b$10$rOcqzhOlN8vVZqYJlhxw3.8qH3K9nL7OWLkpEjYNJ5fCdHQz9LnFW', 'admin', 'active');

-- Insert sample seats
INSERT INTO seats (number, type, description) VALUES
('A1', 'regular', 'Regular seat near entrance'),
('A2', 'regular', 'Regular seat near entrance'),
('A3', 'window', 'Window seat with natural light'),
('A4', 'window', 'Window seat with natural light'),
('B1', 'premium', 'Premium seat with power outlet'),
('B2', 'premium', 'Premium seat with power outlet'),
('B3', 'corner', 'Corner seat for privacy'),
('B4', 'corner', 'Corner seat for privacy'),
('C1', 'regular', 'Regular seat in middle section'),
('C2', 'regular', 'Regular seat in middle section'),
('C3', 'window', 'Window seat with city view'),
('C4', 'window', 'Window seat with city view'),
('D1', 'premium', 'Premium seat with extra space'),
('D2', 'premium', 'Premium seat with extra space'),
('D3', 'regular', 'Regular seat near study area'),
('D4', 'regular', 'Regular seat near study area');

-- Insert sample users
INSERT INTO users (name, email, password, phone, role, status) VALUES
('John Doe', 'john@example.com', '$2b$10$rOcqzhOlN8vVZqYJlhxw3.8qH3K9nL7OWLkpEjYNJ5fCdHQz9LnFW', '+91 9876543210', 'user', 'active'),
('Jane Smith', 'jane@example.com', '$2b$10$rOcqzhOlN8vVZqYJlhxw3.8qH3K9nL7OWLkpEjYNJ5fCdHQz9LnFW', '+91 9876543211', 'user', 'active'),
('Mike Johnson', 'mike@example.com', '$2b$10$rOcqzhOlN8vVZqYJlhxw3.8qH3K9nL7OWLkpEjYNJ5fCdHQz9LnFW', '+91 9876543212', 'user', 'suspended'),
('Sarah Wilson', 'sarah@example.com', '$2b$10$rOcqzhOlN8vVZqYJlhxw3.8qH3K9nL7OWLkpEjYNJ5fCdHQz9LnFW', '+91 9876543213', 'user', 'active'),
('David Brown', 'david@example.com', '$2b$10$rOcqzhOlN8vVZqYJlhxw3.8qH3K9nL7OWLkpEjYNJ5fCdHQz9LnFW', '+91 9876543214', 'user', 'inactive');

-- Insert sample bookings
INSERT INTO bookings (user_id, seat_id, date, start_time, end_time, plan, price, status) VALUES
(2, 1, '2024-07-16', '09:00:00', '18:00:00', 'daily', 300.00, 'active'),
(3, 5, '2024-07-16', '10:00:00', '19:00:00', 'daily', 350.00, 'active'),
(4, 3, '2024-07-15', '14:00:00', '18:00:00', 'hourly', 200.00, 'completed'),
(5, 7, '2024-07-14', '09:00:00', '17:00:00', 'daily', 300.00, 'completed'),
(2, 2, '2024-07-13', '10:00:00', '15:00:00', 'hourly', 250.00, 'completed');

-- Insert default system settings
INSERT INTO settings (`key`, value) VALUES
('libraryName', '"Intence Focus Library"'),
('operatingHours', '{"weekdays": {"open": "06:00", "close": "23:00"}, "weekends": {"open": "07:00", "close": "22:00"}}'),
('pricing', '{"hourly": 50, "daily": 300, "monthly": 6000}'),
('policies', '{"cancellationHours": 2, "refundPolicy": "24 hours for full refund, 2-24 hours for 50% refund", "maxBookingDays": 30}'),
('notifications', '{"emailNotifications": true, "smsNotifications": true, "reminderHours": 2}');