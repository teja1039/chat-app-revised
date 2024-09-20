import { Conversation, Message, User } from "./types/types";

export const DEFAULT_USER : User = Object.freeze({
  id: "default-user",
  name: "Krishna Teja",
  profileImg:
    "https://fastly.picsum.photos/id/297/200/300.jpg?hmac=SF0Y51mRP7i6CoLBIuliqQwDIUJNyf63_r3xhamVSLE",
});

export const DEFAULT_CONVERSATION : Conversation = Object.freeze({
  withUser: DEFAULT_USER,
  messages : []
})

export const DEFAULT_MESSAGE : Message = Object.freeze({
  id : "default-message",
  content : "No message yet...",
  sentTime : "timestamp"
});
