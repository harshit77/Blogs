import getCurrentUser from "@/lib/session";
import Dashboard from "./dashboard";
import WelcomePage from "./welcompage";

export default async function Page() {
  const user = await getCurrentUser();

  return (
    <main className="container my-8 space-y-8">
      {user ? <Dashboard /> : <WelcomePage />}
    </main>
  );
}
