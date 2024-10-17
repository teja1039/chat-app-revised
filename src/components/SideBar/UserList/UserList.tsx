import { Contact, ContactList, User } from "../../Common/types/types";
import { useCallback, useState } from "react";
import { ConfirmationModal } from "../../Common/Modal/Modal";
import { DEFAULT_USER } from "../../Common/constants";
import { setMessageListToLocalStorage } from "../../Common/localStorageFunctions";
import UserCard from "./UserCard/UserCard";
import {
  useCurrentUser,
  useCurrentUserSetState,
} from "../../ContextProviders/CurrentUserProvider";
import { useMutation, useQuery } from "@apollo/client";
import { DELETE_CONTACT, GET_CONTACTS } from "../../../graphQueries";

interface UserListProps {
  isCompact: boolean;
}

const UserList: (userListPros: UserListProps) => JSX.Element = ({
  isCompact,
}) => {
  const currentUser = useCurrentUser();
  const setCurrentUser = useCurrentUserSetState();
  const {loading, error, data} = useQuery(GET_CONTACTS);
  const [deleteUserModal, setDeleteUserModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [deleteContact] = useMutation(DELETE_CONTACT, {
    refetchQueries: [{query: GET_CONTACTS}]
  });

  const handleDeleteUser: (id: string) => void = useCallback((id) => {
    setSelectedUserId(id);
    setDeleteUserModal(true);
  }, []);

  const handleDeleteUserModal = useCallback(() => {
    deleteContact({variables:{ userId: selectedUserId} })
    if (selectedUserId === currentUser.id) setCurrentUser(DEFAULT_USER);
    setMessageListToLocalStorage(selectedUserId, []);
    setDeleteUserModal(false);
  }, [selectedUserId, currentUser.id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;


  const contactList = data.getUsers as ContactList;
  console.log(contactList);

  return (
    <div className="user-list" data-testid = "user-list">
      {contactList.map((contact) => {
        return (
          <UserCard
            user={contact}
            key={contact.id}
            isCurrentContact={currentUser.id === contact.id}
            isCompact={isCompact}
            setCurrentContact={setCurrentUser}
            handleDeleteUser={handleDeleteUser}
          />
        );
      })}
      {deleteUserModal && (
        <ConfirmationModal
          onConfirm={handleDeleteUserModal}
          onCancel={() => setDeleteUserModal(false)}
        />
      )}
    </div>
  );
};

export default UserList;
