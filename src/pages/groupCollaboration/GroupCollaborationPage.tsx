import type { DocumentData } from "firebase/firestore";
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router";
import { Users, ChevronLeft } from "lucide-react"
import Navbar from "../../components/Navbar";
import WorkArea from "../../components/WorkArea";
import InputBar from "../../components/InputBar";
import ActiveMembersModal from "./ActiveMembersModal";
import { useAuth } from "../../hooks/useAuth";
import { type chatMessagesType } from "../../types/messageTypes";
import { useStudyMode } from "../../hooks/useStudyMode";
import { fetchChatMessages, fetchGroupInfo, removeGroupMember } from "../../services/firestore";
import LoadingScreen from "../../components/LoadingScreen";
import NoResultsScreen from "../../components/NoResultsScreen";



type props = {
    groupCollaborationPageTitle: string
    groupIdValue: string
}

export default function GroupCollaborationPage({ groupCollaborationPageTitle, groupIdValue }: props){
    useAuth();
    const { personalStudyMode } = useStudyMode()
    const [ chatMessages, setChatMessages ] = useState<chatMessagesType>([]);
    const [ showLoadingScreen, setShowLoadingScreen ] = useState(false);
    const [ showMembersModal, setShowMembersModal ] = useState(false);
    const [ showNoMessagesScreen, setShowNoMessagesScreen ] = useState(false);
    const [ groupInfo, setGroupInfo ] = useState<DocumentData>()
    const bottomRef = useRef<HTMLDivElement>(null);


    const renderChatMessages = async()=>{
        try {
            const messages = await fetchChatMessages(personalStudyMode, groupIdValue)
            if(messages!.length===0) {
                setShowLoadingScreen(false);
                setShowNoMessagesScreen(true);
                return;
            }
            setShowNoMessagesScreen(false)
            setChatMessages(messages!);
        }
        catch(error) {
            console.error(error)
            setShowLoadingScreen(false);
        }
    }

    const handleGroupMemberRemove = async ( id: string, name: string, profileImage: string )=>{
        try {
            setShowLoadingScreen(true);
            await removeGroupMember(groupIdValue, id, name, profileImage)
            const groupInfo = await fetchGroupInfo(personalStudyMode, groupIdValue);
            setGroupInfo(groupInfo);
            setShowLoadingScreen(false);
        }
        catch (error) {
            console.error(error)
            setShowLoadingScreen(false);
        }
    }

    // CODE HAD TO BE DEPLICATED BECAUSE USE-EFFECT WONT ALLOW FUNCTION CALL
    useEffect(() => {
        const loadMessages = async () => {
            setShowLoadingScreen(true)
            const messages = await fetchChatMessages(personalStudyMode, groupIdValue)
            if(messages!.length===0) {
                setShowLoadingScreen(false);
                setShowNoMessagesScreen(true);
                return;
            }
            setChatMessages(messages!);
            setShowLoadingScreen(false);
        };

        const loadGroupMmberInfo = async ()=>{
            const groupInfo = await fetchGroupInfo(personalStudyMode, groupIdValue);
            setGroupInfo(groupInfo);
        }

        loadGroupMmberInfo()
        loadMessages();
    }, [personalStudyMode, groupIdValue]);


    const scrollToBottom = () => {
        bottomRef.current?.scrollIntoView({
            behavior: "smooth"
        });
    };


    return(
        <>
            <title>Group</title>

            <Navbar title={groupCollaborationPageTitle} showTitle={true} showProfileIcon={true} showMenuButton={true} />

            <Link to="/activecollaborations"
                className="fixed top-[5%] right-[0%] lg:top-[8%] lg:right-[1%] flex items-center justify-center py-3 px-5.5 text-bgforeground rounded-[15px] cursor-pointer z-40"
            >
                <ChevronLeft size={30} className="mr-1.5 text-bgtext" />
                <span className="text-bgtext">Back</span>
            </Link>

            <button
                className="fixed top-[11%] right-[5%] lg:top-[16%] lg:right-[3%] p-4 bg-[#0A1A2F] border border-gray-500 rounded-full cursor-pointer z-40"
                onClick={() => { setShowMembersModal(true) }}
            >
                    <Users size={20} className="text-bgtext" />
            </button>

            <section className="flex items-center justify-center w-full h-screen bg-bgdark">
                {!showNoMessagesScreen
                    ?<WorkArea chatMessages={chatMessages} renderChatMessages={renderChatMessages} bottomRef={bottomRef} groupIdValue={groupIdValue} />
                    :<NoResultsScreen message="Looks like you have no messages" actionMessage="Type something" />
                }
                <InputBar renderChatMessages={renderChatMessages} scrollToBottom={scrollToBottom} groupIdValue={groupIdValue} />
            </section>



            {showMembersModal && (
                <ActiveMembersModal setShowModal={setShowMembersModal} groupInfo={groupInfo} handleGroupMemberRemove={handleGroupMemberRemove} />
            )}

            {showLoadingScreen && <LoadingScreen />}
        </>
    )
}
