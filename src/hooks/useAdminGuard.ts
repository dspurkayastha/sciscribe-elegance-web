
import { useEffect, useState } from "react";
import { auth } from "@/lib/firebase";
import { useNavigate } from "react-router-dom";
import { useFirebase } from "./useFirebase";

export function useAdminGuard() {
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);
  const navigate = useNavigate();
  const { isFirebaseAvailable } = useFirebase();

  useEffect(() => {
    if (!isFirebaseAvailable || !auth) {
      navigate("/admin/login");
      return;
    }

    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (!user) {
        navigate("/admin/login");
        return;
      }

      try {
        const tokenResult = await user.getIdTokenResult(true);
        if (tokenResult.claims.admin) {
          setAuthorized(true);
        } else {
          navigate("/unauthorized");
        }
      } catch (error) {
        console.error("Error checking admin claims:", error);
        navigate("/admin/login");
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, [navigate, isFirebaseAvailable]);

  return { loading, authorized };
}
