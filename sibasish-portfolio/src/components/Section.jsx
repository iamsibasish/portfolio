export default function Section({ id, title, children, extra }){
  return (
    <section className="section" id={id}>
      <div className="container">
        <div className="section-title"><span className="dot"></span><h2>{title}</h2>{extra}</div>
        {children}
      </div>
    </section>
  )
}
