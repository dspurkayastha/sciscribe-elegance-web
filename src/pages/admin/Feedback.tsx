import AdminDashboard from './Dashboard';

export default function FeedbackAdminPage() {
  // This page will show only feedback submissions, using the Dashboard logic
  return <AdminDashboard initialTab="feedback" />;
}
