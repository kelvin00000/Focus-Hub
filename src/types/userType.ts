import type { Timestamp } from "firebase/firestore"

export type UserType = {
    profileImage: string
    email: string
    name: string
    groupsCreated: number
    groupsJoined: number
    currentGroups: []
    preferredTheme: "dark" | "light"
    createdAt: Timestamp
}
