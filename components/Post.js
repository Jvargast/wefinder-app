import Image from "next/image";
import React, { useEffect, useReducer, useRef, useState } from "react";
import UserIcon from "../assets/user.svg";
import elipsis from "../assets/elipsis-icon.svg";

import {
  ChartBarIcon,
  ChatIcon,
  HeartIcon,
  ShareIcon,
  TrashIcon,
} from "@heroicons/react/outline";
import { HeartIcon as HeartFilled } from "@heroicons/react/solid";
import dynamic from "next/dynamic";
import Moment from "react-moment";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  setDoc,
} from "firebase/firestore";
import { db, storage } from "../firebase";
import { Skeleton } from "@mui/material";
import { deleteObject, ref } from "firebase/storage";
import { useRecoilState } from "recoil";
/* import { modalState, postIdState } from "../atom/modalAtom"; */
import { useRouter } from "next/router";
import Comments from "./Comments";
import { useAuth } from "../context/AuthContext";
import Link from "next/link";
import { getUserByUserId } from "../services/firebase";

const ReactPlayer = dynamic(() => import("react-player/lazy"), { ssr: false });

const iconStyle = {
  filter:
    "invert(33%) sepia(83%) saturate(1212%) hue-rotate(146deg) brightness(95%) contrast(98%)",
};

export default function Post({ post, id}) {
  const { user } = useAuth();
  
  const [likes, setLikes] = useState([]);
  //Comment
  const commentInput = useRef(null);
  const handleFocus = () => commentInput.current.focus();

  const [hasLiked, setHasLiked] = useState(false);
  /* const [postId, setPostId] = useRecoilState(postIdState); */
  const router = useRouter();
  const [activeUser, setActiveUser] = useState({});
  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "posts", id, "likes"),
      (snapshot) => setLikes(snapshot.docs)
    );
  }, [id]);
  useEffect(() => {
    async function getUserObjByUserId() {
      const [userGet] = await getUserByUserId(user.uid);
      setActiveUser(userGet);
    }

    if (user.uid != null) {
      getUserObjByUserId(user.uid);
    }
  }, [user]);

  useEffect(() => {
    setHasLiked(likes.findIndex((like) => like.id === user.uid) !== -1);
  }, [likes, user]);

  async function likePost() {
    if (hasLiked) {
      await deleteDoc(doc(db, "posts", id, "likes", user.uid));
    } else {
      
      await setDoc(doc(db, "posts", id, "likes", user.uid), {
        username: activeUser.username,
      });
    }
  }

  async function deletePost() {
    if (window.confirm("¿De verdad quires eliminar este artículo?")) {
      deleteDoc(doc(db, "posts", id));
      if (post.image) {
        deleteObject(ref(storage, `posts/${id}/image`));
      }
      router.push("/");
    }
  }

  return (
    <>
      {user ? (
        <div className="flex p-3 border-b border-[#c8bfbfc2] w-full bg-[#dedfe2] rounded-md">
          {/* Image */}
          <div className="pr-3">
            <div className="w-[50px] h-[50px]">
              {/* eslint-disable-next-line @next/next/no-img-element*/}
              <img
                src={post?.userImg}
                alt="user"
                className="rounded-full cursor-pointer hover:brightness-95 w-full h-full"
              />
            </div>
          </div>

          {/* right side */}
          <div className="w-[85%] pr-3">
            {/* Header */}
            <div className="flex items-center justify-between">
              {/* userinfo */}
              <div className="flex items-center space-x-1 whitespace-nowrap">
                <Link href={`p/${post?.username}`}>
                  <h4 className="font-bold text-[15px] sm:text-[16px] hover:underline cursor-pointer">
                    {post?.name}
                  </h4>
                </Link>

                <span className="text-sm sm:text-[15px]">
                  @{post?.username} -{" "}
                </span>
                <span className="text-sm sm:text-[15px] hover:underline">
                  <Moment fromNow>{post?.timestamp?.toDate()}</Moment>
                </span>
              </div>
              {/* dot icon */}
              <Image
                src={elipsis}
                style={iconStyle}
                alt="elipsis"
                className="h-10 hoverDot w-10 hover:fill-purple"
              />
            </div>
            {/* post text */}
            <p className="text-graySubTitle text-[15px sm:text-[16px] mb-2">
              {post?.text}
            </p>
            {/* post image or video */}

            <div className="w-full">
              {!post?.image && post?.video ? (
                <ReactPlayer
                  url={post?.data()?.video}
                  className="overflow-hidden rounded-2xl object-contain"
                  width={"100%"}
                />
              ) : (
                post?.image && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={post?.image} alt="shared" className="rounded-2xl" />
                )
              )}
            </div>
            {/* social icons */}
            <div className="flex justify-between text-graySubTitle">
              <div className="flex items-center ">
                <ChatIcon
                  className="h-9 w-9 hoverDot p-2 hover:text-greenColor hover:bg-[#acdbd8]"
                  onClick={handleFocus}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      handleFocus();
                    }
                  }}
                />
              </div>

              {user.uid === post?.id && (
                <TrashIcon
                  onClick={deletePost}
                  className="h-9 w-9 hoverDot p-2 hover:text-[#f06c6c]  hover:bg-[#fe9696]"
                />
              )}
              <div className="flex items-center ">
                {hasLiked ? (
                  <HeartFilled
                    onClick={likePost}
                    className="h-9 w-9 hoverDot p-2 text-[#f06c6c] hover:bg-[#fe9696]"
                  />
                ) : (
                  <HeartIcon
                    onClick={likePost}
                    className="h-9 w-9 hoverDot p-2 hover:text-[#f06c6c] hover:bg-[#fe9696]"
                  />
                )}
                {likes.length > 0 && (
                  <span className={`${hasLiked && "text-[#f06c6c]"} text-sm`}>
                    {likes.length}
                  </span>
                )}
              </div>

              <ShareIcon className="h-9 w-9 hoverDot p-2 hover:text-greenColor hover:bg-[#acdbd8]" />
              <ChartBarIcon className="h-9 w-9 hoverDot p-2 hover:text-greenColor hover:bg-[#acdbd8]" />
            </div>
            <Comments
              docId={id}
              comments={post?.comments}
              commentInput={commentInput}
            />
          </div>
        </div>
      ) : (
        <div className="ml-5 w-[269.58px] xl:mt-[82px] sm:mt-[82px] hidden xl:inline">
          <Skeleton animation="wave" height={400} className="w-full" />
        </div>
      )}
    </>
  );
}
