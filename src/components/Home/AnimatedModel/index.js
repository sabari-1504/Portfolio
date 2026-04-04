import React, { Suspense, useEffect, useRef } from 'react'

import { OrbitControls, useAnimations, useGLTF } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import * as THREE from 'three'

import './index.scss'
import robotModelUrl from '../../../assets/models/robot_playground.glb'

const MODEL_PATH = robotModelUrl

const GLTFModel = () => {
  const groupRef = useRef()
  const { scene, animations } = useGLTF(MODEL_PATH)
  const { actions } = useAnimations(animations, groupRef)

  useEffect(() => {
    // Traverse and configure shadows once the scene is ready
    scene.traverse((obj) => {
      if (obj.isMesh) {
        obj.castShadow = true
        obj.receiveShadow = true
      }
    })
  }, [scene])

  useEffect(() => {
    // Play all available animations in a loop
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

// Simple spinner shown inside the canvas while the model loads
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
  render() {
    if (this.state.hasError) return null
    return this.props.children
  }
}

const AnimatedModel = () => {
  return (
    <div className="animated-model-container">
      <ModelErrorBoundary>
        <Canvas camera={{ position: [0, 0, 5], fov: 60 }} style={{ background: 'transparent' }} shadows>
          <ambientLight intensity={0.7} />
          <directionalLight position={[10, 10, 5]} intensity={1.2} castShadow />
          <pointLight position={[-10, -10, -10]} intensity={0.5} />

          <Suspense fallback={<ModelFallback />}>
            <GLTFModel />
          </Suspense>

          <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.6} />
        </Canvas>
      </ModelErrorBoundary>
    </div>
  )
}

useGLTF.preload(MODEL_PATH)

export default AnimatedModel