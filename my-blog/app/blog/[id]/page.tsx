"use client";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Comment from "../../components/Comment";

interface Comment {
  _id: string
  text: string
}

const BlogData = (ctx: any) => {
  //blog datan state declaration
  const [blogData, setBlogData] = useState<any>("");
  const [comments, setComments] = useState<Comment[]>([])
  const router = useRouter();

  useEffect(() => {
    async function fetchComments(){
      const res = await fetch(`http://localhost/api/comment/${ctx.params.id}`, { cache: 'no-store'})
      const comments = await res.json()

      setComments(comments)
    }
    fetchComments()
  }, [])

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

        if(res.ok) {
            router.push('/')
        }
      }
    } catch (error) {}
  };

  return (
    <div className="m-xl">
      <h1 className="text-m">{blogData?.title}</h1>
      <p dangerouslySetInnerHTML={{ __html: blogData?.desc }}></p>
      <div className="">
        <Link href={`/blog/edit/${ctx.params.id}`}>Edit</Link>
        <button
          type="button"
          onClick={deleteHandler}
          className="border-2 rounded-full p-1 m-3 text-3xl w-8 h-8 flex items-center justify-center text-neutral-300"
        >
          X
        </button>
        <div className="border-2 hover:border-neutral-800 rounded-md m-5 mb-1 text-neutral-800">
          <h3>
          comment section
          </h3>
          <div className="border-2 hover:border-neutral-800 rounded-md m-5 mb-1 text-neutral-800">
          <input type="text" placeholder="Comment..." onChange={(e:any) => setComments(e.target.value)}/>
          <button>Post</button>
          </div>
          <div>
            {
              comments?.length > 0 ? comments.map((comment:any) =>(
                <Comment key ={comment._id} comment= {comment} setComments={setComments} />
              )) : <h4>Be the first to leave a comment!</h4>
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogData;
