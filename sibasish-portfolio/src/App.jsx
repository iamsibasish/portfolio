import "./styles.css";
import { me, experience, education } from "./data";
import { useTheme } from "./contexts/ThemeContext";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Section from "./components/Section";
import Projects from "./components/Projects";
import Timeline from "./components/Timeline";

export default function App(){
  const { theme } = useTheme();
  
  return (
    <div data-theme={theme}>
      <Nav/>
      <Hero me={me}/>

      <Section id="about" title="About">
        <p>{me.summary}</p>
      </Section>

      <Section id="projects" title="Featured Projects" extra={<span className="kv">(3)</span>}>
        <Projects/>
      </Section>

      <Section id="experience" title="Experience">
        <Timeline items={experience}/>
      </Section>

      <Section id="education" title="Education">
        <ul>
          {education.map((e,i)=>(
            <li key={i}><strong>{e.school}</strong> — {e.degree} <span className="kv">({e.period})</span></li>
          ))}
        </ul>
      </Section>

      <Section id="contact" title="Contact">
        <div className="card" style={{display:'flex', gap:16, flexWrap:'wrap'}}>
          <a className="btn primary" href={`mailto:${me.email}`}>Email</a>
          <a className="btn" href={me.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
          <a className="btn" href={me.github} target="_blank" rel="noreferrer">GitHub</a>
          <span className="kv">Phone: {me.phone}</span>
        </div>
      </Section>

      <footer className="footer">© {new Date().getFullYear()} {me.name}. Crafted with React, Vite, and a sprinkle of motion.</footer>
    </div>
  )
}
