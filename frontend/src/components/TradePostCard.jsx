import React from 'react';
import '../styles/TradePostCard.css';

const TradePostCard = ({ post }) => {
  return (
    <div className="trade-post-card">
      <div className="card-header">
        {/* ✅ BUY/SELL → 삽니다/팝니다 변환 */}
        <span className={`badge ${post.tradeType === 'BUY' ? 'buy' : 'sell'}`}>
          {post.tradeType === 'BUY' ? '삽니다' : '팝니다'}
        </span>
        <h3 className="title">{post.title}</h3>
        {post.hasImage && <span className="image-tag">📷 이미지 있음</span>}
      </div>

      <p className="content">{post.content}</p>

      <div className="card-footer">
        <span className="server">{post.serverName} {post.serverNumber}</span>
        <span className="nickname">{post.writerNickname}</span>
        <span className="date">{post.createdAt}</span>
      </div>
    </div>
  );
};

export default TradePostCard;