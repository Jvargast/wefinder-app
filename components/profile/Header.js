import Image from "next/image";
import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { useAuth } from "../../context/AuthContext";
import {
  isUserFollowingProfile,
  getUserByUserId,
  toggleFollow,
} from "../../services/firebase";
import "react-loading-skeleton/dist/skeleton.css";
import { addDoc, collection } from "firebase/firestore";
import { useRouter } from "next/router";
import { db } from "../../firebase";

export default function Header({
  photosCount,
  profile: {
    docId: docId,
    userId: userId,
    username,
    displayName,
    following,
    profilePic: profilePic,
    followers,
    email
  },
  followerCount,
  setFollowerCount,
}) {
  const { user } = useAuth();
  const router = useRouter();

  const [isFollowingProfile, setIsFollowingProfile] = useState(null);

  
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
  const activeBtnFollow = activeUser.username && activeUser.username !== username;

  const handleToggleFollow = async () => {
    if (activeUser && isFollowingProfile != undefined) {
      setIsFollowingProfile((isFollowingProfile) => !isFollowingProfile);
      setFollowerCount({
        followerCount: isFollowingProfile && followers!=undefined ? followerCount - 1 : followerCount + 1,
      });
      await toggleFollow(
        isFollowingProfile,
        activeUser.docId,
        docId,
        userId,
        user.uid
      );
    }
  };

  useEffect(() => {
    const isLoggedInUserFollowingProfile = async () => {
      const isFollowing = await isUserFollowingProfile(activeUser.username, userId);
      setIsFollowingProfile(!!isFollowing);
    };
    if (activeUser.username && userId) {
      isLoggedInUserFollowingProfile();
    }
  }, [activeUser.username, userId]);
  
  const createChat=async()=>{
    if(email){
      await addDoc(
        collection(
          db,
          "chats"),
        {
          users:[user?.email, email]
        }
      );
      router.push("/chat")
    }
  }

  return (
    <div className="grid grid-cols-3 gap-4 justify-between mx-auto max-w-screen-lg">
      <div className="container flex justify-center items-center">
        {displayName ? (
          <div className="h-40 w-40">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="rounded-full h-full w-full flex"
              alt={`${displayName} profile picture`}
              src={`${profilePic}`}
              onError={(e) => {
                e.target.src = DEFAULT_IMAGE_PATH;
              }}
            />
          </div>
          
        ) : (
          <Skeleton circle height={150} width={150} count={1} />
        )}
      </div>
      <div className="flex items-center justify-center flex-col col-span-2">
        <div className="container flex items-center">
          <div className="flex flex-col">
          <p className="text-2xl mr-4">@ {username}</p>
          <p className="text-sm ">{email}</p>
          </div>
          
          {activeBtnFollow && isFollowingProfile === null ? (
            <Skeleton count={1} width={80} height={32} />
          ) : (
            activeBtnFollow && (
              <button
                className="bg-metal font-bold text-sm rounded text-white w-20 h-8"
                type="button"
                onClick={handleToggleFollow}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    handleToggleFollow();
                  }
                }}
              >
                {isFollowingProfile ? "Unfollow" : "Follow"}
              </button>
            )
          )}
          {username != activeUser.username ? (<div>
            <button className="bg-yellowWefinder font-bold text-sm rounded text-white w-20 h-8 ml-2" onClick={createChat}>Mensaje</button>
          </div>): <div></div>}
        </div>
        <div className="container flex mt-4">
          {!followers || !following ? (
            <Skeleton count={1} width={677} height={24} />
          ) : (
            <>
              <p className="mr-10">
                <span className="font-bold">{photosCount}</span> Publicaciones
              </p>
              <p className="mr-10">
                <span className="font-bold">{followerCount}</span>
                {` `}
                {followerCount === 1 ? `Seguidor` : `Seguidores`}
              </p>
              
              <p className="mr-10">
                <span className="font-bold">{following?.length}</span> Seguidos
              </p>
            </>
          )}
        </div>
        <div className="container mt-4">
          <p className="font-medium">
            {!displayName ? <Skeleton count={1} height={24} /> : displayName}
          </p>
        </div>
      </div>
    </div>
  );
}
