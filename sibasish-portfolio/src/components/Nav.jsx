export default function Nav(){
  return (
    <nav className="nav">
      <div className="nav-inner">
        <a href="#top" style={{fontWeight:700,letterSpacing:.3}}>Sibasish</a>
        <div className="nav-links">
          <a href="#about">About</a>
          <a href="#projects">Projects</a>
          <a href="#experience">Experience</a>
          <a href="#education">Education</a>
          <a href="#contact">Contact</a>
        </div>
      </div>
    </nav>
  )
}
