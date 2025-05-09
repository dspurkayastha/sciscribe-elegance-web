
import { useAdminGuard } from "@/hooks/useAdminGuard";
import { ReactNode } from "react";
import { Sidebar, SidebarProvider } from "@/components/ui/sidebar";
import { LogOut, Home, Mail, MessageCircle, StickyNote, Settings, Search } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { auth } from "@/lib/firebase";

type AdminLayoutProps = {
  children: ReactNode;
  title: string;
  subtitle?: string;
  icon?: ReactNode;
};

export const NAV_ITEMS = [
  { label: "Dashboard", icon: <Home className="h-5 w-5" />, to: "/admin" },
  { label: "Contact Submissions", icon: <Mail className="h-5 w-5" />, to: "/admin/contact" },
  { label: "Feedback Entries", icon: <MessageCircle className="h-5 w-5" />, to: "/admin/feedback" },
  { label: "Admin Notes", icon: <StickyNote className="h-5 w-5" />, to: "/admin/notes" },
  { label: "Settings", icon: <Settings className="h-5 w-5" />, to: "/admin/settings" },
];

export default function AdminLayout({ children, title, subtitle, icon }: AdminLayoutProps) {
  const { loading, authorized } = useAdminGuard();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await auth.signOut();
    navigate("/admin/login");
  };

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen bg-slate-950/90">
      <div className="space-y-4 text-center">
        <div className="animate-pulse flex space-x-2 justify-center">
          <div className="w-3 h-3 bg-sciscribe-gold rounded-full"></div>
          <div className="w-3 h-3 bg-sciscribe-gold rounded-full"></div>
          <div className="w-3 h-3 bg-sciscribe-gold rounded-full"></div>
        </div>
        <p className="text-white/80 text-sm font-medium">Verifying admin access...</p>
      </div>
    </div>
  );
  
  if (!authorized) return null;

  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-slate-950/95">
        {/* Sidebar */}
        <Sidebar className="bg-gradient-to-b from-slate-900/95 to-slate-950/90 border-r border-slate-800 flex flex-col justify-between w-56 min-w-[200px] sticky top-0 h-screen shadow-xl z-40">
          {/* Sidebar Brand/Logo */}
          <div>
            <div className="flex items-center gap-3 px-4 py-6 font-extrabold text-2xl text-sciscribe-gold tracking-tight border-b border-slate-800">
              <span className="rounded-full bg-sciscribe-gold/10 p-2 text-sciscribe-gold shadow">🧬</span>
              <span>SciScribe</span>
            </div>
            <nav className="flex-1 space-y-1 px-2 mt-6">
              {NAV_ITEMS.map(item => (
                <NavLink
                  key={item.label}
                  to={item.to}
                  className={({ isActive }) =>
                    [
                      'flex items-center gap-3 py-2 px-4 rounded-lg transition-colors font-medium outline-none focus-visible:ring-2 focus-visible:ring-sciscribe-gold',
                      isActive ? 'bg-sciscribe-gold/20 text-sciscribe-gold font-bold border-l-4 border-sciscribe-gold shadow' : 'hover:bg-slate-800/60 text-white/90'
                    ].join(' ')
                  }
                  end={item.to === '/admin'}
                >
                  {item.icon}
                  <span className="ml-2">{item.label}</span>
                </NavLink>
              ))}
            </nav>
          </div>
          {/* Sidebar User Avatar at Bottom */}
          <div className="px-4 py-6 border-t border-slate-800 flex items-center gap-3">
            <Avatar>
              <AvatarFallback className="bg-slate-700 text-sciscribe-gold font-bold">A</AvatarFallback>
            </Avatar>
            <div className="flex-1 text-white/80 text-sm">Admin</div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" onClick={handleLogout} 
                    className="text-white/80 hover:text-sciscribe-gold focus-visible:ring-2 focus-visible:ring-sciscribe-gold">
                    <LogOut className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Logout</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </Sidebar>

        {/* Main Content */}
        <main className="flex-1 flex flex-col bg-slate-950/90">
          {/* Header */}
          <header className="sticky top-0 z-30 flex flex-col gap-2 px-10 py-4 border-b border-slate-800 bg-slate-950/70 backdrop-blur-xl shadow-2xl">
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-3">
                  {icon || null}
                  <h2 className="text-2xl font-extrabold text-sciscribe-gold tracking-tight">{title}</h2>
                </div>
                {subtitle && <span className="text-xs text-sciscribe-gold/70 font-semibold tracking-wide">{subtitle}</span>}
              </div>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    className="rounded-lg pl-9 pr-3 py-2 bg-slate-800 text-white border border-slate-700 focus:outline-none focus:ring-2 focus:ring-sciscribe-gold/70 w-64 shadow"
                    placeholder="Search..."
                  />
                </div>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" onClick={handleLogout} className="text-white/80 hover:text-sciscribe-gold focus-visible:ring-2 focus-visible:ring-sciscribe-gold">
                        <LogOut className="h-5 w-5" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Logout</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
          </header>

          {/* Page Content */}
          <div className="flex-grow p-8">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
