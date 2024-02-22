/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { Link } from 'react-router-dom';
import { Avatar } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ava from '../../assets/pretty-elf.jpg';
import icon from '../../assets/svg (1).svg';
import styles from './app-header.module.scss';

const AppHeader = (): JSX.Element => (
    <header className={styles.header}>
      <div className={styles.box}>
        <img className={styles.owl} src={icon}/>
        <p className={styles.text}>Hedwig</p>
      </div>
      <div className={styles.box}>
        <NotificationsIcon className={styles.bell} fontSize='large'/>
        <Avatar className={styles.portret} src={ava} sx={{ width: 50, height: 50 }}/>
      </div>
    </header>
);
export default AppHeader;
