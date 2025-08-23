import { useMemo, useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projects } from "../data";
import LazyImage from "./LazyImage";

export default function Projects(){
  const [q, setQ] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const autoPlayRef = useRef(null);

  const filtered = useMemo(()=>{
    const t = q.trim().toLowerCase();
    if(!t) return projects;
    return projects.filter(p=> [p.title, p.period, p.blurb, ...p.tags].join(" ").toLowerCase().includes(t));
  }, [q]);



  // Auto-play functionality with smooth infinite scrolling
  useEffect(() => {
    if (isAutoPlaying && filtered.length > 0) {
      autoPlayRef.current = setInterval(() => {
        goToNext();
      }, 4000);
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
    setIsAutoPlaying(false);
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
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => {
      const newIndex = prev - 3;
      // Reset to end when going below 0 for infinite effect
      if (newIndex < 0) {
        const lastPageStart = Math.floor((filtered.length - 1) / 3) * 3;
        setTimeout(() => {
          setCurrentIndex(lastPageStart);
          setIsTransitioning(false);
        }, 300);
        return lastPageStart;
      }
      setTimeout(() => setIsTransitioning(false), 300);
      return newIndex;
    });
    setIsAutoPlaying(false);
  };

  const goToNext = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => {
      const newIndex = prev + 3;
      // Reset to beginning when reaching end for infinite effect
      if (newIndex >= filtered.length) {
        setTimeout(() => {
          setCurrentIndex(0);
          setIsTransitioning(false);
        }, 300);
        return 0;
      }
      setTimeout(() => setIsTransitioning(false), 300);
      return newIndex;
    });
  };

  // Keyboard navigation for carousel
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.target.closest('.carousel-wrapper')) {
        switch (event.key) {
          case 'ArrowLeft':
            event.preventDefault();
            goToPrevious();
            break;
          case 'ArrowRight':
            event.preventDefault();
            goToNext();
            break;
          case ' ':
          case 'Enter':
            if (event.target.classList.contains('carousel-nav') || 
                event.target.classList.contains('carousel-dot')) {
              event.preventDefault();
              event.target.click();
            }
            break;
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleMouseEnter = () => {
    setIsAutoPlaying(false);
  };

  const handleMouseLeave = () => {
    setIsAutoPlaying(true);
  };

  // Get current visible projects (3 at a time) with infinite scrolling
  const getVisibleProjects = () => {
    if (filtered.length === 0) return [];
    
    const visible = [];
    for (let i = 0; i < 3; i++) {
      const index = (currentIndex + i) % filtered.length;
      visible.push({
        ...filtered[index],
        displayIndex: i,
        actualIndex: index
      });
    }
    return visible;
  };

  const visibleProjects = getVisibleProjects();

  return (
    <div className="grid">
      <label htmlFor="project-search" className="sr-only">
        Search projects by technology or keyword
      </label>
      <input 
        id="project-search"
        className="search" 
        placeholder="Search projects… (e.g., Kafka, tokenization, OpenTelemetry)" 
        value={q} 
        onChange={e=>setQ(e.target.value)}
        aria-describedby="search-help"
      />
      <div id="search-help" className="sr-only">
        Search through {projects.length} projects by technology, company, or description
      </div>
      
      <div 
        className="carousel-wrapper infinite-scroll"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        role="region"
        aria-label="Project showcase"
        aria-live="polite"
      >
        <div className="carousel-track">
          <AnimatePresence mode="wait">
            <motion.div 
              key={currentIndex}
              className="carousel-slide"
              initial={{ x: 300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -300, opacity: 0 }}
              transition={{ 
                duration: 0.5,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
              role="list"
              aria-label={`Showing 3 projects starting from ${currentIndex + 1} of ${filtered.length} total`}
            >
              <div className="grid grid-3">
                {visibleProjects.map((project, i) => (
                  <motion.article 
                    key={`${project.id}-${project.actualIndex}-${currentIndex}`}
                    className="project card will-change-transform"
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ 
                      duration: 0.4,
                      delay: i * 0.1,
                      ease: [0.25, 0.46, 0.45, 0.94]
                    }}
                    whileHover={{ 
                      y: -8,
                      scale: 1.02,
                      transition: { duration: 0.3 }
                    }}
                    role="listitem"
                    aria-labelledby={`project-${project.id}-${project.actualIndex}-title`}
                  >
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                    >
                      <LazyImage 
                        className="thumb" 
                        src={project.image} 
                        alt={`${project.title} project screenshot showing ${project.category.toLowerCase()} implementation`}
                      />
                    </motion.div>
                    <div className="meta">
                      <div>
                        <motion.h3
                          id={`project-${project.id}-${project.actualIndex}-title`}
                          whileHover={{ scale: 1.02 }}
                          transition={{ duration: 0.2 }}
                        >
                          {project.title}
                        </motion.h3>
                        <div className="kv text-subtle" aria-label={`Project period: ${project.period}`}>
                          {project.period}
                        </div>
                      </div>
                    </div>
                    <p className="text-muted">{project.blurb}</p>
                    <div className="tags" role="list" aria-label="Technologies used">
                      {project.tags.map((t, index) => (
                        <motion.span 
                          key={`${t}-${index}`}
                          className="tag"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ 
                            duration: 0.3, 
                            delay: i * 0.1 + index * 0.05 
                          }}
                          whileHover={{ 
                            scale: 1.1, 
                            y: -2,
                            transition: { duration: 0.2 }
                          }}
                          role="listitem"
                        >
                          {t}
                        </motion.span>
                      ))}
                    </div>
                  </motion.article>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Controls */}
        {filtered.length > 1 && (
          <>
            <button 
              className="carousel-nav carousel-nav-prev" 
              onClick={goToPrevious}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  goToPrevious();
                }
              }}
              aria-label="View previous projects"
              disabled={isTransitioning}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            
            <button 
              className="carousel-nav carousel-nav-next" 
              onClick={goToNext}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  goToNext();
                }
              }}
              aria-label="View next projects"
              disabled={isTransitioning}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

            {/* Navigation Dots */}
            <div className="carousel-dots" role="tablist" aria-label="Project navigation">
              {Array.from({ length: Math.ceil(filtered.length / 3) }).map((_, pageIndex) => (
                <button
                  key={pageIndex}
                  className={`carousel-dot ${Math.floor(currentIndex / 3) === pageIndex ? 'active' : ''}`}
                  onClick={() => {
                    setCurrentIndex(pageIndex * 3);
                    setIsAutoPlaying(false);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setCurrentIndex(pageIndex * 3);
                      setIsAutoPlaying(false);
                    }
                  }}
                  role="tab"
                  aria-selected={Math.floor(currentIndex / 3) === pageIndex}
                  aria-label={`Page ${pageIndex + 1}: Projects ${pageIndex * 3 + 1}-${Math.min((pageIndex + 1) * 3, filtered.length)}`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
