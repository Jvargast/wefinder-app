import React, { useEffect, useState } from "react";
import { Avatar, Button } from "@mui/material";
import { MoreVertOutlined, Search } from "@mui/icons-material";
import { ChatIcon } from "@heroicons/react/solid";
import * as EmailValidator from "email-validator"
import { db } from "../firebase";
import { addDoc, collection, doc, getDoc, getDocs, onSnapshot, query, setDoc, where } from "firebase/firestore";
import { getSession, useSession } from "next-auth/react";
import { useCollection } from 'react-firebase-hooks/firestore';
import Chat from "./Chat";
import { useAuth } from "../context/AuthContext";
import { getChatByEmail, getUserByUserId } from "../services/firebase";


export default function SidebarChat() {
  const {user} = useAuth();
  const [activeUser, setActiveUser] = useState({});

  useEffect(() => {
    async function getUserObjByUserId() {
      if(user){
        const [userGet] = await getUserByUserId(user.uid);
        setActiveUser(userGet);
      }
      
    }

    if(user){
      getUserObjByUserId(user.uid);
    }
   

  }, [user]);



  const colRef = collection(db, "chats");
    //const result = await getDocs(query(colRef, where('users', 'array-contains', session.user.email)));
  const q1= query(colRef, where("users", "array-contains", user ? user.email:null));
  const [chatSnapshot, loading, error] = useCollection(q1);

  const [emailStarter, setEmailStarter] = useState(null)

  useEffect(()=> {
    async function getChats() {
        if (activeUser.username!= null){
            const chat = await getChatByEmail(activeUser.email);
            setEmailStarter(chat)

        }
        
    }
    getChats();
  },[activeUser]);




const createChat = async() => {
    const input = prompt('Ingresa un email para conversar');
    if(!input) return null;
    if(EmailValidator.validate(input) && !chatAlreadyExist(input) && input !== user?.email ) {
      console.log("valido")
        await addDoc(
            collection(
              db,
              "chats"),
            {
              users:[user?.email, input]
            }
          );
    } 
  }; 


  const chatAlreadyExist = (recipientEmail) => !!chatSnapshot?.docs.find((chat) => chat.data().users.find((user) => user === recipientEmail)?.length > 0)
  
  return (
    <div className="mt-[82px] flex-[0.45] h-[90vh] min-w-[350px] max-w-[380px] overflow-y-scroll">
      <div className="flex sticky top-0 bg-white z-10 justify-between items-center h-[80px] border-b border-graySubTitle pl-2">
        {user ?  (<Avatar className="cursor-pointer hover:opacity-80" src={user ? activeUser.profilePic: null} alt={user.email} />): <Avatar className="cursor-pointer hover:opacity-80"/>}
        <div>{activeUser.username}</div>
        <div className="flex flex-row items-center">

            <div className="w-7 h-7 flex items-center justify-center">
                <ChatIcon />
            </div>
            <div className="w-8 h-8 flex items-center justify-center">
                <MoreVertOutlined />
            </div>

        </div>
        
      </div>
      <div className="flex items-center p-5 rounded-sm">
        <Search/>
        <input placeholder="Buscar en el chat" className="outline-none border-[none] flex-1"/>
      </div>
      <Button className="w-full text-graySubTitle border-t border-b border-graySubTitle" onClick={createChat}>Comenzar nuevo chat</Button>
      {/*List of Chats */}
      {emailStarter?.docs.map((chat) =>  (
         <Chat key={chat.id} id={chat.id} users={chat.data().users}/>
      ))} 
    </div>
  );
}
