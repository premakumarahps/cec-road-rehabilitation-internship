import React, { useState } from 'react'
import { Calculator, CheckCircle2, AlertTriangle } from 'lucide-react'

export const SnCalculator: React.FC = () => {
  // Layer thicknesses in mm
  const [d1, setD1] = useState<number>(40)    // Asphalt Concrete
  const [d2, setD2] = useState<number>(175)   // ABC Base
  const [d3, setD3] = useState<number>(125)   // Granular Sub-base

  // Layer coefficients (RDA Manual Chart 2 units: d in mm, coefficient scale)
  // SN = (D1_cm * a1) or (D1_mm * a1)
  // RDA standard example: (20mm * 0.20) + (175mm * 0.12) + (125mm * 0.095) = 4.0 + 21.0 + 11.875 = 36.875
  const [a1, setA1] = useState<number>(0.20)
  const [a2, setA2] = useState<number>(0.12)
  const [a3, setA3] = useState<number>(0.095)

  // Subgrade CBR
  const [cbr, setCbr] = useState<number>(6.5)

  // Calculated values
  const sn1 = (d1 * a1)
  const sn2 = (d2 * a2)
  const sn3 = (d3 * a3)
  const totalSn = sn1 + sn2 + sn3

  // Required SN based on traffic and CBR
  // For rural road with traffic <0.5 million ESAL: Required SN ~ 32 - 35
  const requiredSn = cbr < 5 ? 38.0 : cbr < 8 ? 35.0 : 31.0
  const isPassing = totalSn >= requiredSn

  // Presets
  const applyPreset = (preset: 'standard' | 'trial25' | 'trial30' | 'heavy') => {
    if (preset === 'standard') {
      setD1(40); setD2(175); setD3(125); setA1(0.20); setA2(0.12); setA3(0.095);
    } else if (preset === 'trial25') {
      setD1(25); setD2(175); setD3(125); setA1(0.20); setA2(0.12); setA3(0.095);
    } else if (preset === 'trial30') {
      setD1(30); setD2(175); setD3(125); setA1(0.20); setA2(0.12); setA3(0.095);
    } else if (preset === 'heavy') {
      setD1(30); setD2(200); setD3(150); setA1(0.20); setA2(0.12); setA3(0.095);
    }
  }

  const totalThickness = d1 + d2 + d3

  return (
    <div className="card" style={{ border: '1px solid rgba(139, 92, 246, 0.3)', background: 'linear-gradient(145deg, rgba(15, 23, 42, 0.9), rgba(30, 27, 75, 0.3))' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: 'rgba(139, 92, 246, 0.15)', border: '1px solid rgba(139, 92, 246, 0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#A78BFA' }}>
            <Calculator size={22} />
          </div>
          <div>
            <h3 style={{ color: '#F1F5F9', fontSize: '1.15rem', fontFamily: 'Rajdhani, sans-serif', fontWeight: 700 }}>
              Interactive Pavement Structural Number (SN) Calculator
            </h3>
            <span style={{ fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.5)', fontFamily: 'JetBrains Mono, monospace' }}>
              RDA Pavement Design Manual Chart 2 | AASHTO Structural Sizing
            </span>
          </div>
        </div>

        {/* Preset Buttons */}
        <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
          <button
            onClick={() => applyPreset('standard')}
            style={{ fontSize: '0.72rem', padding: '0.35rem 0.65rem', borderRadius: '6px', background: d1 === 40 && d2 === 175 ? 'rgba(245, 158, 11, 0.25)' : 'rgba(255,255,255,0.05)', color: d1 === 40 && d2 === 175 ? '#F59E0B' : '#94A3B8', border: '1px solid rgba(255,255,255,0.1)', cursor: 'pointer' }}
          >
            RDA Standard (40mm)
          </button>
          <button
            onClick={() => applyPreset('trial30')}
            style={{ fontSize: '0.72rem', padding: '0.35rem 0.65rem', borderRadius: '6px', background: d1 === 30 && d2 === 175 ? 'rgba(20, 184, 166, 0.25)' : 'rgba(255,255,255,0.05)', color: d1 === 30 && d2 === 175 ? '#14B8A6' : '#94A3B8', border: '1px solid rgba(255,255,255,0.1)', cursor: 'pointer' }}
          >
            Research Trial B (30mm)
          </button>
          <button
            onClick={() => applyPreset('trial25')}
            style={{ fontSize: '0.72rem', padding: '0.35rem 0.65rem', borderRadius: '6px', background: d1 === 25 ? 'rgba(239, 68, 68, 0.25)' : 'rgba(255,255,255,0.05)', color: d1 === 25 ? '#F87171' : '#94A3B8', border: '1px solid rgba(255,255,255,0.1)', cursor: 'pointer' }}
          >
            Research Trial A (25mm)
          </button>
          <button
            onClick={() => applyPreset('heavy')}
            style={{ fontSize: '0.72rem', padding: '0.35rem 0.65rem', borderRadius: '6px', background: d2 === 200 ? 'rgba(139, 92, 246, 0.25)' : 'rgba(255,255,255,0.05)', color: d2 === 200 ? '#A78BFA' : '#94A3B8', border: '1px solid rgba(255,255,255,0.1)', cursor: 'pointer' }}
          >
            Compensated (30mm+200ABC)
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '1.25rem' }}>
        {/* Sliders Area */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {/* Layer 1: Asphalt */}
          <div style={{ background: 'rgba(255,255,255,0.02)', padding: '0.85rem', borderRadius: '8px', borderLeft: '3px solid #1E293B' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#F1F5F9' }}>1. Asphalt Concrete (Wearing Course)</span>
              <span style={{ fontSize: '0.85rem', fontFamily: 'JetBrains Mono, monospace', color: '#F59E0B', fontWeight: 700 }}>{d1} mm</span>
            </div>
            <input
              type="range"
              min="20"
              max="60"
              step="5"
              value={d1}
              onChange={(e) => setD1(Number(e.target.value))}
              style={{ width: '100%', accentColor: '#F59E0B', cursor: 'pointer' }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: '#94A3B8', marginTop: '0.2rem' }}>
              <span>Coeff $a_1$: {a1.toFixed(2)}</span>
              <span>Contribution: {sn1.toFixed(2)}</span>
            </div>
          </div>

          {/* Layer 2: ABC Base */}
          <div style={{ background: 'rgba(255,255,255,0.02)', padding: '0.85rem', borderRadius: '8px', borderLeft: '3px solid #451A03' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#F1F5F9' }}>2. Dense Graded Aggregate Base (ABC)</span>
              <span style={{ fontSize: '0.85rem', fontFamily: 'JetBrains Mono, monospace', color: '#14B8A6', fontWeight: 700 }}>{d2} mm</span>
            </div>
            <input
              type="range"
              min="100"
              max="250"
              step="5"
              value={d2}
              onChange={(e) => setD2(Number(e.target.value))}
              style={{ width: '100%', accentColor: '#14B8A6', cursor: 'pointer' }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: '#94A3B8', marginTop: '0.2rem' }}>
              <span>Coeff $a_2$: {a2.toFixed(3)}</span>
              <span>Contribution: {sn2.toFixed(2)}</span>
            </div>
          </div>

          {/* Layer 3: Sub-base */}
          <div style={{ background: 'rgba(255,255,255,0.02)', padding: '0.85rem', borderRadius: '8px', borderLeft: '3px solid #78350F' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#F1F5F9' }}>3. Granular Sub-base (SB)</span>
              <span style={{ fontSize: '0.85rem', fontFamily: 'JetBrains Mono, monospace', color: '#A78BFA', fontWeight: 700 }}>{d3} mm</span>
            </div>
            <input
              type="range"
              min="75"
              max="200"
              step="5"
              value={d3}
              onChange={(e) => setD3(Number(e.target.value))}
              style={{ width: '100%', accentColor: '#A78BFA', cursor: 'pointer' }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: '#94A3B8', marginTop: '0.2rem' }}>
              <span>Coeff $a_3$: {a3.toFixed(3)}</span>
              <span>Contribution: {sn3.toFixed(2)}</span>
            </div>
          </div>

          {/* Subgrade CBR slider */}
          <div style={{ background: 'rgba(255,255,255,0.02)', padding: '0.85rem', borderRadius: '8px', borderLeft: '3px solid #047857' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#F1F5F9' }}>Subgrade Strength (In-Situ CBR)</span>
              <span style={{ fontSize: '0.85rem', fontFamily: 'JetBrains Mono, monospace', color: '#34D399', fontWeight: 700 }}>{cbr.toFixed(1)}% ({cbr < 5 ? 'S2 Weak' : cbr < 8 ? 'S3 Medium' : 'S4 Strong'})</span>
            </div>
            <input
              type="range"
              min="2"
              max="15"
              step="0.5"
              value={cbr}
              onChange={(e) => setCbr(Number(e.target.value))}
              style={{ width: '100%', accentColor: '#34D399', cursor: 'pointer' }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: '#94A3B8', marginTop: '0.2rem' }}>
              <span>Target SN for Rural Traffic: {requiredSn.toFixed(1)}</span>
              <span>Observed Homagama Site: 6.0%–11.0%</span>
            </div>
          </div>
        </div>

        {/* Visual Layer Representation & Results Panel */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {/* Dynamic Layer Stack */}
          <div style={{ background: 'rgba(0,0,0,0.4)', borderRadius: '10px', padding: '1rem', border: '1px solid rgba(255,255,255,0.08)' }}>
            <div style={{ fontSize: '0.75rem', color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.75rem' }}>
              Pavement Cross-Section Preview (Total: {totalThickness} mm)
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', borderRadius: '8px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)' }}>
              {/* Asphalt Layer */}
              <div
                style={{
                  height: `${Math.max(28, (d1 / totalThickness) * 160)}px`,
                  background: '#18181B',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0 0.85rem',
                  borderBottom: '2px solid rgba(245, 158, 11, 0.4)',
                  transition: 'height 0.2s',
                }}
              >
                <span style={{ fontSize: '0.78rem', color: '#F4F4F5', fontWeight: 600 }}>Asphalt Concrete</span>
                <span style={{ fontSize: '0.75rem', fontFamily: 'JetBrains Mono, monospace', color: '#F59E0B' }}>{d1} mm (SN +{sn1.toFixed(2)})</span>
              </div>

              {/* ABC Base */}
              <div
                style={{
                  height: `${Math.max(45, (d2 / totalThickness) * 160)}px`,
                  background: '#3E2723',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0 0.85rem',
                  borderBottom: '2px solid rgba(20, 184, 166, 0.4)',
                  transition: 'height 0.2s',
                }}
              >
                <span style={{ fontSize: '0.78rem', color: '#E2E8F0', fontWeight: 600 }}>Aggregate Base Course (ABC)</span>
                <span style={{ fontSize: '0.75rem', fontFamily: 'JetBrains Mono, monospace', color: '#14B8A6' }}>{d2} mm (SN +{sn2.toFixed(2)})</span>
              </div>

              {/* Sub-base */}
              <div
                style={{
                  height: `${Math.max(35, (d3 / totalThickness) * 160)}px`,
                  background: '#5D4037',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0 0.85rem',
                  borderBottom: '2px solid rgba(139, 92, 246, 0.4)',
                  transition: 'height 0.2s',
                }}
              >
                <span style={{ fontSize: '0.78rem', color: '#E2E8F0', fontWeight: 600 }}>Granular Sub-base</span>
                <span style={{ fontSize: '0.75rem', fontFamily: 'JetBrains Mono, monospace', color: '#A78BFA' }}>{d3} mm (SN +{sn3.toFixed(2)})</span>
              </div>

              {/* Subgrade Soil Foundation */}
              <div
                style={{
                  height: '42px',
                  background: 'repeating-linear-gradient(45deg, #271E15, #271E15 10px, #1F1710 10px, #1F1710 20px)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0 0.85rem',
                }}
              >
                <span style={{ fontSize: '0.75rem', color: '#CBD5E1' }}>Prepared Subgrade Foundation</span>
                <span style={{ fontSize: '0.75rem', fontFamily: 'JetBrains Mono, monospace', color: '#34D399' }}>CBR = {cbr.toFixed(1)}%</span>
              </div>
            </div>
          </div>

          {/* Results Summary Box */}
          <div
            style={{
              padding: '1rem',
              borderRadius: '10px',
              background: isPassing ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
              border: `1px solid ${isPassing ? 'rgba(16, 185, 129, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '0.8rem', color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Structural Number Result</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: isPassing ? '#34D399' : '#F87171', fontWeight: 700, fontSize: '0.85rem' }}>
                {isPassing ? <CheckCircle2 size={16} /> : <AlertTriangle size={16} />}
                <span>{isPassing ? 'ADEQUATE STRUCTURE' : 'UNDER-DESIGNED'}</span>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.6rem', marginBottom: '0.4rem' }}>
              <span style={{ fontSize: '2.4rem', fontFamily: 'Rajdhani, sans-serif', fontWeight: 700, color: isPassing ? '#34D399' : '#F87171' }}>
                {totalSn.toFixed(2)}
              </span>
              <span style={{ fontSize: '0.85rem', color: '#94A3B8' }}>
                vs Target Min: <strong style={{ color: '#F1F5F9' }}>{requiredSn.toFixed(1)}</strong>
              </span>
            </div>

            <p style={{ fontSize: '0.8rem', color: '#CBD5E1', lineHeight: '1.4' }}>
              {isPassing
                ? `The designed cross-section provides a surplus structural capacity of +${(totalSn - requiredSn).toFixed(2)}, ensuring resistance against fatigue alligator cracking and base rutting over the 15-year design period.`
                : `Structure falls short by -${(requiredSn - totalSn).toFixed(2)}. Increase base course (ABC) thickness by +${Math.ceil((requiredSn - totalSn) / a2)} mm or asphalt thickness by +${Math.ceil((requiredSn - totalSn) / a1)} mm to avoid premature pavement failure.`}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
