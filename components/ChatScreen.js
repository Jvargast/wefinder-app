import { async } from "@firebase/util";
import {
  AttachFile,
  Delete,
  InsertEmoticon,
  MoreVertOutlined,
} from "@mui/icons-material";
import { Avatar, IconButton } from "@mui/material";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  FieldValue,
  getDoc,
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
import { useAuth } from "../context/AuthContext";
import { db } from "../firebase";
import { getReceipmentEmail } from "./Chat";
import Message from "./Message";

function ChatScreen({ chat, messages }) {
  const { user } = useAuth();
  const router = useRouter();
  const [input, setInput] = useState("");
  const endOfMessagesRef = useRef(null);
  const [messag, setMessag] = useState([]);
  const [docId, setDocId] = useState("");

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(
        collection(db, "chats", router.query.id, "messages"),
        orderBy("timestamp", "asc")
      ),
      (snapshot) => setMessag(snapshot.docs)
    );
  }, [router.query.id]);
  const recipientEmail = getReceipmentEmail(chat.users, user ? user : null);
  const [recipientSnapshot] = useCollection(
    query(collection(db, "users"), where("email", "==", recipientEmail))
  );

  const scrollToBottom = () => {
    endOfMessagesRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messag]);

  const sendMesssage = async (e) => {
    e.preventDefault();
    const ref = collection(db, "users");
    const q = query(ref, where("userId", "==", user.uid));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(async(document) => {
      // doc.data() is never undefined for query doc snapshots
      await setDoc(doc(db, "users", document.id), {
        lastSeen: serverTimestamp(),
      },{merge:true});
      await addDoc(collection(db, "chats", router.query.id, "messages"), {
        timestamp: serverTimestamp(),
        message: input,
        user: user.email,
        photoURL: user.photo,
      });
      /* setDocId(doc.id); */
    });
    /* if(docId != null) {
      await setDoc(doc(db, "users", docId), {
        lastSeen: serverTimestamp(),
      },{merge:true});
      await addDoc(collection(db, "chats", router.query.id, "messages"), {
        timestamp: serverTimestamp(),
        message: input,
        user: user.email,
        photoURL: user.photo,
      });
    } */

    setInput("");
    scrollToBottom();
  };
  const recipient = recipientSnapshot?.docs?.[0]?.data();
  const deleteChat = () => {
    if (window.confirm("¿De verdad quires eliminar este chat?")) {
      deleteDoc(doc(db, "chats", router.query.id));
      router.push("/chat")
    }
  }
  return (
    <div className="mt-[82px]">
      <div className="sticky bg-white z-50 top-20 flex p-3 h-20 items-center border-b border-l border-graySubTitle">
        {recipient ? (
          <Avatar src={recipient?.image} alt={recipient.email} />
        ) : (
          <Avatar>{recipientEmail[0]}</Avatar>
        )}
        <div className="ml-4 flex-1">
          <h3 className="mb-1">{recipientEmail}</h3>
          {recipient ? (
            <p className="text-xs text-[#949191]">
              Última vez:{" "}
              {recipient.lastSeen?.toDate() ? (
                <TimeAgo
                  className="text-xs text-[#949191]"
                  datetime={recipient?.lastSeen?.toDate()}
                />
              ) : (
                "Unavailable"
              )}
            </p>
          ) : (
            <p className="text-xs text-[#949191]">Loading last active...</p>
          )}
        </div>
        <div>
          <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton onClick={deleteChat}>
            <Delete/>
          </IconButton>
        </div>
      </div>
      <div className="container p-8 bg-[#e5ded8] min-h-[70vh]">
        <div>
          {messag.length > 0 &&
            messag.map((item, i) => (
                <Message key={i} item={item} />
            ))}
          <EndOfMessage ref={endOfMessagesRef} />
        </div>
      </div>
      <div className="input-container flex items-center p-3 stick bottom-0 bg-graySubTitle z-50">
        <InsertEmoticon />
        <input
          className="flex-1 items-center p-3 stick bottom-0 bg-[#cac6c6] ml-4 mr-4"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          disabled={!input}
          type="submit"
          onClick={sendMesssage}
          className="bg-greenColor p-2 rounded-3xl text-white"
        >
          Enviar
        </button>
      </div>
    </div>
  );
}

const EndOfMessage = styled.div``;

export default ChatScreen;
