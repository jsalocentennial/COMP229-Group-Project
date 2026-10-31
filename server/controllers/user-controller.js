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
        if (!user) {                                                                                             //Check for user
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const createUser = async (req, res) => {
    try {
        const newUser = new userModel(req.body);
        const savedUser = await newUser.save();

        const token = generateToken(savedUser); // Generate JWT token for the new user
        res.status(201).json({ user: savedUser, token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const updateUser = async (req, res) => {
    try {
        const updatedUser = await userModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedUser) {                                                                                         //Check for user
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
        if (!deletedUser) {                                                                                         //Check for user
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const logInUser = async (req, res) => {                                                                     //Login function
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
        res.status(200).json({ message: 'Login successful', user, token });                                      //Token added to login response
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}