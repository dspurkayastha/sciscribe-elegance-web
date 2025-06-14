
// src/lib/firebase.ts
import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported as isAnalyticsSupported } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Check if all required Firebase config values are present
const requiredEnvVars = [
  'VITE_FIREBASE_API_KEY',
  'VITE_FIREBASE_AUTH_DOMAIN',
  'VITE_FIREBASE_PROJECT_ID',
  'VITE_FIREBASE_STORAGE_BUCKET',
  'VITE_FIREBASE_MESSAGING_SENDER_ID',
  'VITE_FIREBASE_APP_ID'
];

const missingEnvVars = requiredEnvVars.filter(envVar => !import.meta.env[envVar]);

if (missingEnvVars.length > 0) {
  console.error('Missing Firebase environment variables:', missingEnvVars);
  console.log('Please set the following environment variables:');
  missingEnvVars.forEach(envVar => {
    console.log(`- ${envVar}`);
  });
  
  // Provide instructions for the user
  const instructions = `
To fix this error, you have several options:

1. RECOMMENDED: Add your Firebase config to the codebase (Firebase API keys are safe to expose publicly)
2. Use Supabase integration instead (click the green Supabase button)
3. Create a local .env file with your Firebase config (for local development only)

Firebase API keys are designed to be public - security is handled through Firebase Security Rules.
  `;
  console.log(instructions);
}

// Use fallback values if environment variables are missing (this will prevent the app from crashing)
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'missing-api-key',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'missing-auth-domain',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'missing-project-id',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'missing-storage-bucket',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || 'missing-sender-id',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || 'missing-app-id',
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || undefined,
};

let app: ReturnType<typeof initializeApp> | null = null;
let db: ReturnType<typeof getFirestore> | null = null;
let storage: ReturnType<typeof getStorage> | null = null;
let auth: ReturnType<typeof getAuth> | null = null;
let googleProvider: GoogleAuthProvider | null = null;
let analytics: ReturnType<typeof getAnalytics> | null = null;

// Only initialize Firebase if we have valid configuration
if (missingEnvVars.length === 0) {
  try {
    app = initializeApp(firebaseConfig);
    db = getFirestore(app);
    storage = getStorage(app, import.meta.env.VITE_FIREBASE_STORAGE_BUCKET);
    auth = getAuth(app);
    googleProvider = new GoogleAuthProvider();

    // Initialize analytics if supported
    (async () => {
      if (await isAnalyticsSupported()) {
        analytics = getAnalytics(app!);
        // Enable debug mode in development
        if (import.meta.env.DEV) {
          window.gtag?.('config', import.meta.env.VITE_FIREBASE_MEASUREMENT_ID, {
            debug_mode: true
          });
        }
      }
    })();
  } catch (error) {
    console.error('Firebase initialization failed:', error);
  }
} else {
  console.warn('Firebase not initialized due to missing environment variables');
}

export { app, analytics, db, storage, auth, googleProvider };
