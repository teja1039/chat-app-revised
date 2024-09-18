import React, { memo, useState } from "react";

export const enum ModalType {
  InputUserNameModal = 1,
  DeleteModal,
  EditMessageModal,
}

interface GenericModalProps {
  question?: string;
  inputValuePlaceholder?: string;
  inputPlaceholder?: string;
  onSave: (inputText?: string) => void;
  onCancel: React.Dispatch<React.SetStateAction<boolean>>;
}

const GenericModal: (genericModalProps: GenericModalProps) => JSX.Element = ({
  question,
  inputValuePlaceholder,
  inputPlaceholder,
  onSave,
  onCancel,
}) => {
  const [inputValue, setInputValue] = useState(inputValuePlaceholder);
  return (
    <div className="modal">
      <div className="modal-content">
        {question && <p className="modal-quesion">{question}</p>}
        {Boolean(inputPlaceholder) && (
          <textarea
            value={inputValue}
            placeholder={inputPlaceholder}
            className="modal-input"
            onChange={(e) => setInputValue(e.target.value)}
          />
        )}
        <div className="modal-buttons">
          <button
            className="save-button"
            onClick={() => onSave(inputValue)}
          >
            Save
          </button>
          <button
            className="cancel-button"
            onClick={() => onCancel(false)}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

interface ModalProps {
  type: ModalType;
  onSave: (inputValue?: string) => void;
  onCancel: React.Dispatch<React.SetStateAction<boolean>>;
  inputValue?: string;
}

const Modal: (modalProps: ModalProps) => React.JSX.Element = ({
  type,
  onSave,
  onCancel,
  inputValue,
}) => {
  switch (type) {
    case ModalType.InputUserNameModal:
      return (
        <GenericModal
          inputPlaceholder="Name of the User..."
          onSave={onSave}
          onCancel={onCancel}
        />
      );

    case ModalType.DeleteModal:
      return (
        <GenericModal
          question="Are you sure ?"
          onSave={onSave}
          onCancel={onCancel}
        />
      );

    case ModalType.EditMessageModal:
      return (
        <GenericModal
          inputPlaceholder="Edit your message here..."
          inputValuePlaceholder={inputValue}
          onSave={onSave}
          onCancel={onCancel}
        />
      );
  }
  return <></>;
};

export default memo(Modal);
