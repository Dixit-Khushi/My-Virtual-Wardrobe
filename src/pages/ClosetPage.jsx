import { Suspense, useEffect, useRef } from 'react'
import { Canvas, useThree } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { useWardrobeStore } from '../store/wardrobeStore'
import gsap from 'gsap'

import ClosetRoom from '../scenes/ClosetRoom'
import AvatarModel from '../scenes/AvatarModel'
import ClothingRack from '../scenes/ClothingRack'
import { ErrorBoundary } from '../components/ErrorBoundary'

import TopBar from '../components/TopBar'
import CategoryTabs from '../components/CategoryTabs'
import FABUpload from '../components/FABUpload'
import OutfitDrawer from '../components/OutfitDrawer'
import ItemDetailPopup from '../components/ItemDetailPopup'
import UploadModal from '../components/UploadModal'

import styles from './ClosetPage.module.css'

// Produces a wide master shot like the reference image
function CameraRig({ controlsRef }) {
  const { activeCategory } = useWardrobeStore()
  const { camera } = useThree()

  useEffect(() => {
    if (!controlsRef.current) return

    // Master wide shot matching reference precisely
    let targetPos = { x: 0, y: 1.5, z: 5.5 }
    let lookTarget = { x: 0, y: 1.2, z: 0 }

    if (activeCategory === 'tops') {
      targetPos = { x: -0.5, y: 1.5, z: 5.0 }
      lookTarget = { x: -1.0, y: 1.4, z: -1.0 }
    } else if (activeCategory === 'bottoms') {
      targetPos = { x: -0.5, y: 1.2, z: 5.0 }
      lookTarget = { x: -1.0, y: 0.8, z: -1.0 }
    } else if (activeCategory === 'shoes') {
      targetPos = { x: 0.5, y: 1.0, z: 5.0 }
      lookTarget = { x: 1.0, y: 0.5, z: -1.0 }
    } else if (activeCategory === 'accessories') {
      targetPos = { x: 0.5, y: 1.8, z: 5.0 }
      lookTarget = { x: 1.0, y: 1.6, z: -1.0 }
    }

    gsap.to(camera.position, {
      x: targetPos.x,
      y: targetPos.y,
      z: targetPos.z,
      duration: 1.5,
      ease: 'power3.inOut'
    })

    gsap.to(controlsRef.current.target, {
      x: lookTarget.x,
      y: lookTarget.y,
      z: lookTarget.z,
      duration: 1.5,
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
        camera={{ position: [0, 1.5, 5.5], fov: 45 }}
        shadows
        gl={{ antialias: true, alpha: false, preserveDrawingBuffer: true, toneMappingExposure: 1.2 }}
      >
        <color attach="background" args={['#0d0a18']} />

        <Suspense fallback={null}>
          <ErrorBoundary>
            <ClosetRoom />
          </ErrorBoundary>

          <ErrorBoundary>
            <AvatarModel />
          </ErrorBoundary>

          <ErrorBoundary>
            <ClothingRack />
          </ErrorBoundary>
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
        
        <CameraRig controlsRef={controlsRef} />
      </Canvas>

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
