import { useRef, useEffect } from 'react';
import { useKeyEscape } from 'src/hooks/use-key-escape.hook';
import { AccountForm } from './AccountForm';
import { XCircle } from 'phosphor-react';

type AccountModalProps = {
  handleCloseModal: () => void;
  modalVisible: boolean;
};

export const AccountModal: React.FC<AccountModalProps> = ({
  handleCloseModal,
  modalVisible,
}) => {
  const dialogElement = useRef<HTMLDialogElement>(null);
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
      className="m-0 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  max-w-[20rem] sm:max-w-[30rem] w-full shadow-raised rounded-md px-4 py-4 "
    >
      <div className="flex w-full justify-end">
        <button className="self-end" onClick={handleCloseModal} autoFocus>
          <XCircle size={30} />
        </button>
      </div>
      <AccountForm />
    </dialog>
  );
};
