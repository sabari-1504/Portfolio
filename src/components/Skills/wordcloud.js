import React, { useEffect, useMemo, useRef } from 'react'

import TagCloud from 'TagCloud'

const WordCloud = () => {
  const containerRef = useRef(null)
  const texts = useMemo(() => [
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
  ], [])
  // Responsive radius based on viewport width
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768
  const options = useMemo(() => ({
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
  }), [isMobile])
  // Initialize TagCloud once and clean up on unmount
  useEffect(() => {
    const container = containerRef.current
    if (!container) return
    const instance = TagCloud(container, texts, options)

    return () => {
      if (container) {
        container.innerHTML = ''
      }
      // instance has no documented destroy API; clearing innerHTML removes nodes
    }
  }, [texts, options])

  return (
    <div className="main">
      <span ref={containerRef} className="content"></span>
    </div>
  )
}

export default WordCloud
