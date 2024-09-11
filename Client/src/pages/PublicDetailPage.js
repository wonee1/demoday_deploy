import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"; // useParams 훅으로 URL에서 groupId를 가져옴
import axios from "axios";
import "./PublicDetailPage.css";
import Header from "../components/Header";
import PublicMemory from "../components/MemoryList";
import GroupEditModal from "../components/GroupEditModal";
import GroupDeleteModal from "../components/GroupDeleteModal";
import MemoryNav from "../components/MemoryNav";
import img2 from "../assets/image=img2.svg";
import LikeIcon from "../assets/icon=flower.svg";
// import badge1 from "../assets/badge1.svg"; // 7일 연속 추억 등록 배지 이미지
// import badge2 from "../assets/badge2.svg"; // 추억 수 20개 이상 등록 배지 이미지
// import badge3 from "../assets/badge3.svg"; // 그룹 공감 1만 개 이상 받기 배지 이미지

const PublicDetailPage = () => {
  const { groupId } = useParams(); // URL에서 그룹 ID 가져옴
  const [groupDetail, setGroupDetail] = useState(null);
  const [posts, setPosts] = useState([]); // Changed from memories to posts
  const [isGroupEditModalOpen, setIsGroupEditModalOpen] = useState(false);
  const [isGroupDeleteModalOpen, setIsGroupDeleteModalOpen] = useState(false);
  const [isPublic, setIsPublic] = useState(true);
  const [sortBy, setSortBy] = useState("latest");
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [badges, setBadges] = useState([]);
  const [keyword, setKeyword] = useState(""); // 검색어 상태 추가
  const navigate = useNavigate(); // 페이지 리다이렉트를 위한 useNavigate 훅
  // 검색어 입력 시 호출되는 함수
  const handleSearch = (searchTerm) => {
    setKeyword(searchTerm); // 검색어 상태 업데이트
    setPage(1); // 검색 시 페이지를 1로 리셋
  };

  // groupId가 바뀔 때마다 groupDetail과 posts를 새로 fetch
  useEffect(() => {
    if (groupId) {
      console.log("Fetching details for group ID:", groupId); // 디버깅용 로그 추가
      fetchGroupDetail();
      fetchPosts(); // Updated to fetchPosts
    }
  }, [groupId, isPublic, sortBy, page]); // groupId가 바뀔 때마다 실행되도록 의존성 추가

  const fetchGroupDetail = async () => {
    try {
      const response = await axios.get(`/api/groups/${groupId}`);
      if (response.status === 200) {
        setGroupDetail(response.data);
        console.log("Fetched group details:", response.data); // API 응답 로그
        const newBadges = [];
        // 배지 조건 체크
        if (response.data.postCount >= 20) {
          newBadges.push({ label: "🌼 추억 수 20개 이상 등록" });
        }

        if (response.data.likeCount >= 10000) {
          newBadges.push({
            label: "💖  게시글 공감 1만 개 이상 받기",
          });
        }

        if (response.data.hasMemoryWithLikes >= 10000) {
          newBadges.push({
            label: "👾  7일 연속 추억 등록",
          });
        }

        setBadges(newBadges); // 배지 상태 업데이트
      }
    } catch (error) {
      console.error("그룹 상세 정보 조회 중 오류 발생:", error);
      alert("그룹 상세 정보 조회 중 오류가 발생했습니다.");
    }
  };

  const fetchPosts = async () => {
    // Changed from fetchMemories to fetchPosts
    try {
      const response = await axios.get(`/api/groups/${groupId}/posts`, {
        params: {
          page,
          pageSize,
          sortBy,
          isPublic,
          keyword,
        },
      });
      if (response.status === 200) {
        setPosts(response.data.data); // Changed from setMemories to setPosts
        console.log("Fetched posts:", response.data.data); // API 응답 로그
      }
    } catch (error) {
      console.error("게시글 목록 조회 중 오류 발생:", error);
      alert("게시글 목록 조회 중 오류가 발생했습니다.");
    }
  };

  const handleLikeClick = async () => {
    try {
      const response = await axios.post(`/api/groups/${groupId}/like`);
      if (response.status === 200) {
        alert("공감을 보냈습니다!");
        fetchGroupDetail(); // 공감 후 상세 정보 갱신
      }
    } catch (error) {
      console.error("공감 보내기 중 오류 발생:", error);
      alert("공감 보내기 중 오류가 발생했습니다.");
    }
  };
  const handleDeleteGroup = () => {
    handleCloseModal(); // 삭제 후 모달 닫기
    navigate("/groups"); // 삭제 후 그룹 목록으로 이동
  };
  const handleGroupEditButtonClick = () => {
    setIsGroupEditModalOpen(true);
  };

  const handleGroupDeleteButtonClick = () => {
    setIsGroupDeleteModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsGroupEditModalOpen(false);
    setIsGroupDeleteModalOpen(false);
  };
  // 그룹 정보 수정 후 처리할 함수
  const handleEditGroupSubmit = (updatedDetails) => {
    setGroupDetail(updatedDetails); // 수정된 정보로 상태 업데이트
    alert("그룹 정보가 성공적으로 수정되었습니다.");

    handleCloseModal(); // 모달 닫기
  };
  // 숫자를 K 단위로 변환하는 함수
  const formatCount = (count) => {
    if (count >= 1000) {
      return (count / 1000).toFixed(1) + "K"; // 1000 이상일 때 K로 변환
    }
    return count; // 1000 미만일 때는 그대로 숫자 표시
  };

  if (!groupDetail) return <div>Loading...</div>;

  return (
    <div className="public-detail-page">
      <Header />
      <div className="group-header">
        <img src={groupDetail.imageUrl || img2} alt={groupDetail.name} />
        <div className="group-info">
          <div className="group-details">
            <div>
              <span>
                D+
                {Math.floor(
                  (new Date() - new Date(groupDetail.createdAt)) /
                    (1000 * 60 * 60 * 24)
                )}
              </span>
              <span> | {groupDetail.isPublic ? "공개" : "비공개"}</span>
            </div>
            <div className="action-buttons">
              <button onClick={handleGroupEditButtonClick}>
                그룹 정보 수정하기
              </button>
              <button onClick={handleGroupDeleteButtonClick}>
                그룹 삭제하기
              </button>
            </div>
          </div>
          <div class="group-title-stats">
            <h1 className="group-title">{groupDetail.name}</h1>
            <div className="group-stats">
              <span className="stat-item">추억 : {groupDetail.postCount}</span>
              <span className="pipe">|</span>
              <span className="stat-item">
                그룹 공감 : {formatCount(groupDetail.likeCount)}
              </span>
            </div>
          </div>
          <p className="group-description">{groupDetail.introduction}</p>
          <div className="badges-section">
            <h3>획득 배지 {badges.length}</h3> {/* 배지 개수 추가 */}
            <div className="badges-container">
              {badges.map((badge, index) => (
                <span key={index} className="custom-badge">
                  {badge.label} {/* 배지 텍스트와 아이콘 표시 */}
                </span>
              ))}
            </div>
            <div className="like-button-container">
              <button className="like-button" onClick={handleLikeClick}>
                <img src={LikeIcon} alt="flower icon" className="flower-icon" />{" "}
                공감 보내기
              </button>
            </div>
          </div>
        </div>
      </div>

      <MemoryNav
        groupId={groupId}
        onToggleView={setIsPublic}
        onSortChange={setSortBy}
        onSearch={handleSearch}
      />
      <PublicMemory
        groupId={groupId}
        isPublic={isPublic}
        sortBy={sortBy}
        keyword={keyword}
        posts={posts} // Changed from memories to posts
      />
      <GroupEditModal
        isOpen={isGroupEditModalOpen}
        onClose={handleCloseModal}
        groupDetails={groupDetail}
        onSubmit={handleEditGroupSubmit}
      />
      <GroupDeleteModal
        isOpen={isGroupDeleteModalOpen}
        onClose={handleCloseModal}
        groupId={groupId}
        onDelete={handleDeleteGroup}
      />
    </div>
  );
};

export default PublicDetailPage;
