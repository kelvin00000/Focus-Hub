import { useState, useEffect, useRef } from "react"
import { Link } from "react-router"
import Navbar from "../../components/Navbar"
import { Users, CopyIcon, UserCog, Edit2, Trash2, DoorOpenIcon } from "lucide-react"
import Modal from "../../components/Modal"
import { useAuth } from "../../hooks/useAuth"
import { useStudyMode } from "../../hooks/useStudyMode"
import type { activeGroupsType } from "../../types/groupTypes"
import { fetchActiveGroups, modifyGroup } from "../../services/firestore"
import LoadingScreen from "../../components/LoadingScreen"
import { formatJoinDate } from "../../utils/formatJoinDate"
import { user, db } from "../../services/authentication"
import { collection, getDocs, query, where } from "firebase/firestore";
import NoResultsScreen from "../../components/NoResultsScreen"


type props = {
    setGroupCollaborationPageTitle: React.Dispatch<React.SetStateAction<string>>
    setGroupIdValue: React.Dispatch<React.SetStateAction<string>>
}

export default function ActiveCollaborationsPage({ setGroupCollaborationPageTitle, setGroupIdValue }: props){
    useAuth();
    const { setPersonalStudyMode } = useStudyMode();
    const [ activeGroups, setActiveGroups ] = useState<activeGroupsType>([]);
    const [ showLoadingScreen, setShowLoadingScreen ] = useState(false);
    const [ showMessageModal, setShowMessageModal ] = useState(false);
    const [ message, setMessage ] = useState("");
    const [ showNoActiveGroupsScreen, setShowNoActiveGroupsScreen ] = useState(false);
    const [ showJoinGroupModal, setShowJoinGroupModal ] = useState(false);
    const [ showCreateGroupModal, setShowCreateGroupModal ] = useState(false);
    const [ showChangeGroupNameModal, setShowChangeGroupNameModal ] = useState(false);
    const [ showDeleteGroupModal, setShowDeleteGroupModal ] = useState(false);
    const [ showLeaveGroupModal, setShowLeaveGroupModal ] = useState(false);
    const changeNameButtonRef = useRef<HTMLButtonElement>(null);
    const deleteGroupButtonRef = useRef<HTMLButtonElement>(null);
    const leaveGroupButtonRef = useRef<HTMLButtonElement>(null);


    const renderActiveGroups = async ()=>{
        setShowLoadingScreen(true)
        const groups = await fetchActiveGroups();
        if(groups!.length === 0) {
            setShowNoActiveGroupsScreen(true);
            setShowLoadingScreen(false);
            return;
        }
        setActiveGroups(groups!);
        setShowLoadingScreen(false)
    }
    useEffect(() => {
        const loadUI = async () => {
            setShowLoadingScreen(true)
            const groups = await fetchActiveGroups();
            if(groups!.length === 0) {
                setShowNoActiveGroupsScreen(true);
                setShowLoadingScreen(false);
                return;
            }
            setActiveGroups(groups!);
            setShowLoadingScreen(false)
        };
        loadUI();
    }, []);

    const handleGroupAction = async ( action: string, groupId?: string, groupName?: string) =>{
        try{
            if(action==="create") await modifyGroup(action, "", groupName)
            if(action==="delete") await modifyGroup(action, groupId, "")
            if(action==="update") await modifyGroup(action, groupId, groupName)
            if(action==="leave") await modifyGroup(action, groupId, "")
            if(action==="join") {
                // CHECK FOR IF GROUP EXIXTS OR NOT
                const groupsIdSnap = await getDocs(collection(db, "groups"));
                groupsIdSnap.forEach(existingGroup=>{
                    if(groupId!==existingGroup.id) {
                        setMessage("Group does not exist")
                        setShowMessageModal(true)
                        return;
                    };
                    return;
                })
                // CHECK FOR IF USER IF ALREADY IN GROUP OR NOT
                const userActiveGroupsQuery = query(collection(db, "groups"),
                    where("memberIds", "array-contains", user?.uid)
                );
                const userActiveGroupsSnap = await getDocs(userActiveGroupsQuery);
                userActiveGroupsSnap.forEach(existingGroup=>{
                    if (existingGroup.id === groupId) {
                        setMessage("You are already a member");
                        setShowMessageModal(true);
                        return;
                    }
                    return;
                })

                await modifyGroup(action, groupId, "");
            }

            setShowLeaveGroupModal(false);
            setShowJoinGroupModal(false);
            setShowCreateGroupModal(false);
            setShowChangeGroupNameModal(false);
            setShowDeleteGroupModal(false);
            if(!renderActiveGroups) return;
            await renderActiveGroups();
        }
        catch(err){
            console.error(err);
            setMessage("Something went wrong. Please try again");
            setShowMessageModal(true);
        }
    }


    return(
        <>
            <title>Active Sessions</title>

            <Navbar title={"Active Sessions"} showTitle={true} showProfileIcon={true} showMenuButton={true} />

            <section className="w-full h-screen text-bgtext bg-bgdark">
                <div className="grid grid-cols-1 lg:grid-cols-3 place-items-center gap-5 pt-25 pb-[120px] w-full min-h-screen h-dvh overflow-y-scroll no-scrollbar *:w-[90%] lg:*:w-[350px] lg:gap-0">
                    {!showNoActiveGroupsScreen
                        ? activeGroups.map((group) => (
                            <div key={group.groupId} className="flex justify-center items-center p-4 bg-bgforeground rounded-[20px]">
                                <div className="flex justify-center flex-col px-5 py-5 w-full bg-[#0A1A2F] rounded-[20px] cursor-pointer">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center w-[85%] font-bold text-[17px]">
                                            <span className="max-w-[80%] truncate">{group.groupName}</span>

                                            {group.groupCreator.creatorId===user?.uid?
                                                <button
                                                    ref={changeNameButtonRef}
                                                    data-group-id={group.groupId}
                                                    onClick={()=>{setShowChangeGroupNameModal(true)}}
                                                    className="flex items-center justify-center gap-1 w-[70px] h-[40px] oultline-none border-none rounded-[20px]"
                                                >
                                                    <Edit2 size={20} className="text-gray-500" />
                                                    <span className="text-[13px] text-gray-500">Edit</span>
                                                </button>
                                                : ''
                                            }
                                        </div>

                                        <div className="flex gap-1.5">
                                            <Users size={20} className="text-bgtext" />
                                            <span>{group.memberNo}</span>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-1 mt-[3px] mb-[20px] text-sm">
                                        <div className="flex items-center gap-1 mr-2.5">
                                            <UserCog size={20} className="text-bgtext" />
                                            <span>Admin </span>
                                        </div>

                                        <span>{group.groupCreator.creatorName}</span>
                                    </div>

                                    <div className="flex items-center justify-between mb-[30px]">
                                        <span>Copy join code</span>

                                        <button
                                            className="py-3 px-5.5 border border-gray-500 rounded-[10px] transition hover:bg-white/5 cursor-pointer"
                                            onClick={() => navigator.clipboard.writeText(`${group.groupJoinCode}`)}
                                        >
                                            <CopyIcon size={20} className="text-bgtext" />
                                        </button>
                                    </div>

                                    {group.groupCreator.creatorId===user?.uid?
                                        <button
                                            ref={deleteGroupButtonRef}
                                            data-group-id={group.groupId}
                                            onClick={()=>{setShowDeleteGroupModal(true)}}
                                            className="flex items-center justify-center self-end gap-1 py-3 px-5.5 text-bgtext rounded-[15px] border border-red-400"
                                        >
                                            <Trash2 size={20} className="text-gray-300" />
                                            <span className="text-[13px] text-gray-300">Remove</span>
                                        </button>
                                        : ''
                                    }

                                    {group.groupCreator.creatorId!==user?.uid?
                                        <button
                                            ref={leaveGroupButtonRef}
                                            data-group-id={group.groupId}
                                            onClick={()=>{setShowLeaveGroupModal(true)}}
                                            className="flex items-center justify-center self-end gap-1 py-3 px-5.5 text-bgtext rounded-[15px] border border-grey-500"
                                        >
                                            <DoorOpenIcon size={20} className="text-gray-300" />
                                            <span className="text-[13px] text-gray-300">Leave</span>
                                        </button>
                                        : ''
                                    }

                                    <Link to="/groupcollaboration"
                                        className="flex justify-center mt-[10px] py-3 px-5.5 text-bgforeground rounded-[15px] bg-bgtext cursor-pointer"
                                        onClick={() => {
                                            setGroupCollaborationPageTitle(`${group.groupName}`)
                                            setPersonalStudyMode(false)
                                            setGroupIdValue(group.groupId)
                                        }}
                                    >
                                        Open Group
                                    </Link>

                                    <span className="self-center mt-2.5 text-gray-500 text-[12px]">Created {formatJoinDate(group.createdAt)}</span>
                                </div>
                            </div>
                        ))
                        :<NoResultsScreen message="Looks like there's nothing here" actionMessage="Create or Join a group" />
                    }
                </div>

                <div className="fixed bottom-0 flex items-center justify-center gap-10 w-full h-[100px] bg-bgforeground border-t border-t-gray-600">
                    <button
                        className="py-3.5 px-5.5 text-bgtext rounded-[15px] border border-bgtext transition hover:bg-white/5 cursor-pointer"
                        onClick={() => { setShowJoinGroupModal(true) }}
                    >
                        Join Group
                    </button>

                    <button
                        className="py-3 px-5.5 text-bgforeground rounded-[15px] bg-bgtext cursor-pointer"
                        onClick={() => { setShowCreateGroupModal(true) }}
                    >
                        Create Group
                    </button>
                </div>
            </section>


            {showMessageModal && (
                <Modal
                    message={message}
                    isMessageModal={true}
                    setShowModal={setShowMessageModal}
                />
            )}

            {showJoinGroupModal && (
                <Modal
                    message="Enter group code to join"
                    isJoinGroupModal={true}
                    setShowModal={setShowJoinGroupModal}
                    handleGroupAction={handleGroupAction}
                />
            )}

            {showCreateGroupModal && (
                <Modal
                    message="Create a group name"
                    isCreateGroupModal={true}
                    setShowModal={setShowCreateGroupModal}
                    handleGroupAction={handleGroupAction}
                />
            )}

            {showChangeGroupNameModal && (
                <Modal
                    message="Enter new group name"
                    isChangeGroupNameModal={true}
                    changeGroupButtonRef={changeNameButtonRef}
                    setShowModal={setShowChangeGroupNameModal}
                    handleGroupAction={handleGroupAction}
                />
            )}

            {showDeleteGroupModal && (
                <Modal
                    message="Are you sure you want to remove this group"
                    isDeleteGroupModal={true}
                    deleteGroupButtonRef={deleteGroupButtonRef}
                    setShowModal={setShowDeleteGroupModal}
                    handleGroupAction={handleGroupAction}
                />
            )}

            {showLeaveGroupModal && (
                <Modal
                    message="Are you sure you want to Leave this group"
                    isLeaveGroupModal={true}
                    leaveGroupButtonRef={leaveGroupButtonRef}
                    setShowModal={setShowLeaveGroupModal}
                    handleGroupAction={handleGroupAction}
                />
            )}

            {showLoadingScreen && <LoadingScreen />}
        </>
    )
}
