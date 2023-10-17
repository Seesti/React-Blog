import mongoose from 'mongoose'

const CommentSchema = new mongoose.Schema({
    blogId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Blog",
        required: true
    },
    text: {
        type: String,
        required: true
    }
})

export default mongoose?.models?.Comment || mongoose.model("Comment", CommentSchema)