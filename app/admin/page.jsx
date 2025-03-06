import React from "react";

const page = async () => {
  const data = await fetch("https://saad-fiver.vercel.app/api/sections");
  const posts = await data.json();

  console.log(posts);

  // ini struktur variabel nya
  //   {
  //     "_id": "67c99f02dd51ebc8370b824c",
  //     "title": "exam baru",
  //     "description": "deskripsi",
  //     "sections": [],
  //     "totalQuestions": 2,
  //     "totalTime": 45,
  //     "difficulty": "easy",
  //     "tags": [],
  //     "createdAt": "2025-03-06T13:11:30.095Z",
  //     "updatedAt": "2025-03-06T13:11:30.095Z",
  //     "__v": 0
  // }
  return (
    <ul>
      {posts.data.map((post) => (
        <li key={post._id}>{post.name}</li>
      ))}
    </ul>
  );
};

export default page;
