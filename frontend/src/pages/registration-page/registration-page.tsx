/* eslint-disable */
/* eslint-disable no-unused-vars */
import { useNavigate, Link } from 'react-router-dom';
import Input from '@mui/joy/Input';
import FormControl from '@mui/joy/FormControl';
import { FormLabel } from '@mui/joy';
import FormHelperText from '@mui/joy/FormHelperText';
import styles from './registration-page.module.scss';
import { useDispatch } from '../../hooks/hooks';
import useInputHandlers from '../../hooks/use-input';
import icon from '../../assets/svg (1).svg';
import { registerRequest } from '../../lib/features/auth/auth-api';
import { AppDispatch } from '../../services/types';
import { Formik } from 'formik';
import { useSelector } from '../../hooks/hooks';
import { AppThunk } from '../../services/types';
import { RootState } from '../../lib/store';

const RegistrationPage = (): JSX.Element => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const registerFailed = useSelector((store: RootState) => store.user.registerFailed); 

  const { values, handleInputChange } = useInputHandlers({
    email: '', password: '', name: '',
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (values.email.length > 0 && values.name.length > 0 && values.password.length > 0) {
      const userData = {
        email: values.email,
        name: values.name,
        password: values.password,
      };
      console.log('все гуд');
      try {
        await dispatch(registerRequest(userData) as AppThunk);
        navigate('/');
      } catch (error: any) {
        alert(error.message);
      }
    }
  };


  return (
    <>
      <form className={styles.page} onSubmit={handleSubmit}>
      <img className={styles.owl} src={icon}/>
        <h2 className={styles.text}>Create your account</h2>
        
        <FormControl>
          <FormLabel>Email</FormLabel>
          <Input
            required
            type="email"
            name="email"
            onChange={handleInputChange}
            value={values.email}
            placeholder="Email"
            variant="soft"
            sx={{ width: 300, height: 50 }}
            className={styles.input}
            />
        </FormControl>
        <FormControl>
          <FormLabel>Name</FormLabel>
          <Input
            required
            type="name"
            name="name"
            onChange={handleInputChange}
            value={values.name}
            placeholder="Name"
            variant="soft"
            sx={{ width: 300, height: 50 }}
            className={styles.input}
            />
          <FormHelperText>You can always change it later</FormHelperText>
        </FormControl>
        <FormControl>
          <FormLabel>Password</FormLabel>
          <Input
              required
              type="password"
              name="password"
              onChange={handleInputChange}
              value={values.password}
              placeholder="Email"
              variant="soft"
              sx={{ width: 300, height: 50 }}
              className={styles.input}
            />
            <FormHelperText>Already have an account?
              <Link className={styles.lil_text} to='/login'>
                <p>Log in</p>
              </Link>
            </FormHelperText>
        </FormControl>
          <button className={styles.button} type='submit'>Continue</button>
      </form>
    </>
  );
};

export default RegistrationPage;
