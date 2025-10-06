// src/components/multiplayer/GameLobby.tsx
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { MultiplayerService } from '@/services/multiplayerService';
import { supabase } from '@/services/supabaseClient';
import type { Game, Player } from '@/services/supabaseClient';
import type { RoleId } from '@/core/models/domain';
import InfoModal from '@/components/info/InfoModal';
import { infoContents } from '@/data/infoContent';
import '@/styles/onboarding.css';

interface GameLobbyProps {
  game: Game;
  players: Player[];
  currentPlayer: Player;
  onGameStart: () => void;
}

/** Admin-Settings */
type AdminSettings = {
  autoStartWhenReady?: boolean;
  autoStartDelaySeconds?: number;
  lobbyCountdownSeconds?: number;
  allowEarlyEntry?: boolean;
  lobbySettings?: {
    backgroundTheme?: 'corporate' | 'dynamic' | 'minimal';
    showTimer?: boolean;
    welcomeMessage?: string;
  };
};

const defaultSettings: AdminSettings = {
  autoStartWhenReady: true,
  lobbyCountdownSeconds: 5,
  allowEarlyEntry: false,
  lobbySettings: {
    backgroundTheme: 'corporate',
    showTimer: true,
    welcomeMessage: 'Willkommen zur Crisis Management Simulation',
  },
};

/** Lade Settings aus globalThis oder localStorage (Fallback auf Default) */
function loadSettings(): AdminSettings {
  const g: any = (globalThis as any).__multiplayerSettings;
  if (g && typeof g === 'object') return { ...defaultSettings, ...g };
  try {
    const raw = globalThis.localStorage?.getItem('admin:multiplayer');
    if (raw) return { ...defaultSettings, ...(JSON.parse(raw) as AdminSettings) };
  } catch {}
  return defaultSettings;
}

/** Dynamischer Canvas-Hintergrund (nur Theme 'dynamic') */
const DynamicBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    const onResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', onResize);

    const columns = Math.floor(w / 18);
    const glyphs = '01ABCDEFGHIJKLMNPQRSTUVWXYZ0123456789';
    const drops = new Array(columns).fill(0).map(() => Math.random() * h);

    type Bit = { x: number; y: number; vx: number; vy: number };
    const bits: Bit[] = Array.from({ length: 60 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.8,
      vy: (Math.random() - 0.5) * 0.8,
    }));

    type Wire = { x1: number; y1: number; x2: number; y2: number; a: number };
    const wires: Wire[] = Array.from({ length: 22 }, () => ({
      x1: Math.random() * w,
      y1: Math.random() * h,
      x2: Math.random() * w,
      y2: Math.random() * h,
      a: 0.12 + Math.random() * 0.35,
    }));

    let last = performance.now();
    const render = (t: number) => {
      const dt = (t - last) / 16.7;
      last = t;

      // Hintergrund
      ctx.fillStyle = '#07101f';
      ctx.fillRect(0, 0, w, h);

      // Leiterbahnen
      ctx.lineWidth = 1;
      for (const w1 of wires) {
        ctx.strokeStyle = `rgba(46, 158, 255, ${w1.a})`;
        ctx.beginPath();
        ctx.moveTo(w1.x1, w1.y1);
        ctx.lineTo(w1.x2, w1.y2);
        ctx.stroke();
      }

      // Laufende Bits
      ctx.fillStyle = 'rgba(120, 200, 255, 0.9)';
      for (const b of bits) {
        b.x += b.vx * dt;
        b.y += b.vy * dt;
        if (b.x < 0 || b.x > w) b.vx *= -1;
        if (b.y < 0 || b.y > h) b.vy *= -1;
        ctx.fillRect(b.x, b.y, 2, 2);
      }

      // Fallende Glyphen
      ctx.fillStyle = 'rgba(255,255,255,0.08)';
      ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = 'rgba(170, 220, 255, 0.75)';
      ctx.font = '14px ui-monospace, monospace';
      for (let i = 0; i < columns; i++) {
        const char = glyphs[Math.floor(Math.random() * glyphs.length)];
        const x = i * 18;
        const y = drops[i] * 1.05;
        ctx.fillText(char, x, y);
        if (y > h && Math.random() > 0.985) {
          drops[i] = 0;
        } else {
          drops[i] = y;
        }
      }

      rafRef.current = requestAnimationFrame(render);
    };

    rafRef.current = requestAnimationFrame(render);
    return () => {
      window.removeEventListener('resize', onResize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return <canvas style={{ position: 'absolute', inset: 0, zIndex: 0 }} ref={canvasRef} />;
};

export default function GameLobby({ 
  game, 
  players, 
  currentPlayer,
  onGameStart 
}: GameLobbyProps) {
  const [readyStatus, setReadyStatus] = useState<Map<string, boolean>>(new Map());
  const [countdown, setCountdown] = useState<number | null>(null);
  const [isStarting, setIsStarting] = useState(false);
  const [timeToStart, setTimeToStart] = useState<number>(300); // 5 minutes default
  const [modalContent, setModalContent] = useState<any>(null);
  const [settings, setSettings] = useState<AdminSettings>(() => loadSettings());
  const [theme, setTheme] = useState<'corporate' | 'dynamic' | 'minimal'>(
    loadSettings().lobbySettings?.backgroundTheme || 'corporate'
  );
  const [inviteUrl, setInviteUrl] = useState<string>('');
  const [copied, setCopied] = useState(false);
  const [pressingCopy, setPressingCopy] = useState(false);
  const [rippleKey, setRippleKey] = useState(0);

  const countdownIntervalRef = useRef<NodeJS.Timeout>();
  const timerRef = useRef<NodeJS.Timeout>();

  // Start heartbeat to keep player active in lobby
  useEffect(() => {
    const mpService = MultiplayerService.getInstance();
    mpService.startHeartbeat();

    return () => {
      mpService.stopHeartbeat();
    };
  }, []);

  // Sync readyStatus from players data (loads from Supabase)
  useEffect(() => {
    const newStatus = new Map<string, boolean>();
    players.forEach(p => {
      newStatus.set(p.id, p.is_ready || false);
    });
    setReadyStatus(newStatus);
  }, [players]);

  // Settings-Liveupdates (Adminkonsole)
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === 'admin:multiplayer') {
        setSettings(loadSettings());
      }
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  // Theme ableiten
  useEffect(() => {
    const t = settings?.lobbySettings?.backgroundTheme;
    setTheme(t === 'dynamic' || t === 'minimal' || t === 'corporate' ? t : 'corporate');
  }, [settings]);

  // ?game=<ID> in URL + Invite-Link erzeugen
  const ensureGameParam = useCallback(() => {
    if (!game?.id) return;
    try {
      const url = new URL(window.location.href);
      url.searchParams.set('game', game.id);
      window.history.replaceState({}, '', url.toString());
      setInviteUrl(url.toString());
    } catch {}
  }, [game?.id]);

  useEffect(() => { ensureGameParam(); }, [ensureGameParam]);

  // Timer countdown
  useEffect(() => {
    if (settings.lobbySettings?.showTimer && !isStarting) {
      timerRef.current = setInterval(() => {
        setTimeToStart(prev => Math.max(0, prev - 1));
      }, 1000);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [isStarting, settings.lobbySettings?.showTimer]);

  // Auto-Start wenn alle bereit
  useEffect(() => {
    if (settings.autoStartWhenReady && allPlayersReady() && !isStarting) {
      initiateCountdown();
    }
  }, [readyStatus, isStarting, settings.autoStartWhenReady]);

  const allPlayersReady = (): boolean => {
    // Alle Spieler bereit Logik
    const everyoneReady = players.length > 0 && players.every(p => readyStatus.get(p.id));
    // Wenn 'Früher Einstieg' aktiviert ist, darf bereits EIN Spieler ins Spiel (Einzelstart).
    if (settings.allowEarlyEntry) {
      // Ein Spieler kann starten, sobald ER bereit ist – unabhängig von anderen.
      return !!(currentPlayer && readyStatus.get(currentPlayer.id));
    }
    // Standard: alle 4 Spieler müssen bereit sein
    return players.length === 4 && everyoneReady;
  };

  const initiateCountdown = () => {
    setIsStarting(true);
    const seconds = (settings.autoStartDelaySeconds ?? settings.lobbyCountdownSeconds ?? 5);
    setCountdown(seconds);

    countdownIntervalRef.current = setInterval(() => {
      setCountdown(prev => {
        if (prev === null || prev <= 1) {
          if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
          onGameStart();
          return null;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleSetReady = async () => {
    const newStatus = !readyStatus.get(currentPlayer.id);
    setReadyStatus(prev => new Map(prev).set(currentPlayer.id, newStatus));

    try {
      const { error } = await supabase
        .from('players')
        .update({ is_ready: newStatus })
        .eq('id', currentPlayer.id);

      if (error) {
        console.error('Failed to update ready status:', error);
      }
    } catch (err) {
      console.error('Exception updating ready status:', err);
    }
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleCopyClick = async () => {
    if (!inviteUrl) return;
    try {
      try {
        await navigator.clipboard.writeText(inviteUrl);
      } catch {
        const ta = document.createElement('textarea');
        ta.value = inviteUrl;
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.focus();
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
      }
      setPressingCopy(true);
      setTimeout(() => setPressingCopy(false), 120);
      setCopied(true);
      setRippleKey(k => k + 1);
      setTimeout(() => setCopied(false), 1200);
    } catch {}
  };

  const roleInfo: Record<RoleId, { color: string; icon: string; description: string }> = {
    CEO: { 
      color: '#0ea5e9', 
      icon: '👔', 
      description: 'Strategische Führung & Öffentlichkeitsarbeit' 
    },
    CFO: { 
      color: '#10b981', 
      icon: '💰', 
      description: 'Finanzen & Bankbeziehungen' 
    },
    OPS: { 
      color: '#f59e0b', 
      icon: '⚙️', 
      description: 'Operations & Kundenbeziehungen' 
    },
    HRLEGAL: { 
      color: '#8b5cf6', 
      icon: '⚖️', 
      description: 'Personal & Compliance' 
    }
  };

  const InfoButton = ({ 
    icon, 
    label, 
    infoKey, 
    color 
  }: { 
    icon: string; 
    label: string; 
    infoKey: string; 
    color: string;
  }) => (
    <button
      onClick={() => setModalContent(infoContents[infoKey])}
      style={{
        position: 'relative',
        padding: '12px 16px',
        background: `linear-gradient(135deg, ${color}15, rgba(0, 0, 0, 0.8))`,
        border: `1px solid ${color}50`,
        borderRadius: 12,
        color: '#ffffff',
        fontSize: 13,
        fontWeight: 600,
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        overflow: 'hidden',
        minWidth: 140
      }}
      onMouseEnter={e => {
        e.currentTarget.style.background = `linear-gradient(135deg, ${color}30, rgba(0, 0, 0, 0.7))`;
        e.currentTarget.style.borderColor = color;
        e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)';
        e.currentTarget.style.boxShadow = `0 8px 24px ${color}40, inset 0 0 20px ${color}20`;
      }}
      onMouseLeave={e => {
        e.currentTarget.style.background = `linear-gradient(135deg, ${color}15, rgba(0, 0, 0, 0.8))`;
        e.currentTarget.style.borderColor = `${color}50`;
        e.currentTarget.style.transform = 'translateY(0) scale(1)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      {/* Glowing dot animation */}
      <div style={{
        position: 'absolute',
        top: -50,
        left: -50,
        width: 100,
        height: 100,
        background: `radial-gradient(circle, ${color}40, transparent)`,
        animation: 'pulse-slow 4s ease-in-out infinite'
      }} />
      
      <span style={{ 
        fontSize: 16, 
        filter: `drop-shadow(0 0 8px ${color})`,
        zIndex: 1,
        color: 'white'
      }}>
        {icon}
      </span>
      <span style={{ 
        zIndex: 1,
        color: 'white',
        textShadow: `0 0 10px ${color}50`
      }}>
        {label}
      </span>
    </button>
  );

  const getRoleCard = (role: RoleId) => {
    // Fix: Case-insensitive Vergleich für CEO, CFO, OPS, HRLEGAL
    const player = players.find(p => p.role?.toUpperCase() === role.toUpperCase());
    const isReady = player ? readyStatus.get(player.id) : false;
    const info = roleInfo[role];

    // Prüfen ob Spieler aktiv (kürzlich aktiv oder Spiel läuft)
    const isGameRunning = game.state === 'running' || game.status === 'running';
    const isActive = player && isGameRunning && player.last_seen &&
      (new Date().getTime() - new Date(player.last_seen).getTime()) < 120000; // Aktiv innerhalb 2 Minuten

    return (
      <div
        key={role}
        style={{
          position: 'relative',
          padding: 24,
          background: player
            ? `linear-gradient(135deg, ${info.color}15, ${info.color}05)`
            : 'rgba(255, 255, 255, 0.05)',
          border: `2px solid ${player ? info.color : 'rgba(255, 255, 255, 0.1)'}`,
          borderRadius: 16,
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          transform: isReady ? 'scale(1.02)' : 'scale(1)',
          boxShadow: isReady
            ? `0 10px 30px ${info.color}30`
            : isActive
            ? `0 8px 25px ${info.color}40`
            : '0 5px 15px rgba(0, 0, 0, 0.1)'
        }}
      >
        {/* Role Badge */}
        <div style={{
          position: 'absolute',
          top: -14,
          left: '50%',
          transform: 'translateX(-50%)',
          padding: '6px 16px',
          background: player ? info.color : 'rgba(255, 255, 255, 0.1)',
          color: 'white',
          borderRadius: 20,
          fontSize: 13,
          fontWeight: 700,
          letterSpacing: '0.5px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)'
        }}>
          {role}
        </div>

        {/* Active Indicator (Pulsing dot) */}
        {isActive && (
          <div style={{
            position: 'absolute',
            top: 12,
            right: 12,
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            padding: '4px 10px',
            background: 'rgba(34, 197, 94, 0.15)',
            border: '1px solid rgba(34, 197, 94, 0.5)',
            borderRadius: 20,
            fontSize: 11,
            fontWeight: 600,
            color: '#22c55e'
          }}>
            <span style={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              background: '#22c55e',
              animation: 'pulse 2s ease-in-out infinite',
              boxShadow: '0 0 8px #22c55e'
            }} />
            SPIELT
          </div>
        )}

        {/* Icon & Player Info */}
        <div style={{ textAlign: 'center', marginTop: 8 }}>
          <div style={{
            fontSize: 36,
            marginBottom: 12,
            filter: player ? 'none' : 'grayscale(1) opacity(0.3)'
          }}>
            {info.icon}
          </div>

          <div style={{
            fontSize: 18,
            fontWeight: 700,
            marginBottom: 4,
            color: player ? '#1f2937' : 'rgba(255, 255, 255, 0.4)',
            minHeight: 28
          }}>
            {player ? (player.display_name || player.name) : 'Wartet auf Spieler...'}
          </div>

          <div style={{
            fontSize: 12,
            color: player ? '#6b7280' : 'rgba(255, 255, 255, 0.3)',
            marginBottom: 16
          }}>
            {info.description}
          </div>
        </div>

        {/* Status */}
        <div style={{
          padding: '8px',
          background: isActive
            ? 'linear-gradient(135deg, #22c55e, #16a34a)'
            : isReady
            ? 'linear-gradient(135deg, #10b981, #059669)'
            : (player ? 'rgba(255, 255, 255, 0.1)' : 'transparent'),
          color: (isActive || isReady) ? 'white' : (player ? '#9ca3af' : 'rgba(255, 255, 255, 0.3)'),
          borderRadius: 8,
          fontSize: 13,
          fontWeight: 600,
          textAlign: 'center',
          letterSpacing: '0.3px'
        }}>
          {isActive ? '🎮 AKTIV IM SPIEL' : isReady ? '✓ BEREIT' : (player ? '⏳ WARTET' : '○ LEER')}
        </div>
      </div>
    );
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: theme === 'minimal' ? '#0b1e39' : 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Circuit Background Pattern (nicht bei minimal) */}
      {theme !== 'minimal' && (
        <>
          <svg
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              opacity: 0.1
            }}
          >
            <defs>
              <pattern id="circuit" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse">
                <path d="M 0 100 L 50 100 L 50 50 L 100 50" stroke="#3b82f6" strokeWidth="1" fill="none"/>
                <path d="M 100 0 L 100 50 L 150 50 L 150 100 L 200 100" stroke="#3b82f6" strokeWidth="1" fill="none"/>
                <path d="M 50 150 L 100 150 L 100 200" stroke="#3b82f6" strokeWidth="1" fill="none"/>
                <path d="M 150 150 L 150 200" stroke="#3b82f6" strokeWidth="1" fill="none"/>
                <circle cx="50" cy="50" r="3" fill="#3b82f6"/>
                <circle cx="150" cy="50" r="3" fill="#3b82f6"/>
                <circle cx="100" cy="150" r="3" fill="#3b82f6"/>
                <circle cx="50" cy="100" r="2" fill="#10b981"/>
                <circle cx="150" cy="100" r="2" fill="#10b981"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#circuit)" />
          </svg>

          {/* Animated Lines */}
          <div style={{
            position: 'absolute',
            top: '20%',
            left: '-100px',
            width: '300px',
            height: '2px',
            background: 'linear-gradient(90deg, transparent, #3b82f6, transparent)',
            animation: 'moveRight 10s linear infinite'
          }} />
          <div style={{
            position: 'absolute',
            top: '60%',
            right: '-100px',
            width: '300px',
            height: '2px',
            background: 'linear-gradient(90deg, transparent, #10b981, transparent)',
            animation: 'moveLeft 12s linear infinite'
          }} />
        </>
      )}

      {/* Dynamic Overlay */}
      {theme === 'dynamic' && <DynamicBackground />}

      {/* Main Content */}
      <div style={{
        position: 'relative',
        zIndex: 1,
        maxWidth: 1200,
        margin: '0 auto',
        padding: 24
      }}>
        {/* Hero Section */}
        <div style={{
          textAlign: 'center',
          marginBottom: 48,
          animation: 'fadeInDown 0.8s ease'
        }}>
          <h1 style={{
            fontSize: 56,
            fontWeight: 900,
            background: 'linear-gradient(135deg, #fff 0%, #cbd5e1 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: 16,
            letterSpacing: '-1px',
            textShadow: '0 0 40px rgba(59, 130, 246, 0.3)'
          }}>
            {game.name}
          </h1>
          
          <p style={{
            fontSize: 20,
            color: '#94a3b8',
            letterSpacing: '0.5px',
            marginBottom: 24
          }}>
            {settings.lobbySettings?.welcomeMessage}
          </p>

          {/* Game Code + Invite Link */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 12,
            flexWrap: 'wrap',
            marginTop: 12
          }}>
            <span style={{
              fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, Courier New, monospace',
              fontSize: 13,
              padding: '6px 10px',
              borderRadius: 8,
              background: 'rgba(15,23,42,0.85)',
              color: 'white',
              letterSpacing: '0.5px',
              border: '1px solid rgba(148,163,184,0.35)'
            }}>
              ID: {game?.id}
            </span>
            {inviteUrl && (
              <span style={{
                maxWidth: 520,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                fontSize: 12,
                color: '#94a3b8'
              }} title={inviteUrl}>
                {inviteUrl}
              </span>
            )}
            {inviteUrl && (
              <>
                <button
                  onClick={handleCopyClick}
                  onMouseDown={() => setPressingCopy(true)}
                  onMouseUp={() => setPressingCopy(false)}
                  onMouseLeave={() => setPressingCopy(false)}
                  aria-live="polite"
                  aria-label={copied ? 'Link kopiert' : 'Link kopieren'}
                  style={{
                    position: 'relative',
                    overflow: 'hidden',
                    padding: '8px 12px',
                    borderRadius: 8,
                    border: '1px solid rgba(148,163,184,0.35)',
                    background: 'rgba(255,255,255,0.05)',
                    color: '#e2e8f0',
                    cursor: 'pointer',
                    transform: pressingCopy ? 'scale(0.97)' : 'scale(1)',
                    transition: 'transform 120ms ease'
                  }}
                >
                  {copied ? 'Kopiert ✓' : 'Link kopieren'}

                  {/* Ripple-Effekt */}
                  {copied && (
                    <span
                      key={rippleKey}
                      style={{
                        position: 'absolute',
                        left: '50%',
                        top: '50%',
                        width: 12,
                        height: 12,
                        borderRadius: '999px',
                        background: 'rgba(255,255,255,0.35)',
                        transform: 'translate(-50%, -50%) scale(0)',
                        animation: 'ripple 600ms ease-out forwards'
                      }}
                    />
                  )}
                </button>

                <button
                  onClick={async () => {
                    try {
                      if ((navigator as any).share) {
                        await (navigator as any).share({ title: 'Spiel beitreten', url: inviteUrl });
                      } else {
                        await handleCopyClick();
                      }
                    } catch {}
                  }}
                  style={{
                    padding: '8px 12px',
                    borderRadius: 8,
                    border: '1px solid rgba(148,163,184,0.35)',
                    background: 'rgba(37,99,235,0.8)',
                    color: 'white',
                    cursor: 'pointer'
                  }}
                >
                  Teilen
                </button>
              </>
            )}
          </div>

          {/* Timer Display */}
          {settings.lobbySettings?.showTimer && !isStarting && (
            <div style={{
              display: 'inline-block',
              padding: '12px 24px',
              background: 'rgba(59, 130, 246, 0.1)',
              border: '1px solid rgba(59, 130, 246, 0.3)',
              borderRadius: 30,
              fontSize: 18,
              color: '#60a5fa',
              fontWeight: 600
            }}>
              ⏱️ Zeit bis zum Start: {formatTime(timeToStart)}
            </div>
          )}
        </div>

        {/* Info Panel */}
        <div style={{
          marginBottom: 32,
          padding: 24,
          background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.5), rgba(15, 23, 42, 0.8))',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(59, 130, 246, 0.3)',
          borderRadius: 16,
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            marginBottom: 16
          }}>
            {/* Animated Icon */}
            <div style={{
              width: 40,
              height: 40,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
              borderRadius: 8,
              boxShadow: '0 0 20px rgba(59, 130, 246, 0.5)',
              animation: 'pulse-glow 2s ease-in-out infinite'
            }}>
              <span style={{ fontSize: 20 }}>ℹ️</span>
            </div>
            
            <h3 style={{
              margin: 0,
              background: 'linear-gradient(135deg, #fff, #94a3b8)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontSize: 18,
              fontWeight: 700,
              letterSpacing: '1px'
            }}>
              MISSION BRIEFING
            </h3>
            
            {/* Decorative line */}
            <div style={{
              flex: 1,
              height: 1,
              background: 'linear-gradient(90deg, rgba(59, 130, 246, 0.5), transparent)',
            }} />
          </div>

          {/* Info Buttons Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
            gap: 12
          }}>
            <InfoButton 
              icon="🏭" 
              label="Unternehmens-Profil" 
              infoKey="apsProfile" 
              color="#10b981"
            />
            <InfoButton 
              icon="📊" 
              label="Geschäftsmodell" 
              infoKey="businessModel" 
              color="#10b981"
            />
            <InfoButton 
              icon="💰" 
              label="Finanzen" 
              infoKey="financials" 
              color="#f59e0b"
            />
            <InfoButton 
              icon="⚠️" 
              label="Krise" 
              infoKey="trigger" 
              color="#ef4444"
            />
            <InfoButton 
              icon="👥" 
              label="Stakeholder" 
              infoKey="stakeholders" 
              color="#8b5cf6"
            />
            <InfoButton 
              icon="📖" 
              label="Glossar" 
              infoKey="glossary" 
              color="#06b6d4"
           />
          </div>

          {/* Status Bar */}
          <div style={{
            marginTop: 16,
            padding: '8px 12px',
            background: 'rgba(0, 0, 0, 0.5)',
            borderRadius: 8,
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            fontSize: 11,
            color: '#64748b',
            fontFamily: 'monospace'
          }}>
            <div style={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              background: '#10b981',
              animation: 'pulse-dot 2s ease-in-out infinite'
            }} />
            SYSTEM STATUS: ONLINE | CRISIS LEVEL: CRITICAL | DAY: 0/14
          </div>

          {/* Active Players Indicator */}
          {(game.state === 'running' || game.status === 'running') && (() => {
            const isGameRunning = true;
            const activePlayers = players.filter(p =>
              p.last_seen &&
              (new Date().getTime() - new Date(p.last_seen).getTime()) < 120000
            );

            if (activePlayers.length > 0) {
              return (
                <div style={{
                  marginTop: 12,
                  padding: '10px 14px',
                  background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.15), rgba(22, 163, 74, 0.1))',
                  border: '1px solid rgba(34, 197, 94, 0.4)',
                  borderRadius: 8,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  fontSize: 13,
                  color: '#22c55e',
                  fontWeight: 600
                }}>
                  <span style={{
                    width: 10,
                    height: 10,
                    borderRadius: '50%',
                    background: '#22c55e',
                    animation: 'pulse 2s ease-in-out infinite',
                    boxShadow: '0 0 10px #22c55e'
                  }} />
                  <span>
                    🎮 {activePlayers.length} Spieler aktiv im laufenden Spiel
                  </span>
                  <div style={{ flex: 1 }} />
                  <span style={{ fontSize: 11, color: '#4ade80' }}>
                    {activePlayers.map(p => p.display_name || p.name).join(', ')}
                  </span>
                </div>
              );
            }
            return null;
          })()}
        </div>

        {/* Player Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: 24,
          marginBottom: 40
        }}>
          {(['CEO', 'CFO', 'OPS', 'HRLEGAL'] as RoleId[]).map(getRoleCard)}
        </div>

        {/* Progress Bar */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.05)',
          borderRadius: 100,
          height: 12,
          marginBottom: 32,
          overflow: 'hidden',
          border: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
          <div style={{
            background: 'linear-gradient(90deg, #3b82f6, #10b981)',
            height: '100%',
            width: `${(players.length / 4) * 100}%`,
            transition: 'width 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
            boxShadow: '0 0 20px rgba(59, 130, 246, 0.5)'
          }} />
        </div>

        {/* Ready Button */}
        {currentPlayer && (
          <>
            <div style={{ textAlign: 'center' }}>
              <button
                onClick={handleSetReady}
                style={{
                  padding: '18px 60px',
                  fontSize: 20,
                  fontWeight: 700,
                  background: readyStatus.get(currentPlayer.id) 
                    ? 'linear-gradient(135deg, #10b981, #059669)'
                    : 'linear-gradient(135deg, #3b82f6, #2563eb)',
                  color: 'white',
                  border: 'none',
                  borderRadius: 50,
                  cursor: 'pointer',
                  transform: 'scale(1)',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  boxShadow: '0 10px 30px rgba(59, 130, 246, 0.3)',
                  letterSpacing: '1px'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'scale(1.05)';
                  e.currentTarget.style.boxShadow = '0 15px 40px rgba(59, 130, 246, 0.4)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = '0 10px 30px rgba(59, 130, 246, 0.3)';
                }}
              >
                {readyStatus.get(currentPlayer.id) ? 'BEREIT ✓' : 'BEREIT MACHEN'}
              </button>
            </div>

            {/* Früher Eintritt - wenn Setting aktiviert */}
            {settings.allowEarlyEntry && (
              <div style={{ textAlign: 'center', marginTop: 12 }}>
                <button
                  onClick={onGameStart}
                  style={{
                    padding: '12px 40px',
                    fontSize: 16,
                    fontWeight: 700,
                    background: 'linear-gradient(135deg, #22c55e, #16a34a)',
                    color: 'white',
                    border: 'none',
                    borderRadius: 40,
                    cursor: 'pointer',
                    transform: 'scale(1)',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    boxShadow: '0 8px 24px rgba(34, 197, 94, 0.35)',
                    letterSpacing: '0.5px'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.03)';
                    e.currentTarget.style.boxShadow = '0 12px 36px rgba(34, 197, 94, 0.45)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.boxShadow = '0 8px 24px rgba(34, 197, 94, 0.35)';
                  }}
                  title="Einzelstart: Du kannst schon ins Spiel, auch wenn andere noch nicht da sind."
                >
                  Jetzt alleine starten
                </button>
              </div>
            )}

            {/* Laufendes Spiel beitreten - wenn Spiel bereits gestartet */}
            {(game.state === 'running' || game.status === 'running') && (
              <div style={{ textAlign: 'center', marginTop: 16 }}>
                <div style={{
                  padding: '12px 24px',
                  background: 'rgba(251, 191, 36, 0.1)',
                  border: '2px solid rgba(251, 191, 36, 0.5)',
                  borderRadius: 12,
                  marginBottom: 12,
                  fontSize: 14,
                  color: '#fbbf24',
                  fontWeight: 600
                }}>
                  ⚡ Das Spiel läuft bereits!
                </div>
                <button
                  onClick={onGameStart}
                  style={{
                    padding: '14px 50px',
                    fontSize: 18,
                    fontWeight: 700,
                    background: 'linear-gradient(135deg, #f59e0b, #d97706)',
                    color: 'white',
                    border: 'none',
                    borderRadius: 40,
                    cursor: 'pointer',
                    transform: 'scale(1)',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    boxShadow: '0 10px 30px rgba(245, 158, 11, 0.4)',
                    letterSpacing: '0.5px',
                    animation: 'pulse 2s ease-in-out infinite'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.05)';
                    e.currentTarget.style.boxShadow = '0 15px 40px rgba(245, 158, 11, 0.6)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.boxShadow = '0 10px 30px rgba(245, 158, 11, 0.4)';
                  }}
                  title="Dem laufenden Spiel sofort beitreten"
                >
                  🚀 Sofort Spiel beitreten
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Countdown Overlay */}
      {countdown !== null && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(15, 23, 42, 0.95)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 10000,
          backdropFilter: 'blur(10px)'
        }}>
          <div style={{
            fontSize: 180,
            fontWeight: 900,
            background: 'linear-gradient(135deg, #3b82f6, #10b981)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            animation: 'pulse 1s ease',
            textShadow: '0 0 80px rgba(59, 130, 246, 0.5)'
          }}>
            {countdown}
          </div>
          <div style={{
            fontSize: 24,
            color: '#94a3b8',
            marginTop: 24,
            letterSpacing: '2px',
            fontWeight: 600
          }}>
            SPIEL STARTET...
          </div>
        </div>
      )}

      {/* Modal */}
      {modalContent && (
        <InfoModal
          content={modalContent}
          onClose={() => setModalContent(null)}
        />
      )}

      <style>{`
        @keyframes moveRight {
          from { transform: translateX(0); }
          to { transform: translateX(calc(100vw + 200px)); }
        }
        
        @keyframes moveLeft {
          from { transform: translateX(0); }
          to { transform: translateX(calc(-100vw - 200px)); }
        }
        
        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes pulse {
          0% { transform: scale(0.8); opacity: 0; }
          50% { transform: scale(1.1); }
          100% { transform: scale(1); opacity: 1; }
        }
        
        @keyframes pulse-glow {
          0%, 100% { 
            transform: scale(1); 
            box-shadow: 0 0 20px rgba(59, 130, 246, 0.5);
          }
          50% { 
            transform: scale(1.05); 
            box-shadow: 0 0 30px rgba(59, 130, 246, 0.8);
          }
        }
        
        @keyframes pulse-slow {
          0%, 100% { 
            transform: scale(1) rotate(0deg); 
            opacity: 0.5;
          }
          50% { 
            transform: scale(1.5) rotate(180deg); 
            opacity: 0.8;
          }
        }
        
        @keyframes pulse-dot {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }

        @keyframes ripple {
          0%   { transform: translate(-50%, -50%) scale(0);   opacity: 0.35; }
          100% { transform: translate(-50%, -50%) scale(8);   opacity: 0; }
        }
      `}</style>
    </div>
  );
}