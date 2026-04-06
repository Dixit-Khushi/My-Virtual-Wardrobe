import { useRef, useState } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Text } from '@react-three/drei'
import { useWardrobeStore } from '../store/wardrobeStore'
import * as THREE from 'three'

export default function ClothingCard({ item, initialPosition }) {
  const cardRef = useRef()
  const { tryOnItem } = useWardrobeStore()
  const { camera, size } = useThree()
  
  const [isDragging, setIsDragging] = useState(false)
  const [position, setPosition] = useState(new THREE.Vector3(...initialPosition))
  const [isHovered, setIsHovered] = useState(false)
  const [isTriedOn, setIsTriedOn] = useState(false)

  // Floating animation offset
  const floatOffset = useRef(Math.random() * Math.PI * 2)

  useFrame((state) => {
    if (isTriedOn) return

    if (!isDragging && cardRef.current) {
      // Gentle float when on shelf
      const t = state.clock.elapsedTime
      cardRef.current.position.y = position.y + Math.sin(t * 2 + floatOffset.current) * 0.02
      // Rotate slowly to face camera slightly or stay put
      cardRef.current.rotation.y = THREE.MathUtils.lerp(
        cardRef.current.rotation.y, 
        isHovered ? 0.2 : 0, 
        0.1
      )
    }
  })

  // To do a simplified 3D drag on a 2D plane:
  const handlePointerDown = (e) => {
    e.stopPropagation()
    setIsDragging(true)
    document.body.style.cursor = 'grabbing'
  }

  const handlePointerMove = (e) => {
    if (!isDragging) return
    e.stopPropagation()
    
    // Project pointer onto a simple plane at Z=0 for dragging
    if (cardRef.current) {
       // Just simple unprojection based on mouse event in 3D
       const vec = new THREE.Vector3(
         (e.clientX / window.innerWidth) * 2 - 1,
         -(e.clientY / window.innerHeight) * 2 + 1,
         0.5
       )
       vec.unproject(camera)
       vec.sub(camera.position).normalize()
       
       // Depth to match avatar roughly
       const distance = -camera.position.z / vec.z
       const pos = camera.position.clone().add(vec.multiplyScalar(distance))
       
       cardRef.current.position.copy(pos)
    }
  }

  const handlePointerUp = (e) => {
    if (!isDragging) return
    e.stopPropagation()
    setIsDragging(false)
    document.body.style.cursor = 'auto'
    
    // Check if card is near center (X ~ 0) where the avatar is
    if (cardRef.current && Math.abs(cardRef.current.position.x) < 1.0) {
      // Dragged to avatar!
      setIsTriedOn(true)
      tryOnItem(item)
    } else {
      // Snap back to initial
      if (cardRef.current) {
         cardRef.current.position.copy(position)
      }
    }
  }

  if (isTriedOn) return null

  return (
    <group 
      ref={cardRef} 
      position={position}
      onPointerDown={handlePointerDown}
      onPointerMove={isDragging ? handlePointerMove : undefined}
      onPointerUp={handlePointerUp}
      onPointerOut={(e) => {
        setIsHovered(false)
        if (isDragging) handlePointerMove(e)
      }}
      onPointerOver={(e) => {
         e.stopPropagation()
         setIsHovered(true)
         if (!isDragging) document.body.style.cursor = 'pointer'
      }}
    >
      <mesh castShadow receiveShadow>
        {/* The Card geometry */}
        <boxGeometry args={[0.5, 0.6, 0.02]} />
        <meshStandardMaterial 
           color="#ffffff" 
           roughness={0.2} 
           metalness={0.1} 
           emissive={isHovered && !isDragging ? "#ffffff" : "#000000"}
           emissiveIntensity={0.1}
        />
      </mesh>
      
      {/* Glow behind card if hovered */}
      {isHovered && (
         <mesh position={[0,0,-0.02]}>
           <planeGeometry args={[0.6, 0.7]} />
           <meshBasicMaterial color={item.color} transparent opacity={0.3} toneMapped={false} />
         </mesh>
      )}

      {/* Decorative colored strip at top of card */}
      <mesh position={[0, 0.28, 0.011]}>
        <planeGeometry args={[0.48, 0.03]} />
        <meshBasicMaterial color={item.color} />
      </mesh>

      {/* Clothing representation (Text emoji inside the card) */}
      <Text
        position={[0, 0.05, 0.015]}
        fontSize={0.25}
        color="#333"
        anchorX="center"
        anchorY="middle"
      >
        {item.emoji}
      </Text>

      {/* Item label */}
      <Text
        position={[0, -0.2, 0.015]}
        fontSize={0.06}
        color="#000"
        maxWidth={0.4}
        textAlign="center"
        anchorX="center"
        font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyeMZhrib2Bg-4.ttf"
      >
        {item.name}
      </Text>
    </group>
  )
}
