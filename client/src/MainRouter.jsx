import { useCallback, useState } from 'react';
import { Link, Navigate, Route, Routes } from 'react-router-dom';
import Layout from './components/layout';
import Home from './components/home';
import LeaderBoard from './components/leader-board';
import GameGuide from './components/game-guide';
import CharacterSheet from './components/character-sheet';
import FAQ from './components/faq';
import Register from './components/register';
import Login from './components/login';

const MainRouter = () => {

    const [token, setToken] = useState(localStorage.getItem('token') || null);    //Nov, 4th class, saves token to local storage, if it exists, otherwise null

    const onAuth = useCallback((value) => {
        if (value) localStorage.setItem('token', value);
        else localStorage.removeItem('token');
        setToken(value);
    }, []);

    return (
    <div>
        <Layout />
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/leader-board" element={<LeaderBoard />} />
            <Route path="/game-guide" element={<GameGuide />} />
            <Route path="/character-sheet" element={<CharacterSheet />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/register" element={token ? <Navigate to="/" /> : <Register onAuth={onAuth} />} />
            <Route path="/login" element={token ? <Navigate to="/" /> : <Login onAuth={onAuth} />} />
        </Routes>
    </div>
    );
}
    
export default MainRouter;