import { useState, useEffect} from 'react';
import { useAuth } from '../context/AuthContext';
import { getUserByUserId, getPhotos } from '../services/firebase';

export default function usePhotos() {
  const [photos, setPhotos] = useState(null);
  const {user} = useAuth();

  useEffect(()=> {
    async function getRealTimePhotos(){
        const [{following}] = await getUserByUserId(user.uid);
        let followedUsersPhotos = [];
        if(following.length > 0) {
        const followedUserPhotos = await getPhotos(user.uid, following);
                   // re-arrange array to be newest photos first by dateCreated

        setPhotos(followedUserPhotos);
            
        }

    }

    getRealTimePhotos();
  },[user.uid])
  
  return { photos };
}