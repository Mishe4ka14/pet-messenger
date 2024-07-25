/* eslint-disable no-undef */
/*  eslint-disable */
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Input from '@mui/joy/Input';
import Textarea from '@mui/joy/Textarea';
import FormControl from '@mui/joy/FormControl';
import { FormLabel, FormHelperText } from '@mui/joy';
import styles from './registration-page.module.scss';
import icon from '../../assets/svg (1).svg';
import { useDispatch } from '../../hooks/hooks';
import { registerRequest } from '../../lib/features/auth/auth-api';
import { AppDispatch, AppThunk } from '../../services/types';
import getRandomAvatar from '../../hooks/get-random-avatar';

const RegistrationPage = (): JSX.Element => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    email: '',
    password: '',
    name: '',
    about: '',
    avatar: '',
  });

  // шаги для отображения полей регистрации, 1 - для основной инфы, 2 - для дополнительной
  const [step, setStep] = useState(1);
  const [errorMessage, setErrorMessage] = useState('');
  const [stepOneDisabled, setStepOneDisabled] = useState(true);

  useEffect(() => {
    setErrorMessage('');
    const usernameValid = userData.name.length >= 3 && userData.name.length <= 20;
    const passwordValid = userData.password.length >= 3;
    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userData.email);
    // const descriptionValid = userData.about.length < 200;
    // const avatarValid = userData.avatar ? /^(ftp|http|https):\/\/[^ "]+$/.test(userData.avatar) : true;

    setStepOneDisabled(!usernameValid || !passwordValid || !emailValid);
  }, [step, userData]);

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name } = e.target;
    const { value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleBackToFirstStep = () => setStep(1);

  const handleSubmit = async (e:any) => {
    e.preventDefault();
  
    if (step === 1) {
      setStep(2);
    } else {
      // Удаление пробелов и проверка, подставление дефолтных значений
      const about = userData.about.trim();
      const avatar = userData.avatar.trim();
  
      const userInfo = {
        ...userData,
        about: about || 'Hides some secrets',
        avatar: avatar || getRandomAvatar(),
      };
  
      try {
        await dispatch(registerRequest(userInfo) as AppThunk);
        navigate('/');
      } catch (error: any) {
        setErrorMessage(error.message);
      }
    }
  };
  
  return (
    <>
      <div className={`${styles.page}`}>
        <img className={styles.owl} src={icon} alt="Icon" />
        <h2 className={styles.text}>{`Регистрация ${step === 1 ? '1/2' : '2/2'}`}</h2>
        <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
          {step === 1 ? (
            <>
              <FormControl>
                <FormLabel>Email</FormLabel>
                <Input
                  required
                  type="email"
                  name="email"
                  onChange={onChangeInput}
                  value={userData.email}
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
                  type="text"
                  name="name"
                  onChange={onChangeInput}
                  value={userData.name}
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
                  onChange={onChangeInput}
                  value={userData.password}
                  placeholder="Password"
                  variant="soft"
                  sx={{ width: 300, height: 50 }}
                  className={styles.input}
                />
              </FormControl>
            </>
          ) : (
            <>
              <FormControl>
                <FormLabel>About</FormLabel>
                <Textarea
                  name="about"
                  onChange={onChangeInput}
                  value={userData.about}
                  placeholder="Tell about yourself"
                  variant="soft"
                  sx={{ width: 300, height: 50 }}
                  className={styles.input}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Avatar</FormLabel>
                <Input
                  name="avatar"
                  onChange={onChangeInput}
                  value={userData.avatar}
                  placeholder="Insert here link to avatar"
                  variant="soft"
                  sx={{ width: 300, height: 50 }}
                  className={styles.input}
                />
                <FormHelperText>You can always change it later in profile</FormHelperText>
              </FormControl>
            </>
          )}
          <button
            type="button"
            className={stepOneDisabled ? styles.button_disabled : styles.button}
            disabled={step === 1 ? stepOneDisabled : false}
            onClick={handleSubmit}
            >
            {step === 1 ? 'Далее' : 'Зарегистрироваться'}
          </button>
          {step === 2 && (
            <>
              {/* <span className={styles.error}>{errorMessage}</span> */}
              <button
                type="button"
                className={styles.back_to_first_step}
                onClick={handleBackToFirstStep}
              >
                Вернуться на первый шаг
              </button>
            </>
          )}
          <FormHelperText>Already have an account?
            <Link to='/login' className={styles.lil_text}>
              <p>Log in</p>
            </Link>
          </FormHelperText>
        </form>
      </div>
    </>
  );
};

export default RegistrationPage;
