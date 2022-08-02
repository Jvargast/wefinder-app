import { async } from "@firebase/util";
import {
  AttachFile,
  InsertEmoticon,
  MoreVertOutlined,
} from "@mui/icons-material";
import { Avatar, IconButton } from "@mui/material";
import {
  addDoc,
  collection,
  doc,
  FieldValue,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  where,
} from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import styled from "styled-components";
import TimeAgo from "timeago-react";
import { db } from "../firebase";
import { getReceipmentEmail } from "./Chat";
import Message from "./Message";

function ChatScreen({ chat, messages }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [input, setInput] = useState("");
  const endOfMessagesRef = useRef(null);
  const [messag, setMessag] = useState([]);


  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(db, "chats", router.query.id, "messages"), orderBy("timestamp","asc")),
      (snapshot) => setMessag(snapshot.docs)
    );
  }, [router.query.id]);
  const recipientEmail = getReceipmentEmail(chat.users, session ? session.user:null)
  const [recipientSnapshot] = useCollection(query(collection(db, "users"),where("email","==",recipientEmail )))

  
  const scrollToBottom = () => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth', block:"start" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messag]);

  const sendMesssage = async (e) => {
    e.preventDefault();
    await setDoc(doc(db, "users", session ? session?.user.userId : null), {
      lastSeen: serverTimestamp(),
    },{merge:true});
    await addDoc(collection(db, "chats", router.query.id, "messages"), {
      timestamp: serverTimestamp(),
      message: input,
      user: session?.user?.email,
      photoURL: session?.user?.image,
    });
    setInput("");
    scrollToBottom();
  };
  const recipient = recipientSnapshot?.docs?.[0].data()
  return (
    <div className="mt-[82px]">
      <div className="sticky bg-white z-50 top-20 flex p-3 h-20 items-center border-b border-l border-graySubTitle">
        {recipient ? (<Avatar src={recipient?.image} alt={recipient.email}/>):(<Avatar>{recipientEmail[0]}</Avatar>)}
        <div className="ml-4 flex-1">
          <h3 className="mb-1">{recipientEmail}</h3>
          {recipient ? <p className="text-xs text-[#949191]">Última vez: {recipient.lastSeen?.toDate() ? (<TimeAgo className="text-xs text-[#949191]" datetime={recipient?.lastSeen?.toDate()}/>):"Unavailable"}</p>:<p className="text-xs text-[#949191]">Loading last active...</p>}
        </div>
        <div>
          <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton>
            <MoreVertOutlined />
          </IconButton>
        </div>
      </div>
      <div className="container p-8 bg-[#e5ded8] min-h-[70vh]">
        <div>
          { messag.length >0 && messag.map((item, i) => (
            <>
            <Message key={i} item={item} />
            
            </>
          )) }
          <EndOfMessage ref={endOfMessagesRef}/>
        </div>
      </div>
      <div className="input-container flex items-center p-3 stick bottom-0 bg-graySubTitle z-50">
        <InsertEmoticon />
        <input
          className="flex-1 items-center p-3 stick bottom-0 bg-[#cac6c6] ml-4 mr-4"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button disabled={!input} type="submit" onClick={sendMesssage} className="bg-greenColor p-2 rounded-3xl text-white">
          Enviar
        </button>
      </div>
    </div>
  );
}

const EndOfMessage = styled.div`
`;

export default ChatScreen;
