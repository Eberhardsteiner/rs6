// src/core/models/domain.augment.d.ts
declare module '@/core/models/domain' {
  interface DayNewsItem {
    suppressHints?: boolean;
    expandedText?: (ctx: any) => string;
  }
}
