import React from 'react'

interface Comment {
    _id: string
    text: string
  }

const Comment = ({comment, setComments}: any) => {

    const handleDeleteComment = async() => {
        try {
            await fetch(`http://localhost:3000/api/comment/${comment?._id}`, {method: 'DELETE'})

            setComments((prev) => {
                return [...prev].filter((c) => c?._id !== comment?._id)
            })
            
        } catch (error) {
            console.error(error)
        }
    }

  return (
    <div className="border-2 rounded-md m-5 mb-1 text-neutral-800">Comment
        <span>{comment?.text}</span>
        <button onClick={handleDeleteComment}>delete</button>
    </div>
  )
}

export default Comment