import React, { Suspense, useEffect, useRef } from 'react'

import { useAnimations, useGLTF } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import * as THREE from 'three'

import './index.scss'
import modelUrl from '../../../assets/models/hey_good_lookin_-_vinnie.glb'

const MODEL_PATH = modelUrl

const ContactGLTFModel = () => {
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

const ContactModel = () => {
  return (
    <div className="contact-model-container">
      <ModelErrorBoundary>
        <Canvas camera={{ position: [0.6, 0.2, 6], fov: 60 }} style={{ background: 'transparent', width: '100%', height: '100%' }} shadows>
          <ambientLight intensity={0.8} />
          <directionalLight position={[10, 10, 5]} intensity={1.2} castShadow />
          <pointLight position={[-10, -10, -10]} intensity={0.6} />

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
