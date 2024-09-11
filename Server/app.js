const express = require("express");
const path = require("path");
const cors = require("cors"); // CORS 미들웨어 추가
const app = express();

const groupRoutes = require("./routes/groupRoutes");
const postRoutes = require("./routes/postRoutes");
const imageRoutes = require("./routes/imageRoutes");
const commentRoutes = require("./routes/commentRoutes");

// CORS 미들웨어 적용
app.use(cors()); // 모든 도메인에서의 요청을 허용

// JSON 형식의 요청을 파싱
app.use(express.json());

app.use("/api/groups", groupRoutes); // 그룹 관련 라우트 연결
app.use("/api/groups", postRoutes); // 포스트 관련 라우트 연결
app.use("/api/posts", postRoutes); // '/api/posts' 경로에 연결
app.use("/api/posts", commentRoutes); // 댓글 관련 라우트 연결

// 정적 파일 서빙 (업로드된 이미지에 접근 가능하게 설정)
app.use("/uploads", express.static("uploads"));
app.use("/api/image", imageRoutes); // 이미지 관련 라우트 연결
app.use("/api/comments", commentRoutes); // 댓글 관련 라우트 연결
require("./cronJobs"); // cronJobs.js 파일 실행

// React의 빌드된 정적 파일을 제공
app.use(express.static(path.join(__dirname, "../Client/build")));

// 모든 경로에 대해 React의 index.html을 반환 (React 라우팅 처리)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../Client/build", "index.html"));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
