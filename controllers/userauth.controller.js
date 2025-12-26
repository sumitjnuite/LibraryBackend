
import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
import bcrypt from 'bcrypt'
// import dotenv from 'dotenv';
// dotenv.config();

// registerUser function to handle user registration
export const registerUser = async (req, res) => {
    // #swagger.tags = ['User Authentication']
    try {
        const { name, email, phone, password } = req.body;
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: 'User already exists with this email'
            });
        }

        // Create new user
        const newUser = new User({
            name,
            email,
            password,
            phone,
            // isVerified: true // Set to false in production with email verification
        });

        await newUser.save();


        const hashedPassword = await bcrypt.hash(password, 10);
        const accessToken = jwt.sign({ userId: newUser._Id, email }, process.env.JWT_SECRET, { expiresIn: '1h' });

        

        // delete newUser.password; // Remove password from the response object
        
        const userData = newUser.toObject();
        delete userData.password;
        
        console.log("userData",userData)

        res.status(201).json({
            success: true,
            message: 'User registered successfully',
            data: {
                // user: {
                //     id: newUser._id,
                //     name: newUser.name,
                //     email: newUser.email,
                //     isVerified: newUser.isVerified,
                //     isActive: newUser.isActive,
                //     phone: newUser.phone,
                // },
                userData,
                accessToken
            }
        });




        // const [result] = await db.query(
        //     'INSERT INTO users (name, email, phone, password, created_at) VALUES (?, ?, ?, ?, NOW())',
        //     [name, email, phone, password]
        // );

        // jwt and bcrypt logic
        // const hashedPassword = await bcrypt.hash(password, 10);
        // const token = jwt.sign({ id: result.insertId, email }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // console.log(result);
        // res.status(201).json({ id:result.insertId, message:'USER REGISTERED SUCCESSFULLY' });

    }
    catch (error) {
        console.error('Error during registration:', error);
        res.status(500).json({
            success: false,
            message: 'Registration failed'
        });
    }
}

// loginUser function to handle user login
export const loginUser = async (req, res) => {
    // #swagger.tags = ['User Authentication']
    try {
        const { email, password } = req.body;

        const user = await User.find({ email,password });

        console.log("user",user)

        if(!user){
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        
        // Using bcrypt to compare hashed passwords
        // const isPasswordValid = await bcrypt.compare(password, user[0].password);


        // generate JWT token
        const accessToken = jwt.sign(
            { id: user._id, email: user.email },
            process.env.JWT_SECRET
        );

        // send user details and token in response
        res.status(201).json({
            accessToken,
            name: user?.name,
            email: user?.email,
            phone: user?.phone,
            message: 'USER Login SUCCESSFULLY'
        });

    }
    catch (error) {
        console.error('Error during registration:', error);
        return res.status(500).send('Internal Server Error During Registration');
    }
}