// Import the functions you need from the SDKs you need

import firebase, {initializeApp, getApp, getApps} from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
/* import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage'; */

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDqVtvYengYuutWowX4Y3y8Xid9d1CnTCI",
  authDomain: "wefinder-app.firebaseapp.com",
  projectId: "wefinder-app",
  storageBucket: "wefinder-app.appspot.com",
  messagingSenderId: "46096713211",
  appId: "1:46096713211:web:0754cd61c8153b0bdab75e"
};

// Initialize Firebase
const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);

const db = getFirestore(app);
const storage = getStorage();
console.log(app.name ? 'Firebase Mode Activated!' : 'Firebase not working :(');
export { app, db, storage };
