import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/TradeDetailPage.css';

const TradeDetailPage = () => {
  const { postSq } = useParams();
  const [post, setPost] = useState(null);
  const navigate = useNavigate();

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
      </div>
    </div>
  );
};

export default TradeDetailPage;