import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import Link from "next/link";

export default function WelcomePage() {
  return (
    <>
      <h3 className="text-2xl">Hello ! We DashMind 👋 </h3>
      <h1 className="text-5xl w-2/3">
        We Transform <span className="text-amber-400">Ideas</span> Into
        <span className="text-amber-400"> Exceptional</span> Mobile And Web
        Experiences
      </h1>
      <div className="flex flex-col my-4">
        <Link href="/blogs">
          <Button>
            Checkout my all blogs
            <ExternalLink className="ml-2" />
          </Button>
        </Link>
      </div>
    </>
  );
}
