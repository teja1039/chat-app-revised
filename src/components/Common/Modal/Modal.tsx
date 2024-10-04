import React, { memo, ReactNode, useEffect, useRef, useState } from "react";

type FocusableElement =
  | HTMLInputElement
  | HTMLButtonElement
  | HTMLTextAreaElement
  | HTMLAnchorElement
  | HTMLSelectElement;

interface ModalProps {
  children?: ReactNode;
}
export const Modal: React.FC<ModalProps> = ({ children }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!modalRef.current) return;

    const handleKeyDown = (e : KeyboardEvent) => {
      if (e.key === "Tab") {
        if (!modalRef.current) return;

        const focusableElements = modalRef.current.querySelectorAll(
          'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])'
        ) as NodeListOf<FocusableElement>;
        
        const firstFocusableElement = focusableElements[0];
        const lastFocusableElement =
          focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstFocusableElement) {
            lastFocusableElement.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastFocusableElement) {
            firstFocusableElement.focus();
            e.preventDefault();
          }
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div
      className="modal"
      ref={modalRef}
      tabIndex={-1}
      data-testid = "modal"
    >
      <div className="modal-content">{children}</div>
    </div>
  );
};

interface ModalButtonProps {
  className?: string;
  buttonName: string;
  onClick: () => void;
}
export const ModalButton: React.FC<ModalButtonProps> = ({
  className = "modal-button",
  buttonName,
  onClick,
}) => {
  return (
    <button
      className={className}
      onClick={onClick}
    >
      {buttonName}
    </button>
  );
};

interface ModalButtonsContainerProps {
  children?: ReactNode;
}
export const ModalButtonsContainer: React.FC<ModalButtonsContainerProps> = ({
  children,
}) => {
  return <div className="modal-buttons-container">{children}</div>;
};

interface InputModalProps extends ModalProps {
  onSave: (inputValue: string) => void;
  onCancel: () => void;
  inputPlaceholder?: string;
  inputDefaultValue?: string;
}
export const InputModal: React.FC<InputModalProps> = ({
  onSave,
  onCancel,
  inputPlaceholder = "Enter text here...",
  inputDefaultValue = "",
}) => {
  const [inputValue, setInputValue] = useState(inputDefaultValue);

  const handleSave = () => {
    onSave(inputValue);
  };

  return (
    <Modal>
      <label htmlFor="modal-input">Input:</label>
      <textarea
        id = "modal-input"
        className="modal-input"
        placeholder={inputPlaceholder}
        defaultValue={inputDefaultValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <ModalButtonsContainer>
        <ModalButton
          buttonName="Save"
          onClick={handleSave}
        />
        <ModalButton
          buttonName="Cancel"
          onClick={onCancel}
        />
      </ModalButtonsContainer>
    </Modal>
  );
};

interface ConfirmationModalPorps extends ModalProps {
  onConfirm: () => void;
  onCancel: () => void;
}
export const ConfirmationModal: React.FC<ConfirmationModalPorps> = ({
  onConfirm,
  onCancel,
}) => {
  return (
    <Modal>
      <p>Are you sure ?</p>
      <ModalButtonsContainer>
        <ModalButton
          buttonName="Save"
          onClick={onConfirm}
        />
        <ModalButton
          buttonName="Cancel"
          onClick={onCancel}
        />
      </ModalButtonsContainer>
    </Modal>
  );
};
