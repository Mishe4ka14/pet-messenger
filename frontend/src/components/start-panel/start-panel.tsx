/* eslint-disable */
/* eslint-disable no-unused-vars */
import { Outlet, useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import styles from './start-panel.module.scss';
import startPick from '../../assets/start-pick1.jpg';
import useInputHandlers from '../../hooks/use-input';
import { findUser } from '../../lib/features/auth/auth-api';
import { useDispatch } from '../../hooks/hooks';
import { AppThunk } from '../../services/types';
import getLocalStorage from '../../hooks/local-storage';
import { ISearchUserResponse } from '../../services/types/types';
import SearchUser from '../search-user/seach-user';

const StartPanel = (): JSX.Element => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showSearchUser, setShowSearchUser] = useState(false); 

  const { values, handleInputChange } = useInputHandlers({
    search: '',
  });

  const handleUserSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (values.search.length > 0) {
      // очищаем место для нового поиска
      localStorage.removeItem('foundUser');
      setShowSearchUser(false)

      const userData: { email?: string; name?: string } = {};

      if (values.search.includes('@')) {
        userData.email = values.search;
      } else {
        userData.name = values.search;
      }

      try {
        await dispatch(findUser(userData) as AppThunk);
        const data: ISearchUserResponse | null = getLocalStorage('foundUser');
        if (data) {
          setShowSearchUser(true);
        }
      }
      catch (error: any) {
        alert(error.message);
      }
    }
  };

  return (
    <div>
      <div className={styles.panel}>
        <img className={styles.pick} src={startPick}/>
        <div className={styles.container}>
          <h2 className={styles.text}>Start a new chat or select from the list to send Hedwik</h2>
        </div>
      </div>
      <form className={styles.search_input_container} onSubmit={handleUserSearch}>
        <input
          type="search"
          name="search"
          placeholder="Search or start a new chat"
          className={styles.search_input}
          onChange={handleInputChange}
        />
          <button className={styles.search_button} type='submit'>New Chat</button>
      </form>
      {showSearchUser && <SearchUser/>}
    </div>
  );
};

export default StartPanel;
