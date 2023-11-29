import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import Link from "next/link";
import DOMPurify from "isomorphic-dompurify";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function BlogCard({
  blog: { title, content, id, createdAt, author },
}) {
  return (
    <Link key={id} href={`/blogs/${id}`}>
      <Card>
        <CardHeader className="space-y-4">
          <CardTitle>{title}</CardTitle>
          {/* <CardDescription
            className="text-primary font-semibold leading-5 text-md"
            dangerouslySetInnerHTML={{
              __html: `${DOMPurify.sanitize(content.slice(0, 200))}...`,
            }}
          /> */}
          <CardContent className="p-0">
            <div className="flex flex-col">
              <div className="flex items-center space-x-4">
                {author && author.image && author.name && (
                  <>
                    <Avatar>
                      <AvatarImage src={author.image}></AvatarImage>
                      <AvatarFallback>
                        {author.name?.split(" ")[0]}
                      </AvatarFallback>
                    </Avatar>
                    <h5>{author.name}</h5>
                  </>
                )}
              </div>
              <div className="my-2 text-muted-foreground">
                {Intl.DateTimeFormat("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                }).format(createdAt)}
              </div>
            </div>
          </CardContent>
        </CardHeader>
      </Card>
    </Link>
  );
}
