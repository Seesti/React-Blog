// import { connectToDatabase } from "../../lib/mongodb";
// import Post from "../../models/Post";

// import nc from "next-connect";

// const handler = nc()
//   .use(connectToDatabase)
//   .post(async (req, res) => {
//     try {
//       const { title, content } = req.body;

//       const post = new Post({ title, content });

//       await post.save();

//       res.status(201).json({ message: "Post created successfully", post });
//     } catch (error) {
//       res.status(500).json({ message: error.message });
//     }
//   });

// export default handler;
