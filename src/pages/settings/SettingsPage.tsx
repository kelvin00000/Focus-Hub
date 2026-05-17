import { type DocumentData } from "firebase/firestore";
import { removeAccount } from "../../services/authentication";
import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar"
import Modal from "../../components/Modal";
import { SunIcon, Users, LockIcon, LayoutDashboardIcon, Trash2 } from "lucide-react"
import { useAuth } from "../../hooks/useAuth";
import LoadingScreen from "../../components/LoadingScreen";


function getDateJoined(timestamp: {
  seconds: number;
  nanoseconds: number;
}) {
    const parsedDate = new Date(
        timestamp.seconds * 1000
    );
    const day = parsedDate.getDate();
    const suffix =
        day % 10 === 1 && day !== 11
        ? "st"
        : day % 10 === 2 && day !== 12
        ? "nd"
        : day % 10 === 3 && day !== 13
        ? "rd"
        : "th";
    const month = parsedDate.toLocaleString("default",{ month: "long" });
    const year = parsedDate.getFullYear();
    return `${day}${suffix} ${month} ${year}`;
}

type props = {
    userInfo: DocumentData|null|undefined
    setUserInfo: React.Dispatch<React.SetStateAction<DocumentData|null>>,
}

export default function SettingsPage({userInfo, setUserInfo}: props){
    useAuth();
    const [isLoading, setIsLoading] = useState(false)
    const [ showMessageModal, setShowMessageModal ] = useState(false);
    const [ showDeleteModal, setShowDeleteModal ] = useState(false);
    const [ showFailedAccRemovalMessageModal, setShowFailedAccRemovalMessageModal ] = useState(false);

    async function handleAccountRemoval(){
        setIsLoading(true)
        try{
            await removeAccount()
            setUserInfo(null);
        }
        catch(err){
            console.error(err);
            setIsLoading(false)
            setShowFailedAccRemovalMessageModal(true);
        }
    }

    return(
        <>

            <title>Settings</title>

            <Navbar userInfo={userInfo} title={"Settings"} showTitle={true} showProfileIcon={false} showMenuButton={true} />

            {userInfo&&
                <section className="flex flex-col pb-[10px] items-center justify-center gap-[20px] w-full h-dvh text-bgtext bg-bgdark overflow-y-scroll no-scrollbar lg:flex-row lg:gap-[50px] lg:pt-[0px] lg:pb-[0px]">

                    <div className="flex flex-col gap-[20px] mt-[50%] lg:mt-0 p-6.5 w-[95%] lg:h-[70%] bg-bgforeground rounded-[20px]  lg:w-[40%]">
                        <div className="flex items-center gap-5 mb-[5%]">
                            <img className="w-[100px] h-[100px] rounded-full" src={userInfo.profileImage} />

                            <div className="flex flex-col">
                                <span className="w-[85%] font-bold text-[1.8rem] truncate  lg:text-[2rem]">{userInfo.name}</span>
                                <span className="text-gray-500 text-sm">Joined <span>{getDateJoined(userInfo.createdAt)}</span></span>
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
                                <span>Created - <span>{userInfo.groupsCreated}</span></span>
                                <span>Joined - <span>{userInfo.groupsJoined}</span></span>
                            </div>

                            <span className="text-gray-500 text-sm">Click to open</span>
                        </Link>
                    </div>

                    <div className="flex flex-col gap-[20px] p-6.5 w-[95%] lg:w-[40%] lg:h-[70%] bg-bgforeground  rounded-[20px]">
                        <div
                            className="flex items-center justify-between px-8 py-6 w-full bg-[#0A1A2F] rounded-[20px] cursor-pointer"
                            onClick={() => { setShowMessageModal(true) }}
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
                            className="flex items center justify-between mt-[15%] py-3.5 px-5.5 w-full text-red-500 rounded-[20px] border border-gray-800 cursor-pointer  lg:w-[60%]"
                            onClick={() => { setShowDeleteModal(true) }}
                        >
                            Deactivate your account
                            <Trash2 size={18} className="text-red-500" />
                        </button>
                    </div>
                </section>
            }


            {showMessageModal && (
                <Modal
                    message="Your messages, files, and perosnal info remain securely encrypted, protected, and accessible only you and authorized participants."
                    isMessageModal={true}
                    setShowModal={setShowMessageModal}
                />
            )}

            {showDeleteModal && (
                <Modal
                    message="Are you sure you want to remove your account? All you data will be erased"
                    isRemoveAccountModal={true}
                    handleAccountRemoval={handleAccountRemoval}
                    setShowModal={setShowDeleteModal}
                />
            )}

            {showFailedAccRemovalMessageModal && (
                <Modal
                    message="Your Account removal request failed. Please try again"
                    isMessageModal={true}
                    setShowModal={setShowDeleteModal}
                />
            )}

            {!userInfo && <LoadingScreen />}

            {isLoading && <LoadingScreen />}
        </>
    )
}
