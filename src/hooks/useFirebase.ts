
import { auth, db } from '@/lib/firebase';

export function useFirebase() {
  const isFirebaseAvailable = !!(auth && db);
  
  return {
    isFirebaseAvailable,
    auth,
    db,
  };
}
