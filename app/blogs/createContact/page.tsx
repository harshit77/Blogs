import FileReader from "@/components/BulkReader";
import { CONTACT } from "@/app/constants";
import getCurrentUser from "@/lib/session";
import { redirect } from "next/navigation";

export default async function CreateContact() {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/");
  }
  return (
    <div className="container min-h-screen my-8 space-y-8">
      <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl scroll-m-20 ">
        Create Contacts
      </h1>
      <FileReader type={CONTACT} />
    </div>
  );
}
