import React, { Suspense, useEffect, useRef, useState } from 'react'

import { useAnimations, useGLTF } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import * as THREE from 'three'

import './index.scss'
import modelUrl from '../../../assets/models/hey_good_lookin_-_vinnie.glb'

const MODEL_PATH = modelUrl

// Detect mobile once at module level
const isMobile = /Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
  typeof navigator !== 'undefined' ? navigator.userAgent : ''
)

const ContactGLTFModel = () => {
  const groupRef = useRef()
  const { scene, animations } = useGLTF(MODEL_PATH)
  const { actions } = useAnimations(animations, groupRef)

  useEffect(() => {
    // Configure shadows (skip on mobile to save GPU)
    scene.traverse((obj) => {
      if (obj.isMesh) {
        obj.castShadow = !isMobile
        obj.receiveShadow = !isMobile
        // Reduce texture quality on mobile
        if (isMobile && obj.material) {
          obj.material.precision = 'lowp'
        }
      }
    })
  }, [scene])

  useEffect(() => {
    Object.values(actions).forEach((action) => {
      if (action) {
        action.reset()
        action.setLoop(THREE.LoopRepeat, Infinity)
        action.play()
      }
    })
  }, [actions])

  return (
    <group ref={groupRef} scale={1.35} position={[0.85, -1.6, 0]} rotation={[0, 0.15, 0]}>
      <primitive object={scene} />
    </group>
  )
}

// Fallback shown inside the canvas while the GLB is downloading
const ModelFallback = () => (
  <mesh>
    <sphereGeometry args={[0.4, 16, 16]} />
    <meshStandardMaterial color="#00ced1" wireframe />
  </mesh>
)

class ModelErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }
  static getDerivedStateFromError() {
    return { hasError: true }
  }
  componentDidCatch(error) {
    console.warn('[ContactModel] WebGL/Three.js error caught:', error)
  }
  render() {
    if (this.state.hasError) return null
    return this.props.children
  }
}

const ContactModel = () => {
  // canvasKey forces a full remount if the WebGL context is lost
  const [canvasKey, setCanvasKey] = useState(0)
  const containerRef = useRef(null)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const handleContextLost = (e) => {
      e.preventDefault()
      console.warn('[ContactModel] WebGL context lost – scheduling remount')
      setTimeout(() => setCanvasKey((k) => k + 1), 1000)
    }

    el.addEventListener('webglcontextlost', handleContextLost, true)
    return () => el.removeEventListener('webglcontextlost', handleContextLost, true)
  }, [])

  return (
    <div className="contact-model-container" ref={containerRef}>
      <ModelErrorBoundary key={canvasKey}>
        <Canvas
          key={canvasKey}
          camera={{ position: [0.6, 0.2, 6], fov: 60 }}
          style={{ background: 'transparent', width: '100%', height: '100%' }}
          // Cap pixel ratio: mobile gets max 1.5×, desktop gets max 2×
          dpr={isMobile ? [1, 1.5] : [1, 2]}
          // Disable expensive shadows on mobile
          shadows={!isMobile}
          gl={{
            powerPreference: isMobile ? 'low-power' : 'high-performance',
            preserveDrawingBuffer: true,
            antialias: !isMobile,
            alpha: true,
          }}
        >
          <ambientLight intensity={isMobile ? 1.4 : 0.8} />
          <directionalLight
            position={[10, 10, 5]}
            intensity={1.2}
            castShadow={!isMobile}
          />
          {!isMobile && <pointLight position={[-10, -10, -10]} intensity={0.6} />}

          <Suspense fallback={<ModelFallback />}>
            <ContactGLTFModel />
          </Suspense>

          {/** Controls removed to freeze model position */}
        </Canvas>
      </ModelErrorBoundary>
    </div>
  )
}

useGLTF.preload(MODEL_PATH)

export default ContactModel
