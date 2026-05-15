// firebase.js

import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB2oACJ5HItwyWgIrCbjDWVTClHaYSZQ8g",
  authDomain: "minimalist-e3037.firebaseapp.com",
  projectId: "minimalist-e3037",
  storageBucket: "minimalist-e3037.appspot.com",
  messagingSenderId: "27028190113",
  appId: "1:27028190113:web:e09eb5cc4657ce111491e0",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export default app;