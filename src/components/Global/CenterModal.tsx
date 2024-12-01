import React from "react";
import Modal from "react-modal";

type Props = {
  isOpen: boolean;
  setOpen: (value: boolean) => void;
  children: React.ReactNode;
};

const CenterModal = ({ isOpen, setOpen, children }: Props) => {
  const onClose = () => {
    setOpen(false);
  };

  return (
    <Modal
      isOpen={isOpen}
      overlayClassName="top-0 left-0 w-screen h-screen fixed bg-background bg-opacity-50 focus:outline-none outline-none"
      className="fixed top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] z-50 focus:outline-none outline-none"
      closeTimeoutMS={300}
      onRequestClose={onClose}
      ariaHideApp={false}
    >
      <div className="max-h-[95dvh] overflow-y-scroll scrollbar-hide">{children}</div>
    </Modal>
  );
};

export default CenterModal;
