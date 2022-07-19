import Image from "next/image";
import React from "react";

import logo from "../assets/logo.png";
import UserIcon from "../assets/user.svg";
import HomeIcon from "../assets/nav-home.svg";
import NetIcon from "../assets/nav-network.svg";
import JobsIcon from "../assets/nav-jobs.svg";
import MesIcon from "../assets/nav-messaging.svg";
import WorkIcon from "../assets/nav-work.svg";
import SidebarMenuItem from "./SidebarMenuItem";

export default function Sidebar() {
  return (
    <div className="left-0 sm:block fixed z-[100] w-[100vw] pr-6 pl-6 pt-0 pb-0 bg-[#98C5DA]">
      {/* LOGO*/}
      <div className="flex items-center mr-auto ml-auto mt-0 mb-0 min-h-full max-w-6xl h-[76px] justify-between">
        <div className="">
          <Image src={logo} alt="logo" className="mr-5" />
        </div>
        {/* MENU*/}
        <div className="flex flex-row">
          <SidebarMenuItem text="Inicio" Icon={HomeIcon} active/>
          <SidebarMenuItem text="Mi red" Icon={NetIcon} />
          <SidebarMenuItem text="Trabajos" Icon={JobsIcon} />
          <SidebarMenuItem text="Mensajes" Icon={MesIcon} />
          <SidebarMenuItem text="Perfil" Icon={UserIcon} />
          <SidebarMenuItem text="Vitrina" Icon={WorkIcon} />
        </div>
      </div>
    </div>
  );
}
