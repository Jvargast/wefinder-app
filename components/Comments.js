import { useState } from "react";
import Link from "next/link";
import { db } from "../firebase";
import { arrayUnion, doc, setDoc } from "firebase/firestore";
import { useSession } from "next-auth/react";

export default function Comments({
  docId,
  comments: allComments,
  commentInput,
}) {
  const {data:session} = useSession();
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState(allComments);
  const [commentsSlice, setCommentsSlice] = useState(3);

  const showNextComents = () => {
    console.log(commentsSlice)
    setCommentsSlice(commentsSlice+ 3);
  }
  

  const handleSubmitComment = async(e) => {
    e.preventDefault();
    setComments([...comments,{displayName: session?.user.username, comment}]);
    await setDoc(doc(db, "posts", docId), {
        comments: arrayUnion({ displayName:session?.user.username, comment:comment, createdAt: new Date().toString() }),
      },{merge:true});
    setComment("");
  };

  return (
    <>
      <div className="p-4 pt-1 pb-4">
        {comments.length >= 3 && commentsSlice < comments.length && (
          <p className="text-sm text-[#8d8989] mb-1 cursor-pointer" onClick={showNextComents} onKeyDown={(event) => {
            if(event.key === 'Enter') {
                showNextComents();
            }
          }}>
            Ver más comentarios
          </p>
        )}
        {comments.slice(0, commentsSlice).map((item, i) => (
          <p key={i} className="mb-1">
            <Link href={`p/${item.displayName}`} className="cursor-pointer">
              <span className="mr-1 font-bold">{item.displayName}</span>
            </Link>
            <span>{item.comment}</span>
          </p>
        ))}
      </div>
      <div className="">
        <form
          className="flex justify-between pl-0 pr-5"
          method="POST"
          onSubmit={(event) =>
            comment.length >= 1
              ? handleSubmitComment(event)
              : event.preventDefault()
          }
        >
          <input
            className="text-sm w-full text-[#686767] mr-3 py-5 px-4 border-none"
            type="text"
            name="add-coment"
            aria-label="Añadir comentario"
            autoComplete="off"
            placeholder="Añadir comentario"
            value={comment}
            onChange={({ target }) => setComment(target.value)}
            ref={commentInput}
          />
          <button
            className={`text-sm font-bold text-greenColor cursor-pointer ${
              !comment && "opacity-25"
            }`}
            type="button"
            disabled={comment.length < 1}
            onClick={handleSubmitComment}
          >
            Enviar
          </button>
        </form>
      </div>
    </>
  );
}
