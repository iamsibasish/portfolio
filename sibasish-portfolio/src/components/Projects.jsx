import { useMemo, useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { projects } from "../data";

export default function Projects(){
  const [q, setQ] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const autoPlayRef = useRef(null);

  const filtered = useMemo(()=>{
    const t = q.trim().toLowerCase();
    if(!t) return projects;
    return projects.filter(p=> [p.title, p.period, p.blurb, ...p.tags].join(" ").toLowerCase().includes(t));
  }, [q]);

  // Auto-play functionality
  useEffect(() => {
    if (isAutoPlaying && filtered.length > 3) {
      autoPlayRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 3) % filtered.length);
      }, 5000);
    }
    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isAutoPlaying, filtered.length]);

  // Touch handlers for swipe functionality
  const handleTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      goToNext();
    }
    if (isRightSwipe) {
      goToPrevious();
    }
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 3 + filtered.length) % filtered.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 3) % filtered.length);
  };

  const handleMouseEnter = () => {
    setIsAutoPlaying(false);
  };

  const handleMouseLeave = () => {
    setIsAutoPlaying(true);
  };

  // Get current visible projects (3 at a time)
  const getVisibleProjects = () => {
    const visible = [];
    for (let i = 0; i < 3; i++) {
      const index = (currentIndex + i) % filtered.length;
      if (filtered[index]) {
        visible.push(filtered[index]);
      }
    }
    return visible;
  };

  const visibleProjects = getVisibleProjects();

  return (
    <div className="grid">
      <input 
        className="search" 
        placeholder="Search projects… (e.g. Kafka, tokenization, OTel)" 
        value={q} 
        onChange={e=>setQ(e.target.value)} 
      />
      
      <div 
        className="carousel-wrapper"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <motion.div 
          className="grid grid-3"
          layout
          transition={{ 
            duration: 0.5,
            ease: [0.25, 0.46, 0.45, 0.94]
          }}
        >
          {visibleProjects.map((project, i) => (
            <motion.article 
              key={project.id}
              className="project card"
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ 
                duration: 0.5,
                delay: i * 0.1,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
            >
              <img className="thumb" src={project.image} alt={project.title} />
              <div className="meta">
                <div>
                  <h3>{project.title}</h3>
                  <div className="kv">{project.period}</div>
                </div>
              </div>
              <p>{project.blurb}</p>
              <div className="tags">
                {project.tags.map(t => <span key={t} className="tag">{t}</span>)}
              </div>
            </motion.article>
          ))}
        </motion.div>

        {/* Navigation Controls */}
        {filtered.length > 3 && (
          <>
            <button 
              className="carousel-nav carousel-nav-prev" 
              onClick={goToPrevious}
              aria-label="Previous projects"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            
            <button 
              className="carousel-nav carousel-nav-next" 
              onClick={goToNext}
              aria-label="Next projects"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

            {/* Navigation Dots */}
            <div className="carousel-dots">
              {Array.from({ length: Math.ceil(filtered.length / 3) }).map((_, index) => (
                <button
                  key={index}
                  className={`carousel-dot ${Math.floor(currentIndex / 3) === index ? 'active' : ''}`}
                  onClick={() => setCurrentIndex(index * 3)}
                  aria-label={`Go to projects ${index * 3 + 1}-${Math.min((index + 1) * 3, filtered.length)}`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
