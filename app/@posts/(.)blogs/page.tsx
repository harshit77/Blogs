import prisma from "@/lib/db";
import BlogCard from "@/components/blogCard";

export interface BlogCard {
  title: string | null;
  content: string | null;
  id: string | null;
  createdAt: number | Date | undefined;
  author: {
    name: string | null;
    image: string | null;
  } | null;
}

export default async function Page() {
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
    <div className="container my-8 space-y-8">
      <h1 className="text-3xl font-bold">
        {!posts ? "Create a new Post" : "Latest Blog Posts"}
      </h1>

      <div className="grid grid-col-2 lg:grid-cols-3 gap-8">
        {posts.map((blog, index) => (
          <BlogCard key={index} blog={blog} />
        ))}
      </div>
    </div>
  );
}
