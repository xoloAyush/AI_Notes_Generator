// src/firebase.js

import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";


// Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "ainotesgen.firebaseapp.com",
    projectId: "ainotesgen",
    storageBucket: "ainotesgen.firebasestorage.app",
    messagingSenderId: "569851891323",
    appId: "1:569851891323:web:135d0657db774ae82a5cde"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Auth
export const auth = getAuth(app);

// Google Provider
export const googleProvider = new GoogleAuthProvider();