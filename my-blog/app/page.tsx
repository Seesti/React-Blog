import Image from "next/image";
import Link from "next/link";
import BlogPost from "./components/BlogPost";
import Header from "./components/Header";

export default function Home() {
  return (
    <main className="h-110">
      <Header></Header>
      <div className="flex flex-col">
      <Link href='/newPost'>
        <button className="text-3xl font-bold m-3 p-1">+</button>
      </Link>
      <BlogPost />
      </div>
    </main>
  );
}
