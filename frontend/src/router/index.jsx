import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from '../pages/LoginPage.jsx';
import SignupPage from '../pages/SignupPage.jsx';
import MainPage from '../pages/MainPage.jsx';
import TradeListPage from '../pages/TradeListPage.jsx';
import Layout from '../components/Layout.jsx';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}> {/* ✅ Layout이 감싸줌 */}
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/trade" element={<TradeListPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;