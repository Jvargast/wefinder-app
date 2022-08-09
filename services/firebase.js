import {
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { db } from "../firebase";

export async function doesUsernameExist(username) {
  const user = [];
  const userRef = collection(db, "users");
  const q = query(userRef, where("username", "==", username));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) =>
    user.push({
      ...doc?.data(),
      docId: doc?.id,
    })
  );

  return user.length > 0;
}

export async function getUserByUsername(username) {
  const user = [];
  const userRef = collection(db, "users");
  const q = query(userRef, where("username", "==", username));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) =>
    user.push({
      ...doc?.data(),
      docId: doc?.id,
    })
  );
  return user.length > 0 ? user : false;
}

export async function getUserByUserId(userId) {
  const user = [];
  const userRef = collection(db, "users");
  const q = query(userRef, where("userId", "==", userId));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((item) =>
    user.push({
      ...item.data(),
      docId: item.id,
    })
  );

  return user;
}

export async function getSuggestedProfiles(userId, following) {
  const profiles = [];
  const ref = collection(db, "users");

  if (userId != undefined) {
    const q = query(
      ref,
      where("userId", "not-in", [...following, userId]),
      limit(10)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((item) =>
      profiles.push({
        ...item.data(),
        docId: item.id,
      })
    );
    return profiles;
  }
}

//updateLoggedInUserFollowing,updateFollowedUsersFollowers
export async function updateLoggedInUserFollowing(
  loggedUser,
  profileId,
  isFollowingProfile
) {
  const docRef = doc(db, "users", loggedUser);
  return setDoc(
    docRef,
    {
      following: isFollowingProfile
        ? arrayRemove(profileId)
        : arrayUnion(profileId),
    },
    {
      merge: true,
    }
  )
}

export async function updateFollowedUsersFollowers(
  spDocId,
  userId,
  isFollowingProfile
) {
  const docRef = doc(db, "users", spDocId);
  return setDoc(
    docRef,
    {
      followers: isFollowingProfile
        ? arrayRemove(userId)
        : arrayUnion(userId),
    },
    {
      merge: true,
    }
  );
}


export async function getPhotos(userId, following) {
  const profiles = [];
  const photosWithUserDetails = [];
  const ref = collection(db, "posts");
  if (following != undefined && userId != undefined) {
    const q = query(ref, where("id", "in", following),orderBy("timestamp", "asc"));
    const result = await getDocs(q);

    const userFollowedPhotos = result.docs.map((photo) => ({
      ...photo.data(),
      docId: photo.id
    }));

    const photosWithUserDetails = await Promise.all(
      userFollowedPhotos.map(async (photo) => {
        let userLikedPhoto = false;
        if (photo.likes.includes(userId)) {
          userLikedPhoto = true;
        }
        // photo.userId = 2
        const user = await getUserByUserId(photo.id);
        // raphael
        const { username } = user[0];
        return { username, ...photo, userLikedPhoto };
      })
    )
    return photosWithUserDetails;
  }

  //const  8:18:41
}

export async function getUserIdByUsername(username) {
  const docRef = collection(db, "users");
  const q = query(docRef, where("username", "==", username))
  const result = await getDocs(q);
  
  return result.docs.map((item)=>({
    ...item.data(),
    docId:item.id
  }))

}

export async function getUserPhotosByUsername(username) {
  const [user] = await getUserByUsername(username); 
  const docRef = collection(db, "posts");
  const q = query(docRef, where("id", "==", user.userId))
  const result = await getDocs(q);

  return result.docs.map((photo)=> ({
    ...photo.data(),
    docId: photo.id
  }))
 

}

export async function isUserFollowingProfile(loggedUser, profileId){
  const docRef = collection(db, "users");
  const q = query(docRef, where("username", "==", loggedUser), where("following", "array-contains", profileId))
  const result = await getDocs(q);


  const [response={}] = result.docs.map((item)=> (
    {
      ...item.data(),
      docId:item.id
    }
  ))

  return response.userId;
}

export async function toggleFollow(isFollowingProfile, activeUserDocId, profileDocId, profileUserId, followingUserId){

  
  await updateLoggedInUserFollowing(activeUserDocId, profileUserId, isFollowingProfile);
  await updateFollowedUsersFollowers(profileDocId,followingUserId, isFollowingProfile);
}

export async function getChatByEmail(email) {
  //const [user] = await getUserByUsername(username); 

    const docRef = collection(db, "chats");
    const q = query(docRef, where("users", "array-contains", email ))
    const result = await getDocs(q);
  
    return result
    /* return result.docs.map((chat)=> ({
      ...chat.data(),
      docId: chat.id
    })) */
  
  
}