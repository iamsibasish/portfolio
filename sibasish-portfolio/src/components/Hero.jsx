import { motion } from "framer-motion";

export default function Hero({ me }){
  return (
    <section className="hero" id="top">
      <div className="hero-blob"></div>
      <div className="container hero-content">
        <motion.div initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} transition={{duration:.6}}>
          <h1>Hi, I'm <span style={{background: 'linear-gradient(90deg,#8a5cff,#00e0ff)', WebkitBackgroundClip:'text', color:'transparent'}}>Sibasish</span>.<br/>I design resilient backend systems.</h1>
          <p className="kv">{me.summary}</p>
          <div style={{display:'flex', gap:12, flexWrap:'wrap', marginTop:16}}>
            <a className="btn primary" href="#projects">View Projects</a>
            <a className="btn" href={me.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
            <a className="btn" href={me.github} target="_blank" rel="noreferrer">GitHub</a>
          </div>
          <div className="stack">
            {me.stacks.map(s => <span key={s} className="badge">{s}</span>)}
          </div>
        </motion.div>
        <motion.div initial={{opacity:0, x:20}} animate={{opacity:1, x:0}} transition={{duration:.6, delay:.1}}>
          <div className="card" style={{textAlign:'center'}}>
            <h3>Highlights</h3>
            <ul style={{textAlign:'left', marginTop:10}}>
              {me.highlights.map((h,i)=>(<li key={i}>{h}</li>))}
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
