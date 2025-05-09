
import { Mail } from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";
import AdminDashboard from "./Dashboard";

export default function AdminIndexPage() {
  return (
    <AdminLayout 
      title="Admin Dashboard" 
      subtitle="Overview of all submissions"
      icon={<Mail className="h-7 w-7 text-sciscribe-gold" />}
    >
      <AdminDashboard initialTab="all" />
    </AdminLayout>
  );
}
