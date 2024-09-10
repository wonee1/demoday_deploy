import React, { useEffect, useState } from "react";
import axios from "axios";
import "./MemoryList.css";
import emptyIcon from "../assets/type=memory.svg";
import LikeIcon from "../assets/icon=flower.svg";
import CommentIcon from "../assets/icon=comment.svg";
import { useNavigate } from "react-router-dom";

const MemoryList = ({ groupId, isPublic, sortBy = "likes", keyword }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`/api/groups/${groupId}/posts`, {
          params: {
            isPublic,
            sortBy,
            page,
            pageSize: 10,
            keyword,
          },
        });

        let fetchedPosts = response.data.data;

        // 정렬 로직
        const sortedPosts = [...fetchedPosts].sort((a, b) => {
          if (sortBy === "likes") {
            return b.likeCount - a.likeCount;
          } else if (sortBy === "recent") {
            return new Date(b.moment) - new Date(a.moment);
          } else if (sortBy === "comment") {
            return b.commentCount - a.commentCount;
          }
          return 0;
        });

        setPosts(sortedPosts); // 정렬된 게시물을 상태로 설정
        setTotalPages(response.data.totalPages);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (groupId) {
      fetchPosts();
    }
  }, [groupId, isPublic, sortBy, keyword, page]); // 여기서 sortBy가 "likes"로 설정되어 있으면 기본 정렬 적용

  const handleCardClick = (postId) => {
    navigate(`/posts/${postId}`); // 게시물 클릭 시 해당 게시물로 이동
  };

  const handleUploadClick = () => {
    if (groupId) {
      navigate(`/groups/${groupId}/upload-memory`);
    } else {
      alert("그룹 ID가 없습니다.");
    }
  };

  return (
    <div className="public-memory-list">
      {posts.length > 0 ? (
        posts.map((post) => (
          <div
            key={post.id}
            className="memory-card"
            onClick={() => handleCardClick(post.id)}
          >
            <img src={post.imageUrl} alt={post.title} />
            <div className="memory-info">
              <p className="nickname">
                {post.nickname} <span className="pipe">|</span>
                <span className="public-status">
                  {post.isPublic ? "공개" : "비공개"}
                </span>
              </p>
              <h2>{post.title}</h2>
              <div className="tags">
                {post.tags.map((tag) => `#${tag}`).join(" ")}
              </div>
              <div className="like-comment-container">
                <p className="moment">
                  {post.location} ·{" "}
                  {new Date(post.moment).toISOString().split("T")[0]}
                </p>
                <div className="like-comment">
                  <span>
                    <img src={LikeIcon} alt="Like" />
                    {post.likeCount}
                  </span>
                  <span>
                    <img src={CommentIcon} alt="Comment" />
                    {post.commentCount}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="empty-state">
          <img src={emptyIcon} alt="Empty" />
          <button onClick={handleUploadClick}>추억 올리기</button>
        </div>
      )}
    </div>
  );
};

export default MemoryList;
