import { onAuthStateChanged } from "firebase/auth";
import { type DocumentData } from "firebase/firestore";
import { auth } from "../services/authentication";
import { useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { BookOpen, Zap, Users, Settings } from "lucide-react";
import { useAuth } from "../hooks/useAuth";

type props = {
    userInfo: DocumentData|null|undefined
}

export default function MainMenuPage({userInfo}: props){
    useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const userCheck = onAuthStateChanged(auth, (user) => {
            if (!user) {
                navigate('/');
            }
        });
        return userCheck;
    }, [navigate]);

    return(
        <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.15 }}
        >
            <>
                <title>Menu</title>

                <Navbar userInfo={userInfo} title={"Navigate"} showTitle={true} showProfileIcon={true} showMenuButton={false} />

                <section className="min-h-screen flex items-center justify-start w-full h-screen bg-bgdark">
                    <div className="ml-[5%] flex flex-col gap-1 w-full">
                        <Link to="/personalstudy" className="flex items-center justify-between w-[280px] rounded-full border border-gray-800 bg-bgforeground px-8 py-7">
                            <span className="text-[20px] font-bold text-bgtext">Personal Study</span>
                            <BookOpen size={20} className="text-bgtext" />
                        </Link>

                        <Link to="/personalstudy" className="flex items-center justify-between w-[230px] rounded-full border border-gray-800 bg-bgforeground px-8 py-7">
                            <span className="text-[20px] font-bold text-bgtext">Focus Mode</span>
                            <Zap size={20} className="text-bgtext" />
                        </Link>

                        <Link to="/activecollaborations" className="flex items-center justify-between w-[330px] rounded-full border border-gray-800 bg-bgforeground px-8 py-7">
                            <span className="text-[20px] font-bold text-bgtext">Group Collaboration</span>
                            <Users size={20} className="text-bgtext" />
                        </Link>

                        <Link to="/settings" className="flex items-center justify-between w-[190px] rounded-full border border-gray-800 bg-bgforeground px-8 py-7">
                            <span className="text-[20px] font-bold text-bgtext">Settings</span>
                            <Settings size={20} className="text-bgtext" />
                        </Link>
                    </div>
                </section>
            </>
        </motion.div>
    )
}
