import type { Timestamp } from "firebase/firestore"

export type groupType = {
    groupId: string,
    groupName: string,
    groupJoinCode: string,
    groupCreator: { creatorName: string, creatorId: string },
    memberNo: number,
    members: { name: string, id: string }[],
    memberIds: [],
    createdAt: Timestamp
}

export type activeGroupsType = {
    groupId: string,
    groupName: string,
    groupJoinCode: string,
    groupCreator: { creatorName: string, creatorId: string },
    memberNo: number,
    members: { name: string, id: string }[],
    memberIds: [],
    createdAt: Timestamp
}[]
