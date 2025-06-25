import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/TradeEditPage.css';

const TradeEditPage = () => {
  const { postSq } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const [form, setForm] = useState({
    title: '',
    content: '',
    serverName: '',
    serverNumber: '',
    tradeType: '',
  });

  const [isGuest, setIsGuest] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(`/api/trade/${postSq}`);
        const post = res.data;
        setForm({
          title: post.title,
          content: post.content,
          serverName: post.serverName,
          serverNumber: post.serverNumber,
          tradeType: post.tradeType,
        });
        if (post.writerNickname === '비회원') {
          setIsGuest(true);
        }
      } catch (err) {
        alert('게시글 불러오기 실패');
        console.error(err);
      }
    };
    fetchPost();
  }, [postSq]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      await axios.put(
        `/api/trade/edit/${postSq}`,
        { ...form, guestPassword: isGuest ? passwordInput : null },
        {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        }
      );

      alert('수정되었습니다.');
      navigate(`/trade/${postSq}`);
    } catch (err) {
      alert('수정 실패: ' + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div className="edit-container">
      <h2>게시글 수정</h2>

      <input
        type="text"
        name="title"
        value={form.title}
        onChange={handleChange}
        placeholder="제목"
      />
      <textarea
        name="content"
        value={form.content}
        onChange={handleChange}
        placeholder="내용"
        rows={8}
      />
      <input
        type="text"
        name="serverName"
        value={form.serverName}
        onChange={handleChange}
        placeholder="서버명"
      />
      <input
        type="text"
        name="serverNumber"
        value={form.serverNumber}
        onChange={handleChange}
        placeholder="서버 번호"
      />
      <select
        name="tradeType"
        value={form.tradeType}
        onChange={handleChange}
      >
        <option value="">거래 유형 선택</option>
        <option value="BUY">삽니다</option>
        <option value="SELL">팝니다</option>
      </select>

      {isGuest && (
        <input
          type="password"
          placeholder="비밀번호 입력"
          value={passwordInput}
          onChange={(e) => setPasswordInput(e.target.value)}
        />
      )}

      <div className="button-group">
        <button onClick={handleSubmit}>수정하기</button>
        <button onClick={() => navigate(-1)}>취소</button>
      </div>
    </div>
  );
};

export default TradeEditPage;