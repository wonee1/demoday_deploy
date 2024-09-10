import React, { useState } from "react";
import "./CommentModal.css"; // Import the CSS file

const CommentModal = ({ isOpen, onClose, onSubmit, postId }) => {
  const [nickname, setNickname] = useState("");
  const [comment, setComment] = useState("");
  const [password, setPassword] = useState("");
  // postId 디버깅 로그 추가
  console.log("Post ID in CommentModal:", postId);
  const handleSubmit = async () => {
    try {
      const requestBody = {
        nickname,
        content: comment,
        password,
      };

      const response = await fetch(`/api/posts/${postId}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error submitting comment:", errorData);
        alert("댓글 등록에 실패했습니다. 다시 시도해 주세요.");
        return;
      }

      const responseData = await response.json();
      console.log("Comment submitted successfully:", responseData);

      alert("댓글이 성공적으로 등록되었습니다!");
      // 댓글이 성공적으로 등록된 후 입력 필드를 초기화합니다.
      setNickname("");
      setComment("");
      setPassword("");

      onSubmit(responseData);
      onClose();
    } catch (error) {
      console.error("Error submitting comment:", error);
      alert("댓글 등록 중 오류가 발생했습니다. 다시 시도해 주세요.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content-comment">
        <button className="comment-modal-close" onClick={onClose}>
          &times;
        </button>
        <h2 className="comment-title">댓글 등록</h2>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="form-group-comment">
            <label htmlFor="nickname">닉네임</label>
            <input
              type="text"
              id="nickname"
              placeholder="닉네임을 입력해 주세요"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              required
            />
          </div>
          <div className="form-group-comment">
            <label htmlFor="comment">댓글</label>
            <textarea
              id="comment"
              placeholder="댓글을 입력해 주세요"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              required
            ></textarea>
          </div>
          <div className="form-group-comment">
            <label htmlFor="password">비밀번호 생성</label>
            <input
              type="password"
              id="password"
              placeholder="댓글 비밀번호를 생성해 주세요"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="submit-button-comment"
            onClick={handleSubmit}
          >
            등록하기
          </button>
        </form>
      </div>
    </div>
  );
};

export default CommentModal;
