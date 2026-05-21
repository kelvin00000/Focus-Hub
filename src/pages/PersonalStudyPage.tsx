import Navbar from "../components/Navbar";
import WorkArea from "../components/WorkArea";
import InputBar from "../components/InputBar";
import { useAuth } from "../hooks/useAuth";
import { useState, useEffect } from "react";
import { fetchChatMessages } from "../services/firestore";
import type { chatMessagesType } from "../types/messageTypes";

// type props = {
//
// }
const personalStudyMode = true;
const messages = await fetchChatMessages(personalStudyMode)

export default function PersonalStudyPage(){
    useAuth();
    const [ chatMessages, setChatMessages ] = useState<chatMessagesType>([]);

    useEffect(() => {
        const interval = setInterval(() => {
            if(!messages) return;
            setChatMessages(messages)
            // console.log(chatMessages)
        }, 500);
        return () => {
            clearInterval(interval)
        };
    }, [chatMessages]);

    return(
        <>
            <title>Personal Study</title>

            <Navbar title={"Personal"} showTitle={true} showProfileIcon={true} showMenuButton={true} />

            <section className="flex items-center justify-center w-full h-screen bg-bgdark overflow-hidden">
                <WorkArea chatMessages={chatMessages} />
                <InputBar />
            </section>
        </>
    )
}
