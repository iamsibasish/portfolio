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
      <div className="hero-blob will-change-transform"></div>
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
            <motion.h1 
              className="hero-title"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Hi, I'm <span className="hero-name">Sibasish</span>.
              <br className="hero-break"/>
              I design resilient backend systems.
            </motion.h1>
            <motion.p 
              className="hero-summary"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {me.summary}
            </motion.p>
          </div>
          <motion.div 
            className="hero-actions"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <motion.a 
              className="btn primary" 
              href="#projects"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View Projects
            </motion.a>
            <motion.a 
              className="btn" 
              href={me.linkedin} 
              target="_blank" 
              rel="noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              LinkedIn
            </motion.a>
            <motion.a 
              className="btn" 
              href={me.github} 
              target="_blank" 
              rel="noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              GitHub
            </motion.a>
          </motion.div>
          <motion.div 
            className="hero-stack"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            {me.stacks.map((s, index) => (
              <motion.span 
                key={s} 
                className="badge"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.9 + index * 0.1 }}
                whileHover={{ scale: 1.1, y: -2 }}
              >
                {s}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>
        <motion.div 
          className="hero-highlights floating-animation"
          variants={highlightsVariants}
        >
          <div className="card hero-highlights-card">
            <motion.h3 
              className="hero-highlights-title"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Highlights
            </motion.h3>
            <ul className="hero-highlights-list">
              {me.highlights.map((h,i)=>(
                <motion.li 
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 + i * 0.1 }}
                  whileHover={{ x: 4 }}
                >
                  {h}
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
