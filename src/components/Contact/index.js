import { useEffect, useState } from 'react'
import { useRef } from 'react'

import emailjs from '@emailjs/browser'
// Removed react-leaflet map to use a 3D model instead
import Loader from 'react-loaders'
import { ClipLoader } from 'react-spinners'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import AnimatedLetters from '../AnimatedLetters'
import './index.scss'
import ContactModel from './Model'

const Contact = () => {
  const [letterClass, setLetterClass] = useState('text-animate')
  const form = useRef()
  const [loading, setLoading] = useState(false)
  const contactArray = 'Contact Me'.split('')

  // Resolve EmailJS config from multiple possible env names
  const serviceId =
    process.env.REACT_APP_EMAILJS_SERVICE_ID ||
    process.env.REACT_APP_EMIAL_SERVICE_ID ||
    process.env.REACT_APP_SERVICE_ID
  const templateId =
    process.env.REACT_APP_EMAILJS_TEMPLATE_ID ||
    process.env.REACT_APP_TEMPLATE_ID
  const publicKey =
    process.env.REACT_APP_EMAILJS_PUBLIC_KEY ||
    process.env.REACT_APP_PUBLIC_KEY

  useEffect(() => {
    setTimeout(() => {
      setLetterClass('text-animate-hover')
    }, 3000)
  }, [])

  // Initialize EmailJS if keys are present
  useEffect(() => {
    if (publicKey) {
      try {
        emailjs.init(publicKey)
      } catch (e) {
        // no-op
      }
    }
  }, [publicKey])

  const sendEmail = async (e) => {
    e.preventDefault()
    setLoading(true)

    const email = form.current.email.value
    const res = await verifyEmail(email)
    if (!res) {
      setLoading(false)
      toast.error('Please enter a valid email address', {
        position: 'bottom-center',
        autoClose: 3500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
      })
      return
    }

    let fullName = form.current.name.value
    let subject = form.current.subject.value
    let message = form.current.message.value

    let firstName = fullName.split(' ')[0]
    firstName =
      firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase()

    const templateParams = {
      firstname: firstName,
      name: fullName,
      subject: subject,
      message: message,
      email: email,
    }

    if (!serviceId || !templateId || !publicKey) {
      setLoading(false)
      const missing = [
        !serviceId ? 'SERVICE_ID' : null,
        !templateId ? 'TEMPLATE_ID' : null,
        !publicKey ? 'PUBLIC_KEY' : null,
      ]
        .filter(Boolean)
        .join(', ')

      toast.error(`EmailJS not configured. Missing: ${missing}. Set REACT_APP_EMAILJS_SERVICE_ID, REACT_APP_EMAILJS_TEMPLATE_ID, REACT_APP_EMAILJS_PUBLIC_KEY in .env`, {
        position: 'bottom-center',
        autoClose: 5000,
        theme: 'dark',
      })
      return
    }

    emailjs
      .send(serviceId, templateId, templateParams, publicKey)
      .then(
        () => {
          toast.success('Message successfully sent!', {
            position: 'bottom-center',
            autoClose: 3500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'dark',
          })
          const timeout = setTimeout(() => {
            form.current.reset()
            setLoading(false)
          }, 3800)

          return () => clearTimeout(timeout)
        },
        () => {
          setLoading(false)
          toast.error('Failed to send the message, please try again', {
            position: 'bottom-center',
            autoClose: 3500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'dark',
          })
        }
      )
  }

  const verifyEmail = async (email) => {
    // Basic format validation first
    const emailFormatOk = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)
    if (!emailFormatOk) return false

    const rapidHost = process.env.REACT_APP_RAPIDAPI_HOST
    const rapidKey = process.env.REACT_APP_RAPIDAPI_KEY

    // If RapidAPI credentials are not present, accept based on format only
    if (!rapidHost || !rapidKey) {
      return true
    }
    try {
      const res = await fetch(
        `https://mailok-email-validation.p.rapidapi.com/verify?email=${encodeURIComponent(email)}`,
        {
          method: 'GET',
          headers: {
            'X-RapidAPI-Host': rapidHost,
            'X-RapidAPI-Key': rapidKey,
          },
        }
      )
      // If the API is unreachable or returns non-200, do not block the user
      if (!res.ok) return true
      const data = await res.json()
      if (data && (data.status === 'valid' || data.result === 'valid')) return true
      // If API says invalid, still fall back to allowing if format is fine to avoid false negatives
      return true
    } catch (err) {
      // On any error, allow form submission to proceed
      return true
    }
  }

  return (
    <>
      <div className="container contact-page">
        <div className="text-zone">
          <h1>
            <AnimatedLetters
              letterClass={letterClass}
              strArray={contactArray}
              idx={15}
            />
          </h1>
          <p>
            I’m open to new opportunities and collaborations! If you’re looking
            for someone who can bring fresh ideas and deliver impactful results,
            let’s get in touch!
          </p>

          <div className="contact-form">
            <form ref={form} onSubmit={sendEmail}>
              <ul>
                <li className="half">
                  <input placeholder="Name" type="text" name="name" required />
                </li>
                <li className="half">
                  <input
                    placeholder="Email"
                    type="email"
                    name="email"
                    required
                  />
                </li>
                <li>
                  <input
                    placeholder="Subject"
                    type="text"
                    name="subject"
                    required
                  />
                </li>
                <li>
                  <textarea
                    placeholder="Message"
                    name="message"
                    required
                  ></textarea>
                </li>
                <li>
                  <button
                    type="submit"
                    className="flat-button"
                    disabled={loading}
                  >
                    {loading ? <ClipLoader color="#fff" size={20} /> : 'SEND'}
                  </button>
                </li>
              </ul>
              <ToastContainer />
            </form>
          </div>
        </div>
        <div className="map-wrap">
          <ContactModel />
        </div>
      </div>
      <Loader type="pacman" />
    </>
  )
}

export default Contact
