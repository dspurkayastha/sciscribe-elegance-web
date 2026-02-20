import { useEffect, useState } from "react";
import { auth } from "@/lib/firebase";
import { useNavigate } from "react-router-dom";

export function useAdminGuard() {
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (!user) {
        navigate("/admin/login");
        return;
      }

      const tokenResult = await user.getIdTokenResult(true);
      if (tokenResult.claims.admin) {
        setAuthorized(true);
      } else {
        navigate("/unauthorized"); // or logout
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, [navigate]);

  return { loading, authorized };
}
