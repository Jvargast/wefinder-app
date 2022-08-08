import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getUserByUserId } from '../services/firebase';

export default function useUser() {
  const [activeUser, setActiveUser] = useState({});
  const {user} = useAuth();


  useEffect(() => {
    async function getUserObjByUserId() {
      if(user){
        const [userGet] = await getUserByUserId(user.uid);
        setActiveUser(userGet);
      }
      
    }

    if (user.uid != null) {
      getUserObjByUserId(user.uid);
    }
  }, [user, user.uid]);
  
  return { userActive: activeUser, setActiveUser };
}