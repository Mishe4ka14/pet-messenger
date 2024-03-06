/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { Avatar } from '@mui/joy';
import styles from './search-user.module.scss';
import { useDispatch } from '../../hooks/hooks';
import ava from '../../assets/pretty-elf.jpg';

const SearchUser = ():JSX.Element => {
  const dispatch = useDispatch();

  return (
    <div className={styles.container}>
      <Avatar src={ava}/>
      <div className={styles.box}>
        <h3 className={styles.name}>Napoleon Bonopart</h3>
        <p className={styles.email}>@pobeditel.ru</p>
      </div>
      {/* <button className={styles.button}>Add</button> */}
    </div>
  );
};

export default SearchUser;
