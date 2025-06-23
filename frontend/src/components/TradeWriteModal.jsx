import React, { useEffect, useState } from 'react';
import '../styles/TradeWriteModal.css';
import { jwtDecode } from 'jwt-decode';
import { v4 as uuidv4 } from 'uuid';

const servers = [
  '라엘', '로웨인', '모리안', '바르테스', '엘드리히',
  '아퀼라', '마레크', '라디언트', '오르페'
];
const numbers = ['1','2','3','4','5','6','7','8','9','10'];

function TradeWriteModal({ onClose }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [serverName, setServerName] = useState('');
  const [serverNumber, setServerNumber] = useState('');
  const [type, setType] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setNickname(decoded.nickname || '게스트');;
        setIsLoggedIn(true);
      } catch (e) {
        console.error('토큰 파싱 실패:', e);
        setIsLoggedIn(false);
      }
    }
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
  };

  const handleSubmit = async () => {
    if (!title || !content || !serverName || !serverNumber || !type) {
      alert('모든 항목을 입력해주세요.');
      return;
    }
    if (!isLoggedIn && !password) {
      alert('비회원은 비밀번호를 입력해야 합니다.');
      return;
    }

    const fileId = uuidv4(); // 고유 파일 ID 생성

    // 1. 파일 먼저 업로드
    if (imageFile) {
      const imageForm = new FormData();
      imageForm.append('file', imageFile);
      imageForm.append('fileId', fileId);

      try {
        const fileUploadRes = await fetch('https://localhost:8443/api/upload', {
          method: 'POST',
          body: imageForm,
        });
        if (!fileUploadRes.ok) throw new Error('파일 업로드 실패');
      } catch (err) {
        console.error('파일 업로드 에러:', err);
        alert('파일 업로드 중 오류가 발생했습니다.');
        return;
      }
    }

    // 2. 게시글 데이터 전송
    const tradeData = {
    title,
    content,
    serverName,
    serverNumber,
    tradeType: type,
    writerNickname: isLoggedIn ? nickname : '비회원',
    guestPassword: isLoggedIn ? null : password, 
    fileId
    };

    try {
      const res = await fetch('https://localhost:8443/api/trade/write', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(isLoggedIn && {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          })
        },
        body: JSON.stringify(tradeData)
      });

      if (!res.ok) throw new Error('게시글 등록 실패');
      alert('게시글이 등록되었습니다!');
      onClose();
    } catch (err) {
      console.error(err);
      alert('게시글 등록 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <span className="pin">📌</span>
          <h2>거래글 작성</h2>
        </div>

        <input
          className="modal-input"
          type="text"
          placeholder="제목을 입력하세요"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className="modal-textarea"
          placeholder="내용을 입력하세요"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <div className="modal-section">
          <strong>서버 선택</strong>
          <div className="button-group">
            {servers.map((server) => (
              <button
                key={server}
                className={`modal-btn ${serverName === server ? 'selected' : ''}`}
                onClick={() => setServerName(server)}
              >
                {server}
              </button>
            ))}
          </div>
        </div>

        <div className="modal-section">
          <strong>서버 번호</strong>
          <div className="button-group">
            {numbers.map((num) => (
              <button
                key={num}
                className={`modal-btn ${serverNumber === num ? 'selected' : ''}`}
                onClick={() => setServerNumber(num)}
              >
                {num}
              </button>
            ))}
          </div>
        </div>

        <div className="modal-section">
          <strong>게시글 유형</strong>
          <div className="button-group">
            <button
              className={`modal-btn ${type === 'BUY' ? 'selected' : ''}`}
              onClick={() => setType('BUY')}
            >
              삽니다
            </button>
            <button
              className={`modal-btn ${type === 'SELL' ? 'selected' : ''}`}
              onClick={() => setType('SELL')}
            >
              팝니다
            </button>
          </div>
        </div>

        {!isLoggedIn && (
          <div className="modal-section">
            <strong>비회원 비밀번호</strong>
            <input
              className="modal-input"
              type="password"
              placeholder="수정을 위해 비밀번호를 입력하세요"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        )}

        <div className="modal-section">
          <strong>이미지 업로드</strong>
          <input
            className="file-input"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>

        <div className="modal-actions">
          <button className="modal-submit" onClick={handleSubmit}>등록하기</button>
          <button className="modal-cancel" onClick={onClose}>취소</button>
        </div>
      </div>
    </div>
  );
}

export default TradeWriteModal;