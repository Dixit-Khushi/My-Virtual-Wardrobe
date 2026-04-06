import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import { useWardrobeStore } from '../store/wardrobeStore'
import * as THREE from 'three'

export default function ClothingCard({ item, initialPosition }) {
  const cardRef = useRef()
  const { tryOnItem } = useWardrobeStore()
  
  // Floating animation offset
  const floatOffset = useRef(Math.random() * Math.PI * 2)

  useFrame((state) => {
    if (cardRef.current) {
      const t = state.clock.elapsedTime
      cardRef.current.position.y = initialPosition[1] + Math.sin(t * 2 + floatOffset.current) * 0.05
    }
  })

  // Instead of complex 3D raycasting, we use an HTML overlay on the 3D card for glassmorphism
  // This perfectly mimics the translucent card in the reference image!

  return (
    <group ref={cardRef} position={initialPosition}>
      <Html transform distanceFactor={3.5} center zIndexRange={[100, 0]} style={{ pointerEvents: 'none' }}>
        <div 
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.8), rgba(255,255,255,0.4))',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            borderRadius: '16px',
            padding: '12px',
            width: '140px',
            boxShadow: '0 8px 32px rgba(0,0,0,0.1), inset 0 0 0 1px rgba(255,255,255,0.5)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            cursor: 'grab',
            pointerEvents: 'auto',
            transform: 'scale(1)',
            transition: 'transform 0.2s'
          }}
          onMouseDown={(e) => {
            e.currentTarget.style.cursor = 'grabbing';
            e.currentTarget.style.transform = 'scale(1.05)';
          }}
          onMouseUp={(e) => {
            e.currentTarget.style.cursor = 'grab';
            e.currentTarget.style.transform = 'scale(1)';
            // "Drop" onto avatar triggers try-on
            tryOnItem(item)
          }}
        >
          {/* Top left number */}
          <span style={{ position: 'absolute', top: 8, left: 12, fontSize: '10px', fontWeight: 'bold' }}>2</span>
          
          {/* Center Emoji / Image */}
          <div style={{ fontSize: '64px', margin: '4px 0', filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.2))'}}>
             {item.emoji}
          </div>
          
          {/* Label matching reference image white label box */}
          <div style={{
            background: 'white',
            borderRadius: '8px',
            padding: '4px 8px',
            fontSize: '11px',
            fontWeight: 600,
            width: '100%',
            textAlign: 'center',
            color: '#333'
          }}>
            {item.name}
          </div>
          
          {/* Mockup Hover Cursor */}
          <span style={{ position: 'absolute', bottom: 20, right: 10, fontSize: '16px' }}>👆</span>
        </div>
      </Html>
    </group>
  )
}
