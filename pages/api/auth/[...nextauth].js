import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { FirestoreAdapter } from "@next-auth/firebase-adapter";
import {
  collection,
  query,
  getDocs,
  where,
  limit,
  doc,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  runTransaction,
} from "firebase/firestore";

/* import { db } from "../../../firebase"; */

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: "46096713211-j602c0qo0igfshau6u4btdts7039u9or.apps.googleusercontent.com",
      clientSecret: "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",
    }),
    /* EmailProvider({
        server: {
          host:process.env.EMAIL_SERVER_HOST,
          port: process.env.EMAIL_SERVER_POST,
          auth: {
            user: process.env.EMAIL_SERVER_USER,
            pass: process.env.EMAIL_SERVER_PASSWORD
          }
        },
        from:process.env.EMAIL_FROM
    })  */

    // ...add more providers here
  ],
  adapter:FirestoreAdapter({
    apiKey: "AIzaSyDqVtvYengYuutWowX4Y3y8Xid9d1CnTCI",
  authDomain: "wefinder-app.firebaseapp.com",
  projectId: "wefinder-app",
  storageBucket: "wefinder-app.appspot.com",
  messagingSenderId: "46096713211",
  appId: "1:46096713211:web:0754cd61c8153b0bdab75e",
    collection,
    query,
    getDocs,
  where,
  limit,
  doc,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  runTransaction,
  }),
  secret: process.env.JWT_SECRET,
  pages: {
    signIn: "/auth/Signin",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async session({ session, token }) {
      session.user.username = session.user.name
        .split(" ")
        .join("")
        .toLowerCase();
      session.user.userId = token.sub;
      session.user.isOnline = true

      return session;
    },
  },
});
