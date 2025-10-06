import React, { useEffect, useState } from 'react';
import { Play, Users, Clock, Zap, RefreshCw, AlertCircle } from 'lucide-react';
import { enhancedMpService, type JoinableGame, type RoleId } from '@/services/multiplayerEnhanced';

interface HotJoinPanelProps {
  currentPlayerId: string;
  onJoinGame: (gameId: string, availableRoles: RoleId[]) => void;
}

export const HotJoinPanel: React.FC<HotJoinPanelProps> = ({
  currentPlayerId,
  onJoinGame
}) => {
  const [games, setGames] = useState<JoinableGame[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadJoinableGames = async () => {
    try {
      setError(null);
      const joinableGames = await enhancedMpService.getJoinableGames();
      setGames(joinableGames);
    } catch (err: any) {
      setError(err.message || 'Fehler beim Laden der Spiele');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadJoinableGames();

    const interval = setInterval(loadJoinableGames, 10000);

    return () => clearInterval(interval);
  }, []);

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadJoinableGames();
  };

  const handleJoinClick = (game: JoinableGame) => {
    onJoinGame(game.game_id, game.available_roles);
  };

  const getStateLabel = (state: string): { text: string; color: string } => {
    switch (state) {
      case 'LOBBY':
        return { text: 'Lobby', color: 'text-blue-400' };
      case 'IN_PROGRESS':
        return { text: 'Live', color: 'text-green-400' };
      default:
        return { text: 'Unbekannt', color: 'text-gray-400' };
    }
  };

  const getStateBadge = (state: string) => {
    const { text, color } = getStateLabel(state);
    return (
      <div className={`flex items-center gap-1.5 px-2 py-1 rounded-full bg-slate-700/50 ${color}`}>
        {state === 'IN_PROGRESS' && (
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
        )}
        <span className="text-xs font-semibold">{text}</span>
      </div>
    );
  };

  const formatTimeAgo = (timestamp: string): string => {
    const now = new Date();
    const created = new Date(timestamp);
    const diffMs = now.getTime() - created.getTime();
    const diffMins = Math.floor(diffMs / 60000);

    if (diffMins < 1) return 'Gerade eben';
    if (diffMins < 60) return `Vor ${diffMins} Min.`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `Vor ${diffHours} Std.`;
    return `Vor ${Math.floor(diffHours / 24)} Tag(en)`;
  };

  if (loading) {
    return (
      <div className="bg-slate-800/50 rounded-lg p-6 border border-teal-500/30">
        <div className="flex items-center gap-3 mb-4">
          <Zap className="text-teal-400" size={24} />
          <h3 className="text-lg font-semibold text-white">Hot-Join: Laufende Spiele</h3>
        </div>
        <div className="text-center py-12 text-gray-400">
          <RefreshCw className="mx-auto mb-2 animate-spin" size={32} />
          <p>Suche nach verfügbaren Spielen...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-800/50 rounded-lg p-6 border border-teal-500/30">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Zap className="text-teal-400" size={24} />
          <h3 className="text-lg font-semibold text-white">Hot-Join: Laufende Spiele</h3>
        </div>
        <button
          onClick={handleRefresh}
          disabled={refreshing}
          className="flex items-center gap-2 px-3 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-sm text-white transition-colors disabled:opacity-50"
        >
          <RefreshCw size={16} className={refreshing ? 'animate-spin' : ''} />
          Aktualisieren
        </button>
      </div>

      {error && (
        <div className="mb-4 bg-red-900/30 border border-red-500/50 rounded-lg p-3 flex items-center gap-2">
          <AlertCircle className="text-red-400" size={20} />
          <span className="text-red-200 text-sm">{error}</span>
        </div>
      )}

      {games.length === 0 ? (
        <div className="text-center py-12">
          <Play className="mx-auto mb-3 text-gray-500" size={48} />
          <p className="text-gray-400 mb-2">Keine Spiele zum Beitreten verfügbar</p>
          <p className="text-sm text-gray-500">
            Erstelle ein neues Spiel oder warte, bis andere Spieler ein Spiel starten
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {games.map((game) => (
            <div
              key={game.game_id}
              className="bg-slate-700/30 border border-slate-600/50 rounded-lg p-4 hover:border-teal-500/50 transition-all"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="font-semibold text-white">{game.game_name}</h4>
                    {getStateBadge(game.state)}
                  </div>
                  <div className="text-sm text-gray-400">
                    Host: {game.host_name}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-3 text-sm">
                <div className="flex items-center gap-2 text-gray-300">
                  <Users size={16} className="text-teal-400" />
                  <span>
                    {game.current_players}/{game.max_players} Spieler
                  </span>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <Clock size={16} className="text-teal-400" />
                  <span>{formatTimeAgo(game.created_at)}</span>
                </div>
              </div>

              <div className="mb-3">
                <div className="text-xs text-gray-400 mb-2">Verfügbare Rollen:</div>
                <div className="flex flex-wrap gap-2">
                  {game.available_roles.map((role) => (
                    <span
                      key={role}
                      className="px-2 py-1 bg-teal-900/30 border border-teal-500/30 rounded text-xs text-teal-300"
                    >
                      {role}
                    </span>
                  ))}
                </div>
              </div>

              <button
                onClick={() => handleJoinClick(game)}
                className="w-full bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-500 hover:to-cyan-500 text-white font-semibold py-2.5 px-4 rounded-lg transition-all flex items-center justify-center gap-2 shadow-lg"
              >
                <Play size={18} />
                {game.state === 'IN_PROGRESS' ? 'Jetzt beitreten (Live)' : 'Beitreten'}
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="mt-6 p-4 bg-blue-900/20 border border-blue-500/30 rounded-lg">
        <div className="flex items-start gap-3">
          <Zap className="text-blue-400 mt-0.5" size={18} />
          <div className="text-sm text-blue-200">
            <p className="font-semibold mb-1">Was ist Hot-Join?</p>
            <p className="text-blue-300/80">
              Mit Hot-Join kannst du nahtlos in laufende Spiele einsteigen. Wähle einfach eine
              verfügbare Rolle aus und spring direkt ins Geschehen!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
