import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import '../styles/SignupPage.css';
import TermsModal from '../components/TermsModal';

function SignupPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    userId: '',
    password: '',
    confirmPassword: '',
    nickname: '',
    email: '',
  });

  const [idValid, setIdValid] = useState(null);
  const [emailValid, setEmailValid] = useState(null);
  const [passwordValid, setPasswordValid] = useState(null);
  const [passwordMatch, setPasswordMatch] = useState(null);
  const [termsAgreed, setTermsAgreed] = useState(false);
  const [marketingAgreed, setMarketingAgreed] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showTerms, setShowTerms] = useState(false);

    const termsContent = (
    <div className="modal-content">
        <h3>제1조 목적</h3>
        <p>
        본 약관은 로드마켓(이하 '회사')이 제공하는 서비스의 이용조건 및 절차에 관한 사항을 규정함을 목적으로 합니다.
        </p>

        <h3>제2조 정의</h3>
        <p>
        ① '이용자'란 본 약관에 따라 회사가 제공하는 서비스를 이용하는 자를 말합니다.<br />
        ② '회원'이란 회사와 서비스 이용 계약을 체결하고 사용자 ID를 부여받은 자를 말합니다.
        </p>

        <h3>제3조 약관의 효력 및 변경</h3>
        <p>
        회사는 약관의 내용을 이용자가 쉽게 알 수 있도록 서비스 초기 화면에 게시합니다. 회사는 필요 시 약관을 변경할 수 있으며,
        변경된 약관은 공지 시점부터 효력이 발생합니다.
        </p>

        <h3>제4조 서비스의 제공 및 변경</h3>
        <p>
        회사는 이용자에게 아래와 같은 서비스를 제공합니다:
        </p>
        <ul>
        <li>아이템 게시 및 검색 기능</li>
        <li>채팅 시스템</li>
        <li>마이페이지 및 알림 기능</li>
        </ul>

        <h3>제5조 회원가입</h3>
        <p>
        이용자는 회사가 정한 가입 양식에 따라 회원정보를 기입함으로써 회원가입을 신청하며, 회사는 이를 승인함으로써 이용계약이 성립됩니다.
        </p>

        <h3>제6조 회원의 의무</h3>
        <p>
        회원은 관련 법령, 본 약관 규정, 이용안내 등 회사가 통지하는 사항을 준수하여야 하며, 기타 회사의 업무에 방해되는 행위를 해서는 안 됩니다.
        </p>

        <h3>제7조 개인정보 보호</h3>
        <p>
        회사는 관련 법령이 정하는 바에 따라 이용자 정보를 보호하기 위해 노력합니다. 개인정보 보호 및 사용에 대해서는 관련 법령 및 회사의
        개인정보 처리방침이 적용됩니다.
        </p>

        <h3>제8조 계약 해지</h3>
        <p>
        회원은 언제든지 서비스 탈퇴 요청을 할 수 있으며, 회사는 관련 법령에 따라 이를 처리합니다.
        </p>

        <h3>제9조 책임의 제한</h3>
        <p>
        회사는 천재지변, 불가항력적 사유 등 회사의 귀책 사유 없이 발생한 손해에 대해서는 책임을 지지 않습니다.
        </p>

        <h3>제10조 분쟁 해결</h3>
        <p>
        본 약관에 명시되지 않은 사항은 관련 법령 및 상관례에 따릅니다. 회사와 이용자 간에 발생한 분쟁에 대해서는 회사의 본사 소재지를 관할하는
        법원을 제1심 관할법원으로 합니다.
        </p>
    </div>
    );

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (form.userId.trim()) {
        axios.get('https://localhost:8443/users/check-id', {
          params: { userId: form.userId }
        }).then((res) => {
          setIdValid(res.data === '사용 가능한 아이디입니다.');
        }).catch(() => setIdValid(false));
      } else {
        setIdValid(null);
      }
    }, 500);
    return () => clearTimeout(timeout);
  }, [form.userId]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (form.email.trim()) {
        axios.get('https://localhost:8443/users/check-email', {
          params: { email: form.email }
        }).then((res) => {
          setEmailValid(res.data === '사용 가능한 이메일입니다.');
        }).catch(() => setEmailValid(false));
      } else {
        setEmailValid(null);
      }
    }, 500);
    return () => clearTimeout(timeout);
  }, [form.email]);

  useEffect(() => {
    const pwRegex = /^(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,20}$/;
    setPasswordValid(pwRegex.test(form.password));
    setPasswordMatch(form.password && form.confirmPassword && form.password === form.confirmPassword);
  }, [form.password, form.confirmPassword]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const idRegex = /^[a-zA-Z0-9]{4,12}$/;
    const pwRegex = /^(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,20}$/;
    const nicknameRegex = /^[가-힣a-zA-Z0-9]{2,10}$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;

    if (!idRegex.test(form.userId)) return '아이디는 영문과 숫자를 조합해서 4~12자 이내로 입력해주세요.';
    if (!pwRegex.test(form.password)) return '비밀번호는 8~20자 사이이며 특수문자를 하나 이상 포함해야 해요.';
    if (!passwordMatch) return '입력하신 비밀번호가 서로 다르네요. 한 번 더 확인해주세요!';
    if (!nicknameRegex.test(form.nickname)) return '닉네임은 한글, 영문, 숫자 조합으로 2~10자 사이여야 해요.';
    if (!emailRegex.test(form.email)) return '이메일 형식이 올바르지 않은 것 같아요. 다시 확인해주세요!';
    if (!idValid) return '아이디 중복 여부를 확인해주세요.';
    if (!emailValid) return '이메일 중복 여부를 확인해주세요.';
    if (!termsAgreed) return '이용약관에 동의하셔야 가입하실 수 있어요.';

    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errMsg = validateForm();
    if (errMsg) {
      Swal.fire({
        title: '잠깐만요!',
        text: errMsg,
        icon: 'warning',
        background: '#2c2c2c',
        color: '#ffffff',
      });
      return;
    }

    try {
      await axios.post('https://localhost:8443/users/signup', {
        userId: form.userId,
        password: form.password,
        nickname: form.nickname,
        email: form.email,
        marketingAgree: marketingAgreed ? 1 : 0,
      });
      Swal.fire({
        title: '회원가입 완료!',
        text: '로그인 페이지로 이동합니다.',
        icon: 'success',
        confirmButtonText: '확인',
        background: '#2c2c2c',
        color: '#ffffff',
      }).then(() => navigate('/login'));
    } catch (err) {
      Swal.fire({
        title: '오류',
        text: err.response?.data || '서버 오류',
        icon: 'error',
        background: '#2c2c2c',
        color: '#ffffff',
      });
    }
  };

  return (
    <div className="signup-wrapper fade-in">
      <div className="signup-container slide-up">
        <h2>회원가입</h2>
        <form className="signup-form" onSubmit={handleSubmit}>
          <label>아이디</label>
          <input type="text" name="userId" className="input-field" value={form.userId} onChange={handleChange} required />
          {idValid === true && <p className="valid">멋진 아이디네요! 사용하실 수 있어요.</p>}
          {idValid === false && <p className="invalid">앗, 이미 사용 중인 아이디예요. 다른 걸 골라주세요.</p>}

          <label>비밀번호</label>
          <div className="password-field">
            <input type={showPassword ? 'text' : 'password'} name="password" className="password-input" value={form.password} onChange={handleChange} required />
            <span className="toggle-password" onClick={() => setShowPassword(!showPassword)}>{showPassword ? '🙈' : '🙊'}</span>
          </div>
          {form.password && (
            <p className={passwordValid ? 'valid' : 'invalid'}>
              {passwordValid ? '좋아요! 이 비밀번호는 사용할 수 있어요.' : '비밀번호는 8~20자이며, 특수문자를 하나 이상 포함해야 해요.'}
            </p>
          )}

          <label>비밀번호 확인</label>
          <div className="password-field">
            <input type={showConfirmPassword ? 'text' : 'password'} name="confirmPassword" className="password-input" value={form.confirmPassword} onChange={handleChange} required />
            <span className="toggle-password" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>{showConfirmPassword ? '🙈' : '🙊'}</span>
          </div>
          {form.confirmPassword && (
            <p className={passwordMatch ? 'valid' : 'invalid'}>
              {passwordMatch ? '비밀번호가 잘 맞아요!' : '입력하신 비밀번호가 서로 달라요. 다시 확인해주세요.'}
            </p>
          )}

          <label>닉네임</label>
          <input type="text" name="nickname" className="input-field" value={form.nickname} onChange={handleChange} required />

          <label>이메일</label>
          <input type="email" name="email" className="input-field" value={form.email} onChange={handleChange} required />
          {emailValid === true && <p className="valid">이메일 주소, 사용 가능합니다!</p>}
          {emailValid === false && <p className="invalid">이미 가입된 이메일이에요. 다른 주소를 사용해 주세요.</p>}

          <div className="checkbox-group">
            <label className="checkbox-label">
              <input type="checkbox" checked={termsAgreed} onChange={(e) => setTermsAgreed(e.target.checked)} />
              <span>
                [필수] <span className="terms-link" onClick={() => setShowTerms(true)}>이용약관</span>에 동의합니다.
              </span>
              </label>
            <label className="checkbox-label">
              <input type="checkbox" checked={marketingAgreed} onChange={(e) => setMarketingAgreed(e.target.checked)} />
              <span>[선택] 마케팅 정보 수신에 동의합니다.</span>
            </label>
          </div>

          <button type="submit">가입하기</button>
        </form>
      </div>
      {showTerms && <TermsModal title="이용약관" btnText="동의" content={termsContent} onClose={() => setShowTerms(false)} />}
    </div>
  );
}

export default SignupPage;