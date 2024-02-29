/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import {
  Avatar, FormControl, FormLabel, Input,
} from '@mui/joy';
import { useDispatch } from '../../hooks/hooks';
import styles from './profile.module.scss';
import ava from '../../assets/pretty-elf.jpg';
import useInputHandlers from '../../hooks/use-input';

const Profile = (): JSX.Element => {
  const { values, handleInputChange } = useInputHandlers({
    password: '', name: '', avatar: '',
  });

  const dispatch = useDispatch;

  return (
    <div className={styles.profile}>
      <div className={styles.info}>
        <Avatar sx={{ width: 100, height: 100 }} src={ava}/>
        <div className={styles.name}>
          <h3 className={styles.title}>Alena Prekrasnaya</h3>
          <p className={styles.subtitle}>Koroleva semi korolevstv</p>
        </div>
      </div>
      <form className={styles.edit}>
        <p className={styles.text}>Edit Profile</p>
        <FormControl>
          <FormLabel>Name</FormLabel>
          <Input
            placeholder="Change name"
            variant="soft"
            value={values.email}
            sx={{ width: 450, height: 50 }}
            className={styles.input}
            onChange={handleInputChange}
            name='name'
            />
        </FormControl>
        <FormControl>
          <FormLabel>Password</FormLabel>
          <Input
            placeholder="Change password"
            variant="soft"
            value={values.email}
            sx={{ width: 450, height: 50 }}
            className={styles.input}
            onChange={handleInputChange}
            name='password'
            />
        </FormControl>
        <FormControl>
          <FormLabel>Avatar</FormLabel>
          <Input
            placeholder="Change avatar"
            variant="soft"
            value={values.email}
            sx={{ width: 450, height: 50 }}
            className={styles.input}
            onChange={handleInputChange}
            name='avatar'
            />
        </FormControl>
        <button className={styles.button} type='submit'>Save changes</button>
      </form>
    </div>
  );
};

export default Profile;
