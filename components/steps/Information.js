import {useContext} from 'react';
import { StepperContext } from '../../context/StepperContext';

export default function Information() {
  const {userData, setUserData} = useContext(StepperContext);

  const handleChange = (e)=> {
    const {name, value} = e.target;
    setUserData({... userData,[name]:value})
  }
  return (
    <div className='flex flex-col'>
      <div className="mx-2 w-full flex-1">
        <div className="mt-3 h-6 text-xs font-bold uppercase leading-8 text-[#8f8f8f]">
          Trabajo
        </div>
        <div className="my-2 flex rounded border border-[#c4c0c0] bg-white p-1">
          <input
            onChange={handleChange}
            value={userData["work"] || ""}
            name="work"
            placeholder="Trabajo"
            className="w-full appearance-none p-1 px-2 text-[#4e4d4d] outline-none"
          />
        </div>
      </div>
      <div className="mx-2 w-full flex-1">
        <div className="mt-3 h-6 text-xs font-bold uppercase leading-8 text-[#8f8f8f]">
          Residencia
        </div>
        <div className="my-2 flex rounded border border-[#c4c0c0] bg-white p-1">
          <input
            onChange={handleChange}
            value={userData["residence"] || ""}
            name="residence"
            placeholder="Residencia"
            type="password"
            className="w-full appearance-none p-1 px-2 text-[#4e4d4d] outline-none border-none"
          />
        </div>
      </div>
    </div>
  )
}
