import React, { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Wrench, BookOpen, Layers, Activity } from 'lucide-react'
import type { TestDetail } from '../data/testsData'

interface TestDetailModalProps {
  test: TestDetail | null
  onClose: () => void
}

export const TestDetailModal: React.FC<TestDetailModalProps> = ({ test, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  if (!test) return null

  return (
    <AnimatePresence>
      <motion.div
        className="modal-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(5, 7, 13, 0.88)',
          backdropFilter: 'blur(10px)',
          zIndex: 9998,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1.25rem',
        }}
      >
        <motion.div
          className="modal-card"
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          onClick={(e) => e.stopPropagation()}
          style={{
            maxWidth: '920px',
            width: '100%',
            maxHeight: '88vh',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: '#0F172A',
            borderRadius: '16px',
            border: `1px solid ${test.badgeColor}40`,
            boxShadow: `0 25px 50px -12px rgba(0, 0, 0, 0.9), 0 0 25px ${test.badgeColor}15`,
            overflow: 'hidden',
          }}
        >
          {/* Header */}
          <div
            style={{
              padding: '1.25rem 1.75rem',
              backgroundColor: '#1E293B',
              borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.25rem' }}>
                <span
                  style={{
                    background: `${test.badgeColor}20`,
                    color: test.badgeColor,
                    border: `1px solid ${test.badgeColor}50`,
                    padding: '0.2rem 0.6rem',
                    borderRadius: '6px',
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    fontFamily: 'JetBrains Mono, monospace',
                  }}
                >
                  {test.standard}
                </span>
                <span style={{ fontSize: '0.8rem', color: '#94A3B8' }}>{test.category}</span>
              </div>
              <h2 style={{ color: '#F8FAFC', fontSize: '1.35rem', fontFamily: 'Rajdhani, sans-serif', fontWeight: 700 }}>
                {test.title}
              </h2>
            </div>

            <button
              onClick={onClose}
              style={{
                background: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                borderRadius: '50%',
                width: '36px',
                height: '36px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#CBD5E1',
                cursor: 'pointer',
              }}
            >
              <X size={18} />
            </button>
          </div>

          {/* Body Content - Scrollable */}
          <div
            style={{
              padding: '1.5rem 1.75rem',
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5rem',
            }}
          >
            {/* Top Grid: Image + Apparatus */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
              {/* Test Image */}
              <div style={{ background: '#020617', borderRadius: '10px', padding: '0.5rem', border: '1px solid rgba(255,255,255,0.08)', display: 'flex', flexDirection: 'column' }}>
                <div style={{ flex: 1, minHeight: '220px', maxHeight: '280px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', borderRadius: '6px' }}>
                  <img
                    src={test.image}
                    alt={test.title}
                    style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                  />
                </div>
                <div style={{ fontSize: '0.75rem', color: '#94A3B8', marginTop: '0.5rem', textAlign: 'center', fontStyle: 'italic' }}>
                  {test.imageCaption}
                </div>
              </div>

              {/* Apparatus & Specs */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <h4 style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: test.badgeColor, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  <Wrench size={16} /> Apparatus &amp; Equipment Specifications
                </h4>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', padding: 0 }}>
                  {test.apparatus.map((app, i) => (
                    <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.82rem', color: '#CBD5E1', lineHeight: '1.4' }}>
                      <span style={{ color: test.badgeColor, marginTop: '2px' }}>▹</span>
                      <span>{app}</span>
                    </li>
                  ))}
                </ul>

                {/* Formula Highlight */}
                <div style={{ background: 'rgba(0,0,0,0.4)', borderRadius: '8px', padding: '0.85rem', border: `1px solid ${test.badgeColor}30`, marginTop: 'auto' }}>
                  <div style={{ fontSize: '0.72rem', color: test.badgeColor, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.25rem', fontFamily: 'JetBrains Mono, monospace' }}>
                    Governing Equation
                  </div>
                  <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.95rem', color: '#38BDF8', fontWeight: 600 }}>
                    {test.formula}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#94A3B8', marginTop: '0.2rem' }}>
                    {test.formulaLabel}
                  </div>
                </div>
              </div>
            </div>

            {/* Test Purpose & Objective */}
            <div>
              <h4 style={{ color: '#F8FAFC', fontSize: '0.95rem', marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <BookOpen size={16} style={{ color: test.badgeColor }} /> Engineering Objective &amp; Significance
              </h4>
              <p style={{ fontSize: '0.88rem', color: '#CBD5E1', lineHeight: '1.6' }}>
                {test.purpose}
              </p>
            </div>

            {/* Step-by-Step Procedure */}
            <div>
              <h4 style={{ color: '#F8FAFC', fontSize: '0.95rem', marginBottom: '0.6rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Layers size={16} style={{ color: test.badgeColor }} /> Laboratory / Field Testing Procedure
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {test.procedure.map((step, i) => (
                  <div key={i} style={{ display: 'flex', gap: '0.75rem', padding: '0.65rem 0.85rem', background: 'rgba(255,255,255,0.02)', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.04)' }}>
                    <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: `${test.badgeColor}20`, color: test.badgeColor, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.72rem', fontWeight: 700, flexShrink: 0 }}>
                      {i + 1}
                    </div>
                    <div style={{ fontSize: '0.84rem', color: '#E2E8F0', lineHeight: '1.45' }}>
                      {step}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Acceptance Criteria & Observed Site Data */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
              {/* Acceptance Criteria Table */}
              <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.06)' }}>
                <h4 style={{ fontSize: '0.85rem', color: test.badgeColor, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.6rem' }}>
                  ICTAD / Specification Limits
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                  {test.criteria.map((c, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.4rem 0', borderBottom: '1px solid rgba(255,255,255,0.04)', fontSize: '0.82rem' }}>
                      <span style={{ color: '#CBD5E1' }}>{c.label}</span>
                      <strong style={{ color: c.pass ? '#34D399' : '#F87171', fontFamily: 'JetBrains Mono, monospace' }}>
                        {c.value}
                      </strong>
                    </div>
                  ))}
                </div>
              </div>

              {/* Observed Site Value */}
              <div style={{ background: 'rgba(20, 184, 166, 0.08)', padding: '1rem', borderRadius: '8px', border: '1px solid rgba(20, 184, 166, 0.25)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#14B8A6', fontSize: '0.82rem', fontWeight: 700, marginBottom: '0.35rem' }}>
                  <Activity size={16} /> Homagama Site Observations &amp; Results
                </div>
                <p style={{ fontSize: '0.85rem', color: '#E2E8F0', lineHeight: '1.5' }}>
                  {test.siteObserved}
                </p>
                <div style={{ marginTop: '0.75rem', fontSize: '0.78rem', color: '#94A3B8' }}>
                  <strong>Key Output: </strong>{test.output}
                </div>
              </div>
            </div>
          </div>

          {/* Footer Close */}
          <div
            style={{
              padding: '0.85rem 1.75rem',
              backgroundColor: '#1E293B',
              borderTop: '1px solid rgba(255, 255, 255, 0.08)',
              display: 'flex',
              justifyContent: 'flex-end',
            }}
          >
            <button
              onClick={onClose}
              className="btn-primary"
              style={{ fontSize: '0.82rem', padding: '0.45rem 1.25rem' }}
            >
              Close Test Dossier
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
