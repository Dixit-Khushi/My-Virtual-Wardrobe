import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { RoundedBox, MeshReflectorMaterial } from '@react-three/drei'
import * as THREE from 'three'

// Wooden shelf color
const WOOD_COLOR = '#c8a97e'
const WOOD_DARK = '#8b6340'
const SHELF_COLOR = '#d4b896'

function ShelfUnit({ position, side = 1 }) {
  // side: 1 = right, -1 = left
  const shelves = [-0.3, 0.5, 1.3, 2.1]

  return (
    <group position={position}>
      {/* Back panel */}
      <mesh position={[0, 1.2, -0.12]}>
        <boxGeometry args={[2.2, 4.2, 0.06]} />
        <meshStandardMaterial color={WOOD_DARK} roughness={0.85} metalness={0.02} />
      </mesh>
      {/* Side panels */}
      <mesh position={[-1.08, 1.2, 0]}>
        <boxGeometry args={[0.06, 4.2, 0.6]} />
        <meshStandardMaterial color={WOOD_COLOR} roughness={0.8} />
      </mesh>
      <mesh position={[1.08, 1.2, 0]}>
        <boxGeometry args={[0.06, 4.2, 0.6]} />
        <meshStandardMaterial color={WOOD_COLOR} roughness={0.8} />
      </mesh>
      {/* Top panel */}
      <mesh position={[0, 3.22, 0]}>
        <boxGeometry args={[2.24, 0.06, 0.62]} />
        <meshStandardMaterial color={WOOD_COLOR} roughness={0.8} />
      </mesh>
      {/* Floor base */}
      <mesh position={[0, -0.85, 0]}>
        <boxGeometry args={[2.24, 0.06, 0.62]} />
        <meshStandardMaterial color={WOOD_COLOR} roughness={0.8} />
      </mesh>

      {/* Horizontal shelves */}
      {shelves.map((y, i) => (
        <mesh key={i} position={[0, y, 0]}>
          <boxGeometry args={[2.24, 0.05, 0.62]} />
          <meshStandardMaterial color={SHELF_COLOR} roughness={0.75} />
        </mesh>
      ))}

      {/* Clothing items stacked on shelves (colored blocks for demo) */}
      {shelves.map((sy, si) => (
        <group key={`clothes-${si}`} position={[0, sy + 0.12, 0]}>
          {[-0.65, -0.2, 0.25, 0.7].map((x, ci) => (
            <mesh key={ci} position={[x, 0.1, 0]}>
              <boxGeometry args={[0.28, 0.2, 0.3]} />
              <meshStandardMaterial
                color={['#fca5a5','#93c5fd','#86efac','#fde68a','#c4b5fd','#f9a8d4'][((si*4+ci))%6]}
                roughness={0.9}
              />
            </mesh>
          ))}
        </group>
      ))}
    </group>
  )
}

function Floor() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.9, 0]} receiveShadow>
      <planeGeometry args={[20, 20]} />
      <MeshReflectorMaterial
        blur={[300, 200]}
        resolution={512}
        mixBlur={1}
        mixStrength={40}
        roughness={1}
        depthScale={1.2}
        minDepthThreshold={0.4}
        maxDepthThreshold={1.4}
        color="#090628"
        metalness={0.6}
      />
    </mesh>
  )
}

function Platform() {
  return (
    <group position={[0, -0.88, 0.3]}>
      {/* Main platform disc */}
      <mesh receiveShadow castShadow>
        <cylinderGeometry args={[0.7, 0.75, 0.08, 32]} />
        <meshStandardMaterial color="#1e1a2e" metalness={0.6} roughness={0.3} />
      </mesh>
      {/* Glowing rim */}
      <mesh position={[0, 0, 0]}>
        <torusGeometry args={[0.72, 0.015, 8, 64]} />
        <meshStandardMaterial
          color="#c084fc"
          emissive="#c084fc"
          emissiveIntensity={3}
          toneMapped={false}
        />
      </mesh>
    </group>
  )
}

function BackWall() {
  const meshRef = useRef()
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.material.emissiveIntensity =
        0.4 + Math.sin(state.clock.elapsedTime * 0.8) * 0.15
    }
  })

  return (
    <group position={[0, 1.5, -3.5]}>
      {/* Back wall base */}
      <mesh ref={meshRef} receiveShadow>
        <planeGeometry args={[9, 6]} />
        <meshStandardMaterial
          color="#0f0820"
          emissive="#3b006a"
          emissiveIntensity={0.4}
          roughness={1}
        />
      </mesh>

      {/* Neon geometric shapes */}
      {[
        { pos: [-1.2, 0.8, 0.01], rot: [0, 0, 0.3], color: '#f472b6', size: [0.8, 0.8, 0.02] },
        { pos: [1.4, -0.4, 0.01], rot: [0, 0, -0.2], color: '#2dd4bf', size: [0.7, 0.7, 0.02] },
        { pos: [-2.5, -0.5, 0.01], rot: [0, 0, 0.5], color: '#a78bfa', size: [0.6, 0.6, 0.02] },
        { pos: [2.8, 0.6, 0.01], rot: [0, 0, -0.4], color: '#fb923c', size: [0.5, 0.5, 0.02] },
      ].map((shape, i) => (
        <NeonShape key={i} {...shape} delay={i * 0.5} />
      ))}

      {/* Glowing horizontal lines */}
      {[-1, 0, 1].map((y, i) => (
        <mesh key={i} position={[0, y * 1.2, 0.015]}>
          <planeGeometry args={[6, 0.003]} />
          <meshStandardMaterial
            color="#c084fc"
            emissive="#c084fc"
            emissiveIntensity={2}
            toneMapped={false}
            transparent
            opacity={0.3}
          />
        </mesh>
      ))}
    </group>
  )
}

function NeonShape({ pos, rot, color, size, delay = 0 }) {
  const ref = useRef()
  useFrame((state) => {
    if (ref.current) {
      ref.current.material.emissiveIntensity =
        1.5 + Math.sin(state.clock.elapsedTime * 1.2 + delay) * 0.8
      ref.current.rotation.z = rot[2] + Math.sin(state.clock.elapsedTime * 0.4 + delay) * 0.05
    }
  })
  return (
    <mesh ref={ref} position={pos} rotation={rot}>
      <planeGeometry args={[size[0], size[1]]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={1.5}
        toneMapped={false}
        transparent
        opacity={0.85}
        wireframe
      />
    </mesh>
  )
}

export default function ClosetRoom() {
  return (
    <group>
      <BackWall />
      <Floor />
      <Platform />

      {/* Left shelving unit */}
      <ShelfUnit position={[-3.4, 0.9, -1.5]} side={-1} />
      {/* Right shelving unit */}
      <ShelfUnit position={[3.4, 0.9, -1.5]} side={1} />

      {/* Side walls (invisible, just for reflections) */}
      <mesh position={[-5, 1.5, -1]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[8, 6]} />
        <meshStandardMaterial color="#0a0615" roughness={1} transparent opacity={0} />
      </mesh>
      <mesh position={[5, 1.5, -1]} rotation={[0, -Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[8, 6]} />
        <meshStandardMaterial color="#0a0615" roughness={1} transparent opacity={0} />
      </mesh>
    </group>
  )
}
