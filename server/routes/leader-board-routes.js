import express from 'express';
import leaderboardController from '../controllers/leader-board-controllers.js';

const router = express.Router();

router.use("/", leaderboardController);

export default router;