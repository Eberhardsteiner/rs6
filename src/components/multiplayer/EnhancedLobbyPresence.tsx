import React, { useEffect, useState } from 'react';
import { Users, Wifi, WifiOff, Clock, CheckCircle, Circle } from 'lucide-react';
import { enhancedMpService, type LobbyPlayer, type RoleId } from '@/services/multiplayerEnhanced';

interface EnhancedLobbyPresenceProps {
  gameId: string;
  currentPlayerId?: string;
}

export const EnhancedLobbyPresence: React.FC<EnhancedLobbyPresenceProps> = ({
  gameId,
  currentPlayerId
}) => {
  const [players, setPlayers] = useState<LobbyPlayer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!gameId) return;

    setLoading(true);

    const channel = enhancedMpService.subscribeToLobbyPresence(
      gameId,
      (updatedPlayers) => {
        setPlayers(updatedPlayers);
        setLoading(false);
      }
    );

    return () => {
      enhancedMpService.unsubscribeFromLobbyPresence();
    };
  }, [gameId]);

  const getRoleColor = (role: RoleId): string => {
    const colors: Record<RoleId, string> = {
      CEO: '#3b82f6',
      CFO: '#10b981',
      OPS: '#f59e0b',
      HRLEGAL: '#8b5cf6',
      TRAINER: '#14b8a6'
    };
    return colors[role] || '#6b7280';
  };

  const getStatusBadge = (player: LobbyPlayer) => {
    const isCurrentPlayer = player.player_id === currentPlayerId;

    if (player.is_online) {
      return (
        <div className="flex items-center gap-2">
          <Wifi size={14} className="text-green-400" />
          <span className="text-xs text-green-400">Online</span>
          {player.is_ready && (
            <CheckCircle size={14} className="text-emerald-400 ml-1" />
          )}
        </div>
      );
    } else {
      return (
        <div className="flex items-center gap-2">
          <WifiOff size={14} className="text-gray-500" />
          <span className="text-xs text-gray-500">
            {player.last_seen_seconds_ago < 120
              ? `Vor ${player.last_seen_seconds_ago}s`
              : 'Offline'}
          </span>
        </div>
      );
    }
  };

  if (loading) {
    return (
      <div className="bg-slate-800/50 rounded-lg p-6 border border-teal-500/30">
        <div className="flex items-center gap-3 mb-4">
          <Users className="text-teal-400" size={24} />
          <h3 className="text-lg font-semibold text-white">Lobby Präsenz</h3>
        </div>
        <div className="text-center py-8 text-gray-400">
          <Clock className="mx-auto mb-2 animate-spin" size={32} />
          <p>Lade Spielerliste...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-800/50 rounded-lg p-6 border border-teal-500/30">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <Users className="text-teal-400" size={24} />
          <h3 className="text-lg font-semibold text-white">Lobby Präsenz</h3>
        </div>
        <div className="text-sm text-gray-400">
          {players.length} Spieler
        </div>
      </div>

      {players.length === 0 ? (
        <div className="text-center py-8 text-gray-400">
          <Users className="mx-auto mb-2 opacity-50" size={48} />
          <p>Noch keine Spieler in der Lobby</p>
        </div>
      ) : (
        <div className="space-y-3">
          {players.map((player) => {
            const isCurrentPlayer = player.player_id === currentPlayerId;
            const roleColor = getRoleColor(player.role as RoleId);

            return (
              <div
                key={player.player_id}
                className={`
                  relative p-4 rounded-lg border transition-all
                  ${
                    isCurrentPlayer
                      ? 'bg-teal-900/30 border-teal-400/50'
                      : 'bg-slate-700/30 border-slate-600/50'
                  }
                  ${player.is_online ? 'opacity-100' : 'opacity-60'}
                `}
              >
                {isCurrentPlayer && (
                  <div className="absolute top-2 right-2 text-xs font-semibold text-teal-400">
                    (Du)
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {player.is_online ? (
                      <div
                        className="w-3 h-3 rounded-full animate-pulse"
                        style={{ backgroundColor: roleColor }}
                      />
                    ) : (
                      <Circle size={12} className="text-gray-500" />
                    )}

                    <div>
                      <div className="font-semibold text-white">
                        {player.player_name}
                      </div>
                      <div
                        className="text-xs font-medium mt-1"
                        style={{ color: roleColor }}
                      >
                        {player.role}
                      </div>
                    </div>
                  </div>

                  {getStatusBadge(player)}
                </div>

                {player.is_ready && (
                  <div className="mt-2 pt-2 border-t border-emerald-500/30">
                    <div className="flex items-center gap-2 text-emerald-400 text-sm">
                      <CheckCircle size={14} />
                      <span>Bereit zum Spielen</span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      <div className="mt-4 pt-4 border-t border-slate-600/50">
        <div className="flex items-center gap-2 text-xs text-gray-400">
          <Wifi size={12} />
          <span>Echtzeit-Updates aktiv</span>
        </div>
      </div>
    </div>
  );
};
