import AdminDashboard from './Dashboard';

export default function ContactAdminPage() {
  // This page will show only contact submissions, using the Dashboard logic
  return <AdminDashboard initialTab="contact" />;
}
