import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import userIcon from "../assets/user.svg";
import photoIcon from "../assets/photo-icon.svg";
import videoIcon from "../assets/video-icon.svg";
import eventIcon from "../assets/event-icon.svg";
import articleIcon from "../assets/article-icon.svg";

import spiner from "../assets/spin-loader-icon.svg";
import { XIcon } from "@heroicons/react/outline";
import { useSession, getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { Skeleton } from "@mui/material";
//import { redirect } from "next/dist/server/api-utils";
import { db, storage } from "../firebase";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { async } from "@firebase/util";
import { useAuth } from "../context/AuthContext";
import { getUserByUserId } from "../services/firebase";
import VideoModal from "./VideoModal";

const iconStyle = {
  filter:
    "invert(33%) sepia(83%) saturate(1212%) hue-rotate(146deg) brightness(95%) contrast(98%)",
};

export default function Input() {
  /* const { data: session, status } = useSession(); */
  const {user} = useAuth();
  const router = useRouter();
  const filePickerRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const [input, setInput] = useState("");
  const [activeUser, setActiveUser] = useState({});

  const [open, setOpen] = useState(false);

  useEffect(() => {
    async function getUserObjByUserId() {
      if(user){
        const [userGet] = await getUserByUserId(user.uid);
        setActiveUser(userGet);
      }
      
    }

    if (user) {
      getUserObjByUserId(user.uid);
    }
  }, [user]);

  const sendPost = async () => {
    if (loading) return;
    setLoading(true);

  
    const docRef = await addDoc(collection(db, "posts"), {
      id: user.uid,
      text: input,
      userImg: user.photo,
      timestamp: serverTimestamp(),
      name: user.displayName,
      username: activeUser.username,
      comments:[],
      likes:[]
    });

    const imageRef = ref(storage, `posts/${docRef.id}/image`);
    if (selectedFile) {
      await uploadString(imageRef, selectedFile, "data_url").then(async () => {
        const downloadURL = await getDownloadURL(imageRef);
        await updateDoc(doc(db, "posts", docRef.id), {
          image: downloadURL,
        });
      });
    }
    setInput("");
    setSelectedFile(null);
    setLoading(false);
  };
  const addImageToPost = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
    reader.onload = (readerEvent) => {
      setSelectedFile(readerEvent.target.result);
    };
  };

  return (
    <>
      {user ? (
        <div className="flex border-b border-[#c8bfbfc2] p-3 space-x-3 flex-col">
          <div className="w-[72px] h-[72px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={user.photo}
              alt="user"
              className="rounded-full cursor-pointer hover:brightness-95 w-full h-full"
            />
          </div>
          <div className="w-full ">
            <div className="divide-y divide-graySubTitle">
              <textarea
                className="w-full border-none focus:ring-0 text-lg placeholder-graySubTitle tracking-wide min-h-[50px]"
                placeholder="¿De qué quieres hablar?"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                id="input"
                name="input"
              ></textarea>
            </div>
            {selectedFile && (
              <div className="relative">
                <XIcon
                  className="h-7 text-[#000] absolute cursor-pointer"
                  onClick={() => setSelectedFile(null)}
                />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={selectedFile}
                  alt="selectedFile"
                  className={`w-full h-full`}
                />
              </div>
            )}
            {!loading && (<div className="flex flex-row justify-between items-center pt-2.5">
              <div
                className=" flex flex-row cursor-pointer items-center"
                onClick={() => filePickerRef.current.click()}
                htmlFor="file"
              >
                <div className="h-6 w-6">
                  <Image src={photoIcon} alt="picon" style={iconStyle} />
                </div>
                <input
                  type="file"
                  hidden
                  id="file"
                  ref={filePickerRef}
                  onChange={addImageToPost}
                />
                <span className="text-sm text-greenColor ml-1 hover:text-yellowWefinder transition ease-out">
                  Foto
                </span>
              </div>
              <div className="flex flex-row cursor-pointer items-center" onClick={()=> setOpen(!open)}> 
                <div className="h-6 w-6" >
                  <Image src={videoIcon} alt="vicon" style={iconStyle} />
                </div>
                <span className="text-sm text-greenColor ml-1 hover:text-yellowWefinder transition ease-out">
                  Video
                </span>
              </div>
              <VideoModal open={open} setOpen={setOpen} user={user} activeUser={activeUser}/>
              <div className=" flex flex-row cursor-pointer items-center">
                <div className="h-6 w-6 ">
                  <Image src={eventIcon} alt="eicon" style={iconStyle} />
                </div>
                <span className="text-sm text-greenColor ml-1 hover:text-yellowWefinder transition ease-out">
                  Evento
                </span>
              </div>
              <div className=" flex flex-row cursor-pointer items-center">
                <div className="h-6 w-6">
                  <Image src={articleIcon} alt="aicon" style={iconStyle} />
                </div>
                <span className="text-sm text-greenColor ml-1 hover:text-yellowWefinder transition ease-out">
                  Artículo
                </span>
              </div>

              <button
                className="bg-greenColor text-white px-4 py-1.5 rounded-full font-bold shadow-md hover:brightness-95 disabled:opacity-50"
                disabled={!input.trim()}
                onClick={sendPost}
              >
                Publicar
              </button>
            </div>)}
          </div>
          {loading ? (
            <div className="flex justify-center items-center w-full">
              <div className="w-[60px] h-[60px]">
                <Image src={spiner} alt="spin" className="w-full h-full" />
              </div>
            </div>
          ) : (
            <div>
              
            </div>
          )}
        </div>
      ) : (
        <div className="border-b border-[#c8bfbfc2]">
          <Skeleton animation="wave" height={200} className="mr-5 ml-5 -mt-5" />
        </div>
      )}
    </>
  );
}

/* export const getServerSideProps = async (context) => {
  const session = await getSession(context);

  if (!session) {
    redirect: {
      destination: "/Signin";
      permanent: false;
    }
  }
  return {
    props: {
      session,
    },
  };
}; */
