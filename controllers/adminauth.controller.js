import jwt from 'jsonwebtoken';
import AdminUser from '../models/adminUser.model.js';

// registerUser function to handle user registration
// export const registerUser = async (req, res) => {
//     try {
//         const { name, email, phone, password } = req.body;
//         const [result] = await db.query(
//             'INSERT INTO users (name, email, phone, password, created_at) VALUES (?, ?, ?, ?, NOW())',
//             [name, email, phone, password]
//         );

//         // jwt and bcrypt logic
//         // const hashedPassword = await bcrypt.hash(password, 10);
//         // const token = jwt.sign({ id: result.insertId, email }, process.env.JWT_SECRET, { expiresIn: '1h' });

//         console.log(result);
//         // res.status(201).json({ id:result.insertId, message:'USER REGISTERED SUCCESSFULLY' });

//     }
//     catch (error) {
//         console.error('Error during registration:', error);
//         return res.status(500).send('Internal Server Error During Registration');
//     }
// }

// loginUser function to handle user login
export const loginAdminUser = async (req, res) => {
    // #swagger.tags = ['Admin Authentication']
    try {
        const { email, password } = req.body;
        const user =  await AdminUser.findOne({email,password});

        if(!user){
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // generate JWT token
        // const token = jwt.sign(
        //     { id: user.id, email: user.email },
        //     process.env.JWT_SECRET
        // );

        // send user details and token in response
        res.status(201).json({
            // token,
            // name: user.name,
            email: user?.email,
            // phone: user.phone,
            message: 'Admin user Logged in SUCCESSFULLY'
        });

    }
    catch (error) {
        console.error('Error during registration:', error);
        return res.status(500).send('Internal Server Error During Registration');
    }
}