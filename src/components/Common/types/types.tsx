export interface User {
    id: string,
    name: string,
    profileImg: string
}

export interface Message {
    id: string,
    content: string,
    sentTime: string,
    toUser?: boolean, 
}

export interface Conversation {
    withUser: User,
    messages : Message[]
}

export interface Contact extends User {
    lastMessage ?: Message,
}

export type ContactList = Contact[];
export type MessageList = Message[];