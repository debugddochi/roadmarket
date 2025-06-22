import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import ReCAPTCHA from 'react-google-recaptcha';
import '../styles/LoginPage.css';

function LoginPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    userId: '',
    password: '',
  });
  const [rememberMe, setRememberMe] = useState(false);
  const [captchaToken, setCaptchaToken] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCaptchaChange = (token) => {
    setCaptchaToken(token);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!captchaToken) {
      Swal.fire({
        icon: 'warning',
        title: '앗! 아직 인증을 안 하셨어요',
        text: '아래 체크박스를 클릭하시면 로그인이 가능해요.',
      });
      return;
    }

    try {
      const res = await axios.post('https://localhost:8443/auth/login', form);
      const token = res.data;

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

          <div className="recaptcha-wrapper">
            <ReCAPTCHA
              sitekey="6LdiqGkrAAAAAL-SqMksT7iMbWHQtwLWszsu1TMk"
              onChange={handleCaptchaChange}
            />
          </div>

          <button type="submit">로그인</button>
        </form>
        <p className="signup-link">
          아직 계정이 없으신가요? <span onClick={() => navigate('/signup')}>회원가입</span>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;