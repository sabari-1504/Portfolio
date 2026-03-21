import { useState } from 'react'

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
import { NavLink } from 'react-router-dom'

import './index.scss'

const navLinks = [
  { to: '/', icon: faHome, label: 'Home', exact: true },
  { to: '/about', icon: faUser, label: 'About', className: 'about-link' },
  { to: '/experience', icon: faBriefcase, label: 'Experience', className: 'experience-link' },
  { to: '/projects', icon: faLaptopCode, label: 'Projects', className: 'projects-link' },
  { to: '/skills', icon: faScrewdriverWrench, label: 'Skills', className: 'skills-link' },
  { to: '/achievements', icon: faTrophy, label: 'Achievements', className: 'achievements-link' },
  { to: '/contact', icon: faEnvelope, label: 'Contact', className: 'contact-link' },
]

const Sidebar = () => {
  const [menuOpen, setMenuOpen] = useState(false)

  const closeMenu = () => setMenuOpen(false)

  return (
    <>
      {/* ── Desktop sidebar (hidden on mobile via CSS) ── */}
      <div className="nav-bar desktop-sidebar">
        <nav>
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              exact={link.exact ? 'true' : undefined}
              activeclassname="active"
              className={link.className}
              to={link.to}
            >
              <FontAwesomeIcon icon={link.icon} className="nav-icon" />
            </NavLink>
          ))}
        </nav>
        <ul>
          <li>
            <a href="https://www.linkedin.com/in/sabari-rl-372560257?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3BCMRU9HdWRAqz4NpFCVxmQw%3D%3D" target="_blank" rel="noreferrer">
              <FontAwesomeIcon icon={faLinkedin} color="#b9b9b9" />
            </a>
          </li>
          <li>
            <a href="https://github.com/sabari-1504" target="_blank" rel="noreferrer">
              <FontAwesomeIcon icon={faGithub} color="#b9b9b9" />
            </a>
          </li>
          <li>
            <a href="/sabari_resume.pdf" download="sabari_resume.pdf" target="_blank" rel="noreferrer" title="Download Resume">
              <FontAwesomeIcon icon={faDownload} color="#b9b9b9" />
            </a>
          </li>
        </ul>
      </div>

      {/* ── Mobile top-bar (hidden on desktop via CSS) ── */}
      <header className="mobile-topbar">
        {/* Left: Nav icons row (horizontal scrollable) */}
        <div className="mobile-topbar__nav">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              exact={link.exact ? 'true' : undefined}
              activeclassname="active"
              className={link.className}
              to={link.to}
              onClick={closeMenu}
              title={link.label}
            >
              <FontAwesomeIcon icon={link.icon} />
            </NavLink>
          ))}
        </div>

        {/* Right: Social icons */}
        <div className="mobile-topbar__social">
          <a href="https://www.linkedin.com/in/sabari-rl-372560257?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3BCMRU9HdWRAqz4NpFCVxmQw%3D%3D" target="_blank" rel="noreferrer">
            <FontAwesomeIcon icon={faLinkedin} />
          </a>
          <a href="https://github.com/sabari-1504" target="_blank" rel="noreferrer">
            <FontAwesomeIcon icon={faGithub} />
          </a>
          <a href="/sabari_resume.pdf" download="sabari_resume.pdf" target="_blank" rel="noreferrer" title="Download Resume">
            <FontAwesomeIcon icon={faDownload} />
          </a>
        </div>
      </header>
    </>
  )
}

export default Sidebar
