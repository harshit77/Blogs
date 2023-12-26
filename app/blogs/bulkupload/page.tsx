import FileReader from "@/components/BulkReader";

export default function BulkUpload() {
  return (
    <div className="container min-h-screen my-8 space-y-8">
      <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl scroll-m-20">
        Bulk Upload Posts
      </h1>
      <FileReader />
    </div>
  );
}
