import { useEffect, useRef } from "react";

interface UseInfiniteScrollOptions {
  targetRef: React.RefObject<HTMLElement | null>;
  onIntersect: () => void;
  enabled: boolean;
  rootMargin?: string;
}

export function useInfiniteScroll({
  targetRef,
  onIntersect,
  enabled,
  rootMargin = "100px", 
}: UseInfiniteScrollOptions) {
  // Keep a ref to the latest callback so the observer is never re-created
  const onIntersectRef = useRef(onIntersect);
  useEffect(() => { onIntersectRef.current = onIntersect; }, [onIntersect]);

  const enabledRef = useRef(enabled);
  useEffect(() => { enabledRef.current = enabled; }, [enabled]);

  useEffect(() => {
    const sentinel = targetRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
        ([entry]) => {
            
             console.log('sentinel intersecting:', entry.isIntersecting, 'enabled:', enabledRef.current);
        if (entry.isIntersecting && enabledRef.current) {
          onIntersectRef.current();
        }
      },
      { threshold: 0, rootMargin },
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
    // Only re-create observer if the DOM node itself changes
  }, [targetRef, rootMargin]);
}