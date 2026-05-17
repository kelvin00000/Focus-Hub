import { useState } from "react";
import { Trash2 } from "lucide-react";


type props = {
    message: string,
    isMessageModal?: boolean,
    isDeleteMessageModal?: boolean,
    isRemoveAccountModal?: boolean,
    handleAccountRemoval?: () => Promise<void>,
    isJoinMeetingModal?: boolean,
    isCreateMeetingModal?: boolean
    setShowModal: React.Dispatch<
        React.SetStateAction<boolean>
    >;
}

export default function Modal({message, isMessageModal, isDeleteMessageModal, isRemoveAccountModal, handleAccountRemoval, isJoinMeetingModal, isCreateMeetingModal, setShowModal}: props){
    const [inputText, setinputText] = useState(localStorage.getItem("inputText") || "");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setinputText(e.target.value);
        localStorage.setItem(
            "inputText",
            e.target.value
        );
    };

    function joinMeeting(){
    }
    function createMeeting(){
    }
    function deleteMessage(){
    }

    return(
        <>
           <div className="fixed inset-0 z-9999 flex items-center justify-center backdrop-blur-sm">
                <div className="w-[300px] rounded-3xl border border-[#0A1A2F] bg-bgforeground p-4 shadow-2xl">
                    <div className="mt-1 rounded-2xl border border-[#0A1A2F] bg-[#0A1A2F] p-4">
                        <p className="mb-8 text-[15px] text-[#F5F5F5] text-center">
                            {message}
                        </p>

                        {(isJoinMeetingModal || isCreateMeetingModal) &&
                            <input
                                value={inputText}
                                onChange={handleChange}
                                type="text"
                                placeholder={isJoinMeetingModal?"Meeting Code":isCreateMeetingModal?"Group Name":""}
                                className=" w-full py-2 text-center text-white placeholder:text-gray-500 bg-transparent border-0 border-b border-gray-600 outline-none focus:outline-none focus:ring-0 focus:border-gray-600 autofill:bg-transparent"
                            />
                        }
                    </div>

                    <div className="mt-6 flex items-center justify-end gap-3">
                        <button
                        onClick={() => {setShowModal(false)}}
                        className="rounded-xl border border-[#0A1A2F] px-4 py-2 text-sm text-gray-300 transition hover:bg-white/5">
                            Close
                        </button>

                        {isMessageModal?'':''}

                        {
                            (isDeleteMessageModal || isRemoveAccountModal) &&
                            <button
                                className="flex items-center gap-2 rounded-xl bg-red-500 px-4 py-2 text-sm font-medium text-gray-300"
                                onClick={() => {
                                    if (isDeleteMessageModal) deleteMessage()
                                        else handleAccountRemoval?.();
                                }}
                            >
                                <Trash2 size={20} className="text-bgtext" />
                                {isDeleteMessageModal?"Delete":"Continue"}
                            </button>
                        }

                        {
                            (isJoinMeetingModal || isCreateMeetingModal) &&
                            <button
                                className="px-4 py-2 text-bgforeground rounded-[15px] bg-bgtext cursor-pointer"
                                onClick={() => {
                                    if (isJoinMeetingModal) joinMeeting()
                                        else createMeeting()
                                }}
                            >
                                {isJoinMeetingModal?"Join":"Create"}
                            </button>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}
