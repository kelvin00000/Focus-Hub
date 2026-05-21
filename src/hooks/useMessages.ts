import { collection, onSnapshot, query, orderBy, getDocs, type DocumentData } from "firebase/firestore"
import { useEffect, useState } from "react"
import { db, user } from "../services/authentication";
import type { MessageType } from "../types/messageTypes";


export const useMessages = (chatId: string) => {
    const [chatMessages, setChatMessages] = useState<MessageType[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let chatQuery;
        if(!user) return

        if (chatId === "personalChat") {
            chatQuery = query(collection(db, "personalChat", user.uid, "chat"),
                orderBy("timestamp", "asc")
            );
        }
        else {
            console.log(true)
            chatQuery = query(collection(db, "groupChats", chatId, "chat"),
                orderBy("timestamp", "asc")
            );
        }

        const unsubscribe = onSnapshot(chatQuery, (snapshot) => {
            const messages = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as MessageType[];
            setChatMessages(messages);
            setLoading(false);
            // console.log(messages)
        });
        return () => unsubscribe();

    }, [chatId]);

    return { chatMessages, loading };
};

async function uoo() {
    if (!user) return;
    const chatSnap = await getDocs(collection(db, "personalChat", user.uid, "chat"))
    const messageData:DocumentData = [];
    chatSnap.forEach(doc=>{
        messageData.push(doc.data())
    })
    console.log(messageData)
}
uoo()
