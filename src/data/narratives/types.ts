import type { RoleId } from '@/core/models/domain';

export type BeatCategory = 'bank'|'supplier'|'customer'|'press'|'internal'|'authority';

export type ExpandedTextFn = (ctx: any) => string;
export type NarrativeBeat = {
  newsId: string;
  category: BeatCategory;
  id: string;
  title: string;
  summary: string;
  context: string;
  pressure?: string;
  twist?: string;
  fullText?: string | ExpandedTextFn;
  kpiNotes?: string[];
  roleNotes?: Partial<Record<RoleId, string[]>>;
  attachments?: string[];
  relatedDecisionIds?: string[];
};

export type DayNarrative = {
  day: number;
  opening?: string;
  cliffhanger?: string;
  beats: NarrativeBeat[];
};
