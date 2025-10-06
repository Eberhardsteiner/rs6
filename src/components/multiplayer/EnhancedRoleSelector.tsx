import React, { useEffect, useState } from 'react';
import { Lock, Unlock, AlertCircle, CheckCircle, Loader } from 'lucide-react';
import { enhancedMpService, type RoleId, type RoleSelectionResult } from '@/services/multiplayerEnhanced';

interface EnhancedRoleSelectorProps {
  gameId: string;
  playerId: string;
  currentRole?: RoleId | null;
  onRoleSelected: (role: RoleId, result: RoleSelectionResult) => void;
  disabled?: boolean;
}

interface RoleInfo {
  id: RoleId;
  name: string;
  description: string;
  color: string;
  icon: string;
}

const ROLE_INFO: RoleInfo[] = [
  {
    id: 'CEO',
    name: 'CEO',
    description: 'Chief Executive Officer - Strategische Führung',
    color: '#3b82f6',
    icon: '👔'
  },
  {
    id: 'CFO',
    name: 'CFO',
    description: 'Chief Financial Officer - Finanzmanagement',
    color: '#10b981',
    icon: '💰'
  },
  {
    id: 'OPS',
    name: 'Operations',
    description: 'Operations Manager - Operative Steuerung',
    color: '#f59e0b',
    icon: '⚙️'
  },
  {
    id: 'HRLEGAL',
    name: 'HR & Legal',
    description: 'Human Resources & Legal - Personal & Recht',
    color: '#8b5cf6',
    icon: '⚖️'
  }
];

export const EnhancedRoleSelector: React.FC<EnhancedRoleSelectorProps> = ({
  gameId,
  playerId,
  currentRole,
  onRoleSelected,
  disabled = false
}) => {
  const [occupiedRoles, setOccupiedRoles] = useState<Set<RoleId>>(new Set());
  const [selectedRole, setSelectedRole] = useState<RoleId | null>(currentRole || null);
  const [loading, setLoading] = useState<RoleId | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    if (!gameId) return;

    const channel = enhancedMpService.subscribeToRoleLocks(
      gameId,
      (roles) => {
        setOccupiedRoles(roles);
      }
    );

    return () => {
      enhancedMpService.unsubscribeFromRoleLocks();
    };
  }, [gameId]);

  const handleRoleClick = async (role: RoleId) => {
    if (disabled || loading || occupiedRoles.has(role)) {
      return;
    }

    setError(null);
    setSuccess(null);
    setLoading(role);

    try {
      const result = await enhancedMpService.selectRoleAtomic(
        gameId,
        playerId,
        role
      );

      if (result.success) {
        setSelectedRole(role);
        setSuccess(`Rolle ${role} erfolgreich ausgewählt!`);
        onRoleSelected(role, result);

        setTimeout(() => setSuccess(null), 3000);
      } else {
        setError(result.message || 'Rollenauswahl fehlgeschlagen');

        if (result.error === 'ROLE_TAKEN') {
          setOccupiedRoles(prev => new Set([...prev, role]));
        }

        setTimeout(() => setError(null), 5000);
      }
    } catch (err: any) {
      setError(err.message || 'Ein unerwarteter Fehler ist aufgetreten');
      setTimeout(() => setError(null), 5000);
    } finally {
      setLoading(null);
    }
  };

  const isRoleOccupied = (role: RoleId): boolean => {
    return occupiedRoles.has(role) && selectedRole !== role;
  };

  const isRoleSelected = (role: RoleId): boolean => {
    return selectedRole === role;
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">Rolle auswählen</h3>
        <div className="text-sm text-gray-400">
          {occupiedRoles.size} von {ROLE_INFO.length} belegt
        </div>
      </div>

      {error && (
        <div className="bg-red-900/30 border border-red-500/50 rounded-lg p-3 flex items-center gap-2">
          <AlertCircle className="text-red-400" size={20} />
          <span className="text-red-200 text-sm">{error}</span>
        </div>
      )}

      {success && (
        <div className="bg-green-900/30 border border-green-500/50 rounded-lg p-3 flex items-center gap-2">
          <CheckCircle className="text-green-400" size={20} />
          <span className="text-green-200 text-sm">{success}</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {ROLE_INFO.map((roleInfo) => {
          const occupied = isRoleOccupied(roleInfo.id);
          const selected = isRoleSelected(roleInfo.id);
          const isLoading = loading === roleInfo.id;
          const isDisabled = disabled || occupied || isLoading;

          return (
            <button
              key={roleInfo.id}
              onClick={() => handleRoleClick(roleInfo.id)}
              disabled={isDisabled}
              className={`
                relative p-6 rounded-lg border-2 transition-all text-left
                ${
                  selected
                    ? 'border-teal-400 bg-teal-900/30 shadow-lg shadow-teal-500/20'
                    : occupied
                    ? 'border-red-500/50 bg-red-900/20 opacity-60 cursor-not-allowed'
                    : 'border-slate-600 bg-slate-700/30 hover:border-teal-500/50 hover:bg-slate-700/50 cursor-pointer'
                }
                ${isDisabled && !occupied ? 'opacity-50 cursor-not-allowed' : ''}
              `}
            >
              <div className="absolute top-3 right-3">
                {isLoading ? (
                  <Loader className="animate-spin text-teal-400" size={20} />
                ) : occupied ? (
                  <Lock className="text-red-400" size={20} />
                ) : selected ? (
                  <CheckCircle className="text-teal-400" size={20} />
                ) : (
                  <Unlock className="text-gray-500" size={20} />
                )}
              </div>

              <div className="flex items-start gap-4">
                <div className="text-4xl">{roleInfo.icon}</div>
                <div className="flex-1">
                  <h4
                    className="font-semibold text-lg mb-1"
                    style={{ color: occupied ? '#9ca3af' : roleInfo.color }}
                  >
                    {roleInfo.name}
                  </h4>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    {roleInfo.description}
                  </p>
                </div>
              </div>

              {occupied && (
                <div className="mt-4 pt-4 border-t border-red-500/30">
                  <div className="flex items-center gap-2 text-red-400 text-sm">
                    <Lock size={14} />
                    <span>Bereits von einem anderen Spieler belegt</span>
                  </div>
                </div>
              )}

              {selected && !occupied && (
                <div className="mt-4 pt-4 border-t border-teal-500/30">
                  <div className="flex items-center gap-2 text-teal-400 text-sm">
                    <CheckCircle size={14} />
                    <span>Du spielst diese Rolle</span>
                  </div>
                </div>
              )}
            </button>
          );
        })}
      </div>

      <div className="mt-6 p-4 bg-blue-900/20 border border-blue-500/30 rounded-lg">
        <div className="flex items-start gap-3">
          <AlertCircle className="text-blue-400 mt-0.5" size={18} />
          <div className="text-sm text-blue-200">
            <p className="font-semibold mb-1">Hinweis zur Rollenauswahl:</p>
            <p className="text-blue-300/80">
              Jede Rolle kann nur einmal pro Spiel vergeben werden. Die Auswahl wird in Echtzeit
              synchronisiert - wenn eine Rolle belegt wird, wird sie automatisch für alle anderen
              Spieler gesperrt.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
