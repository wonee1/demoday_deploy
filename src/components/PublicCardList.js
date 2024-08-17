import React, { useState, useEffect } from "react";
import "./PublicCardList.css";
import PublicCard from "./PublicCard";
import { fetchGroups } from "../api"; // API 호출 함수 임포트

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
      <div className="group-list-container">
        {groups.map((group) => (
          <PublicCard key={group.id} group={group} />
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

export default PublicCardList;

// import React, { useState, useEffect } from "react";
// import "./PublicCardList.css"; // CSS 파일을 임포트
// import PublicCard from "./PublicCard";
// //import { fetchGroups } from "../api"; // 예시: 실제 API에서 그룹 데이터를 가져오는 함수
// import { ReactComponent as img1 } from "../assets/Rectangle 14.svg";
// import { ReactComponent as img2 } from "../assets/image=img2.svg";
// import { ReactComponent as img3 } from "../assets/Rectangle 22.svg";
// import { ReactComponent as img5 } from "../assets/image=img5.svg";
// import { ReactComponent as img6 } from "../assets/Rectangle 14.svg";
// import { ReactComponent as img7 } from "../assets/Rectangle 22.svg";

// // 초기 카드 데이터
// const initialGroups = [
//   {
//     id: 1,
//     name: "에델바이스",
//     image: img1,
//     description: "서로 한 마음으로 응원하고 아끼는 달봉이네 가족입니다.",
//     isPublic: true,
//     daysSinceCreation: 265,
//     badges: 2,
//     memories: 8,
//     likes: 1.5,
//   },
//   {
//     id: 2,
//     name: "소중한 추억",
//     image: img3,
//     description: "서로 한 마음으로 응원하고 아끼는 달봉이네 가족입니다.",
//     isPublic: true,
//     daysSinceCreation: 265,
//     badges: 2,
//     memories: 8,
//     likes: 1.5,
//   },
//   {
//     id: 3,
//     name: "달봉이네 가족",
//     description: "서로 한 마음으로 응원하고 아끼는 달봉이네 가족입니다.",
//     isPublic: true,
//     daysSinceCreation: 265,
//     badges: 2,
//     memories: 8,
//     likes: 1.5,
//   },
//   {
//     id: 4,
//     name: "달봉이네 가족",
//     image: img2,
//     description: "서로 한 마음으로 응원하고 아끼는 달봉이네 가족입니다.",
//     isPublic: true,
//     daysSinceCreation: 265,
//     badges: 2,
//     memories: 8,
//     likes: 1.5,
//   },
//   {
//     id: 5,
//     name: "에델바이스",
//     image: img1,
//     description: "서로 한 마음으로 응원하고 아끼는 달봉이네 가족입니다.",
//     isPublic: true,
//     daysSinceCreation: 265,
//     badges: 2,
//     memories: 8,
//     likes: 1.5,
//   },
//   {
//     id: 6,
//     name: "달봉이네 가족",
//     image: img2,
//     description: "서로 한 마음으로 응원하고 아끼는 달봉이네 가족입니다.",
//     isPublic: true,
//     daysSinceCreation: 265,
//     badges: 2,
//     memories: 8,
//     likes: 1.5,
//   },
//   {
//     id: 7,
//     name: "소중한 추억",
//     image: img3,
//     description: "서로 한 마음으로 응원하고 아끼는 달봉이네 가족입니다.",
//     isPublic: true,
//     daysSinceCreation: 265,
//     badges: 2,
//     memories: 8,
//     likes: 1.5,
//   },
//   {
//     id: 8,
//     name: "달봉이네 가족",
//     description: "서로 한 마음으로 응원하고 아끼는 달봉이네 가족입니다.",
//     isPublic: true,
//     daysSinceCreation: 265,
//     badges: 2,
//     memories: 8,
//     likes: 1.5,
//   },
//   {
//     id: 9,
//     name: "달봉이네 가족",
//     image: img2,
//     description: "서로 한 마음으로 응원하고 아끼는 달봉이네 가족입니다.",
//     isPublic: true,
//     daysSinceCreation: 265,
//     badges: 2,
//     memories: 8,
//     likes: 1.5,
//   },
//   {
//     id: 10,
//     name: "달봉이네 가족",
//     description: "서로 한 마음으로 응원하고 아끼는 달봉이네 가족입니다.",
//     isPublic: true,
//     daysSinceCreation: 265,
//     badges: 2,
//     memories: 8,
//     likes: 1.5,
//   },
//   {
//     id: 11,
//     name: "에델바이스",
//     image: img1,
//     description: "서로 한 마음으로 응원하고 아끼는 달봉이네 가족입니다.",
//     isPublic: true,
//     daysSinceCreation: 265,
//     badges: 2,
//     memories: 8,
//     likes: 1.5,
//   },
//   {
//     id: 12,
//     name: "달봉이네 가족",
//     image: img2,
//     description: "서로 한 마음으로 응원하고 아끼는 달봉이네 가족입니다.",
//     isPublic: true,
//     daysSinceCreation: 265,
//     badges: 2,
//     memories: 8,
//     likes: 1.5,
//   },
// ];
// // 추가로 필요한 경우 더 많은 초기 데이터를 추가할 수 있습니다.

// // 추가로 로드될 카드 데이터
// const moreGroups = [
//   {
//     id: 8,
//     name: "행복한 시간",
//     image: img5,
//     description: "서로 한 마음으로 응원하고 아끼는 달봉이네 가족입니다.",
//     isPublic: true,
//     daysSinceCreation: 265,
//     badges: 2,
//     memories: 8,
//     likes: 1.5,
//   },
//   {
//     id: 9,
//     name: "행복한 시간",
//     image: img6,
//     description: "서로 한 마음으로 응원하고 아끼는 달봉이네 가족입니다.",
//     isPublic: true,
//     daysSinceCreation: 265,
//     badges: 2,
//     memories: 8,
//     likes: 1.5,
//   },
//   {
//     id: 10,
//     name: "행복한 시간",
//     image: img7,
//     description: "서로 한 마음으로 응원하고 아끼는 달봉이네 가족입니다.",
//     isPublic: true,
//     daysSinceCreation: 265,
//     badges: 2,
//     memories: 8,
//     likes: 1.5,
//   },
// ];

// const GroupList = ({ sortKey }) => {
//   const [groups, setGroups] = useState(initialGroups);
//   const [hasMore, setHasMore] = useState(true);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     const sortedGroups = [...groups].sort((a, b) => {
//       if (sortKey === "likes") {
//         return b.likes - a.likes;
//       } else if (sortKey === "recent") {
//         return b.daysSinceCreation - a.daysSinceCreation;
//       } else if (sortKey === "post") {
//         return b.memories - a.memories;
//       } else if (sortKey === "badge") {
//         return b.badges - a.badges;
//       } else {
//         return 0;
//       }
//     });
//     setGroups(sortedGroups);
//   }, [sortKey, groups]);

//   const loadMore = async () => {
//     if (!hasMore || loading) return;

//     setLoading(true);
//     try {
//       const newGroups = moreGroups;

//       if (newGroups.length === 0) {
//         setHasMore(false);
//       } else {
//         setGroups((prevGroups) => [...prevGroups, ...newGroups]);
//       }
//     } catch (error) {
//       console.error("Failed to load more groups:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleCardClick = (group) => {
//     alert(`You clicked on ${group.name}`);
//   };

//   return (
//     <>
//       <div className="group-list-container">
//         {groups.map((group) => (
//           <div key={group.id} className="group-list-item">
//             <PublicCard group={group} onClick={() => handleCardClick(group)} />
//           </div>
//         ))}
//       </div>
//       {hasMore && (
//         <button
//           className="load-more-button"
//           onClick={loadMore}
//           disabled={loading}
//         >
//           {loading ? "로딩 중..." : "더보기"}
//         </button>
//       )}
//     </>
//   );
// };

// export default GroupList;
