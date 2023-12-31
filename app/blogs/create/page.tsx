import PostForm from "@/components/PostForm";
import getCurrentUser from "@/lib/session";
import { redirect } from "next/navigation";

export default async function CreatePost() {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/");
  }
  return (
    <div className="container min-h-screen my-8 space-y-8">
      <PostForm />
    </div>
  );
}
