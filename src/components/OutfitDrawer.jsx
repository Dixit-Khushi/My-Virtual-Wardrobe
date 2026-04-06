import { useWardrobeStore } from '../store/wardrobeStore'
import styles from './OutfitDrawer.module.css'

export default function OutfitDrawer({ isOpen }) {
  const { 
    items, 
    activeCategory, 
    tryOnItem, 
    setSelectedItem,
    toggleDrawer
  } = useWardrobeStore()

  const activeItems = items[activeCategory] || []

  return (
    <div className={`${styles.drawer} ${isOpen ? styles.open : ''}`}>
      <div className={styles.header}>
        <h2 className={styles.title}>Your {activeCategory}</h2>
        <button className={styles.closeBtn} onClick={toggleDrawer}>✕</button>
      </div>

      <div className={styles.grid}>
        {activeItems.map((item) => (
          <div key={item.id} className={styles.card}>
            <div 
              className={styles.imageArea}
              onClick={() => setSelectedItem(item)}
            >
              {/* Fallback emoji if no image */}
              {item.image ? (
                <img src={item.image} alt={item.name} className={styles.image} />
              ) : (
                <span className={styles.emoji}>{item.emoji}</span>
              )}
            </div>
            
            <div className={styles.info}>
              <span className={styles.brand}>{item.brand}</span>
              <span className={styles.name}>{item.name}</span>
            </div>

            <button 
              className={styles.tryOnBtn}
              onClick={() => tryOnItem(item)}
            >
              Try On
            </button>
          </div>
        ))}

        {activeItems.length === 0 && (
          <div className={styles.empty}>
            <p>No items in this category yet.</p>
          </div>
        )}
      </div>
    </div>
  )
}
