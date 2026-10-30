import express from 'express';
import gameguideController from '../controllers/game-guide-controllers.js';

const router = express.Router();

router.use("/", gameguideController);

export default router;