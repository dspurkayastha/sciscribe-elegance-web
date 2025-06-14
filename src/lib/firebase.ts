
// src/lib/firebase.ts
import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported as isAnalyticsSupported } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAf6-B1FcJo1FbHaH-lC1jkmWcQzKYCg3U",
  authDomain: "sciscribe-main.firebaseapp.com",
  projectId: "sciscribe-main",
  storageBucket: "sciscribe-main.firebasestorage.app",
  messagingSenderId: "905768153629",
  appId: "1:905768153629:web:ce886bbfdbb3da91f48cf4",
  measurementId: "G-2CN89F9HST",
};

let app: ReturnType<typeof initializeApp> | null = null;
let db: ReturnType<typeof getFirestore> | null = null;
let storage: ReturnType<typeof getStorage> | null = null;
let auth: ReturnType<typeof getAuth> | null = null;
let googleProvider: GoogleAuthProvider | null = null;
let analytics: ReturnType<typeof getAnalytics> | null = null;

try {
  app = initializeApp(firebaseConfig);
  db = getFirestore(app);
  storage = getStorage(app, firebaseConfig.storageBucket);
  auth = getAuth(app);
  googleProvider = new GoogleAuthProvider();

  // Initialize analytics if supported
  (async () => {
    if (await isAnalyticsSupported()) {
      analytics = getAnalytics(app!);
      // Enable debug mode in development
      if (import.meta.env.DEV) {
        window.gtag?.('config', firebaseConfig.measurementId, {
          debug_mode: true
        });
      }
    }
  })();
} catch (error) {
  console.error('Firebase initialization failed:', error);
}

export { app, analytics, db, storage, auth, googleProvider };
