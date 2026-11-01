import { Route, Routes } from 'react-router-dom';
import Layout from './components/layout';
import Home from './components/home';
import LeaderBoard from './components/leader-board';
import GameGuide from './components/game-guide';
import ChallengeCreater from './components/challenge-creater';
import FAQ from './components/faq';

const MainRouter = () => {
    return (
    <div>
        <Layout />
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/leader-board" element={<LeaderBoard />} />
            <Route path="/game-guide" element={<GameGuide />} />
            <Route path="/challenge-creater" element={<ChallengeCreater />} />
            <Route path="/faq" element={<FAQ />} />
        </Routes>
    </div>
)};

export default MainRouter;