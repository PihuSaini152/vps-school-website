import './PageHero.css'
export default function PageHero({eyebrow,title,subtitle}) {
  return <section className="page-hero"><div className="container"><span className="eyebrow">{eyebrow}</span><h1>{title}</h1><p>{subtitle}</p></div></section>
}
