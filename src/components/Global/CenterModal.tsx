import React from 'react';
import Modal from 'react-modal';

type Props = {
  isOpen: boolean;
  setOpen: (value: boolean) => void;
  children: React.ReactNode;
  top?: string;
};

const CenterModal = ({ isOpen, setOpen, children, top }: Props) => {
  const onClose = () => {
    setOpen(false);
  };

  return (
    <Modal
      isOpen={isOpen}
      style={{
        content: {
          top: top || '50%',
        },
      }}
      overlayClassName="top-0 left-0 w-screen h-screen fixed bg-slate-300 bg-black z-20 bg-opacity-25 focus:outline-none outline-none overflow-y-scroll"
      className={` fixed w-full flex items-center justify-center  left-[50%] translate-y-[-50%] translate-x-[-50%] z-50 focus:outline-none outline-none `}
      closeTimeoutMS={300}
      onRequestClose={onClose}
      ariaHideApp={false}
    >
      <div className="overflow-y-scroll  max-h-[90dvh] h-full scrollbar-hide">
        <div className="h-fit">{children}</div>
      </div>
    </Modal>
  );
};

export default CenterModal;
