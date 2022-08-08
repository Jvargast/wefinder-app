import { createContext, useContext, useEffect, useState } from "react";
import {createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut} from "firebase/auth"
import { auth } from "../firebase";

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);


export const AuthContextProvider = ({children})=> {
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);
    useEffect(()=> {
        const unsubscribe = onAuthStateChanged(auth, (user)=> {
            if(user) {
                setUser({
                    uid: user.uid,
                    email:user.email,
                    photo:user.photoURL,
                    displayName: user.displayName

                })
            } else {
                setUser(null)
            }
            setLoading(false);
        } )
        return () => unsubscribe()
    },[]);

    const signIn = (email, password) => {
        return signInWithEmailAndPassword(auth,email,password)
    }
    const logOut = async()=> {
        setUser(null);
    }
    return (
        <AuthContext.Provider value={{user, signIn,logOut}}>
            {loading ? null : children}
        </AuthContext.Provider>
    )
}