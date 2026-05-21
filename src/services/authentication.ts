import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, GoogleAuthProvider, signInWithPopup, deleteUser, reauthenticateWithPopup, type User } from "firebase/auth";
import { getFirestore, setDoc, doc, deleteDoc } from "firebase/firestore";
import { getFunctions } from "firebase/functions";

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

const auth = getAuth(app);
auth.languageCode = 'en';
const provider = new GoogleAuthProvider();
const functions = getFunctions(app, 'us-central1');


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
    if (user) {
        await reauthenticateWithPopup(user, provider);

        await Promise.all([
            deleteDoc(doc(db, 'users', user.uid)),
            deleteDoc(doc(db, 'personalChat', user.uid, 'chat'))
        ]);

        deleteUser(user);
    }
}


onAuthStateChanged(auth, (currentUser)=>{
    user = currentUser;
})
export { db, user, auth, functions };
