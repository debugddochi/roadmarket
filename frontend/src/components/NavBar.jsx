import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../Styles/NavBar.css';

function Navbar({ userId, timeLeft, onLogout }) {
  const navigate = useNavigate();

  const formatTime = (seconds) => {
    const m = String(Math.floor(seconds / 60)).padStart(2, '0');
    const s = String(seconds % 60).padStart(2, '0');
    return `${m}:${s}`;
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="logo">로드마켓</Link>
        <Link to="/buy">구매 게시판</Link>
        <Link to="/sell">판매 게시판</Link>
        <Link to="/faq">FAQ</Link>
      </div>

      <div className="navbar-right">
        {userId ? (
          <>
            <span className="navbar-user">{userId}님 환영합니다!</span>
            <span className="navbar-timer">⏰ {formatTime(timeLeft)}</span>
            <button className="logout-btn" onClick={onLogout}>로그아웃</button>
          </>
        ) : (
          <button className="login-btn" onClick={() => navigate('/login')}>로그인</button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;