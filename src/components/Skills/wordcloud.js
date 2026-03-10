import React, { useEffect, useRef } from 'react'

import TagCloud from 'TagCloud'

const WordCloud = () => {
  const containerRef = useRef(null)
  const texts = [
    'Unity',
    'VR',
    'AR',
    'Gameplay',
    'C#',
    'Java',
    'Python',
    'JavaScript',
    'HTML',
    'CSS',
    'DataMining',
    'Android',
    'Firebase',
    'Animations',
    'ReactJS',
    'NodeJS',
    'TypeScript',
    'AndroidSDK',
    'Linux',
    'CloudSync',
    'Game Development',
    'Mixed Reality',
    'ComfyUI',
    'Hugging Face',
    'CrossPlatform',
    'Frontend',
    'Backend',
    'Website',
    'AI',
    'Prompt Engineering',
    'MetaQuest',
    'Git',
  ]
  // Responsive radius based on viewport width
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768
  const options = {
    radius: isMobile ? 120 : 300,
    // animation speed
    // slow, normal, fast
    maxSpeed: 'fast',
    initSpeed: 'fast',
    // 0 = top
    // 90 = left
    // 135 = right-bottom
    direction: 135,
    // interact with cursor move on mouse out
    keep: true,
  }
  // Initialize TagCloud once and clean up on unmount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (!containerRef.current) return
    const instance = TagCloud(containerRef.current, texts, options)

    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = ''
      }
      // instance has no documented destroy API; clearing innerHTML removes nodes
    }
  }, [])

  return (
    <div className="main">
      <span ref={containerRef} className="content"></span>
    </div>
  )
}

export default WordCloud
