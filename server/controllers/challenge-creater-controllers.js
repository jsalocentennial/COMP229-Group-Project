// import express from 'express';
// import ChallengeController from './challenge-creater-controllers.js';

// const router = express.Router();

// router.use("/", ChallengeController);

// export default router;

import challengeModel from '../models/challenge_model.js';

export const getAllChallenge = async (req, res) => {
    try {
        const challenges = await challengeModel.find();
        res.status(200).json(challenges);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getChallengeById = async (req, res) => {
    try {
        const challenge = await challengeModel.findById(req.params.id);
        if (!challenge) {                                                                                             //Check for challenge
            return res.status(404).json({ message: 'Challenge not found' });
        }
        res.status(200).json(challenge);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const createChallenge = async (req, res) => {
    try {
        const newChallenge = new challengeModel(req.body);
        const savedChallenge = await newChallenge.save();
        res.status(201).json(savedChallenge);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const updateChallenge = async (req, res) => {
    try {
        const updatedChallenge = await challengeModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedChallenge) {                                                                                         //Check for challenge
            return res.status(404).json({ message: 'Challenge not found' });
        }
        res.status(200).json(updatedChallenge);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const deleteChallenge = async (req, res) => {
    try {
        const deletedChallenge = await challengeModel.findByIdAndDelete(req.params.id);
        if (!deletedChallenge) {                                                                                         //Check for challenge
            return res.status(404).json({ message: 'Challenge not found' });
        }
        res.status(200).json({ message: 'Challenge deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}