import { Suspense, useEffect, useRef } from 'react'
import { Canvas, useThree } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { useWardrobeStore } from '../store/wardrobeStore'
import gsap from 'gsap'

import ClosetRoom from '../scenes/ClosetRoom'
import AvatarModel from '../scenes/AvatarModel'
import ClothingRack from '../scenes/ClothingRack'

import TopBar from '../components/TopBar'
import CategoryTabs from '../components/CategoryTabs'
import FABUpload from '../components/FABUpload'
import OutfitDrawer from '../components/OutfitDrawer'
import ItemDetailPopup from '../components/ItemDetailPopup'
import UploadModal from '../components/UploadModal'

import styles from './ClosetPage.module.css'

// Handles smooth camera movements based on selected category
function CameraRig({ controlsRef }) {
  const { activeCategory } = useWardrobeStore()
  const { camera } = useThree()

  useEffect(() => {
    if (!controlsRef.current) return

    // Default overview position for the avatar
    let targetPos = { x: 0, y: 1.6, z: 4.5 }
    let lookTarget = { x: 0, y: 1, z: 0 }

    // Map categories to shelf positions
    // Left shelf handles Tops and Bottoms
    if (activeCategory === 'tops') {
      targetPos = { x: -2.0, y: 1.8, z: 2.0 }
      lookTarget = { x: -3.4, y: 1.5, z: -1.0 }
    } else if (activeCategory === 'bottoms') {
      targetPos = { x: -2.0, y: 1.0, z: 2.0 }
      lookTarget = { x: -3.4, y: 0.5, z: -1.0 }
    } 
    // Right shelf handles Shoes and Accessories
    else if (activeCategory === 'shoes') {
      targetPos = { x: 2.0, y: 0.8, z: 2.0 }
      lookTarget = { x: 3.4, y: 0.2, z: -1.0 }
    } else if (activeCategory === 'accessories') {
      targetPos = { x: 2.0, y: 2.0, z: 2.0 }
      lookTarget = { x: 3.4, y: 1.8, z: -1.0 }
    }

    // Tween the camera position
    gsap.to(camera.position, {
      x: targetPos.x,
      y: targetPos.y,
      z: targetPos.z,
      duration: 1.2,
      ease: 'power3.inOut'
    })

    // Tween the OrbitControls target (where the camera looks)
    gsap.to(controlsRef.current.target, {
      x: lookTarget.x,
      y: lookTarget.y,
      z: lookTarget.z,
      duration: 1.2,
      ease: 'power3.inOut'
    })

  }, [activeCategory, camera, controlsRef])

  return null
}

export default function ClosetPage() {
  const { isDrawerOpen, selectedItem, isUploadModalOpen } = useWardrobeStore()
  const controlsRef = useRef()

  return (
    <div className={styles.closet}>
      {/* 3D Canvas */}
      <Canvas
        className={styles.canvas}
        camera={{ position: [0, 1.6, 4.5], fov: 50 }}
        shadows
        gl={{ antialias: true, alpha: false, preserveDrawingBuffer: true }}
      >
        <color attach="background" args={['#0d0a18']} />

        <Suspense fallback={null}>
          {/* Scene geometry */}
          <ClosetRoom />
          <AvatarModel />
          <ClothingRack />
        </Suspense>

        <OrbitControls
          ref={controlsRef}
          enablePan={false}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 1.8}
          minDistance={1.0}
          maxDistance={7.0}
          target={[0, 1, 0]}
        />
        
        {/* The Camera Animation Rig */}
        <CameraRig controlsRef={controlsRef} />
      </Canvas>

      {/* HTML UI Overlay */}
      <div className={styles.uiLayer}>
        <TopBar />
        <CategoryTabs />
        <FABUpload />
        <OutfitDrawer isOpen={isDrawerOpen} />
        {selectedItem && <ItemDetailPopup item={selectedItem} />}
        {isUploadModalOpen && <UploadModal />}
      </div>
    </div>
  )
}
