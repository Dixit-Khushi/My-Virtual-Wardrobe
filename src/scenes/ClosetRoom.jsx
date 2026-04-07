import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Environment, RoundedBox, useTexture } from '@react-three/drei'
import ClothingCard from './ClothingCard'
import { useWardrobeStore } from '../store/wardrobeStore'
import * as THREE from 'three'

function ShelfUnit({ position, side = 1, renderCards = false, items = [] }) {
  const woodTexture = useTexture('/textures/wood.png')
  const fabricTexture = useTexture('/textures/fabric.png')
  const shelves = [-0.3, 0.5, 1.3, 2.1]

  // Pre-generate stacks of clothes for shelves to match the visual density of the reference image
  const clothesStacks = useMemo(() => {
    const stacks = []
    shelves.forEach((sy) => {
       const colors = ['#fca5a5', '#93c5fd', '#fcd34d', '#4ade80', '#c084fc', '#fb923c', '#e2e8f0', '#334155']
       // 3 stacks per shelf
       for (let cx = -0.7; cx <= 0.7; cx += 0.7) {
          const numFolds = Math.floor(Math.random() * 4) + 3
          const stack = []
          for (let i = 0; i < numFolds; i++) {
             stack.push({
               y: i * 0.08 + 0.04,
               color: colors[Math.floor(Math.random() * colors.length)]
             })
          }
          stacks.push({ pbY: sy, x: cx, folds: stack })
       }
    })
    return stacks
  }, [])

  return (
    <group position={position}>
      {/* Back panel */}
      <mesh position={[0, 1.2, -0.12]} castShadow receiveShadow>
        <boxGeometry args={[2.2, 4.2, 0.06]} />
        <meshStandardMaterial map={woodTexture} roughness={0.9} />
      </mesh>
      {/* Side panels */}
      <mesh position={[-1.08, 1.2, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.06, 4.2, 0.6]} />
        <meshStandardMaterial map={woodTexture} roughness={0.8} />
      </mesh>
      <mesh position={[1.08, 1.2, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.06, 4.2, 0.6]} />
        <meshStandardMaterial map={woodTexture} roughness={0.8} />
      </mesh>
      {/* Top and Bottom */}
      <mesh position={[0, 3.22, 0]} castShadow receiveShadow>
        <boxGeometry args={[2.24, 0.06, 0.62]} />
        <meshStandardMaterial map={woodTexture} roughness={0.8} />
      </mesh>
      <mesh position={[0, -0.85, 0]} castShadow receiveShadow>
        <boxGeometry args={[2.24, 0.06, 0.62]} />
        <meshStandardMaterial map={woodTexture} roughness={0.8} />
      </mesh>

      {/* Horizontal shelves */}
      {shelves.map((y, i) => (
        <mesh key={i} position={[0, y, 0]} castShadow receiveShadow>
          <boxGeometry args={[2.24, 0.05, 0.62]} />
          <meshStandardMaterial map={woodTexture} roughness={0.6} />
        </mesh>
      ))}

      {/* Hovering Clothing Cards (Left side) */}
      {renderCards && shelves.map((sy, si) => {
        const item = items[si]
        if (!item) return null
        return <ClothingCard key={item.id} item={item} initialPosition={[position[0] + 0.5, position[1] + sy + 0.25, position[2] + 0.1]} />
      })}

      {/* Physical 3D Clothes Stacks */}
      {!renderCards && clothesStacks.map((stack, i) => (
         <group key={`stack-${i}`} position={[stack.x, stack.pbY + 0.03, 0]}>
            {stack.folds.map((fold, j) => (
               <RoundedBox key={`f-${j}`} args={[0.38, 0.07, 0.48]} radius={0.02} smoothness={4} position={[0, fold.y, 0]} castShadow>
                 <meshStandardMaterial map={fabricTexture} color={fold.color} roughness={0.9} />
               </RoundedBox>
            ))}
         </group>
      ))}
      
      {/* Background physical clothes for active card shelf */}
       {renderCards && clothesStacks.slice(0, 4).map((stack, i) => (
         <group key={`bgstack-${i}`} position={[-0.6, stack.pbY + 0.03, -0.1]}>
            {stack.folds.map((fold, j) => (
               <RoundedBox key={`f-${j}`} args={[0.25, 0.06, 0.3]} radius={0.02} smoothness={4} position={[0, fold.y, 0]} castShadow>
                 <meshStandardMaterial map={fabricTexture} color={fold.color} roughness={0.9} />
               </RoundedBox>
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
      <meshStandardMaterial 
        color="#8B5A2B" 
        roughness={0.9} 
        metalness={0.1} 
      />
    </mesh>
  )
}

function Platform() {
  return (
    <group position={[0, -0.88, 0.3]}>
      {/* Main podium - Matches reference's white glossy slab */}
      <mesh receiveShadow castShadow>
        <boxGeometry args={[1.5, 0.08, 1.2]} />
        <meshStandardMaterial color="#ffffff" metalness={0.1} roughness={0.1} />
      </mesh>
    </group>
  )
}

function BackWall() {
  return (
    <group position={[0, 1.5, -3.5]}>
      {/* Plaster back wall reflecting the iridescent neon colors naturally */}
      <mesh receiveShadow>
        <planeGeometry args={[12, 8]} />
        <meshStandardMaterial color="#eae3df" roughness={0.8} metalness={0.1} />
      </mesh>

      {/* Iridescent Ambient Gradient (soft behind neon) */}
      <mesh position={[0, 0, 0.005]}>
         <planeGeometry args={[7, 5]} />
         <meshStandardMaterial 
            color="#ffffff" 
            emissive="#ffffff"
            emissiveIntensity={0.5} 
            transparent 
            opacity={0.3} 
            roughness={0.3}
            metalness={0.8}
         />
      </mesh>

      {/* Neon geometric shapes accurately matched to reference image */}
      <group position={[0, -0.2, 0.02]}>
        {/* Left Triangle */}
        <NeonShape pos={[-2.4, 0.8, 0]} rot={[0, 0, 0.3]} color={'#ff9ced'} shape="triangle" size={1.0} thickness={0.04} />
        {/* Behind Avatar Circle */}
        <NeonShape pos={[-0.4, 0.2, -0.01]} rot={[0, 0, 0]} color={'#6bfbb2'} shape="circle" size={0.7} thickness={0.04} />
        {/* Right angled line */}
        <NeonShape pos={[2.0, 1.0, 0]} rot={[0, 0, -0.6]} color={'#ffe873'} shape="line" size={1.8} thickness={0.04} />
        {/* Right bottom angle */}
        <NeonShape pos={[2.4, -0.5, 0]} rot={[0, 0, 0.5]} color={'#e294ff'} shape="line" size={1.4} thickness={0.04} />
        {/* Abstract squiggle */}
        <mesh position={[2.0, -0.8, 0]}>
           <torusGeometry args={[0.2, 0.04, 16, 32, Math.PI]} />
           <meshStandardMaterial color="#ffbd88" emissive="#ffbd88" emissiveIntensity={2.5} toneMapped={false} />
        </mesh>
      </group>
    </group>
  )
}

function NeonShape({ pos, rot, color, shape, size, thickness = 0.05 }) {
  const ref = useRef()
  // gentle pulsing
  useFrame((state) => {
    if (ref.current) {
      ref.current.material.emissiveIntensity = 2.5 + Math.sin(state.clock.elapsedTime * 2) * 0.3
    }
  })

  let geometry
  if (shape === 'triangle') {
    geometry = <cylinderGeometry args={[size, size, thickness, 3]} />
  } else if (shape === 'circle') {
    geometry = <torusGeometry args={[size, thickness, 16, 64]} />
  } else {
    geometry = <cylinderGeometry args={[thickness, thickness, size, 16]} />
  }

  return (
    <mesh ref={ref} position={pos} rotation={[Math.PI/2, rot[2], 0]}>
      {geometry}
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={1.0} // lower intensity preserves the vibrant neon colors
      />
    </mesh>
  )
}

export default function ClosetRoom() {
  const { items } = useWardrobeStore()
  
  const leftShelfItems = [...items.tops, ...items.bottoms, ...items.shoes, ...items.accessories]

  return (
    <group>
       <Environment preset="studio" background blur={0.5} />

       <BackWall />
       <Floor />
       <Platform />

       <ShelfUnit position={[-4.2, 0.9, -1.0]} side={-1} renderCards={true} items={leftShelfItems} />
       <ShelfUnit position={[4.2, 0.9, -1.0]} side={1} renderCards={false} />

       <mesh position={[-6, 1.5, -2]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
         <planeGeometry args={[10, 8]} />
         <meshStandardMaterial color="#eae3df" roughness={1} />
       </mesh>
       <mesh position={[6, 1.5, -2]} rotation={[0, -Math.PI / 2, 0]} receiveShadow>
         <planeGeometry args={[10, 8]} />
         <meshStandardMaterial color="#eae3df" roughness={1} />
       </mesh>
    </group>
  )
}
