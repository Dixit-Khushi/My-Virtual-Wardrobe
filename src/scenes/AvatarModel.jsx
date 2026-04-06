import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useWardrobeStore } from '../store/wardrobeStore'

// Procedural mannequin avatar (no external GLB needed)
export default function AvatarModel() {
  const groupRef = useRef()
  const { currentOutfit } = useWardrobeStore()

  useFrame((state) => {
    if (groupRef.current) {
      // Subtle breathing animation
      const t = state.clock.elapsedTime
      groupRef.current.position.y = Math.sin(t * 0.7) * 0.008
      groupRef.current.rotation.y = Math.sin(t * 0.3) * 0.04
    }
  })

  const skinColor = '#f4c2a1'
  const hairColor = '#b076d4'  // Purple tinted like reference image

  const topColor = currentOutfit.top?.color || '#f87171'
  const bottomColor = currentOutfit.bottom?.color || '#f87171'

  return (
    <group ref={groupRef} position={[0, -0.1, 0.3]} castShadow>

      {/* Head */}
      <mesh position={[0, 2.72, 0]} castShadow>
        <sphereGeometry args={[0.18, 32, 32]} />
        <meshStandardMaterial color={skinColor} roughness={0.6} />
      </mesh>

      {/* Hair */}
      <mesh position={[0, 2.82, 0]}>
        <sphereGeometry args={[0.185, 16, 16, 0, Math.PI * 2, 0, Math.PI * 0.6]} />
        <meshStandardMaterial color={hairColor} roughness={0.8} />
      </mesh>
      {/* Long hair */}
      <mesh position={[0, 2.6, -0.08]}>
        <cylinderGeometry args={[0.14, 0.08, 0.4, 12]} />
        <meshStandardMaterial color={hairColor} roughness={0.8} />
      </mesh>

      {/* Neck */}
      <mesh position={[0, 2.5, 0]} castShadow>
        <cylinderGeometry args={[0.06, 0.07, 0.18, 12]} />
        <meshStandardMaterial color={skinColor} roughness={0.6} />
      </mesh>

      {/* Torso / Dress top */}
      <mesh position={[0, 2.1, 0]} castShadow>
        <cylinderGeometry args={[0.22, 0.2, 0.6, 16]} />
        <meshStandardMaterial color={topColor} roughness={0.85} />
      </mesh>

      {/* Dress skirt */}
      <mesh position={[0, 1.6, 0]} castShadow>
        <cylinderGeometry args={[0.3, 0.42, 0.7, 20]} />
        <meshStandardMaterial color={bottomColor} roughness={0.85} />
      </mesh>

      {/* Dress flare */}
      <mesh position={[0, 1.28, 0]} castShadow>
        <cylinderGeometry args={[0.42, 0.36, 0.2, 20]} />
        <meshStandardMaterial color={bottomColor} roughness={0.85} />
      </mesh>

      {/* Left arm */}
      <group position={[-0.28, 2.1, 0]} rotation={[0, 0, 0.2]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.055, 0.048, 0.52, 10]} />
          <meshStandardMaterial color={topColor} roughness={0.85} />
        </mesh>
        {/* Forearm */}
        <mesh position={[0, -0.34, 0]} castShadow>
          <cylinderGeometry args={[0.048, 0.042, 0.38, 10]} />
          <meshStandardMaterial color={skinColor} roughness={0.6} />
        </mesh>
        {/* Hand */}
        <mesh position={[0, -0.56, 0]}>
          <sphereGeometry args={[0.048, 8, 8]} />
          <meshStandardMaterial color={skinColor} roughness={0.6} />
        </mesh>
      </group>

      {/* Right arm */}
      <group position={[0.28, 2.1, 0]} rotation={[0, 0, -0.2]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.055, 0.048, 0.52, 10]} />
          <meshStandardMaterial color={topColor} roughness={0.85} />
        </mesh>
        <mesh position={[0, -0.34, 0]} castShadow>
          <cylinderGeometry args={[0.048, 0.042, 0.38, 10]} />
          <meshStandardMaterial color={skinColor} roughness={0.6} />
        </mesh>
        <mesh position={[0, -0.56, 0]}>
          <sphereGeometry args={[0.048, 8, 8]} />
          <meshStandardMaterial color={skinColor} roughness={0.6} />
        </mesh>
      </group>

      {/* Left leg */}
      <group position={[-0.12, 1.11, 0]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.07, 0.06, 0.55, 10]} />
          <meshStandardMaterial color={skinColor} roughness={0.6} />
        </mesh>
        {/* Shoe */}
        <mesh position={[0, -0.35, 0.04]}>
          <boxGeometry args={[0.1, 0.07, 0.22]} />
          <meshStandardMaterial
            color={currentOutfit.shoes?.color || '#ffffff'}
            roughness={0.6}
          />
        </mesh>
      </group>

      {/* Right leg */}
      <group position={[0.12, 1.11, 0]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.07, 0.06, 0.55, 10]} />
          <meshStandardMaterial color={skinColor} roughness={0.6} />
        </mesh>
        <mesh position={[0, -0.35, 0.04]}>
          <boxGeometry args={[0.1, 0.07, 0.22]} />
          <meshStandardMaterial
            color={currentOutfit.shoes?.color || '#ffffff'}
            roughness={0.6}
          />
        </mesh>
      </group>

      {/* Current outfit label (floating) */}
      {currentOutfit.top && (
        <group position={[-0.8, 2.4, 0.3]}>
          <mesh>
            <planeGeometry args={[0.7, 0.22]} />
            <meshStandardMaterial color="#120f1e" transparent opacity={0.9} />
          </mesh>
        </group>
      )}
    </group>
  )
}
