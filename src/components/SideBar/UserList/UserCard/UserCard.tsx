import UserProfile from "../../../Common/UserProfile/UserProfile";
import DeleteIcon from "@mui/icons-material/Delete";
import { Contact, User } from "../../../Common/types/types";
import React, { memo } from "react";

function removeEditedPrefix(timeString ?: string) {
  if(!timeString) return '';
  return timeString.replace(/^Edited\s*/, '');
}

interface UserCardProps {
  user: Contact,
  isCurrentContact: boolean,
  isCompact: boolean,
  setCurrentContact: (user : User) => void,
  handleDeleteUser: (index: string) => void
}

const UserCard: React.FC<UserCardProps> = ({
  user,
  isCurrentContact,
  isCompact,
  setCurrentContact,
  handleDeleteUser,
}) => {
  return (
    <>
      <div
        className={"user-card" + (isCurrentContact ? " focus-user-card" : "")}
        onClick={(e) => {
          e.stopPropagation();
          setCurrentContact(user);
        }}
      >
        <UserProfile
          user={user}
          diplayLastMessage={!isCompact}
        />
        <div className="user-card-icons">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleDeleteUser(user.id);
            }}
            className="user-card-delete-button"
          >
            <DeleteIcon fontSize="inherit" />
          </button>
          {isCompact || <p className="timestamp">{removeEditedPrefix(user.lastMessage?.sentTime)}</p>}
        </div>
      </div>
    </>
  );
};

export default UserCard;
