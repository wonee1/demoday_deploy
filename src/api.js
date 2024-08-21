// src/api.js

// export async function fetchGroups(cursor) {
//   const response = await fetch(`/api/groups?cursor=${cursor}`);
//   if (!response.ok) {
//     throw new Error("Failed to fetch groups");
//   }
//   const data = await response.json();
//   return data;
// }
// src/api.js

// 그룹 목록 조회 API
export async function fetchGroups({
  isPublic,
  sortBy,
  keyword,
  page,
  pageSize,
}) {
  const queryParams = new URLSearchParams({
    isPublic,
    sortBy,
    keyword,
    page,
    pageSize,
  });

  const response = await fetch(`/api/groups?${queryParams.toString()}`);
  if (!response.ok) {
    throw new Error("Failed to fetch groups");
  }
  return await response.json();
}

// src/api.js

export async function fetchPrivateGroups({ sortBy, keyword, page, pageSize }) {
  const queryParams = new URLSearchParams({
    isPublic: false, // 비공개 그룹만 가져오도록 설정
    sortBy,
    keyword,
    page,
    pageSize,
  });

  const response = await fetch(`/api/groups?${queryParams.toString()}`);
  if (!response.ok) {
    throw new Error("Failed to fetch private groups");
  }
  return await response.json();
}

// 그룹 상세 조회 API
export async function fetchGroupDetails(groupId) {
  const response = await fetch(`/api/groups/${groupId}`);
  if (!response.ok) {
    throw new Error("Failed to fetch group details");
  }
  return await response.json();
}

// 그룹 공감하기 API
export async function likeGroup(groupId) {
  const response = await fetch(`/api/groups/${groupId}/like`, {
    method: "POST",
  });
  if (!response.ok) {
    throw new Error("Failed to like group");
  }
  return await response.json();
}

// 그룹 비밀번호 확인 API
export async function verifyGroupPassword(groupId, password) {
  const response = await fetch(`/api/groups/${groupId}/verify-password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password }),
  });
  if (!response.ok) {
    throw new Error("Password verification failed");
  }
  return await response.json();
}
