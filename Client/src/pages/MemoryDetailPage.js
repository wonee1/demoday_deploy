import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import "./MemoryDetailPage.css";
import LikeIcon from "../assets/icon=flower.svg";
import CommentIcon from "../assets/icon=comment.svg";
import MemoryEditModal from "../components/MemoryEditModal";
import MemoryDeleteModal from "../components/MemoryDeleteModal";
import CommentModal from "../components/CommentModal";
import CommentEditModal from "../components/CommentEditModal";
import CommentDeleteModal from "../components/CommentDeleteModal";
import EditIcon from "../assets/icon=edit.svg";
import DeleteIcon from "../assets/icon=delete.svg";

const MemoryDetailPage = () => {
  const { postId } = useParams(); // postId 경로 파라미터 받기
  const [memoryDetail, setMemoryDetail] = useState(null); // 게시물 상세 정보 상태
  const [comments, setComments] = useState([]); // 댓글 상태
  const [totalComments, setTotalComments] = useState(0); // 전체 댓글 개수
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // 수정 모달 상태
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // 삭제 모달 상태
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false); // 댓글 작성 모달 상태
  const [isCommentEditModalOpen, setIsCommentEditModalOpen] = useState(false); // 댓글 수정 모달 상태
  const [isCommentDeleteModalOpen, setIsCommentDeleteModalOpen] =
    useState(false); // 댓글 삭제 모달 상태
  const [currentComment, setCurrentComment] = useState(null); // 현재 수정/삭제할 댓글 상태
  const [page, setPage] = useState(1); // 현재 페이지 상태
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 3; // 한 페이지에 보여줄 댓글 개수

  // 게시물 상세 정보 가져오기
  const fetchMemoryDetail = useCallback(async () => {
    try {
      const response = await axios.get(`/api/posts/${postId}`); // postId로 API 호출
      setMemoryDetail(response.data); // 응답 데이터를 상태에 저장
    } catch (error) {
      console.error("게시글을 불러오는 중 오류 발생:", error);
    }
  }, [postId]);

  // 댓글 가져오기
  const fetchComments = useCallback(async () => {
    try {
      const response = await axios.get(`/api/posts/${postId}/comments`, {
        params: { page, pageSize }, // 한 페이지에 3개의 댓글씩 가져옴
      });
      setComments(response.data.data);
      setTotalPages(response.data.totalPages);
      setTotalComments(response.data.totalItemCount);
    } catch (error) {
      console.error("댓글을 불러오는 중 오류 발생:", error);
    }
  }, [postId, page]);

  // 컴포넌트 마운트 시 데이터 가져오기
  useEffect(() => {
    fetchMemoryDetail(); // 게시물 상세 정보 가져오기
    fetchComments(); // 댓글 정보 가져오기
  }, [fetchMemoryDetail, fetchComments]);

  // 공감(좋아요) 기능
  const handleLikeButtonClick = async () => {
    try {
      await axios.post(`/api/posts/${postId}/like`); // 공감 API 호출
      fetchMemoryDetail(); // 공감 후 상세 정보 다시 불러오기 (공감 수 업데이트)
    } catch (error) {
      console.error("공감 보내기 실패:", error);
    }
  };

  // 댓글 수정 처리 함수
  const handleCommentEdit = (updatedComment) => {
    setComments((prevComments) =>
      prevComments.map((comment) =>
        comment.id === updatedComment.id ? updatedComment : comment
      )
    );
    setIsCommentEditModalOpen(false); // 수정 모달 닫기
  };

  // 댓글 등록 처리 함수
  const handleCommentSubmit = (newComment) => {
    const updatedComments = [newComment, ...comments]; // 새로운 댓글 추가
    setComments(updatedComments); // 전체 댓글 목록을 업데이트
    setTotalComments(totalComments + 1); // 전체 댓글 수 증가
    setTotalPages(Math.ceil((totalComments + 1) / pageSize)); // 페이지 수 재계산
    setPage(1); // 첫 페이지로 이동
    setIsCommentModalOpen(false); // 모달 닫기
  };

  // 댓글 삭제 처리 함수
  const handleCommentDelete = (commentId) => {
    const updatedComments = comments.filter(
      (comment) => comment.id !== commentId
    );
    setComments(updatedComments.slice(0, pageSize)); // 현재 페이지의 댓글 목록 업데이트
    setTotalComments(totalComments - 1); // 전체 댓글 수 감소
    setTotalPages(Math.ceil((totalComments - 1) / pageSize)); // 페이지 수 재계산
    if (updatedComments.length === 0 && page > 1) {
      setPage(page - 1); // 페이지가 비었을 경우 이전 페이지로 이동
    }
    setIsCommentDeleteModalOpen(false); // 모달 닫기
  };

  // 모달 열기/닫기 핸들러
  const handleEditButtonClick = () => {
    setIsEditModalOpen(true);
  };
  const handleDeleteButtonClick = () => {
    setIsDeleteModalOpen(true);
  };
  const handleCommentButtonClick = () => {
    setIsCommentModalOpen(true);
  };
  const handleCommentEditButtonClick = (comment) => {
    setCurrentComment(comment);
    setIsCommentEditModalOpen(true);
  };
  const handleCommentDeleteButtonClick = (comment) => {
    setCurrentComment(comment);
    setIsCommentDeleteModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsEditModalOpen(false);
    setIsDeleteModalOpen(false);
    setIsCommentModalOpen(false);
    setIsCommentEditModalOpen(false);
    setIsCommentDeleteModalOpen(false);
  };
  const handlePageChange = (newPage) => {
    setPage(newPage);
    fetchComments(); // 새로운 페이지에 대한 댓글 데이터를 가져옵니다.
  };

  // 게시물 정보가 아직 로드되지 않은 경우
  if (!memoryDetail) {
    return <div>게시글을 불러오는 중입니다...</div>;
  }

  return (
    <div className="memory-detail-page">
      <Header />
      <div className="memory-card-detail">
        {/* 게시물 상세 정보 렌더링 */}
        <div className="memory-header">
          <div className="memory-header-left">
            <p className="nickname">{memoryDetail.nickname}</p>
            <span className="pipe">|</span>
            <span className="public-status">
              {memoryDetail.isPublic ? "공개" : "비공개"}
            </span>
          </div>
          <div className="memory-header-right actions">
            <span className="edit-link" onClick={handleEditButtonClick}>
              추억 수정하기
            </span>
            <span className="delete-link" onClick={handleDeleteButtonClick}>
              추억 삭제하기
            </span>
          </div>
        </div>
        <h1>{memoryDetail.title}</h1>
        <div className="tags">{memoryDetail.tags.join(" ")}</div>
        <div className="memory-meta">
          <div className="memory-meta-left">
            <p className="moment">
              {memoryDetail.location} ·{" "}
              {new Date(memoryDetail.moment).toISOString().split("T")[0]}
            </p>
            <div className="memory-icons">
              <span>
                <img src={LikeIcon} alt="Like" />
                {memoryDetail.likeCount}
              </span>
              <span>
                <img src={CommentIcon} alt="Comment" />
                {totalComments} {/* 전체 댓글 개수 표시 */}
              </span>
            </div>
          </div>
          <div className="memory-meta-right">
            <button className="like-button" onClick={handleLikeButtonClick}>
              <img src={LikeIcon} alt="flower icon" className="flower-icon" />
              공감 보내기
            </button>
          </div>
        </div>
        <div className="memory-divider"></div>
        <img src={memoryDetail.imageUrl} alt={memoryDetail.title} />
        <div className="memory-info">
          <p dangerouslySetInnerHTML={{ __html: memoryDetail.content }} />
        </div>
        <button className="comment-button" onClick={handleCommentButtonClick}>
          댓글 등록하기
        </button>
      </div>

      {/* 댓글 목록 */}
      <div className="comments-section">
        <h2>댓글 {totalComments}</h2>{" "}
        {/* 전체 댓글 개수를 페이지 상관없이 표시 */}
        <div className="memory-divider2"></div>
        {comments.length > 0 ? (
          comments.map((comment, index) => (
            <div key={index} className="comment">
              <div className="comment-text">
                <span className="comment-nickname">{comment.nickname}</span>
                <span className="comment-date">
                  {new Date(comment.createdAt).toLocaleDateString()}
                </span>
                <p>{comment.content}</p>
              </div>
              <div className="comment-actions">
                <img
                  src={EditIcon}
                  alt="Edit"
                  className="edit-icon"
                  onClick={() => handleCommentEditButtonClick(comment)}
                />
                <img
                  src={DeleteIcon}
                  alt="Delete"
                  className="delete-icon"
                  onClick={() => handleCommentDeleteButtonClick(comment)}
                />
              </div>
            </div>
          ))
        ) : (
          <div className="no-comments">
            <p className="primary-message">등록된 댓글이 없습니다.</p>
            <p className="secondary-message">가장 먼저 댓글을 등록해 보세요!</p>
          </div>
        )}
        {/* 페이지네이션 */}
        <div className="pagination">
          <button
            className="arrow"
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
          >
            &lt;
          </button>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              className={page === index + 1 ? "active" : ""}
            >
              {index + 1}
            </button>
          ))}
          <button
            className="arrow"
            onClick={() => setPage(page + 1)}
            disabled={page === totalPages}
          >
            &gt;
          </button>
        </div>
      </div>

      {/* 모달들 */}
      <MemoryEditModal
        isOpen={isEditModalOpen}
        onClose={handleCloseModal}
        postId={postId} // postId를 CommentModal에 전달
        memoryDetails={memoryDetail}
      />
      <MemoryDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={handleCloseModal}
        postId={postId} // postId를 CommentModal에 전달
      />
      <CommentModal
        isOpen={isCommentModalOpen}
        onClose={handleCloseModal}
        postId={postId} // postId를 CommentModal에 전달
        onSubmit={handleCommentSubmit}
      />
      <CommentEditModal
        isOpen={isCommentEditModalOpen}
        onClose={handleCloseModal}
        commentId={currentComment?.id} // 선택된 댓글의 ID를 전달
        onSubmit={handleCommentEdit} // 수정 후 처리할 함수
        commentDetails={currentComment} // commentDetails로 현재 선택한 댓글 데이터를 전달
      />
      <CommentDeleteModal
        isOpen={isCommentDeleteModalOpen}
        commentId={currentComment?.id} // 선택된 댓글의 ID를 전달
        onClose={handleCloseModal}
        onDelete={handleCommentDelete}
      />
    </div>
  );
};

export default MemoryDetailPage;
