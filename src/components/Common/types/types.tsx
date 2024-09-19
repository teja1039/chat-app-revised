export interface User {
    id: string,
    name: string,
    profileImg: string
}

export interface Message {
    content: string,
    sentTime: string
}

export interface Conversation {
    fromUser : User,
    toUser : User,
    messagesToUser : Message[],
    messagesFromUser : Message[] 
}

export interface Contact extends User {
    lastMessage ?: Message,
}

export type ContactList = Contact[];