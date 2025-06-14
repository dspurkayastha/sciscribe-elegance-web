
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
    if (!isFirebaseAvailable || !auth) {
      navigate("/research/login");
      return;
    }

    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setAuthenticated(true);
      } else {
        navigate("/research/login");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [navigate, isFirebaseAvailable]);

  return { loading, authenticated };
}
