import mongoose from 'mongoose';

const BlogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        min: 4
    },
    desc: {
        type: String,
        required: true,
        min: 6
    },
    imageUrl: {
        type: String,
        required: true,
    },
    Likes: {
        type: mongoose.Schema.Types.ObjectId,
    }
})

export default mongoose?.models?.Blog || mongoose.model("Blog", BlogSchema)