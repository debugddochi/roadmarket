import React, { useEffect, useState, useRef } from 'react';
import Navbar from '../components/NavBar';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import '../styles/MainPage.css';
import Swal from 'sweetalert2';

function MainPage() {
  const navigate = useNavigate();
  const [userId, setUserId] = useState('');
  const [timeLeft, setTimeLeft] = useState(15 * 60);
  const timerRef = useRef(null);
  const countdownRef = useRef(null);

const logout = (manual = false) => {
  localStorage.removeItem('token');
  sessionStorage.removeItem('token');

  if (manual) {
    Swal.fire({
      icon: 'success',
      title: '로그아웃 완료',
      text: '다음에 또 만나요 😊',
      confirmButtonText: '확인',
    }).then(() => {
      window.location.href = '/'; // 👉 새로고침 포함
    });
  } else {
    Swal.fire({
      icon: 'info',
      title: '자동 로그아웃',
      text: '오랜 시간 활동이 없어 자동으로 로그아웃되었어요.',
      confirmButtonText: '확인',
    }).then(() => {
      window.location.href = '/'; // or navigate('/login')
    });
  }
};

  const resetTimer = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (countdownRef.current) clearInterval(countdownRef.current);

    setTimeLeft(15 * 60);

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

    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUserId(decoded.userId || decoded.sub || '알 수 없음');
        resetTimer();

        const events = ['mousemove', 'keydown', 'click'];
        events.forEach((event) => window.addEventListener(event, resetTimer));

        return () => {
          clearTimeout(timerRef.current);
          clearInterval(countdownRef.current);
          events.forEach((event) => window.removeEventListener(event, resetTimer));
        };
      } catch (error) {
        console.error('토큰 디코딩 실패:', error);
      }
    }
  }, []);

  // MM:SS 포맷
  const formatTime = (seconds) => {
    const m = String(Math.floor(seconds / 60)).padStart(2, '0');
    const s = String(seconds % 60).padStart(2, '0');
    return `${m}:${s}`;
  };

  return (
    <>
      <Navbar userId={userId} timeLeft={timeLeft} onLogout={logout} />
      <div className="main-wrapper">
        <h1>로드마켓에 오신 걸 환영합니다!</h1>
        {userId ? (
          <p><strong>{userId}</strong> 님, 반가워요 😊</p>
        ) : (
          <p>로그인하면 더 많은 기능을 이용할 수 있어요 😊</p>
        )}
        <p>여기는 거래게시판이 들어올 메인 공간입니다.</p>
      </div>
    </>
  );
}

export default MainPage;