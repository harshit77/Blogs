import getCurrentUser from "@/lib/session";
import Link from "next/link";
import { Button } from "./ui/button";
import { LayoutDashboard, LogOut, Mail } from "lucide-react";
import { AvatarFallback, Avatar, AvatarImage } from "./ui/avatar";

export default async function Header() {
  const user = await getCurrentUser();

  const rightMenu = user ? (
    <>
      <li>
        <Link href="/">
          <Button variant="ghost">
            <LayoutDashboard className="mr-2" />
            Dashboard
          </Button>
        </Link>
      </li>
      <li>
        <Avatar>
          <AvatarImage src={user?.image!} alt="User Image" />
          <AvatarFallback />
        </Avatar>
      </li>
      <li>
        <Link href="/api/auth/signout">
          <Button variant="ghost">
            <LogOut className="mr-2" />
            LogOut
          </Button>
        </Link>
      </li>
    </>
  ) : (
    <li>
      <Link href="/api/auth/signin">
        <Button>
          <Mail className="mr-2" />
          Login With Email
        </Button>
      </Link>
    </li>
  );

  return (
    <header className="sticky top-0 backdrop-blur border-b bg-background/95 z-50">
      <nav className="container flex justify-between items-center h-14">
        <Link href="/" className="text-white text-xl font-bold">
          DashMind Blogs
        </Link>
        <ul className="flex space-x-4">{rightMenu}</ul>
      </nav>
    </header>
  );
}
