import React, { useEffect, useState, useRef } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Navbar from './NavBar';
import { jwtDecode } from 'jwt-decode';
import Swal from 'sweetalert2';

const Layout = () => {
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
        window.location.href = '/';
      });
    } else {
      Swal.fire({
        icon: 'info',
        title: '자동 로그아웃',
        text: '오랜 시간 활동이 없어 자동으로 로그아웃되었어요.',
        confirmButtonText: '확인',
      }).then(() => {
        window.location.href = '/';
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

  return (
    <>
      <Navbar userId={userId} timeLeft={timeLeft} onLogout={logout} />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default Layout;