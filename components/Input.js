import Image from 'next/image'
import React from 'react';
import UserIcon from "../assets/user.svg";
import photoIcon from "../assets/photo-icon.svg"
import videoIcon from "../assets/video-icon.svg"
import eventIcon from "../assets/event-icon.svg"
import articleIcon from "../assets/article-icon.svg";

const iconStyle = {
    filter:"invert(33%) sepia(83%) saturate(1212%) hue-rotate(146deg) brightness(95%) contrast(98%)"
}

const hoverStyle = {
    backgroundColor: "#FFB900",
}

export default function Input() {
  return (
    <div className='flex border-b border-[#c8bfbfc2] p-3 space-x-3'>
        <div className='w-[72px] h-[72px]'>
            <Image src={UserIcon} alt="user" className='rounded-full cursor-pointer hover:brightness-95'/>
        </div>
        <div className='w-full '>
            <div className='divide-y divide-graySubTitle'>
                <textarea className='w-full border-none focus:ring-0 text-lg placeholder-graySubTitle tracking-wide min-h-[50px]' placeholder='¿De qué quieres hablar?'></textarea>
            </div>
            <div className='flex flex-row justify-between items-center pt-2.5'>
                <div className=' flex flex-row cursor-pointer items-center'>
                    <div className='h-6 w-6 '>
                        <Image src={photoIcon} alt="picon" style={iconStyle} />
                    </div>
                    <span className='text-sm text-greenColor ml-1 hover:text-yellowWefinder transition ease-out'>Foto</span>
                </div>
                <div className='flex flex-row cursor-pointer items-center'>
                    <div className='h-6 w-6'>
                        <Image src={videoIcon} alt="vicon" style={iconStyle}/>
                    </div>
                    <span className='text-sm text-greenColor ml-1 hover:text-yellowWefinder transition ease-out'>Video</span>
                </div>
                <div className=' flex flex-row cursor-pointer items-center'>
                    <div className='h-6 w-6 '>
                        <Image src={eventIcon} alt="eicon" style={iconStyle}/>
                    </div>
                    <span className='text-sm text-greenColor ml-1 hover:text-yellowWefinder transition ease-out'>Evento</span>
                </div>
                <div className=' flex flex-row cursor-pointer items-center'>
                    <div className='h-6 w-6'>
                        <Image src={articleIcon} alt="aicon" style={iconStyle}/>
                    </div>
                    <span className='text-sm text-greenColor ml-1 hover:text-yellowWefinder transition ease-out'>Artículo</span>
                </div>
                
                
                
                <button className='bg-greenColor text-white px-4 py-1.5 rounded-full font-bold shadow-md hover:brightness-95 disabled:opacity-50' disabled>Publicar</button>
            </div>
            
        </div>
        
    </div>
  )
}
