import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/TradeDetailPage.css';

const TradeDetailPage = () => {
  const { postSq } = useParams();
  const [post, setPost] = useState(null);
  const [guestPassword, setGuestPassword] = useState('');
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(`/api/trade/${postSq}`);
        setPost(res.data);
      } catch (err) {
        console.error('게시글 로딩 실패:', err);
      }
    };
    fetchPost();
  }, [postSq]);

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/trade/delete/${postSq}`, {
        params: token ? {} : { guestPassword },
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });

      alert('삭제되었습니다.');
      navigate('/trade');
    } catch (err) {
      alert('삭제 실패: ' + (err.response?.data?.message || err.message));
    }
  };

  const handleDeleteClick = () => {
    if (token) {
      if (window.confirm('정말 삭제하시겠습니까?')) {
        handleDelete();
      }
    } else {
      setShowPasswordModal(true);
    }
  };

  const handleEditClick = () => {
    navigate(`/trade/edit/${postSq}`);
  };

  if (!post) return <div className="loading">로딩 중...</div>;

  return (
    <div className="trade-detail-container">
      <div className="header">
        <span className={`badge ${post.tradeType === 'BUY' ? 'buy' : 'sell'}`}>
          {post.tradeType === 'BUY' ? '삽니다' : '팝니다'}
        </span>
        <h2 className="title">{post.title}</h2>
      </div>

      <div className="meta">
        <span>서버: {post.serverName} {post.serverNumber}</span>
        <span>작성자: {post.writerNickname}</span>
        <span>작성일: {post.createdAt}</span>
      </div>

      {post.hasImage && post.fileId && (
        <div className="image-box">
          <img src={`/api/file/${post.fileId}`} alt="첨부 이미지" />
        </div>
      )}

      <p className="content">{post.content}</p>

      <div className="actions">
        <button className="chat-btn">채팅하기</button>
        <button className="close-btn" onClick={() => navigate('/trade')}>닫기</button>
        <button className="edit-btn" onClick={handleEditClick}>수정</button>
        <button className="delete-btn" onClick={handleDeleteClick}>삭제</button>
      </div>

      {/* 비회원 비밀번호 모달 */}
      {showPasswordModal && (
        <div className="modal">
          <div className="modal-content">
            <h4>비밀번호 입력</h4>
            <input
              type="password"
              placeholder="비밀번호"
              value={guestPassword}
              onChange={(e) => setGuestPassword(e.target.value)}
            />
            <div className="modal-buttons">
              <button onClick={handleDelete}>삭제</button>
              <button onClick={() => setShowPasswordModal(false)}>취소</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TradeDetailPage;