import { addDoc, collection, query, orderBy, getDocs, doc, deleteDoc } from "firebase/firestore";
import { db, user } from "./authentication";
import type { MessageType } from "../types/messageTypes";
import { type chatMessagesType } from "../types/messageTypes";



export async function saveUserMessage(message: string, personalStudyMode: boolean){
    if(user){
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
            // await addDoc(collection(db, 'groupChats', group.id, 'chat'), {
            //     userId: user.uid,
            //     sender: user.displayName,
            //     message,
            //     tag: 'message',
            //     createdAt: new Date()
            // });
        }
    }
}


export async function saveSearchResponse(query: string, response: string, personalStudyMode: boolean, isGoogleSearch: boolean){
    let searchMethod, tag;
    if(isGoogleSearch) {
        searchMethod = 'Google Search';
        tag = 'google search'
    }
    else {
        searchMethod = 'AI Search'
        tag = 'ai search'
    };


    if(user){
        if(personalStudyMode){
            await addDoc(collection(db, 'personalChat', user.uid, 'chat'), {
                userId: 'search',
                profileImage: user.photoURL,
                sender: user.displayName,
                query,
                response,
                searchMethod,
                tag,
                createdAt: new Date()
            });
        }
        else{
            // await addDoc(collection(db, 'groupChats', meeting.id), {
            //     userId: user?.uid,
            //     message: query,
            //     sender: user?.displayName,
            //     tag: "message",
            //     createdAt: new Date()
            // });
        }
    }
}


export async function fetchChatMessages(personalStudyMode: boolean, groupId?: string){
    if(!user) return;
    const chatMessages: chatMessagesType = [];
    let chatQuery;

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


export async function deleteMessage(personalStudyMode: boolean, messageId: string, groupId?: string){
    if(!user) return;

    if(personalStudyMode){
        deleteDoc(doc(db, 'personalChat', user.uid, 'chat', messageId))
    }
    else{
        if(!groupId) return;
        deleteDoc(doc(db, 'groups', groupId, 'chat', messageId))
    }
}
