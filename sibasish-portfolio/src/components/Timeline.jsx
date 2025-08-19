export default function Timeline({ items }){
  return (
    <div className="timeline">
      {items.map((it, idx)=>(
        <div key={idx} className="timeline-item card">
          <h3>{it.role} · {it.company}</h3>
          <div className="kv">{it.period}</div>
          <ul>{it.bullets.map((b,i)=><li key={i}>{b}</li>)}</ul>
        </div>
      ))}
    </div>
  )
}
