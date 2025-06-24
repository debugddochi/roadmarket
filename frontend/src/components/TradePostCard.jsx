import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/TradePostCard.css';

const TradePostCard = ({ post }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/trade/${post.postSq}`);
  };

  return (
    <div className="trade-post-card-link" onClick={handleClick}>
      <div className="trade-post-card">
        <div className="card-header">
          <span className={`badge ${post.tradeType === 'BUY' ? 'buy' : 'sell'}`}>
            {post.tradeType === 'BUY' ? '삽니다' : '팝니다'}
          </span>
          <h3 className="title">{post.title}</h3>
          {post.hasImage && <span className="image-tag">📷</span>}
        </div>

        <div className="card-footer">
          <span className="server">{post.serverName} {post.serverNumber}</span>
          <span className="nickname">{post.writerNickname}</span>
          <span className="date">{post.createdAt}</span>
        </div>
      </div>
    </div>
  );
};

export default TradePostCard;