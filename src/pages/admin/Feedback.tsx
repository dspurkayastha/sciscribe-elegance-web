
import { MessageCircle } from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";
import AdminDashboard from "./Dashboard";

export default function FeedbackAdminPage() {
  return (
    <AdminLayout 
      title="Feedback Entries" 
      subtitle="Dashboard / Feedback Entries"
      icon={<MessageCircle className="h-7 w-7 text-sciscribe-gold" />}
    >
      <AdminDashboard initialTab="feedback" />
    </AdminLayout>
  );
}
