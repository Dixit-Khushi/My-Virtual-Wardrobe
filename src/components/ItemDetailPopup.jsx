import { useWardrobeStore } from '../store/wardrobeStore'
import styles from './ItemDetailPopup.module.css'

export default function ItemDetailPopup({ item }) {
  const { setSelectedItem, tryOnItem } = useWardrobeStore()

  if (!item) return null

  return (
    <div className={styles.overlay} onClick={() => setSelectedItem(null)}>
      <div className={styles.popup} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={() => setSelectedItem(null)}>✕</button>
        
        <div className={styles.imageArea} style={{ background: item.color }}>
          {item.image ? (
            <img src={item.image} alt={item.name} />
          ) : (
            <span className={styles.emoji}>{item.emoji}</span>
          )}
        </div>
        
        <div className={styles.details}>
          <div className={styles.brand}>{item.brand}</div>
          <h3 className={styles.name}>{item.name}</h3>
          
          <div className={styles.tags}>
            <span className={styles.tag}>{item.category}</span>
            <span className={styles.tag}>Summer 2026</span>
          </div>

          <button 
            className="btn btn-primary" 
            style={{ width: '100%', marginTop: '16px' }}
            onClick={() => {
              tryOnItem(item)
              setSelectedItem(null)
            }}
          >
            Try On Now
          </button>
        </div>
      </div>
    </div>
  )
}
