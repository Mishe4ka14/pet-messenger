/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { Avatar } from '@mui/joy';
import { useNavigate } from 'react-router-dom';
import styles from './search-user.module.scss';
import { useDispatch } from '../../hooks/hooks';
import ava from '../../assets/pretty-elf.jpg';
import getLocalStorage from '../../hooks/local-storage';
import { IFoundUser, ISearchUserResponse, IUser } from '../../services/types/types';
import createChat from '../../lib/features/chat/chat-api';

const SearchUser = ():JSX.Element => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const data = getLocalStorage('foundUser') as ISearchUserResponse;
  const foundUser = data.data;

  const handleCreateChat = async (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();

    const firstUser: IUser | null = getLocalStorage('user');
    // const secondUser: IUser | null = getLocalStorage('foundUser');

    const usersID = {
      firstID: firstUser?._id,
      secondID: foundUser?._id,
    };
    try {
      await dispatch(createChat(usersID));
      // console.log(chat);

      navigate('/chat/:id');
    } catch (error) {
      console.error(error);
      alert('Произошла ошибка при создании чата');
    }
  };

  return (
    <div className={styles.container} onClick={handleCreateChat}>
      <Avatar src={foundUser?.avatar}/>
      <div className={styles.box}>
        <h3 className={styles.name}>{foundUser?.name}</h3>
        <p className={styles.email}>{foundUser?.email}</p>
      </div>
      {/* <button className={styles.button}>Add</button> */}
    </div>
  );
};

export default SearchUser;
