import { ContactList, Conversation, Message, User } from "./types/types";

export const getUserListFromLocalStorage: () => User[] = () => {
  const users = localStorage.getItem(`UserList`);
  return users ? JSON.parse(users) : [];
};

export const setUserListToLocalStorage: (userList: User[]) => void = (
  userList
) => {
  localStorage.setItem("UserList", JSON.stringify(userList));
};

export const getMessageListFromLocalStorage: (userId: string) => Message[] = (
  userId
) => {
  const messages = localStorage.getItem(`${userId}_messages`);
  return messages ? JSON.parse(messages) : [];
};

export const setMessageListToLocalStorage: (
  userId: string,
  messageList: Message[]
) => void = (userId, messageList) => {
  localStorage.setItem(`${userId}_messages`, JSON.stringify(messageList));
};

export const getContactListFromLocalStorage: () => ContactList = () => {
  const contactList = localStorage.getItem(`ContactList`);
  return contactList ? JSON.parse(contactList) : [];
};

export const setContactListToLocalStorage: (
  contactList: ContactList
) => void = (contactList) => {
  localStorage.setItem("ContactList", JSON.stringify(contactList));
};

export const getConversationFromLocalStorage: (user: User) => Conversation = (
  user
) => {
  const conversation: Conversation = {
    withUser: user,
    messages: getMessageListFromLocalStorage(user.id),
  };
  return conversation;
};

export const setConversationToLocalStorage: (
  conversation: Conversation
) => void = (conversation) => {
  setMessageListToLocalStorage(conversation.withUser.id, conversation.messages);
};
