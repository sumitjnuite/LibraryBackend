import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';


// loginUser function to handle user login
export const getAllUsers = async (req, res) => {
    // #swagger.tags = ['Users Controller']
    try {
        const users = await User.find({});

        if (!users) {
            return res.status(401).json({ message: 'Zero Users.' });
        }

        res.status(201).json({
            users,
            message: 'Users fetched SUCCESSFULLY'
        });

    }
    catch (error) {
        console.error('Error getting users info:', error);
        return res.status(500).send('Internal Server Error During Getting users Info');
    }
}

export const getUserById = async (req, res) => {
    // #swagger.tags = ['Users Controller']
    try {
        const { id } = req.params;
        const user = await User.findById(id);

        if (!user) {
            return res.status(401).json({ message: 'User Not Found.' });
        }

        res.status(201).json({
            user,
            message: 'User fetched SUCCESSFULLY'
        });

    }
    catch (error) {
        console.error('Error getting user info:', error);
        return res.status(500).send('Internal Server Error During Getting User Info');
    }
}

export const addUser = async (req, res) => {
    // #swagger.tags = ['Users Controller']
    try {
        const { name, email, phone, password } = req.body;

        // Check if user with the same email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: 'User with this email already exists.' });
        }

        // Hash password before saving (never save plain passwords)
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create and save new user
        const newUser = new User({ name, email, phone, password: hashedPassword });
        await newUser.save();

        // Remove password before sending response
        const userResponse = newUser.toObject();
        delete userResponse.password;

        res.status(201).json({
            userResponse,
            message: 'User Added SUCCESSFULLY'
        });
    }
    catch (error) {
        console.error('Error adding user:', error);
        return res.status(500).send('Internal Server Error During Adding User');
    }
}

export const updateUser = async (req, res) => {
    // #swagger.tags = ['Users Controller']
    try {
        const { id } = req.params;
        const {email, name, phone, status, totalSpent} = req.body;

        const updatedUser = await User.findByIdAndUpdate(id, {email, name, phone, status, totalSpent}, { new: true });

        res.status(201).json({
            updatedUser,
            message: 'User Updated SUCCESSFULLY'
        });
    }
    catch (error) {
        console.error('Error updating user info:', error);
        return res.status(500).send('Internal Server Error During Updating User Info');
    }
}

export const deleteUser = async (req, res) => {
    // #swagger.tags = ['Users Controller']
    try {
        const { id } = req.params;
        await User.findByIdAndDelete(id);
        res.status(201).json({
            message: 'User Deleted SUCCESSFULLY'
        });
    }
    catch (error) {
        console.error('Error getting users info:', error);
        return res.status(500).send('Internal Server Error During Getting users Info');
    }
}

export const getActiveUsers = async (req, res) => {
    // #swagger.tags = ['Users Controller']
    try {
        const users = await User.find({ status: "active" });



        // console.log("Active Users:", users);

        if (!users) {
            return res.status(401).json({ message: 'Zero Active Users.' });
        }

        res.status(201).json({
            users,
            message: 'Active Users fetched SUCCESSFULLY'
        });

    }
    catch (error) {
        console.error('Error getting active users info:', error);
        return res.status(500).send('Internal Server Error During Getting Active users Info');
    }
}

