import React from 'react';
import type { DecisionBlock as TBlock } from '@/core/models/domain';
import { attachmentContents } from '@/data/attachmentContents';
import AttachmentModal from '@/components/dialogs/AttachmentModal';

function getRoleColor(role: string) {
  switch (role) {
    case 'CEO': return '#8b5cf6';
    case 'CFO': return '#06b6d4';
    case 'OPS': return '#f59e0b';
    case 'HRLEGAL': return '#10b981';
    default: return '#6b7280';
  }
}

type Props = {
  block: TBlock;
  disabled?: boolean;
  selected?: 'a'|'b'|'c'|'d' | undefined; // aktuell gewählte Option (für Markierung)
  onChoose: (optId: 'a'|'b'|'c'|'d') => void;
  onCustom: (text: string) => void;
  onOpenAttachment?: (filename: string) => void;
};

export default function DecisionBlock({
  block, disabled, selected, onChoose, onCustom, onOpenAttachment
}: Props) {
  const [text, setText] = React.useState('');
  const [showAttachment, setShowAttachment] = React.useState<string | null>(null);

  const handleAttachmentClick = (filename: string) => {
    const content = attachmentContents[filename];
    if (content) {
      setShowAttachment(filename);
    } else if (onOpenAttachment) {
      onOpenAttachment(filename);
    }
  };

  const closeAttachment = () => {
    setShowAttachment(null);
  };

  return (
    <>
      <div className="card">
        <div className="row" style={{ justifyContent:'space-between', alignItems: 'flex-start' }}>
          <h3 style={{ flex: 1 }}>{block.title}</h3>
          <span
            className="badge"
            style={{
              backgroundColor: getRoleColor(block.role),
              color: 'white',
              border: 'none'
            }}
          >
            {block.role}
          </span>
        </div>

        <div style={{ color:'var(--muted)', marginBottom: 8 }}>{block.context}</div>
        <div style={{ marginBottom: 8 }}><em>Dilemma:</em> {block.dilemma}</div>

        {block.hiddenAgendaHint ? (
          <div
            style={{
              fontSize: 12,
              color: '#334155',
              backgroundColor: '#f1f5f9',
              padding: 8,
              borderRadius: 6,
              marginBottom: 12,
              border: '1px solid #e2e8f0'
            }}
          >
            💡 <strong>Hidden Agenda:</strong> {block.hiddenAgendaHint}
          </div>
        ) : null}

        <div className="row" style={{ marginTop: 12, gap: 8 }}>
          {block.options.map((o) => {
            const isSel = selected === o.id;
            
            // Debug-Log für Entwicklung (kann später entfernt werden)
            if (process.env.NODE_ENV === 'development') {
              console.log(`Block ${block.id}, Option ${o.id}, Selected: ${selected}, isSel: ${isSel}`);
            }
            
            return (
              <button
                key={o.id}
                type="button"
                className="btn"
                aria-pressed={isSel}
                disabled={!!disabled}
                style={{
                  flex: '1 1 200px',
                  minHeight: '60px',
                  textAlign: 'left',
                  fontSize: 13,
                  lineHeight: '1.3',
                  // Verstärkte sichtbare Markierung:
                  borderWidth: isSel ? 3 : 1,
                  borderStyle: 'solid',
                  borderColor: isSel ? '#0ea5e9' : 'var(--border)',
                  background: isSel ? 'linear-gradient(135deg, #e0f2fe, #bae6fd)' : '#ffffff',
                  boxShadow: isSel ? '0 4px 12px rgba(14, 165, 233, 0.3), 0 0 0 3px rgba(14, 165, 233, 0.2) inset' : '0 1px 3px rgba(0,0,0,0.1)',
                  fontWeight: isSel ? 700 : 400,
                  color: isSel ? '#0b69a3' : 'inherit',
                  transform: isSel ? 'translateY(-2px)' : 'translateY(0)',
                  transition: 'all 0.2s ease'
                }}
                onClick={() => onChoose(o.id, text)}
              >
                <strong>{o.id.toUpperCase()}</strong><br />
                {o.label}
              </button>
            );
          })}
        </div>

        <fieldset style={{ marginTop: 16, padding: 12 }}>
          <legend>Optionale Entscheidungsalternative</legend>
          <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 8 }}>
            Eingaben hier haben keine Auswirkungen auf die KPI, werden aber im Entscheidungsprotokoll aufgeführt.
          </div>
          <textarea
            rows={3}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Beschreiben Sie Ihre alternative Entscheidung..."
            style={{ width: '100%', marginBottom: 8, padding: 8 }}
          />
          <button
            type="button"
            className="btn"
            onClick={() => onCustom(text)}
            disabled={!text.trim()}
          >
            Speichern (ohne KPI-Effekt)
          </button>
        </fieldset>

        {block.attachments?.length ? (
          <div style={{ marginTop: 12, fontSize: 12 }}>
            <span style={{ color: 'var(--muted)' }}>📎 Anlagen: </span>
            {block.attachments.map((attachment, index) => (
              <React.Fragment key={attachment}>
                {index > 0 && <span style={{ color: 'var(--muted)' }}>, </span>}
                <button
                  onClick={() => handleAttachmentClick(attachment)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#0ea5e9',
                    textDecoration: 'underline',
                    cursor: 'pointer',
                    fontSize: 'inherit',
                    padding: 0,
                    fontFamily: 'inherit'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#0369a1';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = '#0ea5e9';
                  }}
                >
                  {attachment}
                </button>
              </React.Fragment>
            ))}
          </div>
        ) : null}
      </div>

      {showAttachment && attachmentContents[showAttachment] && (
        <AttachmentModal
          title={attachmentContents[showAttachment].title}
          content={attachmentContents[showAttachment].content}
          onClose={closeAttachment}
        />
      )}
    </>
  );
}