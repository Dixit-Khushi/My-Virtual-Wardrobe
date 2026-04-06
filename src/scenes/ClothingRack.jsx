import { useRef } from 'react'

export default function ClothingRack() {
  const groupRef = useRef()

  return (
    <group ref={groupRef} position={[-2, -0.9, 1.5]} rotation={[0, Math.PI / 4, 0]}>
      {/* Base */}
      <mesh position={[0, 0.05, 0]} castShadow>
        <cylinderGeometry args={[0.4, 0.45, 0.1, 16]} />
        <meshStandardMaterial color="#1e1a2e" roughness={0.3} metalness={0.8} />
      </mesh>

      {/* Vertical pole */}
      <mesh position={[0, 1.2, 0]} castShadow>
        <cylinderGeometry args={[0.03, 0.03, 2.3, 12]} />
        <meshStandardMaterial color="#e2e8f0" roughness={0.2} metalness={0.9} />
      </mesh>

      {/* Top horizontal bar */}
      <mesh position={[0, 2.3, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.03, 0.03, 1.5, 12]} />
        <meshStandardMaterial color="#e2e8f0" roughness={0.2} metalness={0.9} />
      </mesh>

      {/* Hangers */}
      {[-0.5, -0.25, 0, 0.25, 0.5].map((x, i) => (
        <group key={i} position={[x, 2.3, 0]}>
          <mesh rotation={[0, 0, 0]} position={[0, -0.1, 0]}>
            <torusGeometry args={[0.04, 0.01, 8, 16, Math.PI]} />
            <meshStandardMaterial color="#94a3b8" />
          </mesh>
          <mesh position={[0, -0.15, 0]}>
             <cylinderGeometry args={[0.2, 0.2, 0.02, 3]} />
             <meshStandardMaterial color="#c8a97e" roughness={0.6} />
          </mesh>
        </group>
      ))}
    </group>
  )
}
