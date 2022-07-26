import React from "react";
import { Avatar, Button } from "@mui/material";
import { MoreVertOutlined, Search } from "@mui/icons-material";
import { ChatIcon } from "@heroicons/react/solid";
import * as EmailValidator from "email-validator"

export default function SidebarChat() {

  const createChat = () => {
    const input = prompt('Ingresa un email para conversar');
    if(!input) return null;
    if(EmailValidator.validate(input)) {
        
    }
  }
  return (
    <div className="mt-[82px] w-full">
      <div className="flex sticky top-0 bg-white z-10 justify-between items-center h-[80px] border-b border-graySubTitle">
        <Avatar className="cursor-pointer hover:opacity-80" />
        <div>
          <div>
            <ChatIcon />
          </div>
          <div>
            <MoreVertOutlined />
          </div>
        </div>
      </div>
      <div className="flex items-center p-5 rounded-sm">
        <Search/>
        <input placeholder="Buscar en el chat" className="outline-none border-[none] flex-1"/>
      </div>
      <Button className="w-full text-graySubTitle border-t border-b border-graySubTitle" onClick={createChat}>Comenzar nuevo chat</Button>
      {/*List of Chats */}

    </div>
  );
}
