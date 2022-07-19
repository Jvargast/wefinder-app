import Image from 'next/image'
import React from 'react'

export default function SidebarMenuItem({text, Icon, active}) {
  return (
    <div className='flex flex-col items-center justify-center min-h-[77px] min-w-[80px] leading-[1.5] hoverEffect '>

      <div className='w-6 h-6 '>
        <Image src={Icon} className="h-7 w-7 even:rounded-full" alt='nav'/>
      </div>
      <span className={`text-greenColor text-xs ${active && "font-bold text-graySubTitle"} hidden xl:inline`}>{text}</span>
    </div>
  )
}
