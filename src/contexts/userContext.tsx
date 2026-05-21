import { onAuthStateChanged, type User } from "firebase/auth";
import { doc, type DocumentData, getDoc } from "firebase/firestore";
import { db, auth } from "../services/authentication";
import { useState, useEffect, type ReactNode } from "react";
import type { UserType } from "../types/userType";
import { UserContext } from "../hooks/useUserContext";


export const Userprovider = ({children}: {children: ReactNode}) => {
    const [ user, setUser ] = useState<User | null>(null);
    const [ userInfo, setUserInfo ] = useState<DocumentData | UserType | null>(null);

    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, async (currentUser)=>{
            setUser(currentUser);
            if(currentUser){
                const docSnap = await getDoc(doc(db, 'users', currentUser.uid))
                if(docSnap.exists()) setUserInfo(docSnap.data())
            }
            else{
                setUserInfo(null);
            }
        });
        return unsubscribe;
    }, []);

    // console.log(user)
    // console.log(userInfo)
    return <UserContext.Provider value={{user, userInfo}}>{children}</UserContext.Provider>
}
