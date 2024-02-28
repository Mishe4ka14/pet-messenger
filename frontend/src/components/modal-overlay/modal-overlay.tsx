import PropTypes from 'prop-types';
import styles from './modal-overlay.module.scss';

const ModalOverlay = ({ closeModal }:{closeModal():void}) => (
  <div className={styles.overlay} onClick={closeModal}>
    </div>
);

ModalOverlay.propTypes = {
  closeModal: PropTypes.func.isRequired,
};
export default ModalOverlay;
