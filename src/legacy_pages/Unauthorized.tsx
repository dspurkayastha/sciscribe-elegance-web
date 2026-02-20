import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function Unauthorized() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4">
      <div className="max-w-md w-full bg-white/80 dark:bg-slate-900/80 shadow-xl rounded-xl p-8 text-center border border-slate-200 dark:border-slate-800">
        <div className="mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto mb-2 w-12 h-12 text-red-500 dark:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none"/><line x1="9" y1="9" x2="15" y2="15" stroke="currentColor" strokeWidth="2"/><line x1="15" y1="9" x2="9" y2="15" stroke="currentColor" strokeWidth="2"/></svg>
          <h1 className="text-2xl font-bold text-red-600 dark:text-red-400">Unauthorized</h1>
        </div>
        <p className="mb-6 text-muted-foreground">You do not have access to this page.<br/>If you believe this is an error, please contact your administrator.</p>
        <Button onClick={() => navigate("/")} className="w-full">Return Home</Button>
      </div>
    </div>
  );
}
