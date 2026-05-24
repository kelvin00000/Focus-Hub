import Navbar from "../components/Navbar";
import WorkArea from "../components/WorkArea";
import InputBar from "../components/InputBar";
import { useAuth } from "../hooks/useAuth";
import { useState, useEffect, useRef } from "react";
import { fetchChatMessages } from "../services/firestore";
import type { chatMessagesType } from "../types/messageTypes";
import { useStudyMode } from "../hooks/useStudyMode";
import LoadingScreen from "../components/LoadingScreen";

// type props = {
//
// }

export default function PersonalStudyPage(){
    useAuth();
    const { personalStudyMode } = useStudyMode()
    const [ chatMessages, setChatMessages ] = useState<chatMessagesType>([]);
    const [ showLoadingScreen, setShowLoadingScreen ] = useState(false);
    const [ showNoMessagesScreen, setShowNoMessagesScreen ] = useState(false);
    const bottomRef = useRef<HTMLDivElement>(null);


    const renderChatMessages = async()=>{
        const messages = await fetchChatMessages(personalStudyMode)
        if(!messages) {
            console.log("should be working")
            setShowNoMessagesScreen(true);
            return;
        }
        setShowNoMessagesScreen(false)
        setChatMessages(messages);
    }
    if(showNoMessagesScreen) console.log("working")

    // CODE HAD TO BE DEPLICATED BECAUSE USE-EFFECT WONT ALLOW FUNCTION CALL
    useEffect(() => {
        const loadMessages = async () => {
            setShowLoadingScreen(true)
            const messages = await fetchChatMessages(personalStudyMode)
            if(!messages) {
                setShowNoMessagesScreen(true);
                return;
            }
            setChatMessages(messages);
            setShowLoadingScreen(false);
        };
        loadMessages();
    }, [personalStudyMode]);


    const scrollToBottom = () => {
        bottomRef.current?.scrollIntoView({
            behavior: "smooth"
        });
    };


    return(
        <>
            <title>Personal Study</title>

            <Navbar title={"Personal"} showTitle={true} showProfileIcon={true} showMenuButton={true} />

            <section className="flex items-center justify-center w-full h-screen bg-bgdark overflow-hidden">
                {!showNoMessagesScreen
                    ?<WorkArea chatMessages={chatMessages} renderChatMessages={renderChatMessages} bottomRef={bottomRef} />
                    :<div className="fixed top-[20%]">no messages</div>
                }
                <InputBar renderChatMessages={renderChatMessages} scrollToBottom={scrollToBottom} />
            </section>

            {showLoadingScreen && <LoadingScreen />}
        </>
    )
}
