"use client";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Comment from "../../components/Comment";



const BlogData = (ctx: any) => {
  //blog datan state declaration
  const [blogData, setBlogData] = useState<any>("");
  const [comments, setComments] = useState<any>([]);
  const [commentText, setCommentText] = useState<any>("");
  const router = useRouter();

  useEffect(() => {
    async function fetchComments() {
      const res = await fetch(`http://localhost:3000/api/comment/${ctx.params.id}`, {
        cache: "no-store"
      });
      const commentsRes = await res.json();

      setComments(commentsRes);
    }
    fetchComments();
  }, []);
  
  useEffect(() => {
    async function fetchBlog() {
      const res = await fetch(
        `http://localhost:3000/api/blog/${ctx.params.id}`,
        {
          cache: "no-store",
        }
      );
      const blog = await res.json();

      setBlogData(blog);
    }
    fetchBlog();
  }, []);



  const deleteHandler = async () => {
    try {
      const confirmModal = confirm("Are you sure you want to delete the blog?");

      if (confirmModal) {
        const res = await fetch(
          `http://localhost:3000/api/blog/${ctx.params.id}`,
          {
            method: "DELETE",
          }
        );

        if (res.ok) {
          router.push("/");
        }
      }
    } catch (error) {}
  };

  const handleComment = async () => {
    try {
      const body = { blogId: ctx.params.id, text: commentText };
      const res = await fetch(`http://localhost:3000/api/comment`, {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify(body),
      });

      const newComment = await res.json()

      setComments((prev: any) => {
        return [newComment, ...prev||([])]
      })

      setCommentText("")
    } catch (error) {
    }
  };

  return (
    <div>
      <div className="border-2 hover:border-neutral-800 rounded-md m-5 mb-1 text-neutral-800">
        <div className="m-xl">
          <h1 className="text-3xl font-extrabold m-1">{blogData?.title}</h1>
          <p
            className="m-3"
            dangerouslySetInnerHTML={{ __html: blogData?.desc }}
          ></p>
          <div className="flex">
            <Link
              href={`/blog/edit/${ctx.params.id}`}
              className="border-2  rounded-md m-1 h-min text-neutral-800"
            >
              Edit
            </Link>
            <button
              type="button"
              onClick={deleteHandler}
              className="border-2 rounded-full hover:border-neutral-800 p-1 m-1 text-3xl w-8 h-8 flex items-center justify-center text-neutral-300"
            >
              X
            </button>
          </div>
        </div>
      </div>
      <div className="border-2 rounded-md m-5 mb-1 text-neutral-800">
        <h3>Comment section</h3>
        <div className="">
          <input
            required
            className="m-1"
            type="text"
            placeholder="Comment..."
            value={commentText}
            onChange={(e: any) => setCommentText(e.target.value)}
          />
          <button
            onClick={handleComment}
            className="hover:border-neutral-800 border-2  rounded-md m-5 mb-1 text-neutral-800"
          >
            Post
          </button>
        </div>
        <div>
          {comments?.length > 0 ? (
            comments.map((comment: any) => (
              <Comment
                key={comment._id}
                comment={comment}
                setComments={setComments}
              />
            ))
          ) : (
            <h4>Be the first to leave a comment!</h4>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogData;
