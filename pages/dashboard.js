import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { signIn, useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import Feed from "../components/Feed";
import LeftSide from "../components/LeftSide";
import NavbarUser from "../components/NavbarUser";
import SuggestProfiles from "../components/SuggestProfiles";
import Timeline from "../components/Timeline";
import Widgets from "../components/Widgets";
import { useAuth } from "../context/AuthContext";
import { getUserByUserId } from "../services/firebase";
/* import useUser from "../hooks/use-user"; */



export default function Dashboard() {
  const router = useRouter();
  const {user, logOut} = useAuth();

  const [activeUser, setActiveUser] = useState({});


  useEffect(() => {
    async function getUserObjByUserId() {
      if(user){
        const [userGet] = await getUserByUserId(user.uid);
        setActiveUser(userGet);
      }
      
    }

    if (user) {
      getUserObjByUserId(user.uid);
    }
  }, [user]);
  
  /* const {userActive:{following, username, userId, displayName, docId}} = useUser(); */
//user && activeUser ?
  return (
   <>
    <div>
        <Head>
          <title>Wefinder</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        
        <main>
          <NavbarUser user={user} logOut={logOut}/> 
          <div className="flex flex-row min-h-screen max-w-7xl mx-auto">
            <LeftSide user={user} activeUser={activeUser}/>
            {/* <Feed/> */}
            <Timeline/> 
            {/* <Widgets newsResults={newsResults.articles} randomUsersResults={randomUsersResults.results}/>   */}
            <SuggestProfiles userId={activeUser.userId} following={activeUser.following} loggedUser={activeUser.docId}/>
            {/* <CommentModal/> */}
          </div>
          
        </main>
      </div>
    
   </>
  );
}

//https://saurav.tech/NewsAPI/top-headlines/category/bussiness/us.json


/* export async function getServerSideProps() {
  const newsResults = await fetch(
    "https://saurav.tech/NewsAPI/top-headlines/category/business/us.json"
  ).then((res) => res.json());

  // Who to follow section

  const randomUsersResults = await fetch(
    "https://randomuser.me/api/?results=30&inc=name,login,picture"
  ).then((res) => res.json());

  return {
    props: {
      newsResults,
      randomUsersResults,
    },
  };
} */