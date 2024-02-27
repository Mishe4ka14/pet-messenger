/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import styles from './start-panel.module.scss';
import startPick from '../../assets/start-pick1.jpg';

const StartPanel = (): JSX.Element => (
  <div className={styles.panel}>
    <img className={styles.pick} src={startPick}/>
    <div className={styles.container}>
      <h2 className={styles.text}>Start a new chat or select from the list to send Hedwik</h2>
      <div className={styles.search_input_container}>
        <input
          type="text"
          placeholder="Search or start a new chat"
          className={styles.search_input}
        />
        <button className={styles.search_button}>New Chat</button>
      </div>
    </div>
  </div>
);

export default StartPanel;
