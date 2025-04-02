// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA7m6_ffC_dCWU_E5LAcOmREC7lJECL8RU",
  authDomain: "geniewise-d2743.firebaseapp.com",
  projectId: "geniewise-d2743",
  storageBucket: "geniewise-d2743.firebasestorage.app",
  messagingSenderId: "951520163232",
  appId: "1:951520163232:web:60ae7725425d5ba67220c5",
  measurementId: "G-JHQBGB6DT9"
};

const app = !getApps.length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);

export const db = getFirestore(app);