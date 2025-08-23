import "./styles.css";
import { me, experience, education } from "./data";
import { useTheme } from "./contexts/ThemeContext";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Section from "./components/Section";
import Projects from "./components/Projects";
import Timeline from "./components/Timeline";
import Contact from "./components/Contact";

export default function App(){
  const { theme } = useTheme();
  
  return (
    <div data-theme={theme}>
      <Nav/>
      <Hero me={me}/>

      <Section id="about" title="About">
        <p className="text-muted">{me.summary}</p>
      </Section>

      <Section id="projects" title="Featured Projects">
        <Projects/>
      </Section>

      <Section id="experience" title="Experience">
        <Timeline items={experience}/>
      </Section>

      <Section id="education" title="Education">
        <div className="card">
          <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
            {education.map((e,i)=>(
              <li key={i} style={{ 
                padding: '16px 0', 
                borderBottom: i < education.length - 1 ? '1px solid var(--border)' : 'none' 
              }}>
                <strong className="visual-emphasis">{e.school}</strong> — {e.degree} 
                <span className="text-subtle"> ({e.period})</span>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <section id="contact" className="section">
        <div className="container">
          <Contact contactInfo={me} />
        </div>
      </section>

      <footer className="footer">© {new Date().getFullYear()} {me.name}. Built with React, Vite, and Framer Motion.</footer>
    </div>
  )
}
