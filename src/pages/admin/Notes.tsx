
import { useState, useEffect } from "react";
import { StickyNote, Plus, X, Save, Trash2 } from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { db } from "@/lib/firebase";
import { collection, addDoc, getDocs, doc, deleteDoc, updateDoc, serverTimestamp, query, orderBy } from "firebase/firestore";

type Note = {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
};

export default function AdminNotesPage() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [newNote, setNewNote] = useState({ title: "", content: "" });
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  // Fetch notes from Firestore
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const q = query(collection(db, "adminNotes"), orderBy("updatedAt", "desc"));
        const snapshot = await getDocs(q);
        const fetchedNotes = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate() || new Date(),
          updatedAt: doc.data().updatedAt?.toDate() || new Date(),
        })) as Note[];
        setNotes(fetchedNotes);
      } catch (error) {
        console.error("Error fetching notes:", error);
        toast({
          title: "Error fetching notes",
          description: "Could not load your notes. Please try again.",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  const handleCreateNote = async () => {
    if (!newNote.title.trim()) {
      toast({
        title: "Title required",
        description: "Please enter a title for your note.",
        variant: "destructive"
      });
      return;
    }

    try {
      const noteData = {
        title: newNote.title,
        content: newNote.content,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };

      const docRef = await addDoc(collection(db, "adminNotes"), noteData);
      
      const newNoteWithId: Note = {
        id: docRef.id,
        ...noteData,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      setNotes([newNoteWithId, ...notes]);
      setNewNote({ title: "", content: "" });
      setIsCreating(false);
      
      toast({
        title: "Note created",
        description: "Your note has been saved successfully."
      });
    } catch (error) {
      console.error("Error creating note:", error);
      toast({
        title: "Error creating note",
        description: "Could not save your note. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleUpdateNote = async () => {
    if (!editingNote) return;

    try {
      const noteRef = doc(db, "adminNotes", editingNote.id);
      await updateDoc(noteRef, {
        title: editingNote.title,
        content: editingNote.content,
        updatedAt: serverTimestamp(),
      });

      setNotes(notes.map(note => 
        note.id === editingNote.id 
          ? { ...editingNote, updatedAt: new Date() } 
          : note
      ));
      
      setEditingNote(null);
      
      toast({
        title: "Note updated",
        description: "Your changes have been saved."
      });
    } catch (error) {
      console.error("Error updating note:", error);
      toast({
        title: "Error updating note",
        description: "Could not update your note. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleDeleteNote = async (id: string) => {
    if (!confirm("Are you sure you want to delete this note?")) return;

    try {
      await deleteDoc(doc(db, "adminNotes", id));
      setNotes(notes.filter(note => note.id !== id));
      
      if (editingNote?.id === id) {
        setEditingNote(null);
      }
      
      toast({
        title: "Note deleted",
        description: "Your note has been deleted."
      });
    } catch (error) {
      console.error("Error deleting note:", error);
      toast({
        title: "Error deleting note",
        description: "Could not delete your note. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <AdminLayout 
      title="Admin Notes" 
      subtitle="Create and manage personal notes"
      icon={<StickyNote className="h-7 w-7 text-sciscribe-gold" />}
    >
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold text-white mb-1">Your Notes</h3>
          <p className="text-slate-400 text-sm">Manage your personal notes and reminders</p>
        </div>
        {!isCreating && (
          <Button 
            onClick={() => setIsCreating(true)} 
            className="bg-sciscribe-gold hover:bg-sciscribe-gold/80 text-black">
            <Plus className="mr-2 h-4 w-4" /> New Note
          </Button>
        )}
      </div>

      {/* Create Note Form */}
      {isCreating && (
        <Card className="mb-6 p-4 border border-slate-700 bg-slate-900/50">
          <div className="flex justify-between items-center mb-3">
            <h4 className="font-bold text-white">Create New Note</h4>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setIsCreating(false)}
              className="text-slate-400 hover:text-white hover:bg-slate-800"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <div className="space-y-3">
            <Input
              placeholder="Note Title"
              value={newNote.title}
              onChange={e => setNewNote({ ...newNote, title: e.target.value })}
              className="bg-slate-800 border-slate-700"
            />
            <textarea
              placeholder="Note content..."
              value={newNote.content}
              onChange={e => setNewNote({ ...newNote, content: e.target.value })}
              rows={4}
              className="w-full rounded-md bg-slate-800 border border-slate-700 p-2 text-white focus:outline-none focus:ring-2 focus:ring-sciscribe-gold/50"
            />
            <div className="flex justify-end gap-2">
              <Button 
                variant="outline"
                onClick={() => setIsCreating(false)}
                className="border-slate-700 hover:bg-slate-800"
              >
                Cancel
              </Button>
              <Button 
                onClick={handleCreateNote}
                className="bg-sciscribe-gold hover:bg-sciscribe-gold/80 text-black"
              >
                <Save className="mr-2 h-4 w-4" /> Save Note
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Edit Note Form */}
      {editingNote && (
        <Card className="mb-6 p-4 border border-slate-700 bg-slate-900/50">
          <div className="flex justify-between items-center mb-3">
            <h4 className="font-bold text-white">Edit Note</h4>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setEditingNote(null)}
              className="text-slate-400 hover:text-white hover:bg-slate-800"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <div className="space-y-3">
            <Input
              placeholder="Note Title"
              value={editingNote.title}
              onChange={e => setEditingNote({ ...editingNote, title: e.target.value })}
              className="bg-slate-800 border-slate-700"
            />
            <textarea
              placeholder="Note content..."
              value={editingNote.content}
              onChange={e => setEditingNote({ ...editingNote, content: e.target.value })}
              rows={4}
              className="w-full rounded-md bg-slate-800 border border-slate-700 p-2 text-white focus:outline-none focus:ring-2 focus:ring-sciscribe-gold/50"
            />
            <div className="flex justify-end gap-2">
              <Button 
                variant="outline"
                onClick={() => setEditingNote(null)}
                className="border-slate-700 hover:bg-slate-800"
              >
                Cancel
              </Button>
              <Button 
                onClick={handleUpdateNote}
                className="bg-sciscribe-gold hover:bg-sciscribe-gold/80 text-black"
              >
                <Save className="mr-2 h-4 w-4" /> Update Note
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Notes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading ? (
          // Loading skeletons
          Array.from({ length: 6 }).map((_, i) => (
            <Card key={i} className="p-4 border border-slate-800 bg-slate-900/40 h-[220px] animate-pulse flex flex-col">
              <div className="h-5 bg-slate-700 rounded w-2/3 mb-3"></div>
              <div className="h-4 bg-slate-700/70 rounded w-full mb-2"></div>
              <div className="h-4 bg-slate-700/70 rounded w-5/6"></div>
              <div className="mt-auto h-8 bg-slate-700/50 rounded w-full"></div>
            </Card>
          ))
        ) : notes.length === 0 ? (
          <div className="col-span-3 text-center py-10 text-slate-400">
            <StickyNote className="mx-auto h-10 w-10 mb-3 text-slate-500" />
            <p className="text-lg font-medium">No notes found</p>
            <p className="text-sm mt-1">Click "New Note" to create your first note</p>
          </div>
        ) : (
          notes.map(note => (
            <Card key={note.id} className="p-4 border border-slate-800 bg-slate-900/40 hover:bg-slate-900/60 transition-colors flex flex-col">
              <div className="mb-2">
                <h5 className="font-bold text-white truncate">{note.title}</h5>
                <p className="text-xs text-slate-500">
                  Updated {note.updatedAt.toLocaleDateString()} {note.updatedAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
              <p className="text-sm text-slate-300 line-clamp-3 mb-4">
                {note.content || <span className="italic text-slate-500">No content</span>}
              </p>
              <div className="mt-auto pt-3 border-t border-slate-800 flex justify-end gap-2">
                <Button 
                  size="sm" 
                  variant="ghost" 
                  onClick={() => setEditingNote(note)}
                  className="text-slate-400 hover:text-white hover:bg-slate-800"
                >
                  Edit
                </Button>
                <Button 
                  size="sm" 
                  variant="ghost" 
                  onClick={() => handleDeleteNote(note.id)}
                  className="text-red-500 hover:text-red-400 hover:bg-red-900/20"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </Card>
          ))
        )}
      </div>
    </AdminLayout>
  );
}
