import React, { useLayoutEffect, useRef, useState } from "react";
import { Contact, Message, User } from "../../types/types";
import { truncateTo25Chars } from "../../util";
import Tooltip from "../../Tooltip";

interface UserDetailsProps {
  user: Contact;
  diplayLastMessage?: boolean;
}

const UserDetails: React.FC<UserDetailsProps> = ({
  user,
  diplayLastMessage,
}) => {
  const targetRef = useRef<HTMLDivElement>(null);
  return (
    <div
      className="user-details"
      ref={targetRef}
    >
      <h2>{user.name}</h2>
      {diplayLastMessage && (
        <>
          <div>
            <p className="last-message">
              {truncateTo25Chars(user.lastMessage?.content)}
            </p>
          </div>

          {isMessageTruncated(user.lastMessage) && (
            <Tooltip
              targetRef={targetRef}
              text={user.lastMessage?.content ?? ""}
            />
          )}
        </>
      )}
    </div>
  );
};

const isMessageTruncated = (message?: Message) => {
  return (message ? message.content.length : 0) > 25;
};

export default UserDetails;
