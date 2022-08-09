import { AnimatePresence, motion } from 'framer-motion';
import React from 'react'
import Skeleton from 'react-loading-skeleton'
import "react-loading-skeleton/dist/skeleton.css";
import Post from '../Post';

export default function Photos({photos}) {

  return (
    <div className="border-t border-gray-primary mt-12 pt-4">
      <div className="xl:ml-[20px] xl:min-w-[576px] border-l border-r sm:ml-[73px] flex-grow max-w-xl border-[#d6cec2]">
      <AnimatePresence >
            {photos.map((content, index) => (
              <div key={index} className="mt-4 ">
                <motion.div
                  key={content.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1 }}
                  className=""
                >
                  <Post post={content} id={content.docId} className=""/>
                </motion.div>
              </div>
            ))}
          </AnimatePresence>
          </div>

      {!photos || (photos.length === 0 && <p className="text-center text-2xl">No Posts Yet</p>)}
    </div>
  )
}
