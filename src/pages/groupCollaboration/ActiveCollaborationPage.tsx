import { useState } from "react"
import { Link } from "react-router"
import Navbar from "../../components/Navbar"
import { Users, CopyIcon, UserCog } from "lucide-react"
import WarningModal from "../../components/Modal"

type props = {
    setGroupCollaborationPageTitle: React.Dispatch<React.SetStateAction<string>>,
    activeSessions: {
        meetingName: string,
        meetingId: number, //USE FIRESTORE AUTOID AS DOC ID
        meetingCode: string,
        meetingCreator: string,
        memberNo: number,
        members: { name: string, id: number, joined: string }[],
        createdAt: string
    }[]
}

export default function ActiveCollaborationsPage({ setGroupCollaborationPageTitle, activeSessions }: props){
    const [showJoinMeetingModal, setShowJoinMeetingModal] = useState(false);
    const [showCreateMeetingModal, setShowCreateMeetingModal] = useState(false);

    return(
        <>
            <title>Active Sessions</title>

            <Navbar title={"Active Sessions"} showTitle={true} showProfileIcon={true} showMenuButton={true} />

            <section className="w-full h-screen text-bgtext bg-bgdark">
                <div className="grid grid-cols-1 lg:grid-cols-3 place-items-center gap-5 pt-25 pb-[120px] w-full min-h-screen h-dvh overflow-y-scroll no-scrollbar [&>*]:w-[90%] lg:[&>*]:w-[350px] lg:gap-0">
                    {activeSessions.map((session) => (
                        <div key={session.meetingId} className="flex justify-center items-center p-4 bg-bgforeground rounded-[20px]">
                            <div className="flex justify-center flex-col gap-4 px-5 py-5 w-full bg-[#0A1A2F] rounded-[20px] cursor-pointer">
                                <div className="flex items-center justify-between">
                                    <span className="font-bold text-[17px] truncate">{session.meetingName}</span>

                                    <div className="flex gap-1.5">
                                        <Users size={20} className="text-bgtext" />
                                        <span>{session.memberNo}</span>
                                    </div>
                                </div>

                                <div className="flex items-center gap-1 text-sm">
                                    <div className="flex items-center gap-1 mr-2.5">
                                        <UserCog size={20} className="text-bgtext" />
                                        <span>Admin</span>
                                    </div>

                                    <span>{session.meetingCreator}</span>
                                </div>

                                <div className="flex items-center justify-between">
                                    <span>Copy meeting code</span>

                                    <button
                                        className="py-3 px-5.5 border border-gray-500 rounded-[10px] transition hover:bg-white/5 cursor-pointer"
                                        onClick={() => navigator.clipboard.writeText(`${session.meetingCode}`)}
                                    >
                                        <CopyIcon size={20} className="text-bgtext" />
                                    </button>
                                </div>

                                <div className="flex items-end justify-between">
                                    <span className="text-gray-500 text-[12px]">Created {session.createdAt}</span>

                                    <Link to="/groupcollaboration"
                                        className="py-3 px-5.5 text-bgforeground rounded-[15px] bg-bgtext cursor-pointer"
                                        onClick={() => { setGroupCollaborationPageTitle(`${session.meetingName}`) }}
                                    >
                                        Open Group
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="fixed bottom-0 flex items-center justify-center gap-10 w-full h-[100px] bg-bgforeground border-t border-t-gray-600">
                    <button
                        className="py-3.5 px-5.5 text-bgtext rounded-[15px] border border-bgtext transition hover:bg-white/5 cursor-pointer"
                        onClick={() => { setShowJoinMeetingModal(true) }}
                    >
                        Join Group
                    </button>

                    <button
                        className="py-3 px-5.5 text-bgforeground rounded-[15px] bg-bgtext cursor-pointer"
                        onClick={() => { setShowCreateMeetingModal(true) }}
                    >
                        Create Group
                    </button>
                </div>
            </section>


            {showJoinMeetingModal && (
                <WarningModal
                    message="Enter group code to join"
                    isMessageModal={false}
                    isDeleteWarning={false}
                    isJoinMeetingModal={true}
                    isCreateMeetingModal={false}
                    setShowModal={setShowJoinMeetingModal}
                />
            )}

            {showCreateMeetingModal && (
                <WarningModal
                    message="Create a group name"
                    isMessageModal={false}
                    isDeleteWarning={false}
                    isJoinMeetingModal={false}
                    isCreateMeetingModal={true}
                    setShowModal={setShowCreateMeetingModal}
                />
            )}
        </>
    )
}
