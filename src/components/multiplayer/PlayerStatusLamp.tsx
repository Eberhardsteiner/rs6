import React from 'react';
import type { RoleId } from '@/core/models/domain';

export type PlayerStatus = 'offline' | 'lobby' | 'present' | 'warning' | 'left' | 'decided';

interface PlayerStatusLampProps {
  role: RoleId;
  status: PlayerStatus;
  label?: string;
  inactiveMinutes?: number;
  decisionsCount?: number;
}

export default function PlayerStatusLamp({
  role,
  status,
  label,
  inactiveMinutes,
  decisionsCount
}: PlayerStatusLampProps) {

  const getStatusConfig = (s: PlayerStatus) => {
    switch (s) {
      case 'decided':
        return {
          color: '#10b981',
          bg: 'rgba(16,185,129,0.2)',
          shadow: '0 0 8px #10b981',
          title: `${label || role}: Entscheidung abgegeben${decisionsCount ? ` (${decisionsCount} Entscheidungen)` : ''}`,
          animate: 'none'
        };
      case 'present':
        return {
          color: '#ffffff',
          bg: 'rgba(255,255,255,0.15)',
          shadow: '0 0 6px rgba(255,255,255,0.5)',
          title: `${label || role}: Im Spiel aktiv`,
          animate: 'none'
        };
      case 'lobby':
        return {
          color: '#f59e0b',
          bg: 'rgba(245,158,11,0.2)',
          shadow: '0 0 6px rgba(245,158,11,0.5)',
          title: `${label || role}: In der Lobby`,
          animate: 'none'
        };
      case 'warning':
        return {
          color: '#ef4444',
          bg: 'rgba(239,68,68,0.15)',
          shadow: 'none',
          title: `${label || role}: Inaktiv seit ${inactiveMinutes || 5} Minuten (Warnung)`,
          animate: 'pulse-red'
        };
      case 'left':
        return {
          color: '#ef4444',
          bg: 'rgba(239,68,68,0.2)',
          shadow: '0 0 6px rgba(239,68,68,0.5)',
          title: `${label || role}: Spiel verlassen oder inaktiv seit ${inactiveMinutes || 7}+ Minuten`,
          animate: 'none'
        };
      case 'offline':
      default:
        return {
          color: '#9ca3af',
          bg: 'rgba(156,163,175,0.1)',
          shadow: 'none',
          title: `${label || role}: Nicht verbunden`,
          animate: 'none'
        };
    }
  };

  const config = getStatusConfig(status);

  return (
    <>
      <span
        title={config.title}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 6,
          padding: '3px 8px',
          borderRadius: 999,
          border: '1px solid rgba(255,255,255,0.35)',
          background: config.bg
        }}
      >
        <span
          className={config.animate !== 'none' ? config.animate : ''}
          style={{
            width: 10,
            height: 10,
            borderRadius: '50%',
            background: config.color,
            boxShadow: config.shadow,
            animation: config.animate !== 'none' ? `${config.animate} 2s ease-in-out infinite` : 'none'
          }}
        />
        <span style={{ fontSize: 12, fontWeight: 700 }}>{label || role}</span>
      </span>

      <style>{`
        @keyframes pulse-red {
          0%, 100% { opacity: 1; transform: scale(1); box-shadow: 0 0 0 rgba(239,68,68,0); }
          50% { opacity: 0.6; transform: scale(0.9); box-shadow: 0 0 8px rgba(239,68,68,0.8); }
        }
      `}</style>
    </>
  );
}
