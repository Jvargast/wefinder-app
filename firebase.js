// Import the functions you need from the SDKs you need

import firebase, {initializeApp, getApp, getApps} from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "wefinder-7276a.firebaseapp.com",
  projectId: "wefinder-7276a",
  storageBucket: "wefinder-7276a.appspot.com",
  messagingSenderId: "331599924871",
  appId: "1:331599924871:web:b6c4d6c627ee6fb710b222"
};

// Initialize Firebase
const app = !getApp().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();
export {app, db, storage};