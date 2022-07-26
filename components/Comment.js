import {
  ChartBarIcon,
  ChatIcon,
  DotsHorizontalIcon,
  HeartIcon,
  ShareIcon,
  TrashIcon,
} from "@heroicons/react/outline";
import { HeartIcon as HeartIconFilled } from "@heroicons/react/solid";
import Moment from "react-moment";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  setDoc,
} from "firebase/firestore";
import { db, storage } from "../firebase";
import { useState, useEffect } from "react";
import { deleteObject, ref } from "firebase/storage";
import { useRecoilState } from "recoil";
import { modalState, postIdState } from "../atom/modalAtom";
import { useRouter } from "next/router";
import { userState } from "../atom/userAtom";

export default function Comment({ comment, commentId, originalPostId }) {
  const [likes, setLikes] = useState([]);
  const [hasLiked, setHasLiked] = useState(false);
  const [open, setOpen] = useRecoilState(modalState);
  const [postId, setPostId] = useRecoilState(postIdState);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "posts", originalPostId, "comments", commentId, "likes"),
      (snapshot) => setLikes(snapshot.docs)
    );
  }, [originalPostId, commentId]);

  useEffect(() => {
    setHasLiked(likes.findIndex((like) => like.id === currentUser?.uid) !== -1);
  }, [likes]);

  async function likeComment() {
      if (hasLiked) {
        await deleteDoc(
          doc(
            db,
            "posts",
            originalPostId,
            "comments",
            commentId,
            "likes",
            currentUser?.uid
          )
        );
      } else {
        await setDoc(
          doc(
            db,
            "posts",
            originalPostId,
            "comments",
            commentId,
            "likes",
            currentUser?.uid
          ),
          {
            username: currentUser?.username,
          }
        );
      }
  }

  async function deleteComment() {
    if (window.confirm("¿De verdad desea eliminar el comentario?")) {
      deleteDoc(doc(db, "posts", originalPostId, "comments", commentId));
    }
  }

  return (
    <div className="flex p-3 cursor-pointer border-b border-[#c8bfbfc2]">

    </div>
  );
}
