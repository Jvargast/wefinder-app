import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import NavbarUser from "../../components/NavbarUser";
import UserProfile from "../../components/profile";
import { getUserByUsername } from "../../services/firebase";
import { useAuth } from "../../context/AuthContext";

export default function Profile() {
  const router = useRouter();
  const {user, logOut} = useAuth();
  const [userBy, setUser] = useState(null);
  const {id} = router.query;

  useEffect(() => {
    async function checkUserExists() {
        if(id != null) {
            const [userBy] = await getUserByUsername(id);
            if (userBy.docId) {
              setUser(userBy);
            } else {
              router.push("/not-found");
            } 
        }
      
    }
    checkUserExists();
  }, [id, router]);

  return (
    <>
    {
        userBy?.username ? (<div>
            <Head>
              <title>Wefinder</title>
              <meta name="description" content="Generated by create next app" />
              <link rel="icon" href="/favicon.ico" />
            </Head>
            <main>
              <NavbarUser user={user} logOut={logOut} />
              <div className="flex flex-row  max-w-7xl mx-auto justify-center">
                <div className="mt-[82px]">
                    <UserProfile username={id}/>
                </div>
              </div>
            </main>
          </div>): null 
    }
    </>
  );
}
