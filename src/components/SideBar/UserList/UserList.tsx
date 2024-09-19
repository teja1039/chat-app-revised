import { User } from "../../Common/types/types";
import { useCallback, useState } from "react";
import Modal, { ModalType } from "../../Common/Modal/Modal";
import { DEFAULT_USER } from "../../Common/constants";
import { setMessageListToLocalStorage } from "../../Common/localStorageFunctions";
import UserCard from "./UserCard/UserCard";
import { useContactList, useContactListDipatch } from "../../MainContainer/ContactListProvider";

interface UserListProps {
  currentUser: User;
  setCurrentUser: React.Dispatch<React.SetStateAction<User>>;
  isCompact: boolean;
}

const UserList: (userListPros: UserListProps) => JSX.Element = ({
  currentUser,
  setCurrentUser,
  isCompact,
}) => {

  const contactList = useContactList();
  const contactListDispatch = useContactListDipatch();
  const [deleteUserModal, setDeleteUserModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState("");

  const handleDeleteUser: (id: string) => void = useCallback((id) => {
    setSelectedUserId(id);
    setDeleteUserModal(true);
  }, []);

  const handleDeleteUserModal = useCallback(() => {
    contactListDispatch({
      type: 'delete_contact',
      id: selectedUserId,
    });
    if (selectedUserId === currentUser.id) setCurrentUser(DEFAULT_USER);
    setMessageListToLocalStorage(selectedUserId, []);
    setDeleteUserModal(false);
  }, [selectedUserId, currentUser]);

  return (
    <div className="user-list">
      {contactList.map((contact) => {
        return (
          <UserCard
            user={contact}
            key={contact.id}
            isCurrentUser = {currentUser.id === contact.id}
            isCompact={isCompact}
            setCurrentUser={setCurrentUser}
            handleDeleteUser={handleDeleteUser}
          />
        );
      })}

      {deleteUserModal && (
        <Modal
          type={ModalType.DeleteModal}
          onSave={handleDeleteUserModal}
          onCancel={setDeleteUserModal}
        />
      )}
    </div>
  );
};

export default UserList;
