"use client";
import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";
import axios from "axios";
import { useRouter } from "next/navigation";

const createBlog = () => {

  //täyttökenttien statet
  const [open, setOpen] = useState(false);
  const [desc, setDesc] = useState("");
  const [title, setTitle] = useState("");
  const router = useRouter()

  //formin submittaus / blogin julkaisu funktio
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const res = await fetch(`http://localhost:3000/api/blog`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ title, desc }),
      });
      const blog = await res.json();

      router.push(`/blog/${blog._id}`)
    } catch (error) {}
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
      onChange={(e) => setTitle(e.target.value)}
        className="m-2 text-3xl font-bold"
        type="text"
        placeholder="Title"
      />
      <div className="">
        <div className="flex items-center">
          <button
            type="button"
            onClick={() => setOpen(!open)}
            className="border-2 rounded-full p-1 m-3 text-3xl w-8 h-8 flex items-center justify-center text-neutral-300"
          >
            +
          </button>
          {open && (
            <div>
              <button
                type="button"
                className="border 2 rounded 2 bg-neutral-300 text-white font-extrabold p-1 text-m m-2 cursor-not-allowed"
              >
                Image
              </button>
              <button
                type="button"
                className="border 2 rounded 2 bg-neutral-300 text-white font-extrabold p-1 text-m m-2 cursor-not-allowed"
              >
                Video
              </button>
            </div>
          )}
        </div>
        <ReactQuill
          className="w-full"
          theme="bubble"
          value={desc}
          onChange={(value) => setDesc(value)}
          placeholder="Write a blog..."
        />
        <button
          type="submit"
          className="border 2 rounded 2 bg-green-600 text-white font-extrabold p-1 text-m m-2"
        >
          Publish
        </button>
      </div>
    </form>
  );
};

export default createBlog;
