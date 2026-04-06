import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment, Stars } from '@react-three/drei'
import { useWardrobeStore } from '../store/wardrobeStore'

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

export default function ClosetPage() {
  const { isDrawerOpen, selectedItem, isUploadModalOpen } = useWardrobeStore()

  return (
    <div className={styles.closet}>
      {/* 3D Canvas */}
      <Canvas
        className={styles.canvas}
        camera={{ position: [0, 1.6, 4.5], fov: 50 }}
        shadows
        gl={{ antialias: true, alpha: false }}
      >
        <color attach="background" args={['#0d0a18']} />
        <fog attach="fog" args={['#0d0a18', 10, 20]} />

        <Suspense fallback={null}>
          {/* Scene Environment */}
          <Environment preset="night" />
          <Stars radius={60} depth={30} count={2000} factor={2} saturation={0.5} fade />

          {/* Lighting */}
          <ambientLight intensity={0.3} color="#c084fc" />
          <directionalLight position={[3, 5, 3]} intensity={1.2} castShadow color="#fff9f0" />
          <pointLight position={[0, 3, 0]} intensity={0.8} color="#f0abfc" />
          <spotLight
            position={[0, 5, 0]}
            angle={0.35}
            penumbra={0.8}
            intensity={2}
            castShadow
            color="#ffffff"
            target-position={[0, 0, 0]}
          />
          {/* Neon rim lights */}
          <pointLight position={[-4, 2, -2]} intensity={0.6} color="#2dd4bf" />
          <pointLight position={[4, 2, -2]} intensity={0.6} color="#f472b6" />

          {/* Scene geometry */}
          <ClosetRoom />
          <AvatarModel />
          <ClothingRack />
        </Suspense>

        <OrbitControls
          enablePan={false}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 1.8}
          minDistance={2.5}
          maxDistance={7}
          target={[0, 1, 0]}
        />
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
