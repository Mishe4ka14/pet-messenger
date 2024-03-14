/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { useNavigate } from 'react-router-dom';
import { Avatar } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import icon from '../../assets/svg (1).svg';
import styles from './app-header.module.scss';
import { IUser } from '../../services/types/types';
import getUserFromCookie from '../../hooks/cookie-parser';

type TUser = IUser | null;

const AppHeader = ({ onAvatarClick }: { onAvatarClick: () => void }): JSX.Element => {
  const user = getUserFromCookie<TUser>('user');
  const navigate = useNavigate();

  const onStartPanel = () => {
    navigate('/');
  };

  return (
      <header className={styles.header}>
        <div className={styles.box}>
          <img className={styles.owl} src={icon}/>
          <h1 className={styles.text} onClick={onStartPanel}>Hedwig</h1>
        </div>
        <div className={styles.box}>
          <NotificationsIcon className={styles.bell} fontSize='large'/>
          <Avatar className={styles.portret} src={user?.avatar} sx={{ width: 50, height: 50 }}
           onClick={onAvatarClick}/>
        </div>
      </header>
  );
};
export default AppHeader;
