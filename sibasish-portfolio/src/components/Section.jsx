import { motion } from "framer-motion";

const sectionVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      staggerChildren: 0.1,
      ease: "easeOut"
    }
  }
};

const titleVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

const contentVariants = {
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

export default function Section({ id, title, children, extra }){
  return (
    <motion.section 
      className="section" 
      id={id}
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      aria-labelledby={`${id}-heading`}
    >
      <div className="container">
        <motion.div 
          className="section-title"
          variants={titleVariants}
        >
          <span className="dot" aria-hidden="true"></span>
          <h2 id={`${id}-heading`} className="text-gradient">{title}</h2>
          {extra}
        </motion.div>
        <motion.div 
          className="section-content"
          variants={contentVariants}
        >
          {children}
        </motion.div>
      </div>
    </motion.section>
  )
}
