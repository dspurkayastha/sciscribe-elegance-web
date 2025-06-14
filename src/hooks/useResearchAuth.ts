
import { useEffect, useState } from "react";
import { auth } from "@/lib/firebase";
import { useNavigate } from "react-router-dom";
import { useFirebase } from "./useFirebase";

export function useResearchAuth() {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const navigate = useNavigate();
  const { isFirebaseAvailable } = useFirebase();

  useEffect(() => {
    // Check for development authentication
    const devAuth = localStorage.getItem('dev-auth');
    if (devAuth === 'true') {
      setAuthenticated(true);
      setLoading(false);
      return;
    }

    if (!isFirebaseAvailable) {
      setLoading(false);
      return;
    }

    if (!auth) {
      setLoading(false);
      return;
    }

    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setAuthenticated(true);
      } else {
        setAuthenticated(false);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [isFirebaseAvailable]);

  return { loading, authenticated };
}
