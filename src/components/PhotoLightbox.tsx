import React, { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight, MapPin, Tag } from 'lucide-react'
import type { GalleryItem } from '../data/galleryData'

interface PhotoLightboxProps {
  item: GalleryItem | null
  items: GalleryItem[]
  onClose: () => void
  onSelect: (item: GalleryItem) => void
}

export const PhotoLightbox: React.FC<PhotoLightboxProps> = ({ item, items, onClose, onSelect }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!item) return
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') {
        const currIdx = items.findIndex(x => x.id === item.id)
        if (currIdx < items.length - 1) onSelect(items[currIdx + 1])
      }
      if (e.key === 'ArrowLeft') {
        const currIdx = items.findIndex(x => x.id === item.id)
        if (currIdx > 0) onSelect(items[currIdx - 1])
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [item, items, onClose, onSelect])

  if (!item) return null

  const currIdx = items.findIndex(x => x.id === item.id)

  return (
    <AnimatePresence>
      <motion.div
        className="lightbox-overlay"
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
          backgroundColor: 'rgba(5, 7, 13, 0.92)',
          backdropFilter: 'blur(12px)',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1.5rem',
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1.5rem',
            right: '1.5rem',
            background: 'rgba(255, 255, 255, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '50%',
            width: '44px',
            height: '44px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            cursor: 'pointer',
            transition: 'all 0.2s',
            zIndex: 10,
          }}
          aria-label="Close Lightbox"
        >
          <X size={22} />
        </button>

        {/* Previous Button */}
        {currIdx > 0 && (
          <button
            onClick={(e) => {
              e.stopPropagation()
              onSelect(items[currIdx - 1])
            }}
            style={{
              position: 'absolute',
              left: '1.5rem',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'rgba(0, 0, 0, 0.6)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '50%',
              width: '48px',
              height: '48px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              cursor: 'pointer',
              zIndex: 10,
            }}
          >
            <ChevronLeft size={26} />
          </button>
        )}

        {/* Next Button */}
        {currIdx < items.length - 1 && (
          <button
            onClick={(e) => {
              e.stopPropagation()
              onSelect(items[currIdx + 1])
            }}
            style={{
              position: 'absolute',
              right: '1.5rem',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'rgba(0, 0, 0, 0.6)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '50%',
              width: '48px',
              height: '48px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              cursor: 'pointer',
              zIndex: 10,
            }}
          >
            <ChevronRight size={26} />
          </button>
        )}

        {/* Main Content Modal */}
        <motion.div
          className="lightbox-card"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          style={{
            maxWidth: '1000px',
            width: '100%',
            maxHeight: '90vh',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: '#0F172A',
            borderRadius: '16px',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.8)',
            overflow: 'hidden',
          }}
        >
          {/* Image Viewer Area */}
          <div
            style={{
              flex: 1,
              backgroundColor: '#020617',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
              minHeight: '380px',
              maxHeight: '62vh',
              position: 'relative',
              padding: '1rem',
            }}
          >
            <img
              src={item.src}
              alt={item.title}
              style={{
                maxWidth: '100%',
                maxHeight: '100%',
                objectFit: 'contain',
                borderRadius: '8px',
              }}
            />
          </div>

          {/* Details & Caption Bar */}
          <div
            style={{
              padding: '1.25rem 1.75rem',
              backgroundColor: '#0F172A',
              borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem', flexWrap: 'wrap', gap: '0.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                {item.figureNo && (
                  <span
                    style={{
                      background: 'rgba(245, 158, 11, 0.15)',
                      color: '#F59E0B',
                      border: '1px solid rgba(245, 158, 11, 0.3)',
                      padding: '0.2rem 0.6rem',
                      borderRadius: '6px',
                      fontFamily: 'JetBrains Mono, monospace',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                    }}
                  >
                    {item.figureNo}
                  </span>
                )}
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    background: 'rgba(20, 184, 166, 0.15)',
                    color: '#14B8A6',
                    border: '1px solid rgba(20, 184, 166, 0.3)',
                    padding: '0.2rem 0.6rem',
                    borderRadius: '6px',
                    fontSize: '0.75rem',
                    fontWeight: 500,
                  }}
                >
                  <Tag size={12} /> {item.category}
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'rgba(255, 255, 255, 0.5)', fontSize: '0.8rem' }}>
                <MapPin size={14} />
                <span>{item.locationOrDate}</span>
              </div>
            </div>

            <h3 style={{ color: '#F8FAFC', fontSize: '1.2rem', marginBottom: '0.4rem', fontFamily: 'Rajdhani, sans-serif', fontWeight: 700 }}>
              {item.title}
            </h3>
            <p style={{ color: 'rgba(255, 255, 255, 0.75)', fontSize: '0.9rem', lineHeight: '1.5' }}>
              {item.caption}
            </p>
            <div style={{ marginTop: '0.6rem', fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.4)', fontFamily: 'JetBrains Mono, monospace', display: 'flex', justifyContent: 'space-between' }}>
              <span>Item {currIdx + 1} of {items.length}</span>
              <span>Use ◀ / ▶ arrow keys to navigate</span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
