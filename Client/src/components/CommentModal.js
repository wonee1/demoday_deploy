import React, { useState } from "react";

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
        return;
      }

      const responseData = await response.json();
      onSubmit(responseData);
      onClose();
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay-comment">
      <div className="modal-content-comment">
        <h2 className="comment-title">댓글 작성</h2>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="form-group-comment">
            <label htmlFor="nickname">닉네임</label>
            <input
              type="text"
              id="nickname"
              placeholder="닉네임"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              required
            />
          </div>
          <div className="form-group-comment">
            <label htmlFor="comment">댓글</label>
            <textarea
              id="comment"
              placeholder="댓글 내용을 입력하세요"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              required
            ></textarea>
          </div>
          <div className="form-group-comment">
            <label htmlFor="password">비밀번호</label>
            <input
              type="password"
              id="password"
              placeholder="비밀번호"
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
