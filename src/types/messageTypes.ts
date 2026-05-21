import type { Timestamp } from "firebase/firestore"

export type MessageType = {
    id: string
    userId: string
    sender: string
    profileImage?: string
    message?: string
    query?: string
    response?: string
    previewUrl?: string
    originalUrl?: string
    searchMethod?: string,
    tag: string
    createdAt: Timestamp
}

export type chatMessagesType = {
    id: string
    userId: string
    sender: string
    profileImage?: string
    message?: string
    query?: string
    response?: string
    previewUrl?: string
    originalUrl?: string
    searchMethod?: string,
    tag: string
    createdAt: Timestamp
}[]
