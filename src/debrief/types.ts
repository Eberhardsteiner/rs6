
// src/debrief/types.ts
export type RoleId = 'CEO' | 'CFO' | 'OPS' | 'HRLEGAL';

export type ScaleQuestion = { id: string; text: string; };
export type OpenQuestion = { id: string; text: string; };

export type QuestionBank = {
  meta: { version: number; created: string; scaleHint: string };
  globalScale: ScaleQuestion[];
  globalOpen: OpenQuestion[];
  roleScale: Record<RoleId, ScaleQuestion[]>;
  roleOpen: Record<RoleId, OpenQuestion[]>;
  decisionReview: { scale: ScaleQuestion[]; open: OpenQuestion[] };
};

export type ScenarioIndexEntry = {
  id: string; day: number; role: RoleId; title: string; dilemma: string; context: string;
};

export type DebriefResponses = {
  meta: {
    playerName?: string; dateISO: string; appVersion?: string;
  };
  globalScale: Record<string, number>;
  globalOpen: Record<string, string>;
  roleScale: Partial<Record<RoleId, Record<string, number>>>;
  roleOpen: Partial<Record<RoleId, Record<string, string>>>;
  decisions: Array<{
    blockId: string; day?: number; role?: RoleId; title?: string; dilemma?: string;
    chosenOptionId?: 'a'|'b'|'c'|'d'|null;
    chosenOptionLabel?: string|null;
    scale: Record<string, number>;
    open: Record<string, string>;
  }>;
};
