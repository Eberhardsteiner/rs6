// src/components/dialogs/InsolvencyModal.tsx
import React from 'react';

export default function InsolvencyModal({ onClose }:{ onClose:()=>void }) {
  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h3 style={{color: 'var(--bad)', marginBottom: 16}}>⚠️ Insolvenz eingetreten</h3>
        <p style={{marginBottom: 16}}>
          Die Liquidität ist negativ bzw. fällige Zahlungen konnten nicht bedient werden.
          Das Spiel ist beendet.
        </p>
        <div style={{
          backgroundColor: '#fef2f2',
          border: '1px solid #fecaca',
          borderRadius: 8,
          padding: 12,
          marginBottom: 16
        }}>
          <strong>Lernziel erreicht:</strong> Sie haben die kritischen Auswirkungen von
          Liquiditätsengpässen in der Praxis erlebt. Analysieren Sie Ihre Entscheidungen
          im Protokoll, um daraus zu lernen.
        </div>
        <div style={{textAlign:'right'}}>
          <button className="btn primary" onClick={onClose}>
            Neu starten
          </button>
        </div>
      </div>
    </div>
  );
}