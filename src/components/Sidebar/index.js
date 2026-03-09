import './index.scss'
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons'
import {
  faBriefcase,
  faDownload,
  faEnvelope,
  faHome,
  faLaptopCode,
  faScrewdriverWrench,
  faTrophy,
  faUser,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link, NavLink } from 'react-router-dom'

const Sidebar = () => {
  return (
    <>
      <div className="nav-bar">
        {/* Logo removed as requested */}
        <nav>
          <NavLink exact="true" activeclassname="active" to="/">
            <FontAwesomeIcon icon={faHome} color="#4d4d4e" />
          </NavLink>
          <NavLink activeclassname="active" className="about-link" to="/about">
            <FontAwesomeIcon icon={faUser} color="#4d4d4e" />
          </NavLink>

          <NavLink
            activeclassname="active"
            className="experience-link"
            to="/experience"
          >
            <FontAwesomeIcon icon={faBriefcase} color="#4d4d4e" />
          </NavLink>

          <NavLink
            activeclassname="active"
            className="projects-link"
            to="/projects"
          >
            <FontAwesomeIcon icon={faLaptopCode} color="#4d4d4e" />
          </NavLink>

          <NavLink
            activeclassname="active"
            className="skills-link"
            to="/skills"
          >
            <FontAwesomeIcon icon={faScrewdriverWrench} color="#4d4d4e" />
          </NavLink>

          <NavLink
            activeclassname="active"
            className="achievements-link"
            to="/achievements"
          >
            <FontAwesomeIcon icon={faTrophy} color="#4d4d4e" />
          </NavLink>

          <NavLink
            activeclassname="active"
            className="contact-link"
            to="/contact"
          >
            <FontAwesomeIcon icon={faEnvelope} color="#4d4d4e" />
          </NavLink>
        </nav>
        <ul>
          <li>
            <a
              href="https://www.linkedin.com/in/sabari-rl-372560257?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3BCMRU9HdWRAqz4NpFCVxmQw%3D%3D"
              target="_blank"
              rel="noreferrer"
            >
              <FontAwesomeIcon icon={faLinkedin} color="#b9b9b9" />
            </a>
          </li>
          <li>
            <a
              href="https://github.com/sabari-1504"
              target="_blank"
              rel="noreferrer"
            >
              <FontAwesomeIcon icon={faGithub} color="#b9b9b9" />
            </a>
          </li>
          <li>
            <a
              href="/sabari_resume.pdf"
              download="sabari_resume.pdf"
              target="_blank"
              rel="noreferrer"
              title="Download Resume"
            >
              <FontAwesomeIcon icon={faDownload} color="#b9b9b9" />
            </a>
          </li>
        </ul>
      </div>
    </>
  )
}

export default Sidebar
