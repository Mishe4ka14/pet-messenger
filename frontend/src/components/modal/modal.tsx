/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Close } from '@mui/icons-material';
import { useDispatch } from '../../hooks/hooks';
import { IModal } from '../../services/types/types';
import ModalOverlay from '../modal-overlay/modal-overlay';
import styles from './modal.module.scss';

const modalRoot = document.getElementById('modal-root');

const Modal = ({ children, onClose }: IModal): JSX.Element => {
  // const dispatch = useDispatch();
  const [isPopupOpen, setPopupOpen] = useState(false);

  const handlerClose = () => {
    setPopupOpen(false);
    if (typeof onClose === 'function') {
      onClose();
    }
  };

  const escClose = (e: Event & { key: string }) => {
    if (e.key === 'Escape') {
      handlerClose();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', escClose);
    return () => {
      document.removeEventListener('keydown', escClose);
    };
  });

  return ReactDOM.createPortal(
    (
     <>
      <ModalOverlay closeModal={(() => handlerClose())}/>
      <div className={styles.container}>
        <div className={styles.close}>
          <Close sx={{ width: 25, height: 25 }} type='primary' onClick={(() => handlerClose())}/>
        </div>
        {children}
      </div>
    </>
    ), modalRoot as HTMLElement,
  );
};

export default Modal;
