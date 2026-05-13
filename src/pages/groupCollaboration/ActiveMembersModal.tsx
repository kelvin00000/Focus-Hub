

type props = {
    setShowModal: React.Dispatch<
        React.SetStateAction<boolean>
    >;
    activeSession: {
        meetingName: string,
        meetingId: number, //USE FIRESTORE AUTOID AS DOC ID
        meetingCode: string,
        meetingCreator: string,
        memberNo: number,
        members: { name: string, id: number, joined: string }[],
        createdAt: string
    }
}

export default function ActiveMembersModal({ setShowModal, activeSession }: props){
    return(
        <>
            <div className="fixed inset-0 z-100 flex items-center justify-center backdrop-blur-sm">
                <div className="flex flex-col justify-between w-[90%] lg:w-[35%] h-[85%] rounded-3xl border border-[#0A1A2F] bg-bgforeground p-4 text-bgtext shadow-2xl">
                    <div className="flex flex-col gap-2 p-3 h-[92%] lg:h-[90%] bg-[#0A1A2F] rounded-3xl overflow-y-scroll no-scrollbar">
                        {activeSession.members.map(member=>(
                            <div key={member.id} className="flex items-center gap-4 px-8 py-6 w-full bg-bgforeground rounded-[20px]">
                                <img className="w-[40px] h-[40px] rounded-full" src="/user-2.jpg" />
                                <div className="flex flex-col">
                                    <span className="font-bold">{member.name}</span>
                                    <span className="text-gray-500 text-sm">Joined {member.joined}</span>
                                </div>
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

             {/* for modal */}
            {
                // USE UESR ID FROM USER OBJECTG IN FUTURE HERE
                // session.members.map(user=>user.id===6157483?  : '')
            }
        </>
    )
}
