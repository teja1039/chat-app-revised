import { User } from "../../Common/types/types";
import { useCallback, useState } from "react";
import Modal, { ModalType } from "../../Common/Modal/Modal";
import { DEFAULT_CONTACT } from "../../Common/constants";
import { setMessageListToLocalStorage } from "../../Common/localStorageFunctions";
import UserCard from "./UserCard/UserCard";
import { useContactList, useContactListDipatch } from "../../MainContainer/ContactListProvider";

interface UserListProps {
  currentContact: User;
  setCurrentContact: React.Dispatch<React.SetStateAction<User>>;
  isCompact: boolean;
}

const UserList: (userListPros: UserListProps) => JSX.Element = ({
  currentContact,
  setCurrentContact,
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
    if (selectedUserId === currentContact.id) setCurrentContact(DEFAULT_CONTACT);
    setMessageListToLocalStorage(selectedUserId, []);
    setDeleteUserModal(false);
  }, [selectedUserId, currentContact]);

  return (
    <div className="user-list">
      {contactList.map((contact) => {
        return (
          <UserCard
            user={contact}
            key={contact.id}
            isCurrentContact = {currentContact.id === contact.id}
            isCompact={isCompact}
            setCurrentContact={setCurrentContact}
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
