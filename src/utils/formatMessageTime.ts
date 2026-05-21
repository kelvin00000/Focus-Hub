import { Timestamp } from "firebase/firestore";

export function formatMessageTime(timestamp: Timestamp) {
    const date = timestamp.toDate();
    const now = new Date();

    const isToday = date.toDateString() === now.toDateString();
    const yesterday = new Date();
    yesterday.setDate(now.getDate() - 1);
    const isYesterday = date.toDateString() === yesterday.toDateString();

    const time = date.toLocaleTimeString([], {
        hour: "numeric",
        minute: "2-digit",
    }).toLowerCase();

    if (isToday) {return time;}
    if (isYesterday) {return `${time}, yesterday`;}
    return `${time}, ${date.toLocaleDateString([], {month: "short", day: "numeric",})}`;
}
