// src/components/dialogs/FinalModal.tsx
import React from 'react';
import { GameState } from '@/core/engine/gameEngine';
import { EndingResult } from '@/core/engine/ending';
import { exportFullPdf } from '@/services/pdf';

export default function FinalModal({
  state,
  ending,
  onClose
}: { state: GameState; ending: EndingResult; onClose: () => void }) {
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={e=>e.stopPropagation()}>
        <h2 style={{marginTop:0}}>{ending.title}</h2>
        <p style={{color:'var(--muted)'}}>{ending.summary}</p>

        <div className="hr" />
        <h3>Endbewertung (Score: {ending.score}/100)</h3>
        <table>
          <thead>
            <tr><th>Kriterium</th><th>Punkte</th></tr>
          </thead>
          <tbody>
            <tr><td>Liquidität</td><td>{ending.breakdown.cash}</td></tr>
            <tr><td>Gewinn/Verlust</td><td>{ending.breakdown.pl}</td></tr>
            <tr><td>Kundentreue</td><td>{ending.breakdown.customers}</td></tr>
            <tr><td>Bankvertrauen</td><td>{ending.breakdown.bank}</td></tr>
            <tr><td>Belegschaftsengagement</td><td>{ending.breakdown.workforce}</td></tr>
            <tr><td>Öffentliche Wahrnehmung</td><td>{ending.breakdown.publicPerception}</td></tr>
            <tr><td>Bonus</td><td>+{ending.breakdown.bonuses}</td></tr>
            <tr><td>Malus</td><td>-{ending.breakdown.malus}</td></tr>
          </tbody>
        </table>

        <div className="hr" />
        <div className="row" style={{justifyContent:'flex-end'}}>
          <button className="btn" onClick={()=>exportFullPdf(state, ending)}>Gesamt-PDF exportieren</button>
          <button className="btn" onClick={onClose}>Schließen</button>
        </div>
      </div>
    </div>
  );
}