import mongoose from 'mongoose';

import express from 'express';
import homeRoutes from './routes/home-routes.js';
import leaderboardRoutes from './routes/leader-board-routes.js';
import gameGuideRoutes from './routes/game-guide-routes.js';
import faqRoutes from './routes/faq-routes.js';
import challengeRoutes from './routes/challenge-creater-routes.js';

//Database Connection
mongoose.connect("mongodb://localhost:27017/group-project");
const connecton = mongoose.connection;
connecton.on("error", console.error.bind(console, "connection error:"));         //Error Check
connecton.once("open", () => {
    console.log("Connected to MongoDB");
});


const app = express();

app.use(express.json());

app.use('/', homeRoutes);
app.use('/leader-board', leaderboardRoutes);
app.use('/game-guide', gameGuideRoutes);
app.use('/faq',faqRoutes);
app.use('/challenge-creater', challengeRoutes);

app.listen(3000);

console.log('Server is running on http://localhost:3000');