import React, { Suspense, useEffect, useRef, useState } from 'react'

import { OrbitControls, useAnimations, useGLTF } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import * as THREE from 'three'

import './index.scss'
import robotModelUrl from '../../../assets/models/robot_playground.glb'

const MODEL_PATH = robotModelUrl

// Detect mobile once at module level
const isMobile = /Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
  typeof navigator !== 'undefined' ? navigator.userAgent : ''
)

const GLTFModel = () => {
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
    <group ref={groupRef} scale={1.2} position={[0, -0.5, 0]}>
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
    console.warn('[AnimatedModel] WebGL/Three.js error caught:', error)
  }
  render() {
    if (this.state.hasError) return null
    return this.props.children
  }
}

const AnimatedModel = () => {
  // canvasKey forces a full remount if the WebGL context is lost
  const [canvasKey, setCanvasKey] = useState(0)
  const containerRef = useRef(null)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const handleContextLost = (e) => {
      e.preventDefault()
      console.warn('[AnimatedModel] WebGL context lost – scheduling remount')
      // Remount the canvas after a short delay to get a fresh context
      setTimeout(() => setCanvasKey((k) => k + 1), 1000)
    }

    // Listen on the canvas element inside the container
    el.addEventListener('webglcontextlost', handleContextLost, true)
    return () => el.removeEventListener('webglcontextlost', handleContextLost, true)
  }, [])

  return (
    <div className="animated-model-container" ref={containerRef}>
      <ModelErrorBoundary key={canvasKey}>
        <Canvas
          key={canvasKey}
          camera={{ position: [0, 0, 5], fov: 60 }}
          style={{ background: 'transparent' }}
          // Cap pixel ratio: mobile gets max 1.5×, desktop gets max 2×
          dpr={isMobile ? [1, 1.5] : [1, 2]}
          // Disable expensive shadows on mobile
          shadows={!isMobile}
          gl={{
            // Prefer lower power GPU on mobile to avoid context loss
            powerPreference: isMobile ? 'low-power' : 'high-performance',
            // Keeps the buffer alive when the browser reclaims focus
            preserveDrawingBuffer: true,
            // Antialias is expensive on mobile – skip it
            antialias: !isMobile,
            alpha: true,
          }}
        >
          <ambientLight intensity={isMobile ? 1.2 : 0.7} />
          <directionalLight
            position={[10, 10, 5]}
            intensity={1.2}
            castShadow={!isMobile}
          />
          {!isMobile && <pointLight position={[-10, -10, -10]} intensity={0.5} />}

          <Suspense fallback={<ModelFallback />}>
            <GLTFModel />
          </Suspense>

          <OrbitControls
            enableZoom={false}
            enablePan={false}
            autoRotate
            autoRotateSpeed={0.6}
          />
        </Canvas>
      </ModelErrorBoundary>
    </div>
  )
}

useGLTF.preload(MODEL_PATH)

export default AnimatedModel