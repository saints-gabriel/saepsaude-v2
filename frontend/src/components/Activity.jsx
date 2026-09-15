import styles from '../styles/Globals.module.css'
import fotoUser from '../assets/userdefault.jpg'
import like from '../assets/coracao.svg'
import comentario from '../assets/comentario.svg'

export const Activity = ({name, user, distance, duration, calories, likes, comments}) => {
    return (
        <div className={styles.activityDiv}>
            <aside className={styles.userPhoto}>
                <img src={fotoUser}/>
            </aside>
            <main className={styles.infoGrid}>
                <div>
                    <h3>{name}</h3>
                    <h4>{user}</h4>
                </div>
                <div className={styles.actInfo}>
                    Distância: {distance} <br />
                    Duração: {duration} <br />
                    Calorias: {calories} 
                </div>
                <div className={styles.postInfo}>
                    <div className={styles.items}>
                        <img src={like} alt="" width='50px' height='50px'/>
                        {likes}
                    </div>
                    <div className={styles.items}>
                        <img src={comentario} alt="" width='50px' height='50px'/>
                        {comments}
                    </div>
                </div>
            </main>
        </div>
    )
}