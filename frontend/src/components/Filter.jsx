import styles from '../styles/Globals.module.css'

export const Filter = () => {
    return (
        <div className={styles.filterHeader}>
            <button>Corrida</button>
            <button>Caminhada</button>
            <button>Trilha</button>
        </div>
    )
}