import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { MeshReflectorMaterial, useEnvironment, Environment } from '@react-three/drei'
import ClothingCard from './ClothingCard'
import { useWardrobeStore } from '../store/wardrobeStore'
import * as THREE from 'three'

// Warm, realistic high-fidelity textures & colors
const WOOD_COLOR = '#d4b58e' // Warm shelf wood
const WOOD_DARK = '#b68c5b'  // Darker backpanel
const SHELF_COLOR = '#e6cda3' // Lighter shelf top
const FLOOR_COLOR = '#dcd7d4' // Warm concrete/marble base color

function ShelfUnit({ position, side = 1, items }) {
  // side: 1 = right, -1 = left
  const shelves = [-0.3, 0.5, 1.3, 2.1]

  return (
    <group position={position}>
      {/* Back panel */}
      <mesh position={[0, 1.2, -0.12]} castShadow receiveShadow>
        <boxGeometry args={[2.2, 4.2, 0.06]} />
        <meshStandardMaterial color={WOOD_DARK} roughness={0.7} metalness={0.1} />
      </mesh>
      {/* Side panels */}
      <mesh position={[-1.08, 1.2, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.06, 4.2, 0.6]} />
        <meshStandardMaterial color={WOOD_COLOR} roughness={0.6} />
      </mesh>
      <mesh position={[1.08, 1.2, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.06, 4.2, 0.6]} />
        <meshStandardMaterial color={WOOD_COLOR} roughness={0.6} />
      </mesh>
      {/* Top panel */}
      <mesh position={[0, 3.22, 0]} castShadow receiveShadow>
        <boxGeometry args={[2.24, 0.06, 0.62]} />
        <meshStandardMaterial color={WOOD_COLOR} roughness={0.6} />
      </mesh>
      {/* Floor base */}
      <mesh position={[0, -0.85, 0]} castShadow receiveShadow>
        <boxGeometry args={[2.24, 0.06, 0.62]} />
        <meshStandardMaterial color={WOOD_COLOR} roughness={0.6} />
      </mesh>

      {/* Horizontal shelves */}
      {shelves.map((y, i) => (
        <mesh key={i} position={[0, y, 0]} castShadow receiveShadow>
          <boxGeometry args={[2.24, 0.05, 0.62]} />
          <meshStandardMaterial color={SHELF_COLOR} roughness={0.5} metalness={0.1} />
        </mesh>
      ))}

      {/* Clothing Cards sitting on shelves */}
      {shelves.map((sy, si) => {
        // Place 2 items per shelf
        const shelfItems = items.slice(si * 2, si * 2 + 2)
        return (
          <group key={`shelf-${si}`}>
            {shelfItems.map((item, ci) => {
              // x pos: -0.5 and 0.5
              const xPos = ci === 0 ? -0.5 : 0.5
              // Calculate global position since card handles its own dragging
              const globalPos = [position[0] + xPos, position[1] + sy + 0.35, position[2] + 0.05]
              return <ClothingCard key={item.id} item={item} initialPosition={globalPos} />
            })}
          </group>
        )
      })}
    </group>
  )
}

function Floor() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.9, 0]} receiveShadow>
      <planeGeometry args={[20, 20]} />
      {/* A concrete/marble-like reflector material */}
      <MeshReflectorMaterial
        blur={[400, 400]}
        resolution={1024}
        mixBlur={1}
        mixStrength={20}
        roughness={0.3}     // lower roughness for marble look
        depthScale={1.2}
        minDepthThreshold={0.4}
        maxDepthThreshold={1.4}
        color={FLOOR_COLOR}
        metalness={0.1}
        mirror={0.6}
      />
    </mesh>
  )
}

function Platform() {
  return (
    <group position={[0, -0.88, 0.3]}>
      {/* Main platform disc - Marble like */}
      <mesh receiveShadow castShadow>
        <cylinderGeometry args={[0.9, 1.0, 0.08, 64]} />
        <meshStandardMaterial color="#ffffff" metalness={0.1} roughness={0.2} />
      </mesh>
      {/* Soft warm glow around the base */}
      <mesh position={[0, -0.02, 0]}>
        <cylinderGeometry args={[1.05, 1.1, 0.01, 64]} />
        <meshBasicMaterial color="#fcd34d" transparent opacity={0.6} />
      </mesh>
    </group>
  )
}

function BackWall() {
  return (
    <group position={[0, 1.5, -3.5]}>
      {/* Back wall base - Warm plaster/beige */}
      <mesh receiveShadow>
        <planeGeometry args={[10, 7]} />
        <meshStandardMaterial
          color="#dcd7d4"
          roughness={0.9}
        />
      </mesh>

      {/* Neon geometric shapes (Mockup styled) */}
      <group position={[0, -0.5, 0]}>
        {/* Triangle */}
        <NeonShape pos={[-1.8, 1.2, 0.01]} rot={[0, 0, 0.2]} color={'#ff7eb3'} shape="triangle" size={1.2} />
        {/* Circle */}
        <NeonShape pos={[-0.8, -0.2, 0.01]} rot={[0, 0, 0]} color={'#2dd4bf'} shape="circle" size={0.6} />
        {/* Squiggles/Lines */}
        <NeonShape pos={[1.5, 1.4, 0.01]} rot={[0, 0, -0.5]} color={'#fcd34d'} shape="line" size={1.8} thickness={0.06} />
        <NeonShape pos={[2.2, -0.2, 0.01]} rot={[0, 0, 0.4]} color={'#a855f7'} shape="line" size={1.5} thickness={0.05} />
      </group>
    </group>
  )
}

function NeonShape({ pos, rot, color, shape, size, thickness = 0.05 }) {
  const ref = useRef()
  // gentle pulsing
  useFrame((state) => {
    if (ref.current) {
      ref.current.material.emissiveIntensity = 2.0 + Math.sin(state.clock.elapsedTime * 2) * 0.5
    }
  })

  let geometry
  if (shape === 'triangle') {
    geometry = <cylinderGeometry args={[size, size, thickness, 3]} />
  } else if (shape === 'circle') {
    geometry = <torusGeometry args={[size, thickness, 16, 64]} />
  } else {
    // line
    geometry = <cylinderGeometry args={[thickness, thickness, size, 16]} />
  }

  return (
    <mesh ref={ref} position={pos} rotation={[Math.PI/2, rot[2], 0]}>
      {geometry}
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={2}
        toneMapped={false}
      />
    </mesh>
  )
}

export default function ClosetRoom() {
  const { items } = useWardrobeStore()
  
  // We extract items to place on the shelves
  // Left shelf -> Tops + Bottoms
  const leftShelfItems = [...items.tops, ...items.bottoms]
  // Right shelf -> Shoes + Accs
  const rightShelfItems = [...items.shoes, ...items.accessories]

  return (
    <group>
      {/* Global Illumination HDRI - gives realistic lighting/reflections to everything */}
      <Environment preset="apartment" background={false} blur={0.8} />

      <BackWall />
      <Floor />
      <Platform />

      {/* Shelving units with items */}
      <ShelfUnit position={[-3.4, 0.9, -1.0]} side={-1} items={leftShelfItems} />
      <ShelfUnit position={[3.4, 0.9, -1.0]} side={1} items={rightShelfItems} />

      {/* Side walls for reflection occlusion */}
      <mesh position={[-5, 1.5, -1]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[8, 6]} />
        <meshStandardMaterial color="#dcd7d4" roughness={1} />
      </mesh>
      <mesh position={[5, 1.5, -1]} rotation={[0, -Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[8, 6]} />
        <meshStandardMaterial color="#dcd7d4" roughness={1} />
      </mesh>
    </group>
  )
}
