import { SearchIcon } from "@heroicons/react/outline";
import React, {useState} from "react";
import News from "./News";

export default function Widgets({ newsResults }) {
  const [articleNum, setArticleNum] = useState(3)

  return (
    <div className="mt-[82px] xl:w-[600px] hidden lg:inline ml-8 space-y-5">
      <div className="w-[90%] xl:w-[75%] sticky top-20 bg-white py-1.5 z-50">
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

        {newsResults.slice(0,articleNum).map((article) => (
          <News key={article.title} article={article} />
        ))}
        <button onClick={()=> setArticleNum(articleNum +3)} className="text-greenColor pl-3 pb-3 hover:text-[#296e43]">
          Mostrar más
        </button>
      </div>
    </div>
  );
}
