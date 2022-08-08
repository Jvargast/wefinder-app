import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import usePhotos from "../hooks/use-profile";
import Post from "./Post";
import { AnimatePresence, motion } from "framer-motion";
import { SparklesIcon } from "@heroicons/react/outline";
import Input from "./Input";
import { useAuth } from "../context/AuthContext";
import { getPhotos, getUserByUserId } from "../services/firebase";

export default function Timeline() {
  //const { photos } = usePhotos();
  const [photos, setPhotos] = useState(null)
  const {user, logOut} = useAuth();

  useEffect(()=> {
    async function getRealTimePhotos(){
      if(user){
        const [{following}] = await getUserByUserId(user.uid);
        let followedUsersPhotos = [];
        if(following.length > 0) {
        const followedUserPhotos = await getPhotos(user.uid, following);
                   // re-arrange array to be newest photos first by dateCreated

        setPhotos(followedUserPhotos);
            
        }
      }

    }

    getRealTimePhotos();
  },[user])
  
  return (
    <div className="">
      {!photos ? (
        <div className="xl:ml-[20px] xl:min-w-[576px] border-l border-r sm:ml-[73px] xl:mt-[82px] sm:mt-[82px] flex-grow max-w-xl border-[#d6cec2]">
          <div className="sticky flex py-2 px-3 top-[4.5rem] z-50 bg-white border-b border-[#e3dfd9]">
            <h2 className="text-lg sm:text-xl font-bold cursor-pointer">
              Home
            </h2>
            <div className="hoverEffect flex items-center justify-center px-0 ml-auto w-9 h-9">
              <SparklesIcon className="h-5" />
            </div>
          </div>
          <Input />
          <div className="flex justify-center border-b border-[#e3dfd9]">
            Seguir a más personas para ver su contenido
          </div>
        </div>
      ) : photos.length > 0 ? (
        <div className="xl:ml-[20px] xl:min-w-[576px] border-l border-r sm:ml-[73px] xl:mt-[82px] sm:mt-[82px] flex-grow max-w-xl border-[#d6cec2]">
          <div className="sticky flex py-2 px-3 top-[4.5rem] z-50 bg-white border-b border-[#e3dfd9]">
            <h2 className="text-lg sm:text-xl font-bold cursor-pointer">
              Home
            </h2>
            <div className="hoverEffect flex items-center justify-center px-0 ml-auto w-9 h-9">
              <SparklesIcon className="h-5" />
            </div>
          </div>
          <Input />

          <AnimatePresence>
            {photos.map((content, index) => (
              <div key={index}>
                <motion.div
                  key={content.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1 }}
                >
                  <Post post={content} id={content.docId} />
                </motion.div>
              </div>
            ))}
          </AnimatePresence>
        </div>
      ) : (
        <div className="xl:ml-[20px] xl:min-w-[576px] border-l border-r sm:ml-[73px] xl:mt-[82px] sm:mt-[82px] flex-grow max-w-xl border-[#d6cec2]">
          <div className="sticky flex py-2 px-3 top-[4.5rem] z-50 bg-white border-b border-[#e3dfd9]">
            <h2 className="text-lg sm:text-xl font-bold cursor-pointer">
              Home
            </h2>
            <div className="hoverEffect flex items-center justify-center px-0 ml-auto w-9 h-9">
              <SparklesIcon className="h-5" />
            </div>
          </div>
          <Input />
          <div className="flex justify-center border-b border-[#e3dfd9]">
            Seguir a más personas para ver su contenido
          </div>
        </div>
      )}
    </div>
  );
}
