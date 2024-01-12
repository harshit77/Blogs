import FileReader from "@/components/BulkReader";
import getCurrentUser from "@/lib/session";
import { redirect } from "next/navigation";
import { POST } from "@/app/constants";

export default async function BulkUpload() {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/");
  }
  return (
    <div className="container min-h-screen my-8 space-y-8">
      <div className="text-4xl font-extrabold tracking-tight lg:text-5xl scroll-m-20 flex items-end">
        Bulk Upload -
        <span className="text-4xl text-destructive-foreground">
          (Blog / Daily Tips / Poll)
        </span>
      </div>
      <FileReader type={POST} />
    </div>
  );
}
