import {SparklesIcon} from "@heroicons/react/outline"
import Input from "./Input"
import Post from "./Post"

export default function Feed() {

  const posts = [
    {
        id:"1",
        name: "name",
        username:"username",
        userImg: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
        img: "https://images.unsplash.com/photo-1658237783206-e1ae5b72eeb5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
        video: "",
        text: "niceview",
        timestamp: "2 hours ago"
    },
    {
        id:"2",
        name: "name2",
        username:"username2",
        userImg: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
        img: "",
        video: "https://www.youtube.com/watch?v=YvGSK8mIlt8&t=1s",
        text: "niceview",
        timestamp: "2 days ago"
    },

  ]
  return (
    <div className='xl:ml-[20px] xl:min-w-[576px] border-l border-r sm:ml-[73px] xl:mt-[82px] sm:mt-[82px] flex-grow max-w-xl border-[#d6cec2]'>
        <div className='sticky flex py-2 px-3 top-[4.5rem] z-50 bg-white border-b border-[#e3dfd9]'>
            <h2 className='text-lg sm:text-xl font-bold cursor-pointer'>Home</h2>
            <div className='hoverEffect flex items-center justify-center px-0 ml-auto w-9 h-9'>
                <SparklesIcon className="h-5"/>
            </div>
        </div>
        <Input/>
        {posts.map((post) => (
            <Post key={post.id} post={post}/>
        ))}
    </div>
  )
}
