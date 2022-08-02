import cardbg from "../assets/card-bg.svg";
import Image from "next/image";
import { StepperContext } from "../context/StepperContext";
import { useSession } from "next-auth/react";
import Stepper from "./Stepper";
import StepperControl from "./StepperControl";
import Information from "./steps/Information";
import Final from "./steps/Final";
import { useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, query, where } from "firebase/firestore";
import { db } from "../firebase";

export default function ProfileDetails() {
  const { data: session, status } = useSession();

  const [userData, setUserData] = useState("");
  const [finalData, setFinalData] = useState([]);
  const [currentStep, setCurrentStep] = useState(1);
  const steps = ["Personal Details", "More information", "Complete"];


  //Si no existe un perfilId con el Id del usuario, se crea
  const colRef = collection(db, "users");
  const q1= query(colRef, where("profileId", "==", session ? session.user.userId:null));
  const [profileSnapshot, loading, error] = useCollection(q1);


  //Una vez creado el perfil se trae la info
  const [profileData, setProfileData] = useState([]);


  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(db, "users", session.user.userId, "profile")),
      (snapshot) => setProfileData(snapshot.docs)
    );
  }, [session.user.userId]);
  

  const displayStep = (step) => {
    switch (step) {
      case 1:
        return <Information/>;
      case 2:
        return;
      case 3:
        return <Final/>;
      default:
    }
  };

  const handleClick = (direction) => {
    let newStep = currentStep;

    direction === "next" ? newStep++ : newStep--;
    // check if steps are within bounds
    newStep > 0 && newStep <= steps.length && setCurrentStep(newStep);
  };
  
  return (
    <div className="mt-[83px]">
      <div className="overflow-hidden mb-2 rounded-md transition-shadow relative border-none shadow-md w-full">
        <div className="pt-3 pr-3 pl-3 pb-4 break-words border-b-[1px] border-[#d6cec2]">
          <div className=" -mt-3 -mr-3 -ml-3 mb-0 -z-10">
            <Image
              src={cardbg}
              alt="bg"
              className="[background-position: center] -z-10 "
            />
          </div>
          <div className="flex justify-center flex-col items-center -mt-[38px] mr-auto ml-auto mb-3">
            <div className="w-[100px] h-[100px] z-15">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={session?.user.image}
                alt="profile"
                className="rounded-full w-[100px] h-[100px]"
              />
            </div>
            <div className="flex flex-col text-center">
              <h4 className="text-sm">{session?.user.name}</h4>
              <span className="text-sm text-[#d6cec2]">
                @{session?.user.username}
              </span>
              {profileSnapshot?.docs?.length > 0 ? (
                <span>profile.description</span>
              ) : (
                <span>No tienes una descripción, porfavor crea un perfil</span>
              )}
            </div>
          </div>
        </div>
      </div>
      {profileSnapshot?.docs?.length > 0 ? (
        <div>Ya tienes tu perfil completo</div>
      ) : (
        <div className="md:w-1/2 mx-auto shadow-xl rounded-2xl pb-2 bg-white">
          <div className="container horizontal mt-6">
            <h2 className="text-2xl flex items-center justify-center">Creando Perfil</h2>
            <Stepper steps={steps} currentStep={currentStep} />
            <div className="my-10 p-10">
              <StepperContext.Provider
                value={{ userData, setUserData, finalData, setFinalData }}
              >
                {displayStep(currentStep)}
              </StepperContext.Provider>
            </div>
          </div>
          {currentStep !== steps.length && (
            <StepperControl
              handleClick={handleClick}
              currentStep={currentStep}
              steps={steps}
            />
          )}
        </div>
      )}
    </div>
  );
}
