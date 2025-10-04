// src/components/performance/VirtualScroller.tsx
import React, { useState, useEffect, useRef, useCallback, memo } from 'react';

interface VirtualScrollerProps<T> {
  items: T[];
  itemHeight: number | ((index: number) => number);
  renderItem: (item: T, index: number) => React.ReactNode;
  height: number;
  overscan?: number;
  onScroll?: (scrollTop: number) => void;
  className?: string;
  getItemKey?: (item: T, index: number) => string | number;
  estimatedItemHeight?: number;
}

interface ScrollPosition {
  scrollTop: number;
  startIndex: number;
  endIndex: number;
  offsetY: number;
}

function VirtualScrollerInner<T>({
  items,
  itemHeight,
  renderItem,
  height,
  overscan = 3,
  onScroll,
  className = '',
  getItemKey,
  estimatedItemHeight = 50
}: VirtualScrollerProps<T>) {
  const [scrollPosition, setScrollPosition] = useState<ScrollPosition>({
    scrollTop: 0,
    startIndex: 0,
    endIndex: 0,
    offsetY: 0
  });
  
  const scrollerRef = useRef<HTMLDivElement>(null);
  const itemHeightsRef = useRef<Map<number, number>>(new Map());
  const measuredHeightRef = useRef<number>(0);
  const lastMeasuredIndexRef = useRef<number>(-1);
  
  // Calculate item height
  const getHeight = useCallback((index: number): number => {
    if (typeof itemHeight === 'function') {
      // Cache calculated heights
      if (!itemHeightsRef.current.has(index)) {
        itemHeightsRef.current.set(index, itemHeight(index));
      }
      return itemHeightsRef.current.get(index)!;
    }
    return itemHeight;
  }, [itemHeight]);
  
  // Calculate total height
  const getTotalHeight = useCallback((): number => {
    if (typeof itemHeight === 'number') {
      return items.length * itemHeight;
    }
    
    // For dynamic heights, use measured + estimated
    let totalHeight = measuredHeightRef.current;
    
    // Add estimated height for unmeasured items
    if (lastMeasuredIndexRef.current < items.length - 1) {
      const unmeasuredCount = items.length - 1 - lastMeasuredIndexRef.current;
      totalHeight += unmeasuredCount * estimatedItemHeight;
    }
    
    return totalHeight;
  }, [items.length, itemHeight, estimatedItemHeight]);
  
  // Calculate visible range
  const calculateVisibleRange = useCallback((scrollTop: number): ScrollPosition => {
    if (typeof itemHeight === 'number') {
      // Fixed height - simple calculation
      const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan);
      const endIndex = Math.min(
        items.length - 1,
        Math.ceil((scrollTop + height) / itemHeight) + overscan
      );
      const offsetY = startIndex * itemHeight;
      
      return { scrollTop, startIndex, endIndex, offsetY };
    }
    
    // Dynamic height - more complex calculation
    let accumulatedHeight = 0;
    let startIndex = 0;
    let endIndex = items.length - 1;
    let offsetY = 0;
    let foundStart = false;
    
    for (let i = 0; i < items.length; i++) {
      const h = getHeight(i);
      
      if (!foundStart && accumulatedHeight + h > scrollTop) {
        startIndex = Math.max(0, i - overscan);
        offsetY = accumulatedHeight;
        foundStart = true;
      }
      
      if (accumulatedHeight > scrollTop + height + (overscan * estimatedItemHeight)) {
        endIndex = Math.min(items.length - 1, i + overscan);
        break;
      }
      
      accumulatedHeight += h;
    }
    
    return { scrollTop, startIndex, endIndex, offsetY };
  }, [items.length, itemHeight, height, overscan, getHeight, estimatedItemHeight]);
  
  // Handle scroll event
  const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    const scrollTop = e.currentTarget.scrollTop;
    const newPosition = calculateVisibleRange(scrollTop);
    setScrollPosition(newPosition);
    
    if (onScroll) {
      onScroll(scrollTop);
    }
  }, [calculateVisibleRange, onScroll]);
  
  // Update visible range when items or height change
  useEffect(() => {
    const newPosition = calculateVisibleRange(scrollPosition.scrollTop);
    setScrollPosition(newPosition);
  }, [items.length, height]);
  
  // Measure dynamic item heights
  useEffect(() => {
    if (typeof itemHeight === 'function') {
      const measureItems = () => {
        let totalHeight = 0;
        
        for (let i = 0; i <= scrollPosition.endIndex; i++) {
          const h = getHeight(i);
          totalHeight += h;
          
          if (i > lastMeasuredIndexRef.current) {
            lastMeasuredIndexRef.current = i;
            measuredHeightRef.current = totalHeight;
          }
        }
      };
      
      measureItems();
    }
  }, [scrollPosition.endIndex, itemHeight, getHeight]);
  
  // Render visible items
  const visibleItems = items.slice(
    scrollPosition.startIndex,
    scrollPosition.endIndex + 1
  );
  
  return (
    <div
      ref={scrollerRef}
      className={`virtual-scroller ${className}`}
      onScroll={handleScroll}
      style={{
        height,
        overflowY: 'auto',
        overflowX: 'hidden',
        position: 'relative'
      }}
    >
      {/* Total height container */}
      <div
        style={{
          height: getTotalHeight(),
          position: 'relative'
        }}
      >
        {/* Visible items container */}
        <div
          style={{
            transform: `translateY(${scrollPosition.offsetY}px)`,
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0
          }}
        >
          {visibleItems.map((item, index) => {
            const actualIndex = scrollPosition.startIndex + index;
            const key = getItemKey ? getItemKey(item, actualIndex) : actualIndex;
            
            return (
              <div
                key={key}
                style={{
                  height: typeof itemHeight === 'number' 
                    ? itemHeight 
                    : getHeight(actualIndex)
                }}
              >
                {renderItem(item, actualIndex)}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// Export memoized component
export const VirtualScroller = memo(VirtualScrollerInner) as typeof VirtualScrollerInner;

// === Specialized Virtual List for Decisions ===
interface VirtualDecisionListProps {
  decisions: any[];
  renderDecision: (decision: any, index: number) => React.ReactNode;
  height?: number;
}

export const VirtualDecisionList = memo(({ 
  decisions, 
  renderDecision,
  height = 600
}: VirtualDecisionListProps) => {
  return (
    <VirtualScroller
      items={decisions}
      itemHeight={120} // Estimated height for decision blocks
      renderItem={renderDecision}
      height={height}
      overscan={2}
      getItemKey={(item) => item.id || item.block_id}
    />
  );
});

// === Specialized Virtual List for Chat Messages ===
interface VirtualChatListProps {
  messages: any[];
  renderMessage: (message: any, index: number) => React.ReactNode;
  height?: number;
}

export const VirtualChatList = memo(({ 
  messages, 
  renderMessage,
  height = 400
}: VirtualChatListProps) => {
  const scrollerRef = useRef<HTMLDivElement>(null);
  
  // Auto-scroll to bottom on new messages
  useEffect(() => {
    if (scrollerRef.current) {
      scrollerRef.current.scrollTop = scrollerRef.current.scrollHeight;
    }
  }, [messages.length]);
  
  // Dynamic height based on message content
  const getMessageHeight = useCallback((index: number) => {
    const message = messages[index];
    const baseHeight = 60;
    const contentLength = message.content?.length || 0;
    const extraHeight = Math.ceil(contentLength / 50) * 20;
    return baseHeight + extraHeight;
  }, [messages]);
  
  return (
    <VirtualScroller
      items={messages}
      itemHeight={getMessageHeight}
      renderItem={renderMessage}
      height={height}
      overscan={5}
      estimatedItemHeight={80}
      getItemKey={(item) => item.id}
    />
  );