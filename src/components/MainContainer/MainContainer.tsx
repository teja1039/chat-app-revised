import { useEffect, useState } from "react";
import { Message, User } from "../Common/types/types";
import SideBar from "../SideBar/SideBar";
import ChatWindow from "../ChatWindow/ChatWindow";
import {
  getMessageListFromLocalStorage
} from "../Common/localStorageFunctions";
import { DEFAULT_USER } from "../Common/constants";
import { ContactListProvider } from "./ContactListProvider";

const MainContainer: () => JSX.Element = () => {
  const [currentUser, setCurrentUser] = useState<User>(DEFAULT_USER);
  const [messageList, setMessageList] = useState<Message[]>(
    getMessageListFromLocalStorage(currentUser.id)
  );
  const [isCompact, setIsCompact] = useState(false);

  // useEffect(() => {
  //   setMessageList(getMessageListFromLocalStorage(currentUser.id));
  // }, [currentUser]);

  // useEffect(() => {
  //   setMessageListToLocalStorage(currentUser.id, messageList);
  //   setUserList((prevUserList) => {
  //     const index = prevUserList.findIndex(
  //       (user) => user.id === currentUser.id
  //     );
  //     if (index !== -1) {
  //       const newUserList = [...prevUserList];
  //       newUserList[index] = {
  //         ...newUserList[index],
  //         lastMessage: messageList.at(-1),
  //       };

  //       return newUserList;
  //     }
  //     return prevUserList;
  //   });
  // }, [currentUser,messageList]);

  // useEffect(() => {
  //   setUserListToLocalStorage(userList);
  // }, [userList]);

  return (
    <div className="main-container">
      <ContactListProvider>
        <SideBar
          currentUser={currentUser}
          setCurrentUser={setCurrentUser}
          isCompact={isCompact}
          setIsCompact={setIsCompact}
        />
      </ContactListProvider>
      <ChatWindow
        user={currentUser}
        messageList={messageList}
        setMessageList={setMessageList}
        isCompact={isCompact}
      />
    </div>
  );
};

export default MainContainer;
