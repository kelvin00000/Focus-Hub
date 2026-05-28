import type { DocumentData } from "firebase/firestore";
import { user } from "../../services/authentication";


type props = {
    setShowModal: React.Dispatch<
        React.SetStateAction<boolean>
    >;
    groupInfo: DocumentData | undefined
    handleGroupMemberRemove: (id: string, name: string, profileImage: string) => Promise<void>
}

export default function ActiveMembersModal({ setShowModal, groupInfo, handleGroupMemberRemove }: props){
    return(
        <>
            <div className="fixed inset-0 z-100 flex items-center justify-center backdrop-blur-sm">
                <div className="flex flex-col justify-between w-[90%] lg:w-[35%] h-[85%] rounded-3xl border border-[#0A1A2F] bg-bgforeground p-4 text-bgtext shadow-2xl">
                    <div className="flex flex-col gap-2 p-3 h-[92%] lg:h-[90%] bg-[#0A1A2F] rounded-3xl overflow-y-scroll no-scrollbar">
                        {groupInfo!.members!.map((member: {id:string, name:string, profileImage: string})=>(
                            <div key={member.id} className="flex items-center justify-between gap-4 p-4 w-full bg-bgforeground rounded-[20px]">
                                <div className="flex items-center gap-2.5 w-full">
                                    <img className="w-[40px] h-[40px] rounded-full" src={member.profileImage} />

                                    <div className="flex flex-col w-full">
                                        <span className="font-bold truncate">{member.name}</span>

                                        {(groupInfo!.groupCreator.creatorId===user?.uid && member.id === groupInfo!.groupCreator.creatorId)
                                            && <span className="text-[13px] text-gray-600">Admin</span>
                                        }
                                    </div>
                                </div>

                                {(groupInfo!.groupCreator.creatorId===user?.uid && member.id !== groupInfo!.groupCreator.creatorId)
                                    &&<button
                                        onClick={()=>{
                                            handleGroupMemberRemove(member.id, member.name, member.profileImage)
                                        }}
                                        className=" px-2.5 py-1.5 border border-gray-500 rounded-[10px]">
                                            remove
                                    </button>
                                }
                            </div>
                        ))
                        }
                    </div>

                    <div className="flex justify-end">
                        <button
                            className="px-4 py-2 text-bgforeground rounded-[15px] bg-bgtext cursor-pointer"
                            onClick={() => setShowModal(false)}
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}
