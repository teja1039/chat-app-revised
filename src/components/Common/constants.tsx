import { Contact } from "./types/types";

export const DEFAULT_CONTACT : Contact = Object.freeze({
  id: "default-user",
  name: "Krishna Teja",
  profileImg:
    "https://fastly.picsum.photos/id/297/200/300.jpg?hmac=SF0Y51mRP7i6CoLBIuliqQwDIUJNyf63_r3xhamVSLE",
  lastMessage: {
    id : "default_lastMessage",
    content: "",
    sentTime: "",
  },
});
