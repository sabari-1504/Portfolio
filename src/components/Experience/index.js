import { useEffect, useState } from 'react'

import { faBriefcase } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Loader from 'react-loaders'

import AnimatedLetters from '../AnimatedLetters'
import './index.scss'

const workExperience = [
  {
    id: 1,
    company: 'Sri Sairam Techno Incubator Foundation',
    companyUrl: '#',
    position: 'VR Developer Intern',
    duration: 'June 2024 - July 2024',
    location: 'Chennai',
    achievements: [
      'Developed immersive VR applications using Unity, C#, and XR Toolkit for educational and healthcare applications.',
      'Implemented interactive gameplay mechanics and real-time user interactions in virtual reality environments.',
      'Optimized VR applications for Meta Quest platform ensuring smooth performance and user experience.'
    ]
  },
  {
    id: 2,
    company: 'Technoleiter Private Limited',
    companyUrl: '#',
    position: 'Full Stack Developer Intern',
    duration: 'June 2025 - July 2025',
    location: 'Chennai',
    achievements: [
      'Developed a real-time Educational Guidance Platform helping students explore engineering colleges based on personalized preferences and eligibility criteria.',
      'Implemented OTP-based authentication, email confirmations, and college filtering system based on location, specialization, type, and cutoff scores.',
      'Integrated psychometric test module for personalized career recommendations and map-based state selection for enhanced user experience.',
      'Built scalable backend logic and user-friendly frontend interactions ensuring accuracy and accessibility for student users.'
    ]
  }
]

const Experience = () => {
  const experienceArray = 'Experience'.split('')
  const [letterClass, setLetterClass] = useState('text-animate')

  useEffect(() => {
    const timer = setTimeout(() => {
      setLetterClass('text-animate-hover')
    }, 2000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <div className="container experience-page">
        <div className="text-zone">
          <h1>
            <AnimatedLetters
              letterClass={letterClass}
              strArray={experienceArray}
              idx={15}
            />
          </h1>
          <p>
            My professional journey focuses on immersive technology and full-stack development, 
            specializing in VR/AR applications using Unity and C#, while building scalable web platforms. 
            Each role has strengthened my expertise in creating interactive experiences and robust systems.
          </p>
        </div>

        <div className="experience-container">
          <div className="timeline">
            {workExperience.map((job, index) => (
              <div key={job.id} className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'}`}>
                <div className="timeline-marker">
                  <FontAwesomeIcon icon={faBriefcase} />
                </div>
                <div className="timeline-content">
                  <div className="job-header">
                    <h3 className="company-name">
                      <a href={job.companyUrl} target="_blank" rel="noreferrer">
                        {job.company}
                      </a>
                    </h3>
                    <h4 className="position">{job.position}</h4>
                    <div className="job-meta">
                      <span className="duration">{job.duration}</span>
                      <span className="location">{job.location}</span>
                    </div>
                  </div>
                  <ul className="achievements">
                    {job.achievements.map((achievement, idx) => (
                      <li key={idx}>{achievement}</li>
                    ))}
                  </ul>
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

export default Experience
