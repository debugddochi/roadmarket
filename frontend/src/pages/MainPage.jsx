import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import '../styles/MainPage.css';

function MainPage() {
  const navigate = useNavigate();
  const [userId, setUserId] = useState('');
  const [timeLeft, setTimeLeft] = useState(15 * 60); // 15분 = 900초
  const timerRef = useRef(null);
  const countdownRef = useRef(null);

  const logout = () => {
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
    alert('오랜 시간 활동이 없어 로그아웃되었습니다.');
    navigate('/login');
  };

  const resetTimer = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (countdownRef.current) clearInterval(countdownRef.current);

    setTimeLeft(15 * 60); // 초기화 (15분)

    timerRef.current = setTimeout(logout, 15 * 60 * 1000);

    countdownRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(countdownRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  useEffect(() => {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    if (!token) return navigate('/login');

    try {
      const decoded = jwtDecode(token);
      setUserId(decoded.userId || '알 수 없음');
    } catch (error) {
      console.error('토큰 디코딩 실패:', error);
      return navigate('/login');
    }

    resetTimer();

    const events = ['mousemove', 'keydown', 'click'];
    events.forEach((event) => window.addEventListener(event, resetTimer));

    return () => {
      clearTimeout(timerRef.current);
      clearInterval(countdownRef.current);
      events.forEach((event) => window.removeEventListener(event, resetTimer));
    };
  }, [navigate]);

  // 초를 MM:SS 형식으로 변환
  const formatTime = (seconds) => {
    const m = String(Math.floor(seconds / 60)).padStart(2, '0');
    const s = String(seconds % 60).padStart(2, '0');
    return `${m}:${s}`;
  };

  return (
    <div className="main-wrapper">
      <div className="timer-bar">
        ⏰ 자동 로그아웃까지: {formatTime(timeLeft)}
      </div>
      <h1>로드마켓에 오신 걸 환영합니다!</h1>
      <p><strong>{userId}</strong> 님, 반가워요 😊</p>
      <button onClick={logout}>로그아웃</button>
    </div>
  );
}

export default MainPage;