
import { db } from "@/lib/firebase";
import { collection, query, where, orderBy, limit, getDocs, doc, updateDoc, deleteDoc, startAfter, QueryDocumentSnapshot, Timestamp } from "firebase/firestore";
import { useEffect, useState, useCallback, useRef } from "react";
import { Table, TableHeader, TableHead, TableRow, TableCell, TableBody } from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Drawer } from "@/components/ui/drawer";
import { Pagination } from "@/components/ui/pagination";
import { toast } from "@/components/ui/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Mail, MessageCircle, Home, Check } from "lucide-react";

import type { DocumentData } from "firebase/firestore";

// --- Types ---

// Utility: Format field labels for display
function formatLabel(key: string): string {
  // Map keys to human-friendly labels
  const labelMap: Record<string, string> = {
    firstName: "First Name",
    lastName: "Last Name",
    email: "Email",
    phone: "Phone",
    service: "Requested Service",
    serviceUsed: "Service Used",
    addOns: "Add-On Services",
    documentType: "Document Type",
    subjectArea: "Subject Area",
    wordCount: "Word Count",
    deadline: "Deadline",
    contactMethod: "Preferred Contact Method",
    source: "How did you find us?",
    message: "Message",
    gdprConsent1: "GDPR Consent 1",
    gdprConsent2: "GDPR Consent 2",
    feedbackText: "Feedback",
    rating: "Rating",
    consentToShow: "Consent to Show Publicly",
    // fallback
  };
  return labelMap[key] || key.replace(/([A-Z])/g, ' $1').replace(/^./, s => s.toUpperCase());
}

// Utility: Render field values nicely
function renderFieldValue(key: string, value: any): JSX.Element {
  if (typeof value === 'boolean') {
    return <span className="text-sm font-medium">{value ? 'Yes' : 'No'}</span>;
  }
  if (value === null || value === undefined || value === "") {
    return <span className="italic text-slate-500">Not provided</span>;
  }
  if (typeof value === 'object' && !Array.isArray(value)) {
    // Nested object (handled above for addOns)
    return <span className="italic text-slate-500">[Object]</span>;
  }
  if (Array.isArray(value)) {
    return <span className="text-sm">{value.length > 0 ? value.join(", ") : <span className="italic text-slate-500">None</span>}</span>;
  }
  // Format date strings
  if (key.toLowerCase().includes('date') || key.toLowerCase().includes('deadline')) {
    const date = new Date(value);
    return isNaN(date.getTime())
      ? <span className="text-sm">{value}</span>
      : <span className="text-sm">{date.toLocaleString()}</span>;
  }
  // Numbers
  if (typeof value === 'number') {
    return <span className="text-sm font-medium">{value}</span>;
  }
  // Default string
  return <span className="text-sm">{String(value)}</span>;
}

type Submission = {
  id: string;
  type: "contact" | "feedback";
  email: string;
  name?: string;
  subject?: string;
  message?: string;
  date: string;
  createdAt?: Timestamp | string | Date;
  reviewed: boolean;
  notes?: string;
  [key: string]: string | number | boolean | undefined | null | Timestamp | Date;
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
  // Use a ref for lastDoc to avoid closure issues and infinite loops
  const lastDocRef = useRef<QueryDocumentSnapshot<DocumentData> | null>(null);
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
        let docs: Submission[] = [];
        let newLastDoc: QueryDocumentSnapshot | null = null;

        if (tab === "contact" || tab === "feedback") {
          const collectionName =
            tab === "contact" ? "contact_submissions" : "feedback_entries";

          let q = query(
            collection(db, collectionName),
            orderBy("createdAt", "desc"),
            limit(PAGE_SIZE)
          );

          if (isNextPage && lastDocRef.current) {
            q = query(q, startAfter(lastDocRef.current));
          }

          const snapshot = await getDocs(q);
          docs = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
            type: tab
          })) as Submission[];

          newLastDoc = snapshot.docs[snapshot.docs.length - 1] || null; // For pagination
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
          })) as Submission[];

          const feedbackDocs = feedbackSnap.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
            type: "feedback"
          })) as Submission[];

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

        lastDocRef.current = newLastDoc;
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
    [tab] // Only depend on tab, not lastDoc
  );

  useEffect(() => {
    lastDocRef.current = null;  // resets pagination correctly
    setPage(1);        // optional, reset to page 1
    fetchSubmissions();
  }, [tab, fetchSubmissions]);

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
      <div className="px-4 flex flex-col gap-6 max-w-full overflow-x-hidden">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-2">
          <div className="bg-gradient-to-br from-slate-900/90 to-slate-800/80 rounded-xl p-6 border border-slate-800/50 shadow-lg w-full max-w-full">
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

        {/* Table and Drawer Side-by-Side */}
        <div className="flex flex-col lg:flex-row gap-6 w-full max-w-full overflow-x-hidden !m-0 !p-0">

          {/* Table Card */}
          <div className={
            drawerOpen && selected
              ? "rounded-2xl bg-gradient-to-br from-slate-900/80 to-slate-950/90 p-6 shadow-2xl min-h-[400px] border border-slate-800 min-w-0 w-full max-w-full flex-[2_1_0%]"
              : "rounded-2xl bg-gradient-to-br from-slate-900/80 to-slate-950/90 p-6 shadow-2xl min-h-[400px] border border-slate-800 min-w-0 w-full max-w-full flex-1"
          }>

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
          </div>
          {/* Drawer for details */}
          {drawerOpen && selected && (
            <div className="p-6 w-full max-w-full bg-gradient-to-br from-slate-900 to-slate-950 text-white rounded-l-xl shadow-2xl flex flex-col gap-4 border-l border-r border-t border-b border-slate-700 flex-[1_1_0%]">
              {/* Dynamic Form Data Rendering */}
              <div className="mb-4">
                <h3 className="text-xl font-bold text-sciscribe-gold mb-2">
                  {selected.type === "contact" ? "Contact Submission" : "Feedback Entry"}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Define logical field order for each entry type */}
                  {(() => {
                    const contactOrder = [
                      "name", "email", "phone", "service", "addOns", "documentType", "subjectArea", "wordCount", "deadline", "contactMethod", "source", "message", "gdprConsent1", "gdprConsent2"
                    ];
                    const feedbackOrder = [
                      "name", "email", "serviceUsed", "rating", "feedbackText", "consentToShow"
                    ];
                    const entryType = selected.type;
                    const order = entryType === "contact" ? contactOrder : feedbackOrder;
                    // Render in order, then any extras
                    const rendered = new Set<string>();
                    const fields = Object.entries(selected).filter(([key]) => !["id", "type", "reviewed", "notes", "createdAt", "date"].includes(key));
                    // Strictly ordered fields (always show, even if missing)
                    const orderedFields = order.map(key => [key, selected[key]] as [string, unknown]);
                    orderedFields.forEach(([key]) => rendered.add(key));
                    // Any extra fields not in order, including fileUrls
                    const extraFields = fields.filter(([key]) => !rendered.has(key) || key === 'fileUrls');
                    return (
                      <>
                        {/* Render strictly ordered fields, always in order */}
                        {orderedFields.map(([key, value]) => (
                          key === "addOns" && value && typeof value === "object" ? (
                            <div key={key} className="flex flex-col gap-1 md:col-span-2">
                              <div className="text-xs text-slate-400 font-medium">Add-On Services</div>
                              <div className="flex flex-wrap gap-2">
                                {Object.entries(value).map(([addon, enabled]) => (
                                  <span key={addon} className={`px-2 py-1 rounded text-xs border ${enabled ? 'bg-sciscribe-gold/20 border-sciscribe-gold text-sciscribe-gold' : 'bg-slate-700 border-slate-600 text-slate-400'}`}>
                                    {formatLabel(addon)}: {enabled ? 'Yes' : 'No'}
                                  </span>
                                ))}
                              </div>
                            </div>
                          ) : (
                            <div key={key} className="flex flex-col gap-1">
                              <div className="text-xs text-slate-400 font-medium">{formatLabel(key)}</div>
                              {renderFieldValue(key, value)}
                            </div>
                          )
                        ))}
                        {/* Render extra fields in a separate section if any exist */}
                        {extraFields.length > 0 && (
                          <div className="md:col-span-2 mt-4">
                            <div className="text-xs text-slate-400 font-bold mb-1">Other Fields</div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              {extraFields.map(([key, value]) => (
                                <div key={key} className="flex flex-col gap-1">
                                  <div className="text-xs text-slate-400 font-medium">{formatLabel(key)}</div>
                                  {renderFieldValue(key, value)}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </>
                    );
                  })()}

                  {/* Special handling for nested addOns */}
                  {selected.addOns && typeof selected.addOns === "object" && (
                    <div className="flex flex-col gap-1 md:col-span-2">
                      <div className="text-xs text-slate-400 font-medium">Add-On Services</div>
                      <div className="flex flex-wrap gap-2">
                        {Object.entries(selected.addOns).map(([addon, enabled]) => (
                          <span key={addon} className={`px-2 py-1 rounded text-xs border ${enabled ? 'bg-sciscribe-gold/20 border-sciscribe-gold text-sciscribe-gold' : 'bg-slate-700 border-slate-600 text-slate-400'}`}>
                            {formatLabel(addon)}: {enabled ? 'Yes' : 'No'}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Admin/Status Section */}
              <div className="border-t border-slate-700 pt-4 mt-2">
                <div className="flex items-center gap-4 mb-2">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${selected.reviewed ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
                    {selected.reviewed ? "Reviewed" : "Pending"}
                  </span>
                  <span className="text-xs text-slate-400">Received on</span>
                  <span className="text-xs font-medium">{selected.date ? new Date(selected.date).toLocaleString() : <span className="italic text-slate-500">Unknown</span>}</span>
                </div>
                <div className="mb-2">
                  <div className="text-xs text-slate-400 mb-1">Admin Notes</div>
                  <div className="text-sm mb-2 bg-slate-800/30 p-2 rounded min-h-[40px] border border-slate-700/50">{selected.notes || <span className="text-slate-500 italic">No notes added yet</span>}</div>
                  <form className="flex gap-2" onSubmit={e => { e.preventDefault(); addNote(selected.id, noteInput); setNoteInput(""); }}>
                    <input type="text" className="flex-1 rounded px-3 py-2 bg-slate-800 text-white border border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-sciscribe-gold/50" placeholder="Add note..." value={noteInput} onChange={e => setNoteInput(e.target.value)} disabled={isActionLoading} />
                    <Button type="submit" disabled={isActionLoading || !noteInput.trim()} className="bg-sciscribe-gold hover:bg-sciscribe-gold/80 text-black font-medium">Add Note</Button>
                  </form>
                </div>
                <div className="flex gap-2 mt-4">
                  <Button onClick={() => markReviewed(selected.id)} disabled={selected.reviewed || isActionLoading} className="bg-blue-500 hover:bg-blue-600 text-white">Mark as Reviewed</Button>
                  <Button onClick={() => deleteSubmission(selected.id)} variant="destructive" disabled={isActionLoading}>Delete</Button>
                  <Button onClick={() => { setDrawerOpen(false); setSelected(null); }} variant="outline" className="ml-auto">Close</Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

