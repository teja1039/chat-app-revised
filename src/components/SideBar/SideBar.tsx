import { useCallback, useState } from "react";
import UserList from "./UserList/UserList";
import Modal, { ModalType } from "../Common/Modal/Modal";
import { v4 as uuidv4 } from "uuid";
import SideBarHeader from "./SideBarHeader/SideBarHeader";
import NewUserButton from "./NewUserButton/NewUserButton";
import { useContactListDipatch } from "./UserList/ContactListProvider";

interface SideBarProps {
  isCompact: boolean;
  setIsCompact: React.Dispatch<React.SetStateAction<boolean>>;
}

const SideBar: React.FC<SideBarProps> = ({
  isCompact,
  setIsCompact,
}) => {

  const contactListDispatch = useContactListDipatch();
  const [newUserModal, setNewUserModal] = useState(false);

  const handleNewUser: (userName?: string) => void = useCallback((userName) => {
    if (!userName) return;

    contactListDispatch({
      type: 'add_contact',
      id : userName + "_" + uuidv4(),
      name : userName,
    })

    setNewUserModal(false);
  },[]);

  return (
    <div className="sidebar">
      <SideBarHeader setIsCompact={setIsCompact}/>
      <NewUserButton setNewUserModal={setNewUserModal} />
      <UserList
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
