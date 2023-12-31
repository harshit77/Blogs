import { Upload, Plus, Contact2, type LucideIcon } from "lucide-react";

export type DashboardType = {
  label: string;
  icon: LucideIcon;
  path: string;
};

export const DASHBOARD_LINKS: DashboardType[] = [
  {
    label: "Create a Post",
    icon: Plus,
    path: "/blogs/create",
  },
  {
    label: "Bulk Upload",
    icon: Upload,
    path: "/blogs/bulkupload",
  },
  {
    label: "Create Contact",
    icon: Contact2,
    path: "/blogs/createContact",
  },
];
