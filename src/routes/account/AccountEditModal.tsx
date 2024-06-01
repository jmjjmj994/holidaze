import { useRef, useEffect } from 'react';

type AccountModalProps = {
  handleCloseModal: () => void;
  modalVisible: boolean;
};

export const AccountModal: React.FC<AccountModalProps> = ({
  handleCloseModal,
  modalVisible,
}) => {
  const dialogElement = useRef(null);
  useEffect(() => {
    if (modalVisible) {
      dialogElement.current?.showModal();
    } else {
      dialogElement.current?.close();
    }
  }, [modalVisible]);
  return (
    <dialog
      ref={dialogElement}
      role="dialog"
      aria-modal="true"
      className="m-0 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  bg-orange-500"
    >
      <button onClick={handleCloseModal} autoFocus>
        Close modal
      </button>
      <form>
        {/*       <Input
          type="text"
          name="avatar.url"
          id="avatar.url"
          label="Avatar"
          required={false}
          optional={true}
        /> */}
      </form>
    </dialog>
  );
};
