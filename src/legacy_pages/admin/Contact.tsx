
import { Mail } from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";
import AdminDashboard from "./Dashboard";

export default function ContactAdminPage() {
  return (
    <AdminLayout 
      title="Contact Submissions" 
      subtitle="Dashboard / Contact Submissions"
      icon={<Mail className="h-7 w-7 text-sciscribe-gold" />}
    >
      <AdminDashboard initialTab="contact" />
    </AdminLayout>
  );
}
