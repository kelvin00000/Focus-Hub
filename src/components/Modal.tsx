import { useState } from "react";
import { Trash2 } from "lucide-react";
import type { Timestamp } from "firebase/firestore";


type props = {
    message: string,
    isMessageModal?: boolean,
    isDeleteMessageModal?: boolean,
    isRemoveAccountModal?: boolean,
    handleAccountRemoval?: () => Promise<void>,
    handleMessageDelete?: () => Promise<void>
    handleGroupAction?: (action: string, groupId?: string, groupName?: string, dateJoined?: Timestamp) => Promise<void>
    isJoinGroupModal?: boolean,
    isCreateGroupModal?: boolean
    isDeleteGroupModal?: boolean,
    isLeaveGroupModal?: boolean,
    isChangeGroupNameModal?: boolean,
    changeGroupButtonRef?: React.RefObject<HTMLButtonElement|null>
    deleteGroupButtonRef?: React.RefObject<HTMLButtonElement|null>
    leaveGroupButtonRef?: React.RefObject<HTMLButtonElement|null>
    setShowModal: React.Dispatch<
        React.SetStateAction<boolean>
    >;
}

export default function Modal({message, isMessageModal, isDeleteMessageModal, isRemoveAccountModal, handleAccountRemoval, handleMessageDelete, isJoinGroupModal, isCreateGroupModal, isDeleteGroupModal, isChangeGroupNameModal, isLeaveGroupModal, changeGroupButtonRef, leaveGroupButtonRef, deleteGroupButtonRef, setShowModal, handleGroupAction}: props){
    const [inputText, setinputText] = useState(localStorage.getItem("inputText") || "");

    const cacheInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setinputText(e.target.value);
        localStorage.setItem(
            "inputText",
            e.target.value
        );
    };


    return(
        <>
           <div className="fixed inset-0 z-9999 flex items-center justify-center backdrop-blur-sm">
                <div className="w-[300px] rounded-3xl border border-[#0A1A2F] bg-bgforeground p-4 shadow-2xl">
                    <div className="mt-1 rounded-2xl border border-[#0A1A2F] bg-[#0A1A2F] p-4">
                        <p className="mb-8 text-[15px] text-[#F5F5F5] text-center">
                            {message}
                        </p>

                        {(isJoinGroupModal || isCreateGroupModal || isChangeGroupNameModal) &&
                            <input
                                value={inputText}
                                onChange={cacheInput}
                                type="text"
                                placeholder={isJoinGroupModal?"Meeting Code":isCreateGroupModal?"Group Name":isChangeGroupNameModal? "Group Name": ""}
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
                            (isDeleteMessageModal || isRemoveAccountModal || isDeleteGroupModal || isLeaveGroupModal) &&
                            <button
                                className="flex items-center gap-2 rounded-xl bg-red-500 px-4 py-2 text-sm font-medium text-gray-300"
                                onClick={() => {
                                    if (isDeleteMessageModal) handleMessageDelete?.()
                                    else if(isRemoveAccountModal) handleAccountRemoval?.();
                                    else if(isLeaveGroupModal) handleGroupAction!("leave", leaveGroupButtonRef?.current?.dataset.groupId,"")
                                    else handleGroupAction!("delete", deleteGroupButtonRef?.current?.dataset.groupId,"")
                                }}
                            >
                                <Trash2 size={20} className="text-bgtext" />
                                {isDeleteMessageModal?"Delete": isRemoveAccountModal?"Continue": isLeaveGroupModal?"Leave": "Remove"}
                            </button>
                        }

                        {
                            (isJoinGroupModal || isCreateGroupModal || isChangeGroupNameModal) &&
                            <button
                                className="px-4 py-2 text-bgforeground rounded-[15px] bg-bgtext cursor-pointer"
                                onClick={() => {
                                    if (isCreateGroupModal) handleGroupAction!("create", "", inputText)
                                    else if(isJoinGroupModal) handleGroupAction!("join", inputText ,"")
                                    else handleGroupAction!("update", changeGroupButtonRef?.current?.dataset.groupId, inputText)
                                }}
                            >
                                {isJoinGroupModal?"Join": isCreateGroupModal?"Create": "Change"}
                            </button>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}
