import type { Ref } from "react";
import ChatMessage from "./ChatMessage"
import { type chatMessagesType } from "../types/messageTypes";


type props = {
    chatMessages: chatMessagesType;
    bottomRef: Ref<HTMLDivElement> | undefined
    renderChatMessages: () => Promise<void>
    groupIdValue?: string
};

export default function WorkArea({chatMessages, renderChatMessages, bottomRef, groupIdValue}: props){

    return(
        <>
            <div className="fixed flex flex-col items-start gap-[10px] pt-[90px] pb-[200px] pr-[10px] pl-[10px] w-full h-screen overflow-y-scroll overflow-x-hidden no-scrollbar mask-[linear-gradient(to_bottom,transparent,black_15%,black_80%,transparent)] lg:pt-[70px] lg:pr-0 lg:pl-0 lg:left-[15%] lg:w-[70%] lg:mask-[linear-gradient(to_bottom,transparent,black_8%,black_70%,transparent)]">
                {chatMessages.map((msg) => (
                    <ChatMessage key={msg.id} id={msg.id} userId={msg.userId} sender={msg.sender} profileImage={msg.profileImage} message={msg.message} searchMethod={msg.searchMethod} query={msg.query} response={msg.response} url={msg.url} fileName={msg.fileName} isDoc={msg.isDoc} tag={msg.tag} createdAt={msg.createdAt} renderChatMessages={renderChatMessages} groupIdValue={groupIdValue} />
                ))}

                <div ref={bottomRef}></div>
            </div>
        </>
    )
}
