import { motion } from "framer-motion";

const timelineVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      ease: "easeOut"
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, x: -30, scale: 0.95 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
};

const bulletVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut"
    }
  }
};

export default function Timeline({ items }){
  return (
    <motion.div 
      className="timeline"
      variants={timelineVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      role="list"
      aria-label="Professional experience timeline"
    >
      {items.map((it, idx)=>(
        <motion.article 
          key={idx} 
          className="timeline-item card will-change-transform"
          variants={itemVariants}
          whileHover={{ 
            x: 12,
            transition: { duration: 0.3 }
          }}
          role="listitem"
          aria-labelledby={`experience-${idx}-title`}
        >
          <header className="timeline-header">
            <motion.h3
              id={`experience-${idx}-title`}
              className="visual-emphasis"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              {it.role} · {it.company}
            </motion.h3>
            <div className="kv text-subtle" aria-label={`Employment period: ${it.period}`}>
              {it.period}
            </div>
          </header>
          <motion.ul 
            className="timeline-bullets"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.1,
                  delayChildren: 0.2
                }
              }
            }}
            role="list"
            aria-label="Key achievements and responsibilities"
          >
            {it.bullets.map((b,i)=>(
              <motion.li 
                key={i}
                variants={bulletVariants}
                whileHover={{ 
                  x: 4,
                  transition: { duration: 0.2 }
                }}
                role="listitem"
              >
                {b}
              </motion.li>
            ))}
          </motion.ul>
        </motion.article>
      ))}
    </motion.div>
  )
}
