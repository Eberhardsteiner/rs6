import React, { useEffect, useState } from 'react';
import { EnhancedLobbyPresence } from './EnhancedLobbyPresence';
import { EnhancedRoleSelector } from './EnhancedRoleSelector';
import { HotJoinPanel } from './HotJoinPanel';
import { enhancedMpService, type RoleId, type RoleSelectionResult } from '@/services/multiplayerEnhanced';
import { LogOut, User, Zap } from 'lucide-react';

interface MultiplayerEnhancedDemoProps {
  initialGameId?: string;
  initialPlayerId?: string;
  onExit?: () => void;
}

type ViewMode = 'hot-join' | 'lobby';

export const MultiplayerEnhancedDemo: React.FC<MultiplayerEnhancedDemoProps> = ({
  initialGameId,
  initialPlayerId,
  onExit
}) => {
  const [viewMode, setViewMode] = useState<ViewMode>(initialGameId ? 'lobby' : 'hot-join');
  const [gameId, setGameId] = useState<string | null>(initialGameId || null);
  const [playerId, setPlayerId] = useState<string | null>(initialPlayerId || null);
  const [currentRole, setCurrentRole] = useState<RoleId | null>(null);
  const [playerName, setPlayerName] = useState<string>('');

  useEffect(() => {
    if (!gameId || !playerId) return;

    enhancedMpService.startPresenceHeartbeat(playerId, gameId);

    return () => {
      enhancedMpService.stopPresenceHeartbeat();
      enhancedMpService.cleanup();
    };
  }, [gameId, playerId]);

  const handleJoinGame = (selectedGameId: string, availableRoles: RoleId[]) => {
    setGameId(selectedGameId);
    setViewMode('lobby');
  };

  const handleRoleSelected = (role: RoleId, result: RoleSelectionResult) => {
    if (result.success) {
      setCurrentRole(role);
    }
  };

  const handleLeaveGame = () => {
    enhancedMpService.stopPresenceHeartbeat();
    enhancedMpService.cleanup();
    setGameId(null);
    setCurrentRole(null);
    setViewMode('hot-join');
  };

  if (!playerId) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8">
        <div className="max-w-md mx-auto">
          <div className="bg-slate-800/50 rounded-lg p-8 border border-teal-500/30">
            <div className="flex items-center gap-3 mb-6">
              <User className="text-teal-400" size={32} />
              <h2 className="text-2xl font-bold text-white">Willkommen</h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Dein Name
                </label>
                <input
                  type="text"
                  value={playerName}
                  onChange={(e) => setPlayerName(e.target.value)}
                  placeholder="Gib deinen Namen ein"
                  className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-teal-500"
                />
              </div>

              <button
                onClick={() => {
                  if (playerName.trim()) {
                    const tempId = `player-${Date.now()}`;
                    setPlayerId(tempId);
                  }
                }}
                disabled={!playerName.trim()}
                className="w-full bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-500 hover:to-cyan-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 px-4 rounded-lg transition-all"
              >
                Weiter
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">
              Enhanced Multiplayer System
            </h1>
            <p className="text-gray-400">
              Echtzeit-Rollensperre • Lobby-Präsenz • Hot-Join
            </p>
          </div>

          <div className="flex items-center gap-4">
            {gameId && (
              <>
                <div className="text-right mr-4">
                  <div className="text-sm text-gray-400">Spieler</div>
                  <div className="font-semibold text-white">{playerName}</div>
                  {currentRole && (
                    <div className="text-xs text-teal-400 mt-1">Rolle: {currentRole}</div>
                  )}
                </div>

                <button
                  onClick={handleLeaveGame}
                  className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded-lg transition-colors"
                >
                  <LogOut size={18} />
                  Verlassen
                </button>
              </>
            )}

            {onExit && (
              <button
                onClick={onExit}
                className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
              >
                Beenden
              </button>
            )}
          </div>
        </div>

        {!gameId && (
          <div className="mb-6">
            <div className="flex gap-2 p-1 bg-slate-800 rounded-lg inline-flex">
              <button
                onClick={() => setViewMode('hot-join')}
                className={`px-4 py-2 rounded-md transition-all ${
                  viewMode === 'hot-join'
                    ? 'bg-teal-600 text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <Zap size={16} className="inline mr-2" />
                Hot-Join
              </button>
            </div>
          </div>
        )}

        {viewMode === 'hot-join' && !gameId && (
          <HotJoinPanel
            currentPlayerId={playerId}
            onJoinGame={handleJoinGame}
          />
        )}

        {gameId && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-6">
              <EnhancedRoleSelector
                gameId={gameId}
                playerId={playerId}
                currentRole={currentRole}
                onRoleSelected={handleRoleSelected}
              />
            </div>

            <div className="space-y-6">
              <EnhancedLobbyPresence
                gameId={gameId}
                currentPlayerId={playerId}
              />
            </div>
          </div>
        )}

        <div className="mt-8 p-6 bg-slate-800/30 border border-slate-700 rounded-lg">
          <h3 className="text-lg font-semibold text-white mb-4">Feature-Übersicht</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="p-4 bg-slate-700/30 rounded-lg">
              <div className="font-semibold text-teal-400 mb-2">🔒 Rollensperre</div>
              <p className="text-gray-400">
                Verhindert Doppelauswahl durch atomare Datenbank-Operationen. Echtzeit-Synchronisation
                zwischen allen Clients.
              </p>
            </div>
            <div className="p-4 bg-slate-700/30 rounded-lg">
              <div className="font-semibold text-teal-400 mb-2">👥 Lobby-Präsenz</div>
              <p className="text-gray-400">
                Live-Anzeige aller Spieler mit Online-Status, Heartbeat-Tracking und automatischer
                Offline-Erkennung nach 60s.
              </p>
            </div>
            <div className="p-4 bg-slate-700/30 rounded-lg">
              <div className="font-semibold text-teal-400 mb-2">⚡ Hot-Join</div>
              <p className="text-gray-400">
                Nahtloser Beitritt in laufende Spiele. Erkennt verfügbare Rollen und ermöglicht
                sofortiges Einsteigen.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
