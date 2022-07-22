import Image from "next/image";
import React from "react";
import UserIcon from "../assets/user.svg";
import elipsis from "../assets/elipsis-icon.svg";

import {
  ChartBarIcon,
  ChatIcon,
  HeartIcon,
  ShareIcon,
  TrashIcon,
} from "@heroicons/react/outline";
import dynamic from "next/dynamic";
import Moment from "react-moment";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useSession } from "next-auth/react";
const ReactPlayer = dynamic(() => import("react-player/lazy"), { ssr: false });

const iconStyle = {
  filter:
    "invert(33%) sepia(83%) saturate(1212%) hue-rotate(146deg) brightness(95%) contrast(98%)",
};

export default function Post({ post }) {
  const {data:session} = useSession();
  async function likePost(){
    await setDoc(doc(db, "posts", post.id, "likes", session.user.userId), {
      username: session.user.username,
    }) 
  }

  return (
    <div className="flex p-3 cursor-pointer border-b border-[#c8bfbfc2]">
      {/* Image */}
      <div className="w-[55px] h-[55px] object-fill mr-4">
        {/* eslint-disable-next-line @next/next/no-img-element*/}
        <img
          src={post ? post.data().userImg : UserIcon}
          alt="user"
          className="rounded-full cursor-pointer hover:brightness-95"
        />
      </div>

      {/* right side */}
      <div className="w-full">
        {/* Header */}
        <div className="flex items-center justify-between">
          {/* userinfo */}
          <div className="flex items-center space-x-1 whitespace-nowrap">
            <h4 className="font-bold text-[15px] sm:text-[16px] hover:underline">
              {post.data().name}
            </h4>
            <span className="text-sm sm:text-[15px]">@{post.data().username} - </span>
            <span className="text-sm sm:text-[15px] hover:underline">
              <Moment fromNow>{post?.data().timestamp?.toDate()}</Moment>
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
        <p className="text-graySubTitle text-[15px sm:text-[16px] mb-2">{post.data().text}</p>
        {/* post image or video */}

        <div className="w-[500px]">
          {!post.data().image && post.data().video ? (
              <ReactPlayer  url={post.data().video} className="overflow-hidden rounded-2xl object-contain" width={"100%"}/>
          ) : (
            post.data().image && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={post.data().image} alt="shared" className="rounded-2xl"/>
            )
          )}
        </div>
        {/* social icons */}
        <div className="flex justify-between text-graySubTitle">
          <ChatIcon className="h-9 w-9 hoverDot p-2 hover:text-greenColor hover:bg-[#acdbd8]" />
          <TrashIcon className="h-9 w-9 hoverDot p-2 hover:text-[#f06c6c]  hover:bg-[#fe9696]" />
          <HeartIcon onClick={likePost} className="h-9 w-9 hoverDot p-2 hover:text-[#f06c6c] hover:bg-[#fe9696]" />
          <ShareIcon className="h-9 w-9 hoverDot p-2 hover:text-greenColor hover:bg-[#acdbd8]" />
          <ChartBarIcon className="h-9 w-9 hoverDot p-2 hover:text-greenColor hover:bg-[#acdbd8]" />
        </div>
      </div>
    </div>
  );
}
