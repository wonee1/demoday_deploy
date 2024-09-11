import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./PrivateMemoryAccess.css"; // Optional: Add styling
import Header from "../components/Header";
const PrivateMemoryAccess = () => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { postId } = useParams();
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        `/api/posts/${postId}/verify-password`,
        {
          password: password,
        }
      );

      if (response.status === 200) {
        navigate(`/posts/${postId}`); // Navigate to the private memory page on success
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setError("비밀번호가 틀렸습니다. 다시 시도해주세요.");
      } else {
        setError("문제가 발생했습니다. 다시 시도해주세요.");
      }
    } finally {
      setLoading(false);
    }
  };
  const onClose = () => {
    navigate(-1); // Redirect to homepage or another route when closing
  };

  return (
    <>
      {/* Make sure Header is outside of the modal */}
      <Header />
      <div className="private-memory-access-container">
        <div className="private-memory-access-content">
          <button className="close-button" onClick={onClose}>
            &times;
          </button>
          <h1 className="title">비공개 추억</h1>
          <p className="description">
            비공개 추억에 접근하기 위해 권한 확인이 필요합니다.
          </p>

          <form onSubmit={handleSubmit}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="추억 비밀번호를 입력해 주세요"
              className="password-input"
              disabled={loading}
            />
            {error && <p className="error-message">{error}</p>}
            <button type="submit" className="submit-button" disabled={loading}>
              {loading ? "확인 중..." : "제출하기"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
export default PrivateMemoryAccess;
