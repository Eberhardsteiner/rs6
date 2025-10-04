import React from 'react';
import { Monitor } from 'lucide-react';
import IntranetVideoModal from './IntranetVideoModal';

interface IntranetButtonProps {
  day: number;
}

export default function IntranetButton({ day }: IntranetButtonProps) {
  const [showModal, setShowModal] = React.useState(false);

  return (
    <>
      <div className="card" style={{ marginTop: 12 }}>
        <button
          onClick={() => setShowModal(true)}
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            padding: '12px 16px',
            background: 'linear-gradient(135deg, #0ea5e9, #06b6d4)',
            color: 'white',
            border: 'none',
            borderRadius: '12px',
            fontSize: '14px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            boxShadow: '0 4px 16px rgba(14, 165, 233, 0.3)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 8px 24px rgba(14, 165, 233, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 16px rgba(14, 165, 233, 0.3)';
          }}
        >
          <Monitor size={18} />
          📺 Intranet-Meldung
        </button>
      </div>

      {showModal && (
        <IntranetVideoModal 
          day={day} 
          onClose={() => setShowModal(false)} 
        />
      )}
    </>
  );
}