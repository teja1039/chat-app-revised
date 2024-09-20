import { Message } from "../../../Common/types/types";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { memo } from "react";

interface MessageItemProps {
  message: Message,
  index: number,
  isCompact: boolean,
  handleClick : (action : {
    type: string,
    index: number
  }) => void
}
const MessageItem: React.FC<MessageItemProps> = ({
  message,
  index,
  isCompact,
  handleClick
}) => {
  return (
    <div className="message-container">
      <div className="message">
        <p className="message-content">{message.content}</p>
        {isCompact || <p className="message-time">{message.sentTime}</p>}
      </div>
      <div className="message-button-container">
        <button
          className="message-edit-button"
          onClick={(e) => {
            e.stopPropagation();
            handleClick({
              type: "edit_message",
              index: index
            });
          }}
        >
          <EditIcon fontSize="inherit" />
        </button>
        <button
          className="message-delete-button"
          onClick={(e) => {
            e.stopPropagation();
            handleClick({
              type: "delete_message",
              index: index
            });
          }}
        >
          <DeleteIcon fontSize="inherit" />
        </button>
      </div>
    </div>
  );
};

export default memo(MessageItem);
