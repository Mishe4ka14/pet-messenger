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
import { registerUser } from '../../lib/features/auth/auth-api';
import { AppDispatch } from '../../services/types';

const RegistrationPage = (): JSX.Element => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const { values, handleInputChange } = useInputHandlers({
    email: '', password: '', name: '',
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (values.email.length > 0 || values.name.length > 0 || values.password.length > 0) {
      const userData = {
        email: values.email,
        name: values.name,
        password: values.password,
      };
      console.log('все гуд')
      await dispatch(registerUser(userData))
        .then((data) => 
        {
          const user = data.payload;
          localStorage.setItem('user', JSON.stringify(user))
        }
        )
        .then(() => navigate('/'));
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
            <FormHelperText>Already have an account?
              <Link className={styles.lil_text} to='/login'>
                <p>Log in</p>
              </Link>
            </FormHelperText>
        </FormControl>
        {/* <Link to='/'> */}
          <button className={styles.button} type='submit'>Continue</button>
        {/* </Link> */}
      </form>
    </>
  );
};

export default RegistrationPage;
