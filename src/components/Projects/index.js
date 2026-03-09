import { useEffect, useState } from 'react'

import { faCode, faCodeBranch, faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Loader from 'react-loaders'

import AnimatedLetters from '../AnimatedLetters'
import './index.scss'

// Projects data - easily scalable for future additions
const projects = [
  {
    id: 1,
    title: 'Interactive Skill Enhancer for ASD and ID',
    description: 'Built a VR app to help kids with autism learn social skills through fun, immersive experiences.',
    technologies: ['Unity 3D', 'C#', 'Meta Quest 3', 'Firebase', 'Augmented Reality'],
    category: 'VR Development',
    status: 'Completed',
    year: '2024',
    company: 'Completed',
    features: [
      'VR scenes for social skills training',
      'Mobile sync for guided learning',
      'Emotion and safety modules',
      'Progress tracking system'
    ],
    images: [],
    githubUrl: null,
    liveUrl: null,
    isPrivate: true
  },
  {
    id: 2,
    title: 'EduGuide AI',
    description: 'An AI-powered website that helps students find learning resources and get personalized study recommendations.',
    technologies: ['React.js', 'Node.js', 'Python', 'Firebase', 'Gemini API'],
    category: 'Full Stack Development',
    status: 'Completed',
    year: '2024',
    company: 'Completed',
    features: [
      'AI chatbot for instant help',
      'Curated learning resources',
      'Personalized study paths',
      'Easy-to-use interface'
    ],
    images: [],
    githubUrl: null,
    liveUrl: null,
    isPrivate: true
  },
  {
    id: 3,
    title: 'Rat Lab VR',
    description: 'A VR lab simulation where students can learn rat dissection virtually - no real rats needed!',
    technologies: ['Unity 3D', 'C#', 'Meta Quest', 'Blender', 'Firebase'],
    category: 'VR Development',
    status: 'Completed',
    year: '2024',
    company: 'Completed',
    features: [
      '3D rat anatomy experience',
      'Step-by-step guided procedures',
      'Interactive quizzes',
      'Safe learning alternative'
    ],
    images: [],
    githubUrl: null,
    liveUrl: null,
    isPrivate: true
  },
  {
    id: 4,
    title: 'QR Code Scanner using Meta Quest 3',
    description: 'A mixed reality app that scans QR codes in real-time using your Quest 3 headset.',
    technologies: ['Unity 3D', 'C#', 'Passthrough API', 'ZXing', 'Firebase'],
    category: 'Mixed Reality Development',
    status: 'Completed',
    year: '2024',
    company: 'Completed',
    features: [
      'Real-time QR scanning',
      'Secure authentication',
      'Interactive VR overlays',
      'Easy data retrieval'
    ],
    images: [],
    githubUrl: null,
    liveUrl: null,
    isPrivate: true
  },
  {
    id: 5,
    title: 'Forest Fire Game using Tobii Eye Tracker',
    description: 'A cool game where you control firefighting using just your eyes - no hands needed!',
    technologies: ['Unity 3D', 'C#', 'Tobii Eye Tracking SDK', 'Python'],
    category: 'Game Development',
    status: 'Completed',
    year: '2025',
    company: 'Completed',
    features: [
      'Eye-tracking controls',
      'Realistic fire simulation',
      'Environmental awareness levels',
      'Adaptive difficulty'
    ],
    images: [],
    githubUrl: null,
    liveUrl: null,
    isPrivate: true
  },
  {
    id: 6,
    title: 'MR Painting',
    description: 'Paint in 3D space! This mixed reality app lets you create art that blends with the real world.',
    technologies: ['Unity 3D', 'C#', 'Meta Quest SDK'],
    category: 'Mixed Reality Development',
    status: 'Completed',
    year: '2025',
    company: 'Completed',
    features: [
      '3D canvas in mixed reality',
      'Hand and controller controls',
      'Customizable brushes and colors',
      'Save and share artwork'
    ],
    images: [],
    githubUrl: null,
    liveUrl: null,
    isPrivate: true
  }
]

const Projects = () => {
  const projectsArray = 'Projects'.split('')
  const [letterClass, setLetterClass] = useState('text-animate')
  const [filter, setFilter] = useState('All')

  useEffect(() => {
    const timer = setTimeout(() => {
      setLetterClass('text-animate-hover')
    }, 2000)
    return () => clearTimeout(timer)
  }, [])

  // Get unique categories for filtering
  const categories = ['All', ...new Set(projects.map(project => project.category))]

  // Filter projects based on selected category
  const filteredProjects = filter === 'All' 
    ? projects 
    : projects.filter(project => project.category === filter)

  return (
    <>
      <div className="container projects-page">
        <div className="text-zone">
          <h1>
            <AnimatedLetters
              letterClass={letterClass}
              strArray={projectsArray}
              idx={15}
            />
          </h1>
          <p>
            Here's a collection of my cool projects - from VR apps that help kids learn to mixed reality games and web platforms. I love building stuff that makes people go "wow!" using Unity, XR tech, and modern web tools.
          </p>
          
          {/* Category Filter */}
          <div className="filter-container">
            {categories.map(category => (
              <button
                key={category}
                className={`filter-btn ${filter === category ? 'active' : ''}`}
                onClick={() => setFilter(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="projects-container">
          <div className="projects-grid">
            {filteredProjects.map((project, index) => (
              <div key={project.id} className="project-card" style={{animationDelay: `${index * 0.1}s`}}>
                {/* Project Images Section - with provision for multiple images */}
                {project.images && project.images.length > 0 && (
                  <div className="project-images">
                    <div className="image-carousel">
                      {project.images.map((image, idx) => (
                        <img key={idx} src={image} alt={`${project.title} ${idx + 1}`} />
                      ))}
                    </div>
                  </div>
                )}
                
                <div className="project-content">
                  <div className="project-header">
                    <div className="project-meta">
                      <span className="category">{project.category}</span>
                      <span className="year">{project.year}</span>
                      <span className={`status ${project.status.toLowerCase()}`}>
                        {project.status}
                      </span>
                    </div>
                    <h3 className="project-title">{project.title}</h3>
                    <p className="company">{project.company}</p>
                  </div>

                  <p className="project-description">{project.description}</p>

                  <div className="project-features">
                    <h4>Key Features:</h4>
                    <ul>
                      {project.features.map((feature, idx) => (
                        <li key={idx}>{feature}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="technologies">
                    {project.technologies.map((tech, idx) => (
                      <span key={idx} className="tech-tag">{tech}</span>
                    ))}
                  </div>

                  <div className="project-links">
                    {project.githubUrl && (
                      <a href={project.githubUrl} target="_blank" rel="noreferrer" className="project-link">
                        <FontAwesomeIcon icon={faCodeBranch} />
                        <span>Code</span>
                      </a>
                    )}
                    {project.liveUrl && (
                      <a href={project.liveUrl} target="_blank" rel="noreferrer" className="project-link">
                        <FontAwesomeIcon icon={faExternalLinkAlt} />
                        <span>Live Demo</span>
                      </a>
                    )}
                    {project.isPrivate && (
                      <span className="private-indicator">
                        <FontAwesomeIcon icon={faCode} />
                        <span>Private Project</span>
                      </span>
                    )}
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

export default Projects
