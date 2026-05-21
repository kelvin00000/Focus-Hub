import { signUpWithGoogle } from "../../services/authentication";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import Modal from "../../components/Modal";
import LoadingScreen from "../../components/LoadingScreen";
import { useUserContext } from "../../hooks/useUserContext";


// type props = {
//     userInfo: DocumentData|null|undefined
// }

export default function SignUpPage(){
    const { user } = useUserContext();
    const [isLoading, setIsLoading] = useState(false)
    const [showMessageModal, setShowMessageModal] = useState(false);

    const navigate = useNavigate();
    useEffect(() => {
        if (user) {
            // setIsLoading(false);
            navigate('/');
        }
    }, [user, navigate]);

    async function handleSignUp(){
        setIsLoading(true);
        try{ await signUpWithGoogle() }
        catch(err){
            console.error(err);
            setIsLoading(false);
            setShowMessageModal(true);
        }
    }

    return(
        <>
            <title>Sign Up</title>

            <img src="../../logo.jpg" alt="" className="fixed top-[2%] left-[4%] lg:left-[1%] w-14 h-14 rounded-full" />

            <section className="flex flex-col items-center justify-center w-full h-screen text-bgtext bg-bgdark">

                <DotLottieReact
                    src="/animations/study.lottie"
                    loop
                    autoplay
                    className="w-[220px] h-[220px]"
                />

                <p className="mt-4 text-5xl">Start Learning</p>
                <span className="text-[17px]">Click the button below to continue</span>

                <button
                    className="mt-15 px-24 py-4 font-bold text-[1.2rem] text-bgtext bg-[#0A1A2F] rounded-[20px] animate-[pulseGlow_4s_ease-in-out_infinite] cursor-pointer"
                    onClick={() => { handleSignUp() }}
                >
                    Sign In
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
