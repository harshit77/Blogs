import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { DASHBOARD_LINKS, DashboardType } from "./constants";
import Link from "next/link";

export default function Dashboard() {
  return (
    <>
      <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl scroll-m-20">
        Dashboard
      </h1>
      <div className="flex space-x-8">
        {DASHBOARD_LINKS.map(
          ({ path, label, icon: Icon }: DashboardType, index) => (
            <Link key={index} href={path}>
              <Card key={index} className="transition-all hover:bg-accent">
                <CardHeader className="space-y-4 ">
                  <CardTitle className="flex items-center gap-2">
                    <Icon size={34} />
                    {label}
                  </CardTitle>
                  <CardContent className="p-0">
                    <h5>{label}</h5>
                  </CardContent>
                </CardHeader>
              </Card>
            </Link>
          )
        )}
      </div>
    </>
  );
}
