import Image from "next/image";
import Link from "next/link";
import React from "react";

import UserIcon from "../assets/user.svg";
import cardbg from "../assets/card-bg.svg";
import plus from "../assets/plus-icon.svg";

export default function LeftSide() {
  return (
    <div className="ml-5 w-[269.58px] xl:mt-[82px] sm:mt-[82px] hidden xl:inline">
      <div className="overflow-hidden mb-2 rounded-md transition-shadow relative border-none shadow-md">
        <div className="pt-3 pr-3 pl-3 pb-4 break-words border-b-[1px] border-[#d6cec2] h-[160.95px] w-[269px]">
          <div className="h-[54px] -mt-3 -mr-3 -ml-3 mb-0">
            <Image
              src={cardbg}
              alt="bg"
              className="[background-position: center] "
            />
          </div>
          <div className="flex justify-center flex-col items-center -mt-[38px] mr-auto ml-auto mb-3">
            <div className="w-[72px] h-[72px]">
              <Image src={UserIcon} alt="profile" className="rounded-full" />
            </div>
            <div>
              <h4 className="text-sm">nombre de usuario</h4>
              <span className="text-sm text-[#d6cec2]">correo electronico</span>
            </div>
          </div>
        </div>
        <div className="text-xs px-3 py-1">widget</div>
        <div className="text-xs px-3 py-1">Item</div>
      </div>
      <div className="flex flex-col pt-2 text-left shadow-lg rounded-md transition-shadowxw mb-2">
        <Link href="/" className="text-graySubTitle ">
          <span className="text-xs px-3 py-1 hover:bg-[#E7F2F7] cursor-pointer">
            Grupos
          </span>
        </Link>
        <Link href="/">
          <span className="text-xs px-3 py-1 hover:bg-[#E7F2F7] cursor-pointer flex justify-between items-center">
            Eventos
            <Image src={plus} alt="plus" /> 
          </span>
        </Link>
        <Link href="/">
          <span className="text-xs px-3 py-1 hover:bg-[#E7F2F7] cursor-pointer">
            Tags Seguidos
          </span>
        </Link>
        <Link href="/">
          <span
            className="text-xs px-3 py-1 text-graySubTitle hover:bg-[#ECEFF1] border-t-[1px] border-[#d6cec2]"
            aria-disabled
          >
            Descubrir más
          </span>
        </Link>
      </div>
      {/* BUTTON*/}
      <div className="flex justify-center items-center">
        <button className="bg-greenColor text-white rounded-full w-56 h-12 font-bold shadow-md hover:brightness-95 text-lg hidden xl:inline">
          Publicar
        </button>
      </div>
    </div>
  );
}