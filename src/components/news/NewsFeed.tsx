// src/components/news/NewsFeed.tsx
import * as React from 'react';
import type { DayNewsItem } from '@/core/models/domain';
import { attachmentContents } from '@/data/attachmentContents';
import AttachmentModal from '@/components/dialogs/AttachmentModal';

type Props = {
  items: DayNewsItem[];
  onOpenNarrative?: (newsId: string) => void;
};

/**
 * Prüft, ob ein News-Item Details hat:
 *  - expandedText (string oder function)
 *  - attachments
 *  - suppressHints unterbindet Details, wenn true
 */
function hasDetails(n: DayNewsItem): boolean {
  const et = n.expandedText;
  const hasExpandedText =
    (typeof et === 'string' && et.trim().length > 0) ||
    (typeof et === 'function');
  const hasAttachments = Array.isArray(n.attachments) && n.attachments.length > 0;
  return !n.suppressHints && (hasExpandedText || hasAttachments);
}

/**
 * CSS-Styles für die Severity-Badges.
 */
function sevStyle(sev?: string): React.CSSProperties {
  const s = String(sev || '').toLowerCase();
  if (s === 'critical' || s === 'crit') {
    return { background: '#fef2f2', color: '#b91c1c', border: '1px solid #fecaca' };
  }
  if (s === 'high' || s === 'warn' || s === 'warning') {
    return { background: '#fff7ed', color: '#c2410c', border: '1px solid #fed7aa' };
  }
  if (s === 'medium') {
    return { background: '#fefce8', color: '#854d0e', border: '1px solid #fde68a' };
  }
  return { background: '#eef2ff', color: '#3730a3', border: '1px solid #c7d2fe' };
}

export default function NewsFeed({ items, onOpenNarrative }: Props) {
  const [showAttachment, setShowAttachment] = React.useState<string | null>(null);

  const handleAttachmentClick = (filename: string) => {
    const content = attachmentContents[filename];
    if (content) {
      setShowAttachment(filename);
    }
  };

  const closeAttachment = () => {
    setShowAttachment(null);
  };
  return (
    <>
      <div className="card">
      <div className="row" style={{ alignItems: 'baseline', justifyContent: 'space-between' }}>
        <h3 style={{ margin: 0 }}>Meldungen des Tages</h3>
        <span style={{ fontSize: 12, color: '#6b7280' }}>
          Klicken / Enter zum Öffnen (falls Details vorhanden)
        </span>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: 12,
          marginTop: 12,
        }}
      >
        {items.map((n) => {
          const interactive = hasDetails(n) && !!onOpenNarrative;
          const content: string = n.content ?? '';

          return (
            <div
              key={n.id}
              className="card"
              role={interactive ? 'button' : undefined}
              tabIndex={interactive ? 0 : undefined}
              aria-disabled={interactive ? undefined : true}
              style={{
                flex: '1 1 320px',
                cursor: interactive ? 'pointer' : 'default',
                borderColor: n.isImportant ? '#0ea5e9' : 'var(--border)',
              }}
              onClick={() => {
                if (interactive && onOpenNarrative) onOpenNarrative(n.id);
              }}
              onKeyDown={(e) => {
                if (!interactive || !onOpenNarrative) return;
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onOpenNarrative(n.id);
                }
              }}
            >
              <div
                className="row"
                style={{ justifyContent: 'space-between', alignItems: 'center', gap: 8 }}
              >
                <strong>{n.title}</strong>
                <span
                  style={{
                    ...sevStyle(n.severity),
                    fontSize: 12,
                    padding: '2px 8px',
                    borderRadius: 999,
                  }}
                >
                  {n.severity ?? 'info'}
                </span>
              </div>

              {/* Kurztext/Fallback */}
              {content && (
                <div style={{ color: 'var(--muted)' }}>
                  {content}
                </div>
              )}

              {/* Anlagenhinweis */}
              {Array.isArray(n.attachments) && n.attachments.length > 0 && (
                <div style={{ marginTop: 6, fontSize: 12 }}>
                  <span style={{ color: 'var(--muted)' }}>📎 Anlagen: </span>
                  {n.attachments.map((attachment, index) => (
                    <React.Fragment key={attachment}>
                      {index > 0 && <span style={{ color: 'var(--muted)' }}>, </span>}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAttachmentClick(attachment);
                        }}
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
              )}

              {/* Klickhinweis (nur wenn interaktiv) */}
              {interactive && (
                <div style={{ marginTop: 8, fontSize: 12, color: '#64748b' }}>
                  Details öffnen …
                </div>
              )}
            </div>
          );
        })}
      </div>
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
