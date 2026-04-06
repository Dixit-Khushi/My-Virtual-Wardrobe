import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF, useAnimations } from '@react-three/drei'
import { useWardrobeStore } from '../store/wardrobeStore'
import * as THREE from 'three'

// using a standard known placeholder Ready Player Me GLB
const MODEL_URL = "https://models.readyplayer.me/64bfa15f0e72c63d7c3934d1.glb"

export default function AvatarModel() {
  const groupRef = useRef()
  const { currentOutfit } = useWardrobeStore()

  // Load the GLTF model
  const { nodes, materials, scene, animations } = useGLTF(MODEL_URL)
  
  // Try to play animations if the GLB has any (like an idle A-pose)
  const { actions } = useAnimations(animations, groupRef)
  
  useFrame((state) => {
    // Keep avatar facing slightly forward but slowly breathing
    if (groupRef.current) {
      const t = state.clock.elapsedTime
      groupRef.current.position.y = Math.sin(t * 1.5) * 0.005 + 0.02 // slight natural bob
    }
  })

  // We find material meshes that represent clothing and override them.
  // In a real Ready Player Me model, meshes might be named 'Wolf3D_Outfit_Top', 'Wolf3D_Outfit_Bottom', etc.
  // We traverse the scene dynamically to apply colors.
  
  scene.traverse((child) => {
    if (child.isMesh && child.material) {
        // Enable shadows
        child.castShadow = true
        child.receiveShadow = true

        const name = child.name.toLowerCase()
        child.material.needsUpdate = true
        
        // Fabric-like finish
        child.material.roughness = 0.8
        child.material.metalness = 0.0

        if (name.includes('top') || name.includes('shirt') || name.includes('jacket')) {
           if (currentOutfit.top) {
               child.material.color = new THREE.Color(currentOutfit.top.color)
           }
        }
        else if (name.includes('bottom') || name.includes('pant') || name.includes('skirt')) {
           if (currentOutfit.bottom) {
               child.material.color = new THREE.Color(currentOutfit.bottom.color)
           }
        }
        else if (name.includes('shoe') || name.includes('footwear')) {
           if (currentOutfit.shoes) {
               child.material.color = new THREE.Color(currentOutfit.shoes.color)
           }
        }
    }
  })

  return (
    <group ref={groupRef} position={[0, -0.85, 0.3]} dispose={null}>
      {/* We scale the RPM model slightly because they are usually ~1.8 units tall */}
      <primitive object={scene} scale={0.95} position={[0, 0, 0]} />
      
      {/* Current outfit label (floating) in case we still want a minimalist UI here */}
      {currentOutfit.top && (
        <group position={[-0.8, 2.0, 0.3]}>
           {/* removed the black box from old procedural model */}
        </group>
      )}
    </group>
  )
}

// Pre-fetch the model for performance
useGLTF.preload(MODEL_URL)
