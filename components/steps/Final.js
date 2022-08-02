import { addDoc } from "firebase/firestore";
import { useSession } from "next-auth/react";
import {useContext, useState} from 'react';
import { StepperContext } from '../../context/StepperContext';

export default function Final() {
  const { data: session, status } = useSession();
  const {userData, setUserData} = useContext(StepperContext);
  const [finalData, setFinalData] = useState([]);

  
  const handleFinalData = async(e) => {
    e.preventDefault();
    setFinalData(userData);
    const {work, residence} = userData;
    console.log(userData)
    console.log(work)
    console.log(residence)
    //mandar a la base de datos
    /* await addDoc(collection(db, "users", session ? session.user.userId : null, "profile"), {
      timestamp: serverTimestamp(),
      work: input,
    }); */
  }
  return (
    <div className="container md:mt-10">
      <div className="flex flex-col items-center">
        <div className="wrapper">
          <svg
            className="checkmark"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 52 52"
          >
            <circle
              className="checkmark__circle"
              cx="26"
              cy="26"
              r="25"
              fill="none"
            />
            <path
              className="checkmark__check"
              fill="none"
              d="M14.1 27.2l7.1 7.2 16.7-16.8"
            />
          </svg>
        </div>

        <div className="mt-3 text-xl font-semibold uppercase text-greenColor">
          Felicitaciones!
        </div>
        <div className="text-lg font-semibold text-[#4e4d4d] ">
          Tú perfil ha sido creado con éxito
        </div>
        <a className="mt-10" href={`/profile/${session ? session?.user?.userId : null}`} onClick={handleFinalData}>
          <button className="h-10 px-5 text-greenColor transition-colors duration-150 border border-[#c4c0c0] rounded-lg focus:shadow-outline hover:bg-greenColor hover:text-[#23875b]" >
            Close
          </button>
        </a>
      </div>
    </div>
  )
}
