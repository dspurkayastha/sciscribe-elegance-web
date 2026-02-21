
// src/lib/firebase.ts
import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported as isAnalyticsSupported } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Firebase configuration — sciscribe-solutions project
const firebaseConfig = {
  apiKey: "AIzaSyDpz9g5-po850P8WT3sl0npRgxqQf0NuH8",
  authDomain: "sciscribe-solutions.firebaseapp.com",
  projectId: "sciscribe-solutions",
  storageBucket: "sciscribe-solutions.firebasestorage.app",
  messagingSenderId: "481289370765",
  appId: "1:481289370765:web:b6ae24eceebd42ba45f6c4",
  measurementId: "G-LBF34FLVPE",
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
  if (typeof window !== "undefined") {
    isAnalyticsSupported().then((supported) => {
      if (supported && app) {
        analytics = getAnalytics(app);
        // Enable debug mode in development
        if (process.env.NODE_ENV !== "production") {
          (window as any).gtag?.('config', firebaseConfig.measurementId, {
            debug_mode: true
          });
        }
      }
    });
  }
} catch (error) {
  console.error('Firebase initialization failed:', error);
}

export { app, analytics, db, storage, auth, googleProvider };
