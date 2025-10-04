// src/components/Sparkline.tsx
import React from 'react';

interface SparklineProps {
  values: number[];
  color: string;
  width?: number;
  height?: number;
}

const Sparkline: React.FC<SparklineProps> = ({ 
  values, 
  color, 
  width = 100, 
  height = 20 
}) => {
  // Keine Werte = keine Anzeige
  if (!values || values.length === 0) {
    return null;
  }

  // Bei nur einem Wert zeigen wir einen Punkt
  if (values.length === 1) {
    return (
      <svg width={width} height={height} style={{ display: 'block', background: 'rgba(0,0,0,0.02)' }}>
        <circle 
          cx={width / 2} 
          cy={height / 2} 
          r={3}
          fill={color} 
          opacity={0.6}
        />
        <line 
          x1={0} 
          y1={height / 2} 
          x2={width} 
          y2={height / 2} 
          stroke={color} 
          strokeWidth={0.5}
          opacity={0.2}
        />
      </svg>
    );
  }

  // Min/Max für Skalierung berechnen
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min;
  
  // Padding für die Ränder
  const padding = 2;
  const chartHeight = height - (padding * 2);
  const chartWidth = width - (padding * 2);

  // Punkte berechnen - WICHTIG: Y-Achse ist invertiert in SVG!
  const points = values.map((value, index) => {
    const x = padding + (index / (values.length - 1)) * chartWidth;
    
    // Y-Berechnung: 
    // - Hohe Werte sollen OBEN sein (kleines Y in SVG)
    // - Niedrige Werte sollen UNTEN sein (großes Y in SVG)
    let y;
    if (range === 0) {
      // Alle Werte gleich = mittlere Linie
      y = height / 2;
    } else {
      // Normalisiere den Wert zwischen 0 und 1
      const normalizedValue = (value - min) / range;
      // Invertiere für SVG (0 ist oben, height ist unten)
      y = padding + (1 - normalizedValue) * chartHeight;
    }
    
    return { x, y, value };
  });

  // SVG-Pfad erstellen
  const pathData = points
    .map((point, index) => {
      return `${index === 0 ? 'M' : 'L'} ${point.x.toFixed(1)} ${point.y.toFixed(1)}`;
    })
    .join(' ');

  return (
    <svg 
      width={width} 
      height={height} 
      style={{ display: 'block', background: 'rgba(0,0,0,0.02)', borderRadius: '2px' }}
    >
      {/* Hauptlinie */}
      <path
        d={pathData}
        stroke={color}
        fill="none"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity={0.8}
      />
      {/* Punkte an den Datenpunkten */}
      {points.map((point, index) => (
        <circle 
          key={index}
          cx={point.x} 
          cy={point.y} 
          r={1.5} 
          fill={color}
          opacity={0.6}
        />
      ))}
    </svg>
  );
};

export default Sparkline;