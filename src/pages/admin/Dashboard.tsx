
import { db } from "@/lib/firebase";
import { collection, query, where, orderBy, limit, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { useEffect, useState, useCallback } from "react";
import { Table, TableHeader, TableHead, TableRow, TableCell, TableBody } from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Drawer } from "@/components/ui/drawer";
import { Pagination, PaginationPrevious, PaginationNext } from "@/components/ui/pagination";
import { toast } from "@/components/ui/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Mail, MessageCircle, Home, Check } from "lucide-react";

import type { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";

// --- Types ---
type Submission = {
  id: string;
  type: "contact" | "feedback";
  email: string;
  name?: string;
  subject?: string;
  message?: string;
  date: string;
  reviewed: boolean;
  notes?: string;
  [key: string]: any;
};

type DashboardProps = {
  initialTab?: "contact" | "feedback" | "all";
};

const PAGE_SIZE = 10;

type TabType = "contact" | "feedback" | "all";

export default function AdminDashboard({ initialTab = "all" }: DashboardProps) {
  const [tab, setTab] = useState<TabType>(initialTab);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [selected, setSelected] = useState<Submission | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [lastDoc, setLastDoc] = useState<QueryDocumentSnapshot<DocumentData> | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isActionLoading, setIsActionLoading] = useState(false);
  const [noteInput, setNoteInput] = useState("");
  const [totalSubmissions, setTotalSubmissions] = useState(0);
  const [hasNextPage, setHasNextPage] = useState(false);

  // --- Fetch submissions from Firestore ---
  const fetchSubmissions = useCallback(
    async (isNextPage = false) => {
      setIsLoading(true);
      try {
        let docs: DocumentData[] = [];
        let newLastDoc: QueryDocumentSnapshot | null = null;

        if (tab === "contact" || tab === "feedback") {
          const collectionName =
            tab === "contact" ? "contact_submissions" : "feedback_entries";

          let q = query(
            collection(db, collectionName),
            orderBy("createdAt", "desc"),
            limit(PAGE_SIZE)
          );

          if (isNextPage && lastDoc) {
            q = query(q, startAfter(lastDoc));
          }

          const snapshot = await getDocs(q);
          docs = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
            type: tab
          }));

          newLastDoc = snapshot.docs[snapshot.docs.length - 1] || null;
        } else if (tab === "all") {
          // NOTE: Firestore does not support cross-collection cursor-based pagination
          // This is a basic approximation: loads PAGE_SIZE from both, merges & shows top PAGE_SIZE
          const [contactSnap, feedbackSnap] = await Promise.all([
            getDocs(
              query(
                collection(db, "contact_submissions"),
                orderBy("createdAt", "desc"),
                limit(PAGE_SIZE)
              )
            ),
            getDocs(
              query(
                collection(db, "feedback_entries"),
                orderBy("createdAt", "desc"),
                limit(PAGE_SIZE)
              )
            )
          ]);

          const contactDocs = contactSnap.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
            type: "contact"
          }));

          const feedbackDocs = feedbackSnap.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
            type: "feedback"
          }));

          const merged = [...contactDocs, ...feedbackDocs].sort((a, b) => {
            const getMillis = (ts: any) => {
              if (!ts) return 0;
              if (typeof ts.toMillis === "function") return ts.toMillis();
              const parsed = Date.parse(ts);
              return isNaN(parsed) ? 0 : parsed;
            };
          
            return getMillis(b.createdAt) - getMillis(a.createdAt);
          });
          

          docs = merged.slice(0, PAGE_SIZE);
          newLastDoc = null; // Pagination unsupported in merged mode
        }

        if (isNextPage) {
          setSubmissions((prev) => [...prev, ...docs]);
        } else {
          setSubmissions(docs);
        }

        setLastDoc(newLastDoc);
      } catch (error) {
        console.error("❌ Error fetching submissions:", error);
        toast({
          title: "Error fetching data",
          description: "There was a problem loading submissions.",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    },
    [tab]
  );

  useEffect(() => {
    setLastDoc(null);  // 🔁 resets pagination correctly
    setPage(1);        // optional, reset to page 1
    fetchSubmissions();
  }, [tab]);

  // --- Actions ---
  const markReviewed = async (id: string) => {
    setIsActionLoading(true);
    try {
      await updateDoc(doc(db, "submissions", id), { reviewed: true });
      setSubmissions(submissions => submissions.map(s => s.id === id ? { ...s, reviewed: true } : s));
      toast({ title: "Marked as reviewed" });
    } catch (error) {
      toast({ 
        title: "Action failed", 
        description: "Could not mark as reviewed.",
        variant: "destructive" 
      });
    } finally {
      setIsActionLoading(false);
    }
  };
  
  const deleteSubmission = async (id: string) => {
    setIsActionLoading(true);
    try {
      await deleteDoc(doc(db, "submissions", id));
      setSubmissions(submissions => submissions.filter(s => s.id !== id));
      toast({ title: "Submission deleted" });
      setDrawerOpen(false);
    } catch (error) {
      toast({ 
        title: "Action failed", 
        description: "Could not delete submission.",
        variant: "destructive" 
      });
    } finally {
      setIsActionLoading(false);
    }
  };
  
  const addNote = async (id: string, note: string) => {
    if (!note.trim()) return;
    
    setIsActionLoading(true);
    try {
      await updateDoc(doc(db, "submissions", id), { notes: note });
      setSubmissions(submissions => submissions.map(s => s.id === id ? { ...s, notes: note } : s));
      toast({ title: "Note added" });
    } catch (error) {
      toast({ 
        title: "Action failed", 
        description: "Could not add note.",
        variant: "destructive" 
      });
    } finally {
      setIsActionLoading(false);
    }
  };

  // Handle pagination
  const handleNextPage = () => {
    if (hasNextPage) {
      setPage(p => p + 1);
      fetchSubmissions(true);
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(p => p - 1);
      // Need to implement proper fetching of previous page
      fetchSubmissions();
    }
  };

  return (
    <>
      <div className="px-4 flex flex-col gap-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-2">
          <div className="bg-gradient-to-br from-slate-900/90 to-slate-800/80 rounded-xl p-6 border border-slate-800/50 shadow-lg">
            <div className="text-sciscribe-gold text-sm font-semibold mb-1">Total Submissions</div>
            <div className="text-3xl font-bold text-white">{totalSubmissions}</div>
            <div className="text-xs text-slate-400 mt-2">Across all categories</div>
          </div>
          
          <div className="bg-gradient-to-br from-slate-900/90 to-slate-800/80 rounded-xl p-6 border border-slate-800/50 shadow-lg">
            <div className="text-blue-400 text-sm font-semibold mb-1">Pending Review</div>
            <div className="text-3xl font-bold text-white">
              {submissions.filter(s => !s.reviewed).length}
            </div>
            <div className="text-xs text-slate-400 mt-2">Requires your attention</div>
          </div>
          
          <div className="bg-gradient-to-br from-slate-900/90 to-slate-800/80 rounded-xl p-6 border border-slate-800/50 shadow-lg">
            <div className="text-green-400 text-sm font-semibold mb-1">Reviewed</div>
            <div className="text-3xl font-bold text-white">
              {submissions.filter(s => s.reviewed).length}
            </div>
            <div className="text-xs text-slate-400 mt-2">Processed submissions</div>
          </div>
        </div>

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
        <div className="rounded-2xl bg-gradient-to-br from-slate-900/80 to-slate-950/90 p-6 shadow-2xl min-h-[400px] border border-slate-800">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Type</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <TableRow key={i}>
                    <TableCell><Skeleton className="h-6 w-16" /></TableCell>
                    <TableCell><Skeleton className="h-6 w-40" /></TableCell>
                    <TableCell><Skeleton className="h-6 w-24" /></TableCell>
                    <TableCell><Skeleton className="h-6 w-32" /></TableCell>
                    <TableCell><Skeleton className="h-6 w-20" /></TableCell>
                    <TableCell><Skeleton className="h-6 w-24" /></TableCell>
                  </TableRow>
                ))
              ) : submissions.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-slate-400">
                    No submissions found
                  </TableCell>
                </TableRow>
              ) : (
                submissions.map(sub => (
                  <TableRow key={sub.id} className="hover:bg-slate-800/40 transition cursor-pointer" 
                    onClick={() => { setSelected(sub); setDrawerOpen(true); }}>
                    <TableCell>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        sub.type === 'contact' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'
                      }`}>
                        {sub.type}
                      </span>
                    </TableCell>
                    <TableCell>{sub.email}</TableCell>
                    <TableCell>{new Date(sub.date).toLocaleDateString()}</TableCell>
                    <TableCell className="max-w-[200px] truncate">
                      {sub.subject || (sub.message?.substring(0, 25) + "...") || "-"}
                    </TableCell>
                    <TableCell>
                      {sub.reviewed ? (
                        <span className="text-green-500 font-semibold flex items-center gap-1">
                          <Check className="h-4 w-4" />
                          Reviewed
                        </span>
                      ) : (
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button size="sm" variant="outline" 
                                className="text-blue-400 border-blue-400/30 hover:bg-blue-400/10"
                                onClick={e => { e.stopPropagation(); markReviewed(sub.id); }}>
                                Mark as reviewed
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
                          <Button size="icon" variant="ghost" onClick={e => e.stopPropagation()} className="hover:bg-slate-800">
                            <svg className="h-4 w-4 text-slate-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                              <circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/>
                            </svg>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-slate-900 border-slate-800">
                          {!sub.reviewed && (
                            <DropdownMenuItem onClick={() => markReviewed(sub.id)} 
                              className="text-blue-400 focus:text-blue-400 focus:bg-blue-400/10">
                              <Check className="h-4 w-4 mr-2" />
                              Mark as reviewed
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuItem onClick={() => { setSelected(sub); setDrawerOpen(true); }}
                            className="focus:bg-slate-800/80">
                            <svg className="h-4 w-4 mr-2 text-slate-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" 
                                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                            View details
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => deleteSubmission(sub.id)} 
                            className="text-red-500 focus:text-red-500 focus:bg-red-500/10">
                            <svg className="h-4 w-4 mr-2 text-red-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
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
          <div className="flex justify-between items-center mt-6 text-sm">
            <div className="text-slate-400">
              Showing {submissions.length} of {totalSubmissions} entries
            </div>
            <Pagination>
              <PaginationPrevious onClick={handlePrevPage} disabled={page === 1 || isLoading} />
              <span className="mx-2 text-white/80">Page {page}</span>
              <PaginationNext onClick={handleNextPage} disabled={!hasNextPage || isLoading} />
            </Pagination>
          </div>
        </div>
      </div>

      {/* Drawer for details */}
      <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
        {selected && (
          <div className="p-6 max-w-xl w-full bg-gradient-to-br from-slate-900 to-slate-950 text-white rounded-l-xl shadow-xl flex flex-col gap-4 border-l border-t border-b border-slate-700">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xl font-bold text-sciscribe-gold">{selected.type === "contact" ? "Contact Submission" : "Feedback Entry"}</h3>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                selected.reviewed 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-blue-100 text-blue-800'
              }`}>
                {selected.reviewed ? "Reviewed" : "Pending"}
              </span>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <div className="text-xs text-slate-400 mb-1">From</div>
                <div className="text-sm font-medium">{selected.name || "Anonymous"}</div>
                <div className="text-sm text-blue-400">{selected.email}</div>
              </div>
              <div>
                <div className="text-xs text-slate-400 mb-1">Received on</div>
                <div className="text-sm">{new Date(selected.date).toLocaleString()}</div>
              </div>
            </div>
            
            {selected.subject && (
              <div className="mb-3">
                <div className="text-xs text-slate-400 mb-1">Subject</div>
                <div className="text-base font-medium">{selected.subject}</div>
              </div>
            )}
            
            <div className="mb-4">
              <div className="text-xs text-slate-400 mb-1">Message</div>
              <div className="bg-slate-800/50 p-3 rounded text-sm border border-slate-700 max-h-52 overflow-y-auto whitespace-pre-wrap">
                {selected.message || "No message content"}
              </div>
            </div>
            
            <div className="mb-2">
              <div className="text-xs text-slate-400 mb-1">Admin Notes</div>
              <div className="text-sm mb-2 bg-slate-800/30 p-2 rounded min-h-[40px] border border-slate-700/50">
                {selected.notes || <span className="text-slate-500 italic">No notes added yet</span>}
              </div>
              <form className="flex gap-2" onSubmit={e => { 
                e.preventDefault(); 
                addNote(selected.id, noteInput); 
                setNoteInput(""); 
              }}>
                <input
                  type="text"
                  className="flex-1 rounded px-3 py-2 bg-slate-800 text-white border border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-sciscribe-gold/50"
                  placeholder="Add note..."
                  value={noteInput}
                  onChange={e => setNoteInput(e.target.value)}
                  disabled={isActionLoading}
                />
                <Button 
                  type="submit" 
                  disabled={isActionLoading || !noteInput.trim()} 
                  className="bg-sciscribe-gold hover:bg-sciscribe-gold/80 text-black font-medium">
                  Add Note
                </Button>
              </form>
            </div>
            
            <div className="flex gap-3 mt-4 pt-4 border-t border-slate-800">
              {!selected.reviewed && (
                <Button 
                  onClick={() => markReviewed(selected.id)} 
                  disabled={isActionLoading}
                  className="bg-blue-500 hover:bg-blue-600 text-white">
                  <Check className="mr-2 h-4 w-4" />
                  Mark as Reviewed
                </Button>
              )}
              <Button 
                variant="destructive" 
                onClick={() => deleteSubmission(selected.id)} 
                disabled={isActionLoading}>
                Delete
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setDrawerOpen(false)} 
                className="ml-auto border-slate-600 hover:bg-slate-800">
                Close
              </Button>
            </div>
          </div>
        )}
      </Drawer>
    </>
  );
}
