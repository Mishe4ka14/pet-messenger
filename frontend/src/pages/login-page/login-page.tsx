/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { useNavigate, Link } from 'react-router-dom';
import Input from '@mui/joy/Input';
import FormControl from '@mui/joy/FormControl';
import { useState } from 'react';
import { FormLabel, FormHelperText } from '@mui/joy';
import AppHeader from '../../components/app-header/app-header';
import styles from './login-page.module.scss';
import useInputHandlers from '../../hooks/use-input';
import icon from '../../assets/svg (1).svg';

const LoginPage = (): JSX.Element => {
  const { values, handleInputChange } = useInputHandlers({
    email: '', password: '',
  });

  return (
    <>
      {/* <AppHeader/> */}
      <div className={styles.page}>
      <img className={styles.owl} src={icon}/>
      <h2 className={styles.text}>Welcome back</h2>
        <FormControl>
            <FormLabel>Email</FormLabel>
            <Input
              placeholder="Email"
              // type='email'
              variant="soft"
              value={values.email}
              sx={{ width: 300, height: 50 }}
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
              sx={{ width: 300, height: 50 }}
              className={styles.input}
              onChange={handleInputChange}
              name='password'
              />
              <Link className={styles.lil_text} to='/reset-password'>
                <FormHelperText className={styles.lil_text}>Forgot your password?</FormHelperText>
              </Link>
          </FormControl>
          <FormControl>
            <Link to='/'>
              <button className={styles.button} type='submit'>Continue</button>
            </Link>
            <FormHelperText>Don't have an account?
              <Link className={styles.lil_text} to='/register'>
                <p>Sign up</p>
              </Link>
            </FormHelperText>
          </FormControl>
      </div>
    </>
  );
};

export default LoginPage;
