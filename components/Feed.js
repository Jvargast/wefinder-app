import {SparklesIcon} from "@heroicons/react/outline"
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import Input from "./Input"
import Post from "./Post"

export default function Feed() {

  const [posts, setPosts] = useState([]);

  useEffect(()=>onSnapshot(query(collection(db,"posts"), orderBy("timestamp", "desc")), (snapshot) => {setPosts(snapshot.docs);}),[]) 

  return (
    <div className='xl:ml-[20px] xl:min-w-[576px] border-l border-r sm:ml-[73px] xl:mt-[82px] sm:mt-[82px] flex-grow max-w-xl border-[#d6cec2]'>
        <div className='sticky flex py-2 px-3 top-[4.5rem] z-50 bg-white border-b border-[#e3dfd9]'>
            <h2 className='text-lg sm:text-xl font-bold cursor-pointer'>Home</h2>
            <div className='hoverEffect flex items-center justify-center px-0 ml-auto w-9 h-9'>
                <SparklesIcon className="h-5"/>
            </div>
        </div>
        <Input/>
        <AnimatePresence>
        {posts.map((post) => (
          <motion.div key={post.id} initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{duration:1}}>
            <Post key={post.id} post={post}/>
          </motion.div>
            
        ))}
        </AnimatePresence>
    </div>
  )
}
