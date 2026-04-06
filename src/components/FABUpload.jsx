import { useWardrobeStore } from '../store/wardrobeStore'
import styles from './FABUpload.module.css'

export default function FABUpload() {
  const { toggleUploadModal } = useWardrobeStore()

  return (
    <button className={styles.fab} onClick={toggleUploadModal} title="Add New Item">
      <span className={styles.icon}>+</span>
    </button>
  )
}
