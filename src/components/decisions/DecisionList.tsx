import React from 'react';
import DecisionBlock from './DecisionBlock';
import type { DecisionBlock as TBlock, RoleId } from '@/core/models/domain';

type Props = {
  blocks: TBlock[];
  day: number;
  role: RoleId; // legacy Prop (wird intern nicht benötigt, bleibt für Signatur)
  onChoose: (b: TBlock, optId: 'a'|'b'|'c'|'d') => void;
  onCustom: (b: TBlock, text: string) => void;
  selectedByBlock?: Map<string, 'a'|'b'|'c'|'d'>; // <<< neu für Markierung
  onOpenAttachment?: (filename: string) => void;
};

export default function DecisionList({
  blocks, onChoose, onCustom, selectedByBlock, onOpenAttachment
}: Props) {
  if (!blocks.length) {
    return (
      <div className="card">
        <h3>Entscheidungen</h3>
        <p style={{ color:'var(--muted)' }}>Für heute liegen keine Entscheidungen an.</p>
      </div>
    );
  }

  return (
    <div className="card">
      <h3>Entscheidungen</h3>
      <div className="col" style={{ gap: 12 }}>
        {blocks.map((b) => (
          <DecisionBlock
            key={b.id}
            block={b}
            selected={selectedByBlock?.get(b.id) || undefined}
            onChoose={(optId, customText) => onChoose(b, optId, customText)}
            onCustom={(text) => onCustom(b, text)}
            onOpenAttachment={onOpenAttachment}
          />
        ))}
      </div>
    </div>
  );
}
