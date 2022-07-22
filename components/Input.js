import Image from "next/image";
import React, { useEffect, useState } from "react";
import userIcon from "../assets/user.svg";
import photoIcon from "../assets/photo-icon.svg";
import videoIcon from "../assets/video-icon.svg";
import eventIcon from "../assets/event-icon.svg";
import articleIcon from "../assets/article-icon.svg";

import spiner from "../assets/spin-loader-icon.svg";
import { useSession, getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { Skeleton } from "@mui/material";
//import { redirect } from "next/dist/server/api-utils";

const iconStyle = {
  filter:
    "invert(33%) sepia(83%) saturate(1212%) hue-rotate(146deg) brightness(95%) contrast(98%)",
};

export default function Input() {
  const { data: session, status } = useSession();
  const router = useRouter();

  //console.log(session, status);

  if (status === "loading") {
    return (
      <div className="w-[60px] h-[60px]">
        <Image src={spiner} alt="spin" className="" />
      </div>
    );
  }
  if (status === "unauthenticated") {
    router.push("/auth/Signin");
  }

  return (
    <>
      {session ? (
        <div className="flex border-b border-[#c8bfbfc2] p-3 space-x-3">
          <div className="w-[72px] h-[72px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={session.user.image}
              alt="user"
              className="rounded-full cursor-pointer hover:brightness-95"
            />
          </div>
          <div className="w-full ">
            <div className="divide-y divide-graySubTitle">
              <textarea
                className="w-full border-none focus:ring-0 text-lg placeholder-graySubTitle tracking-wide min-h-[50px]"
                placeholder="¿De qué quieres hablar?"
              ></textarea>
            </div>
            <div className="flex flex-row justify-between items-center pt-2.5">
              <div className=" flex flex-row cursor-pointer items-center">
                <div className="h-6 w-6 ">
                  <Image src={photoIcon} alt="picon" style={iconStyle} />
                </div>
                <span className="text-sm text-greenColor ml-1 hover:text-yellowWefinder transition ease-out">
                  Foto
                </span>
              </div>
              <div className="flex flex-row cursor-pointer items-center">
                <div className="h-6 w-6">
                  <Image src={videoIcon} alt="vicon" style={iconStyle} />
                </div>
                <span className="text-sm text-greenColor ml-1 hover:text-yellowWefinder transition ease-out">
                  Video
                </span>
              </div>
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
                disabled
              >
                Publicar
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="border-b border-[#c8bfbfc2]">
          <Skeleton
          animation="wave"
          height={200}
          className="mr-5 ml-5 -mt-5"
        />
        </div>
      )}
    </>
  );
}

export const getServerSideProps = async(context) => {

  const session = await getSession(context);

  if(!session) {
    redirect:{
      destination: '/Signin'
      permanent: false
    }
  }
  return {
    props: {
      session
    }
  }
}
