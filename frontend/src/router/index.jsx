import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from '../pages/LoginPage.jsx';
import SignupPage from '../pages/SignupPage.jsx';
import MainPage from '../pages/MainPage.jsx';
import TradeListPage from '../pages/TradeListPage.jsx';
import Layout from '../components/Layout.jsx';
import TradeDetailPage from '../pages/TradeDetailPage.jsx'; 

const Router = () => {
  return (
    <BrowserRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/trade" element={<TradeListPage />} />
          <Route path="/trade/:postSq" element={<TradeDetailPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;