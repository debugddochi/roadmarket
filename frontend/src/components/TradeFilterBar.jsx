import React from 'react';
import '../styles/TradeFilterBar.css';

const TradeFilterBar = ({ filter, onFilterChange }) => {
  const serverNames = ['라엘', '로웨인', '모리안', '바르테스', '엘드리히', '아퀼라', '마레크', '라디언트', '오르페'];
  const serverNumbers = Array.from({ length: 10 }, (_, i) => i + 1);

  const handleTypeChange = (type) => {
    onFilterChange({ ...filter, type });
  };

  const handleServerChange = (serverName) => {
    onFilterChange({ ...filter, serverName });
  };

  const handleServerNumberChange = (serverNumber) => {
    onFilterChange({ ...filter, serverNumber });
  };

  const handleKeywordChange = (e) => {
    onFilterChange({ ...filter, keyword: e.target.value });
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.target.blur();
    }
  };

  const handleReset = () => {
    onFilterChange({
      type: '전체',
      serverName: '전체',
      serverNumber: '전체',
      keyword: '',
    });
  };

  return (
    <div className="filter-wrapper">
      <div className="filter-group">
        <span className="filter-label">구분</span>
        {['전체', '삽니다', '팝니다'].map((type) => (
          <button
            key={type}
            className={filter.type === type ? 'active' : ''}
            onClick={() => handleTypeChange(type)}
          >
            {type}
          </button>
        ))}
      </div>

      <div className="filter-group">
        <span className="filter-label">서버</span>
        {['전체', ...serverNames].map((server) => (
          <button
            key={server}
            className={filter.serverName === server ? 'active' : ''}
            onClick={() => handleServerChange(server)}
          >
            {server}
          </button>
        ))}
      </div>

      <div className="filter-group">
        <span className="filter-label">서버상세</span>
        {['전체', ...serverNumbers].map((num) => (
          <button
            key={num}
            className={filter.serverNumber === num ? 'active' : ''}
            onClick={() => handleServerNumberChange(num)}
          >
            {num}
          </button>
        ))}
      </div>

      <div className="filter-group search-group">
        <input
          type="text"
          className="search-input"
          placeholder="찾고 싶은 아이템을 입력해 주세요"
          value={filter.keyword}
          onChange={handleKeywordChange}
          onKeyDown={handleKeyDown}
        />
        <button className="reset-button" onClick={handleReset}>초기화</button>
      </div>
    </div>
  );
};

export default TradeFilterBar;