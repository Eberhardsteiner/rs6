import React from 'react';
import { FileText } from 'lucide-react';

interface UserNotesFieldProps {
  notes: string;
  onNotesChange: (notes: string) => void;
}

export default function UserNotesField({ notes, onNotesChange }: UserNotesFieldProps) {
  const [localNotes, setLocalNotes] = React.useState(notes);

  // Sync with external changes
  React.useEffect(() => {
    setLocalNotes(notes);
  }, [notes]);

  const handleSave = () => {
    onNotesChange(localNotes);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      handleSave();
    }
  };

  const hasChanges = localNotes !== notes;

  return (
    <div className="card" style={{ marginTop: 12 }}>
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '8px', 
        marginBottom: '12px' 
      }}>
        <FileText size={18} style={{ color: '#0ea5e9' }} />
        <h3 style={{ margin: 0, fontSize: '16px', color: '#1e293b' }}>
          Persönliche Notizen
        </h3>
      </div>
      
      <div style={{ 
        fontSize: '14px', 
        color: '#64748b', 
        marginBottom: '12px',
        lineHeight: '1.4'
      }}>
        Hier können Sie Notizen zu Ihrem Spielverlauf und Entscheidungsverhalten festhalten. 
        Diese werden im Gesamtprotokoll-PDF aufgeführt.
      </div>

      <textarea
        value={localNotes}
        onChange={(e) => setLocalNotes(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Notizen zum Spielverlauf, Entscheidungslogik, Lessons Learned..."
        style={{
          width: '100%',
          minHeight: '120px',
          padding: '12px',
          border: '1px solid #e2e8f0',
          borderRadius: '8px',
          fontSize: '14px',
          lineHeight: '1.5',
          fontFamily: 'inherit',
          resize: 'vertical',
          transition: 'border-color 0.2s ease'
        }}
        onFocus={(e) => {
          e.currentTarget.style.borderColor = '#0ea5e9';
          e.currentTarget.style.boxShadow = '0 0 0 3px rgba(14, 165, 233, 0.1)';
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderColor = '#e2e8f0';
          e.currentTarget.style.boxShadow = 'none';
        }}
      />

      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginTop: '12px' 
      }}>
        <div style={{ 
          fontSize: '12px', 
          color: '#9ca3af' 
        }}>
          Strg+Enter zum Speichern
        </div>
        
        <button
          onClick={handleSave}
          disabled={!hasChanges}
          style={{
            padding: '8px 16px',
            background: hasChanges ? 'linear-gradient(135deg, #0ea5e9, #06b6d4)' : '#f1f5f9',
            color: hasChanges ? 'white' : '#9ca3af',
            border: 'none',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: '600',
            cursor: hasChanges ? 'pointer' : 'not-allowed',
            transition: 'all 0.2s ease',
            opacity: hasChanges ? 1 : 0.6
          }}
          onMouseEnter={(e) => {
            if (hasChanges) {
              e.currentTarget.style.transform = 'translateY(-1px)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(14, 165, 233, 0.3)';
            }
          }}
          onMouseLeave={(e) => {
            if (hasChanges) {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }
          }}
        >
          {hasChanges ? '💾 Speichern' : '✓ Gespeichert'}
        </button>
      </div>
    </div>
  );
}