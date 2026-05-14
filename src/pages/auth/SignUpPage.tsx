import { signUpWithGoogle, auth } from "../../services/authentication";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import Navbar from "../../components/Navbar"
import Modal from "../../components/Modal";
import type { DocumentData } from "firebase/firestore";
import LoadingScreen from "../../components/LoadingScreen";


type props = {
    userInfo: DocumentData|null|undefined
}

export default function SignUpPage({userInfo}: props){
    const [isLoading, setIsLoading] = useState(false)
    const [showMessageModal, setShowMessageModal] = useState(false);

    const navigate = useNavigate();
    useEffect(() => {
        const userCheck = onAuthStateChanged(auth, (user) => {
            if (user) {
                setIsLoading(false);
                navigate('/');
            }
        });
        return userCheck;
    }, [navigate]);

    async function handleSignUp(){
        setIsLoading(true);
        try{ await signUpWithGoogle() }
        catch(err){
            console.error(err);
            setShowMessageModal(true);
        }
    }

    return(
        <>
            <title>Sign Up</title>

            <Navbar userInfo={userInfo} title={"Sign Up"} showTitle={false} showProfileIcon={false} showMenuButton={false} />

            <section className="flex flex-col items-center justify-center w-full h-screen text-bgtext bg-bgdark">

                <DotLottieReact
                    src="/animations/study.lottie"
                    loop
                    autoplay
                    className="w-[220px] h-[220px] "
                />

                <p className="mt-4 text-5xl">Start Learning</p>
                <span className="text-[18px]">Click the button below to continue</span>

                <button
                    className="mt-15 px-24 py-4 font-bold text-[1.2rem] text-bgtext bg-[#071322] rounded-[20px] animate-[pulseGlow_4s_ease-in-out_infinite] cursor-pointer"
                    onClick={() => { handleSignUp() }}
                >
                    Continue
                </button>
            </section>




            {showMessageModal && (
                <Modal
                    message="Your sign up was unsuccessful. Please try again"
                    isMessageModal={true}
                    setShowModal={setShowMessageModal}
                />
            )}

            {isLoading && <LoadingScreen />}
        </>
    )
}
