/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { Avatar } from '@mui/joy';
import { useDispatch } from '../../hooks/hooks';
import styles from './profile.module.scss';
import ava from '../../assets/pretty-elf.jpg';

const Profile = (): JSX.Element => {
  const dispatch = useDispatch;
  return (
    <div className={styles.profile}>
      <div className={styles.info}>
        <Avatar src={ava}/>
      </div>
    </div>
  );
};

export default Profile;
