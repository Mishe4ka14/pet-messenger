/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { Link } from 'react-router-dom';
import { Avatar } from '@mui/material';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ava from '../../assets/pretty-elf.jpg';
import icon from '../../assets/svg (1).svg';
import styles from './app-header.module.scss';
import { RootState } from '../../lib/store';

const AppHeader = ({ onAvatarClick }: { onAvatarClick: () => void }): JSX.Element => {
  const { user } = useSelector((state: RootState) => state.user);

  const avatar = user?.avatar;

  return (
      <header className={styles.header}>
        <div className={styles.box}>
          <img className={styles.owl} src={icon}/>
          <h1 className={styles.text}>Hedwig</h1>
        </div>
        <div className={styles.box}>
          <NotificationsIcon className={styles.bell} fontSize='large'/>
          <Avatar className={styles.portret} src={avatar} sx={{ width: 50, height: 50 }} onClick={onAvatarClick}/>
        </div>
      </header>
  );
};
export default AppHeader;
