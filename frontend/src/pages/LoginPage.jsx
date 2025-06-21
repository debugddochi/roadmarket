import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import '../styles/LoginPage.css';

function LoginPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    userId: '',
    password: '',
  });
  const [rememberMe, setRememberMe] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://localhost:8443/auth/login', form);
      const token = res.data; // JWT 토큰이라고 가정

      if (rememberMe) {
        localStorage.setItem('token', token);
      } else {
        sessionStorage.setItem('token', token);
      }

      Swal.fire({
        icon: 'success',
        title: '로그인 성공!',
        text: '홈으로 이동합니다.',
        confirmButtonText: '확인',
      }).then(() => navigate('/'));
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: '로그인 실패',
        text: err.response?.data || '서버 오류',
      });
    }
  };

  return (
    <div className="login-wrapper fade-in">
      <div className="login-container slide-up">
        <h2>로그인</h2>
        <form onSubmit={handleSubmit} className="login-form">
          <label>아이디</label>
          <input name="userId" value={form.userId} onChange={handleChange} required />

          <label>비밀번호</label>
          <input type="password" name="password" value={form.password} onChange={handleChange} required />

          <label className="remember-label">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={() => setRememberMe((prev) => !prev)}
            />
            로그인 유지
          </label>

          <button type="submit">로그인</button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;