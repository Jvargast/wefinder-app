import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import {updateLoggedInUserFollowing,updateFollowedUsersFollowers} from "../services/firebase";

export default function SuggestedProfile({ spDocId, photo, username, name, loggedUser,userId, profileId}) {
  const [followed, setFollowed] = useState(false);
  const router = useRouter();
  /*
  loggeduser ow4N38iUepjnivm4J3pN
profileid ypPaP99n9bPRX4AjWoaYCSRLDqi1
spDocId m2bFo4keyQer4v3sIHcC
 FBteIeZqf5PK0yP62FJ7bRyeTR13
  */

  async function handleFollowUser(){
    setFollowed(true);
    await updateLoggedInUserFollowing(loggedUser, profileId, false);
    await updateFollowedUsersFollowers(spDocId, userId, false)
    router.reload();
  }

  return !followed ? (
    <div
      className="flex items-center px-4 py-2 cursor-pointer hover:bg-[#b3b0b0] transition duration-200 w-full"
    >
      <div className="w-[40px] h-[40px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={photo} alt="user" className="rounded-full w-full h-full" />
      </div>
      <div className="truncate ml-3 leading-5 w-[70%]">
        <Link href={`p/${username}`}>
          <h4 className="font-bold hover:underline text-[14px] truncate">
            {" "}
            {username}
          </h4>
        </Link>
        <h5 className="text-[13px] text-graySubTitle truncate]">{name}</h5>
      </div>
      <button className="ml-auto bg-midnight text-white rounded-full text-sm px-3.5 py-1.5 font-bold" onClick={handleFollowUser}>
        Seguir
      </button>
    </div>
  ):null;
}
