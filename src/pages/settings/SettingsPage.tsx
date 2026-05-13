import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar"
import WarningModal from "../../components/Modal";
import { SunIcon, Users, LockIcon, LayoutDashboardIcon, Trash2 } from "lucide-react"


export default function SettingsPage(){
    const [showWarningModal, setShowWarningModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    return(
        <>

            <title>Settings</title>

            <Navbar title={"Settings"} showTitle={true} showProfileIcon={false} showMenuButton={true} />

            <section className="flex flex-col pt-[90px] pb-[10px] items-center justify-center gap-[20px] w-full h-dvh text-bgtext bg-bgdark overflow-y-scroll no-scrollbar lg:flex-row lg:gap-[50px] lg:pt-[0px] lg:pb-[0px]">
                <div className="flex flex-col gap-[20px] p-6.5 w-[95%] h-[65%] bg-bgforeground  rounded-[20px]  lg:w-[40%]">
                    <div className="flex items-center gap-5">
                        <img className="w-[100px] h-[100px] rounded-full" src="/user.jpg" />

                        <div className="flex flex-col">
                            <span className="font-bold text-[2rem] truncate  lg:text-[2.5rem]">Kelvin Adjei</span>
                            <span className="text-gray-500 text-sm">Joined <span>12th May 2026</span></span>
                        </div>
                    </div>

                    <div className="flex items-center justify-between px-8 py-6 w-full bg-[#0A1A2F] rounded-[20px] cursor-pointer">
                        <span>Chanage theme</span>
                        <SunIcon size={20} className="text-bgtext" />
                    </div>

                    <Link to="/activecollaborations" className="flex justify-center flex-col px-8 py-6 w-full bg-[#0A1A2F] rounded-[20px] cursor-pointer">
                        <div className="flex items-center justify-between mb-[10px] w-full">
                            <span>Current Active Group Sessions</span>
                            <Users size={20} className="text-bgtext" />
                        </div>

                        <div className="flex items-center justify-between mb-[10px] text-l">
                            <span>Created - <span>1</span></span>
                            <span>Joined - <span>2</span></span>
                        </div>

                        <span className="text-gray-500 text-sm">Click to open</span>
                    </Link>
                </div>

                <div className="flex flex-col gap-[20px] p-6.5 w-[95%] h-[65%] bg-bgforeground  rounded-[20px]  lg:w-[40%]">
                    <div
                        className="flex items-center justify-between px-8 py-6 w-full bg-[#0A1A2F] rounded-[20px] cursor-pointer"
                        onClick={() => { setShowWarningModal(true) }}
                    >
                        <span>Security Disclaimer</span>
                        <LockIcon size={18} className="text-bgtext" />
                    </div>

                    <Link to="/analytics" className="flex flex-col px-8 py-6 w-full bg-[#0A1A2F] rounded-[20px] cursor-pointer">
                        <div className="flex items-center justify-between mb-[10px] w-full">
                            <span>Study Analytics</span>
                            <LayoutDashboardIcon size={20} className="text-bgtext" />
                        </div>

                        <span className="mb-[10px] text-[15px]">Track productivity, study consistency and session performance.</span>

                        <span className="text-gray-500 text-sm">Click to open</span>

                    </Link>

                    <button
                        className="flex items center justify-between mt-[10%] py-3.5 px-5.5 w-full text-red-500 rounded-[20px] border border-gray-800 cursor-pointer  lg:w-[60%]"
                        onClick={() => { setShowDeleteModal(true) }}
                    >
                        Deactivate your account
                        <Trash2 size={18} className="text-red-500" />
                    </button>
                </div>
            </section>


            {showWarningModal && (
                <WarningModal
                    message="Your messages, files, and perosnal info remain securely encrypted, protected, and accessible only you and authorized participants."
                    isMessageModal={true}
                    isDeleteWarning={false}
                    isJoinMeetingModal={false}
                    isCreateMeetingModal={false}
                    setShowModal={setShowWarningModal}
                />
            )}

            {showDeleteModal && (
                <WarningModal
                    message="Are you sure you want to remove your account? All you data will be erased"
                    isMessageModal={false}
                    isDeleteWarning={true}
                    isJoinMeetingModal={false}
                    isCreateMeetingModal={false}
                    setShowModal={setShowDeleteModal}
                />
            )}
        </>
    )
}
