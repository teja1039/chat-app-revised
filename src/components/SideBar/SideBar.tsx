import { useCallback, useState } from "react";
import { User } from "../Common/types/types";
import UserList from "./UserList/UserList";
import Modal, { ModalType } from "../Common/Modal/Modal";
import { v4 as uuidv4 } from "uuid";
import SideBarHeader from "./SideBarHeader/SideBarHeader";
import NewUserButton from "./NewUserButton/NewUserButton";

interface SideBarProps {
  currentUser: User;
  setCurrentUser: React.Dispatch<React.SetStateAction<User>>;
  userList: User[];
  setUserList: React.Dispatch<React.SetStateAction<User[]>>;
  isCompact: boolean;
  setIsCompact: React.Dispatch<React.SetStateAction<boolean>>;
}

const SideBar: React.FC<SideBarProps> = ({
  currentUser,
  setCurrentUser,
  userList,
  setUserList,
  isCompact,
  setIsCompact,
}) => {
  const [newUserModal, setNewUserModal] = useState(false);

  const handleNewUser: (userName?: string) => void = useCallback((userName) => {
    if (!userName) return;

    const newUser = {
      id: userName + "_" + uuidv4(),
      name: userName,
      profileImg:
        "https://fastly.picsum.photos/id/297/200/300.jpg?hmac=SF0Y51mRP7i6CoLBIuliqQwDIUJNyf63_r3xhamVSLE",
      lastMessage: {
        content: "",
        time: "",
      },
    };

    setUserList((prevUserList) => [...prevUserList, newUser]);
    setNewUserModal(false);
  },[]);

  return (
    <div className="sidebar">
      <SideBarHeader setIsCompact={setIsCompact}/>
      <NewUserButton setNewUserModal={setNewUserModal} />
      <UserList
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
        userList={userList}
        setUserList={setUserList}
        isCompact={isCompact}
      />
      {newUserModal && (
        <Modal
          type={ModalType.InputUserNameModal}
          onSave={handleNewUser}
          onCancel={setNewUserModal}
        />
      )}
    </div>
  );
};

export default SideBar;
