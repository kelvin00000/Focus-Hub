import { useState } from "react";
import { Users } from "lucide-react"
import Navbar from "../../components/Navbar";
// import WorkArea from "../../components/WorkArea";
// import InputBar from "../../components/InputBar";
import ActiveMembersModal from "./ActiveMembersModal";
import { useAuth } from "../../hooks/useAuth";


// FETCH CURRENT GROUP INFO HERE AND PASS TO MODAL

type props = {
    groupCollaborationPageTitle: string
}

export default function GroupCollaborationPage({ groupCollaborationPageTitle }: props){
    useAuth();
    const [showMembersModal, setShowMembersModal] = useState(false);
    const [ activeSession ] = useState({
        meetingName: "Networking group",
        meetingId: 802848203923, //USE FIRESTORE AUTOID AS DOC ID
        meetingCode: "23hjnj23ht",
        meetingCreator: "Carter",
        memberNo: 13,
        members: [
            { name: "Carter", id: 924839, joined: "12th May 2026" },
            { name: "Maya", id: 9034839, joined: "12th May 2026" },
            { name: "Ethan", id: 4829173, joined: "3rd June 2026" },
            { name: "Sophia", id: 1947265, joined: "21st June 2026" },
            { name: "Noah", id: 8372614, joined: "8th March 2026" },
            { name: "Olivia", id: 5619082, joined: "17th July 2026" },
            { name: "Liam", id: 2754810, joined: "29th May 2026" },
            { name: "Ava", id: 6483721, joined: "14th May 2026" },
            { name: "Daniel", id: 9182736, joined: "6th August 2026" },
            { name: "Chloe", id: 3548192, joined: "25th September 2026" },
            { name: "James", id: 7261548, joined: "11th October 2026" },
            { name: "Isabella", id: 4839201, joined: "2nd November 2026" },
            { name: "Kelvin", id: 6157483, joined: "19th December 2026" }
        ],
        createdAt: "12th May 2026"
    })

    return(
        <>
            <title>Group</title>

            <Navbar title={groupCollaborationPageTitle} showTitle={true} showProfileIcon={true} showMenuButton={true} />

            <button
                className="fixed top-[8%] right-[5%] lg:top-[12%] lg:right-[3%] p-4 bg-[#0A1A2F] border border-gray-500 rounded-full cursor-pointer z-40"
                onClick={() => { setShowMembersModal(true) }}
                >
                    <Users size={20} className="text-bgtext" />
            </button>

            <section className="flex items-center justify-center w-full h-screen bg-bgdark">
                {/* <WorkArea /> */}
                {/* <InputBar /> */}
            </section>

            {showMembersModal && (
                <ActiveMembersModal setShowModal={setShowMembersModal} activeSession={activeSession} />
            )}
        </>
    )
}
