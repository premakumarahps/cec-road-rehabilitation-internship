import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Code2, CheckCircle2, Cpu, Download } from 'lucide-react'

interface DcpStep {
  step: number
  title: string
  sub: string
  image: string
  vbaModule: string
  vbaSub: string
  desc: string
  keyFeatures: string[]
}

const DCP_STEPS: DcpStep[] = [
  {
    step: 1,
    title: 'Input Panel & Metadata Entry',
    sub: 'Central Control Dashboard for Field Technicians',
    image: '/images/cec_pdf_p65_180.png',
    vbaModule: 'ClearerDCPData',
    vbaSub: 'Workbook_Open / btn_clear_input_data_Click',
    desc: 'The central user interface of the DCP Test Report Generator. Designed with minimal clutter, allowing technicians to enter test location, Road ID, Report Number, Chainage, Offset (m), Hole Depth (mm), and raw cumulative blow counts. Controls workflow state using internal workbook flags (D24, D25, D26).',
    keyFeatures: [
      'Locks workbook from accidental closing until test summary workflow is marked complete.',
      'Auto-sanitizes Road ID and Report Number strings to prevent invalid Excel sheet naming.',
      'Clear Input button resets all input cells and results without breaking locked cell formulas.'
    ]
  },
  {
    step: 2,
    title: 'Raw Penetration Data Entry',
    sub: 'Entering Cumulative Blows and Penetration Depths',
    image: '/images/cec_pdf_p66_183.png',
    vbaModule: 'ClearerDCPData',
    vbaSub: 'ClearDCPData() & ValidateInput()',
    desc: 'Technicians enter blow readings at consecutive increments. The sheet immediately validates that cumulative depths increase monotonically and detects zero initial readings. A dedicated reset mechanism clears previous test values with a single click before initiating new data entry.',
    keyFeatures: [
      'Input validation prevents non-monotonic penetration readings from skewing rate calculations.',
      'Zero-reading calibration subtracts seating depth automatically.',
      'Dynamic range detection auto-identifies the bottom of test data (up to 1200 mm).'
    ]
  },
  {
    step: 3,
    title: 'RMSD Automatic Layer Detection',
    sub: 'Root Mean Square Deviation Boundary Algorithm',
    image: '/images/cec_pdf_p67_187.png',
    vbaModule: 'DetectorDCPLayers',
    vbaSub: 'DetectDCPLayer() & SmoothDCPData()',
    desc: 'When clicking "Create Test Report", the algorithm calculates the Root Mean Square Deviation (RMSD) for successive linear penetration segments. Breakpoints identify changes in penetration resistance (DPI = mm/blow), mathematically delineating distinct soil layers up to a maximum threshold of 12 layers.',
    keyFeatures: [
      'Applies least-squares linear regression to identify inflection slopes in depth vs. blow data.',
      'Prompts user with optional data smoothing interpolation to remove momentary anvil vibration noise.',
      'Computes layer thicknesses, total blows per layer, and mean DPI automatically.'
    ]
  },
  {
    step: 4,
    title: 'Generated Individual Test Report Sheet',
    sub: 'Auto-Plotted Depth Curve & CBR Profile Table',
    image: '/images/cec_pdf_p68_192.png',
    vbaModule: 'Generator1TestReport',
    vbaSub: 'CreateDCPTestReport()',
    desc: 'The macro clones the hidden DCP_Test_Report_Template sheet, names it RD_<RoadID>_DCP_<ReportNo>, inserts the header metadata, populates raw data, plots an inverted depth-vs-blow graph, and formats the layer summary table computing layer CBR values using CBR = 292 × DPI^(-1.12).',
    keyFeatures: [
      'Generates client-ready report sheet in seconds with standard RDA/ICTAD project branding.',
      'Plots depth on inverted Y-axis (0 to 1000mm) against cumulative blows on X-axis.',
      'Calculates CBR (%) for each detected layer, highlighting weak subgrade layers in color.'
    ]
  },
  {
    step: 5,
    title: 'Master Road Chainage Summary Compilation',
    sub: 'Compiling All Test Results by Chainage & Offset',
    image: '/images/cec_pdf_p69_196.png',
    vbaModule: 'Generator2FinishReportCreation',
    vbaSub: 'FinishDCPTestReportCreation()',
    desc: 'After completing all test points along a road segment, clicking "Finish Report Creation" triggers compilation. The macro reads all generated report sheets, splits them into Carriageway (offset < 1.5m) and Shoulder (offset ≥ 1.5m), sorts them by chainage (e.g. 0+000 to 1+496), inserts separator breaks, and compiles a comprehensive master summary.',
    keyFeatures: [
      'Groups and sorts tests systematically by chainage prefix, automatically inserting row dividers.',
      'Separates carriageway tests from shoulder tests for distinct compaction acceptance reviews.',
      'Releases the workbook close-lock, allowing the final compiled workbook to be saved and archived.'
    ]
  }
]

export const DcpToolViewer: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(1)
  const current = DCP_STEPS.find(s => s.step === activeStep) || DCP_STEPS[0]

  return (
    <div className="card" style={{ border: '1px solid rgba(245, 158, 11, 0.3)', background: 'linear-gradient(145deg, rgba(15, 23, 42, 0.95), rgba(41, 26, 6, 0.35))' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '0.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ width: '44px', height: '44px', borderRadius: '10px', background: 'rgba(245, 158, 11, 0.15)', border: '1px solid rgba(245, 158, 11, 0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#F59E0B' }}>
            <Cpu size={24} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <h3 style={{ color: '#F8FAFC', fontSize: '1.25rem', fontFamily: 'Rajdhani, sans-serif', fontWeight: 700 }}>
                DCP Report Generator — Software Architecture & Workflow
              </h3>
              <span className="badge badge-amber" style={{ fontSize: '0.7rem' }}>Industrial Problem 1</span>
            </div>
            <span style={{ fontSize: '0.8rem', color: '#94A3B8' }}>
              Interactive 5-stage walkthrough of the macro-enabled Excel tool developed during Week 4
            </span>
          </div>
        </div>

        <a
          href="/docs/DCP Test Report Generator.xlsm"
          download
          className="btn-primary"
          style={{ fontSize: '0.82rem', padding: '0.55rem 1.1rem', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
        >
          <Download size={14} /> Download Tool (.xlsm)
        </a>
      </div>

      {/* Step Selector Tabs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.5rem', marginBottom: '1.5rem' }}>
        {DCP_STEPS.map((s) => (
          <button
            key={s.step}
            onClick={() => setActiveStep(s.step)}
            style={{
              padding: '0.75rem 0.85rem',
              borderRadius: '8px',
              border: activeStep === s.step ? '1px solid #F59E0B' : '1px solid rgba(255, 255, 255, 0.08)',
              background: activeStep === s.step ? 'rgba(245, 158, 11, 0.15)' : 'rgba(255, 255, 255, 0.02)',
              color: activeStep === s.step ? '#F59E0B' : '#94A3B8',
              textAlign: 'left',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
          >
            <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.7rem', color: activeStep === s.step ? '#F59E0B' : '#64748B', marginBottom: '0.2rem' }}>
              STAGE 0{s.step}
            </div>
            <div style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 700, fontSize: '0.85rem', color: activeStep === s.step ? '#F8FAFC' : '#CBD5E1', lineHeight: '1.2' }}>
              {s.title.split('&')[0]}
            </div>
          </button>
        ))}
      </div>

      {/* Active Step Viewer */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current.step}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.3 }}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.75rem', alignItems: 'center' }}
        >
          {/* Screenshot Display */}
          <div style={{ background: '#020617', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.1)', overflow: 'hidden', padding: '0.75rem', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '0.5rem', borderBottom: '1px solid rgba(255,255,255,0.06)', marginBottom: '0.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#EF4444' }} />
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#F59E0B' }} />
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#10B981' }} />
                <span style={{ fontSize: '0.72rem', color: '#64748B', marginLeft: '0.5rem', fontFamily: 'JetBrains Mono, monospace' }}>
                  DCP_Test_Report_Generator.xlsm — {current.title}
                </span>
              </div>
              <span className="badge badge-amber" style={{ fontSize: '0.65rem' }}>Actual UI Screenshot</span>
            </div>

            <div style={{ position: 'relative', overflow: 'hidden', borderRadius: '8px', minHeight: '260px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <img
                src={current.image}
                alt={current.title}
                style={{ width: '100%', maxHeight: '380px', objectFit: 'contain', borderRadius: '6px' }}
              />
            </div>
          </div>

          {/* Technical Details Panel */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
                <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.75rem', color: '#F59E0B', fontWeight: 600 }}>
                  STEP {current.step} OF 5
                </span>
                <span style={{ color: '#475569' }}>•</span>
                <span style={{ fontSize: '0.78rem', color: '#14B8A6', fontWeight: 500 }}>
                  {current.sub}
                </span>
              </div>

              <h4 style={{ color: '#F8FAFC', fontSize: '1.35rem', fontFamily: 'Rajdhani, sans-serif', fontWeight: 700, marginBottom: '0.75rem' }}>
                {current.title}
              </h4>

              <p style={{ color: '#CBD5E1', fontSize: '0.88rem', lineHeight: '1.6', marginBottom: '1rem' }}>
                {current.desc}
              </p>
            </div>

            {/* VBA Code Routine Box */}
            <div style={{ background: 'rgba(0, 0, 0, 0.4)', borderRadius: '8px', padding: '0.85rem 1rem', border: '1px solid rgba(245, 158, 11, 0.2)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#F59E0B', fontSize: '0.75rem', fontFamily: 'JetBrains Mono, monospace', fontWeight: 600, marginBottom: '0.3rem' }}>
                <Code2 size={14} />
                <span>Module: {current.vbaModule}</span>
              </div>
              <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.82rem', color: '#38BDF8' }}>
                Sub {current.vbaSub}
              </div>
            </div>

            {/* Key Capabilities List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
              <span style={{ fontSize: '0.72rem', color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600 }}>
                Algorithmic & Process Highlights
              </span>
              {current.keyFeatures.map((kf, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.82rem', color: '#E2E8F0' }}>
                  <CheckCircle2 size={15} style={{ color: '#10B981', flexShrink: 0, marginTop: '2px' }} />
                  <span>{kf}</span>
                </div>
              ))}
            </div>

            {/* Navigation buttons */}
            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
              {activeStep > 1 && (
                <button
                  onClick={() => setActiveStep(activeStep - 1)}
                  className="btn-secondary"
                  style={{ fontSize: '0.8rem', padding: '0.5rem 1rem' }}
                >
                  ◀ Previous Stage
                </button>
              )}
              {activeStep < 5 && (
                <button
                  onClick={() => setActiveStep(activeStep + 1)}
                  className="btn-primary"
                  style={{ fontSize: '0.8rem', padding: '0.5rem 1rem', display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}
                >
                  Next Stage ▶
                </button>
              )}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
