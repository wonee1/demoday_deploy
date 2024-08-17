// PrivateGroupList.js
import React, { useState } from "react";
import PublicCard from "./PublicCard"; // 기존 그룹 카드 컴포넌트

// 비공개 그룹 초기 데이터 (예시)
const privateGroups = [
  {
    id: 1,
    name: "달봉이네 가족",
    isPublic: false,
    daysSinceCreation: 265,
    memories: 8,
    likes: 1.5,
  },
  {
    id: 2,
    name: "달봉이네 가족",
    isPublic: false,
    daysSinceCreation: 265,
    memories: 8,
    likes: 1.5,
  },
  {
    id: 1,
    name: "달봉이네 가족",
    isPublic: false,
    daysSinceCreation: 265,
    memories: 8,
    likes: 1.5,
  },
  {
    id: 1,
    name: "달봉이네 가족",
    isPublic: false,
    daysSinceCreation: 265,
    memories: 8,
    likes: 1.5,
  },
  {
    id: 1,
    name: "달봉이네 가족",
    isPublic: false,
    daysSinceCreation: 265,
    memories: 8,
    likes: 1.5,
  },
  {
    id: 1,
    name: "달봉이네 가족",
    isPublic: false,
    daysSinceCreation: 265,
    memories: 8,
    likes: 1.5,
  },
  {
    id: 1,
    name: "달봉이네 가족",
    isPublic: false,
    daysSinceCreation: 265,
    memories: 8,
    likes: 1.5,
  },
  {
    id: 1,
    name: "달봉이네 가족",
    isPublic: false,
    daysSinceCreation: 265,
    memories: 8,
    likes: 1.5,
  },
  {
    id: 1,
    name: "달봉이네 가족",
    isPublic: false,
    daysSinceCreation: 265,
    memories: 8,
    likes: 1.5,
  },
  {
    id: 1,
    name: "달봉이네 가족",
    isPublic: false,
    daysSinceCreation: 265,
    memories: 8,
    likes: 1.5,
  },
  {
    id: 1,
    name: "달봉이네 가족",
    isPublic: false,
    daysSinceCreation: 265,
    memories: 8,
    likes: 1.5,
  },
  {
    id: 1,
    name: "달봉이네 가족",
    isPublic: false,
    daysSinceCreation: 265,
    memories: 8,
    likes: 1.5,
  },
  {
    id: 1,
    name: "달봉이네 가족",
    isPublic: false,
    daysSinceCreation: 265,
    memories: 8,
    likes: 1.5,
  },
  {
    id: 1,
    name: "달봉이네 가족",
    isPublic: false,
    daysSinceCreation: 265,
    memories: 8,
    likes: 1.5,
  },
  {
    id: 1,
    name: "달봉이네 가족",
    isPublic: false,
    daysSinceCreation: 265,
    memories: 8,
    likes: 1.5,
  },
  // 더 많은 비공개 그룹을 추가하세요.
];

const PrivateGroupList = () => {
  const [groups, setGroups] = useState(privateGroups);
  const [hasMore, setHasMore] = useState(true); // 더 이상 로드할 데이터가 없을 경우 false로 설정
  const [loading, setLoading] = useState(false); // 데이터를 로드 중일 때 true로 설정

  const loadMore = async () => {
    if (!hasMore || loading) return; // 이미 로드 중이거나 더 이상 로드할 데이터가 없으면 중단

    setLoading(true);
    try {
      // 여기에 실제 API 호출 로직이 들어갈 수 있습니다.
      // 예: const newGroups = await fetchGroups();

      const newGroups = []; // 예시: 하드코딩된 데이터를 사용

      if (newGroups.length === 0) {
        setHasMore(false);
      } else {
        setGroups((prevGroups) => [...prevGroups, ...newGroups]);
      }
    } catch (error) {
      console.error("Failed to load more groups:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <div className="group-list-container">
        {groups.map((group) => (
          <PublicCard key={group.id} group={group} showBadges={false} />
        ))}
      </div>
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
