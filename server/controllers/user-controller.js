import userModel from '../models/user-model.js';
import generateToken from '../utils/jwt.js';

export const getAllUsers = async (req, res) => {
    try {
        const users = await userModel.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getUserById = async (req, res) => {
    try {
        const user = await userModel.findById(req.params.id);
        if (!user) {                                                                                             
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const createUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;                       //Only accept name, email, and password from the request body
        const newUser = new userModel({ username, email, password });
        const savedUser = await newUser.save();

        const token = generateToken(savedUser);                               // Generate a JWT token for the newly created user (Oct 14th class)

        const safeUser = {                                                    //Create a variable to hold the user data without the password
            _id: savedUser._id,
            username: savedUser.name,
            email: savedUser.email,
            role: savedUser.role,                                             //Include the role in the safe user object
            created: savedUser.created,
            updated: savedUser.updated
        }
        res.status(201).json( { username: safeUser, token: token } );         //Call the safe variable and token
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const updateUser = async (req, res) => {
    try {
        const updatedUser = await userModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedUser) {                                                                                         
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const deleteUser = async (req, res) => {
    try {
        const deletedUser = await userModel.findByIdAndDelete(req.params.id);
        if (!deletedUser) {                                                                                         
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const logInUser = async (req, res) => {                                                                     
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const token = generateToken(user);
        res.status(200).json({
            message: 'Login successful',
            user: {
                _id: user._id,
                username: user.username,
                email: user.email,
                role: user.role
            },
            token
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
