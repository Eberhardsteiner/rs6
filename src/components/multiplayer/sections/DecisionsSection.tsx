// src/components/multiplayer/sections/DecisionsSection.tsx
import MultiplayerDecisionList from '../MultiplayerDecisionList';
import type { DecisionBlock, RoleId } from '@/core/models/domain';

export interface DecisionsSectionProps {
  roleBlocks: DecisionBlock[];
  day: number;
  role: RoleId;
  onDecisionMade: (...args: unknown[]) => void;
  onOpenAttachment: (filename: string) => void;
}

export function DecisionsSection({
  roleBlocks,
  day,
  role,
  onDecisionMade,
  onOpenAttachment
}: DecisionsSectionProps) {
  return (
    <div
      className="card"
      style={{
        margin: '24px 12px',
        backgroundColor: 'rgba(255, 255, 255, 0.98)',
        boxShadow: '0 4px 16px rgba(0,0,0,0.08)'
      }}
    >
      <h3>Entscheidungen - {role}</h3>
      <MultiplayerDecisionList
        blocks={roleBlocks}
        day={day}
        role={role}
        currentGameDay={day}
        onDecisionMade={onDecisionMade}
        onOpenAttachment={onOpenAttachment}
      />
    </div>
  );
}
