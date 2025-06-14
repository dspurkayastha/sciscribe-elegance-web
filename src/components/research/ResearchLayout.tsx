
import { ReactNode } from "react";
import { useResearchAuth } from "@/hooks/useResearchAuth";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { auth } from "@/lib/firebase";
import { useNavigate } from "react-router-dom";
import { Search, Bell, Settings, User, LogOut, Home, FolderOpen, Calendar, MessageSquare, BarChart3 } from "lucide-react";
import { useState } from "react";

interface ResearchLayoutProps {
  children: ReactNode;
  activeView?: string;
}

const navigation = [
  { name: "Home", icon: Home, href: "/research" },
  { name: "Projects", icon: FolderOpen, href: "/research/projects" },
  { name: "Calendar", icon: Calendar, href: "/research/calendar" },
  { name: "Messages", icon: MessageSquare, href: "/research/messages" },
  { name: "Reports", icon: BarChart3, href: "/research/reports" },
];

export default function ResearchLayout({ children, activeView }: ResearchLayoutProps) {
  const { loading, authenticated } = useResearchAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const handleLogout = async () => {
    await auth?.signOut();
    navigate("/research/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-sciscribe-light">
        <div className="animate-pulse flex space-x-4">
          <div className="rounded-full bg-sciscribe-gold h-4 w-4"></div>
          <div className="rounded-full bg-sciscribe-blue h-4 w-4"></div>
          <div className="rounded-full bg-sciscribe-navy h-4 w-4"></div>
        </div>
      </div>
    );
  }

  if (!authenticated) return null;

  return (
    <div className="min-h-screen bg-sciscribe-light">
      {/* Top Navigation */}
      <header className="bg-white border-b border-sciscribe-mist shadow-sm">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-sciscribe-navy rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">S</span>
                </div>
                <h1 className="text-xl font-bold text-sciscribe-navy">SciScribe Research</h1>
              </div>
              
              <nav className="hidden md:flex space-x-6">
                {navigation.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => navigate(item.href)}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      activeView === item.name.toLowerCase()
                        ? "bg-sciscribe-gold/10 text-sciscribe-navy"
                        : "text-sciscribe-slate hover:text-sciscribe-navy hover:bg-sciscribe-mist"
                    }`}
                  >
                    <item.icon className="w-4 h-4" />
                    <span>{item.name}</span>
                  </button>
                ))}
              </nav>
            </div>

            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-sciscribe-slate" />
                <Input
                  type="text"
                  placeholder="Search projects, tasks..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-64 bg-sciscribe-mist/50 border-transparent focus:bg-white focus:border-sciscribe-gold"
                />
              </div>
              
              <Button variant="ghost" size="icon" className="text-sciscribe-slate hover:text-sciscribe-navy">
                <Bell className="w-5 h-5" />
              </Button>
              
              <Button variant="ghost" size="icon" className="text-sciscribe-slate hover:text-sciscribe-navy">
                <Settings className="w-5 h-5" />
              </Button>
              
              <div className="flex items-center space-x-2">
                <Avatar className="w-8 h-8">
                  <AvatarFallback className="bg-sciscribe-gold text-sciscribe-navy font-semibold">
                    U
                  </AvatarFallback>
                </Avatar>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={handleLogout}
                  className="text-sciscribe-slate hover:text-red-600"
                >
                  <LogOut className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
}
