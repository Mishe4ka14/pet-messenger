/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { Avatar } from '@mui/joy';
import styles from './search-user.module.scss';
import { useDispatch } from '../../hooks/hooks';
import ava from '../../assets/pretty-elf.jpg';
import getLocalStorage from '../../hooks/local-storage';
import { IFoundUser, ISearchUserResponse, IUser } from '../../services/types/types';

const SearchUser = ():JSX.Element => {
  const dispatch = useDispatch();

  const data = getLocalStorage('foundUser') as ISearchUserResponse;
  const foundUser = data.data;

  return (
    <div className={styles.container}>
      <Avatar src={foundUser?.avatar}/>
      <div className={styles.box}>
        <h3 className={styles.name}>{foundUser?.name}</h3>
        <p className={styles.email}>{foundUser?.email}</p>
      </div>
      {/* <button className={styles.button}>Add</button> */}
    </div>
  );
};

export default SearchUser;
