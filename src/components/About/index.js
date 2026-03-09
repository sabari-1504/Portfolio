/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react'

import {
  faAndroid,
  faGitAlt,
  faJsSquare,
  faPython,
  faReact,
  faUnity,
} from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Loader from 'react-loaders'

import AnimatedLetters from '../AnimatedLetters'
import './index.scss'

const About = () => {
  const aboutArray = 'About Me'.split('')

  const [letterClass, setLetterClass] = useState('text-animate')

  useEffect(() => {
    const timer = setTimeout(() => {
      setLetterClass('text-animate-hover')
    }, 2000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <div className="container about-page">
        <div className="text-zone">
          <h1>
            <AnimatedLetters
              letterClass={letterClass}
              strArray={aboutArray}
              idx={15}
            />
          </h1>
          <p>
            I'm an XR Developer and Full Stack Engineer passionate about creating immersive 
            virtual and augmented reality experiences. With expertise in Unity, C#, XR Toolkit, 
            and AR Foundation, I specialize in building interactive VR/AR applications for 
            education, healthcare, and smart systems using Meta Quest and other XR platforms.
          </p>
          <p>
            My journey spans from developing immersive VR applications to building scalable 
            web platforms that complement modern XR ecosystems. I'm constantly exploring 
            cutting-edge technologies in mixed reality, AI integration, and cross-platform 
            development to push the boundaries of what's possible in virtual experiences.
          </p>
        </div>

        <div className="stage-cube-cont">
          <div className="cubespinner">
            <div className="face1">
              <FontAwesomeIcon icon={faUnity} color="#000000" />
            </div>
            <div className="face2">
              <FontAwesomeIcon icon={faJsSquare} color="#EFD81D" />
            </div>
            <div className="face3">
              <FontAwesomeIcon icon={faPython} color="#4B8BBE" />
            </div>
            <div className="face4">
              <FontAwesomeIcon icon={faReact} color="#61DAFB" />
            </div>
            <div className="face5">
              <FontAwesomeIcon icon={faAndroid} color="#3DDC84" />
            </div>
            <div className="face6">
              <FontAwesomeIcon icon={faGitAlt} color="#EC4D28" />
            </div>
          </div>
        </div>
      </div>
      <Loader type="pacman" />
    </>
  )
}

export default About
