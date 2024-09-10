import React, { useState } from "react";
import axios from "axios";
import "./GroupDeleteModal.css";
import { useNavigate } from "react-router-dom";

const GroupDeleteModal = ({ isOpen, onClose, onDelete, groupId }) => {
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleDelete = async () => {
    try {
      // 그룹 삭제 API 호출
      const response = await axios.delete(`/api/groups/${groupId}`, {
        data: { password: password }, // 비밀번호를 요청 본문에 포함
      });

      if (response.status === 200) {
        // 삭제 성공 처리
        alert("그룹이 성공적으로 삭제되었습니다!");
        onDelete(); // 삭제 후 추가 동작 수행 (PublicDetailPage에서 전달한 onDelete 함수)
        onClose(); // 모달 창 닫기
        navigate("/"); // 삭제 후 그룹 목록 페이지로 이동
      }
    } catch (error) {
      // 삭제 실패 처리
      console.error(
        "그룹 삭제 실패:",
        error.response?.data?.message || error.message
      );

      if (error.response && error.response.status === 403) {
        alert("비밀번호가 틀렸습니다.");
      } else if (error.response && error.response.status === 400) {
        alert("잘못된 요청입니다.");
      } else if (error.response && error.response.status === 404) {
        alert("그룹이 존재하지 않습니다.");
      } else {
        alert("삭제에 실패했습니다. 다시 시도해주세요.");
      }
    }
  };

  return (
    <div className="groupdelete-modal-overlay">
      <div className="groupdelete-modal-content">
        <button className="groupdelete-modal-close" onClick={onClose}>
          &times;
        </button>
        <h2>그룹 삭제</h2>
        <div className="delete-form-group">
          <label>삭제 권한 인증</label>
          <input
            type="password"
            placeholder="그룹 비밀번호를 입력해 주세요"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button className="group-delete-button" onClick={handleDelete}>
          삭제하기
        </button>
      </div>
    </div>
  );
};

export default GroupDeleteModal;
