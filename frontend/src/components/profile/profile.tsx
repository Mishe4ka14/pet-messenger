/* eslint-disable no-console */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import {
  Avatar, FormControl, FormLabel, Input,
} from '@mui/joy';
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useDispatch } from '../../hooks/hooks';
import styles from './profile.module.scss';
import { AppDispatch, AppThunkk } from '../../services/types';
import useInputHandlers from '../../hooks/use-input';
import { TUser } from '../../services/types/types';
import { updateUserInfo } from '../../lib/features/auth/auth-api';
import getUserFromCookie from '../../hooks/cookie-parser';

const Profile = (): JSX.Element => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  // const userCookie = Cookies.get('user');
  // const user = userCookie ? JSON.parse(userCookie) : null;
  // получаем актуальное состояние
  const [user, setUser] = useState<TUser | null | void>(null);

  const { values, handleInputChange } = useInputHandlers({
    password: '', name: '', avatar: '',
  });

  useEffect(() => {
    const userCookie = getUserFromCookie<TUser>('user');
    if (userCookie) {
      setUser(userCookie);
    }
  }, []);

  const logOut = () => {
    Cookies.remove('user');
    navigate('/login');
  };

  const handleChangeInfo = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (values.password || values.name || values.avatar) {
      const userData = {
        avatar: values.avatar,
        name: values.name,
        password: values.password,
        _id: user?._id,
      };

      try {
        const updatedUser = await dispatch(updateUserInfo(userData) as AppThunkk);
        setUser(updatedUser); // Обновляем состояние пользователя
      } catch (error: any) {
        /* eslint-disable no-alert */
        alert(error.message);
      }
    }
  };

  return (
    <div className={styles.profile}>
      <div className={styles.info}>
        <Avatar className={styles.avatar} sx={{ width: 100, height: 100 }} src={user?.avatar}/>
        <div className={styles.name}>
          <h3 className={styles.title}>{user?.name}</h3>
          <p className={styles.subtitle}>{user?.about}</p>
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
