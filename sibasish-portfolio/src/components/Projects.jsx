import { useMemo, useState } from "react";
import { projects } from "../data";

export default function Projects(){
  const [q, setQ] = useState("");
  const filtered = useMemo(()=>{
    const t = q.trim().toLowerCase();
    if(!t) return projects;
    return projects.filter(p=> [p.title, p.period, p.blurb, ...p.tags].join(" ").toLowerCase().includes(t));
  }, [q]);
  return (
    <div className="grid">
      <input className="search" placeholder="Search projects… (e.g. Kafka, tokenization, OTel)" value={q} onChange={e=>setQ(e.target.value)} />
      <div className="grid grid-3">
        {filtered.map((p,i)=>(
          <article key={i} className="project card">
            <img className="thumb" src={p.image} alt="" />
            <div className="meta">
              <div>
                <h3>{p.title}</h3>
                <div className="kv">{p.period}</div>
              </div>
            </div>
            <p>{p.blurb}</p>
            <div className="tags">{p.tags.map(t => <span key={t} className="tag">{t}</span>)}</div>
          </article>
        ))}
      </div>
    </div>
  )
}
