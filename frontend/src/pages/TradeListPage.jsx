import React, { useEffect, useState } from 'react';
import TradeFilterBar from '../components/TradeFilterBar';
import TradePostCard from '../components/TradePostCard';
import TradeWriteModal from '../components/TradeWriteModal';
import '../styles/TradeListPage.css';

const TradeListPage = () => {
  const [filter, setFilter] = useState({
    type: '전체',
    serverName: '전체',
    serverNumber: '전체',
    keyword: '',
  });

  const [showModal, setShowModal] = useState(false);
  const [posts, setPosts] = useState([]);

  // ✅ 서버에서 게시글 목록 불러오기
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch('https://localhost:8443/api/trade/list');
        if (!res.ok) throw new Error('게시글 조회 실패');
        const data = await res.json();
        setPosts(data);
      } catch (err) {
        console.error('게시글 불러오기 에러:', err);
        alert('게시글 목록을 불러오는 데 실패했습니다.');
      }
    };

    fetchPosts();
  }, [showModal]); // 글쓰기 후 닫힐 때 새로고침

  // ✅ 필터링
  const filteredPosts = posts.filter((post) => {
    const matchesType = filter.type === '전체' || post.tradeType === filter.type;
    const matchesServer = filter.serverName === '전체' || post.serverName === filter.serverName;
    const matchesServerNumber = filter.serverNumber === '전체' || post.serverNumber === filter.serverNumber;
    const matchesKeyword =
      filter.keyword === '' ||
      post.title.includes(filter.keyword) ||
      post.content.includes(filter.keyword);

    return matchesType && matchesServer && matchesServerNumber && matchesKeyword;
  });

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  return (
    <div className="trade-list-page">
      <div className="page-header">
        <h2>📦 아이템 게시판</h2>
        <button className="write-button" onClick={() => setShowModal(true)}>+ 글쓰기</button>
      </div>

      <TradeFilterBar filter={filter} onFilterChange={handleFilterChange} />

      <div className="post-list">
        {filteredPosts.map((post) => (
          <TradePostCard key={post.postSq} post={post} />
        ))}
      </div>

      {showModal && <TradeWriteModal onClose={() => setShowModal(false)} />}
    </div>
  );
};

export default TradeListPage;