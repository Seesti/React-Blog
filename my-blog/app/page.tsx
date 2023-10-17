import Image from "next/image";
import Link from "next/link";
import BlogPost from "./components/BlogPost";
import Header from "./components/Header";

export async function fetchBlogs() {
  const res = await fetch("http://localhost:3000/api/blog", {
    cache: "no-store",
  });

  return res.json();
}

export default async function Home() {
  const blogs = await fetchBlogs();

  return (
    <main className="h-110">
      <Header></Header>
      <div className="flex flex-col">
          <Link href="/createBlog" className="w-min">
            <button className="text-3xl font-bold m-3 p-1">+</button>
          </Link>
        {blogs?.length > 0 ? blogs.map((blog: any) => (
          <BlogPost key={blog._id} blog={blog} />
            )): <h3>No blogs in database :/</h3>}
      </div>
    </main>
  );
}
