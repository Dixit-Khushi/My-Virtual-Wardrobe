import React from 'react'

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught error:", error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
          return this.props.fallback
      }
      return (
         <group>
           <mesh position={[0, 1, 0]}>
             <boxGeometry args={[0.5, 2, 0.5]} />
             <meshStandardMaterial color="red" wireframe />
           </mesh>
         </group>
      )
    }

    return this.props.children 
  }
}
