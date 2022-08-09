import firebase, {initializeApp, getApp, getApps} from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBrjqCLVrLmVqTF-DUGtvIMhuuZXtF-r2o",
  authDomain: "wefinder-7276a.firebaseapp.com",
  projectId: "wefinder-7276a",
  storageBucket: "wefinder-7276a.appspot.com",
  messagingSenderId: "331599924871",
  appId: "1:331599924871:web:b6c4d6c627ee6fb710b222"
};
/*
apiKey: "AIzaSyDqVtvYengYuutWowX4Y3y8Xid9d1CnTCI",
  authDomain: "wefinder-app.firebaseapp.com",
  projectId: "wefinder-app",
  storageBucket: "wefinder-app.appspot.com",
  messagingSenderId: "46096713211",
  appId: "1:46096713211:web:0754cd61c8153b0bdab75e"
*/
//Initialize Firebase
const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);

const db = getFirestore(app);
const storage = getStorage();
const auth = getAuth();
console.log(app.name ? 'Firebase Mode Activated!' : 'Firebase not working :(');
const database = getDatabase(app);
export { app, db, storage, auth, database }; 