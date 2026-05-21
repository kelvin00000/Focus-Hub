import type { User } from "firebase/auth";
import type { DocumentData } from "firebase/firestore";
import type { UserType } from "../types/userType";
import { useContext, createContext } from "react";


export const UserContext = createContext<{user: User | null, userInfo: DocumentData | UserType | null}>({user: null, userInfo: null});
export const useUserContext = () => useContext(UserContext);
