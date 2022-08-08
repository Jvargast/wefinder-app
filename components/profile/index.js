import { useReducer, useEffect } from "react";
import { getUserByUsername, getUserPhotosByUsername } from "../../services/firebase";
import Header from "./Header";
import Photos from "./Photos";


export default function Profile({ username }) {
  const reducer = (state, newState) => ({ ...state, ...newState });
  const initState = {
    profile: {},
    infoCollection: [],
    followerCount: 0,
  };
  const [{ profile, infoCollection, followerCount }, dispatch] = useReducer(
    reducer,
    initState
  );

  useEffect(()=> {
    async function getProfileInfoAndPhotos() {
        if (username!= null){
          
            const [user] = await getUserByUsername(username);
            const photos = await getUserPhotosByUsername(username);
            dispatch({profile:user, infoCollection:photos, followerCount:user.followers.length})
        }
        
    }
    getProfileInfoAndPhotos()
  },[username]);

  return (
  <>
    <Header photosCount={infoCollection ? infoCollection.length : 0} profile={profile} followerCount={followerCount ? followerCount:0} setFollowerCount={dispatch}/>
    <Photos photos={infoCollection ? infoCollection:null} profile={profile}/>
    </>);
}
