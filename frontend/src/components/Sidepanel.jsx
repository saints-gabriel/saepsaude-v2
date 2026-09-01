import styles from '../styles/Globals.module.css';
import progressoIcon from '../assets/progresso.svg';

export const Sidepanel = ({ name, count, calories, avatarUrl }) => {
  const insertActivity = () => {};
  return (
    <aside className={styles.sidepanel}>
      {/* icone e foto */}
      <div className={styles.profileSection}>
        <div className={styles.avatarContainer}>
          {avatarUrl ? <img src={avatarUrl} alt="User avatar" /> : <span aria-hidden="true">?</span>}
        </div>
        <h2 className={styles.username}>{name}</h2>
        {/* stats do usuario */}
        <div className={styles.statsContainer}>
          <div className={styles.statItem}>
            <span className={styles.statNumber}>{count}</span>
            <span className={styles.statLabel}>Qtd. Atividades</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statNumber}>{calories}</span>
            <span className={styles.statLabel}>Qtd. Calorias</span>
          </div>
        </div>
      </div>

      <hr className={styles.divider} />

      {/* botão atividade */}
      <div className={styles.navSection}>
        <button className={styles.activitiesButton} onClick={insertActivity}>
          <img src={progressoIcon} alt="Atividade icon" />
          <span>Atividade</span>
        </button>
      </div>

      <footer className={styles.footer}>
        <p className={styles.copyright}>Copyright - 2025/2026</p>
      </footer>
    </aside>
  );
};