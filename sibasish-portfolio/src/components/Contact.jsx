import { motion } from "framer-motion";

export default function Contact({ contactInfo }) {
  const contactButtons = [
    {
      label: "Email",
      href: `mailto:${contactInfo.email}`,
      icon: "📧",
      ariaLabel: `Send email to ${contactInfo.email}`
    },
    {
      label: "LinkedIn",
      href: contactInfo.linkedin,
      icon: "💼",
      external: true,
      ariaLabel: "View LinkedIn profile (opens in new tab)"
    },
    {
      label: "GitHub",
      href: contactInfo.github,
      icon: "🔗",
      external: true,
      ariaLabel: "View GitHub profile (opens in new tab)"
    },
    {
      label: "Phone",
      href: `tel:${contactInfo.phone}`,
      icon: "📞",
      ariaLabel: `Call ${contactInfo.phone}`
    }
  ];

  return (
    <div className="contact-section">
      <motion.div 
        className="contact-card will-change-transform"
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ 
          duration: 0.8,
          ease: [0.25, 0.46, 0.45, 0.94]
        }}
        whileHover={{ 
          y: -4,
          transition: { duration: 0.3 }
        }}
      >
        <div className="contact-content">
          <motion.div 
            className="contact-header"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="contact-title text-gradient">Let's Connect</h3>
            <p className="contact-description text-muted">
              Ready to discuss opportunities or collaborate on innovative projects? 
              I'd love to hear from you.
            </p>
          </motion.div>
          
          <div className="contact-buttons">
            {contactButtons.map((button, index) => (
              <motion.a
                key={button.label}
                href={button.href}
                className="contact-btn will-change-transform"
                target={button.external ? "_blank" : undefined}
                rel={button.external ? "noreferrer" : undefined}
                aria-label={button.ariaLabel}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ 
                  delay: index * 0.15, 
                  duration: 0.6,
                  ease: [0.25, 0.46, 0.45, 0.94]
                }}
                whileHover={{ 
                  y: -4,
                  scale: 1.05,
                  transition: { duration: 0.3 }
                }}
                whileTap={{ 
                  y: -2,
                  scale: 0.98,
                  transition: { duration: 0.1 }
                }}
              >
                <motion.span 
                  className="contact-btn-icon" 
                  aria-hidden="true"
                  whileHover={{ 
                    scale: 1.2,
                    rotate: 5,
                    transition: { duration: 0.2 }
                  }}
                >
                  {button.icon}
                </motion.span>
                <span className="contact-btn-text">{button.label}</span>
                {button.external && (
                  <motion.span 
                    className="contact-btn-external" 
                    aria-hidden="true"
                    whileHover={{ 
                      x: 2, 
                      y: -2,
                      transition: { duration: 0.2 }
                    }}
                  >
                    ↗
                  </motion.span>
                )}
              </motion.a>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}