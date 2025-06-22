import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import '../styles/MainPage.css';

function MainPage() {
  const navigate = useNavigate();
  const [userId, setUserId] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');

    if (!token) {
      navigate('/login');
      return;
    }

    try {
      const decoded = jwtDecode(token);
      console.log('🔍 디코딩된 토큰:', decoded); // 이거는 여기에 있어야 해
      setUserId(decoded.userId || '알 수 없음');
    } catch (error) {
      console.error('토큰 디코딩 실패:', error);
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div className="main-wrapper">
      <h1>로드마켓에 오신 걸 환영합니다!</h1>
      <p><strong>{userId}</strong> 님, 반가워요 😊</p>
      <button
        onClick={() => {
          localStorage.removeItem('token');
          sessionStorage.removeItem('token');
          navigate('/login');
        }}
      >
        로그아웃
      </button>
    </div>
  );
}

export default MainPage;