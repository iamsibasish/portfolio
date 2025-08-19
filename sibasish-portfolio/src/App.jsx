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
        <p>{me.summary}</p>
      </Section>

      <Section id="projects" title="Featured Projects">
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

      <section id="contact" className="section">
        <div className="container">
          <Contact contactInfo={me} />
        </div>
      </section>

      <footer className="footer">© {new Date().getFullYear()} {me.name}. Crafted with React, Vite, and a sprinkle of motion.</footer>
    </div>
  )
}
