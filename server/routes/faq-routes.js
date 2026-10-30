import express from 'express';
import faqController from '../controllers/faq-controllers.js';

const router = express.Router();

router.use("/", faqController);

export default router;