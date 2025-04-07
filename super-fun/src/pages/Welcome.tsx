import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Article from '../components/articles/Article';
import LandingPage from './LandingPage';
import Login from '../components/settings/Login';
import MainDashboard from '../components/settings/MainDashboard';
import EditArticles from '../components/articles/EditArticles';

const Welcome = () => {
    return <>
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<LandingPage />} />
                <Route path="article/:teamId" element={<Article />} />
                <Route path='/settings' element={<Login />} />
                <Route path='/Dashboard' element={<MainDashboard />} />
                <Route path='/EditArticle' element={<EditArticles />} />
            </Routes>
        </BrowserRouter>
    </>
}

export default Welcome;