 import React from 'react'
 
 export default function News({article}) {
   return (
     <a href={article.url}>
        <div className='flex items-center justify-between px-4 py-2 space-x-1 hover:bg-[#b3b0b0] transition duration-200'>
            <div className='space-x-0.5'>
                <h6 className='text-sm font-bold'>{article.title}</h6>
                <p className='text-xs font-medium text-[#bcbaba]'>{article.source.name}</p>
            </div>
            { /*eslint-disable-next-line @next/next/no-img-element*/}
            <img src={article.urlToImage} alt='new-photo' className='rounded-xl' width="70" />
        </div>
        
     </a>
   )
 }
 