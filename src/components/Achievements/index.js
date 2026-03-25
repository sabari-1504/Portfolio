/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react'

import { faAward, faMedal, faStar, faTrophy } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Loader from 'react-loaders'

import AnimatedLetters from '../AnimatedLetters'
import './index.scss'

const achievementsData = [
  {
    id: 1,
    icon: faTrophy,
    tag: 'Hackathon',
    title: 'Smart India Hackathon 2024 – Grand Finale',
    subtitle: 'NIT Srinagar · Software Edition',
    description:
      'Reached the Grand Finale of SIH 2024, presenting "Interactive Skills Enhancer (ISE)" — a VR & AR solution for children with ASD and Intellectual Disabilities. Gained invaluable feedback from expert jury panels.',
    image: '/pictures/sih.jpg',
    year: '2024',
  },
  {
    id: 2,
    icon: faMedal,
    tag: 'International Win',
    title: 'IEEE YESIST12 – Innovation Challenge Track Winner',
    subtitle: 'Universiti Kebangsaan Malaysia · Aug 2023–24',
    description:
      'Won the Innovation Challenge Track at the IEEE YESIST12 Finale among 35 global finalists with our project "Easy ISE (Interactive Skill Enhancer)". An inspiring journey of innovation, collaboration, and international recognition.',
    image: '/pictures/yesist.jpeg',
    year: '2023–24',
  },
  {
    id: 3,
    icon: faTrophy,
    tag: '1st Place',
    title: 'IEEE RMC Conference 2025 – Ideathon & Pitchfest',
    subtitle: 'VNR VJIET, Hyderabad · IEEE Hyderabad Section',
    description:
      'Team Virtual Whizzes 300 secured 1st place at the Ideathon and Pitchfest held at the IEEE RMC Conference 2025, recognising our innovation and teamwork in building impactful technology.',
    image: '/pictures/rmc.jpg',
    year: '2025',
  },
  {
    id: 4,
    icon: faAward,
    tag: '1st Place',
    title: 'Innovathon 3.0 – SDG Goal 10',
    subtitle: 'Reduced Inequalities Track',
    description:
      'Won 1st place at Innovathon 3.0 under SDG Goal 10 (Reduced Inequalities) with "Easy ISE (Interactive Skill Enhancer)", demonstrating our commitment to building inclusive technology.',
    image: '/pictures/inno.jpg',
    year: '2024',
  },
  {
    id: 5,
    icon: faStar,
    tag: 'Funding',
    title: 'IEEE EPICS Grant – $6,650 Funding',
    subtitle: 'Beyond Books: AR & VR for Autism & Rural Education',
    description:
      'Received $6,650 in funding support from IEEE EPICS for our project "Beyond Books: Transforming Learning with AR and VR for Autism and Rural Education", recognising its potential for impactful, inclusive learning.',
    image: '/pictures/epics.jpg',
    year: '2024',
  },
]

const Achievements = () => {
  const achievementsArray = 'Achievements'.split('')
  const [letterClass, setLetterClass] = useState('text-animate')
  const [flipped, setFlipped] = useState({})

  useEffect(() => {
    const timer = setTimeout(() => {
      setLetterClass('text-animate-hover')
    }, 2000)
    return () => clearTimeout(timer)
  }, [])

  const toggleFlip = (id) => {
    setFlipped((prev) => ({ ...prev, [id]: !prev[id] }))
  }

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
            Milestones earned through innovation, collaboration, and a relentless
            drive to build inclusive, impactful technology.
          </p>
        </div>

        <div className="achievements-grid-wrapper">
          <div className="achievements-grid">
            {achievementsData.map((item) => (
              <div
                key={item.id}
                className={`achievement-card ${flipped[item.id] ? 'is-flipped' : ''}`}
                onClick={() => toggleFlip(item.id)}
              >
                <div className="card-inner">
                  {/* ── FRONT ── */}
                  <div className="card-front">
                    <div className="card-image-wrap">
                      <img src={item.image} alt={item.title} />
                      <div className="card-overlay" />
                    </div>
                    <span className="card-tag">
                      <FontAwesomeIcon icon={item.icon} />
                      &nbsp;{item.tag}
                    </span>
                    <div className="card-front-content">
                      <h3>{item.title}</h3>
                      <p className="card-subtitle">{item.subtitle}</p>
                    </div>
                    <span className="card-year">{item.year}</span>
                    <span className="flip-hint">Tap to read more ↗</span>
                  </div>

                  {/* ── BACK ── */}
                  <div className="card-back">
                    <div className="card-back-icon">
                      <FontAwesomeIcon icon={item.icon} />
                    </div>
                    <h3>{item.title}</h3>
                    <p className="card-subtitle">{item.subtitle}</p>
                    <p className="card-desc">{item.description}</p>
                    <span className="card-year back-year">{item.year}</span>
                  </div>
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
