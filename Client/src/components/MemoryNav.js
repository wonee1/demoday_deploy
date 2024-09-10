import React, { useState, useEffect } from "react";
import "./MemoryNav.css";
import { ReactComponent as SearchIcon } from "../assets/icon=search.svg";
import { useNavigate } from "react-router-dom";
const MemoryNav = ({
  groupId,
  viewPrivate,
  onToggleView,
  onSortChange,
  onSearch,
  onResetPosts,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSort, setSelectedSort] = useState("likes");
  const navigate = useNavigate();
  useEffect(() => {
    onSortChange("likes"); // 페이지가 로드될 때 기본적으로 "공감순" 적용
  }, [onSortChange]);

  const handleButtonClick = (view) => {
    onToggleView(view === "public");

    onResetPosts(); // 게시글 초기화 함수 호출;
  };

  const handleSortChange = (event) => {
    const selected = event.target.value;
    setSelectedSort(selected);
    onSortChange(event.target.value);
  };
  const handleUploadClick = () => {
    if (groupId) {
      console.log("Navigating to upload-memory with groupId:", groupId); // 로그 추가
      navigate(`/groups/${groupId}/upload-memory`);
    } else {
      console.log("No groupId provided");
      alert("그룹 ID가 없습니다.");
    }
  };
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    onSearch(event.target.value); // 검색어가 변경될 때마다 상위 컴포넌트로 전달
  };
  return (
    <div className="memory-header-container">
      <div className="memory-nav-header">
        <h2 className="memory-nav-title">추억 목록</h2>
        <button className="uploadmemory-button" onClick={handleUploadClick}>
          추억 올리기
        </button>
      </div>
      <div className="navbar-container">
        <div className="button-group">
          <button
            className={`nav-button ${!viewPrivate ? "active" : ""}`}
            onClick={() => handleButtonClick("public")}
          >
            공개
          </button>
          <button
            className={`nav-button ${viewPrivate ? "active" : ""}`}
            onClick={() => handleButtonClick("private")}
          >
            비공개
          </button>
        </div>
        <div className="search-container">
          <SearchIcon width="20px" height="20px" />
          <input
            className="search-input"
            placeholder="태그 혹은 그룹명을 검색해 주세요"
            value={searchTerm}
            onChange={handleSearchChange} // 검색어 입력 처리
          />
        </div>
        <select
          className="sort-dropdown"
          value={selectedSort}
          onChange={handleSortChange}
        >
          <option value="likes">공감순</option>
          <option value="recent">최신순</option>
          <option value="comment">댓글순</option>
        </select>
      </div>
    </div>
  );
};
export default MemoryNav;
