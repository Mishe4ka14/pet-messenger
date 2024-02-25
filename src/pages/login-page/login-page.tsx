/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { useNavigate } from 'react-router-dom';
import Input from '@mui/joy/Input';
import FormControl from '@mui/joy/FormControl';
import { useState } from 'react';
import { FormLabel, FormHelperText } from '@mui/joy';
import AppHeader from '../../components/app-header/app-header';
import styles from './login-page.module.scss';
import useInputHandlers from '../../hooks/use-input';

const LoginPage = (): JSX.Element => {
  const { values, handleInputChange } = useInputHandlers({
    email: '', password: '',
  });

  return (
    <>
      <AppHeader/>
      <div className={styles.page}>
      <h2>Welcome back</h2>
        <FormControl>
            <FormLabel>Email</FormLabel>
            <Input
              placeholder="Email"
              // type='email'
              variant="soft"
              value={values.email}
              sx={{ width: 600, height: 60 }}
              className={styles.input}
              onChange={handleInputChange}
              name='email'
              />
          </FormControl>
          <FormControl>
            <FormLabel>Password</FormLabel>
            <Input
              placeholder="Enter password"
              // type='email'
              variant="soft"
              value={values.password}
              sx={{ width: 600, height: 60 }}
              className={styles.input}
              onChange={handleInputChange}
              name='password'
              />
            <FormHelperText>Forgot your password?</FormHelperText>
          </FormControl>
          <button className={styles.button} type='submit' disabled >Next</button>
      </div>
    </>
  );
};

export default LoginPage;
