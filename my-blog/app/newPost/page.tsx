"use client";
import React, { useState } from "react";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.bubble.css'

const newPost = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("")

  return (
    <div className="">
      <input className="m-2 text-3xl font-bold" type="text" placeholder="Title" />
      <div className="">
        <button className="border-2 rounded-full p-1 m-3 text-3xl w-8 h-8 flex items-center justify-center text-neutral-300">+</button>
        {open && (
          <div>
            <button>Image</button>
            <button>Video</button>
          </div>
        )}
        <ReactQuill className="w-full" theme="bubble" value={value} onChange={setValue} placeholder="Write a blog..." />
        <button className="border 2 rounded 2 bg-green-600 text-white font-extrabold p-1 text-m m-2">Publish</button>
      </div>
    </div>
  );
};

export default newPost;
