/* eslint-disable no-console */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import {
  Avatar, FormControl, FormLabel, Input,
} from '@mui/joy';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from '../../hooks/hooks';
import styles from './profile.module.scss';
import { AppDispatch } from '../../services/types';
import useInputHandlers from '../../hooks/use-input';
import getLocalStorage from '../../hooks/local-storage';
import { TUser } from '../../services/types/types';
import { updateUser } from '../../lib/features/auth/auth-api';

const Profile = (): JSX.Element => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const { values, handleInputChange } = useInputHandlers({
    password: '', name: '', avatar: '',
  });

  // получаем данные юзера из хранилища
  const user: TUser = getLocalStorage('user');

  const logOut = () => {
    localStorage.removeItem('user');
    navigate('/signup');
  };

  const handleChangeInfo = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (values.password || values.name || values.avatar) {
      const userData = {
        avatar: values.avatar,
        name: values.name,
        password: values.password,
      };

      try {
        const { payload: newUser } = await dispatch(updateUser(userData));

        localStorage.setItem('user', JSON.stringify(newUser));
      } catch (error) {
        console.error('Failed to update user info:', error);
      }
    }
  };

  return (
    <div className={styles.profile}>
      <div className={styles.info}>
        <Avatar sx={{ width: 100, height: 100 }} src={user?.avatar}/>
        <div className={styles.name}>
          <h3 className={styles.title}>{user?.name}</h3>
          <p className={styles.subtitle}>Koroleva semi korolevstv</p>
        </div>
      </div>
      <form className={styles.edit} onSubmit={handleChangeInfo}>
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
        <button className={styles.button} type='button' onClick={logOut}>Log out</button>
      </form>
    </div>
  );
};

export default Profile;
