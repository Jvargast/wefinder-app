import Image from "next/image";
import React, { useEffect, useState } from "react";
import logo from "../assets/logo.png";
import bullsIcon from "../assets/bulls-eye.svg";
import arrowBg from "../assets/arrow.jpeg";
import loginBg from "../assets/background-login-section.jpeg";
import HeaderLink from "../components/HeaderLink";
import HeaderSocialLink from "../components/HeaderSocialLink";

import "animate.css";
import { getProviders, signIn, useSession } from "next-auth/react";
import Head from "next/head";

//Icons
import ExploreIcon from "@mui/icons-material/Explore";
import GroupIcon from "@mui/icons-material/Group";
import OndemandVideoSharpIcon from "@mui/icons-material/OndemandVideoSharp";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import { Instagram, LinkedIn, Mail, Twitter } from "@mui/icons-material";
import CheckIcon from "@mui/icons-material/Check";
import Checks from "../components/Checks";
import Column from "../components/Column";
import puzzleIcon from "../assets/puzzle.svg";
import connectIcon from "../assets/connect.svg";
import commentIcon from "../assets/comment-icon.svg";
import communityIcon from "../assets/community.svg";
import { useRouter } from "next/router";



function Home() {
  const router = useRouter();

/*   useEffect(() => {
    (async () => {
      const res = await getProviders();
      setProviders(res);
    })();
  }, []); */

  return (
    <div className="">
      <div className="bg-greenColor flex space-x-8 pr-5 justify-end">
        <div className="flex flex-row ">
          <HeaderSocialLink
            Icon={LinkedIn}
            alt="twitter"
            Link="https://www.linkedin.com/company/wefinder/"
          />
          <HeaderSocialLink
            Icon={Twitter}
            alt="twitter"
            Link="https://twitter.com/Wefinder_exp"
          />
          <HeaderSocialLink
            Icon={Instagram}
            alt="twitter"
            Link="https://www.instagram.com/wefinder_experience/"
          />
          <HeaderSocialLink
            Icon={Mail}
            alt="twitter"
            Link="mailto:info@wefinder.cl?Subject=Información%20adicional"
          />
        </div>
      </div>
      <header className="flex justify-around items-center py-4 border-b border-graySubTitle">
        <div className="relative w-80 h-10">
          <Image
            src={logo}
            objectFit="contain"
            layout="fill"
            alt="logo"
            priority="true"
          />
        </div>
        <div className="flex items-center sm:divide-x divide-gray-300">
          <div className="hidden sm:flex space-x-8 pr-4">
            <HeaderLink Icon={ExploreIcon} text="Buscar" />
            <HeaderLink Icon={GroupIcon} text="Personas" />
            <HeaderLink Icon={OndemandVideoSharpIcon} text="Aprender" />
            <HeaderLink Icon={BusinessCenterIcon} text="Empleos" />
          </div>
              <div className="pl-4 pr-4">
                <button
                  className="text-greenColor font-semibold rounded-full border border-greenColor px-5 py-1.5 transition-all hover:border-2"
                  onClick={()=> router.push("/login")}
                >
                  Iniciar sesión 
                </button>
             </div>
        </div>
      </header>
      <main className="flex flex-col xl:flex-column items-center mx-auto">
        <div className="flex items-center pt-10 mb-5">
          <Image
            src={bullsIcon}
            alt="bulls-eye"
            style={{
              filter:
                "invert(48%) sepia(77%) saturate(693%) hue-rotate(358deg) brightness(96%) contrast(100%)",
            }}
          />
        </div>
        <div className="space-y-6 xl:space-y-10 mt-4">
          <h1 className="text-3xl md:text-5xl text-greenColor font-extrabold">
            Conecta / Emprende / Impacta
          </h1>
        </div>
        <div className="space-y-6 xl:space-y-10 flex text-center mt-8">
          <h2 className="text-2xl md:text-2xl text-graySubTitle">
            Somos el espacio de conexión <br /> para el mundo del emprendimiento
            e innovación
          </h2>
        </div>
        <div className="relative" style={{ marginBottom: "-6.5px" }}>
          <Image src={arrowBg} alt="arrow" />
          <div className="absolute w-full flex justify-center items-center left-0 text-center top-48">
            <button className="rounded-3xl bg-greenColor shadow-lg pt-3 pb-3 pl-8 pr-8 text-white font-bold text-2xl">
              ¡Únete!
            </button>
          </div>
        </div>
        <section>
          <div className="xl:relative">
            <div
              className="absolute left-28 top-8  mb-10 pt-10 pb-10 "
              style={{ zIndex: "1" }}
            >
              <p className="text-greenColor text-2xl">
                <strong>Conecta </strong>
                más alla de tu propia red
                <br />
                <strong>Emprende </strong>
                tu idea
                <br />
                <strong>Impacta </strong>
                con nuevas soluciones
                <br />
              </p>
              <div className="w-48 pb-4 pt-4 text-left border-b-4 text-yellowWefinder ml-5 mb-5"></div>
              <div className="w-4/5">
                <p className="text-graySubTitle text-2xl mb-5">
                  Vínculamos{" "}
                  <strong>
                    &nbsp; conocimientos, habilidades y experiencias que{" "}
                  </strong>{" "}
                  <strong>generan innovación</strong>
                </p>
              </div>
              <div>
                <ul>
                  <Checks
                    Icon={CheckIcon}
                    text="¿Tienes una idea o tecnología con gran potencial que quieras impulsar?"
                  />
                  <Checks
                    Icon={CheckIcon}
                    text="¿Tienes una idea de negocios o una tecnología de impacto?"
                  />
                  <Checks
                    Icon={CheckIcon}
                    text="¿Buscas una tecnología para implementar tu solución?"
                  />
                  <Checks
                    Icon={CheckIcon}
                    text="¿Crees que tus habilidades podrían brillar en una startup?"
                  />
                </ul>
              </div>
            </div>
            <div className="flex justify-end" style={{ zIndex: "-1" }}>
              <div className="w-3/5 h-3/5">
                <Image src={loginBg} alt="login-bg" />
              </div>
            </div>
          </div>
          <div className="flex justify-center pt-3 pb-3 pr-3 pl-3 mb-5">
            <h1 className="text-3xl md:text-4xl text-graySubTitle font-black">
              Lo que Hacemos para tí
            </h1>
          </div>
        </section>
        <section className="max-w-screen-lg xl:flex-row max-w-screen-lg-auto">
          <div className="pr-40 pl-40 flex flex-row justify-center items-center">
            <div
              className="flex flex-col justify-center text-center items-center"
              style={{ height: "540px", animation: "fadeInDown 3s" }}
            >
              <div className=" w-52 h-24 flex items-center text-center justify-center">
                <Image
                  src={puzzleIcon}
                  alt="puzzle"
                  style={{
                    filter:
                      "invert(46%) sepia(89%) saturate(6017%) hue-rotate(160deg) brightness(95%) contrast(98%)",
                  }}
                />
              </div>

              <Column
                Title="Perfilamos tus intereses"
                Desc="Una vez registrado en la plataforma, crearemos tu perfil de acuerdo a intereses, habilidades y necesidades."
                Link="¡Regístrate!"
              />
            </div>
            <div
              className="flex flex-col justify-center text-center items-center"
              style={{ height: "540px", animation: "fadeInDown 4s" }}
            >
              <div className=" w-52 h-24 flex items-center text-center justify-center">
                <Image
                  src={bullsIcon}
                  alt="bulls"
                  style={{
                    filter:
                      "invert(46%) sepia(89%) saturate(6017%) hue-rotate(160deg) brightness(95%) contrast(98%)",
                  }}
                />
              </div>
              <Column
                Title="Generamos el Match"
                Desc="Basados en tu perfil te conectamos con aquellos que potencien tus fortalezas y complementen tus habilidades."
                Link="Saber más"
              />
            </div>
            <div
              className="flex flex-col justify-center text-center items-center"
              style={{ height: "540px", animation: "fadeInDown 5s" }}
            >
              <div className="w-52 h-24 flex items-center text-center justify-center ">
                <Image
                  src={connectIcon}
                  alt="bulls"
                  style={{
                    filter:
                      "invert(46%) sepia(89%) saturate(6017%) hue-rotate(160deg) brightness(95%) contrast(98%)",
                  }}
                />
              </div>

              <Column
                Title="Creamos espacios de conexión"
                Desc="Basados en tu perfil te conectamos con aquellos que potencien tus fortalezas y complementen tus habilidades."
                Link="+Conectados"
              />
            </div>
            <div
              className="flex flex-col justify-center text-center items-center"
              style={{ height: "540px", animation: "fadeInDown 6s" }}
            >
              <div className="w-52 h-24 flex items-center text-center justify-center">
                <Image
                  src={commentIcon}
                  alt="bulls"
                  style={{
                    filter:
                      "invert(46%) sepia(89%) saturate(6017%) hue-rotate(160deg) brightness(95%) contrast(98%)",
                  }}
                />
              </div>
              <Column
                Title="Informamos"
                Desc="Basados en tu perfil te conectamos con aquellos que potencien tus fortalezas y complementen tus habilidades."
                Link="¡Enteráte"
              />
            </div>
            <div
              className="flex flex-col justify-center text-center items-center"
              style={{ height: "540px", animation: "fadeInDown 7s" }}
            >
              <div className="w-52 h-24 flex items-center text-center justify-center">
                <Image
                  src={communityIcon}
                  alt="bulls"
                  style={{
                    filter:
                      "invert(46%) sepia(89%) saturate(6017%) hue-rotate(160deg) brightness(95%) contrast(98%)",
                  }}
                />
              </div>
              <Column
                Title="Generamos comunidad"
                Desc="Basados en tu perfil te conectamos con aquellos que potencien tus fortalezas y complementen tus habilidades."
                Link="Vitrina"
              />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Home;

/* export async function getServerSideProps(context) {
  const providers = await getProviders();

  return {
    props: {
      providers,
    },
  };
}  */
