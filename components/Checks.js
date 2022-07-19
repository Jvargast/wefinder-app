import React from 'react'

const Checks = ({Icon, text}) => {
  return (
    <li className='flex flex-row text-center'>
        <div className='text-yellowWefinder'>
            <Icon />
        </div>
        <span className='text-graySubTitle mb-1 text-xs'>{text}</span>
    </li>
  )
}

export default Checks