import { CloseOutlined } from "@mui/icons-material";
import React, { useState } from "react";
import styled from "styled-components";
import dynamic from "next/dynamic";
import { db } from "../firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
const ReactPlayer = dynamic(() => import("react-player/lazy"), { ssr: false });

const VideoModal = ({ open, setOpen, user, activeUser}) => {
  const [videoLink, setVideoLink] = useState("");
  const [text, setText] = useState("");


  const postArticle = async(e) => {
    e.preventDefault();
    /* const payload = {
        image: sharedImage,
        video: videoLink,
        user: props.user,
        description: editorText,
        timestamp: firebase.firestore.Timestamp.now(),
        userId: user.uid,
      }; */

    const docRef = await addDoc(collection(db, "posts"), {
        id: user.uid,
        text: text,
        video:videoLink,
        userImg: user.photo,
        timestamp: serverTimestamp(),
        name: user.displayName,
        username: activeUser.username,
        comments:[],
        likes:[],
        image:""
      });
    setOpen(false);
    setVideoLink("");
    setText("");

  }
  return (
    <>
      {open && (
        <Overlay>
          <ContainerModal>
            <Title>
              <h3>Selecciona tu video</h3>
            </Title>
            <Close
              className="cursor-pointer transition-all hover:bg-[#f2f2f2]"
              onClick={() => setOpen(false)}
            >
              <CloseOutlined />
            </Close>
            <div className="divide-y divide-graySubTitle">
              <textarea
                className="w-full border-none focus:ring-0 text-lg placeholder-graySubTitle tracking-wide min-h-[50px]"
                placeholder="¿De qué quieres hablar?"
                value={text}
                onChange={(e) => setText(e.target.value)}
                id="input"
                name="input"
              ></textarea>
            </div>
            <input
              type="text"
              placeholder="Enlace de video"
              value={videoLink}
              onChange={(e) => setVideoLink(e.target.value)}
            />
            {videoLink && <ReactPlayer width={"100%"} url={videoLink} />}
            <SharedCreation>
              <PostButton
                disabled={!videoLink ? true : false}
                onClick={(event) => postArticle(event)}
              >
                Publicar
              </PostButton>
            </SharedCreation>
          </ContainerModal>
        </Overlay>
      )}
    </>
  );
};

export default VideoModal;

const Overlay = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 100;
  padding: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ContainerModal = styled.div`
  width: 500px;
  min-height: 100px;
  background: #fff;
  position: relative;
  border-radius: 5px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  padding: 20px;
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid #e8e8e8;

  h3 {
    font-weight: 500;
    font-size: 16px;
  }
`;

const Close = styled.div`
  position: absolute;
  top: 15px;
  right: 15px;
`;

const SharedCreation = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px 24px 12px 16px;
  align-items: center;
`;

const PostButton = styled.button`
  min-width: 60px;
  border-radius: 20px;
  padding-left: 16px;
  padding-right: 16px;
  background: ${(open) => (open ? "rgba(0, 0, 0, 0.8)" : "#038d84")};
  color: ${(open) => (open ? "white" : "rgba(1, 1, 1, 0.8)")};
  &:hover {
    background: ${(open) => (open ? "rgba(0, 0, 0, 0.08)" : "#ffb900")};
  }
`;
