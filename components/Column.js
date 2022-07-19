import React from 'react';


const Column = ({Title, Desc, Link}) => {
  return (
    <div className='pr-2 pl-2 h-96'>
        <div className='w-48 pb-4 text-left border-b-4 text-yellowWefinder ml-5 mb-5'>
        </div>
        <h1 className='text-greenColor text-2xl h-16'>{Title}</h1>
        <div>
            <p className='text-graySubTitle' style={{height:"248px"}}>{Desc}</p>
        </div>
        <div>
            <a href=''>
                {Link}
            </a>
        </div>

    </div>
  )
}

export default Column