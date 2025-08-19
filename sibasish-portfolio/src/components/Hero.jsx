import { motion } from "framer-motion";

// Animation variants for better performance
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.6,
      staggerChildren: 0.1,
      ease: "easeOut"
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

const highlightsVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      delay: 0.1,
      ease: "easeOut"
    }
  }
};

export default function Hero({ me }){
  return (
    <section className="hero" id="top">
      <div className="hero-blob"></div>
      <motion.div 
        className="container hero-content"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div 
          className="hero-main"
          variants={itemVariants}
        >
          <div className="hero-text">
            <h1 className="hero-title">
              Hi, I'm <span className="hero-name">Sibasish</span>.
              <br className="hero-break"/>
              I design resilient backend systems.
            </h1>
            <p className="hero-summary">{me.summary}</p>
          </div>
          <div className="hero-actions">
            <a className="btn primary" href="#projects">View Projects</a>
            <a className="btn" href={me.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
            <a className="btn" href={me.github} target="_blank" rel="noreferrer">GitHub</a>
          </div>
          <div className="hero-stack">
            {me.stacks.map(s => <span key={s} className="badge">{s}</span>)}
          </div>
        </motion.div>
        <motion.div 
          className="hero-highlights"
          variants={highlightsVariants}
        >
          <div className="card hero-highlights-card">
            <h3 className="hero-highlights-title">Highlights</h3>
            <ul className="hero-highlights-list">
              {me.highlights.map((h,i)=>(<li key={i}>{h}</li>))}
            </ul>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
