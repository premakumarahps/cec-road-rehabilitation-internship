import { useEffect, useRef, useState, useMemo } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  Building2, Calendar, MapPin, Award, Download, FlaskConical,
  Cpu, FileText, ChevronDown, ChevronUp, TrendingUp, Layers, HardHat,
  Activity, BookOpen, BarChart3, CircleCheck,
  ClipboardList, ExternalLink, Mountain,
  ShieldCheck, Eye, CheckCircle2
} from 'lucide-react'
import './index.css'

// Modular Data & Interactive Components
import { WEEKS_DATA } from './data/weeksData'
import { TESTS_DATA } from './data/testsData'
import type { TestDetail } from './data/testsData'
import { GALLERY_DATA } from './data/galleryData'
import type { GalleryItem } from './data/galleryData'
import { DRAINAGE_STRUCTURES } from './data/drainageData'
import { PhotoLightbox } from './components/PhotoLightbox'
import { SnCalculator } from './components/SnCalculator'
import { DcpToolViewer } from './components/DcpToolViewer'
import { TestDetailModal } from './components/TestDetailModal'

/* =============================================
   CONSTANTS & METADATA
   ============================================= */

const PHASES = [
  { id: 1, label: 'Phase 1 — Foundation', weeks: '1–6', color: '#F59E0B', icon: <BookOpen size={16} /> },
  { id: 2, label: 'Phase 2 — Soil & Materials', weeks: '7–12', color: '#14B8A6', icon: <FlaskConical size={16} /> },
  { id: 3, label: 'Phase 3 — Construction & QA', weeks: '13–18', color: '#8B5CF6', icon: <Layers size={16} /> },
  { id: 4, label: 'Phase 4 — Asphalt & Research', weeks: '19–24', color: '#EF4444', icon: <TrendingUp size={16} /> },
]

const COMPACTION_TABLE = [
  { layer: 'Subgrade Formation', min: '90–95% MDD', color: '#14B8A6', pct: 90 },
  { layer: 'Edge Widening Subgrade', min: '95% MDD', color: '#F59E0B', pct: 95 },
  { layer: 'Embankment Fill (EMB)', min: '90–95% MDD', color: '#14B8A6', pct: 90 },
  { layer: 'Granular Sub-base (SB)', min: '98% MDD', color: '#F59E0B', pct: 98 },
  { layer: 'Shoulder Fill (SHO)', min: '95% MDD', color: '#F59E0B', pct: 95 },
  { layer: 'Aggregate Base Course (ABC)', min: '98% MDD', color: '#10B981', pct: 98 },
]

const DOWNLOADS = [
  {
    name: 'Final Industrial Training Report',
    file: '/docs/Final report.pdf',
    ext: 'PDF',
    size: '2.2 MB',
    iconClass: 'download-icon-pdf',
    category: 'Main Report',
    desc: 'Official 24-week industrial training report submitted to Department of Materials Science & Engineering, UoM.'
  },
  {
    name: 'Final Report (Editable Document)',
    file: '/docs/Final report.docx',
    ext: 'DOCX',
    size: '14.9 MB',
    iconClass: 'download-icon-doc',
    category: 'Main Report',
    desc: 'Complete Microsoft Word document with 21 high-resolution figures, tables, and academic reflections.'
  },
  {
    name: 'Internship Defense Presentation',
    file: '/docs/Intern Presentation 210494D.pdf',
    ext: 'PDF',
    size: '2.3 MB',
    iconClass: 'download-icon-pdf',
    category: 'Presentation',
    desc: 'Official presentation slide deck for internship viva defense — PDF format.'
  },
  {
    name: 'Presentation Slides (Editable PPTX)',
    file: '/docs/Intern Presentation 210494D.pptx',
    ext: 'PPTX',
    size: '11.8 MB',
    iconClass: 'download-icon-pptx',
    category: 'Presentation',
    desc: 'Full editable PowerPoint presentation deck with workflow schematics and site photographs.'
  },
  {
    name: 'CEC Official Service Letter',
    file: '/docs/CEC Trainee Service Letter.pdf',
    ext: 'PDF',
    size: '564 KB',
    iconClass: 'download-icon-pdf',
    category: 'Credential',
    desc: 'Official completion service certificate issued by Consulting Engineering and Contractors (Pvt) Ltd.'
  },
  {
    name: 'Automated DCP Report Generator',
    file: '/docs/DCP Test Report Generator.xlsm',
    ext: 'XLSM',
    size: '157 KB',
    iconClass: 'download-icon-xlsx',
    category: 'VBA Tool',
    desc: 'Macro-enabled Excel workbook with RMSD layer detection, automated chart plotting, and chainage summaries.'
  },
  {
    name: 'Lot 1 RFI Entry System',
    file: '/docs/LOT1_RFI_Entry.xlsm',
    ext: 'XLSM',
    size: '630 KB',
    iconClass: 'download-icon-xlsx',
    category: 'VBA Tool',
    desc: 'Core Excel VBA system for Request for Inspection (RFI) automation and monthly QA report generation.'
  },
  {
    name: 'BOQ Item Details Database',
    file: '/docs/BOQ Item Details.xlsm',
    ext: 'XLSM',
    size: '21 KB',
    iconClass: 'download-icon-xlsx',
    category: 'VBA Tool',
    desc: 'Database workbook linking 529 construction activities with BOQ codes and ICTAD specifications.'
  },
  {
    name: 'RFI Items Master Database',
    file: '/docs/RFI Items.xlsm',
    ext: 'XLSM',
    size: '35 KB',
    iconClass: 'download-icon-xlsx',
    category: 'VBA Tool',
    desc: 'Lookup table for rapid RFI activity classification and inspection tracking.'
  },
  {
    name: 'Managerial Problem Proposal',
    file: '/docs/Managerial Problem Proposal.pdf',
    ext: 'PDF',
    size: '331 KB',
    iconClass: 'download-icon-pdf',
    category: 'Proposal',
    desc: 'Formal engineering proposal for a Trello + Whiteboard hybrid lab work management system.'
  },
]

/* =============================================
   ANIMATED COUNTER COMPONENT
   ============================================= */
function Counter({ end, suffix = '', duration = 2000 }: { end: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (!inView) return
    const startTime = Date.now()
    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * end))
      if (progress >= 1) clearInterval(timer)
    }, 16)
    return () => clearInterval(timer)
  }, [inView, end, duration])

  return <span ref={ref} className="counter">{count}{suffix}</span>
}

/* =============================================
   FADE IN WRAPPER
   ============================================= */
function FadeIn({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/* =============================================
   MAIN APP ORCHESTRATOR
   ============================================= */
export default function App() {
  // Navigation & Filtering States
  const [activePhase, setActivePhase] = useState<number | null>(null)
  const [testCategory, setTestCategory] = useState<string>('All')
  const [galleryCategory, setGalleryCategory] = useState<string>('All')
  const [expandedWeek, setExpandedWeek] = useState<number | null>(null)

  // Modals & Lightbox
  const [activeModalTest, setActiveModalTest] = useState<TestDetail | null>(null)
  const [activeLightboxItem, setActiveLightboxItem] = useState<GalleryItem | null>(null)

  // Filtered lists
  const filteredWeeks = useMemo(() => {
    return activePhase ? WEEKS_DATA.filter(w => w.phase === activePhase) : WEEKS_DATA
  }, [activePhase])

  const filteredTests = useMemo(() => {
    if (testCategory === 'All') return TESTS_DATA
    return TESTS_DATA.filter(t => t.category === testCategory)
  }, [testCategory])

  const filteredGallery = useMemo(() => {
    if (galleryCategory === 'All') return GALLERY_DATA
    return GALLERY_DATA.filter(g => g.category === galleryCategory)
  }, [galleryCategory])

  return (
    <>
      {/* ── LIGHTBOX MODAL ── */}
      <PhotoLightbox
        item={activeLightboxItem}
        items={filteredGallery}
        onClose={() => setActiveLightboxItem(null)}
        onSelect={(item) => setActiveLightboxItem(item)}
      />

      {/* ── TEST DETAIL DOSSIER MODAL ── */}
      <TestDetailModal
        test={activeModalTest}
        onClose={() => setActiveModalTest(null)}
      />

      {/* ── NAVBAR ── */}
      <nav className="navbar">
        <div className="container navbar-inner">
          <a href="#home" className="nav-logo">
            <div className="nav-logo-badge">ME</div>
            <div>
              <div className="nav-logo-text">Premakumara H.P.S.</div>
              <div style={{ fontSize: '0.68rem', color: 'var(--amber-400)', fontFamily: 'JetBrains Mono, monospace' }}>
                Trainee Material Engineer • UoM 210494D
              </div>
            </div>
          </a>
          <ul className="nav-links">
            <li><a href="#overview">Overview</a></li>
            <li><a href="#timeline">24 Weeks</a></li>
            <li><a href="#tests">13 Lab Tests</a></li>
            <li><a href="#pavement">Pavement Design</a></li>
            <li><a href="#tools">VBA Software</a></li>
            <li><a href="#drainage">Structures</a></li>
            <li><a href="#research">Research</a></li>
            <li><a href="#managerial">Management &amp; HSE</a></li>
            <li><a href="#gallery">Photo Gallery</a></li>
            <li><a href="#downloads">Downloads</a></li>
          </ul>
        </div>
      </nav>

      {/* ── HERO SECTION ── */}
      <section className="hero" id="home">
        <div className="hero-bg" />
        <div className="hero-overlay" />
        <div className="hero-grid-pattern" />
        <div className="container hero-content">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className="hero-badge">
              <span className="dot" />
              Trainee Material Engineer — CEC (Pvt) Ltd
            </div>
            <h1 className="hero-name">Premakumara H.P.S.</h1>
            <div className="hero-role">
              B.Sc. (Hons) in Materials Science &amp; Engineering | Reg. No: 210494D
            </div>

            <div className="hero-meta">
              <div className="hero-meta-item">
                <Building2 size={16} />
                <span>Consulting Engineering and Contractors (Pvt) Ltd</span>
              </div>
              <div className="hero-meta-item">
                <MapPin size={16} />
                <span>Homagama Network (Lots 1–4), Western Province, Sri Lanka</span>
              </div>
              <div className="hero-meta-item">
                <Calendar size={16} />
                <span>05 Dec 2024 – 23 May 2025 (24 Weeks)</span>
              </div>
            </div>

            <p className="hero-desc">
              Six months of intensive industrial engineering on a <strong style={{ color: 'var(--amber-400)' }}>World Bank-funded road rehabilitation project</strong> — executing 13+ geotechnical and materials tests, designing standalone Excel VBA automation suites (with RMSD layer detection), calculating flexible pavement structures (RDA Chart 2), and conducting research on asphalt thickness optimization across Homagama’s rural highway network.
            </p>

            {/* Dynamic Counters */}
            <div className="hero-stats">
              <div className="hero-stat">
                <span className="hero-stat-value"><Counter end={24} /></span>
                <span className="hero-stat-label">Weeks Training</span>
              </div>
              <div className="hero-stat-divider" />
              <div className="hero-stat">
                <span className="hero-stat-value"><Counter end={4} /></span>
                <span className="hero-stat-label">Road Lots (COL)</span>
              </div>
              <div className="hero-stat-divider" />
              <div className="hero-stat">
                <span className="hero-stat-value"><Counter end={13} suffix="+" /></span>
                <span className="hero-stat-label">Lab &amp; Field Tests</span>
              </div>
              <div className="hero-stat-divider" />
              <div className="hero-stat">
                <span className="hero-stat-value"><Counter end={2} /></span>
                <span className="hero-stat-label">VBA Suites Built</span>
              </div>
              <div className="hero-stat-divider" />
              <div className="hero-stat">
                <span className="hero-stat-value"><Counter end={529} /></span>
                <span className="hero-stat-label">BOQ Items Coded</span>
              </div>
              <div className="hero-stat-divider" />
              <div className="hero-stat">
                <span className="hero-stat-value"><Counter end={152} /></span>
                <span className="hero-stat-label">Extracted Assets</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="hero-cta">
              <a href="#overview" className="btn-primary">
                <HardHat size={16} /> Explore Technical Portfolio
              </a>
              <a href="#tools" className="btn-secondary" style={{ color: 'var(--amber-400)', borderColor: 'rgba(245,158,11,0.4)' }}>
                <Cpu size={16} /> Inspect VBA Software
              </a>
              <a href="#downloads" className="btn-secondary">
                <Download size={16} /> Download Reports &amp; Tools
              </a>
            </div>

            {/* Quick Photo Reel */}
            <div style={{ marginTop: '2.5rem', display: 'flex', alignItems: 'center', gap: '1rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
              <span style={{ fontSize: '0.72rem', color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.08em', whiteSpace: 'nowrap' }}>
                Field &amp; Lab Highlights:
              </span>
              {[
                { src: '/images/report_image16.jpeg', label: 'Field DCP Test' },
                { src: '/images/report_image21.png', label: 'Sand Cone FDT' },
                { src: '/images/report_image20.png', label: 'Marshall Stability' },
                { src: '/images/report_image22.png', label: 'Bitumen Penetration' },
                { src: '/images/cec_pdf_p65_180.png', label: 'DCP Tool Interface' },
              ].map((thumb, idx) => (
                <div
                  key={idx}
                  onClick={() => {
                    const match = GALLERY_DATA.find(g => g.src === thumb.src)
                    if (match) setActiveLightboxItem(match)
                  }}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '0.5rem',
                    background: 'rgba(255,255,255,0.04)', padding: '0.35rem 0.65rem',
                    borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)',
                    cursor: 'pointer', whiteSpace: 'nowrap', transition: 'all 0.2s',
                  }}
                >
                  <img src={thumb.src} alt={thumb.label} style={{ width: '24px', height: '24px', borderRadius: '4px', objectFit: 'cover' }} />
                  <span style={{ fontSize: '0.75rem', color: '#E2E8F0' }}>{thumb.label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <a href="#overview" style={{ position: 'absolute', bottom: '1.5rem', left: '50%', transform: 'translateX(-50%)', color: 'var(--amber-500)', animation: 'pulse 2s ease-in-out infinite', zIndex: 2, textDecoration: 'none' }}>
          <ChevronDown size={28} />
        </a>
      </section>

      {/* ── SECTION 1: COMPANY & PROJECT OVERVIEW ── */}
      <section className="section-glass" id="overview">
        <div className="container">
          <FadeIn>
            <div className="section-header">
              <span className="section-tag">// organization &amp; contract framework</span>
              <h2 className="section-title">Company Profile &amp; <span>World Bank Project</span></h2>
              <p className="section-subtitle">
                Consulting Engineering and Contractors (Pvt) Ltd — Sri Lanka’s premier C1-grade infrastructure contractor delivering the World Bank-funded Inclusive Connectivity and Development Project (ICDP).
              </p>
              <div className="section-divider" />
            </div>
          </FadeIn>

          <div className="grid grid-3 gap-6 mb-8">
            {[
              {
                icon: <Building2 size={28} />, color: 'var(--amber-400)',
                title: 'CEC (Pvt) Ltd — Founded 1997',
                img: '/images/report_image3.png',
                imgCaption: 'Figure 2: Corporate Head Office & Lab',
                points: [
                  'C1 ICTAD rating (highest domestic tier for roadworks)',
                  'ISO 9001 certified Quality Management System',
                  'In-house central materials testing laboratory',
                  'Dedicated asphalt concrete batching plant',
                  'Founder & Managing Director: Eng. Ashoka Randeni'
                ]
              },
              {
                icon: <MapPin size={28} />, color: 'var(--teal-400)',
                title: 'ICDP Project — Homagama Network',
                img: '/images/report_image7.png',
                imgCaption: 'Figure 6: Road Rehabilitation Works (Lot 1)',
                points: [
                  'Funded by the International Development Association (World Bank)',
                  'Client / Employer: Road Development Authority (RDA)',
                  'Project Consultant: Euro Group for Engineering',
                  '4 Active Road Lots (COL/All segments)',
                  '~4.7 km average length per lot rehabilitation'
                ]
              },
              {
                icon: <Award size={28} />, color: 'var(--emerald-400)',
                title: 'Contractual Framework',
                img: '/images/report_image4.png',
                imgCaption: 'Figure 3: Corporate Hierarchy Structure',
                points: [
                  'SCA/4 — Conditions of Contract for Works',
                  'SCA/5 — Standard Specifications for Roads & Bridges',
                  'SCA/8 — Highway Schedule of Rates (HSR)',
                  'Bill of Quantities (BOQ) with unit rates',
                  'ICTAD Section 1602 — Testing Frequencies'
                ]
              }
            ].map((item, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="card" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <div style={{ height: '140px', background: '#020617', borderRadius: '8px', overflow: 'hidden', marginBottom: '1rem', border: '1px solid rgba(255,255,255,0.06)' }}>
                    <img src={item.img} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', color: item.color }}>
                    {item.icon}
                    <h4 style={{ color: 'var(--text-primary)', fontSize: '1.05rem' }}>{item.title}</h4>
                  </div>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.45rem', marginTop: '0.5rem', flex: 1 }}>
                    {item.points.map((p, j) => (
                      <li key={j} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.84rem', color: 'var(--text-secondary)' }}>
                        <CircleCheck size={14} style={{ color: item.color, flexShrink: 0, marginTop: '3px' }} />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                  <div style={{ fontSize: '0.72rem', color: '#64748B', fontStyle: 'italic', marginTop: '0.75rem', borderTop: '1px solid rgba(255,255,255,0.04)', paddingTop: '0.4rem' }}>
                    {item.imgCaption}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          {/* Procurement & Bidding Lifecycle */}
          <div className="grid grid-2 gap-8">
            <FadeIn>
              <div className="card" style={{ height: '100%' }}>
                <h3 className="mb-4" style={{ color: 'var(--amber-400)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <ClipboardList size={20} /> Competitive Procurement &amp; Bidding Lifecycle
                </h3>
                <div className="flow-steps">
                  {[
                    { step: '01', title: 'Invitation for Bids (IFB)', desc: 'RDA / World Bank issue IFB document to pre-qualified C1 civil contractors with full BOQ.' },
                    { step: '02', title: 'Bid Preparation & Pricing', desc: 'CEC engineering team prepares unit rate analysis (SCA/8 HSR), work schedules, and method statements.' },
                    { step: '03', title: 'Evaluation & Contract Award', desc: 'RDA evaluates technical and financial proposals; CEC awarded all 4 Homagama lots (COL/All).' },
                    { step: '04', title: 'Contract Execution (SCA/4)', desc: 'Performance security, advance payment guarantees, and comprehensive insurance policies executed.' },
                    { step: '05', title: 'Site Mobilization & Lab Setup', desc: 'Project office established in Homagama, central lab calibrated, heavy earthmoving fleet deployed.' },
                    { step: '06', title: 'Supervision & RFI Certification', desc: 'Resident Engineer (RE / Euro Group) supervises daily quality, certifies RFIs, and approves IPC payments.' },
                  ].map((s, i) => (
                    <div className="flow-step" key={i}>
                      <div className="flow-step-num">{s.step}</div>
                      <div className="flow-step-body">
                        <div className="flow-step-title">{s.title}</div>
                        <div className="flow-step-desc">{s.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.15}>
              <div className="card" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <h3 className="mb-4" style={{ color: 'var(--teal-400)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <HardHat size={20} /> Trainee Material Engineer Assignment
                </h3>

                <div style={{ background: 'rgba(0,0,0,0.3)', borderRadius: '10px', padding: '1.25rem', marginBottom: '1.25rem', borderLeft: '3px solid var(--amber-500)' }}>
                  <div style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                    Premakumara H.P.S. (210494D)
                  </div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--teal-400)', marginTop: '0.2rem' }}>
                    Trainee Material Engineer — CEC Homagama Project Office
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    Department of Materials Science &amp; Engineering, University of Moratuwa
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1.25rem' }}>
                  {[
                    ['Assigned Lots', 'Lots 1, 2, 3 & 4 (COL/All)'],
                    ['Academic Module', 'MT 3993 — Industrial Training'],
                    ['Academic Supervisor', 'Sr. Lec. S. P. Guluwita'],
                    ['Industry Mentor', 'Lead Materials Engineer (CEC)'],
                    ['Training Authority', 'NAITA + UoM Training Division'],
                    ['Report Submission', '25 July 2025'],
                  ].map(([label, value], i) => (
                    <div key={i} style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '8px', padding: '0.75rem' }}>
                      <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.25rem' }}>{label}</div>
                      <div style={{ fontSize: '0.84rem', color: 'var(--text-primary)', fontWeight: 500 }}>{value}</div>
                    </div>
                  ))}
                </div>

                <div style={{ marginTop: 'auto', background: 'rgba(255,255,255,0.02)', padding: '1rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                    <span style={{ fontSize: '0.8rem', color: '#94A3B8', fontWeight: 600 }}>Organizational Placement</span>
                    <button
                      onClick={() => {
                        const match = GALLERY_DATA.find(g => g.id === 'g2')
                        if (match) setActiveLightboxItem(match)
                      }}
                      style={{ background: 'none', border: 'none', color: 'var(--amber-400)', fontSize: '0.75rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.25rem' }}
                    >
                      <Eye size={12} /> View Full Org Chart
                    </button>
                  </div>
                  <p style={{ fontSize: '0.8rem', color: '#CBD5E1', lineHeight: '1.4' }}>
                    Reporting directly to the Materials Engineer, collaborating daily with Site Engineers, QA/QC Inspectors, and Euro Group Resident Engineers for sample testing, RFI certification, and subgrade clearance.
                  </p>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── SECTION 2: 24-WEEK INTERACTIVE ENGINEERING JOURNEY ── */}
      <section className="section-dark" id="timeline">
        <div className="container">
          <FadeIn>
            <div className="section-header">
              <span className="section-tag">// 24-week engineering logbook</span>
              <h2 className="section-title">The 24-Week <span>Engineering Journey</span></h2>
              <p className="section-subtitle">
                A structured 6-month training program spanning 4 progressive phases — from laboratory calibration and geotechnical testing to automation software creation, highway design, and asphalt research.
              </p>
              <div className="section-divider" />
            </div>
          </FadeIn>

          {/* Phase Filter Controls */}
          <FadeIn>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', justifyContent: 'center', marginBottom: '3rem' }}>
              <button
                onClick={() => setActivePhase(null)}
                className={activePhase === null ? 'btn-primary' : 'btn-secondary'}
                style={{ fontSize: '0.85rem', padding: '0.6rem 1.25rem' }}
              >
                All 24 Weeks
              </button>
              {PHASES.map(p => (
                <button
                  key={p.id}
                  onClick={() => setActivePhase(activePhase === p.id ? null : p.id)}
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                    background: activePhase === p.id ? p.color : 'transparent',
                    color: activePhase === p.id ? '#000' : 'var(--text-secondary)',
                    fontWeight: activePhase === p.id ? 700 : 600,
                    fontSize: '0.85rem', padding: '0.6rem 1.25rem',
                    borderRadius: '8px', border: `1px solid ${activePhase === p.id ? p.color : 'rgba(255,255,255,0.15)'}`,
                    cursor: 'pointer', transition: 'all 0.25s',
                    fontFamily: 'Rajdhani, sans-serif',
                  }}
                >
                  {p.icon} {p.label} ({p.weeks})
                </button>
              ))}
            </div>
          </FadeIn>

          {/* Timeline Grid */}
          <div className="timeline-container">
            {PHASES.filter(p => !activePhase || p.id === activePhase).map(phase => (
              <div key={phase.id} className="phase-group">
                <div className="phase-header">
                  <span style={{ color: phase.color }}>{phase.icon}</span>
                  <span className="phase-label" style={{ color: phase.color }}>{phase.label}</span>
                  <span className="badge" style={{ background: `${phase.color}20`, color: phase.color, border: `1px solid ${phase.color}40` }}>
                    Weeks {phase.weeks}
                  </span>
                  <div className="phase-line" style={{ color: phase.color }} />
                </div>

                <div className="weeks-grid">
                  {filteredWeeks.filter(w => w.phase === phase.id).map((week, i) => {
                    const isExpanded = expandedWeek === week.week
                    return (
                      <motion.div
                        key={week.week}
                        className="week-card"
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-50px' }}
                        transition={{ duration: 0.4, delay: i * 0.04 }}
                        style={{
                          borderTopColor: week.color,
                          borderTopWidth: '3px',
                          borderTopStyle: 'solid',
                          cursor: 'pointer',
                        }}
                        onClick={() => setExpandedWeek(isExpanded ? null : week.week)}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                          <span className="week-number">Week {week.week.toString().padStart(2, '0')}</span>
                          <span style={{ fontSize: '0.72rem', color: '#94A3B8', fontFamily: 'JetBrains Mono, monospace' }}>
                            {week.standards[0]}
                          </span>
                        </div>

                        <div className="week-title">{week.title}</div>
                        <div style={{ fontSize: '0.78rem', color: week.color, marginBottom: '0.5rem', fontWeight: 600 }}>
                          {week.subtitle}
                        </div>

                        <div className="week-desc">{week.desc}</div>

                        {/* Thumbnail if image exists */}
                        {week.image && (
                          <div
                            onClick={(e) => {
                              e.stopPropagation()
                              const match = GALLERY_DATA.find(g => g.src === week.image)
                              if (match) setActiveLightboxItem(match)
                            }}
                            style={{ height: '110px', background: '#020617', borderRadius: '6px', overflow: 'hidden', margin: '0.75rem 0', position: 'relative' }}
                          >
                            <img src={week.image} alt={week.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            <div style={{ position: 'absolute', bottom: '4px', right: '6px', background: 'rgba(0,0,0,0.7)', color: '#fff', fontSize: '0.65rem', padding: '0.1rem 0.4rem', borderRadius: '4px' }}>
                              Enlarge ⤢
                            </div>
                          </div>
                        )}

                        <div className="week-tags">
                          {week.tags.map(tag => (
                            <span key={tag} className="week-tag" style={{ background: `${week.color}18`, color: week.color }}>
                              {tag}
                            </span>
                          ))}
                        </div>

                        {/* Expanded Drawer */}
                        {isExpanded && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            style={{ borderTop: '1px solid rgba(255,255,255,0.08)', marginTop: '0.85rem', paddingTop: '0.85rem' }}
                          >
                            <div style={{ fontSize: '0.82rem', color: '#E2E8F0', lineHeight: '1.6', marginBottom: '0.75rem' }}>
                              {week.extendedText}
                            </div>

                            {week.equations && (
                              <div style={{ background: 'rgba(0,0,0,0.4)', borderRadius: '6px', padding: '0.6rem 0.8rem', marginBottom: '0.75rem', fontFamily: 'JetBrains Mono, monospace', fontSize: '0.78rem', color: '#38BDF8' }}>
                                {week.equations.map((eq, k) => (
                                  <div key={k}>{eq}</div>
                                ))}
                              </div>
                            )}

                            <div style={{ marginBottom: '0.75rem' }}>
                              <div style={{ fontSize: '0.72rem', color: week.color, textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 700, marginBottom: '0.3rem' }}>
                                Key Engineering Takeaways:
                              </div>
                              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.35rem', padding: 0 }}>
                                {week.keyFindings.map((kf, k) => (
                                  <li key={k} style={{ display: 'flex', gap: '0.4rem', fontSize: '0.78rem', color: '#CBD5E1' }}>
                                    <span style={{ color: week.color }}>▹</span>
                                    <span>{kf}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            <div style={{ fontSize: '0.75rem', color: '#94A3B8', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '0.5rem' }}>
                              <strong>Deliverable: </strong>{week.deliverable}
                            </div>
                          </motion.div>
                        )}

                        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '0.6rem' }}>
                          <span style={{ fontSize: '0.72rem', color: week.color, fontFamily: 'JetBrains Mono, monospace', display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                            {isExpanded ? <>Collapse details <ChevronUp size={12} /></> : <>Expand logbook <ChevronDown size={12} /></>}
                          </span>
                        </div>
                      </motion.div>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 3: GEOTECHNICAL & MATERIALS LAB HUB (13 TESTS) ── */}
      <section className="section-glass" id="tests">
        <div className="container">
          <FadeIn>
            <div className="section-header">
              <span className="section-tag">// laboratory &amp; field quality control</span>
              <h2 className="section-title">Geotechnical &amp; <span>Materials Testing Hub</span></h2>
              <p className="section-subtitle">
                13 standardized tests conducted across soil investigation, aggregate quality, structural concrete control, and bituminous asphalt evaluation per ASTM, BS, and ICTAD Section 1602.
              </p>
              <div className="section-divider" />
            </div>
          </FadeIn>

          {/* Test Category Filters */}
          <FadeIn>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', justifyContent: 'center', marginBottom: '2.5rem' }}>
              {['All', 'Geotechnical Soil', 'Coarse Aggregate', 'Concrete QA', 'Bitumen & Asphalt'].map(cat => (
                <button
                  key={cat}
                  onClick={() => setTestCategory(cat)}
                  style={{
                    fontSize: '0.82rem',
                    padding: '0.5rem 1.1rem',
                    borderRadius: '8px',
                    border: testCategory === cat ? '1px solid var(--amber-500)' : '1px solid rgba(255,255,255,0.1)',
                    background: testCategory === cat ? 'rgba(245,158,11,0.15)' : 'rgba(255,255,255,0.02)',
                    color: testCategory === cat ? 'var(--amber-400)' : 'var(--text-secondary)',
                    fontWeight: testCategory === cat ? 700 : 500,
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </FadeIn>

          {/* Tests Grid */}
          <div className="tests-grid mb-8">
            {filteredTests.map((test, i) => (
              <motion.div
                key={test.id}
                className="test-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.45, delay: (i % 3) * 0.08 }}
                style={{ display: 'flex', flexDirection: 'column' }}
              >
                {/* Thumbnail image */}
                <div
                  onClick={() => setActiveModalTest(test)}
                  style={{ height: '140px', background: '#020617', borderRadius: '8px', overflow: 'hidden', marginBottom: '1rem', border: '1px solid rgba(255,255,255,0.06)', position: 'relative', cursor: 'pointer' }}
                >
                  <img src={test.image} alt={test.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <div style={{ position: 'absolute', top: '8px', left: '8px', background: `${test.badgeColor}25`, color: test.badgeColor, border: `1px solid ${test.badgeColor}60`, borderRadius: '4px', padding: '0.15rem 0.5rem', fontSize: '0.7rem', fontFamily: 'JetBrains Mono, monospace', fontWeight: 600 }}>
                    {test.standard.split('/')[0]}
                  </div>
                </div>

                <div className="test-card-header">
                  <div>
                    <div className="test-card-title">{test.title}</div>
                    <div className="test-card-std">{test.fullName}</div>
                  </div>
                </div>

                <div className="test-card-body" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', marginBottom: '0.75rem', lineHeight: '1.5' }}>
                    {test.purpose}
                  </p>

                  <div className="test-formula">{test.formula}</div>
                  <div style={{ fontSize: '0.75rem', color: test.badgeColor, marginBottom: '0.75rem', fontFamily: 'JetBrains Mono, monospace' }}>
                    {test.formulaLabel}
                  </div>

                  {/* Criteria Preview */}
                  <div style={{ marginTop: 'auto', background: 'rgba(0,0,0,0.25)', borderRadius: '6px', padding: '0.6rem 0.75rem', marginBottom: '0.75rem' }}>
                    <div style={{ fontSize: '0.7rem', color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.3rem' }}>
                      Primary Criteria
                    </div>
                    {test.criteria.slice(0, 2).map((c, j) => (
                      <div key={j} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', padding: '0.15rem 0' }}>
                        <span style={{ color: '#CBD5E1' }}>{c.label}:</span>
                        <strong style={{ color: c.pass ? '#34D399' : '#F87171', fontFamily: 'JetBrains Mono, monospace' }}>{c.value}</strong>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => setActiveModalTest(test)}
                    className="btn-secondary"
                    style={{ width: '100%', fontSize: '0.78rem', padding: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.35rem' }}
                  >
                    <BookOpen size={14} /> View Complete Test Dossier
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Compaction Requirements & CBR Table */}
          <div className="grid grid-2 gap-8 mt-8">
            <FadeIn>
              <div className="card">
                <h3 className="mb-4" style={{ color: 'var(--amber-400)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Activity size={20} /> Field Compaction Degree Specifications (ICTAD Sec. 1602)
                </h3>
                {COMPACTION_TABLE.map((row, i) => (
                  <div key={i} className="progress-bar-container">
                    <div className="progress-bar-label">
                      <span>{row.layer}</span>
                      <strong style={{ color: row.color }}>{row.min}</strong>
                    </div>
                    <div className="progress-bar">
                      <motion.div
                        className="progress-bar-fill"
                        style={{ background: `linear-gradient(to right, ${row.color}80, ${row.color})` }}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${row.pct}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: i * 0.08 }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </FadeIn>

            <FadeIn delay={0.15}>
              <div className="card">
                <h3 className="mb-4" style={{ color: 'var(--teal-400)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Mountain size={20} /> Subgrade CBR Classes &amp; Pavement Foundation
                </h3>
                <table className="data-table w-full">
                  <thead>
                    <tr>
                      <th>Class</th><th>CBR Range</th><th>Bearing Quality</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ['S1', '≤ 2%', 'Very Weak (Undercut & rock-fill capping)'],
                      ['S2', '3–4%', 'Weak (Requires 100mm capping layer)'],
                      ['S3', '5–7%', 'Medium (Observed Homagama Site Range)'],
                      ['S4', '8–14%', 'Strong (Observed Homagama Site Range)'],
                      ['S5', '15–29%', 'Very Strong subgrade'],
                      ['S6', '≥ 30%', 'Exceptionally Strong (Rocky terrain)'],
                    ].map(([cls, cbr, desc], i) => (
                      <tr key={i} style={(cls === 'S3' || cls === 'S4') ? { background: 'rgba(245,158,11,0.06)' } : {}}>
                        <td style={{ color: 'var(--amber-400)', fontWeight: 700, fontFamily: 'JetBrains Mono, monospace' }}>{cls}</td>
                        <td style={{ fontFamily: 'JetBrains Mono, monospace' }}>{cbr}</td>
                        <td>
                          {desc}
                          {(cls === 'S3' || cls === 'S4') && (
                            <span className="badge badge-amber" style={{ marginLeft: '0.5rem', fontSize: '0.65rem' }}>
                              Homagama Lots
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── SECTION 4: PAVEMENT DESIGN & INTERACTIVE SN CALCULATOR ── */}
      <section className="section-dark" id="pavement">
        <div className="container">
          <FadeIn>
            <div className="section-header">
              <span className="section-tag">// highway &amp; structural pavement engineering</span>
              <h2 className="section-title">Flexible Pavement <span>Design &amp; Structural Number</span></h2>
              <p className="section-subtitle">
                Designing flexible pavement layers for rural road rehabilitation using the RDA Pavement Design Manual Chart 2 and AASHTO structural number methodology.
              </p>
              <div className="section-divider" />
            </div>
          </FadeIn>

          <SnCalculator />
        </div>
      </section>

      {/* ── SECTION 5: VBA SOFTWARE SUITES (DCP & RFI) ── */}
      <section className="section-glass" id="tools">
        <div className="container">
          <FadeIn>
            <div className="section-header">
              <span className="section-tag">// industrial problem solving &amp; software automation</span>
              <h2 className="section-title">Excel VBA <span>Automation Software</span></h2>
              <p className="section-subtitle">
                Two standalone macro systems built from scratch during training — solving daily bottlenecks in geotechnical DCP logging and multi-lot RFI construction management.
              </p>
              <div className="section-divider" />
            </div>
          </FadeIn>

          {/* DCP Tool Viewer Component */}
          <div className="mb-8">
            <DcpToolViewer />
          </div>

          {/* RFI Suite Overview */}
          <div className="grid grid-2 gap-8 mt-8">
            <FadeIn>
              <div className="card" style={{ height: '100%' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
                  <div style={{ width: '44px', height: '44px', borderRadius: '10px', background: 'rgba(20, 184, 166, 0.15)', border: '1px solid rgba(20, 184, 166, 0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#14B8A6' }}>
                    <ClipboardList size={22} />
                  </div>
                  <div>
                    <h3 style={{ color: 'var(--teal-400)', fontSize: '1.2rem', fontFamily: 'Rajdhani, sans-serif', fontWeight: 700 }}>
                      Lot 1 RFI &amp; QA Automation Suite (3 Workbooks)
                    </h3>
                    <span className="badge badge-teal" style={{ fontSize: '0.7rem' }}>Industrial Problem 2</span>
                  </div>
                </div>

                <div style={{ background: 'rgba(239, 68, 68, 0.08)', border: '1px solid rgba(239, 68, 68, 0.2)', borderRadius: '8px', padding: '0.85rem', marginBottom: '0.85rem' }}>
                  <div style={{ fontSize: '0.82rem', fontWeight: 600, color: '#F87171', marginBottom: '0.2rem' }}>Problem Identified (Week 14):</div>
                  <div style={{ fontSize: '0.82rem', color: '#CBD5E1' }}>
                    Tracking inspection requests across multiple active road segments was fragmented, causing delays in Resident Engineer approvals, missing test links, and taking 3 full days to compile monthly QA reports.
                  </div>
                </div>

                <div style={{ background: 'rgba(16, 185, 129, 0.08)', border: '1px solid rgba(16, 185, 129, 0.2)', borderRadius: '8px', padding: '0.85rem', marginBottom: '1.25rem' }}>
                  <div style={{ fontSize: '0.82rem', fontWeight: 600, color: '#34D399', marginBottom: '0.2rem' }}>Engineered Solution:</div>
                  <div style={{ fontSize: '0.82rem', color: '#CBD5E1' }}>
                    Interconnected 3 macro workbooks: LOT1_RFI_Entry.xlsm, BOQ Item Details.xlsm, and RFI Items.xlsm with 529 pre-coded construction activities, auto-populating inspection forms and instant monthly QA reports.
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {[
                    { title: 'Road Summary & Chainage Tracker', desc: 'Master sheet logging all submissions by road number, date, chainage (0+000 to 1+496).' },
                    { title: '529 Pre-Coded BOQ Items', desc: 'Auto-lookup for concrete grades (CON/G15, G25), formwork (FW), reinforcement (R), drainage (DW).' },
                    { title: 'Auto-Filling Inspection Forms', desc: 'Generates formatted inspection sheets for Resident Engineer sign-off in seconds.' },
                    { title: 'Monthly QA Compilation', desc: 'Reduces monthly QA submission time from 3 working days to under 15 minutes.' },
                  ].map((feat, k) => (
                    <div key={k} style={{ padding: '0.65rem 0.85rem', background: 'rgba(255,255,255,0.02)', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.04)' }}>
                      <div style={{ fontSize: '0.84rem', fontWeight: 600, color: 'var(--teal-400)' }}>{feat.title}</div>
                      <div style={{ fontSize: '0.78rem', color: '#94A3B8' }}>{feat.desc}</div>
                    </div>
                  ))}
                </div>

                <div style={{ marginTop: '1.25rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  <a href="/docs/LOT1_RFI_Entry.xlsm" download className="btn-teal" style={{ fontSize: '0.75rem', padding: '0.45rem 0.85rem' }}>
                    <Download size={12} /> LOT1_RFI_Entry.xlsm
                  </a>
                  <a href="/docs/BOQ Item Details.xlsm" download className="btn-teal" style={{ fontSize: '0.75rem', padding: '0.45rem 0.85rem' }}>
                    <Download size={12} /> BOQ Item Details.xlsm
                  </a>
                  <a href="/docs/RFI Items.xlsm" download className="btn-teal" style={{ fontSize: '0.75rem', padding: '0.45rem 0.85rem' }}>
                    <Download size={12} /> RFI Items.xlsm
                  </a>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.15}>
              <div className="card" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <h3 className="mb-4" style={{ color: 'var(--amber-400)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <BarChart3 size={20} /> Workflow Architecture Diagram
                </h3>
                <div style={{ flex: 1, minHeight: '280px', background: '#020617', borderRadius: '10px', overflow: 'hidden', padding: '0.75rem', border: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <img
                    src="/images/presentation_image14.png"
                    alt="RFI Workflow"
                    style={{ width: '100%', maxHeight: '340px', objectFit: 'contain' }}
                  />
                </div>
                <div style={{ fontSize: '0.75rem', color: '#94A3B8', marginTop: '0.75rem', textAlign: 'center' }}>
                  Presentation Slide 6: Documentation &amp; QA Workflow Architecture for ICDP Lot 1
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── SECTION 6: ROAD STRUCTURES & DRAINAGE ── */}
      <section className="section-dark" id="drainage">
        <div className="container">
          <FadeIn>
            <div className="section-header">
              <span className="section-tag">// civil infrastructure &amp; stormwater management</span>
              <h2 className="section-title">Road Structures &amp; <span>Drainage Systems</span></h2>
              <p className="section-subtitle">
                Supervising the construction and quality control of stormwater drains, culverts, retaining walls, and earthworks ensuring long-term roadbed stability against monsoon rainfall.
              </p>
              <div className="section-divider" />
            </div>
          </FadeIn>

          <div className="grid grid-2 gap-8 mb-8">
            {DRAINAGE_STRUCTURES.map((struct, i) => (
              <FadeIn key={struct.id} delay={i * 0.1}>
                <div className="card" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  {struct.image && (
                    <div
                      onClick={() => {
                        const match = GALLERY_DATA.find(g => g.src === struct.image)
                        if (match) setActiveLightboxItem(match)
                      }}
                      style={{ height: '180px', background: '#020617', borderRadius: '8px', overflow: 'hidden', marginBottom: '1rem', border: '1px solid rgba(255,255,255,0.06)', position: 'relative', cursor: 'pointer' }}
                    >
                      <img src={struct.image} alt={struct.title} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                      <div style={{ position: 'absolute', bottom: '6px', right: '6px', background: 'rgba(0,0,0,0.7)', color: '#fff', fontSize: '0.68rem', padding: '0.15rem 0.45rem', borderRadius: '4px' }}>
                        Click to enlarge ⤢
                      </div>
                    </div>
                  )}

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                    <span className="badge badge-teal" style={{ fontSize: '0.7rem' }}>{struct.category}</span>
                    <span style={{ fontSize: '0.75rem', color: '#94A3B8' }}>{struct.materials.split(',')[0]}</span>
                  </div>

                  <h3 style={{ fontSize: '1.2rem', color: '#F8FAFC', marginBottom: '0.4rem' }}>{struct.title}</h3>
                  <p style={{ fontSize: '0.85rem', color: '#CBD5E1', lineHeight: '1.5', marginBottom: '0.75rem' }}>{struct.purpose}</p>

                  <div style={{ background: 'rgba(0,0,0,0.3)', borderRadius: '6px', padding: '0.65rem 0.85rem', marginBottom: '0.75rem', fontSize: '0.78rem', color: 'var(--amber-400)', fontFamily: 'JetBrains Mono, monospace' }}>
                    {struct.dimensions}
                  </div>

                  <div style={{ marginTop: 'auto' }}>
                    <div style={{ fontSize: '0.72rem', color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.35rem', fontWeight: 600 }}>
                      Engineering Specifications:
                    </div>
                    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.35rem', padding: 0 }}>
                      {struct.keySpecs.map((ks, k) => (
                        <li key={k} style={{ display: 'flex', gap: '0.4rem', fontSize: '0.78rem', color: '#CBD5E1' }}>
                          <span style={{ color: 'var(--teal-400)' }}>▹</span>
                          <span>{ks}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 7: ASPHALT RESEARCH ── */}
      <section className="section-glass" id="research">
        <div className="container">
          <FadeIn>
            <div className="section-header">
              <span className="section-tag">// rda value engineering study</span>
              <h2 className="section-title">Asphalt Thickness <span>Optimization Study</span></h2>
              <p className="section-subtitle">
                A feasibility study on reducing the asphalt wearing course from 40mm to 25mm/30mm — commissioned by RDA as an infrastructure cost-reduction measure for rural connectivity projects.
              </p>
              <div className="section-divider" />
            </div>
          </FadeIn>

          <div className="grid grid-3 gap-6 mb-8">
            {[
              { label: 'Current Standard Baseline', value: '40 mm', sub: 'Standard Asphalt Concrete (Control)', color: 'var(--amber-400)', icon: <Layers size={24} /> },
              { label: 'Trial Section A (Lot 2)', value: '25 mm', sub: '450m Experimental Trial Section', color: 'var(--teal-400)', icon: <TrendingUp size={24} /> },
              { label: 'Trial Section B (Lot 2)', value: '30 mm', sub: '450m Experimental Trial Section', color: 'var(--emerald-400)', icon: <TrendingUp size={24} /> },
            ].map((item, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="card text-center" style={{ height: '100%' }}>
                  <div style={{ color: item.color, display: 'flex', justifyContent: 'center', marginBottom: '0.75rem' }}>{item.icon}</div>
                  <div style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: '2.4rem', fontWeight: 700, color: item.color }}>{item.value}</div>
                  <div style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.2rem' }}>{item.label}</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{item.sub}</div>
                </div>
              </FadeIn>
            ))}
          </div>

          <div className="grid grid-2 gap-8">
            <FadeIn>
              <div className="card" style={{ height: '100%' }}>
                <h3 className="mb-4" style={{ color: 'var(--amber-400)' }}>Study Context &amp; Experimental Design</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {[
                    { label: 'Project Road', value: 'COL/2 — ~4.7 km (Lot 2 rural network segment)' },
                    { label: 'Trial Length', value: 'Two independent 450-meter test sections' },
                    { label: 'Client / Oversight', value: 'Road Development Authority (RDA) & Euro Group' },
                    { label: 'Trainee Role', value: 'Materials Engineer Trainee (Lead Field QA & Testing)' },
                    { label: 'Design Target', value: 'Maintain Structural Number SN ≥ 35.0 for 15-year traffic' },
                    { label: 'Economic Goal', value: 'Reduce high-cost bitumen usage by ~22.5% per kilometer' },
                  ].map(({ label, value }, i) => (
                    <div key={i} style={{ display: 'flex', gap: '1rem', padding: '0.6rem 0', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                      <div style={{ minWidth: '140px', fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</div>
                      <div style={{ fontSize: '0.85rem', color: 'var(--text-primary)', fontWeight: 500 }}>{value}</div>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.15}>
              <div className="card" style={{ height: '100%' }}>
                <h3 className="mb-4" style={{ color: 'var(--teal-400)' }}>Key Findings &amp; Engineering Recommendations</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {[
                    { title: 'Structural Capacity Verification', desc: 'The 30mm section achieved SN = 35.2 when paired with 175mm ABC base, satisfying RDA design requirements for rural traffic.' },
                    { title: 'Cost-Reduction Magnitude', desc: 'Yielded an estimated 22.5% direct cost saving on asphalt concrete wearing course materials across the contract.' },
                    { title: 'Tack Coat Enhancement', desc: 'Recommended polymer-modified or high-bond cationic emulsion tack coat to prevent delamination of the 30mm layer under heavy braking.' },
                    { title: 'Aggregate Size Threshold', desc: 'Specified maximum nominal aggregate size of 10mm (down from 14mm) to ensure adequate compaction density in thin lifts.' },
                  ].map((rec, i) => (
                    <div key={i} style={{ padding: '0.75rem', background: 'rgba(255,255,255,0.02)', borderRadius: '8px', borderLeft: '3px solid var(--teal-400)' }}>
                      <div style={{ fontWeight: 600, fontSize: '0.86rem', color: '#F1F5F9', marginBottom: '0.2rem' }}>{rec.title}</div>
                      <div style={{ fontSize: '0.8rem', color: '#94A3B8' }}>{rec.desc}</div>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── SECTION 8: MANAGERIAL PRACTICES, HSE & SWOT ── */}
      <section className="section-dark" id="managerial">
        <div className="container">
          <FadeIn>
            <div className="section-header">
              <span className="section-tag">// management, safety &amp; organizational ethics</span>
              <h2 className="section-title">Managerial Practices &amp; <span>HSE Culture</span></h2>
              <p className="section-subtitle">
                Addressing organizational bottlenecks through a digital Trello proposal, enforcing safety toolbox talks, and performing comprehensive SWOT analysis.
              </p>
              <div className="section-divider" />
            </div>
          </FadeIn>

          <div className="grid grid-2 gap-8 mb-8">
            {/* Trello Proposal */}
            <FadeIn>
              <div className="card" style={{ height: '100%' }}>
                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
                  <span className="badge badge-amber">Managerial Problem Proposal</span>
                  <span style={{ fontSize: '0.75rem', color: '#94A3B8', marginLeft: 'auto' }}>Submitted: 22 Jan 2025</span>
                </div>
                <h3 style={{ marginBottom: '0.75rem', color: '#F8FAFC' }}>The Lab Daily Planning Gap</h3>
                <p style={{ fontSize: '0.86rem', color: '#CBD5E1', lineHeight: '1.6', marginBottom: '1rem' }}>
                  While the project office utilized a whiteboard for daily management, the central materials laboratory operated without any formal daily work planning system. This led to misallocated technician hours, overlapping test assignments, and delayed test submission to site teams.
                </p>

                <h4 style={{ fontSize: '0.9rem', color: 'var(--amber-400)', marginBottom: '0.5rem', textTransform: 'uppercase' }}>
                  Proposed Solution: Trello + Whiteboard Hybrid
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.25rem' }}>
                  {[
                    { title: 'Trello Board (Digital)', desc: 'For Materials Engineers & Trainees — task cards, deadlines, test certificate tracking.' },
                    { title: 'Whiteboard (Visual Physical)', desc: 'For Lab Helpers & Technicians — daily testing queues and apparatus availability.' },
                    { title: '15-Minute Morning Meetings', desc: 'Daily coordination to align field sampling schedules with concrete pour times.' },
                  ].map((item, i) => (
                    <div key={i} style={{ display: 'flex', gap: '0.5rem', padding: '0.6rem', background: 'rgba(255,255,255,0.02)', borderRadius: '6px' }}>
                      <CheckCircle2 size={16} style={{ color: 'var(--amber-400)', flexShrink: 0, marginTop: '2px' }} />
                      <div>
                        <strong style={{ fontSize: '0.82rem', color: '#F1F5F9' }}>{item.title}: </strong>
                        <span style={{ fontSize: '0.8rem', color: '#94A3B8' }}>{item.desc}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <a href="/docs/Managerial Problem Proposal.pdf" target="_blank" rel="noreferrer" className="btn-secondary" style={{ fontSize: '0.8rem', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
                  <ExternalLink size={14} /> View Full Proposal (PDF)
                </a>
              </div>
            </FadeIn>

            {/* HSE Protocols */}
            <FadeIn delay={0.15}>
              <div className="card" style={{ height: '100%' }}>
                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
                  <span className="badge badge-emerald">Occupational Health, Safety &amp; Environment</span>
                </div>
                <h3 style={{ marginBottom: '0.75rem', color: '#F8FAFC' }}>Safety Protocols &amp; Toolbox Meetings</h3>
                <p style={{ fontSize: '0.86rem', color: '#CBD5E1', lineHeight: '1.6', marginBottom: '1rem' }}>
                  Industrial training prioritized rigorous compliance with international Health, Safety, and Environment (HSE) standards across all active carriageways and testing facilities.
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1.25rem' }}>
                  <div
                    onClick={() => {
                      const match = GALLERY_DATA.find(g => g.id === 'g10')
                      if (match) setActiveLightboxItem(match)
                    }}
                    style={{ height: '110px', background: '#020617', borderRadius: '8px', overflow: 'hidden', cursor: 'pointer', position: 'relative' }}
                  >
                    <img src="/images/report_image12.png" alt="Safety Briefing" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <div style={{ position: 'absolute', bottom: '4px', left: '6px', background: 'rgba(0,0,0,0.7)', color: '#fff', fontSize: '0.65rem', padding: '0.1rem 0.35rem', borderRadius: '3px' }}>
                      Toolbox Talk 1
                    </div>
                  </div>
                  <div
                    onClick={() => {
                      const match = GALLERY_DATA.find(g => g.id === 'g21')
                      if (match) setActiveLightboxItem(match)
                    }}
                    style={{ height: '110px', background: '#020617', borderRadius: '8px', overflow: 'hidden', cursor: 'pointer', position: 'relative' }}
                  >
                    <img src="/images/presentation_image22.png" alt="Crack Survey" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <div style={{ position: 'absolute', bottom: '4px', left: '6px', background: 'rgba(0,0,0,0.7)', color: '#fff', fontSize: '0.65rem', padding: '0.1rem 0.35rem', borderRadius: '3px' }}>
                      Crack Survey
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                  {[
                    'Daily Morning Toolbox Briefings before plant mobilization.',
                    'Mandatory PPE Enforcement: High-vis vests, steel-toe boots, hard hats, dust respirators.',
                    'Pre-construction structural crack surveys on adjacent residences prior to roller vibration.',
                    'Environmental mitigation: Regular bowser water spraying for dust suppression and bunded fuel storage.',
                  ].map((point, k) => (
                    <div key={k} style={{ display: 'flex', gap: '0.45rem', fontSize: '0.8rem', color: '#CBD5E1' }}>
                      <ShieldCheck size={16} style={{ color: '#10B981', flexShrink: 0, marginTop: '2px' }} />
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>

          {/* SWOT Analysis Matrix */}
          <FadeIn delay={0.2}>
            <div className="card">
              <h3 className="mb-4" style={{ color: 'var(--amber-400)' }}>Comprehensive SWOT Analysis</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
                <div style={{ background: 'rgba(16, 185, 129, 0.08)', padding: '1rem', borderRadius: '8px', border: '1px solid rgba(16, 185, 129, 0.25)' }}>
                  <div style={{ color: '#34D399', fontWeight: 700, fontSize: '0.95rem', marginBottom: '0.5rem' }}>Strengths (S)</div>
                  <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.35rem', fontSize: '0.8rem', color: '#CBD5E1' }}>
                    <li>• C1-grade contractor with proven highway execution capacity.</li>
                    <li>• Fully equipped in-house testing lab reducing third-party delays.</li>
                    <li>• Rapid software adaptation (Excel VBA automation adoption).</li>
                  </ul>
                </div>

                <div style={{ background: 'rgba(239, 68, 68, 0.08)', padding: '1rem', borderRadius: '8px', border: '1px solid rgba(239, 68, 68, 0.25)' }}>
                  <div style={{ color: '#F87171', fontWeight: 700, fontSize: '0.95rem', marginBottom: '0.5rem' }}>Weaknesses (W)</div>
                  <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.35rem', fontSize: '0.8rem', color: '#CBD5E1' }}>
                    <li>• Heavy reliance on manual paper documentation across site engineers.</li>
                    <li>• Occasional procurement lead-time bottlenecks for specialized parts.</li>
                    <li>• Labor turnover during monsoon season weather disruptions.</li>
                  </ul>
                </div>

                <div style={{ background: 'rgba(56, 189, 248, 0.08)', padding: '1rem', borderRadius: '8px', border: '1px solid rgba(56, 189, 248, 0.25)' }}>
                  <div style={{ color: '#38BDF8', fontWeight: 700, fontSize: '0.95rem', marginBottom: '0.5rem' }}>Opportunities (O)</div>
                  <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.35rem', fontSize: '0.8rem', color: '#CBD5E1' }}>
                    <li>• Expansion into major expressway and urban asphalt overlay tenders.</li>
                    <li>• Enterprise digitization of lab test records and automated billing.</li>
                    <li>• Adoption of recycled asphalt pavement (RAP) green technologies.</li>
                  </ul>
                </div>

                <div style={{ background: 'rgba(245, 158, 11, 0.08)', padding: '1rem', borderRadius: '8px', border: '1px solid rgba(245, 158, 11, 0.25)' }}>
                  <div style={{ color: '#F59E0B', fontWeight: 700, fontSize: '0.95rem', marginBottom: '0.5rem' }}>Threats (T)</div>
                  <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.35rem', fontSize: '0.8rem', color: '#CBD5E1' }}>
                    <li>• Extreme weather and intense monsoon rainfall causing roadbed erosion.</li>
                    <li>• Fluctuation in imported bitumen prices and quarry aggregate royalties.</li>
                    <li>• Tight donor agency compliance milestones and audit scrutiny.</li>
                  </ul>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── SECTION 9: AUTHENTIC FIELD & LAB PHOTO GALLERY ── */}
      <section className="section-glass" id="gallery">
        <div className="container">
          <FadeIn>
            <div className="section-header">
              <span className="section-tag">// field documentation &amp; visual media</span>
              <h2 className="section-title">Authentic <span>Engineering Photo Gallery</span></h2>
              <p className="section-subtitle">
                Original photographic records and technical figures captured during the 24-week internship across Homagama road sites and the CEC materials laboratory.
              </p>
              <div className="section-divider" />
            </div>
          </FadeIn>

          {/* Category Filter */}
          <FadeIn>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', justifyContent: 'center', marginBottom: '2.5rem' }}>
              {['All', 'Field Works', 'Materials Lab', 'Software Automation', 'Safety & HSE', 'Schematics'].map(cat => (
                <button
                  key={cat}
                  onClick={() => setGalleryCategory(cat)}
                  style={{
                    fontSize: '0.82rem',
                    padding: '0.5rem 1.1rem',
                    borderRadius: '8px',
                    border: galleryCategory === cat ? '1px solid var(--amber-500)' : '1px solid rgba(255,255,255,0.1)',
                    background: galleryCategory === cat ? 'rgba(245,158,11,0.15)' : 'rgba(255,255,255,0.02)',
                    color: galleryCategory === cat ? 'var(--amber-400)' : 'var(--text-secondary)',
                    fontWeight: galleryCategory === cat ? 700 : 500,
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </FadeIn>

          {/* Gallery Grid */}
          <div className="gallery-grid">
            {filteredGallery.map((item) => (
              <motion.div
                key={item.id}
                className="gallery-card"
                whileHover={{ y: -6 }}
                onClick={() => setActiveLightboxItem(item)}
              >
                <div className="gallery-thumb-container">
                  <img src={item.src} alt={item.title} className="gallery-thumb" />
                  {item.figureNo && (
                    <div className="gallery-overlay-badge">
                      {item.figureNo}
                    </div>
                  )}
                </div>
                <div className="gallery-info">
                  <div className="gallery-title">{item.title}</div>
                  <div className="gallery-caption">{item.caption}</div>
                  <div className="gallery-footer">
                    <span>{item.category}</span>
                    <span>{item.locationOrDate}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 10: DOWNLOADS & RESOURCES ── */}
      <section className="section-dark" id="downloads">
        <div className="container">
          <FadeIn>
            <div className="section-header">
              <span className="section-tag">// documents, presentations &amp; vba code</span>
              <h2 className="section-title">Official Reports &amp; <span>Downloads</span></h2>
              <p className="section-subtitle">
                Download the complete academic report, defense slide deck, macro-enabled Excel VBA tools, and technical proposals.
              </p>
              <div className="section-divider" />
            </div>
          </FadeIn>

          {['Main Report', 'Presentation', 'VBA Tool', 'Proposal', 'Credential'].map(cat => (
            <div key={cat} style={{ marginBottom: '2.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                <h4 style={{ fontFamily: 'Rajdhani, sans-serif', color: 'var(--amber-400)', fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  {cat}s
                </h4>
                <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.08)' }} />
              </div>

              <div className="download-grid">
                {DOWNLOADS.filter(d => d.category === cat).map((doc, i) => (
                  <motion.a
                    key={i}
                    href={doc.file}
                    download
                    className="download-card"
                    whileHover={{ y: -3 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className={`download-icon ${doc.iconClass}`}>
                      {doc.ext === 'PDF' && <FileText size={20} />}
                      {doc.ext === 'XLSM' && <Cpu size={20} />}
                      {doc.ext === 'PPTX' && <BarChart3 size={20} />}
                      {doc.ext === 'DOCX' && <FileText size={20} />}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div className="download-name">{doc.name}</div>
                      <div className="download-meta">{doc.desc}</div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.35rem' }}>
                      <span className={`badge ${doc.ext === 'PDF' ? 'badge-red' : doc.ext === 'XLSM' ? 'badge-emerald' : doc.ext === 'PPTX' ? 'badge-amber' : 'badge-teal'}`} style={{ fontSize: '0.65rem' }}>
                        {doc.ext} • {doc.size}
                      </span>
                      <Download size={15} style={{ color: 'var(--text-muted)' }} />
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="footer">
        <div className="container footer-inner">
          <div>
            <div className="footer-brand">Premakumara <span>H.P.S.</span></div>
            <div className="footer-meta">
              <div>Registration No: 210494D | B.Sc. (Hons) in Materials Science &amp; Engineering</div>
              <div>Department of Materials Science &amp; Engineering | University of Moratuwa, Sri Lanka</div>
              <div style={{ marginTop: '0.4rem', color: 'var(--teal-400)', fontSize: '0.82rem' }}>
                Academic Module: MT 3993 — Industrial Training (Academic Supervisor: Sr. Lec. S. P. Guluwita)
              </div>
            </div>
          </div>
          <div>
            <div className="footer-meta" style={{ textAlign: 'right' }}>
              <div style={{ color: '#F8FAFC', fontWeight: 600 }}>Consulting Engineering &amp; Contractors (Pvt) Ltd</div>
              <div>Inclusive Connectivity &amp; Development Project (ICDP)</div>
              <div>World Bank Funded | Client: Road Development Authority (RDA)</div>
              <div style={{ marginTop: '0.4rem', color: '#94A3B8' }}>Homagama Project Network — Western Province, Sri Lanka</div>
            </div>
          </div>
        </div>
        <div className="container" style={{ marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
            ICTAD C1 Rated | ISO 9001:2015 Certified | SCA/4 &amp; SCA/5 Contract Compliant
          </div>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
            Engineered with Precision &amp; Technical Excellence 🏗️
          </div>
        </div>
      </footer>
    </>
  )
}
