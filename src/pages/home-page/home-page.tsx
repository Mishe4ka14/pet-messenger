/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import AppHeader from '../../components/app-header/app-header';
import ChatList from '../../components/chat-list/chat-list';
import StartPanel from '../../components/start-panel/start-panel';
import styles from './home-page.module.scss';

const HomePage = ():JSX.Element => (

    <div className={styles.app}>
      <AppHeader/>
      <main className={styles.main}>
          <ChatList/>
          <StartPanel/>
      </main>
    </div>
);

export default HomePage;
