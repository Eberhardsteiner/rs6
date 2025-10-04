// src/components/performance/OptimizedComponents.tsx
import React, { memo, useMemo, useCallback, lazy, Suspense } from 'react';
import { useDebounce, useThrottle, useIntersectionObserver, useLazyLoad } from '@/hooks/performanceHooks';
import { VirtualScroller, VirtualDecisionList, VirtualChatList } from './VirtualScroller';
import type { DecisionBlock, KPI, RoleId } from '@/core/models/domain';
import type { ChatMessage } from '@/services/chatService';

// === Loading Skeleton Component ===
export const Skeleton = memo(({ 
  width = '100%', 
  height = 20, 
  variant = 'text' 
}: {
  width?: string | number;
  height?: string | number;
  variant?: 'text' | 'rect' | 'circle';
}) => {
  const style: React.CSSProperties = {
    width,
    height,
    background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
    backgroundSize: '200% 100%',
    animation: 'skeleton-loading 1.5s ease-in-out infinite',
    borderRadius: variant === 'circle' ? '50%' : variant === 'text' ? '4px' : '8px'
  };

  return (
    <>
      <div style={style} />
      <style>{`
        @keyframes skeleton-loading {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </>
  );
});

// === Optimized KPI Display ===
interface OptimizedKpiDisplayProps {
  kpi: KPI;
  visibleKpis: (keyof KPI)[];
  onKpiClick?: (key: keyof KPI) => void;
}

export const OptimizedKpiDisplay = memo(({ 
  kpi, 
  visibleKpis,
  onKpiClick 
}: OptimizedKpiDisplayProps) => {
  const formatValue = useCallback((key: keyof KPI, value: number | string) => {
    if (typeof value === 'string') return value;
    
    if (key === 'cashEUR' || key === 'profitLossEUR') {
      return new Intl.NumberFormat('de-DE', {
        style: 'currency',
        currency: 'EUR',
        maximumFractionDigits: 0
      }).format(value);
    }
    return Math.round(value);
  }, []);

  const kpiElements = useMemo(() => {
    return visibleKpis.map(key => {
      const value = kpi[key];
      const isVisible = typeof value === 'number';
      
      return (
        <div
          key={key}
          onClick={() => isVisible && onKpiClick?.(key)}
          style={{
            padding: 12,
            background: isVisible ? '#f9fafb' : '#e5e7eb',
            borderRadius: 8,
            cursor: isVisible && onKpiClick ? 'pointer' : 'default',
            transition: 'all 0.2s ease'
          }}
        >
          <div style={{ fontSize: 12, color: '#6b7280', marginBottom: 4 }}>
            {key.replace('EUR', '').replace(/([A-Z])/g, ' $1').trim()}
          </div>
          <div style={{ fontSize: 20, fontWeight: 700, color: '#111827' }}>
            {isVisible ? formatValue(key, value) : '???'}
          </div>
        </div>
      );
    });
  }, [kpi, visibleKpis, formatValue, onKpiClick]);

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
      gap: 12
    }}>
      {kpiElements}
    </div>
  );
}, (prevProps, nextProps) => {
  // Custom comparison for memo
  return Object.keys(prevProps.kpi).every(key => 
    prevProps.kpi[key as keyof KPI] === nextProps.kpi[key as keyof KPI]
  ) && prevProps.visibleKpis.join() === nextProps.visibleKpis.join();
});

// === Optimized Decision Block ===
interface OptimizedDecisionBlockProps {
  block: DecisionBlock;
  selected?: 'a' | 'b' | 'c' | 'd';
  onSelect: (optionId: 'a' | 'b' | 'c' | 'd') => void;
  disabled?: boolean;
}

const DecisionBlockInner = ({ 
  block, 
  selected, 
  onSelect, 
  disabled 
}: OptimizedDecisionBlockProps) => {
  const handleSelect = useCallback((optionId: 'a' | 'b' | 'c' | 'd') => {
    if (!disabled) {
      onSelect(optionId);
    }
  }, [disabled, onSelect]);

  const options = useMemo(() => {
    return block.options.map(option => {
      const isSelected = selected === option.id;
      
      return (
        <button
          key={option.id}
          onClick={() => handleSelect(option.id as 'a' | 'b' | 'c' | 'd')}
          disabled={disabled}
          style={{
            padding: 12,
            border: isSelected ? '2px solid #3b82f6' : '1px solid #e5e7eb',
            borderRadius: 6,
            background: isSelected ? '#eff6ff' : '#fff',
            cursor: disabled ? 'not-allowed' : 'pointer',
            opacity: disabled ? 0.6 : 1,
            textAlign: 'left',
            transition: 'all 0.15s ease',
            transform: isSelected ? 'scale(1.02)' : 'scale(1)'
          }}
        >
          <div style={{ fontWeight: isSelected ? 600 : 400 }}>
            {option.id.toUpperCase()}. {option.label}
          </div>
        </button>
      );
    });
  }, [block.options, selected, disabled, handleSelect]);

  return (
    <div style={{
      padding: 16,
      border: '1px solid #e5e7eb',
      borderRadius: 8,
      marginBottom: 16
    }}>
      <h4 style={{ margin: '0 0 8px' }}>{block.title}</h4>
      <p style={{ color: '#6b7280', marginBottom: 12 }}>{block.description}</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {options}
      </div>
    </div>
  );
};

export const OptimizedDecisionBlock = memo(DecisionBlockInner);

// === Optimized Chat Message ===
interface OptimizedChatMessageProps {
  message: ChatMessage;
  isOwn: boolean;
  onQuote?: (message: ChatMessage) => void;
}

const ChatMessageInner = ({ 
  message, 
  isOwn,
  onQuote 
}: OptimizedChatMessageProps) => {
  const formattedTime = useMemo(() => {
    return new Date(message.created_at).toLocaleTimeString('de-DE', {
      hour: '2-digit',
      minute: '2-digit'
    });
  }, [message.created_at]);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: isOwn ? 'row-reverse' : 'row',
        gap: 8,
        marginBottom: 12
      }}
    >
      <div
        style={{
          maxWidth: '70%',
          padding: '8px 12px',
          background: isOwn ? '#3b82f6' : '#f3f4f6',
          color: isOwn ? 'white' : '#374151',
          borderRadius: 8,
          borderTopLeftRadius: isOwn ? 8 : 2,
          borderTopRightRadius: isOwn ? 2 : 8
        }}
      >
        <div style={{
          fontSize: 11,
          opacity: 0.8,
          marginBottom: 4
        }}>
          {message.player?.name} • {formattedTime}
        </div>
        <div style={{ wordBreak: 'break-word' }}>
          {message.content}
        </div>
        {onQuote && (
          <button
            onClick={() => onQuote(message)}
            style={{
              marginTop: 4,
              fontSize: 11,
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              opacity: 0.7
            }}
          >
            Zitieren
          </button>
        )}
      </div>
    </div>
  );
};

export const OptimizedChatMessage = memo(ChatMessageInner);

// === Lazy-Loaded Heavy Components ===
export const LazyAdminPanel = lazy(() => import('@/admin/AdminPanel'));
export const LazyScenarioEditor = lazy(() => import('@/admin/ScenarioEditor'));
export const LazyExportReport = lazy(() => import('@/components/ExportReportButton'));

// === Optimized Search Input ===
interface OptimizedSearchInputProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  debounceMs?: number;
}

export const OptimizedSearchInput = memo(({ 
  onSearch, 
  placeholder = 'Suchen...',
  debounceMs = 300 
}: OptimizedSearchInputProps) => {
  const [value, setValue] = useState('');
  const debouncedValue = useDebounce(value, debounceMs);

  useEffect(() => {
    onSearch(debouncedValue);
  }, [debouncedValue, onSearch]);

  return (
    <input
      type="text"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder={placeholder}
      style={{
        width: '100%',
        padding: '8px 12px',
        borderRadius: 6,
        border: '1px solid #e5e7eb',
        fontSize: 14
      }}
    />
  );
});

// === Image Lazy Loader ===
interface LazyImageProps {
  src: string;
  alt: string;
  width?: number | string;
  height?: number | string;
  placeholder?: string;
}

export const LazyImage = memo(({ 
  src, 
  alt, 
  width = '100%', 
  height = 'auto',
  placeholder 
}: LazyImageProps) => {
  const imageRef = useRef<HTMLDivElement>(null);
  const entry = useIntersectionObserver(imageRef, {
    threshold: 0.1,
    rootMargin: '50px'
  });
  
  const isVisible = entry?.isIntersecting;
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (isVisible && !loaded && !error) {
      const img = new Image();
      img.src = src;
      img.onload = () => setLoaded(true);
      img.onerror = () => setError(true);
    }
  }, [isVisible, src, loaded, error]);

  return (
    <div ref={imageRef} style={{ width, height, position: 'relative' }}>
      {!loaded && !error && (
        placeholder ? (
          <img src={placeholder} alt={alt} style={{ width: '100%', height: '100%' }} />
        ) : (
          <Skeleton width={width} height={height} variant="rect" />
        )
      )}
      {loaded && (
        <img 
          src={src} 
          alt={alt} 
          style={{ 
            width: '100%', 
            height: '100%',
            opacity: loaded ? 1 : 0,
            transition: 'opacity 0.3s ease'
          }} 
        />
      )}
      {error && (
        <div style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#f3f4f6',
          color: '#9ca3af'
        }}>
          Bild konnte nicht geladen werden
        </div>
      )}
    </div>
  );
});

// === Error Boundary ===
interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback?: React.ComponentType<{ error?: Error }> },
  ErrorBoundaryState
> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        const Fallback = this.props.fallback;
        return <Fallback error={this.state.error} />;
      }

      return (
        <div style={{
          padding: 24,
          background: '#fee2e2',
          borderRadius: 8,
          textAlign: 'center'
        }}>
          <h2 style={{ color: '#991b1b', marginBottom: 8 }}>
            Ein Fehler ist aufgetreten
          </h2>
          <p style={{ color: '#7f1d1d' }}>
            {this.state.error?.message || 'Unbekannter Fehler'}
          </p>
          <button
            onClick={() => window.location.reload()}
            style={{
              marginTop: 16,
              padding: '8px 16px',
              background: '#ef4444',
              color: 'white',
              border: 'none',
              borderRadius: 6,
              cursor: 'pointer'
            }}
          >
            Seite neu laden
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}