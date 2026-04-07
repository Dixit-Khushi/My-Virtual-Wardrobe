import { useEffect } from 'react'
import { useGraph } from '@react-three/fiber'
import { useGLTF, useTexture } from '@react-three/drei'
import * as THREE from 'three'

// High-fidelity rigged avatar loader
// Note: If you have not yet placed 'avatar.glb' in the 'public/models' folder, 
// the ErrorBoundary in ClosetPage will catch the missing file error.
export default function AvatarModel() {
  const { scene } = useGLTF('/models/avatar.glb')
  const { nodes } = useGraph(scene)

  const hairTexture = useTexture('/textures/hair.png')
  const dressTexture = useTexture('/textures/dress.png')

  useEffect(() => {
    if (!scene) return

    hairTexture.wrapS = hairTexture.wrapT = THREE.RepeatWrapping
    dressTexture.wrapS = dressTexture.wrapT = THREE.RepeatWrapping
    dressTexture.repeat.set(4, 4) // ensuring polka dots tile nicely

    scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true
        child.receiveShadow = true

        const name = child.name.toLowerCase()
        const matName = child.material?.name?.toLowerCase() || ''

        // Dynamically apply hair texture to any mesh or material named 'hair'
        if (name.includes('hair') || matName.includes('hair')) {
          child.material = new THREE.MeshStandardMaterial({
            map: hairTexture,
            roughness: 0.8,
            color: '#ffffff' // texture defines the color
          })
        }
        // Dynamically apply dress texture to any dress or clothing mesh
        else if (
          name.includes('dress') || name.includes('cloth') || 
          name.includes('shirt') || name.includes('top') || 
          matName.includes('dress') || matName.includes('cloth')
        ) {
          child.material = new THREE.MeshStandardMaterial({
            map: dressTexture,
            roughness: 0.9,
            side: THREE.DoubleSide
          })
        }
      }
    })
  }, [scene, hairTexture, dressTexture])

  return (
    <primitive object={scene} position={[0, -0.9, 0.3]} />
  )
}

// Preload the model so the UI can prepare for it
useGLTF.preload('/models/avatar.glb')
