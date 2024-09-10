import React, { useState, useEffect } from "react";
import PublicCard from "./PublicCard"; // 기존 그룹 카드 컴포넌트
import { fetchPrivateGroups } from "../api"; // 비공개 그룹 데이터를 가져오는 API 함수
import { useNavigate } from "react-router-dom";
import { ReactComponent as NoGroupIconPrivate } from "../assets/icon.svg";
import CreateGroupButton from "../components/CreateGroupButton";

const PrivateGroupList = ({ sortKey, keyword }) => {
  const [groups, setGroups] = useState([]);
  const [hasMore, setHasMore] = useState(true); // 더 이상 로드할 데이터가 없을 경우 false로 설정
  const [loading, setLoading] = useState(false); // 데이터를 로드 중일 때 true로 설정
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    const loadGroups = async () => {
      setLoading(true);
      try {
        const response = await fetchPrivateGroups({
          sortBy: sortKey,
          keyword,
          page,
          pageSize: 10,
        });

        // 데이터를 받아온 후 정렬 로직 추가
        let fetchedGroups = response.data;

        const sortedGroups = [...fetchedGroups].sort((a, b) => {
          if (sortKey === "likes") {
            return b.likeCount - a.likeCount;
          } else if (sortKey === "recent") {
            return new Date(b.createdAt) - new Date(a.createdAt);
          } else if (sortKey === "post") {
            return b.postCount - a.postCount;
          } else if (sortKey === "badge") {
            return b.badgeCount - a.badgeCount;
          }
          return 0;
        });

        setGroups((prevGroups) => [...prevGroups, ...sortedGroups]);
        setHasMore(response.currentPage < response.totalPages);
      } catch (error) {
        console.error("Failed to load private groups:", error);
      } finally {
        setLoading(false);
      }
    };

    loadGroups();
  }, [sortKey, keyword, page]);

  const loadMore = () => {
    if (!hasMore || loading) return;

    setPage((prevPage) => prevPage + 1);
  };

  return (
    <>
      {groups.length === 0 && !loading ? (
        <div className="empty-state-container">
          <NoGroupIconPrivate className="no-group-icon" />
          <p className="empty-state-message">등록된 비공개 그룹이 없습니다.</p>
          <p className="empty-state-submessage">
            가장 먼저 그룹을 만들어보세요!
          </p>
          <div className="create-button-wrapper">
            <CreateGroupButton className="empty-create-group-button" />
          </div>
        </div>
      ) : (
        <div className="group-list-container">
          {groups.map((group) => (
            <PublicCard
              key={group.id}
              group={group}
              showBadges={false}
              showImage={false}
              onClick={() => navigate(`/groups/private/${group.id}`)}
            />
          ))}
        </div>
      )}
      {hasMore && (
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

export default PrivateGroupList;
