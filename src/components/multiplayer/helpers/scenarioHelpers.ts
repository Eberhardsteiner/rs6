// src/components/multiplayer/helpers/scenarioHelpers.ts

export function readScenarioOverride(kind: 'blocks' | 'news', day: number): unknown[] | null {
  try {
    const g = globalThis;
    const byDay = g?.__scenarioOverrides?.[kind];
    if (byDay && Array.isArray(byDay[day])) return byDay[day];

    const raw = localStorage.getItem('scenario:overrides');
    if (!raw) return null;

    const o = JSON.parse(raw);
    if (o && o[kind] && Array.isArray(o[kind][day])) return o[kind][day];
  } catch {}

  return null;
}

export function hasScenarioOverride(day: number): boolean {
  const blocks = readScenarioOverride('blocks', day);
  const news = readScenarioOverride('news', day);
  return (blocks !== null && blocks.length > 0) || (news !== null && news.length > 0);
}

export function clearScenarioOverrides(): void {
  try {
    localStorage.removeItem('scenario:overrides');
    const g = globalThis;
    if (g.__scenarioOverrides) {
      delete g.__scenarioOverrides;
    }
  } catch {}
}
