import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, GoogleAuthProvider, signInWithPopup, deleteUser, reauthenticateWithPopup } from "firebase/auth";
import type { User } from 'firebase/auth';
import { getFirestore, setDoc, doc, deleteDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBAGQL-87Hyzge6gOfEGO5BJddQUAaeXJk",
  authDomain: "focus-hub-4a5b0.firebaseapp.com",
  projectId: "focus-hub-4a5b0",
  storageBucket: "focus-hub-4a5b0.firebasestorage.app",
  messagingSenderId: "520055215705",
  appId: "1:520055215705:web:9b064ab764bb5e32060348",
  measurementId: "G-K1N3KC889K"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
let user: User | null;

export const auth = getAuth(app);
auth.languageCode = 'en';
const provider = new GoogleAuthProvider();


//// SIGN-UP FUNCTION
export async function signUpWithGoogle(){
    const result = await signInWithPopup(auth, provider);
    const uid = result.user.uid;

    await setDoc(doc(db, "users", uid), {
        profileImage: result.user.photoURL,
        email: result.user.email,
        name: result.user.displayName,
        groupsCreated: 0,
        groupsJoined: 0,
        currentGroups: [],
        preferredTheme: "dark",
        createdAt: new Date()
    });
}

//// REMOVE ACCOUNT FUNCTION
export async function removeAccount(){
    // const uid = user?.uid;

    if (user) {
        await reauthenticateWithPopup(user, provider);

        await Promise.all([
            deleteDoc(doc(db, 'users', user.uid)),
        ]);

        deleteUser(user);
    }
}


onAuthStateChanged(auth, (currentUser)=>{
    user = currentUser;
})
export { db, user };
