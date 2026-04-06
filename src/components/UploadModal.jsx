import { useState } from 'react'
import { useWardrobeStore } from '../store/wardrobeStore'
import styles from './UploadModal.module.css'

export default function UploadModal() {
  const { toggleUploadModal, activeCategory, addItem } = useWardrobeStore()
  const [isDragging, setIsDragging] = useState(false)

  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') setIsDragging(true)
    else if (e.type === 'dragleave') setIsDragging(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
    // Stub: simulate an upload success
    simulateUpload()
  }

  const simulateUpload = () => {
    const newItem = {
      id: `u${Date.now()}`,
      name: 'New Item',
      brand: 'Custom',
      color: '#ffffff',
      image: null,
      category: activeCategory,
      emoji: '👕'
    }
    addItem(newItem)
    toggleUploadModal()
  }

  return (
    <div className={styles.overlay} onClick={toggleUploadModal}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={toggleUploadModal}>✕</button>
        
        <h2 className={styles.title}>Add to Wardrobe</h2>
        <p className={styles.subtitle}>Upload a photo of your item. We'll instantly digitize it in 3D.</p>

        <div 
          className={`${styles.dropZone} ${isDragging ? styles.dragging : ''}`}
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
          onClick={simulateUpload}
        >
          <div className={styles.uploadIcon}>📸</div>
          <p className={styles.dropText}>
            Drag & drop an image here<br/>
            <span>or click to browse</span>
          </p>
        </div>

        <div className={styles.footer}>
          <p>Adding to: <span className={styles.targetCategory}>{activeCategory}</span></p>
        </div>
      </div>
    </div>
  )
}
