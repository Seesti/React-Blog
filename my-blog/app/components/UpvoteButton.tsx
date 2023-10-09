"use client";
import React, { useState } from "react";

const UpvoteButton = () => {

const [likes, setLikes] = useState(0)
const [liked, setLiked] = useState(false)



  return (
    <div>
      <button className='btn py-0 ml-5 '
        onClick={() => {
          setLikes(likes + 1);
          setLiked(true)
        }}
      >{likes} Like</button>
    </div>
  );
};

export default UpvoteButton;
