/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { useNavigate } from 'react-router-dom';
import Input from '@mui/joy/Input';
import FormControl from '@mui/joy/FormControl';
import { useState } from 'react';
import { FormLabel } from '@mui/joy';
import FormHelperText from '@mui/joy/FormHelperText';
import AppHeader from '../../components/app-header/app-header';
import styles from './registration-page.module.scss';
import useInputHandlers from '../../hooks/use-input';

const RegistrationPage = (): JSX.Element => {
  const { values, handleInputChange } = useInputHandlers({
    email: '', password: '', name: '',
  });

  return (
    <>
      <AppHeader/>
      <div className={styles.page}>
        <h2>Create your account</h2>
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
          <FormLabel>Name</FormLabel>
          <Input
            placeholder="Name"
            variant="soft"
            value={values.name}
            sx={{ width: 600, height: 60 }}
            className={styles.input}
            onChange={handleInputChange}
            name='name'
            />
          <FormHelperText>You can always change it later</FormHelperText>
        </FormControl>
        <FormControl>
          <FormLabel>Password</FormLabel>
          <Input
            placeholder="Password"
            // type='password'
            variant="soft"
            value={values.password}
            sx={{ width: 600, height: 60 }}
            className={styles.input}
            onChange={handleInputChange}
            name='password'
            />
        </FormControl>
        <button className={styles.button} type='submit' disabled >Next</button>
      </div>
    </>
  );
};

export default RegistrationPage;
