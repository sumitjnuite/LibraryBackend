import db from '../db/index.js'; // Import the database connection
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

// registerUser function to handle user registration
export const registerUser = async (req, res) => {
    try {
        const { name, email, phone, password } = req.body;
        const [result] = await db.query(
            'INSERT INTO users (name, email, phone, password, created_at) VALUES (?, ?, ?, ?, NOW())',
            [name, email, phone, password]
        );

        // jwt and bcrypt logic
        // const hashedPassword = await bcrypt.hash(password, 10);
        // const token = jwt.sign({ id: result.insertId, email }, process.env.JWT_SECRET, { expiresIn: '1h' });

        console.log(result);
        // res.status(201).json({ id:result.insertId, message:'USER REGISTERED SUCCESSFULLY' });

    }
    catch (error) {
        console.error('Error during registration:', error);
        return res.status(500).send('Internal Server Error During Registration');
    }
}

// loginUser function to handle user login
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const [result] = await db.execute(
            'SELECT * from users where email = ? and password = ?',
            [email, password]
        );

        if (result.length === 0) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // generate JWT token
        const token = jwt.sign(
            { id: result[0].id, email: result[0].email },
            process.env.JWT_SECRET
        );

        // send user details and token in response
        res.status(201).json({
            token,
            name: result[0].name,
            email: result[0].email,
            phone: result[0].phone,
            message: 'USER Login SUCCESSFULLY'
        });

    }
    catch (error) {
        console.error('Error during registration:', error);
        return res.status(500).send('Internal Server Error During Registration');
    }
}