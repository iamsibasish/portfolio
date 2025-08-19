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
      <div className="contact-card">
        <div className="contact-content">
          <div className="contact-header">
            <h3 className="contact-title">Let's Connect</h3>
            <p className="contact-description">
              Ready to discuss opportunities or collaborate on exciting projects? 
              I'd love to hear from you.
            </p>
          </div>
          
          <div className="contact-buttons">
            {contactButtons.map((button, index) => (
              <motion.a
                key={button.label}
                href={button.href}
                className="contact-btn"
                target={button.external ? "_blank" : undefined}
                rel={button.external ? "noreferrer" : undefined}
                aria-label={button.ariaLabel}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ 
                  y: -2,
                  transition: { duration: 0.2 }
                }}
                whileTap={{ 
                  y: 0,
                  transition: { duration: 0.1 }
                }}
              >
                <span className="contact-btn-icon" aria-hidden="true">
                  {button.icon}
                </span>
                <span className="contact-btn-text">{button.label}</span>
                {button.external && (
                  <span className="contact-btn-external" aria-hidden="true">↗</span>
                )}
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}