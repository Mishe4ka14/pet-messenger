/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { useNavigate } from 'react-router-dom';
import Input from '@mui/joy/Input';
import FormControl from '@mui/joy/FormControl';
import { useState } from 'react';
import { FormLabel, FormHelperText } from '@mui/joy';
import AppHeader from '../../components/app-header/app-header';
import styles from '../login-page/login-page.module.scss';
import useInputHandlers from '../../hooks/use-input';

const ResetPasswordPage = (): JSX.Element => {
  const { values, handleInputChange } = useInputHandlers({
    email: '',
  });

  return (
    <>
      <AppHeader/>
      <div className={styles.page}>
      <h2>Reset your password</h2>
      <p>Enter the email address you used to sign up for Hedwik</p>
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
          <button className={styles.button} type='submit' disabled >Reset password</button>
      </div>
    </>
  );
};

export default ResetPasswordPage;
