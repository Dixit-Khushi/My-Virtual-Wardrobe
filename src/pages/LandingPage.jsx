import { useState } from 'react'
import { useWardrobeStore } from '../store/wardrobeStore'
import styles from './LandingPage.module.css'

export default function LandingPage() {
  const { enterCloset, setGuest } = useWardrobeStore()
  const [isEntering, setIsEntering] = useState(false)

  const handleGoogleSignIn = async () => {
    // Firebase Google sign-in (stub — replace with real Firebase config)
    setIsEntering(true)
    setTimeout(() => enterCloset(), 600)
  }

  const handleGuest = () => {
    setIsEntering(true)
    setGuest()
    setTimeout(() => enterCloset(), 600)
  }

  return (
    <div className={`${styles.landing} ${isEntering ? styles.exiting : ''}`}>
      {/* Animated background */}
      <div className={styles.bg}>
        <div className={styles.orb1} />
        <div className={styles.orb2} />
        <div className={styles.orb3} />
        <div className={styles.orb4} />
        <div className={styles.grid} />
      </div>

      {/* Floating clothing emojis */}
      <div className={styles.floaters}>
        {['👗','👠','👜','🧥','👟','🕶️','💍','🧣'].map((emoji, i) => (
          <span key={i} className={styles.floater} style={{ '--i': i }}>{emoji}</span>
        ))}
      </div>

      {/* Center card */}
      <div className={styles.card}>
        {/* Logo */}
        <div className={styles.logoRow}>
          <div className={styles.logoIcon}>✦</div>
          <div>
            <h1 className={styles.title}>My Virtual Wardrobe</h1>
            <p className={styles.subtitle}>Your gravity-defying 3D closet</p>
          </div>
        </div>

        <div className={styles.divider} />

        {/* Tag line */}
        <p className={styles.desc}>
          Step into your dream closet. Browse, mix & match, and discover your perfect look — all in stunning 3D.
        </p>

        {/* Feature pills */}
        <div className={styles.pills}>
          <span className={styles.pill}>✨ 3D Try-On</span>
          <span className={styles.pill}>🎨 Style Builder</span>
          <span className={styles.pill}>📸 Share Looks</span>
        </div>

        {/* CTAs */}
        <div className={styles.actions}>
          <button className={`btn btn-primary ${styles.btnGoogle}`} onClick={handleGoogleSignIn} id="btn-google-signin">
            <GoogleIcon />
            Continue with Google
          </button>

          <button className={`btn btn-glass ${styles.btnGuest}`} onClick={handleGuest} id="btn-guest-mode">
            Enter as Guest
            <span className={styles.guestArrow}>→</span>
          </button>
        </div>

        <p className={styles.terms}>
          By continuing you agree to our <span>Terms</span> & <span>Privacy Policy</span>
        </p>
      </div>

      {/* Bottom tagline */}
      <div className={styles.bottomTag}>
        <span>✦ Trusted by style-obsessed humans worldwide ✦</span>
      </div>
    </div>
  )
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M17.64 9.205c0-.639-.057-1.252-.164-1.841H9v3.481h4.844a4.14 4.14 0 01-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"/>
      <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z" fill="#34A853"/>
      <path d="M3.964 10.71A5.41 5.41 0 013.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 000 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/>
      <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 00.957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
    </svg>
  )
}
