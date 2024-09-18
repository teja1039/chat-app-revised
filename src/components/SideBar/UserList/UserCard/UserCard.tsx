import UserProfile from "../../../Common/UserProfile/UserProfile";
import DeleteIcon from "@mui/icons-material/Delete";
import { User } from "../../../Common/types/types";
import React, { memo } from "react";

interface UserCardProps {
  user: User,
  isCurrentUser: boolean,
  isCompact: boolean,
  setCurrentUser: React.Dispatch<React.SetStateAction<User>>,
  handleDeleteUser: (index: string) => void
}

const UserCard: React.FC<UserCardProps> = ({
  user,
  isCurrentUser,
  isCompact,
  setCurrentUser,
  handleDeleteUser,
}) => {
  return (
    <>
      <div
        className={"user-card" + (isCurrentUser ? " focus-user-card" : "")}
        onClick={(e) => {
          e.stopPropagation();
          setCurrentUser(user);
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
          {isCompact || <p className="timestamp">{user.lastMessage?.time}</p>}
        </div>
      </div>
    </>
  );
};

export default memo(UserCard);
