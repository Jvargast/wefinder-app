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
const ReactPlayer = dynamic(() => import("react-player/lazy"), { ssr: false });

const iconStyle = {
  filter:
    "invert(33%) sepia(83%) saturate(1212%) hue-rotate(146deg) brightness(95%) contrast(98%)",
};

export default function Post({ post }) {
  return (
    <div className="flex p-3 cursor-pointer border-b border-[#c8bfbfc2]">
      {/* Image */}
      <div className="w-[70px] h-[70px] object-fill mr-4">
        {/* eslint-disable-next-line @next/next/no-img-element*/}
        <img
          src={post.userImg ? post.userImg : UserIcon}
          alt="user"
          className="rounded-full cursor-pointer hover:brightness-95"
        />
      </div>

      {/* right side */}
      <div>
        {/* Header */}
        <div className="flex items-center justify-between">
          {/* userinfo */}
          <div className="flex items-center space-x-1 whitespace-nowrap">
            <h4 className="font-bold text-[15px] sm:text-[16px] hover:underline">
              {post.name}
            </h4>
            <span className="text-sm sm:text-[15px]">@{post.username} - </span>
            <span className="text-sm sm:text-[15px] hover:underline">
              {post.timestamp}
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
        <p className="text-graySubTitle text-[15px sm:text-[16px] mb-2">{post.text}</p>
        {/* post image or video */}

        <div className="mr-2 w-[400px]">
          {!post.img && post.video ? (
              <ReactPlayer  url={post.video} className="overflow-hidden rounded-2xl object-contain" width={"100%"}/>
          ) : (
            post.img && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={post.img} alt="shared" className="rounded-2xl"/>
            )
          )}
        </div>
        {/* social icons */}
        <div className="flex justify-between text-graySubTitle">
          <ChatIcon className="h-9 w-9 hoverDot p-2 hover:text-greenColor hover:bg-[#acdbd8]" />
          <TrashIcon className="h-9 w-9 hoverDot p-2 hover:text-[#f06c6c]  hover:bg-[#f7c2c2]" />
          <HeartIcon className="h-9 w-9 hoverDot p-2 hover:text-[#f06c6c] hover:bg-[#f7c2c2]" />
          <ShareIcon className="h-9 w-9 hoverDot p-2 hover:text-greenColor hover:bg-[#acdbd8]" />
          <ChartBarIcon className="h-9 w-9 hoverDot p-2 hover:text-greenColor hover:bg-[#acdbd8]" />
        </div>
      </div>
    </div>
  );
}
