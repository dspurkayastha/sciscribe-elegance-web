import { useAdminGuard } from "@/hooks/useAdminGuard";
import { db, auth } from "@/lib/firebase";
import { collection, query, where, orderBy, limit, startAfter, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Sidebar, SidebarProvider, SidebarMenuItem } from "@/components/ui/sidebar";
import { Table, TableHeader, TableHead, TableRow, TableCell, TableBody } from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Drawer } from "@/components/ui/drawer";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Pagination, PaginationPrevious, PaginationNext } from "@/components/ui/pagination";
import { toast } from "@/components/ui/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { LogOut, Home, Mail, MessageCircle, StickyNote, Settings } from "lucide-react";
import { useNavigate, NavLink } from "react-router-dom";

import type { Query, DocumentData, QueryDocumentSnapshot } from "firebase/firestore";
// --- Types ---
type Submission = {
  id: string;
  type: "contact" | "feedback";
  email: string;
  date: string;
  reviewed: boolean;
  notes?: string;
  [key: string]: any;
};

const PAGE_SIZE = 10;

const NAV = [
  { label: "Dashboard", icon: <Home />, to: "/admin" },
  { label: "Contact Submissions", icon: <Mail />, to: "/admin/contact" },
  { label: "Feedback Entries", icon: <MessageCircle />, to: "/admin/feedback" },
  { label: "Admin Notes", icon: <StickyNote />, to: "/admin/notes" },
  { label: "Settings", icon: <Settings />, to: "/admin/settings" },
];

type TabType = "contact" | "feedback" | "all";

export default function AdminDashboard() {
  const { loading, authorized } = useAdminGuard();
  const [tab, setTab] = useState<TabType>("contact");
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [selected, setSelected] = useState<Submission | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [lastDoc, setLastDoc] = useState<QueryDocumentSnapshot<DocumentData> | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isActionLoading, setIsActionLoading] = useState(false);
  const [noteInput, setNoteInput] = useState("");
  const navigate = useNavigate();

  // --- Fetch submissions from Firestore ---
  useEffect(() => {
    let q: Query<DocumentData> = collection(db, "submissions");
    if (tab !== "all") q = query(q, where("type", "==", tab));
    q = query(q, orderBy("date", "desc"), limit(PAGE_SIZE));
    setIsLoading(true);
    getDocs(q).then(snapshot => {
      const docs = snapshot.docs.map(docSnap => ({ id: docSnap.id, ...docSnap.data() } as Submission));
      setSubmissions(docs);
      setLastDoc(snapshot.docs.length > 0 ? snapshot.docs[snapshot.docs.length - 1] : null);
      setIsLoading(false);
    });
  }, [tab, page]);

  // --- Actions ---
  const markReviewed = async (id: string) => {
    setIsActionLoading(true);
    await updateDoc(doc(db, "submissions", id), { reviewed: true });
    setSubmissions(submissions => submissions.map(s => s.id === id ? { ...s, reviewed: true } : s));
    setIsActionLoading(false);
    toast({ title: "Marked as reviewed" });
  };
  const deleteSubmission = async (id: string) => {
    setIsActionLoading(true);
    await deleteDoc(doc(db, "submissions", id));
    setSubmissions(submissions => submissions.filter(s => s.id !== id));
    setIsActionLoading(false);
    toast({ title: "Submission deleted" });
    setDrawerOpen(false);
  };
  const addNote = async (id: string, note: string) => {
    setIsActionLoading(true);
    await updateDoc(doc(db, "submissions", id), { notes: note });
    setSubmissions(submissions => submissions.map(s => s.id === id ? { ...s, notes: note } : s));
    setIsActionLoading(false);
    toast({ title: "Note added" });
  };

  // --- Logout ---
  const handleLogout = async () => {
    await auth.signOut();
    navigate("/admin/login");
  };

  if (loading) return <div className="text-center mt-10">Checking access...</div>;
  if (!authorized) return null;

  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-background">
        {/* Sidebar */}
        <Sidebar className="bg-gradient-to-b from-slate-900/95 to-slate-950/90 border-r border-slate-800 flex flex-col justify-between w-56 min-w-[200px] sticky top-0 h-screen shadow-xl z-40">
  {/* Sidebar Brand/Logo */}
  <div>
    <div className="flex items-center gap-3 px-4 py-6 font-extrabold text-2xl text-sciscribe-gold tracking-tight border-b border-slate-800">
      <span className="rounded-full bg-sciscribe-gold/10 p-2 text-sciscribe-gold shadow">🧬</span>
      <span>SciScribe Admin</span>
    </div>
    <nav className="flex-1 space-y-1 px-2 mt-6">
      {NAV.map(item => (
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
          aria-label={item.label}
        >
          <SidebarMenuItem>
            {item.icon}
            <span className="ml-2">{item.label}</span>
          </SidebarMenuItem>
        </NavLink>
      ))}
    </nav>
  </div>
  {/* Sidebar User Avatar at Bottom */}
  <div className="px-4 py-6 border-t border-slate-800 flex items-center gap-3">
    <Avatar>
      <AvatarFallback className="bg-slate-700 text-sciscribe-gold font-bold">A</AvatarFallback>
    </Avatar>
    <div className="text-white/80 text-sm">Admin</div>
  </div>
</Sidebar>
        {/* Main Content */}
        <main className="flex-1 flex flex-col bg-slate-950/90">
          {/* Header */}
          {/* Sticky, glassmorphic header */}
<header className="sticky top-0 z-30 flex flex-col gap-2 px-10 py-4 border-b border-slate-800 bg-slate-950/70 backdrop-blur-xl shadow-2xl">
  <div className="flex items-center justify-between">
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-3">
        <Mail className="h-7 w-7 text-sciscribe-gold" />
        <h2 className="text-2xl font-extrabold text-sciscribe-gold tracking-tight">Contact Submissions</h2>
      </div>
      <span className="text-xs text-sciscribe-gold/70 font-semibold tracking-wide">Dashboard / Contact Submissions</span>
    </div>
    <div className="flex items-center gap-3">
      <input
        type="text"
        className="rounded-lg px-3 py-2 bg-slate-800 text-white border border-slate-700 focus:outline-none focus:ring-2 focus:ring-sciscribe-gold/70 w-64 shadow"
        placeholder="Search submissions..."
        aria-label="Search submissions"
        // TODO: Connect to search logic
        disabled
      />
      <select className="rounded-lg px-2 py-2 bg-slate-800 text-white border border-slate-700 focus:outline-none focus:ring-2 focus:ring-sciscribe-gold/50 shadow">
        <option>All Types</option>
        <option>Contact</option>
        <option>Feedback</option>
      </select>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" onClick={handleLogout} className="text-white/80 hover:text-sciscribe-gold focus-visible:ring-2 focus-visible:ring-sciscribe-gold">
              <LogOut className="mr-2 h-5 w-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Logout</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  </div>
</header>
          {/* Tabs */}
          <div className="px-12 pt-8 flex flex-col gap-6">
  {/* Modern pill tabs attached to table */}
  <Tabs value={tab} onValueChange={(v: string) => setTab(v as TabType)} className="mb-3">
    <TabsList className="rounded-full bg-slate-800/80 p-1 flex gap-2 shadow border border-slate-700">
      <TabsTrigger value="contact" className="rounded-full px-6 py-2 data-[state=active]:bg-sciscribe-gold/90 data-[state=active]:text-black transition-all flex items-center gap-1 text-base">
        <Mail className="inline h-4 w-4" /> Contact
      </TabsTrigger>
      <TabsTrigger value="feedback" className="rounded-full px-6 py-2 data-[state=active]:bg-sciscribe-gold/90 data-[state=active]:text-black transition-all flex items-center gap-1 text-base">
        <MessageCircle className="inline h-4 w-4" /> Feedback
      </TabsTrigger>
      <TabsTrigger value="all" className="rounded-full px-6 py-2 data-[state=active]:bg-sciscribe-gold/90 data-[state=active]:text-black transition-all flex items-center gap-1 text-base">
        <Home className="inline h-4 w-4" /> All
      </TabsTrigger>
    </TabsList>
  </Tabs>
  {/* Table Card */}
  <div className="rounded-2xl bg-gradient-to-br from-slate-900/80 to-slate-950/90 p-6 shadow-2xl min-h-[400px] max-w-6xl w-full mx-auto border border-slate-800">
    <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Reviewed</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLoading ? (
                    Array.from({ length: PAGE_SIZE }).map((_, i) => (
                      <TableRow key={i}>
                        <TableCell colSpan={5}><Skeleton className="h-6 w-full" /></TableCell>
                      </TableRow>
                    ))
                  ) : (
                    submissions.map(sub => (
                      <TableRow key={sub.id} className="hover:bg-slate-800/40 transition cursor-pointer" onClick={() => { setSelected(sub); setDrawerOpen(true); }}>
                        <TableCell className="font-mono text-xs">{sub.id.slice(0,8)}</TableCell>
                        <TableCell>{sub.email}</TableCell>
                        <TableCell>{sub.date}</TableCell>
                        <TableCell>
                          {sub.reviewed ? (
                            <span className="text-green-500 font-semibold flex items-center gap-1">
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <span>
                                      <svg className="inline h-4 w-4 text-green-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                                    </span>
                                  </TooltipTrigger>
                                  <TooltipContent>Reviewed</TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                              Reviewed
                            </span>
                          ) : (
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button size="icon" variant="ghost" onClick={e => { e.stopPropagation(); markReviewed(sub.id); }} aria-label="Mark as reviewed">
                                    <svg className="h-4 w-4 text-sciscribe-gold" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>Mark as reviewed</TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          )}
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button size="icon" variant="ghost" onClick={e => e.stopPropagation()} aria-label="Row actions">
                                <svg className="h-4 w-4 text-slate-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              {!sub.reviewed && (
                                <DropdownMenuItem onClick={() => markReviewed(sub.id)}>
                                  <svg className="inline h-4 w-4 mr-2 text-sciscribe-gold" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                                  Mark as reviewed
                                </DropdownMenuItem>
                              )}
                              <DropdownMenuItem onClick={() => { setSelected(sub); setDrawerOpen(true); }}>
                                <svg className="inline h-4 w-4 mr-2 text-blue-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m0 0l3-3m-3 3l3 3" /></svg>
                                View details
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => deleteSubmission(sub.id)} className="text-red-500">
                                <svg className="inline h-4 w-4 mr-2 text-red-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
              {/* Pagination */}
              <div className="flex justify-between items-center mt-4">
                <Pagination>
                  <PaginationPrevious onClick={() => setPage(p => Math.max(1, p-1))} disabled={page === 1} />
                  <span className="mx-2">{page}</span>
                  <PaginationNext onClick={() => setPage(p => p+1)} disabled={submissions.length < PAGE_SIZE} />
                </Pagination>
              </div>
            </div>
          </div>
        </main>
        {/* Drawer for details */}
        <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
          {selected && (
            <div className="p-6 max-w-md w-full bg-slate-900 text-white rounded-l-xl shadow-xl flex flex-col gap-4">
              <h3 className="text-xl font-bold mb-1">{selected.type === "contact" ? "Contact" : "Feedback"}</h3>
              <div className="mb-2">
                <div className="font-mono text-sm">{selected.email}</div>
                <div className="text-xs text-muted-foreground">{selected.date}</div>
              </div>
              <div className="mb-2">
                <div className="font-semibold">Notes</div>
                <div className="text-sm mb-2">{selected.notes || <span className="text-muted-foreground">None</span>}</div>
                <form className="flex gap-2" onSubmit={e => { e.preventDefault(); addNote(selected.id, noteInput); setNoteInput(""); }}>
                  <input
                    type="text"
                    className="flex-1 rounded px-2 py-1 bg-slate-800 text-white border border-slate-700"
                    placeholder="Add note..."
                    value={noteInput}
                    onChange={e => setNoteInput(e.target.value)}
                    disabled={isActionLoading}
                  />
                  <Button type="submit" size="sm" disabled={isActionLoading || !noteInput}>Add Notes</Button>
                </form>
              </div>
              <div className="flex gap-2 mt-4">
                <Button variant="destructive" onClick={() => deleteSubmission(selected.id)} disabled={isActionLoading}>Delete</Button>
                <Button variant="secondary" onClick={() => setDrawerOpen(false)}>Close</Button>
              </div>
            </div>
          )}
        </Drawer>
      </div>
    </SidebarProvider>
  );
}
