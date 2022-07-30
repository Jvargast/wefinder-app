import { Avatar } from '@mui/material'
import { collection, query, where } from 'firebase/firestore';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import { db } from '../firebase';

export const getReceipmentEmail = (users, userLoggedIn) => users?.filter((userToFilter) => userToFilter !== userLoggedIn?.email)[0];



function Chat({id, users}) {
  const router = useRouter();
  const {data:session, status} = useSession();
  const recipientEmail = getReceipmentEmail(users, session ? session.user:null);
  const colRef = collection(db, "users");
  const q1= query(colRef, where("email", "==", recipientEmail));
  const [recipientSnapshot] = useCollection(q1);
  const recipient = recipientSnapshot?.docs?.[0]?.data();
  
  const enterChat = () => {
    router.push(`/chat/${id}`)
  }
  
  

  return (
    <div className='flex items-center cursor-pointer p-4 break-words hover:bg-[#e9eaeb]' onClick={enterChat}>
        {recipient ? (
            // eslint-disable-next-line @next/next/no-img-element
            <Avatar className='m-2 mr-4' src={recipient?.image} alt={recipient.email}/>
        ) : (
            <Avatar className='m-2 mr-4'>{recipientEmail[0]}</Avatar>
        )}
        
        <p>{recipientEmail}</p>
    </div>
  )
}

export default Chat