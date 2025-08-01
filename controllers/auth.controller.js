import db from '../db/index.js'; // Import the database connection

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

// registerUser function to handle user registration
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const [result] = await db.query(
            'SELECT * from users where email = ? and password = ?',
            [email, password]
        );

        if(result.length === 0) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        console.log(result);
        // (later) create JWT token and send it in response
        res.status(201).json({token:'library-token', message:'USER Login SUCCESSFULLY' });

    }
    catch (error) {
        console.error('Error during registration:', error);
        return res.status(500).send('Internal Server Error During Registration');
    }
}