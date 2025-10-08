// src/components/GameModeSelector.tsx
import React, { useEffect, useRef, useState, useCallback } from 'react';
import './GameModeSelector.css';
import { imprintText } from '@/data/imprint';
import { privacyPolicyText } from '@/data/privacyPolicy';
import { disclaimerText } from '@/data/disclaimer';

type Props = {
  onSelectMode: (mode: 'singleplayer' | 'multiplayer' | 'admin') => void;
};

function GameModeSelector({ onSelectMode }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [modalType, setModalType] = useState<'privacyPolicy' | 'imprint' | 'disclaimer' | null>(null);
  const [isNavigating, setIsNavigating] = useState(false);
  const navigationTimeoutRef = useRef<NodeJS.Timeout>();
  const resetTimeoutRef = useRef<NodeJS.Timeout>();

  // Reset Navigation State beim Mounten der Komponente
  useEffect(() => {
    // Sicherstellen, dass der Navigation-State beim Mounten zurückgesetzt wird
    setIsNavigating(false);
    
    // Cleanup bei Unmount
    return () => {
      if (navigationTimeoutRef.current) {
        clearTimeout(navigationTimeoutRef.current);
      }
      if (resetTimeoutRef.current) {
        clearTimeout(resetTimeoutRef.current);
      }
    };
  }, []);

  // Auto-Reset nach 5 Sekunden als Fallback
  useEffect(() => {
    if (isNavigating) {
      resetTimeoutRef.current = setTimeout(() => {
        console.log('Auto-resetting navigation state after timeout');
        setIsNavigating(false);
      }, 5000);
    }
    
    return () => {
      if (resetTimeoutRef.current) {
        clearTimeout(resetTimeoutRef.current);
      }
    };
  }, [isNavigating]);

  // Sichere Navigation-Funktion mit verbessertem State-Management
  const handleModeSelect = useCallback((mode: 'singleplayer' | 'multiplayer' | 'admin') => {
    // Doppelklick-Schutz
    if (isNavigating) {
      console.warn(`Already navigating, ignoring click for ${mode}`);
      return;
    }
    
    // Logging für Debugging
    console.log(`Mode selected: ${mode} at ${new Date().toISOString()}`);
    
    setIsNavigating(true);
    
    // Visual feedback - Karte kurz aufleuchten lassen
    const card = document.querySelector(`[data-mode="${mode}"]`);
    if (card) {
      card.classList.add('gms-card-selected');
    }
    
    // Navigation mit kleiner Verzögerung für UX
    navigationTimeoutRef.current = setTimeout(() => {
      try {
        onSelectMode(mode);
        // WICHTIG: Nach erfolgreicher Navigation den State zurücksetzen
        // Dies stellt sicher, dass bei Rückkehr zur Seite alles funktioniert
        setTimeout(() => {
          setIsNavigating(false);
        }, 500);
      } catch (error) {
        console.error(`Failed to navigate to ${mode}:`, error);
        setIsNavigating(false); // Reset bei Fehler
      }
    }, 150);
  }, [isNavigating, onSelectMode]);

  // Event Listener für Browser-Navigation (Zurück-Button)
  useEffect(() => {
    const handleFocus = () => {
      // Reset Navigation State wenn das Fenster wieder den Fokus erhält
      setIsNavigating(false);
    };

    const handleVisibilityChange = () => {
      // Reset Navigation State wenn die Seite wieder sichtbar wird
      if (!document.hidden) {
        setIsNavigating(false);
      }
    };

    window.addEventListener('focus', handleFocus);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('focus', handleFocus);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Canvas-Größe anpassen
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Schaltkreis-Animation
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      alpha: number;
      char?: string;
      color?: string;
    }> = [];

    // Partikel erstellen mit Zahlen und Buchstaben
    for (let i = 0; i < 60; i++) {
      const isChar = Math.random() > 0.5;
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 3 + 1,
        alpha: Math.random() * 0.4 + 0.1,
        char: isChar ? (Math.random() > 0.5 ? String.fromCharCode(48 + Math.floor(Math.random() * 10)) : String.fromCharCode(65 + Math.floor(Math.random() * 26))) : undefined,
        color: Math.random() > 0.5 ? '#2563eb' : '#14b8a6'
      });
    }

    // Schaltkreis-Linien
    const lines: Array<{
      x1: number; y1: number;
      x2: number; y2: number;
      progress: number;
      speed: number;
    }> = [];

    // Verbindungslinien erstellen
    for (let i = 0; i < 20; i++) {
      lines.push({
        x1: Math.random() * canvas.width,
        y1: Math.random() * canvas.height,
        x2: Math.random() * canvas.width,
        y2: Math.random() * canvas.height,
        progress: Math.random(),
        speed: 0.002 + Math.random() * 0.003
      });
    }

    // Lavalampen-Blobs
    const blobs: Array<{
      x: number;
      y: number;
      radius: number;
      vx: number;
      vy: number;
      color: string;
    }> = [];

    for (let i = 0; i < 5; i++) {
      blobs.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: 50 + Math.random() * 100,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        color: i % 2 === 0 ? 'rgba(37, 99, 235, 0.05)' : 'rgba(20, 184, 166, 0.05)'
      });
    }

    let animationId: number;
    
    const animate = () => {
      ctx.fillStyle = 'rgba(11, 18, 32, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Lavalampen-Blobs zeichnen
      blobs.forEach(blob => {
        blob.x += blob.vx;
        blob.y += blob.vy;
        
        if (blob.x - blob.radius < 0 || blob.x + blob.radius > canvas.width) blob.vx *= -1;
        if (blob.y - blob.radius < 0 || blob.y + blob.radius > canvas.height) blob.vy *= -1;
        
        const gradient = ctx.createRadialGradient(blob.x, blob.y, 0, blob.x, blob.y, blob.radius);
        gradient.addColorStop(0, blob.color.replace('0.05', '0.1'));
        gradient.addColorStop(0.5, blob.color);
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(blob.x, blob.y, blob.radius, 0, Math.PI * 2);
        ctx.fill();
      });
      
      // Schaltkreis-Linien zeichnen
      lines.forEach(line => {
        line.progress += line.speed;
        if (line.progress > 1) line.progress = 0;
        
        const gradient = ctx.createLinearGradient(line.x1, line.y1, line.x2, line.y2);
        const pulseIntensity = Math.sin(line.progress * Math.PI) * 0.5 + 0.5;
        
        gradient.addColorStop(0, 'rgba(37, 99, 235, 0)');
        gradient.addColorStop(Math.max(0, line.progress - 0.1), 'rgba(37, 99, 235, 0)');
        gradient.addColorStop(line.progress, `rgba(20, 184, 166, ${pulseIntensity * 0.8})`);
        gradient.addColorStop(Math.min(1, line.progress + 0.1), 'rgba(37, 99, 235, 0)');
        gradient.addColorStop(1, 'rgba(37, 99, 235, 0)');
        
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(line.x1, line.y1);
        ctx.lineTo(line.x2, line.y2);
        ctx.stroke();
        
        // Knoten an den Enden
        [
          { x: line.x1, y: line.y1 },
          { x: line.x2, y: line.y2 }
        ].forEach(point => {
          ctx.fillStyle = `rgba(37, 99, 235, ${pulseIntensity * 0.5})`;
          ctx.beginPath();
          ctx.arc(point.x, point.y, 3 + pulseIntensity * 2, 0, Math.PI * 2);
          ctx.fill();
          
          ctx.strokeStyle = `rgba(20, 184, 166, ${pulseIntensity * 0.3})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.arc(point.x, point.y, 6 + pulseIntensity * 4, 0, Math.PI * 2);
          ctx.stroke();
        });
      });
      
      // Partikel animieren (Zahlen und Buchstaben)
      particles.forEach(particle => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        
        // Bounce off edges
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;
        
        // Partikel oder Zeichen zeichnen
        if (particle.char) {
          ctx.font = `${particle.size * 10}px 'Courier New', monospace`;
          ctx.fillStyle = particle.color ? `${particle.color}${Math.floor(particle.alpha * 255).toString(16).padStart(2, '0')}` : `rgba(100, 150, 255, ${particle.alpha})`;
          ctx.fillText(particle.char, particle.x, particle.y);
        } else {
          const gradient = ctx.createRadialGradient(particle.x, particle.y, 0, particle.x, particle.y, particle.size * 2);
          gradient.addColorStop(0, `rgba(37, 99, 235, ${particle.alpha})`);
          gradient.addColorStop(1, 'rgba(37, 99, 235, 0)');
          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
          ctx.fill();
        }
        
        // Alpha pulsieren lassen
        particle.alpha += (Math.random() - 0.5) * 0.02;
        particle.alpha = Math.max(0.05, Math.min(0.6, particle.alpha));
      });
      
      animationId = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, []);

  const handleShowModal = (type: 'privacyPolicy' | 'imprint' | 'disclaimer') => {
    setModalType(type);
  };

  const handleCloseModal = () => {
    setModalType(null);
  };

  return (
    <div className="gms-root">
      <canvas 
        ref={canvasRef} 
        className="gms-canvas" 
        style={{ pointerEvents: 'none' }}
      />
      
      {/* Header */}
      <header className="gms-header">
        <div className="gms-header-inner">
          <img 
            src="https://uvm-akademie.de/logo.png" 
            alt="UVM Akademie Logo" 
            className="gms-logo"
          />
          <h1 className="gms-header-text">Rollenspiel - Crisis Management</h1>
        </div>
      </header>

      {/* Hauptinhalt */}
      <main className="gms-main">
        <div className="gms-content">
          <div className="gms-hero">
            <h1 className="gms-title">LQ14</h1>
            <p className="gms-subtitle">Liquiditätskrise Management Simulation</p>
          </div>

          <div className="gms-cards">
            {/* Einzelspieler */}
            <div 
              className={`gms-card gms-card-single ${isNavigating ? 'gms-card-disabled' : ''}`}
              data-mode="singleplayer"
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                handleModeSelect('singleplayer');
              }}
              style={{ 
                position: 'relative', 
                zIndex: 10,
                pointerEvents: isNavigating ? 'none' : 'auto'
              }}
              tabIndex={isNavigating ? -1 : 0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  e.stopPropagation();
                  handleModeSelect('singleplayer');
                }
              }}
              role="button"
              aria-label="Einzelspieler starten"
              aria-disabled={isNavigating}
            >
              <div className="gms-card-glow"></div>
              <div className="gms-card-content">
                <div className="gms-card-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </div>
                <h2 className="gms-card-title">Einzelspieler</h2>
                <p className="gms-card-desc">
                  Meistern Sie die Krise allein. Übernehmen Sie eine oder mehrere Rollen 
                  und navigieren Sie durch 14 kritische Tage.
                </p>
                <div className="gms-card-footer">
                  <span className="gms-card-action">Simulation starten →</span>
                </div>
              </div>
            </div>

            {/* Mehrspieler */}
            <div 
              className={`gms-card gms-card-multi ${isNavigating ? 'gms-card-disabled' : ''}`}
              data-mode="multiplayer"
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                handleModeSelect('multiplayer');
              }}
              style={{ 
                position: 'relative', 
                zIndex: 10,
                pointerEvents: isNavigating ? 'none' : 'auto'
              }}
              tabIndex={isNavigating ? -1 : 0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  e.stopPropagation();
                  handleModeSelect('multiplayer');
                }
              }}
              role="button"
              aria-label="Mehrspieler beitreten"
              aria-disabled={isNavigating}
            >
              <div className="gms-card-glow"></div>
              <div className="gms-card-content">
                <div className="gms-card-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                </div>
                <h2 className="gms-card-title">Mehrspieler</h2>
                <p className="gms-card-desc">
                  Teamwork unter Druck. Koordinieren Sie mit anderen Spielern 
                  und bewältigen Sie gemeinsam die Herausforderungen.
                </p>
                <div className="gms-card-footer">
                  <span className="gms-card-action">Team beitreten →</span>
                </div>
              </div>
            </div>

            {/* Admin */}
            <div 
              className={`gms-card gms-card-admin ${isNavigating ? 'gms-card-disabled' : ''}`}
              data-mode="admin"
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                handleModeSelect('admin');
              }}
              style={{ 
                position: 'relative', 
                zIndex: 10,
                pointerEvents: isNavigating ? 'none' : 'auto'
              }}
              tabIndex={isNavigating ? -1 : 0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  e.stopPropagation();
                  handleModeSelect('admin');
                }
              }}
              role="button"
              aria-label="Admin-Bereich öffnen"
              aria-disabled={isNavigating}
            >
              <div className="gms-card-glow"></div>
              <div className="gms-card-content">
                <div className="gms-card-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="3" />
                    <path d="M12 1v6m0 6v6m4.22-13.22l4.24 4.24M1.54 1.54l4.24 4.24M20.46 20.46l-4.24-4.24M1.54 20.46l4.24-4.24" />
                  </svg>
                </div>
                <h2 className="gms-card-title">Administration</h2>
                <p className="gms-card-desc">
                  Spielleitung und Kontrolle. Verwalten Sie Sitzungen, 
                  überwachen Sie Fortschritte und exportieren Sie Berichte.
                </p>
                <div className="gms-card-footer">
                  <span className="gms-card-action">Adminbereich →</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="gms-footer">
        <div className="gms-footer-inner">
          <div className="gms-footer-copyright">
            © 2026 UVM-Institut Prof. Dr. Landes & Prof. Dr. Steiner Partnerschaftsgesellschaft v41 08 10
          </div>
          <div className="gms-footer-links">
            <button 
              className="gms-footer-link"
              onClick={() => handleShowModal('privacyPolicy')}
            >
              Datenschutzerklärung
            </button>
            <button 
              className="gms-footer-link"
              onClick={() => handleShowModal('imprint')}
            >
              Impressum
            </button>
            <button 
              className="gms-footer-link"
              onClick={() => handleShowModal('disclaimer')}
            >
              Wichtiger Hinweis
            </button>
          </div>
        </div>
      </footer>
      
      {/* Modal-Block */}
      {modalType && (
        <div className="gms-modal-backdrop" onClick={handleCloseModal}>
          <div className="gms-modal" onClick={(e) => e.stopPropagation()}>
            <h2>
              {modalType === 'privacyPolicy' && 'Datenschutzerklärung'}
              {modalType === 'imprint' && 'Impressum'}
              {modalType === 'disclaimer' && 'Wichtiger Hinweis'}
            </h2>

            <div className="gms-modal-content">
              {modalType === 'privacyPolicy' && <pre className="gms-modal-text">{privacyPolicyText}</pre>}
              {modalType === 'imprint' && <pre className="gms-modal-text">{imprintText}</pre>}
              {modalType === 'disclaimer' && <pre className="gms-modal-text">{disclaimerText}</pre>}
            </div>

            <button className="gms-modal-close" onClick={handleCloseModal}>
              Schließen
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default GameModeSelector;