import React from "react";


const Comment = ({ comment, setComments }: any) => {
  //poistaa kommentit
  const commentDeleteHandler = async () => {
    try {
      await fetch(`http://localhost:3000/api/comment/${comment?._id}`, {
        method: "DELETE",
      });

      //filteroi kommentit pois joiden id sama
      setComments((prev: any) => {
        return [...prev].filter((c) => c?._id !== comment?._id);
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="border-2 rounded-md m-5 text-neutral-800 flex flex-col">
      <h3 className="text-xs m-1">unknown user</h3>
      <span className="text-xl m-1">{comment?.text}</span>
      <button className="hover:border-neutral-800 border-2 rounded-md w-min m-1 mt-4" onClick={commentDeleteHandler}>delete</button>
    </div>
  );
};

export default Comment;
