import React from "react";
import { Contact, User } from "../../types/types";
import { truncateTo25Chars } from "../../util";


interface UserDetailsProps {
  user: Contact;
  diplayLastMessage?: boolean;
}

const UserDetails: React.FC<UserDetailsProps> = ({ user, diplayLastMessage }) => {
  return (
    <div className="user-details">
      <h2>{user.name}</h2>
      {diplayLastMessage && (
        <>
          <div>
            <p className="last-message">
              {truncateTo25Chars(user.lastMessage?.content)}
            </p>
          </div>

          <div className="tooltip-container">
            <p className="tooltip">{user.lastMessage?.content}</p>
          </div>
        </>
      )}
    </div>
  );
};

export default UserDetails;
