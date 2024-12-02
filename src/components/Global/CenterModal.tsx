import useScrollController from "@/hooks/useScrollController";
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

  useScrollController(!isOpen);

  return (
    <Modal
      isOpen={isOpen}
      overlayClassName="top-0 left-0 w-screen h-screen fixed bg-background bg-opacity-50 focus:outline-none outline-none z-[9999]"
      className="fixed top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%]  focus:outline-none outline-none z-[999999]"
      closeTimeoutMS={300}
      onRequestClose={onClose}
      ariaHideApp={false}
    >
      <div className="max-h-[70dvh] overflow-y-scroll scrollbar-hide">{children}</div>
    </Modal>
  );
};

export default CenterModal;
