import { collection, doc, getDoc, getDocs, onSnapshot, orderBy, query } from "firebase/firestore";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { getReceipmentEmail } from "../../components/Chat";
import ChatScreen from "../../components/ChatScreen";
import NavbarUser from "../../components/NavbarUser";
import SidebarChat from "../../components/SidebarChat";
import { useAuth } from "../../context/AuthContext";
import { db } from "../../firebase";
import { getChat, getMessages, getMessagesAndChat } from "../../services/firebase";

export default function Chat() {
  const {user, logOut} = useAuth();
  const router = useRouter();
  const {id} = router.query;

  const [chatCon, setChatCon] = useState(null);
  const [messCon, setMessCon] = useState(null);

  useEffect(() => {
    async function chatAndMessages() {
       const mess = await getMessages(id); 
       const chat = await getChat(id);
       setChatCon(chat);    
       setMessCon(mess);
    }
    chatAndMessages();
  }, [id, router]); 



  return chatCon && messCon ? (
    <div>
      <Head>
       <title>WefinderChat con {getReceipmentEmail(chatCon.users, user ? user:null)}</title> 
      </Head>
      <main>
        <NavbarUser user={user} logOut={logOut}/>
        <div className="flex flex-row min-h-screen max-w-7xl mx-auto">
            <SidebarChat user={user}/>
            <div className="flex-1 overflow-scroll h-[90vh] ">
                 <ChatScreen chat={chatCon} messages={messCon}/>  
            </div>
        </div>
      </main>
    </div>
  ):null;
}

/* export async function getServerSideProps(context) {
    //Prep messages
    const messages = [];
    const ref = onSnapshot(collection(db, "chats", context.query.id, "messages"),orderBy("timestamp", 'asc'),(snapshot) => snapshot.docs.map(doc=> ({id:doc.id,...doc.data()})
    ).map(mess => {if(mess !== null){messages.push({...mess, timestamp: mess?.timestamp?.toDate().getTime()})}}))

    //Prep the chat
    const chatRes = await getDoc(doc(db,"chats", context.query.id));
    const chat = {
        id: chatRes.id,
        ...chatRes.data()
    }


    return {
        props:{
            messages:messages,
            chat:chat
        }
    }
}
 */