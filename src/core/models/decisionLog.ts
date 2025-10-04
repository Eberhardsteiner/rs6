import { RoleId } from './domain';

export interface DecisionLogEntry {
  blockId: string;
  day: number;
  role: RoleId;
  chosenOptionId?: 'a'|'b'|'c'|'d'|null;
  chosenOptionLabel?: string|null;
  customText?: string|null;
  timestampISO: string;
  changedOption?: boolean;
  ts?: number; // Für Kompatibilität mit bestehender Logik
  kpiDelta?: any; // Für Kompatibilität mit bestehender Logik
}