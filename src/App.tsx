import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type FormEvent,
  type KeyboardEvent,
  type ReactNode,
} from 'react';

import {
  ArrowDown,
  ArrowDownRight,
  ArrowUpRight,
  BookOpen,
  Check,
  ChevronRight,
  Code2,
  Download,
  Github,
  Linkedin,
  Facebook,
  Mail,
  GraduationCap,
  Layers3,
  Menu,
  Navigation,
  Send,
  Smartphone,
  Terminal,
  X,
} from 'lucide-react';

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Education', href: '#education' },
  { label: 'Contact', href: '#contact' },
];

const particles = [
  { x: '5%', y: '18%', size: '3px', color: '81 82% 68%', duration: '5s', delay: '-1s', dx: '18px', dy: '-22px' },
  { x: '15%', y: '70%', size: '2px', color: '15 100% 68%', duration: '6s', delay: '-3s', dx: '-15px', dy: '18px' },
  { x: '28%', y: '34%', size: '2px', color: '184 57% 70%', duration: '5.5s', delay: '-2s', dx: '21px', dy: '11px' },
  { x: '40%', y: '12%', size: '2px', color: '15 100% 68%', duration: '7s', delay: '-4s', dx: '-20px', dy: '17px' },
  { x: '53%', y: '28%', size: '3px', color: '81 82% 68%', duration: '5.8s', delay: '-1.8s', dx: '12px', dy: '-18px' },
  { x: '64%', y: '14%', size: '2px', color: '184 57% 70%', duration: '4.3s', delay: '-2.4s', dx: '18px', dy: '16px' },
  { x: '78%', y: '32%', size: '3px', color: '15 100% 68%', duration: '6.7s', delay: '-3.2s', dx: '-14px', dy: '-20px' },
  { x: '92%', y: '22%', size: '2px', color: '81 82% 68%', duration: '5.1s', delay: '-1.4s', dx: '10px', dy: '20px' },
  { x: '84%', y: '58%', size: '2px', color: '184 57% 70%', duration: '6.4s', delay: '-4.2s', dx: '-19px', dy: '12px' },
  { x: '8%', y: '86%', size: '2px', color: '184 57% 70%', duration: '5.7s', delay: '-1.6s', dx: '15px', dy: '-17px' },
];

type Project = {
  id: string;
  number: string;
  title: string;
  description: string;
  scope: string;
  accent: string;
  icon: typeof BookOpen;
  detail: string;
  images: string[];
  technologies: string[];
};

const projects: Project[] = [
  {
    id: 'library',
    number: '01',
    title: 'UCSM Online Library Management System',
    description:
      'An academic build centered on making library resources easier to organize, discover, and manage online.',
    scope: 'Information organization / web systems',
    accent: '184 57% 70%',
    icon: BookOpen,
    detail:
      'A university library management project designed to make books, users, borrowing records, and library workflows easier to manage through a centralized web interface.',
    images: [
      '/images/library-1.jpg',
      '/images/library-2.jpg',
      '/images/library-3.jpg',
    ],
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'PHP', 'MySQL'],
  },
  {
    id: 'campus',
    number: '02',
    title: 'UCSM Campus Navigation & Information System',
    description:
      'A campus-focused information experience that brings locations, context, and useful direction into one place.',
    scope: 'Navigation / information design',
    accent: '81 82% 68%',
    icon: Navigation,
    detail:
      'A practical campus information system focused on helping students understand locations, facilities, and useful campus information through a clearer digital experience.',
    images: [
      '/images/campus-1.jpg',
      '/images/campus-2.jpg',
      '/images/campus-3.jpg',
    ],
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'PHP', 'Database'],
  },
];

const skillGroups = [
  {
    title: 'Languages & web',
    icon: Code2,
    skills: [
      ['HTML5', 90],
      ['CSS3', 86],
      ['JavaScript', 72],
      ['PHP', 77],
      ['Python', 74],
      ['Java', 80],
      ['C', 67],
    ],
  },
  {
    title: 'Platforms & data',
    icon: Smartphone,
    skills: [
      ['Flutter', 60],
      ['Android', 63],
      ['MySQL', 84],
      ['Oracle Database', 74],
    ],
  },
  {
    title: 'Tools I return to',
    icon: Layers3,
    skills: [
      ['Git', 86],
      ['GitHub', 83],
      ['VS Code', 94],
      ['Android Studio', 76],
      ['XAMPP', 75],
    ],
  },
];

function SectionKicker({
  children,
}: {
  children: ReactNode;
}) {
  return <p className="section-kicker">{children}</p>;
}

function ProjectImage({
  src,
  alt,
  index,
}: {
  src: string;
  alt: string;
  index: number;
}) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className="project-image-placeholder">
        <div>
          <span>PROJECT</span>
          <strong>0{index + 1}</strong>
        </div>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      onError={() => setFailed(true)}
    />
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('home');
  const [selectedProject, setSelectedProject] =
    useState<Project | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateProgress = () => {
      const scrollable =
        document.documentElement.scrollHeight -
        window.innerHeight;

      setProgress(
        scrollable > 0
          ? Math.min(
              100,
              (window.scrollY / scrollable) * 100,
            )
          : 0,
      );
    };

    const updateCursor = (event: PointerEvent) => {
      if (window.innerWidth > 900) {
        cursorRef.current?.style.setProperty(
          'left',
          `${event.clientX}px`,
        );

        cursorRef.current?.style.setProperty(
          'top',
          `${event.clientY}px`,
        );
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      {
        threshold: 0.12,
      },
    );

    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-35% 0px -55% 0px',
      },
    );

    document
      .querySelectorAll<HTMLElement>('.reveal')
      .forEach((element) => observer.observe(element));

    document
      .querySelectorAll<HTMLElement>('[data-section]')
      .forEach((element) =>
        sectionObserver.observe(element),
      );

    window.addEventListener(
      'scroll',
      updateProgress,
      {
        passive: true,
      },
    );

    window.addEventListener(
      'pointermove',
      updateCursor,
      {
        passive: true,
      },
    );

    updateProgress();

    return () => {
      observer.disconnect();
      sectionObserver.disconnect();

      window.removeEventListener(
        'scroll',
        updateProgress,
      );

      window.removeEventListener(
        'pointermove',
        updateCursor,
      );
    };
  }, []);

  useEffect(() => {
    const handleEscape = (
      event: globalThis.KeyboardEvent,
    ) => {
      if (event.key === 'Escape') {
        setSelectedProject(null);
      }
    };

    window.addEventListener(
      'keydown',
      handleEscape,
    );

    return () => {
      window.removeEventListener(
        'keydown',
        handleEscape,
      );
    };
  }, []);

  const closeMenu = () => setMenuOpen(false);

  const updateForm = (
    field: keyof typeof form,
    value: string,
  ) => {
    setSubmitted(false);

    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const handleSubmit = (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <main className="portfolio-shell">
      <div
        ref={cursorRef}
        className="cursor-aura"
        aria-hidden="true"
      />

      <div
        className="top-progress"
        style={
          {
            '--scroll-progress': `${progress}%`,
          } as CSSProperties
        }
        aria-hidden="true"
      />

      <div
        className="page-grid"
        aria-hidden="true"
      />

      {particles.map((particle, index) => (
        <span
          key={index}
          className="particle"
          aria-hidden="true"
          style={
            {
              left: particle.x,
              top: particle.y,
              '--size': particle.size,
              '--particle-color':
                particle.color,
              '--duration': particle.duration,
              '--delay': particle.delay,
              '--drift-x': particle.dx,
              '--drift-y': particle.dy,
            } as CSSProperties
          }
        />
      ))}

      <header className="site-nav">
        <div className="nav-inner">
          <a
            className="brand-mark"
            href="#home"
            onClick={closeMenu}
          >
            <span className="brand-box">
              KS
            </span>

            <span>Kaunghtet Swan</span>
          </a>

          <nav
            className="desktop-nav"
            aria-label="Primary navigation"
          >
            {navItems.map((item) => (
              <a
                key={item.href}
                className={`nav-link ${
                  activeSection === item.href.slice(1)
                    ? 'is-active'
                    : ''
                }`}
                href={item.href}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="nav-status">
            <span className="status-dot" />
            Available for internship
          </div>

          <button
            className="mobile-menu-button"
            type="button"
            aria-label={
              menuOpen
                ? 'Close navigation'
                : 'Open navigation'
            }
            aria-expanded={menuOpen}
            onClick={() =>
              setMenuOpen(
                (open) => !open,
              )
            }
          >
            {menuOpen ? (
              <X size={19} />
            ) : (
              <Menu size={19} />
            )}
          </button>
        </div>

        <nav
          className={`mobile-nav ${
            menuOpen ? 'is-open' : ''
          }`}
        >
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={closeMenu}
              className={
                activeSection === item.href.slice(1)
                  ? 'is-active'
                  : ''
              }
            >
              {item.label}
            </a>
          ))}
        </nav>
      </header>

      <div className="content-wrap">

        {/* HERO */}
        <section
          id="home"
          data-section
          className="hero"
        >
          <div className="hero-copy-block">
            <div className="reveal">
              <p className="eyebrow">
                KAUNGHTET SWAN / UCSM / 5TH YEAR /
                SOFTWARE ENGINEERING
              </p>

              <p className="hero-role">
                Software Developer
                <span>/</span>
                Computer Science Student
                <span>/</span>
                Software Engineering
              </p>

              <h1 className="hero-title">
                Build
                <span className="outline">
                  with
                </span>
                <span className="accent">
                  intent.
                </span>
              </h1>

              <p className="hero-copy">
                I&apos;m{' '}
                <strong>
                  Kaunghtet Swan
                </strong>{' '}
                — a Computer Science student
                specializing in Software
                Engineering, building useful
                software through curiosity,
                practice, and problem solving.
              </p>

              <div className="hero-actions">
                <a
                  className="button-primary"
                  href="#projects"
                >
                  See the work
                  <ArrowDownRight
                    size={16}
                  />
                </a>

                <a
                  className="button-ghost"
                  href="/Kaunghtetswan-cv.pdf"
                  download="Kaunghtetswan-cv.pdf"
                >
                  Download CV
                  <Download size={15} />
                </a>
              </div>

              <div className="hero-meta">
                <span>
                  Software Developer
                </span>

                <i />

                <span>
                  Software Engineering
                </span>
              </div>
            </div>
          </div>

          <div
            className="hero-visual reveal reveal-delay-2"
            aria-hidden="true"
          >
            <div className="hero-glow" />

            <div className="orbit">
              <div className="orbit-inner" />
            </div>

            <div className="floating-label floating-top">
              <span className="status-dot" />
              learning in public
            </div>

            <div className="floating-label floating-bottom">
              <Terminal size={13} />
              solve / test / repeat
            </div>

            <div className="code-float">
              <div className="code-topbar">
                <div className="window-dots">
                  <span />
                  <span />
                  <span />
                </div>

                <span>
                  kaunghtet_swan.ts
                </span>

                <span>05</span>
              </div>

              <div className="code-body">
                <div>
                  <span className="line-number">
                    01
                  </span>

                  <span className="code-keyword">
                    const
                  </span>{' '}

                  <span className="code-name">
                    developer
                  </span>{' '}
                  = {'{'}
                </div>

                <div>
                  <span className="line-number">
                    02
                  </span>

                  name:{' '}

                  <span className="code-string">
                    &quot;Kaunghtet Swan&quot;
                  </span>
                  ,
                </div>

                <div>
                  <span className="line-number">
                    03
                  </span>

                  focus: [

                  <span className="code-string">
                    &quot;software engineering&quot;
                  </span>
                  ,{' '}

                  <span className="code-string">
                    &quot;systems&quot;
                  </span>
                  ],
                </div>

                <div>
                  <span className="line-number">
                    04
                  </span>

                  degree:{' '}

                  <span className="code-string">
                    &quot;Computer Science&quot;
                  </span>
                  ,
                </div>

                <div>
                  <span className="line-number">
                    05
                  </span>

                  year:{' '}

                  <span className="code-number">
                    5
                  </span>
                  ,
                </div>

                <div>
                  <span className="line-number">
                    06
                  </span>

                  mode:{' '}

                  <span className="code-string">
                    &quot;keep building&quot;
                  </span>
                  ,
                </div>

                <div>
                  <span className="line-number">
                    07
                  </span>

                  {'}'}
                </div>

                <div>
                  <span className="line-number">
                    08
                  </span>

                  <span className="code-comment">
                    // every problem is a door
                  </span>
                </div>
              </div>
            </div>
          </div>

          <a
            className="scroll-cue"
            href="#about"
          >
            Scroll to explore
            <ArrowDown size={14} />
          </a>
        </section>

        {/* ABOUT */}
        <section
          id="about"
          data-section
          className="section about-section"
        >
          <div className="manifesto reveal">
            <div className="manifesto-mark">
              01
            </div>

            <p className="manifesto-quote">
              Good software starts with a{' '}
              <em>better question.</em>
            </p>

            <p className="manifesto-note">
              I&apos;m studying Computer Science
              with a focus on{' '}
              <strong>
                Software Engineering
              </strong>{' '}
              at the{' '}
              <a
                href="https://www.ucsm.edu.mm/"
                target="_blank"
                rel="noopener noreferrer"
                className="university-link"
              >
                <strong>
                  University of Computer Studies,
                  Mandalay
                </strong>
              </a>{' '}
              and using every project to get
              closer to the kind of developer
              who listens before building.
            </p>
          </div>
        </section>

        {/* PROJECTS */}
        <section
          id="projects"
          data-section
          className="section"
        >
          <div className="section-header reveal">
            <div>
              <SectionKicker>
                Selected work / 02 systems
              </SectionKicker>

              <h2 className="section-title">
                Things I&apos;ve
                <br />
                made useful.
              </h2>
            </div>

            <p className="section-intro">
              Two academic builds, each
              starting with an everyday problem
              and ending with a clearer way
              through it.
            </p>
          </div>

          <div className="project-grid">
            {projects.map(
              (project, index) => {
                const Icon = project.icon;

                return (
                  <article
                    key={project.id}
                    className={`project-card reveal reveal-delay-${
                      (index % 3) + 1
                    }`}
                    style={
                      {
                        '--project-accent':
                          project.accent,
                      } as CSSProperties
                    }
                    tabIndex={0}
                    role="button"
                    onClick={() =>
                      setSelectedProject(
                        project,
                      )
                    }
                    onKeyDown={(
                      event: KeyboardEvent<HTMLElement>,
                    ) => {
                      if (
                        event.key === 'Enter' ||
                        event.key === ' '
                      ) {
                        event.preventDefault();

                        setSelectedProject(
                          project,
                        );
                      }
                    }}
                    onMouseMove={(event) => {
                      const rect =
                        event.currentTarget.getBoundingClientRect();

                      const tiltX =
                        ((event.clientY -
                          rect.top) /
                          rect.height -
                          0.5) *
                        -4;

                      const tiltY =
                        ((event.clientX -
                          rect.left) /
                          rect.width -
                          0.5) *
                        4;

                      event.currentTarget.style.setProperty(
                        '--tilt-x',
                        `${tiltX}deg`,
                      );

                      event.currentTarget.style.setProperty(
                        '--tilt-y',
                        `${tiltY}deg`,
                      );
                    }}
                    onMouseLeave={(event) => {
                      event.currentTarget.style.setProperty(
                        '--tilt-x',
                        '0deg',
                      );

                      event.currentTarget.style.setProperty(
                        '--tilt-y',
                        '0deg',
                      );
                    }}
                  >
                    <div className="project-card-glow" />

                    <div className="project-card-top">
                      <span className="project-number">
                        {project.number}
                      </span>

                      <div className="project-icon">
                        <Icon
                          size={22}
                          strokeWidth={1.7}
                        />
                      </div>
                    </div>

                    <div className="project-image-stack">
                      <div className="project-main-image">
                        <ProjectImage
                          src={
                            project.images[0]
                          }
                          alt={`${project.title} screenshot 1`}
                          index={0}
                        />
                      </div>

                      <div className="project-side-images">
                        <div>
                          <ProjectImage
                            src={
                              project.images[1]
                            }
                            alt={`${project.title} screenshot 2`}
                            index={1}
                          />
                        </div>

                        <div>
                          <ProjectImage
                            src={
                              project.images[2]
                            }
                            alt={`${project.title} screenshot 3`}
                            index={2}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="project-content">
                      <div className="project-scope">
                        {project.scope}
                      </div>

                      <h3 className="project-title">
                        {project.title}
                      </h3>

                      <p className="project-description">
                        {project.description}
                      </p>

                      <div className="technology-row">
                        {project.technologies.map(
                          (technology) => (
                            <span
                              key={technology}
                            >
                              {technology}
                            </span>
                          ),
                        )}
                      </div>
                    </div>

                    <div className="project-footer">
                      <span>
                        View project details
                      </span>

                      <span className="project-arrow">
                        <ArrowUpRight
                          size={16}
                        />
                      </span>
                    </div>
                  </article>
                );
              },
            )}
          </div>
        </section>

        {/* SKILLS */}
        <section
          id="skills"
          data-section
          className="section"
        >
          <div className="section-header reveal">
            <div>
              <SectionKicker>
                Toolkit / always learning
              </SectionKicker>

              <h2 className="section-title">
                A stack with
                <br />
                room to grow.
              </h2>
            </div>

            <p className="section-intro">
              The languages, platforms,
              databases, and tools I use to move
              an idea from a blank screen toward
              something real.
            </p>
          </div>

          <div className="skill-layout">
            <div className="skill-rail reveal">
              <div className="skill-big-number">
                03
              </div>

              <p className="skill-statement">
                Curious by default.
                <br />
                <span>
                  Precise by practice.
                </span>
              </p>

              <p className="skill-subcopy">
                Progress is not a badge. It&apos;s
                the small, repeated act of opening
                the editor and asking what could be
                clearer.
              </p>
            </div>

            <div className="skill-groups reveal reveal-delay-1">
              {skillGroups.map(
                (group) => {
                  const Icon = group.icon;

                  return (
                    <div
                      className="skill-group"
                      key={group.title}
                    >
                      <h3 className="skill-group-title">
                        <Icon size={15} />
                        {group.title}
                      </h3>

                      <div className="skill-list">
                        {group.skills.map(
                          ([name, skill]) => (
                            <div
                              className="skill-row"
                              key={name}
                            >
                              <div className="skill-row-top">
                                <span className="skill-name">
                                  {name}
                                </span>

                                <span className="skill-percent">
                                  {skill}%
                                </span>
                              </div>

                              <div className="skill-track">
                                <div
                                  className="skill-fill"
                                  style={
                                    {
                                      '--skill':
                                        `${skill}%`,
                                    } as CSSProperties
                                  }
                                />
                              </div>
                            </div>
                          ),
                        )}
                      </div>
                    </div>
                  );
                },
              )}
            </div>
          </div>
        </section>

        {/* JOURNEY */}
        <section className="section">
          <div className="section-header reveal">
            <div>
              <SectionKicker>
                Context / beyond the code
              </SectionKicker>

              <h2 className="section-title">
                Still becoming
                <br />
                the developer.
              </h2>
            </div>
          </div>

          <div className="journey">
            <article className="journey-card reveal">
              <div className="journey-icon">
                <Github size={19} />
              </div>

              <span className="journey-index">
                The GitHub journey
              </span>

              <h3>
                From first commit to better
                questions.
              </h3>

              <p>
                GitHub is where I keep the trail
                visible — a place to practice,
                revisit decisions, and learn
                through the work itself.
              </p>

              <a
                className="button-ghost"
                href="https://github.com/kokoaung579"
                target="_blank"
                rel="noreferrer"
              >
                Visit GitHub
                <Github size={15} />
              </a>
            </article>

            <article className="journey-card journey-card-accent reveal reveal-delay-1">
              <div className="journey-icon">
                <Terminal size={19} />
              </div>

              <span className="journey-index">
                The next chapter
              </span>

              <h3>
                Ready for an internship with
                real problems.
              </h3>

              <p>
                Looking for a team where
                thoughtful questions, steady
                practice, and useful software are
                valued.
              </p>

              <a
                className="button-primary"
                href="#contact"
              >
                Start a conversation
                <ChevronRight size={15} />
              </a>
            </article>
          </div>
        </section>

        {/* EDUCATION */}
        <section
          id="education"
          data-section
          className="section"
        >
          <div className="education-panel reveal">
            <div className="education-index">
              04
            </div>

            <div className="education-icon">
              <GraduationCap size={25} />
            </div>

            <div className="education-main">
              <p className="education-label">
                Education / current chapter
              </p>

              <h2 className="education-title">
                <a
                  href="https://www.ucsm.edu.mm/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="university-link"
                >
                  University of Computer Studies,
                  Mandalay
                </a>
              </h2>
            </div>

            <div className="education-meta">
              <strong>
                Bachelor of Computer Science
              </strong>

              <span>
                / Software Engineering
              </span>

              <span>
                5th Year Student
              </span>
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section
          id="contact"
          data-section
          className="section contact-section"
        >
          <div className="contact-layout">
            <div className="contact-copy-block reveal">
              <SectionKicker>
                Contact / say hello
              </SectionKicker>

              <h2 className="contact-title">
                Let&apos;s make
                <br />
                <span>something</span>
                <br />
                useful.
              </h2>

              <p className="contact-copy">
                If you&apos;re looking for an intern
                who brings curiosity, patience, and
                a growing systems mindset, I&apos;d
                like to hear what you&apos;re working
                on.
              </p>

              <div className="contact-detail">
                <Send size={15} />
                Open to thoughtful introductions
              </div>

              <a
                className="contact-email"
                href="mailto:kaunghtetswan200425@gmail.com"
              >
                kaunghtetswan200425@gmail.com
                <ArrowUpRight size={15} />
              </a>
            </div>
          <form
            className="contact-form contact-form-modern reveal reveal-delay-1"
            onSubmit={handleSubmit}
          >
            <div className="modern-form-top">
              <div>
                <span className="form-kicker">CONTACT</span>
                <h3>Let’s build something.</h3>
                <p>
                  Have an idea, opportunity, or question? Drop me a message.
                </p>
              </div>

              <div className="form-number">01</div>
            </div>

            <div className="modern-form-line" />

            <div className="form-row">
              <div className="form-field modern-field">
                <label htmlFor="contact-name">NAME</label>

                <input
                  id="contact-name"
                  value={form.name}
                  onChange={(event) =>
                    updateForm('name', event.target.value)
                  }
                  placeholder="Your name"
                  required
                />
              </div>

              <div className="form-field modern-field">
                <label htmlFor="contact-email">EMAIL</label>

                <input
                  id="contact-email"
                  type="email"
                  value={form.email}
                  onChange={(event) =>
                    updateForm('email', event.target.value)
                  }
                  placeholder="you@example.com"
                  required
                />
              </div>
            </div>

            <div className="form-field modern-field">
              <label htmlFor="contact-subject">SUBJECT</label>

              <input
                id="contact-subject"
                value={form.subject}
                onChange={(event) =>
                  updateForm('subject', event.target.value)
                }
                placeholder="What can I help you with?"
                required
              />
            </div>

            <div className="form-field modern-field">
              <label htmlFor="contact-message">MESSAGE</label>

              <textarea
                id="contact-message"
                value={form.message}
                onChange={(event) =>
                  updateForm('message', event.target.value)
                }
                placeholder="Tell me about your project..."
                required
              />
            </div>

            <div className="modern-form-bottom">
              <span className="form-hint">
                I usually reply within 24–48 hours.
              </span>

              <button
                className="modern-send-button"
                type="submit"
              >
                <span>Send message</span>

                <span className="modern-send-icon">
                  <ArrowUpRight size={18} />
                </span>
              </button>
            </div>

            {submitted && (
              <div className="success-note modern-success">
                <span className="success-check">
                  <Check size={15} />
                </span>

                Thanks, {form.name || 'there'} — your message is ready for a reply.
              </div>
            )}
          </form>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="footer">
          <div className="footer-main">
            <div>
              <div className="footer-brand">
                <span className="brand-box">
                  KS
                </span>

                <span>
                  Kaunghtet Swan
                </span>
              </div>

              <p>
                Software Developer · Computer
                Science Student · Software
                Engineering
              </p>
            </div>

            <div className="footer-links">
              <a
                href="https://github.com/kokoaung579"
                target="_blank"
                rel="noreferrer"
              >
                <Github size={14} />
                GitHub
              </a>

              <a
                href="https://www.linkedin.com/in/kaunghtet-sween-b85a34414/"
                target="_blank"
                rel="noreferrer"
              >
                <Linkedin size={14} />
                LinkedIn
              </a>

              <a
                href="https://www.facebook.com/share/19QpuKo97N/"
                target="_blank"
                rel="noreferrer"
              >
                <Facebook size={14} />
                Facebook
              </a>

              <a href="mailto:kaunghtetswan200425@gmail.com">
                <Mail size={14} />
                Email
              </a>
            </div>
          </div>

          <div className="footer-bottom">
            <span>
              © 2026 Kaunghtet Swan. All rights
              reserved.
            </span>

            <a href="#home">
              Back to top

              <ArrowDown
                size={13}
                style={{
                  transform:
                    'rotate(180deg)',
                }}
              />
            </a>
          </div>
        </footer>
      </div>

      {/* PROJECT MODAL */}
      {selectedProject && (
        <div
          className="modal-backdrop"
          onClick={() =>
            setSelectedProject(null)
          }
        >
          <div
            className="project-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-modal-title"
            onClick={(event) =>
              event.stopPropagation()
            }
          >
            <button
              className="modal-close"
              type="button"
              aria-label="Close project details"
              onClick={() =>
                setSelectedProject(null)
              }
            >
              <X size={17} />
            </button>

            <span className="modal-kicker">
              Project brief /{' '}
              {selectedProject.number}
            </span>

            <h2
              className="modal-title"
              id="project-modal-title"
            >
              {selectedProject.title}
            </h2>

            <p className="modal-copy">
              {selectedProject.detail}
            </p>

            <div className="modal-tech">
              {selectedProject.technologies.map(
                (technology) => (
                  <span key={technology}>
                    {technology}
                  </span>
                ),
              )}
            </div>

            <p className="modal-hint">
              Academic project ·{' '}
              {selectedProject.scope}
            </p>
          </div>
        </div>
      )}
    </main>
  );
}

export default App;