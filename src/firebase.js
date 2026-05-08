import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyB2oACJ5HItwyWgIrCbjDWVTClHaYSZQ8g",
  authDomain: "minimalist-e3037.firebaseapp.com",
  databaseURL: "https://minimalist-e3037-default-rtdb.firebaseio.com",
  projectId: "minimalist-e3037",
  storageBucket: "minimalist-e3037.firebasestorage.app",
  messagingSenderId: "27028190113",
  appId: "1:27028190113:web:e09eb5cc4657ce111491e0",
  measurementId: "G-LLVM63WGLF"
};

export const auth = getAuth(app);
export const db = getFirestore(app);
export const realtimeDb = getDatabase(app);