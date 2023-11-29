import prisma from "@/lib/db";
import DOMPurify from "isomorphic-dompurify";

interface BlogPost {
  params: {
    id: string;
  };
}

export default async function Blogs({ params }: BlogPost) {
  const post = await prisma.post.findFirst({
    where: {
      id: params.id,
    },
    include: {
      author: true,
    },
  });
  if (!post) {
    return null;
  }
  return (
    <div className="container min-h-screen my-8 space-y-8">
      <h1 className="font-bold text-4xl">{post?.title}</h1>
      <div className="flex flex-col space-y-2">
        <div className="font-semibold flex space-x-2 ">
          <span className="text-muted-foreground">Written by:</span>
          <span className="font-bold text-primary">{post?.author?.name}</span>
        </div>
        <div className="text-muted-foreground">
          {Intl.DateTimeFormat("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          }).format(post?.createdAt)}
        </div>
      </div>
      <div
        className="mt-4"
        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post?.content) }}
      />
    </div>
  );
}
