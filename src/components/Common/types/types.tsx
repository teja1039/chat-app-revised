export interface User {
    id: string,
    name: string,
    profileImg: string,
    lastMessage?: Message
}

export interface Message {
    content: string,
    time: string,
}