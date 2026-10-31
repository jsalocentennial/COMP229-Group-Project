import express from 'express';
import { createChallenge, getAllChallenge, getChallengeById, deleteChallenge, updateChallenge } from '../controllers/challenge-creater-controllers.js';


const router = express.Router();

// REST API routes for challenge creation
//READs
router.get("/", getAllChallenge);
router.get("/:id", getChallengeById);

//CREATE
router.post("/", createChallenge);

//UPDATE
router.put("/:id", updateChallenge);

//DELETE
router.delete("/:id", deleteChallenge);

export default router;