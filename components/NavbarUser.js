import { Transition, Disclosure } from "@headlessui/react";
import Image from "next/image";
import { Link } from "react-scroll";
import { useRef, useState } from "react";
import { useSession, getSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";

//Icons
import logo from "../assets/logo.png";
import UserIcon from "../assets/user.svg";
import HomeIcon from "../assets/nav-home.svg";
import NetIcon from "../assets/nav-network.svg";
import JobsIcon from "../assets/nav-jobs.svg";
import MesIcon from "../assets/nav-messaging.svg";
import WorkIcon from "../assets/nav-work.svg";
import spiner from "../assets/spin-loader-icon.svg";


const navigation = [
  { name: "Dashboard", href: "#", current: true },
  { name: "Team", href: "#", current: false },
  { name: "Projects", href: "#", current: false },
  { name: "Calendar", href: "#", current: false },
];

export default function NavbarUser() {
  const [isOpen, setIsOpen] = useState(false);
  const [active, setActive] = useState(false);

  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return (
      <div className="w-[60px] h-[60px]">
        <Image src={spiner} alt="spin" className="" />
      </div>
    );
  }
  if (status === "unauthenticated") {
    router.push("/auth/Signin");
  }
  

  return (
    <div className="sm:block fixed z-[100] pr-6 pl-6 pt-0 pb-0 bg-[#98C5DA] shadow-sm w-full">
      <div className="w-full">
        <div className="flex items-center h-20 md:w-full">
          {/*LOGO */}
          <div className="flex items-center mx-20 justify-between w-full">
            <div className="flex justify-center items-center flex-shrink-0">
              <Image src={logo} alt="logo" className="mr-5" />
            </div>
            <div className="hidden md:block space-x-0 md:space-x-4">
              <div className="flex items-center">
                <Link
                  activeClass="inicio"
                  to="inicio"
                  smooth={true}
                  offset={50}
                  duration={500}
                  className="cursor-pointer text-greenColor font-semibold"
                  onClick={()=> router.push("/")}
                >
                  <div className="flex flex-col items-center justify-center min-h-[77px] min-w-[60px] leading-[1.5] hoverEffect xl:min-w-[80px]">
                    <div className="w-6 h-6 ">
                      <Image
                        src={HomeIcon}
                        className="h-7 w-7 even:rounded-full"
                        alt="nav"
                      />
                    </div>
                    <span className="text-md">Inicio</span>
                  </div>
                </Link>
                <Link
                  activeClass="redes"
                  to="redes"
                  smooth={true}
                  offset={50}
                  duration={500}
                  className="cursor-pointer text-greenColor hover:text-white rounded-md text-sm font-medium"
                >
                  <div className="flex flex-col items-center justify-center min-h-[77px] min-w-[80px] leading-[1.5] hoverEffect ">
                    <div className="w-6 h-6 ">
                      <Image
                        src={NetIcon}
                        className="h-7 w-7 even:rounded-full"
                        alt="nav"
                      />
                    </div>
                    <span className="text-md">Mi red</span>
                  </div>
                </Link>
                <Link
                  activeClass="trabajos"
                  to="trabajos"
                  smooth={true}
                  offset={50}
                  duration={500}
                  className="cursor-pointer text-greenColor hover:text-white  rounded-md text-sm font-medium"
                >
                  <div className="flex flex-col items-center justify-center min-h-[77px] min-w-[80px] leading-[1.5] hoverEffect ">
                    <div className="w-6 h-6 ">
                      <Image
                        src={JobsIcon}
                        className="h-7 w-7 even:rounded-full"
                        alt="nav"
                      />
                    </div>
                    <span className="text-md">Trabajos</span>
                  </div>
                </Link>

                <Link
                  activeClass="mensajes"
                  to="/chat"
                  smooth={true}
                  offset={50}
                  duration={500}
                  className="cursor-pointer text-greenColor hover:text-white  rounded-md text-sm font-medium"
                  onClick={()=> router.push("/chat")}
                >
                  <div className="flex flex-col items-center justify-center min-h-[77px] min-w-[80px] leading-[1.5] hoverEffect ">
                    <div className="w-6 h-6 ">
                      <Image
                        src={MesIcon}
                        className="h-7 w-7 even:rounded-full"
                        alt="nav"
                      />
                    </div>
                    <span className="text-md">Mensajes</span>
                  </div>
                </Link>
                <li
                  className="cursor-pointer text-greenColor rounded-md text-sm font-medium items-center list-none"
                  onClick={()=>setActive(!active)}
                >
                  <div className="flex flex-col items-center justify-center min-h-[77px] min-w-[80px] leading-[1.5] hoverEffect ">
                    <div className="w-7 h-7">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={session?.user?.image}
                        className="h-7 w-7 rounded-full"
                        alt="nav"
                      />
                    </div>
                    <span className="text-md">Yo</span>
                  </div>
                  <div className={active ?  `absolute top-[80px] rigth-[30px] bg-white shadow-lg px-3 py-3`:`hidden  before:content-[''] before:absolute before:top-0`}>
                    <ul>
                        <li className="text-[#000] hover:text-[#c1ebeb] mb-1">Perfil</li>
                        <li onClick={()=> signOut()} className="cursor-pointer text-[#000] hover:text-[#c1ebeb]">Cerrar Sesión</li>
                    </ul>
                  </div>
                </li>
                
                <Link
                  activeClass="vitrina"
                  to="vitrina"
                  smooth={true}
                  offset={50}
                  duration={500}
                  className="cursor-pointer text-greenColor hover:text-white rounded-md text-sm font-medium items-center"
                >
                  <div className="flex flex-col items-center justify-center min-h-[77px] min-w-[80px] leading-[1.5] hoverEffect ">
                    <div className="w-6 h-6 ">
                      <Image
                        src={WorkIcon}
                        className="h-7 w-7 even:rounded-full"
                        alt="nav"
                      />
                    </div>
                    <span className="text-md">Vitrina</span>
                  </div>
                </Link>
              </div>
            </div>
          </div>
          <div className="mr-10 flex md:hidden ">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="bg-[#000] inline-flex items-center justify-center p-2 rounded-md text-white  hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-800 focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {!isOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
      <Transition
        show={isOpen}
        enter="transition ease-out duration-100 transform"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="transition ease-in duration-75 transform"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <div className="sm:hidden pb-5" id="mobile-menu">
          <div className="bg-white px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              href="/"
              activeClass="home"
              to="/"
              smooth={true}
              offset={50}
              duration={500}
              className="cursor-pointer hover:bg-blue-600 text-black hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              Home
            </Link>
            <Link
              href="/about"
              activeClass="about"
              to="about"
              smooth={true}
              offset={50}
              duration={500}
              className="cursor-pointer hover:bg-blue-600 text-black hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              About
            </Link>

            <Link
              href="/work"
              activeClass="work"
              to="work"
              smooth={true}
              offset={50}
              duration={500}
              className="cursor-pointer hover:bg-blue-600 text-black hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              Projects
            </Link>
            <Link
              href="/services"
              activeClass="services"
              to="services"
              smooth={true}
              offset={50}
              duration={500}
              className="cursor-pointer hover:bg-blue-600 text-black hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              Services
            </Link>

            <Link
              href="/contact"
              activeClass="work"
              to="work"
              smooth={true}
              offset={50}
              duration={500}
              className="cursor-pointer hover:bg-blue-600 text-black hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              Contact
            </Link>
          </div>
        </div>
      </Transition>
    </div>
  );
}
