import express from 'express';
import homeRoutes from './routes/home-routes.js';
import leaderboardRoutes from './routes/leader-board-routes.js';
import gameGuideRoutes from './routes/game-guide-routes.js';
import faqRoutes from './routes/faq-routes.js';

const app = express();

app.use('/', homeRoutes);
app.use('/leader-board', leaderboardRoutes);
app.use('/game-guide', gameGuideRoutes);
app.use('/faq',faqRoutes);

app.listen(3000);

console.log('Server is running on http://localhost:3000');