import prisma from "@/lib/db";

import BlogCard from "@/components/blogCard";

interface Author {
  name: string | null;
  email: string | null;
  image: string | null;
}

interface Post {
  title: string | null;
  content: string | null;
  id: string | null;
  createdAt: Date | null;
  author: {
    [key: string]: Author;
  };
}

export default async function Home() {
  const posts = await prisma.post.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      author: {
        select: {
          name: true,
          image: true,
        },
      },
    },
  });

  return (
    <main className="container my-8 space-y-8">
      <h1 className="text-3xl font-bold">
        {!posts ? "Create a new Post" : "Latest Blog"}
      </h1>

      <div className="grid grid-col-2 lg:grid-cols-3 gap-8">
        {posts.map((blog, index) => (
          <BlogCard key={index} blog={blog} />
        ))}
      </div>
    </main>
  );
}
