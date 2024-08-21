import React, { useState, useEffect } from "react";
import "./PublicCardList.css";
import PublicCard from "./PublicCard";
import { fetchGroups } from "../api"; // API 호출 함수 임포트
import { ReactComponent as NoGroupIcon } from "../assets/type=group.svg"; // 빈 화면 아이콘
import CreateGroupButton from "../components/CreateGroupButton";
const PublicCardList = ({ sortKey, keyword }) => {
  const [groups, setGroups] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const loadGroups = async () => {
      setLoading(true);
      try {
        const response = await fetchGroups({
          isPublic: true,
          sortBy: sortKey,
          keyword,
          page,
          pageSize: 10,
        });
        setGroups((prevGroups) => [...prevGroups, ...response.data]);
        setHasMore(response.currentPage < response.totalPages);
      } catch (error) {
        console.error("Failed to load groups:", error);
      } finally {
        setLoading(false);
      }
    };

    loadGroups();
  }, [sortKey, keyword, page]);

  const loadMore = () => {
    if (hasMore && !loading) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <>
      {groups.length === 0 && !loading ? (
        <div className="empty-state-container">
          <NoGroupIcon className="no-group-icon" />
          <div className="create-button-wrapper">
            <CreateGroupButton className="empty-create-group-button" />
          </div>
        </div>
      ) : (
        <div className="group-list-container">
          {groups.map((group) => (
            <PublicCard key={group.id} group={group} />
          ))}
        </div>
      )}
      {hasMore && groups.length > 0 && (
        <button
          className="load-more-button"
          onClick={loadMore}
          disabled={loading}
        >
          {loading ? "로딩 중..." : "더보기"}
        </button>
      )}
    </>
  );
};

export default PublicCardList;
