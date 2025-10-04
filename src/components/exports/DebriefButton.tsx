// src/components/exports/DebriefButton.tsx
import React from 'react';
import DebriefModule from '@/debrief/DebriefModule';

type DebriefButtonProps = {
  /** Button label; default: "🧭 Debriefing" */
  label?: React.ReactNode;
  /** Optional CSS class for the button */
  className?: string;
  /** Optional inline style for the button */
  style?: React.CSSProperties;
  /** Optional title attribute for the button */
  title?: string;
  /** Optional id attribute */
  id?: string;
  /** Optional hover handlers to support custom hover effects */
  onMouseEnter?: React.MouseEventHandler<HTMLButtonElement>;
  onMouseLeave?: React.MouseEventHandler<HTMLButtonElement>;
};

export default function DebriefButton({
  label = '🧭 Debriefing',
  className = 'btn',
  style,
  title = 'Debriefing für Trainer/Teilnehmende',
  id,
  onMouseEnter,
  onMouseLeave
}: DebriefButtonProps) {
  const [open, setOpen] = React.useState(false);
  return (
    <div>
      <button
        id={id}
        className={className}
        style={style}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onClick={() => setOpen(true)}
        title={title}
        aria-label={typeof label === 'string' ? label : 'Debriefing'}
      >
        {label}
      </button>
      <DebriefModule open={open} onClose={() => setOpen(false)} />
    </div>
  );
}
