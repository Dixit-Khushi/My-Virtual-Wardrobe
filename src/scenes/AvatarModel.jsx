import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useWardrobeStore } from '../store/wardrobeStore'
import * as THREE from 'three'

// High-fidelity procedural female avatar to perfectly match the reference image
// and completely prevent network/DNS errors (like net::ERR_NAME_NOT_RESOLVED loading GLBs)
export default function AvatarModel() {
  const groupRef = useRef()
  const { currentOutfit } = useWardrobeStore()

  useFrame((state) => {
    if (groupRef.current) {
      // Subtle natural breathing and swaying animation
      const t = state.clock.elapsedTime
      groupRef.current.position.y = Math.sin(t * 1.2) * 0.008 - 0.85
      groupRef.current.rotation.y = Math.sin(t * 0.4) * 0.03
    }
  })

  // Colors matching reference image exactly
  const skinColor = '#f4cde1' // Fair skin
  const hairColor = '#9d6fe0'  // reference image has distinct violet/purple hair

  // Base clothing matches the reference image's peach/pink dotted dress
  const topColor = currentOutfit.top?.color || '#eb746d'
  const bottomColor = currentOutfit.bottom?.color || '#eb746d'
  const shoeColor = currentOutfit.shoes?.color || '#ffffff'

  return (
    <group ref={groupRef} position={[0, -0.85, 0.3]} castShadow>

      {/* Head */}
      <mesh position={[0, 2.76, 0]} castShadow>
        <sphereGeometry args={[0.16, 32, 32]} />
        <meshStandardMaterial color={skinColor} roughness={0.4} />
      </mesh>

      {/* Hair Top */}
      <mesh position={[0, 2.82, -0.02]} castShadow>
        <sphereGeometry args={[0.17, 32, 32, 0, Math.PI * 2, 0, Math.PI * 0.55]} />
        <meshStandardMaterial color={hairColor} roughness={0.7} />
      </mesh>
      
      {/* Hair Flowing Down (Matching reference long wavy hair) */}
      <mesh position={[0, 2.55, -0.1]} castShadow>
        <cylinderGeometry args={[0.18, 0.22, 0.6, 32]} />
        <meshStandardMaterial color={hairColor} roughness={0.7} />
      </mesh>

      {/* Neck */}
      <mesh position={[0, 2.58, 0]} castShadow>
        <cylinderGeometry args={[0.05, 0.06, 0.15, 16]} />
        <meshStandardMaterial color={skinColor} roughness={0.4} />
      </mesh>

      {/* Torso / Dress top - form-fitting */}
      <mesh position={[0, 2.15, 0]} castShadow>
        <cylinderGeometry args={[0.18, 0.15, 0.7, 32]} />
        <meshStandardMaterial color={topColor} roughness={0.8} />
      </mesh>

      {/* Dress skirt - flowing A-line */}
      <mesh position={[0, 1.55, 0]} castShadow>
        <cylinderGeometry args={[0.15, 0.38, 0.6, 32]} />
        <meshStandardMaterial color={bottomColor} roughness={0.8} />
      </mesh>

      {/* Dress flare hem */}
      <mesh position={[0, 1.25, 0]} castShadow>
        <cylinderGeometry args={[0.38, 0.42, 0.15, 32]} />
        <meshStandardMaterial color={bottomColor} roughness={0.8} />
      </mesh>

      {/* Left arm */}
      <group position={[-0.24, 2.3, 0]} rotation={[0, 0, 0.25]}>
        <mesh position={[0, -0.25, 0]} castShadow>
          <cylinderGeometry args={[0.045, 0.04, 0.5, 16]} />
          <meshStandardMaterial color={skinColor} roughness={0.4} />
        </mesh>
        {/* Forearm */}
        <mesh position={[0.02, -0.65, 0.05]} rotation={[-0.1, 0, -0.05]} castShadow>
          <cylinderGeometry args={[0.04, 0.035, 0.4, 16]} />
          <meshStandardMaterial color={skinColor} roughness={0.4} />
        </mesh>
      </group>

      {/* Right arm */}
      <group position={[0.24, 2.3, 0]} rotation={[0, 0, -0.25]}>
        <mesh position={[0, -0.25, 0]} castShadow>
          <cylinderGeometry args={[0.045, 0.04, 0.5, 16]} />
          <meshStandardMaterial color={skinColor} roughness={0.4} />
        </mesh>
        <mesh position={[-0.02, -0.65, 0.05]} rotation={[-0.1, 0, 0.05]} castShadow>
          <cylinderGeometry args={[0.04, 0.035, 0.4, 16]} />
          <meshStandardMaterial color={skinColor} roughness={0.4} />
        </mesh>
      </group>

      {/* Left leg */}
      <group position={[-0.12, 0.9, 0]}>
        <mesh position={[0, -0.3, 0]} castShadow>
          <cylinderGeometry args={[0.06, 0.045, 0.6, 20]} />
          <meshStandardMaterial color={skinColor} roughness={0.4} />
        </mesh>
        <mesh position={[0, -0.75, 0]} castShadow>
          <cylinderGeometry args={[0.045, 0.035, 0.4, 20]} />
          <meshStandardMaterial color={skinColor} roughness={0.4} />
        </mesh>
        {/* Shoe */}
        <mesh position={[0, -0.95, 0.04]}>
          <boxGeometry args={[0.08, 0.06, 0.18]} />
          <meshStandardMaterial color={shoeColor} roughness={0.5} />
        </mesh>
      </group>

      {/* Right leg */}
      <group position={[0.12, 0.9, 0]}>
        <mesh position={[0, -0.3, 0]} castShadow>
          <cylinderGeometry args={[0.06, 0.045, 0.6, 20]} />
          <meshStandardMaterial color={skinColor} roughness={0.4} />
        </mesh>
        <mesh position={[0, -0.75, 0]} castShadow>
          <cylinderGeometry args={[0.045, 0.035, 0.4, 20]} />
          <meshStandardMaterial color={skinColor} roughness={0.4} />
        </mesh>
        <mesh position={[0, -0.95, 0.04]}>
          <boxGeometry args={[0.08, 0.06, 0.18]} />
          <meshStandardMaterial color={shoeColor} roughness={0.5} />
        </mesh>
      </group>

    </group>
  )
}
