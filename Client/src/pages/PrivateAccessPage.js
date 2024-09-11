import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./PrivateAccessPage.css"; // Optional: CSS for styling
import Header from "../components/Header"; // Header 컴포넌트 임포트

const PrivateAccessPage = () => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { groupId } = useParams(); // Get the groupId from the URL if necessary

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        `/api/groups/${groupId}/verify-password`,
        {
          password: password,
        }
      );

      if (response.status === 200) {
        navigate(`/groups/${groupId}`); // Navigate to the private group page on success
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setError("비밀번호가 일치하지 않습니다. 다시 시도해주세요.");
      } else {
        setError("문제가 발생했습니다. 다시 시도해주세요.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Header /> {/* 화면 상단에 헤더 추가 */}
      <div className="private-access-container">
        <h1 className="title">비공개 그룹</h1>
        <p className="description">
          비공개 그룹에 접근하기 위해 비밀번호 입력이 필요합니다.
        </p>

        <form onSubmit={handleSubmit} className="password-form">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="그룹 비밀번호를 입력해 주세요"
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
  );
};

export default PrivateAccessPage;
