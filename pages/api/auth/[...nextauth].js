import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import EmailProvider from "next-auth/providers/email";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "../../../lib/mongodb";
export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
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
  secret: process.env.JWT_SECRET,
  /* adapter: MongoDBAdapter(clientPromise) */
  pages: {
    signIn: "/auth/Signin",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async session({session,token}){
      session.user.username = session.user.name.split(" ").join("").toLowerCase();
      session.user.userId = token.sub

      return session
    }
  }
})
