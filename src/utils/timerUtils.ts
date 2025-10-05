// src/utils/timerUtils.ts
// Utility-Funktionen für Timer-Logik (Round-Timer, Countdown)

import type { RoleId } from '@/core/models/domain';
import type { RoundTimeMatrix } from '@/types/admin';

// =============================================================================
// Time Formatting
// =============================================================================

export function formatTime(seconds: number): string {
  if (seconds < 0) return '00:00';

  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;

  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

export function formatTimeWithHours(seconds: number): string {
  if (seconds < 0) return '00:00:00';

  const hours = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  if (hours > 0) {
    return `${hours}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }

  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

export function parseTimeString(timeString: string): number | null {
  const parts = timeString.split(':').map(p => parseInt(p, 10));

  if (parts.length === 2) {
    // MM:SS
    const [mins, secs] = parts;
    if (Number.isInteger(mins) && Number.isInteger(secs)) {
      return mins * 60 + secs;
    }
  } else if (parts.length === 3) {
    // HH:MM:SS
    const [hours, mins, secs] = parts;
    if (Number.isInteger(hours) && Number.isInteger(mins) && Number.isInteger(secs)) {
      return hours * 3600 + mins * 60 + secs;
    }
  }

  return null;
}

// =============================================================================
// Round Time Calculations
// =============================================================================

export function getRoundTimeForDay(
  day: number,
  role: RoleId,
  mode: 'off' | 'fixed' | 'matrix',
  fixedTime: number = 300,
  matrix?: RoundTimeMatrix | null
): number | null {
  if (mode === 'off') {
    return null;
  }

  if (mode === 'fixed') {
    return fixedTime;
  }

  if (mode === 'matrix' && matrix) {
    const roleKey = role as keyof RoundTimeMatrix;
    const dayTimes = matrix[roleKey];

    if (dayTimes && typeof dayTimes === 'object') {
      const time = dayTimes[day];
      if (typeof time === 'number' && time > 0) {
        return time;
      }
    }
  }

  // Fallback to fixed time
  return fixedTime;
}

export function getMaxRoundTimeForDay(day: number, matrix: RoundTimeMatrix): number {
  const roles: RoleId[] = ['CEO', 'CFO', 'OPS', 'HRLEGAL'];
  let maxTime = 0;

  for (const role of roles) {
    const roleKey = role as keyof RoundTimeMatrix;
    const dayTimes = matrix[roleKey];

    if (dayTimes && typeof dayTimes === 'object') {
      const time = dayTimes[day];
      if (typeof time === 'number' && time > maxTime) {
        maxTime = time;
      }
    }
  }

  return maxTime;
}

export function getMinRoundTimeForDay(day: number, matrix: RoundTimeMatrix): number {
  const roles: RoleId[] = ['CEO', 'CFO', 'OPS', 'HRLEGAL'];
  let minTime = Infinity;

  for (const role of roles) {
    const roleKey = role as keyof RoundTimeMatrix;
    const dayTimes = matrix[roleKey];

    if (dayTimes && typeof dayTimes === 'object') {
      const time = dayTimes[day];
      if (typeof time === 'number' && time > 0 && time < minTime) {
        minTime = time;
      }
    }
  }

  return minTime === Infinity ? 0 : minTime;
}

// =============================================================================
// Timer State Management
// =============================================================================

export interface TimerState {
  remaining: number;
  isRunning: boolean;
  isPaused: boolean;
  startedAt?: number;
  pausedAt?: number;
}

export function createTimerState(duration: number): TimerState {
  return {
    remaining: duration,
    isRunning: false,
    isPaused: false
  };
}

export function startTimer(state: TimerState): TimerState {
  return {
    ...state,
    isRunning: true,
    isPaused: false,
    startedAt: Date.now(),
    pausedAt: undefined
  };
}

export function pauseTimer(state: TimerState): TimerState {
  if (!state.isRunning || state.isPaused) {
    return state;
  }

  return {
    ...state,
    isRunning: false,
    isPaused: true,
    pausedAt: Date.now()
  };
}

export function resumeTimer(state: TimerState): TimerState {
  if (!state.isPaused) {
    return state;
  }

  return {
    ...state,
    isRunning: true,
    isPaused: false,
    startedAt: Date.now(),
    pausedAt: undefined
  };
}

export function resetTimer(state: TimerState, duration: number): TimerState {
  return createTimerState(duration);
}

export function updateTimerRemaining(state: TimerState, elapsed: number): TimerState {
  const newRemaining = Math.max(0, state.remaining - elapsed);

  return {
    ...state,
    remaining: newRemaining,
    isRunning: newRemaining > 0 ? state.isRunning : false
  };
}

// =============================================================================
// Countdown Utilities
// =============================================================================

export interface CountdownConfig {
  duration: number;
  onTick?: (remaining: number) => void;
  onComplete?: () => void;
  interval?: number;
}

export class Countdown {
  private duration: number;
  private remaining: number;
  private intervalId: number | null = null;
  private onTick?: (remaining: number) => void;
  private onComplete?: () => void;
  private interval: number;

  constructor(config: CountdownConfig) {
    this.duration = config.duration;
    this.remaining = config.duration;
    this.onTick = config.onTick;
    this.onComplete = config.onComplete;
    this.interval = config.interval || 1000;
  }

  start(): void {
    if (this.intervalId !== null) {
      return;
    }

    this.intervalId = window.setInterval(() => {
      this.remaining = Math.max(0, this.remaining - 1);

      if (this.onTick) {
        this.onTick(this.remaining);
      }

      if (this.remaining <= 0) {
        this.stop();
        if (this.onComplete) {
          this.onComplete();
        }
      }
    }, this.interval);
  }

  stop(): void {
    if (this.intervalId !== null) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  reset(duration?: number): void {
    this.stop();
    if (duration !== undefined) {
      this.duration = duration;
    }
    this.remaining = this.duration;

    if (this.onTick) {
      this.onTick(this.remaining);
    }
  }

  pause(): void {
    this.stop();
  }

  resume(): void {
    this.start();
  }

  getRemaining(): number {
    return this.remaining;
  }

  isRunning(): boolean {
    return this.intervalId !== null;
  }
}

// =============================================================================
// Timer Validation
// =============================================================================

export function isValidRoundTime(seconds: number): boolean {
  return Number.isInteger(seconds) && seconds >= 10 && seconds <= 7200;
}

export function isValidCountdownTime(seconds: number): boolean {
  return Number.isInteger(seconds) && seconds >= 0 && seconds <= 300;
}

export function validateRoundTimeMatrix(matrix: unknown): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!matrix || typeof matrix !== 'object') {
    errors.push('Matrix muss ein Objekt sein');
    return { isValid: false, errors };
  }

  const roles: RoleId[] = ['CEO', 'CFO', 'OPS', 'HRLEGAL'];

  for (const role of roles) {
    const roleKey = role as keyof RoundTimeMatrix;
    const roleMatrix = matrix[roleKey as keyof typeof matrix];

    if (!roleMatrix || typeof roleMatrix !== 'object') {
      errors.push(`${role}: Matrix fehlt oder ist ungültig`);
      continue;
    }

    for (let day = 1; day <= 14; day++) {
      const time = (roleMatrix as Record<number, unknown>)[day];

      if (time !== undefined) {
        if (typeof time !== 'number') {
          errors.push(`${role} Tag ${day}: Wert muss eine Zahl sein`);
        } else if (!isValidRoundTime(time)) {
          errors.push(`${role} Tag ${day}: Zeit muss zwischen 10 und 7200 Sekunden liegen (ist ${time})`);
        }
      }
    }
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

// =============================================================================
// Timer Display Helpers
// =============================================================================

export function getTimerColorClass(remaining: number, total: number): string {
  const percentage = (remaining / total) * 100;

  if (percentage > 50) {
    return 'text-green-600';
  } else if (percentage > 25) {
    return 'text-yellow-600';
  } else {
    return 'text-red-600';
  }
}

export function getTimerWarningLevel(remaining: number, total: number): 'safe' | 'warning' | 'critical' {
  const percentage = (remaining / total) * 100;

  if (percentage > 50) {
    return 'safe';
  } else if (percentage > 25) {
    return 'warning';
  } else {
    return 'critical';
  }
}

export function shouldShowTimerWarning(remaining: number, total: number): boolean {
  return getTimerWarningLevel(remaining, total) !== 'safe';
}
