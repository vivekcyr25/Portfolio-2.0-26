import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyDummyKeyForLocalTestingDevelopmentOnly000",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "neural-os-demo.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "neural-os-demo",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "neural-os-demo.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "123456789000",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:123456789000:web:abcdef1234567890",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-NEURALDEMO"
};

if (!import.meta.env.VITE_FIREBASE_API_KEY) {
  console.warn("SYSTEM_NOTICE: Running in local offline/guest mode. To enable live cloud sync, populate .env with your Firebase keys.");
}

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export const googleProvider = new GoogleAuthProvider();
export const githubProvider = new GithubAuthProvider();

export default app;
