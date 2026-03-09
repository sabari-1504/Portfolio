/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react'

import { faTrophy } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Loader from 'react-loaders'

import AnimatedLetters from '../AnimatedLetters'
import './index.scss'

const achievementsData = [
  {
    id: 1,
    title: 'XR Developer Achievement',
    description: 'Developed immersive VR applications for educational and healthcare platforms using Unity and Quest.',
    date: '2024'
  },
  {
    id: 2,
    title: 'Full Stack Integration',
    description: 'Successfully integrated high-fidelity 3D models with web applications for enhanced user experience.',
    date: '2025'
  }
]

const Achievements = () => {
  const achievementsArray = 'Achievements'.split('')
  const [letterClass, setLetterClass] = useState('text-animate')

  useEffect(() => {
    const timer = setTimeout(() => {
      setLetterClass('text-animate-hover')
    }, 2000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <div className="container achievements-page">
        <div className="text-zone">
          <h1>
            <AnimatedLetters
              letterClass={letterClass}
              strArray={achievementsArray}
              idx={15}
            />
          </h1>
          <p>
            Showcasing a collection of my professional recognitions, certifications,
            and key milestones in XR and software development.
          </p>
        </div>

        <div className="achievements-container">
          <div className="achievements-list">
            {achievementsData.map((item) => (
              <div key={item.id} className="achievement-item">
                <div className="achievement-icon">
                  <FontAwesomeIcon icon={faTrophy} />
                </div>
                <div className="achievement-content">
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <span className="date">{item.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Loader type="pacman" />
    </>
  )
}

export default Achievements
