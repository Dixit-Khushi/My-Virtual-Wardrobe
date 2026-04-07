import { useMemo } from 'react'
import { RoundedBox, useTexture } from '@react-three/drei'

// A procedural modern jewelry stand
function JewelryStand({ position }) {
  return (
    <group position={position}>
      {/* Base */}
      <mesh castShadow receiveShadow position={[0, 0.02, 0]}>
        <cylinderGeometry args={[0.2, 0.2, 0.04, 32]} />
        <meshStandardMaterial color="#fff" roughness={0.1} metalness={0.1} />
      </mesh>
      {/* Vertical pole */}
      <mesh castShadow position={[0, 0.3, 0]}>
        <cylinderGeometry args={[0.015, 0.015, 0.6, 16]} />
        <meshStandardMaterial color="#ffd700" roughness={0.2} metalness={0.9} />
      </mesh>
      {/* T-bar 1 (Necklaces) */}
      <mesh castShadow position={[0, 0.55, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.015, 0.015, 0.4, 16]} />
        <meshStandardMaterial color="#ffd700" roughness={0.2} metalness={0.9} />
      </mesh>
      {/* T-bar 2 (Bracelets) */}
      <mesh castShadow position={[0, 0.35, 0]} rotation={[0, Math.PI / 4, Math.PI / 2]}>
         <cylinderGeometry args={[0.015, 0.015, 0.25, 16]} />
         <meshStandardMaterial color="#ffd700" roughness={0.2} metalness={0.9} />
      </mesh>

      {/* A hanging necklace loop */}
      <mesh position={[-0.15, 0.45, 0]}>
         <torusGeometry args={[0.05, 0.005, 16, 32]} />
         <meshStandardMaterial color="#c0c0c0" roughness={0.1} metalness={0.9} />
      </mesh>
    </group>
  )
}

// A simple procedural shoe proxy (sneaker layout)
function ShoeProxy({ position, color, rotation = [0, 0, 0] }) {
  return (
    <group position={position} rotation={rotation}>
      {/* Sole */}
      <RoundedBox args={[0.12, 0.04, 0.3]} radius={0.01} position={[0, 0.02, 0]} castShadow>
         <meshStandardMaterial color="#ffffff" roughness={0.8} />
      </RoundedBox>
      {/* Body */}
      <RoundedBox args={[0.11, 0.08, 0.28]} radius={0.02} position={[0, 0.08, 0]} castShadow>
         <meshStandardMaterial color={color} roughness={0.9} />
      </RoundedBox>
      {/* Ankle part */}
      <RoundedBox args={[0.1, 0.08, 0.1]} radius={0.02} position={[0, 0.12, -0.06]} castShadow>
         <meshStandardMaterial color={color} roughness={0.9} />
      </RoundedBox>
    </group>
  )
}

// A simple proxy for heels
function HeelProxy({ position, color, rotation = [0, 0, 0] }) {
   return (
      <group position={position} rotation={rotation}>
         {/* Sole arch */}
         <mesh castShadow position={[0, 0.06, 0.02]} rotation={[-0.4, 0, 0]}>
            <boxGeometry args={[0.08, 0.01, 0.2]} />
            <meshStandardMaterial color={color} roughness={0.3} metalness={0.8} />
         </mesh>
         {/* Heel spike */}
         <mesh castShadow position={[0, 0.06, -0.08]}>
            <cylinderGeometry args={[0.005, 0.01, 0.12, 8]} />
            <meshStandardMaterial color={color} roughness={0.3} metalness={0.8} />
         </mesh>
         {/* Toe strap */}
         <mesh castShadow position={[0, 0.05, 0.08]}>
            <boxGeometry args={[0.09, 0.05, 0.05]} />
            <meshStandardMaterial color={color} roughness={0.8} />
         </mesh>
      </group>
   )
}

export default function LeftShelvingUnit({ position, rotation }) {
  const woodTexture = useTexture('/textures/wood.png')
  const fabricTexture = useTexture('/textures/fabric.png')
  
  // Create an array of shelves
  const shelfHeights = [0.1, 0.8, 1.5, 2.2, 2.9, 3.6]
  
  const clothingStacks = useMemo(() => {
     const stacks = []
     // Tops on upper shelves (2.2, 2.9, 3.6)
     const colors = ['#fca5a5', '#93c5fd', '#e2e8f0', '#c084fc', '#334155']
     [2.2, 2.9, 3.6].forEach(sy => {
        for (let x = -0.6; x <= 0.6; x += 0.4) {
           const numFolds = Math.floor(Math.random() * 4) + 2
           const stack = []
           for (let i = 0; i < numFolds; i++) {
              stack.push({
                 y: i * 0.06 + 0.03,
                 color: colors[Math.floor(Math.random() * colors.length)]
              })
           }
           stacks.push({ pbY: sy, x, folds: stack })
        }
     })
     return stacks
  }, [])

  const shoeColors = ['#ff4500', '#1e90ff', '#fcd34d', '#ffffff', '#111111']

  return (
    <group position={position} rotation={rotation}>
      {/* Floor to Ceiling vertical back */}
      <mesh position={[0, 2.0, -0.4]} castShadow receiveShadow>
         <boxGeometry args={[2.0, 4.0, 0.04]} />
         <meshStandardMaterial map={woodTexture} roughness={0.8} />
      </mesh>
      {/* Side panels */}
      <mesh position={[-0.98, 2.0, 0]} castShadow receiveShadow>
         <boxGeometry args={[0.04, 4.0, 0.8]} />
         <meshStandardMaterial map={woodTexture} roughness={0.8} />
      </mesh>
      <mesh position={[0.98, 2.0, 0]} castShadow receiveShadow>
         <boxGeometry args={[0.04, 4.0, 0.8]} />
         <meshStandardMaterial map={woodTexture} roughness={0.8} />
      </mesh>

      {/* Horizontal Shelves */}
      {shelfHeights.map((y, i) => (
         <mesh key={`shelf-${i}`} position={[0, y, 0]} castShadow receiveShadow>
             <boxGeometry args={[1.92, 0.04, 0.8]} />
             <meshStandardMaterial map={woodTexture} roughness={0.8} />
         </mesh>
      ))}

      {/* Row 1: Sneakers (bottom shelf at 0.1) */}
      <group position={[0, 0.12, 0]}>
         {[-0.6, -0.2, 0.2, 0.6].map((x, i) => (
             <group key={`sneaker-pair-${i}`} position={[x, 0, 0]}>
                <ShoeProxy position={[-0.1, 0, 0]} color={shoeColors[i % shoeColors.length]} />
                <ShoeProxy position={[0.1, 0, 0]} color={shoeColors[i % shoeColors.length]} />
             </group>
         ))}
      </group>

      {/* Row 2: Heels (shelf at 0.8) */}
      <group position={[0, 0.82, 0]}>
         {[-0.6, -0.2, 0.2, 0.6].map((x, i) => (
             <group key={`heel-pair-${i}`} position={[x, 0, 0]}>
                <HeelProxy position={[-0.1, 0, 0]} color={i % 2 === 0 ? '#ff0055' : '#111111'} />
                <HeelProxy position={[0.1, 0, 0]} color={i % 2 === 0 ? '#ff0055' : '#111111'} />
             </group>
         ))}
      </group>

      {/* Row 3: Jewelry Stand & Small Box (shelf at 1.5) */}
      <group position={[0, 1.52, 0]}>
         <JewelryStand position={[0, 0, 0]} />
         <RoundedBox args={[0.4, 0.2, 0.3]} radius={0.02} position={[-0.5, 0.1, 0]} castShadow>
             <meshStandardMaterial color="#f0e6d2" roughness={0.7} />
         </RoundedBox>
      </group>

      {/* Rows 4-6: Folded Clothes */}
      {clothingStacks.map((stack, i) => (
         <group key={`l-stack-${i}`} position={[stack.x, stack.pbY + 0.02, 0]}>
            {stack.folds.map((fold, j) => (
               <RoundedBox key={`l-f-${j}`} args={[0.3, 0.05, 0.35]} radius={0.02} smoothness={4} position={[0, fold.y, 0]} castShadow>
                 <meshStandardMaterial map={fabricTexture} color={fold.color} roughness={0.9} />
               </RoundedBox>
            ))}
         </group>
      ))}

    </group>
  )
}
