import { GetServerSideProps } from "next";
import { MongoClient, ObjectId } from "mongodb";
import { useState } from "react";

type Post = {
  _id: string;
  title: string;
  content: string;
};

type PostPageProps = {
  post: Post;
};

const PostPage = ({ post }: PostPageProps) => {
  const [postData, setPostData] = useState<Post>(post);

  // You can also use other React hooks or components to display or manipulate the data
  return (
    <div>
      <h1>{postData.title}</h1>
      <p>{postData.content}</p>
    </div>
  );
};

// Define the getServerSideProps function that fetches the data from MongoDB
export const getServerSideProps: GetServerSideProps = async (context) => {
  // Get the id parameter from the context query
  const { id } = context.query;

  // Connect to MongoDB using your connection string
  const client = await MongoClient.connect(
    "mongodb+srv://<username>:<password>@<cluster>/<database>?retryWrites=true&w=majority"
  );

  // Select the database and collection you want to query
  const db = client.db("posts");
  const postsCollection = db.collection("posts");

  // Find the document that matches the id parameter
  const post = await postsCollection.findOne({ _id: new ObjectId(id as string) });

  // Close the connection to MongoDB
  client.close();

  // Return the data as props for your component
  return {
    props: {
      post: {
        _id: post._id.toString(),
        title: post.title,
        content: post.content,
      },
    },
  };
};

// Export your component as default
export default PostPage;