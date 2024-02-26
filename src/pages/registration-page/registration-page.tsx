/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { useNavigate, Link } from 'react-router-dom';
import Input from '@mui/joy/Input';
import FormControl from '@mui/joy/FormControl';
import { useState } from 'react';
import { FormLabel } from '@mui/joy';
import FormHelperText from '@mui/joy/FormHelperText';
import AppHeader from '../../components/app-header/app-header';
import styles from './registration-page.module.scss';
import useInputHandlers from '../../hooks/use-input';
import icon from '../../assets/svg (1).svg';

const RegistrationPage = (): JSX.Element => {
  const { values, handleInputChange } = useInputHandlers({
    email: '', password: '', name: '',
  });

  return (
    <>
      {/* <AppHeader/> */}
      <div className={styles.page}>
      <img className={styles.owl} src={icon}/>
        <h2 className={styles.text}>Create your account</h2>
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
          <FormLabel>Name</FormLabel>
          <Input
            placeholder="Name"
            variant="soft"
            value={values.name}
            sx={{ width: 300, height: 50 }}
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
            sx={{ width: 300, height: 50 }}
            className={styles.input}
            onChange={handleInputChange}
            name='password'
            />
        </FormControl>
        <Link to='/'>
          <button className={styles.button} type='submit'>Continue</button>
        </Link>
      </div>
    </>
  );
};

export default RegistrationPage;
