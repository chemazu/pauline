"use client";

import { useEffect, useMemo, useState } from "react";

/**
 * ART PORTFOLIO — Next.js App Router + TypeScript
 * Place this file at: app/page.tsx
 * No extra dependencies required.
 *
 * QUICK CUSTOMIZATION:
 * 1. Replace ARTIST with your details.
 * 2. Replace the sample image URLs in PROJECTS with photos of your own work.
 * 3. Change the email link and Instagram URL.
 *
 * Images below are DEMO placeholders and are not represented as your artwork.
 */

const ARTIST = {
  name: "Mazart Studios",
  monogram: "YN",
  location: "Lagos, Nigeria",
  email: "hello@mazartstudios.com",
  instagram: "https://www.instagram.com//",
  introduction:
    "We believe art doesn't need a reason to exist. At Mazart Studio, we want more people to experience and enjoy art, while creating opportunities for emerging artists to share their work, grow, and reach new audiences.",
};

type Category = "Portraits" | "Abstract" | "Mixed media";

type Project = {
  id: number;
  title: string;
  category: Category;
  year: string;
  medium: string;
  image: string;
  background: string;
  aspect: "portrait" | "landscape";
};

const PROJECTS: Project[] = [
  {
    id: 1,
    title: "The Things We Carry",
    category: "Abstract",
    year: "2026",
    medium: "Acrylic and mixed media",
    image:
      "https://images.unsplash.com/photo-1541961017774-22349e4a1262?auto=format&fit=crop&w=1400&q=85",
    background: "#ce684e",
    aspect: "portrait",
  },
  {
    id: 2,
    title: "In Full Bloom",
    category: "Portraits",
    year: "2026",
    medium: "Oil on canvas",
    image:
      "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&w=1400&q=85",
    background: "#99a7a2",
    aspect: "portrait",
  },
  {
    id: 3,
    title: "A Little More Colour",
    category: "Abstract",
    year: "2025",
    medium: "Acrylic on canvas",
    image:
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=1400&q=85",
    background: "#d8af82",
    aspect: "landscape",
  },
  {
    id: 4,
    title: "Sunday Stories",
    category: "Mixed media",
    year: "2025",
    medium: "Collage and ink",
    image:
      "https://images.unsplash.com/photo-1561214115-f2f134cc4912?auto=format&fit=crop&w=1400&q=85",
    background: "#a6aaa0",
    aspect: "portrait",
  },
  {
    id: 5,
    title: "Soft Places",
    category: "Portraits",
    year: "2025",
    medium: "Mixed media on paper",
    image:
      "https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?auto=format&fit=crop&w=1400&q=85",
    background: "#8f866f",
    aspect: "portrait",
  },
  {
    id: 6,
    title: "Between Here and There",
    category: "Mixed media",
    year: "2024",
    medium: "Acrylic on canvas",
    image:
      "https://images.unsplash.com/photo-1549490349-8643362247b5?auto=format&fit=crop&w=1400&q=85",
    background: "#c7a07c",
    aspect: "landscape",
  },
];

const FILTERS = ["All works", "Portraits", "Abstract", "Mixed media"] as const;
type Filter = (typeof FILTERS)[number];

function ArrowIcon({ diagonal = false }: { diagonal?: boolean }) {
  return diagonal ? (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
    >
      <path
        d="M5 19 19 5M7 5h12v12"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ) : (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
    >
      <path
        d="M4 12h16m-7-7 7 7-7 7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
    >
      <path d="m5 5 14 14M19 5 5 19" strokeLinecap="round" />
    </svg>
  );
}

export default function HomePage() {
  const [filter, setFilter] = useState<Filter>("All works");
  const [selected, setSelected] = useState<Project | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [year, setYear] = useState(2026);

  const visibleProjects = useMemo(
    () =>
      filter === "All works"
        ? PROJECTS
        : PROJECTS.filter((project) => project.category === filter),
    [filter],
  );

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setSelected(null);
        setMenuOpen(false);
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    document.body.style.overflow = selected ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [selected]);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <main className="folio" id="top">
      <header className="site-header">
        <a
          className="wordmark"
          href="#top"
          aria-label={`${ARTIST.name} homepage`}
        >
          <span className="wordmark-symbol" aria-hidden="true">
            ✳
          </span>
          <span>
            {ARTIST.name}
            <small>Visual artist & maker</small>
          </span>
        </a>

        <nav
          className={`nav-links ${menuOpen ? "nav-open" : ""}`}
          aria-label="Main navigation"
        >
          <a href="#work" onClick={() => setMenuOpen(false)}>
            Work
          </a>
          <a href="#about" onClick={() => setMenuOpen(false)}>
            About
          </a>
          <a href="#contact" onClick={() => setMenuOpen(false)}>
            Contact
          </a>
        </nav>

        <a className="header-cta" href={`mailto:${ARTIST.email}`}>
          Let's talk <ArrowIcon diagonal />
        </a>
        <button
          className="menu-toggle"
          type="button"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-expanded={menuOpen}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          <span />
          <span />
        </button>
      </header>

      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-topline">
          <span>
            <span className="live-dot" /> Ars gratia artis
          </span>
          <span>Based in {ARTIST.location}</span>
        </div>
        <h1 id="hero-title">
          Making space
          <br />
          for <em>experiencing</em>
          <span className="hero-asterisk" aria-hidden="true">
            ✳
          </span>
        </h1>
        <div className="hero-bottomline">
          <p>Stories, expressions, and pieces of the human experience.</p>

          <a href="#work" className="text-link">
            Explore our work{" "}
            <span className="round-arrow">
              <ArrowIcon diagonal />
            </span>
          </a>
        </div>
      </section>

      <section className="hero-art" aria-label="Featured artwork">
        <div
          className="hero-art-image"
          style={{ backgroundColor: PROJECTS[0].background }}
        >
          {/* Replace this sample image with your best artwork. */}
          <img
            src={PROJECTS[0].image}
            alt="Colourful sample abstract painting"
          />
          <span className="image-stamp">
            ART IS A WAY
            <br />
            OF SEEING ✳
          </span>
        </div>
        <div className="hero-art-caption">
          <span>01 / Featured piece</span>
          <span>
            {PROJECTS[0].title} · {PROJECTS[0].year}
          </span>
        </div>
      </section>

      <section id="work" className="work-section" aria-labelledby="work-title">
        <div className="section-heading">
          <div>
            <p className="eyebrow">01 — The collection</p>
            <h2 id="work-title">
              Selected <em>works.</em>
            </h2>
          </div>
          <p className="section-desc">
            A growing collection of experiments, observations, and stories told
            in colour.
          </p>
        </div>

        <div className="work-toolbar" aria-label="Filter artworks">
          <div className="filters">
            {FILTERS.map((item) => (
              <button
                type="button"
                key={item}
                onClick={() => setFilter(item)}
                className={filter === item ? "filter active" : "filter"}
                aria-pressed={filter === item}
              >
                {item}
              </button>
            ))}
          </div>
          <span className="work-count">
            {String(visibleProjects.length).padStart(2, "0")} pieces
          </span>
        </div>

        <div className="art-grid">
          {visibleProjects.map((project, index) => (
            <button
              className={`art-card ${index % 3 === 1 ? "art-card-offset" : ""}`}
              type="button"
              key={project.id}
              onClick={() => setSelected(project)}
              aria-label={`View ${project.title}`}
            >
              <span
                className={`art-frame ${project.aspect}`}
                style={{ backgroundColor: project.background }}
              >
                <img
                  src={project.image}
                  alt={`Sample artwork for ${project.title}`}
                  loading="lazy"
                />
                <span className="view-art" aria-hidden="true">
                  View artwork <ArrowIcon diagonal />
                </span>
              </span>
              <span className="art-info">
                <span>
                  <strong>{project.title}</strong>
                  <small>
                    {project.category} · {project.medium}
                  </small>
                </span>
                <span className="art-year">{project.year}</span>
              </span>
            </button>
          ))}
        </div>
      </section>

      <section
        id="about"
        className="about-section"
        aria-labelledby="about-title"
      >
        <div className="about-label">
          <span className="live-dot" /> 02 — A little about me
        </div>
        <div className="about-body">
          <h2 id="about-title">
            A curious mind.
            <br />
            <em>Colourful hands.</em>
          </h2>
          <div className="about-copy">
            <p>{ARTIST.introduction}</p>

            <a className="light-link" href={`mailto:${ARTIST.email}`}>
              More about our practice <ArrowIcon diagonal />
            </a>
          </div>
        </div>
        <span className="about-decoration" aria-hidden="true">
          ✳
        </span>
      </section>

      <section
        id="contact"
        className="contact-section"
        aria-labelledby="contact-title"
      >
        <p className="eyebrow">03 — Get in touch</p>
        <h2 id="contact-title">
          Have something
          <br />
          <em>in mind?</em>
        </h2>
        <div className="contact-bottom">
          <p>
            Commissions, collaborations, lovely ideas —<br />
            we would love to hear from you.
          </p>
          <a className="email-button" href={`mailto:${ARTIST.email}`}>
            Let's make something <ArrowIcon diagonal />
          </a>
        </div>
      </section>

      <footer className="footer">
        <a className="footer-brand" href="#top">
          {ARTIST.name} <span>✳</span>
        </a>
        <div className="footer-right">
          <a href={ARTIST.instagram} target="_blank" rel="noreferrer">
            Instagram <ArrowIcon diagonal />
          </a>
          <a href={`mailto:${ARTIST.email}`}>
            Email <ArrowIcon diagonal />
          </a>
          <a href="#top">Back to top ↑</a>
        </div>
        <div className="footer-bottom">
          <span>
            © {year} {ARTIST.name}. All rights reserved.
          </span>
          <span>Made with a little wonder.</span>
        </div>
      </footer>

      {selected && (
        <div
          className="modal-backdrop"
          role="presentation"
          onClick={() => setSelected(null)}
        >
          <div
            className="art-modal"
            role="dialog"
            aria-modal="true"
            aria-label={selected.title}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              className="modal-close"
              type="button"
              aria-label="Close artwork"
              onClick={() => setSelected(null)}
            >
              <CloseIcon />
            </button>
            <div
              className="modal-art"
              style={{ backgroundColor: selected.background }}
            >
              <img
                src={selected.image}
                alt={`Sample artwork for ${selected.title}`}
              />
            </div>
            <div className="modal-info">
              <div>
                <span className="eyebrow">Artwork details</span>
                <h3>{selected.title}</h3>
              </div>
              <p>
                {selected.medium}
                <br />
                {selected.category} · {selected.year}
              </p>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400;1,500&display=swap');
        .folio { --paper: #f6f4ee; --ink: #263328; --muted: #777f71; --line: #d7d9cf; --rust: #cf7050; min-height:100vh; background:var(--paper); color:var(--ink); font-family:'DM Sans',Arial,sans-serif; -webkit-font-smoothing:antialiased; }
        .folio * { box-sizing:border-box; }
        .folio a { color:inherit; text-decoration:none; }
        .folio button { font:inherit; }
        .folio svg { width:19px; height:19px; flex-shrink:0; }
        .folio ::selection { background:#d7a38d; color:var(--ink); }
        .site-header { height:100px; margin:0 auto; max-width:1640px; padding:0 5.5%; display:flex; align-items:center; justify-content:space-between; border-bottom:1px solid var(--line); position:relative; z-index:5; }
        .wordmark { display:flex; align-items:center; gap:12px; font-size:18px; font-weight:700; letter-spacing:-.06em; line-height:1; text-transform:uppercase; }
        .wordmark-symbol { font-size:34px; font-weight:400; color:var(--rust); line-height:1; }
        .wordmark small { display:block; margin-top:8px; font-size:9px; font-weight:500; letter-spacing:.15em; color:var(--muted); text-transform:uppercase; }
        .nav-links { display:flex; gap:44px; margin-left:40px; }
        .nav-links a { font-size:13px; transition:color .25s; }
        .nav-links a:hover,.footer a:hover { color:var(--rust); }
        .header-cta { display:flex; align-items:center; gap:22px; border:1px solid var(--ink); border-radius:100px; padding:13px 17px 13px 22px; font-size:12px; font-weight:600; transition:background .25s,color .25s; }
        .header-cta:hover { background:var(--ink);color:var(--paper); }
        .menu-toggle { display:none; background:none; border:0; padding:12px; cursor:pointer; }
        .menu-toggle span { display:block; height:1.5px; width:24px; margin:6px 0; background:var(--ink); }
        .hero { max-width:1640px; padding:60px 5.5% 82px; margin:auto; }
        .hero-topline,.hero-bottomline { display:flex; align-items:center; justify-content:space-between; }
        .hero-topline { color:#697365; font-size:12px; letter-spacing:.025em; }
        .hero-topline > span:first-child { display:flex; align-items:center; gap:10px; }
        .live-dot { display:inline-block; width:7px; height:7px; flex-shrink:0; border-radius:100%; background:#c66e50; }
        .hero h1 { position:relative; font-weight:400; font-family:'Playfair Display',Georgia,serif; font-size:clamp(76px,10.35vw,170px); line-height:1.02; letter-spacing:-.072em; margin:52px 0 38px; }
        .hero h1 em,.section-heading h2 em,.about-section h2 em,.contact-section h2 em { font-weight:400; font-style:italic; color:var(--rust); }
        .hero-asterisk { font-family:Arial,sans-serif; font-size:clamp(42px,6vw,94px); position:absolute; transform:rotate(-12deg); margin:14px 0 0 35px; color:#d7a582; font-weight:400; letter-spacing:0; }
        .hero-bottomline { align-items:end; }
        .hero-bottomline p { margin:0; font-size:14px; line-height:1.8; color:var(--muted); }
        .text-link { display:inline-flex; gap:20px; align-items:center; font-size:13px; font-weight:600; }
        .round-arrow { display:grid; place-items:center; width:49px; height:49px; border:1px solid var(--ink); border-radius:50%; transition:transform .25s,background .25s,color .25s; }
        .text-link:hover .round-arrow { transform:rotate(45deg); background:var(--ink); color:var(--paper); }
        .hero-art { max-width:1640px; margin:auto; padding:0 5.5%; }
        .hero-art-image { height:clamp(330px,52vw,750px); position:relative; overflow:hidden; }
        .hero-art-image img { display:block; width:100%; height:100%; object-fit:cover; object-position:center 48%; }
        .image-stamp { position:absolute; width:126px; height:126px; right:34px; top:34px; border-radius:50%; background:var(--paper); color:var(--ink); display:grid; place-items:center; text-align:center; line-height:1.5; font-size:10px; font-weight:700; letter-spacing:.12em; transform:rotate(13deg); }
        .hero-art-caption { display:flex; justify-content:space-between; color:var(--muted); font-size:11px; padding-top:16px; }
        .work-section { max-width:1640px; margin:0 auto; padding:145px 5.5% 170px; }
        .section-heading { display:flex; justify-content:space-between; align-items:end; gap:32px; }
        .eyebrow { text-transform:uppercase; letter-spacing:.15em; font-size:10px; font-weight:600; margin:0 0 24px; }
        .section-heading h2,.about-section h2,.contact-section h2 { font-family:'Playfair Display',Georgia,serif; font-size:clamp(60px,7vw,112px); line-height:1.13; letter-spacing:-.065em; font-weight:400; margin:0; }
        .section-desc { max-width:260px; font-size:13px; line-height:1.9; color:var(--muted); margin:0 0 10px; }
        .work-toolbar { border-top:1px solid var(--line); margin-top:62px; padding:25px 0 36px; display:flex; justify-content:space-between; align-items:center; gap:15px; }
        .filters { display:flex; flex-wrap:wrap; gap:8px; }
        .filter { border:1px solid transparent; border-radius:50px; background:transparent; color:#667063; padding:10px 16px; font-size:12px; cursor:pointer; transition:all .2s; }
        .filter:hover { border-color:#adb4a8; }
        .filter.active { border-color:var(--ink); background:var(--ink); color:white; }
        .work-count { font-size:11px; color:var(--muted); white-space:nowrap; }
        .art-grid { display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); column-gap:32px; row-gap:70px; align-items:start; }
        .art-card { text-align:left; width:100%; display:block; padding:0; background:transparent; border:0; cursor:pointer; color:var(--ink); }
        .art-card-offset { margin-top:100px; }
        .art-frame { display:block; position:relative; overflow:hidden; aspect-ratio:1.11; }
        .art-frame.portrait { aspect-ratio:1.04; }
        .art-frame.landscape { aspect-ratio:1.24; }
        .art-frame img { height:100%; width:100%; object-fit:cover; display:block; transition:transform .8s cubic-bezier(.2,.7,.2,1), filter .4s; }
        .art-card:hover .art-frame img { transform:scale(1.065); filter:saturate(1.08); }
        .view-art { position:absolute; bottom:22px; right:22px; background:var(--paper); border-radius:50px; display:flex; align-items:center; gap:15px; padding:13px 16px; font-size:11px; opacity:0; transform:translateY(10px); transition:opacity .25s,transform .25s; }
        .art-card:hover .view-art,.art-card:focus-visible .view-art { opacity:1;transform:translateY(0); }
        .art-info { display:flex; justify-content:space-between; align-items:start; gap:15px; padding-top:20px; }
        .art-info strong { display:block; font-family:'Playfair Display',Georgia,serif; font-size:26px; letter-spacing:-.025em; font-weight:500; }
        .art-info small { display:block; color:var(--muted); margin-top:8px; font-size:11px; }
        .art-year { color:var(--muted); font-size:11px; padding-top:7px; }
        .about-section { position:relative; background:#27382d; color:#f6f4ee; padding:88px max(5.5%,calc((100% - 1460px)/2)) 128px; overflow:hidden; }
        .about-label { display:flex; align-items:center; gap:10px; text-transform:uppercase; font-size:10px; letter-spacing:.14em; color:#bec9ba; }
        .about-body { display:flex; justify-content:space-between; gap:40px; align-items:end; margin-top:68px; position:relative; z-index:1; }
        .about-section h2 { font-size:clamp(55px,6.9vw,106px); }
        .about-section h2 em { color:#e3a88c; }
        .about-copy { width:300px; flex-shrink:0; padding-bottom:10px; }
        .about-copy p { color:#d5ddd2; font-size:13px; line-height:2; margin:0 0 19px; }
        .light-link { margin-top:25px; display:inline-flex; align-items:center; gap:20px; padding-bottom:9px; border-bottom:1px solid #cfd9cb; font-size:12px; }
        .light-link:hover { color:#e3a88c; }
        .about-decoration { position:absolute; bottom:-140px; left:43%; color:#405747; opacity:.55; font-size:390px; line-height:1; font-family:Arial,sans-serif; transform:rotate(8deg); pointer-events:none; }
        .contact-section { max-width:1640px; margin:auto; padding:160px 5.5% 150px; }
        .contact-section h2 { font-size:clamp(72px,9.5vw,150px); }
        .contact-bottom { margin-top:60px; display:flex; align-items:end; justify-content:space-between; gap:30px; }
        .contact-bottom p { margin:0; font-size:13px; color:var(--muted); line-height:1.9; }
        .email-button { background:var(--ink); color:white!important; border-radius:50px; padding:20px 23px 20px 29px; display:flex; align-items:center; gap:35px; font-size:13px; transition:background .25s,transform .25s; }
        .email-button:hover { background:var(--rust); transform:translateY(-3px); }
        .footer { padding:55px 5.5% 32px; max-width:1640px; margin:auto; border-top:1px solid var(--line); display:flex; justify-content:space-between; flex-wrap:wrap; gap:30px; }
        .footer-brand { font-size:25px; font-weight:700; letter-spacing:-.065em; text-transform:uppercase; }
        .footer-brand span { color:var(--rust);font-weight:400; }
        .footer-right { display:flex; align-items:center; gap:35px; font-size:12px; }
        .footer-right a { display:flex; gap:6px; align-items:center; }
        .footer-right svg { width:15px;height:15px; }
        .footer-bottom { display:flex; flex-basis:100%; justify-content:space-between; padding-top:55px; color:var(--muted); font-size:10px; }
        .modal-backdrop { position:fixed; inset:0; background:rgba(13,20,15,.88); z-index:100; display:flex; align-items:center; justify-content:center; padding:34px; backdrop-filter:blur(8px); }
        .art-modal { background:var(--paper); color:var(--ink); width:min(90vw,920px); max-height:92vh; position:relative; overflow:auto; }
        .modal-close { position:absolute; top:18px; right:18px; border:0; display:grid; place-items:center; background:var(--paper); z-index:2; width:45px; height:45px; border-radius:50%; cursor:pointer; }
        .modal-art { width:100%; height:min(64vh,610px); }
        .modal-art img { width:100%; height:100%; object-fit:contain; display:block; }
        .modal-info { padding:26px 35px 35px; display:flex; justify-content:space-between; gap:20px; align-items:end; }
        .modal-info .eyebrow { margin:0 0 12px; color:var(--muted); }
        .modal-info h3 { margin:0; font-family:'Playfair Display',Georgia,serif; font-weight:400; font-size:38px; }
        .modal-info p { font-size:12px; line-height:1.8; color:var(--muted); margin:0; text-align:right; }
        @media (max-width: 900px) {
          .site-header { height:82px; }
          .hero { padding-top:48px; padding-bottom:60px; }
          .hero h1 { margin:57px 0 50px; }
          .work-section { padding-top:100px; padding-bottom:110px; }
          .about-body { display:block; }
          .about-copy { margin-top:40px; width:min(500px,100%); }
          .about-decoration { left:auto;right:-30px;bottom:-130px; }
          .about-section { padding-top:80px; padding-bottom:100px; }
        }
        @media (max-width: 650px) {
          .site-header { padding:0 6%; }
          .header-cta { display:none; }
          .menu-toggle { display:block; }
          .nav-links { display:none; position:absolute; top:81px; left:0; right:0; margin:0; padding:24px 6% 32px; background:var(--paper); border-bottom:1px solid var(--line); flex-direction:column; gap:24px; }
          .nav-links.nav-open { display:flex; }
          .nav-links a { font-size:17px; }
          .hero { padding:45px 6% 58px; }
          .hero-topline { font-size:10px; gap:10px; }
          .hero-topline > span:last-child { max-width:130px;text-align:right;line-height:1.6; }
          .hero h1 { font-size:clamp(64px,12.1vw,95px); letter-spacing:-.074em; margin:70px 0 52px; }
          .hero-asterisk { font-size:40px; margin:5px 0 0 10px; }
          .hero-bottomline { align-items:end; gap:10px; }
          .hero-bottomline p { font-size:11px; }
          .text-link { font-size:11px; gap:9px; white-space:nowrap; }
          .round-arrow { width:37px;height:37px; }
          .hero-art { padding:0 6%; }
          .hero-art-image { height:440px; }
          .image-stamp { width:93px;height:93px; right:14px;top:14px;font-size:8px; }
          .hero-art-caption { font-size:9px; }
          .work-section { padding:105px 6% 115px; }
          .section-heading { display:block; }
          .section-heading h2,.contact-section h2 { font-size:clamp(57px,12vw,90px); }
          .section-desc { margin-top:22px; }
          .work-toolbar { margin-top:39px; align-items:start; flex-direction:column-reverse; gap:13px; }
          .filters { gap:5px; }
          .filter { padding:9px 12px; font-size:10px; }
          .art-grid { grid-template-columns:1fr; gap:43px; }
          .art-card-offset { margin-top:0; }
          .art-info strong { font-size:24px; }
          .about-section { padding:76px 6% 92px; }
          .about-body { margin-top:42px; }
          .about-section h2 { font-size:clamp(51px,10.8vw,76px); }
          .about-decoration { font-size:250px; bottom:-75px; }
          .contact-section { padding:110px 6% 112px; }
          .contact-bottom { align-items:start;flex-direction:column;gap:28px;margin-top:42px; }
          .footer { padding:38px 6% 28px;gap:23px; }
          .footer-right { flex-wrap:wrap; gap:16px 27px; }
          .footer-bottom { padding-top:29px; gap:20px;flex-wrap:wrap;line-height:1.6; }
          .modal-backdrop { padding:12px; }
          .art-modal { width:100%; }
          .modal-art { height:50vh; }
          .modal-info { padding:22px; display:block; }
          .modal-info h3 { font-size:30px; }
          .modal-info p { margin-top:14px;text-align:left; }
        }
        @media (prefers-reduced-motion:reduce) {
          .folio *, .folio *::before, .folio *::after { scroll-behavior:auto!important; transition:none!important; animation:none!important; }
        }
      `}</style>
    </main>
  );
}
