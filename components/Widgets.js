import { SearchIcon } from "@heroicons/react/outline";
import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import News from "./News";

export default function Widgets({ newsResults, randomUsersResults }) {
  const [articleNum, setArticleNum] = useState(3);
  const [randomUserNum, setRandomUserNum] = useState(3);

  return (
    <div className="mt-[82px] xl:w-[600px] hidden lg:inline ml-8 space-y-5">
      <div className="w-[90%] xl:w-[75%] sticky top-[4.5rem] bg-white py-1.5 z-50">
        <div className="flex items-center p-3 rounded-full bg-bermuda relative">
          <SearchIcon className="h-5 z-50 text-graySubTitle" />
          <input
            className="absolute inset-0 rounded-full pl-11 border-[#dcd4d4] text-[#929090d9] focus:shadow-lg bg-[#c6c2c2] focus:bg-white"
            type="text"
            placeholder="Buscar"
          />
        </div>
      </div>

      <div className="text-graySubTitle space-y-3 bg-[#dddbdb] rounded-xl pt-2 w-[90%] xl:w-[75%]">
        <h4 className="font-bold text-xl px-4">¿Qué está pasando?</h4>
        <AnimatePresence>
          {newsResults.slice(0, articleNum).map((article) => (
            <motion.div
              key={article.title}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
            >
              <News key={article.title} article={article} />
            </motion.div>
          ))}
        </AnimatePresence>

        <button
          onClick={() => setArticleNum(articleNum + 3)}
          className="text-greenColor pl-4 pb-3 hover:text-[#296e43]"
        >
          Ver más
        </button>
      </div>
      <div className="sticky top-32 text-graySubTitle space-y-3 bg-[#dddbdb] rounded-xl pt-2 w-[90%] xl:w-[75%] ">
        <h4 className="font-bold text-xl px-4">¿A quién seguir?</h4>
        <AnimatePresence>
          {randomUsersResults.slice(0, randomUserNum).map((randomUser) => (
            <motion.div
              key={randomUser.login.username}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
            >
              <div
                key={randomUser.login.username}
                className="flex items-center px-4 py-2 cursor-pointer hover:bg-[#b3b0b0] transition duration-200"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={randomUser.picture.thumbnail}
                  alt="user"
                  className="rounded-full"
                  width="40"
                />
                <div className="truncate ml-3 leading-5">
                  <h4 className="font-bold hover:underline text-[14px] truncate">
                    {randomUser.login.username}
                  </h4>
                  <h5 className="text-[13px] text-graySubTitle truncate]">
                    {randomUser.name.first + " " + randomUser.name.last}
                  </h5>
                </div>
                <button className="ml-auto bg-midnight text-white rounded-full text-sm px-3.5 py-1.5 font-bold">
                  Seguir
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        <button
          className="text-greenColor pl-4 pb-3 hover:text-[#296e43]"
          onClick={() => setRandomUserNum(randomUserNum + 3)}
        >
          Ver más
        </button>
      </div>
    </div>
  );
}
