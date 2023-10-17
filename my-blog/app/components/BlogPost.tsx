import React from "react";
import Link from "next/link";

const BlogPost = async ({ blog }: any) => {
  return (
    <Link href={`http://localhost:3000/blog/${blog._id}`}>
    <div
        className="p-1 border-2 hover:border-neutral-800 rounded-md m-5 mb-1 text-neutral-800 font-semibold"
        key={blog._id}
      >
        <h2 className="text-lg">{blog.title}</h2>
        <span
          className="m-3"
          dangerouslySetInnerHTML={{ __html: blog?.desc }}
        ></span>
      </div>
    </Link>
  );
};

export default BlogPost;
