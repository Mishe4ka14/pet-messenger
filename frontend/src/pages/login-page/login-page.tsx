/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { useNavigate, Link } from 'react-router-dom';
import Input from '@mui/joy/Input';
import FormControl from '@mui/joy/FormControl';
import { FormLabel, FormHelperText } from '@mui/joy';
import styles from './login-page.module.scss';
import useInputHandlers from '../../hooks/use-input';
import icon from '../../assets/svg (1).svg';
import { AppDispatch, AppThunk } from '../../services/types';
import { useDispatch } from '../../hooks/hooks';
import { loginUser } from '../../lib/features/auth/auth-api';

const LoginPage = (): JSX.Element => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const { values, handleInputChange } = useInputHandlers({
    email: '', password: '',
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (values.email.length > 0 || values.password.length > 0) {
      const userData = {
        email: values.email,
        password: values.password,
      };

      try {
        const data = await dispatch(loginUser(userData) as AppThunk);
        // console.log(data);
        navigate('/');
      } catch (error: any) {
        /* eslint-disable no-alert */
        alert(error.message);
      }
    }
  };

  return (
    <>
      <form className={styles.page} onSubmit={handleSubmit}>
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
              <button className={styles.button} type='submit'>Continue</button>
            <FormHelperText>Don't have an account?
              <Link className={styles.lil_text} to='/signup'>
                <p>Sign up</p>
              </Link>
            </FormHelperText>
          </FormControl>
      </form>
    </>
  );
};

export default LoginPage;
