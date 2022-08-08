import { useState, useEffect } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { getSuggestedProfiles } from "../services/firebase";
import SuggestedProfile from "./Suggested-Profile";

export default function SuggestProfiles({ userId, following, loggedUser }) {
  const [profiles, setProfiles] = useState(null);
  useEffect(() => {
    async function suggestedProfiles() {
      const response = await getSuggestedProfiles(userId, following);
      setProfiles(response);
    }
    suggestedProfiles();
  }, [following, profiles, userId]);

  return (
    <>
      {!profiles ? (
        <div className="mt-[82px] xl:w-[600px] hidden lg:inline ml-8 space-y-5">
          <SkeletonTheme highlightColor="gray">
            <Skeleton count={5} height={100} width={200} />
          </SkeletonTheme>
        </div>
      ) : profiles.length > 0 ? (
        <div className="mt-[82px] xl:w-[600px] hidden lg:inline ml-8 space-y-5">
          <div className="sticky top-32 text-graySubTitle space-y-3 bg-[#dddbdb] rounded-xl pt-2 w-[90%] xl:w-[75%] ">
            <h4 className="font-bold text-xl px-4">¿A quién seguir?</h4>
            <div className="w-full">
              {profiles.map((profile) => (
                <SuggestedProfile
                  key={profile.docId}
                  spDocId={profile.docId}
                  username={profile.username}
                  userId={userId}
                  profileId={profile.userId}
                  photo={profile.profilePic}
                  name={profile.displayName}
                  loggedUser={loggedUser}
                />
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-[82px] xl:w-[600px] hidden lg:inline ml-8 space-y-5">
          <div className="sticky top-32 text-graySubTitle space-y-3 bg-[#dddbdb] rounded-xl pt-2 w-[90%] xl:w-[75%] ">
            <h4 className="font-bold text-xl px-4">¿A quién seguir?</h4>
          </div>
        </div>
      )}
    </>
  );
}
