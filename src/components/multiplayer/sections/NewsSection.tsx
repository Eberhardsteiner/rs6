// src/components/multiplayer/sections/NewsSection.tsx
import NewsFeed from '@/components/news/NewsFeed';
import RandomNewsPanel from '@/components/hud/RandomNewsPanel';
import type { DayNewsItem } from '@/core/models/domain';

export interface NewsSectionProps {
  news: DayNewsItem[];
  newsRandom: DayNewsItem[];
  day: number;
  onOpenNarrative: (id: string) => void;
}

export function NewsSection({ news, newsRandom, day, onOpenNarrative }: NewsSectionProps) {
  return (
    <div
      className="card"
      style={{
        flex: '2 1 480px',
        margin: '12px',
        backgroundColor: 'rgba(255, 255, 255, 0.98)',
        boxShadow: '0 4px 16px rgba(0,0,0,0.08)'
      }}
    >
      <h3>News</h3>
      <NewsFeed items={news} onOpenNarrative={onOpenNarrative} />
      <RandomNewsPanel news={newsRandom} day={day} />
    </div>
  );
}
