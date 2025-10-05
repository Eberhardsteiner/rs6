// src/components/multiplayer/components/TrainerPresenceLamp.tsx
import React, { useEffect, useState } from 'react';
import { supabase } from '@/services/supabaseClient';

interface TrainerPresenceLampProps {
  gameId: string;
}

export function TrainerPresenceLamp({ gameId }: TrainerPresenceLampProps): JSX.Element | null {
  const [present, setPresent] = useState(false);

  useEffect(() => {
    let active = true;

    const fetchPresence = async (): Promise<void> => {
      const { data } = await supabase
        .from('players')
        .select('id')
        .eq('game_id', gameId)
        .eq('role', 'TRAINER')
        .maybeSingle();

      if (!active) return;
      setPresent(!!data);
    };

    fetchPresence();

    const channel = supabase
      .channel(`trainer-pres-${gameId}`)
      .on('postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'players',
          filter: `game_id=eq.${gameId}`
        },
        fetchPresence
      )
      .subscribe();

    return () => {
      active = false;
      supabase.removeChannel(channel);
    };
  }, [gameId]);

  if (!present) return null;

  return (
    <div
      title="Trainer*in anwesend"
      style={{
        position: 'fixed',
        top: 8,
        right: 8,
        zIndex: 2000,
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        padding: '6px 10px',
        background: 'rgba(59,130,246,0.12)',
        border: '1px solid rgba(59,130,246,0.35)',
        borderRadius: 999
      }}
    >
      <div
        style={{
          width: 10,
          height: 10,
          borderRadius: '50%',
          background: '#60a5fa',
          boxShadow: '0 0 12px #60a5fa'
        }}
      />
      <span style={{
        color: '#1e40af',
        fontWeight: 600,
        fontSize: 12
      }}>
        Trainer anwesend
      </span>
    </div>
  );
}

export default TrainerPresenceLamp;
