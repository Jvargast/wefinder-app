import { collection, doc, getDoc, getDocs, onSnapshot, orderBy, query } from "firebase/firestore";
import { useSession } from "next-auth/react";
import Head from "next/head";
import React, { useState } from "react";
import { getReceipmentEmail } from "../../components/Chat";
import ChatScreen from "../../components/ChatScreen";
import NavbarUser from "../../components/NavbarUser";
import SidebarChat from "../../components/SidebarChat";
import { db } from "../../firebase";

export default function Chat({chat, messages}) {
  const {data:session, status} = useSession();
  return (
    <div>
      <Head>
        <title>WefinderChat con {getReceipmentEmail(chat.users, session ? session.user:null)}</title>
      </Head>
      <main>
        <NavbarUser/>
        <div className="flex flex-row min-h-screen max-w-7xl mx-auto">
            <SidebarChat />
            <div className="flex-1 overflow-scroll h-[90vh] ">
                 <ChatScreen chat={chat} messages={messages}/>
            </div>
        </div>
      </main>
    </div>
  );
}

export async function getServerSideProps(context) {
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
