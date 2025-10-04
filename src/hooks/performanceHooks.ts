// src/hooks/performanceHooks.ts
import { 
  useCallback, 
  useEffect, 
  useRef, 
  useState, 
  useMemo,
  DependencyList,
  MutableRefObject
} from 'react';

// === Debounced Value Hook ===
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}

// === Throttled Callback Hook ===
export function useThrottle<T extends (...args: any[]) => any>(
  callback: T,
  delay: number
): T {
  const lastCall = useRef<number>(0);
  const timeoutRef = useRef<NodeJS.Timeout>();

  return useCallback(
    (...args: Parameters<T>) => {
      const now = Date.now();
      const timeSinceLastCall = now - lastCall.current;

      if (timeSinceLastCall >= delay) {
        lastCall.current = now;
        callback(...args);
      } else {
        // Schedule call for remaining time
        clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
          lastCall.current = Date.now();
          callback(...args);
        }, delay - timeSinceLastCall);
      }
    },
    [callback, delay]
  ) as T;
}

// === Intersection Observer Hook ===
export function useIntersectionObserver(
  elementRef: MutableRefObject<Element | null>,
  options?: IntersectionObserverInit
): IntersectionObserverEntry | undefined {
  const [entry, setEntry] = useState<IntersectionObserverEntry>();

  const updateEntry = useCallback((entries: IntersectionObserverEntry[]) => {
    setEntry(entries[0]);
  }, []);

  useEffect(() => {
    const node = elementRef.current;
    const hasIOSupport = !!window.IntersectionObserver;

    if (!hasIOSupport || !node) return;

    const observer = new IntersectionObserver(updateEntry, options);
    observer.observe(node);

    return () => observer.disconnect();
  }, [elementRef.current, updateEntry, options?.threshold, options?.root, options?.rootMargin]);

  return entry;
}

// === Lazy Load Hook ===
export function useLazyLoad<T>(
  loadFn: () => Promise<T>,
  dependencies: DependencyList = []
): {
  data: T | undefined;
  loading: boolean;
  error: Error | undefined;
  load: () => Promise<void>;
} {
  const [data, setData] = useState<T>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error>();
  const [hasLoaded, setHasLoaded] = useState(false);

  const load = useCallback(async () => {
    if (loading || hasLoaded) return;

    setLoading(true);
    setError(undefined);

    try {
      const result = await loadFn();
      setData(result);
      setHasLoaded(true);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error'));
    } finally {
      setLoading(false);
    }
  }, [loadFn, loading, hasLoaded, ...dependencies]);

  return { data, loading, error, load };
}

// === Memoized Callback with Dependencies ===
export function useMemoizedCallback<T extends (...args: any[]) => any>(
  callback: T,
  deps: DependencyList,
  equalityFn?: (a: any, b: any) => boolean
): T {
  const callbackRef = useRef<T>(callback);
  const depsRef = useRef<DependencyList>(deps);

  if (!equalityFn) {
    equalityFn = (a, b) => a === b;
  }

  const depsChanged = !depsRef.current.every((dep, i) => 
    equalityFn!(dep, deps[i])
  );

  if (depsChanged) {
    callbackRef.current = callback;
    depsRef.current = deps;
  }

  return useCallback((...args: Parameters<T>) => {
    return callbackRef.current(...args);
  }, []) as T;
}

// === Heavy Computation Memoization ===
export function useHeavyMemo<T>(
  computeFn: () => T,
  deps: DependencyList,
  shouldRecompute?: (prevDeps: DependencyList, nextDeps: DependencyList) => boolean
): T {
  const resultRef = useRef<T>();
  const depsRef = useRef<DependencyList>();
  const hasComputed = useRef(false);

  const needsRecompute = (() => {
    if (!hasComputed.current) return true;
    if (!depsRef.current) return true;
    
    if (shouldRecompute) {
      return shouldRecompute(depsRef.current, deps);
    }
    
    return !deps.every((dep, i) => 
      Object.is(dep, depsRef.current![i])
    );
  })();

  if (needsRecompute) {
    resultRef.current = computeFn();
    depsRef.current = deps;
    hasComputed.current = true;
  }

  return resultRef.current!;
}

// === Request Animation Frame Hook ===
export function useAnimationFrame(
  callback: (deltaTime: number) => void,
  active: boolean = true
): void {
  const requestRef = useRef<number>();
  const previousTimeRef = useRef<number>();

  const animate = useCallback((time: number) => {
    if (previousTimeRef.current !== undefined) {
      const deltaTime = time - previousTimeRef.current;
      callback(deltaTime);
    }
    previousTimeRef.current = time;
    requestRef.current = requestAnimationFrame(animate);
  }, [callback]);

  useEffect(() => {
    if (active) {
      requestRef.current = requestAnimationFrame(animate);
      return () => {
        if (requestRef.current) {
          cancelAnimationFrame(requestRef.current);
        }
      };
    }
  }, [active, animate]);
}

// === Batched Updates Hook ===
export function useBatchedUpdates<T>(
  initialValue: T,
  batchDelay: number = 16 // Default to frame rate
): [T, (update: Partial<T>) => void, () => void] {
  const [value, setValue] = useState<T>(initialValue);
  const pendingUpdates = useRef<Partial<T>[]>([]);
  const timeoutRef = useRef<NodeJS.Timeout>();

  const batchUpdate = useCallback((update: Partial<T>) => {
    pendingUpdates.current.push(update);

    if (!timeoutRef.current) {
      timeoutRef.current = setTimeout(() => {
        setValue(current => {
          const merged = pendingUpdates.current.reduce(
            (acc, update) => ({ ...acc, ...update }),
            current
          );
          pendingUpdates.current = [];
          timeoutRef.current = undefined;
          return merged;
        });
      }, batchDelay);
    }
  }, [batchDelay]);

  const flush = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = undefined;
    }

    if (pendingUpdates.current.length > 0) {
      setValue(current => {
        const merged = pendingUpdates.current.reduce(
          (acc, update) => ({ ...acc, ...update }),
          current
        );
        pendingUpdates.current = [];
        return merged;
      });
    }
  }, []);

  return [value, batchUpdate, flush];
}

// === Web Worker Hook ===
export function useWebWorker<T, R>(
  workerFactory: () => Worker,
  onMessage?: (result: R) => void,
  onError?: (error: ErrorEvent) => void
): {
  postMessage: (data: T) => void;
  terminate: () => void;
  status: 'idle' | 'processing' | 'error';
} {
  const workerRef = useRef<Worker>();
  const [status, setStatus] = useState<'idle' | 'processing' | 'error'>('idle');

  useEffect(() => {
    const worker = workerFactory();
    workerRef.current = worker;

    worker.onmessage = (e: MessageEvent<R>) => {
      setStatus('idle');
      if (onMessage) {
        onMessage(e.data);
      }
    };

    worker.onerror = (e: ErrorEvent) => {
      setStatus('error');
      if (onError) {
        onError(e);
      }
    };

    return () => {
      worker.terminate();
    };
  }, []);

  const postMessage = useCallback((data: T) => {
    if (workerRef.current) {
      setStatus('processing');
      workerRef.current.postMessage(data);
    }
  }, []);

  const terminate = useCallback(() => {
    if (workerRef.current) {
      workerRef.current.terminate();
      setStatus('idle');
    }
  }, []);

  return { postMessage, terminate, status };
}

// === Optimized List Hook ===
export function useOptimizedList<T>(
  items: T[],
  getKey: (item: T) => string | number,
  pageSize: number = 20
): {
  displayItems: T[];
  loadMore: () => void;
  hasMore: boolean;
  reset: () => void;
} {
  const [displayCount, setDisplayCount] = useState(pageSize);
  
  const displayItems = useMemo(
    () => items.slice(0, displayCount),
    [items, displayCount]
  );

  const hasMore = displayCount < items.length;

  const loadMore = useCallback(() => {
    setDisplayCount(current => 
      Math.min(current + pageSize, items.length)
    );
  }, [items.length, pageSize]);

  const reset = useCallback(() => {
    setDisplayCount(pageSize);
  }, [pageSize]);

  return { displayItems, loadMore, hasMore, reset };
}

// === Memory Leak Prevention Hook ===
export function useSafeAsync<T>(
  asyncFunction: () => Promise<T>
): {
  execute: () => Promise<void>;
  data: T | undefined;
  loading: boolean;
  error: Error | undefined;
} {
  const [data, setData] = useState<T>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error>();
  const mountedRef = useRef(true);

  useEffect(() => {
    return () => {
      mountedRef.current = false;
    };
  }, []);

  const execute = useCallback(async () => {
    setLoading(true);
    setError(undefined);

    try {
      const result = await asyncFunction();
      if (mountedRef.current) {
        setData(result);
      }
    } catch (err) {
      if (mountedRef.current) {
        setError(err instanceof Error ? err : new Error('Unknown error'));
      }
    } finally {
      if (mountedRef.current) {
        setLoading(false);
      }
    }
  }, [asyncFunction]);

  return { execute, data, loading, error };
}