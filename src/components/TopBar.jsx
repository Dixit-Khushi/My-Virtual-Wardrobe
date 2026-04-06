import { useWardrobeStore } from '../store/wardrobeStore'
import styles from './TopBar.module.css'

export default function TopBar() {
  const { isGuest, signOut } = useWardrobeStore()

  return (
    <header className={styles.topBar}>
      <div className={styles.logo}>
        <span className={styles.logoIcon}>✦</span>
        <span className={styles.logoText}>Virtual Wardrobe</span>
      </div>
      
      <div className={styles.actions}>
        <div className={styles.profile}>
          {isGuest ? (
            <span className={styles.guestBadge}>Guest Mode</span>
          ) : (
            <div className={styles.avatar} />
          )}
        </div>
        <button className={styles.exitBtn} onClick={signOut}>
          Exit
        </button>
      </div>
    </header>
  )
}
