import React, { useEffect, useRef } from 'react'

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
    Object.values(actions).forEach((action) => {
      if (action) {
        action.reset()
        action.setLoop(THREE.LoopRepeat, Infinity)
        action.play()
      }
    })
  }, [actions])

  scene.traverse((obj) => {
    if (obj.isMesh) {
      obj.castShadow = true
      obj.receiveShadow = true
    }
  })

  return (
    <group ref={groupRef} scale={1.35} position={[0.85, -1.6, 0]} rotation={[0, 0.15, 0]}>
      <primitive object={scene} />
    </group>
  )
}

const ContactModel = () => {
  return (
    <div className="contact-model-container">
      <Canvas camera={{ position: [0.6, 0.2, 6], fov: 60 }} style={{ background: 'transparent', width: '100%', height: '100%' }} shadows>
        <ambientLight intensity={0.8} />
        <directionalLight position={[10, 10, 5]} intensity={1.2} castShadow />
        <pointLight position={[-10, -10, -10]} intensity={0.6} />

        <ContactGLTFModel />

        {/** Controls removed to freeze model position */}
      </Canvas>
    </div>
  )
}

useGLTF.preload(MODEL_PATH)

export default ContactModel


