import { useWardrobeStore } from '../store/wardrobeStore'
import styles from './CategoryTabs.module.css'

const CATEGORIES = [
  { id: 'tops', label: 'Tops', icon: '👚' },
  { id: 'bottoms', label: 'Bottoms', icon: '👖' },
  { id: 'shoes', label: 'Shoes', icon: '👟' },
  { id: 'accessories', label: 'Accs', icon: '👜' },
]

export default function CategoryTabs() {
  const { activeCategory, setActiveCategory, toggleDrawer } = useWardrobeStore()

  const handleSelect = (id) => {
    setActiveCategory(id)
    toggleDrawer() // Open drawer to show items
  }

  return (
    <div className={styles.tabsContainer}>
      <div className={styles.tabs}>
        {CATEGORIES.map(cat => (
          <button
            key={cat.id}
            className={`${styles.tab} ${activeCategory === cat.id ? styles.active : ''}`}
            onClick={() => handleSelect(cat.id)}
          >
            <span className={styles.icon}>{cat.icon}</span>
            <span className={styles.label}>{cat.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
