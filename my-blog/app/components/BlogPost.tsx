import React from "react";
import UpvoteButton from "./UpvoteButton";
import Link from "next/link";

interface post {
  id: number;
  userId: number;
  title: string;
  body: string;
}


const BlogPost = async ({blog: {title, desc, _id}}: any) => {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  const posts: post[] = await res.json();

  return (
    <div className="mt-10">
      <h1 className="text-center font-extrabold text-2xl text-neutral-800 ">
        Posts
      </h1>
      <ul className="border-2 p-5 mx-3 rounded-md">
        {posts.slice(0, 5).map((post) => (
          <div>
            <Link href={'/posts/' + post.id}>
              <li
                className="p-1 border-2 hover:border-neutral-800 rounded-md m-5 mb-1 text-neutral-800 font-semibold"
                key={post.id}
              >
                <h2 className="text-lg">{post.title}</h2>
                <p className="text-sm">{post.body}</p>
              </li>
            </Link>
            <UpvoteButton />
          </div>
        ))}
      </ul>
    </div>
  );
};

export default BlogPost;
