import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import { BookOpen, Zap, Users, Settings } from "lucide-react";

export default function MainMenuPage(){
    return(
        <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.15 }}
        >
            <>
                <title>Menu</title>

                <Navbar title={"Navigate"} showTitle={true} showProfileIcon={true} showMenuButton={false} />

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
