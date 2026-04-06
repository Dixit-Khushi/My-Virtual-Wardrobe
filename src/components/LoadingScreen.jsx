import { useEffect, useRef } from 'react'
import styles from './LoadingScreen.module.css'

export default function LoadingScreen() {
  const progressRef = useRef(null)

  useEffect(() => {
    if (progressRef.current) {
      progressRef.current.style.width = '0%'
      requestAnimationFrame(() => {
        progressRef.current.style.transition = 'width 2s cubic-bezier(0.4,0,0.2,1)'
        progressRef.current.style.width = '100%'
      })
    }
  }, [])

  return (
    <div className={styles.overlay}>
      {/* Animated background orbs */}
      <div className={styles.orb1} />
      <div className={styles.orb2} />
      <div className={styles.orb3} />

      <div className={styles.content}>
        {/* Logo */}
        <div className={styles.logoWrap}>
          <span className={styles.logoIcon}>✦</span>
          <h1 className={styles.logoText}>My Virtual Wardrobe</h1>
        </div>

        {/* Tagline */}
        <p className={styles.tagline}>Your gravity-defying 3D closet</p>

        {/* Spinning hanger icon */}
        <div className={styles.spinnerWrap}>
          <span className={styles.spinner}>🪝</span>
        </div>

        {/* Progress bar */}
        <div className={styles.progressTrack}>
          <div className={styles.progressBar} ref={progressRef} />
        </div>
        <p className={styles.loadingText}>Loading your wardrobe…</p>
      </div>
    </div>
  )
}
