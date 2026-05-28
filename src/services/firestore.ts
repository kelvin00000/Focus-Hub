import { addDoc, collection, query, orderBy, getDocs, doc, deleteDoc, getDoc, where, updateDoc, increment, arrayUnion, arrayRemove } from "firebase/firestore";
import { db, user } from "./authentication";
import type { MessageType } from "../types/messageTypes";
import { type chatMessagesType } from "../types/messageTypes";
import type { activeGroupsType, groupType } from "../types/groupTypes";



export async function saveUserMessage(message: string, personalStudyMode: boolean, groupId: string){
    if(user){
        try{
            if(personalStudyMode){
                await addDoc(collection(db, 'personalChat', user.uid, 'chat'), {
                    userId: user.uid,
                    profileImage: user.photoURL,
                    sender: user.displayName,
                    message,
                    tag: 'message',
                    createdAt: new Date()
                });
            }
            else{
                await addDoc(collection(db, 'groups', groupId, 'chat'), {
                    userId: user.uid,
                    profileImage: user.photoURL,
                    sender: user.displayName,
                    message,
                    tag: 'message',
                    createdAt: new Date()
                });
            }
        }
        catch(err){
            console.error(err);
        }
    }
}


export async function saveSearchResponse(query: string, response: string, personalStudyMode: boolean, isGoogleSearch: boolean, groupId: string){
    let searchMethod, tag;
    if(isGoogleSearch) {
        searchMethod = 'Google Search';
        tag = 'google search'
    }
    else {
        searchMethod = 'AI Search'
        tag = 'ai search'
    };
    let _response = response;
    if(!_response) _response = 'Could not generate a response for this query';


    if(user){
        try{
            if(personalStudyMode){
                await addDoc(collection(db, 'personalChat', user.uid, 'chat'), {
                    userId: 'search',
                    profileImage: user.photoURL,
                    sender: user.displayName,
                    query,
                    response: _response,
                    searchMethod,
                    tag,
                    createdAt: new Date()
                });
            }
            else{
                await addDoc(collection(db, 'groups', groupId, "chat"), {
                    userId: 'search',
                    profileImage: user.photoURL,
                    sender: user.displayName,
                    query,
                    response: _response,
                    searchMethod,
                    tag,
                    createdAt: new Date()
                });
            }
        }
        catch(err){
            console.error(err);
        }
    }
}

export async function modifyGroup(action: string, groupId?: string, newGroupName?: string){
    if(!action) return;

    try{
        if(action==="create"){
            if(!newGroupName) throw new Error("parameter 'name' missing");
            const docRef = await addDoc(collection(db, "groups"), {
                groupName: newGroupName,
                groupCreator: { creatorName: user?.displayName, creatorId: user?.uid },
                memberNo: 1,
                members: [{ name: user?.displayName, id: user?.uid, profileImage: user?.photoURL }],
                memberIds: [user?.uid],
                createdAt: new Date()
            });

            await updateDoc(docRef, {
                groupId: docRef.id,
                groupJoinCode: docRef.id,

            })
        }
        else if(action==="join"){
            if(!groupId) throw new Error("parameter 'groupId' missing");

            await updateDoc(doc(db, "groups", groupId), {
                memberNo: increment(1),
                members: arrayUnion({ name: user?.displayName, id: user?.uid, profileImage: user?.photoURL }),
                memberIds: arrayUnion(user?.uid),
            })
        }
        else if(action==="update"){
            if(!groupId || !newGroupName) throw new Error("paramter missing");
            await updateDoc(doc(db, "groups", groupId), {
                groupName: newGroupName
            })
        }
        else if(action==="leave"){
            if(!groupId) throw new Error("parameter groupId missing");

            await updateDoc(doc(db, "groups", groupId), {
                memberNo: increment(-1),
                members: arrayRemove({ name: user?.displayName, id: user?.uid, profileImage: user?.photoURL }),
                memberIds: arrayRemove(user?.uid),
            })
        }
        else if(action==="delete"){
            if(!groupId) throw new Error("group if missing");
            await deleteDoc(doc(db, "groups", groupId))
        }
        else throw new Error("unsupported action");
    }
    catch(err){
        console.error(err);
    }
}


export async function fetchChatMessages(personalStudyMode: boolean, groupId?: string): Promise<chatMessagesType | undefined | void> {
    if(!user) return;
    const chatMessages: chatMessagesType = [];
    let chatQuery;

    try{
        if(personalStudyMode){
            chatQuery = query(collection(db, "personalChat", user.uid, "chat"),
                orderBy("createdAt", "asc")
            );
        }
        else{
            if(!groupId) return;
            chatQuery = query(collection(db, "groups", groupId, "chat"),
                orderBy("createdAt", "asc")
            );
        }

        const chatSnap = await getDocs(chatQuery);
        for(const doc of chatSnap.docs){
            const tempObj = {
                id: doc.id,
                ...doc.data()

            } as MessageType
            chatMessages.push(tempObj);
        }

        return chatMessages;
    }
    catch(err){
        return console.error(err)
    }
}

export async function fetchActiveGroups(): Promise<activeGroupsType | undefined | void> {
    if(!user) return;
    const userActiveGroups: activeGroupsType = [];

    try{
        const userActiveGroupsQuery = query(collection(db, "groups"),
            where("memberIds", "array-contains", user.uid)
        );

        const userActiveGroupsSnap = await getDocs(userActiveGroupsQuery);
        for(const doc of userActiveGroupsSnap.docs){
            const tempObj = {
                groupId: doc.id,
                groupJoinCode: doc.id,
                ...doc.data()

            } as groupType
            userActiveGroups.push(tempObj);
        }

        return userActiveGroups;
    }
    catch(err){
        return console.error(err)
    }
}

export async function fetchGroupInfo(personalStudyMode: boolean, groupId: string){
    if(personalStudyMode||!groupId) throw new Error("parameter missing");

    const groupInfoSnap = await getDoc(doc(db, "groups", groupId));
    return groupInfoSnap.data();
}

export async function removeGroupMember(groupId: string, id: string, name: string, profileImage: string) {
    if(!groupId) throw new Error("group id missing");
    if(id===user?.uid) await modifyGroup("delete", groupId, "");

    await updateDoc(doc(db, "groups", groupId), {
        memberNo: increment(-1),
        members: arrayRemove({ name: name, id: id, profileImage: profileImage }),
        memberIds: arrayRemove(id),
    })
}

export async function deleteMessage(personalStudyMode: boolean, messageId: string, groupId?: string){
    if(!user) return;

    try{
        if(personalStudyMode){
            deleteDoc(doc(db, 'personalChat', user.uid, 'chat', messageId))
        }
        else{
            if(!groupId) return;
            const snap = await getDoc(doc(db, 'groups', groupId, 'chat', messageId));
            if(snap.data()?.userId!==user.uid) throw new Error("An error ocurred");
            deleteDoc(doc(db, 'groups', groupId, 'chat', messageId))
        }
    }
    catch(err){
        console.error(err);
    }
}
