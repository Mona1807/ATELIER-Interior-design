import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';

const projects = [
  {
    title: 'Casa No. 07',
    type: 'Residential / Interior',
    image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1400&q=85',
  },
  {
    title: 'Northline House',
    type: 'Architecture / Exterior',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=85',
  },
  {
    title: 'Monument Studio',
    type: 'Commercial / Workspace',
    image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1400&q=85',
  },
];

function Reveal({ children, className = '' }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`reveal ${visible ? 'is-visible' : ''} ${className}`}>
      {children}
    </div>
  );
}

function BlueprintVisual() {
  return (
    <div className="blueprint-visual" aria-hidden="true">
      <div className="blueprint-visual__grid" />
      <svg viewBox="0 0 760 520" className="blueprint-visual__svg">
        <g className="blueprint-lines">
          <rect x="92" y="82" width="560" height="356" rx="2" />
          <line x1="300" y1="82" x2="300" y2="438" />
          <line x1="500" y1="82" x2="500" y2="438" />
          <line x1="92" y1="260" x2="300" y2="260" />
          <line x1="500" y1="290" x2="652" y2="290" />
          <path d="M190 260 A 60 60 0 0 1 250 200" />
          <path d="M300 356 A 56 56 0 0 0 356 412" />
          <path d="M500 210 A 55 55 0 0 1 555 265" />
          <circle cx="190" cy="168" r="30" />
          <circle cx="190" cy="168" r="9" />
          <rect x="350" y="130" width="100" height="62" />
          <rect x="352" y="300" width="98" height="70" />
          <line x1="110" y1="60" x2="635" y2="60" />
          <line x1="110" y1="458" x2="635" y2="458" />
          <line x1="70" y1="100" x2="70" y2="420" />
          <line x1="675" y1="100" x2="675" y2="420" />
        </g>
        <g className="blueprint-dimensions">
          <text x="330" y="53">12.4 M</text>
          <text x="38" y="270" transform="rotate(-90 38 270)">8.6 M</text>
          <text x="112" y="475">GROUND FLOOR / ATELIER 01</text>
        </g>
      </svg>
      <div className="blueprint-visual__label">
        <span>01</span>
        AI GENERATED PLAN
      </div>
    </div>
  );
}

function RoomVisual() {
  return (
    <div className="room-visual" aria-hidden="true">
      <img
        className="room-visual__image"
        src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1800&q=85"
        alt=""
      />

      <div className="room-visual__glow" />

      <div className="room-visual__caption">
        <span>AI INTERIOR</span>
        <strong>Concept 04</strong>
      </div>
    </div>
  );
}

export default function LandingPage() {
  const [introDone, setIntroDone] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setIntroDone(true), 2100);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <main className={`atelier-home ${introDone ? 'intro-complete' : ''}`}>
      <section className="atelier-intro" aria-hidden="true">
        <div className="atelier-intro__top">
          <span>ATELIER / 01</span>
          <span>AI INTERIOR + BUILDING DESIGN</span>
        </div>
        <div className="atelier-intro__word">
          <span>A</span><span>T</span><span>E</span><span>L</span><span>I</span><span>E</span><span>R</span>
        </div>
        <div className="atelier-intro__bottom">
          <span>DESIGN / VISUALIZE / BUILD</span>
          <span>SCROLL TO EXPLORE</span>
        </div>
      </section>

      <header className="atelier-nav">
        <Link to="/" className="atelier-brand" aria-label="Atelier home">
          <span className="atelier-brand__symbol">A</span>
          <span>ATELIER</span>
        </Link>
        <nav className="atelier-nav__links">
          <a href="#capabilities">Capabilities</a>
          <a href="#projects">Projects</a>
          <a href="#process">Process</a>
          <a href="#about">About</a>
        </nav>
        <div className="atelier-nav__actions">
          <Link to="/login" className="atelier-nav__login">Log in</Link>
          <Link to="/register" className="atelier-pill atelier-pill--dark">Start designing <span>↗</span></Link>
        </div>
      </header>

      <section className="atelier-hero">
        <div className="atelier-hero__eyebrow">
          <span className="eyebrow-line" />
          AI INTERIOR &amp; ARCHITECTURE
        </div>
        <div className="atelier-hero__title-wrap">
          <h1>
            <span>Design your</span>
            <span className="title-indent">space <em>before</em></span>
            <span>you build it.</span>
          </h1>
          <div className="atelier-hero__aside">
            <p>From the first sketch to a finished visual — ATELIER turns ideas into spaces you can see, refine and share.</p>
            <Link to="/register" className="atelier-circle-cta">Explore AI <span>↗</span></Link>
          </div>
        </div>
        <div className="atelier-hero__visual">
          <RoomVisual />
          <div className="hero-coordinate">09° 55′ N / 78° 07′ E</div>
          <div className="hero-note">A new way to<br />imagine space.</div>
        </div>
        <div className="atelier-hero__meta">
          <span>01 — 04</span>
          <span>INTERIORS / BUILDINGS / VISUALS</span>
          <span>AI-POWERED DESIGN PLATFORM</span>
        </div>
      </section>

      <section id="capabilities" className="atelier-section atelier-capabilities">
        <Reveal>
          <div className="section-kicker">/ What we do</div>
          <div className="capabilities-head">
            <h2>One atelier.<br /><i>Infinite</i> possibilities.</h2>
            <p>Everything you need to imagine, design and communicate your next space — brought together in one intelligent workspace.</p>
          </div>
        </Reveal>
        <div className="capability-grid">
{[
  [
    '01',
    'AI Interior Design',
    'Turn an existing room into a complete design direction in seconds.',
    '✦',
    'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=85'
  ],
  [
    '02',
    'Building Generator',
    'Start with a plot and create floors, rooms and building concepts.',
    '⌂',
    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85'
  ],
  [
    '03',
    '2D → 3D Visualization',
    'Move from precise plans to immersive architectural views.',
    '◇',
    'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=85'
  ],
  [
    '04',
    'Materials & Styling',
    'Explore finishes, furniture and palettes matched to your concept.',
    '◌',
    'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1200&q=85'
  ],
].map(([number, title, text, icon, image]) => (
  <Reveal key={number} className="capability-card">
    <span className="capability-card__number">{number}</span>
    <span className="capability-card__icon">{icon}</span>

    <img
      className="capability-card__image"
      src={image}
      alt={title}
    />

    <h3>{title}</h3>
    <p>{text}</p>
    <span className="capability-card__arrow">↗</span>
  </Reveal>
))}
        </div>
      </section>

      <section id="projects" className="atelier-section atelier-projects">
  <Reveal>
    <div className="section-kicker">/ Selected work</div>

    <div className="projects-head">
      <h2>Ideas made<br /><i>visible.</i></h2>
      <p>
        Explore concepts created inside ATELIER — from intimate interiors
        to complete architectural studies.
      </p>
    </div>
  </Reveal>

  <div className="project-grid">
    {projects.map((project, index) => (
      <Reveal
        key={project.title}
        className={`project-card project-card--${index + 1}`}
      >
        <div className={`project-image ${project.imageClass}`}>
          <img
            src={project.image}
            alt={project.title}
            className="project-photo"
          />

          <span className="project-image__tag">
            {String(index + 1).padStart(2, '0')}
          </span>
        </div>

        <div className="project-card__info">
          <div>
            <h3>{project.title}</h3>
            <p>{project.type}</p>
          </div>
          <span>↗</span>
        </div>
      </Reveal>
    ))}
  </div>

  <div className="projects-footer">
    <span>More concepts / Coming from your imagination</span>
    <Link to="/register" className="atelier-text-link">
      Enter the studio ↗
    </Link>
  </div>
</section>

      <section id="process" className="atelier-section atelier-process">
        <Reveal>
          <div className="section-kicker">/ How it works</div>
          <div className="process-head">
            <h2>From <i>thought</i><br />to form.</h2>
            <p>A simple four-step flow that keeps the creative process fast, visual and under your control.</p>
          </div>
        </Reveal>
        <div className="process-grid">
          {[
            ['01', 'Describe', 'Tell ATELIER what you want. Upload a room, sketch or requirements.'],
            ['02', 'Generate', 'AI creates multiple visual directions and building concepts.'],
            ['03', 'Refine', 'Adjust style, layout, materials and details until it feels right.'],
            ['04', 'Visualize', 'Present realistic renders, plans and a clear design story.'],
          ].map(([n, t, d]) => (
            <Reveal key={n} className="process-item">
              <span>{n}</span>
              <div className="process-item__line" />
              <h3>{t}</h3>
              <p>{d}</p>
            </Reveal>
          ))}
        </div>
        <Reveal className="blueprint-wrap">
          <BlueprintVisual />
        </Reveal>
      </section>

      <section id="about" className="atelier-statement">
        <div className="statement-marquee" aria-hidden="true">
          <span>IMAGINE / CREATE / VISUALIZE / BUILD / </span>
          <span>IMAGINE / CREATE / VISUALIZE / BUILD / </span>
        </div>
        <Reveal>
          <div className="statement-content">
            <div className="section-kicker">/ The atelier idea</div>
            <h2>Good spaces begin<br />as <i>good ideas.</i></h2>
            <p>ATELIER brings the imagination stage of architecture and interior design into a digital studio where AI accelerates the work — without taking the creative decision away from you.</p>
          </div>
        </Reveal>
      </section>

      <section className="atelier-cta">
        <div className="atelier-cta__grain" />
        <Reveal>
          <div className="section-kicker">/ Start your next project</div>
          <h2>What will you<br /><i>create?</i></h2>
          <p>Bring an idea. Leave with a space.</p>
          <Link to="/register" className="atelier-cta__button">Enter ATELIER <span>↗</span></Link>
        </Reveal>
        <div className="atelier-cta__footer">
          <span>ATELIER — AI DESIGN PLATFORM</span>
          <span>DESIGN TODAY. BUILD TOMORROW.</span>
        </div>
      </section>
    </main>
  );
}
