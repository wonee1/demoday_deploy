import React from "react";
import "./PublicCard.css";
import { likeGroup } from "../api";
import { ReactComponent as LikeIcon } from "../assets/icon=flower.svg";
import { useNavigate } from "react-router-dom";

const PublicCard = ({ group, showBadges = true }) => {
  const navigate = useNavigate();

  const handleLike = async (event) => {
    event.stopPropagation();
    try {
      await likeGroup(group.id);
      alert("공감했습니다!");
    } catch (error) {
      console.error("Failed to like group:", error);
    }
  };

  const handleCardClick = () => {
    navigate(`/groups/${group.id}`); // 클릭한 그룹의 ID로 이동
  };

  return (
    <div className="card-container" onClick={handleCardClick}>
      {group.imageUrl && (
        <div className="card-image-container">
          <img
            src={group.imageUrl}
            alt={group.name}
            width="100%"
            height="auto"
          />
        </div>
      )}
      <div className="card-content">
        <div className="card-info">
          <span>D+{group.daysSinceCreation}</span>
          <span>| {group.isPublic ? "공개" : "비공개"}</span>
        </div>
        <h2 className="card-title">{group.name}</h2>
        <p className="card-description">{group.introduction}</p>
        <div className="card-footer">
          {showBadges && (
            <div className="footer-item">
              <span>획득 배지</span>
              <span>{group.badgeCount}</span>
            </div>
          )}
          <div className="footer-item">
            <span>추억</span>
            <span>{group.postCount}</span>
          </div>
          <div className="footer-item">
            <span>그룹 공감</span>
            <div className="like-container" onClick={handleLike}>
              <LikeIcon width="16px" height="16px" />
              <span>{group.likeCount}K</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublicCard;

// import React from "react";
// import "./PublicCard.css";
// import { likeGroup } from "../api"; // 공감하기 API 임포트
// import { ReactComponent as LikeIcon } from "../assets/icon=flower.svg";

// const GroupCard = ({ group, showBadges = true, onClick }) => {
//   const handleLike = async () => {
//     try {
//       await likeGroup(group.id);
//       alert("공감했습니다!");
//       // 여기서 그룹 공감수를 업데이트하는 로직을 추가할 수 있습니다.
//     } catch (error) {
//       console.error("Failed to like group:", error);
//     }
//   };

//   const ImageComponent = group.image;

//   return (
//     <div className="card-container" onClick={onClick}>
//       {ImageComponent && (
//         <div className="card-image-container">
//           {/* <ImageComponent width="100%" height="auto" /> */}
//           <img
//             src={group.imageUrl}
//             alt={group.name}
//             width="100%"
//             height="auto"
//           />
//         </div>
//       )}
//       <div className="card-content">
//         <div className="card-info">
//           <span>D+{group.daysSinceCreation}</span>
//           <span>| {group.isPublic ? "공개" : "비공개"}</span>
//         </div>
//         <h2 className="card-title">{group.name}</h2>
//         <p className="card-description">{group.introduction}</p>
//         <div className="card-footer">
//           {showBadges && (
//             <div className="footer-item">
//               <span>획득 배지</span>
//               <span>{group.badgeCount}</span>
//             </div>
//           )}
//           <div className="footer-item">
//             <span>추억</span>
//             <span>{group.postCount}</span>
//           </div>
//           <div className="footer-item">
//             <span>그룹 공감</span>
//             <div className="like-container" onClick={handleLike}>
//               <LikeIcon width="16px" height="16px" />
//               <span>{group.likeCount}K</span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default GroupCard;
