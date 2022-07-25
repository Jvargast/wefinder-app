import { useRecoilState } from "recoil";
import { modalState, postIdState } from "../atom/modalAtom";
import { userState } from "../atom/userAtom";
import Modal from "react-modal";
import { XIcon } from "@heroicons/react/outline";
import { useEffect, useState } from "react";
import { addDoc, collection, doc, onSnapshot, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import Moment from "react-moment";
import { PhotographIcon } from "@heroicons/react/solid";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";


export default function CommentModal() {
  const [open, setOpen] = useRecoilState(modalState);
  const [postId] = useRecoilState(postIdState);
  //const [currentUser] = useRecoilState(userState);
  const [post, setPost] = useState({});
  const [input, setInput] = useState("");
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    onSnapshot(doc(db, "posts", postId), (snapshot) => {
      setPost(snapshot);
    });
  }, [postId]);

  async function sendComment() {
    await addDoc(collection(db, "posts", postId, "comments"), {
      comment: input,
      name: session.user.name,
      username: session.user.username,
      userImg: session.user.image,
      timestamp: serverTimestamp(),
      userId: session.user.userId,
    });

    setOpen(false);
    setInput("");
    router.push(`/posts/${postId}`);
  }

  return (
    <div className="mt-[82px]">
      {open && (
        <Modal
          isOpen={open}
          ariaHideApp={false}
          onRequestClose={() => setOpen(false)}
          className="max-w-lg w-[90%]  absolute top-48 left-[48%] translate-x-[-50%] bg-white border-2 border-[#d6cec2] rounded-xl shadow-md"
        >
          <div className="p-1">
            <div className="border-b border-[#d6cec2] py-2 px-1.5">
              <div className="hoverEffect w-9 h-9 hover:bg-[#9a9393] flex items-center justify-center">
                <XIcon
                  onClick={() => setOpen(false)}
                  className="h-[22px] text-[#403e3e] cursor-pointer"
                />
              </div>
            </div>
            <div className="p-2 flex items-center space-x-1 relative">
              <span className="w-0.5 h-full z-[-1] absolute left-8 top-11 bg-[#9a9393]" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={post?.data()?.userImg}
                alt="username"
                className="h-11 w-11 rounded-full mr-4"
              />
              <h4 className="font-bold text-[15px] sm:text-[16px] hover:underline">
                {post?.data()?.name}
              </h4>
              <span className="text-sm sm:text-[15px]">
                @{post?.data()?.username} -{" "}
              </span>
              <span className="text-sm sm:text-[15px] hover:underline">
                <Moment fromNow>{post?.data()?.timestamp?.toDate()}</Moment>
              </span>
            </div>
            <p className="text-[#9a9393] text-[15px] sm:text-[16px] ml-16 mb-2">
              {post?.data()?.text}
            </p>
            <div className="flex  p-3 space-x-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={session?.user.image}
                alt="user-img"
                className="h-11 w-11 rounded-full cursor-pointer hover:brightness-95"
              /> 
              <div className="w-full divide-y divide-[#9a9393]">
                <div className="">
                  <textarea
                    className="w-full border-none focus:ring-0 text-xs placeholder-graySubTitle tracking-wide min-h-[50px]"
                    rows="2"
                    placeholder="Publica tu comentario"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                  ></textarea>
                </div>

                <div className="flex items-center justify-between pt-2.5">
                  <div className="flex">
                    <div
                      className=""
                      // onClick={() => filePickerRef.current.click()}
                    >
                      <PhotographIcon className="h-10 w-10 hoverEffect p-2 text-sky-500 hover:bg-yellowWefinder" />
                      {/* <input
                        type="file"
                        hidden
                        ref={filePickerRef}
                        onChange={addImageToPost}
                      />  */}
                    </div>
                  </div>
                  <button
                    onClick={sendComment}
                    disabled={!input.trim()}
                    className="bg-greenColor text-white px-4 py-1.5 rounded-full font-bold shadow-md hover:brightness-95 disabled:opacity-50"
                  >
                    Reply
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
